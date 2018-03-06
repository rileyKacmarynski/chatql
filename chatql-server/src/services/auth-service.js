const  bcrypt  = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const guid = require('guid');

const { insertEntity, queryTable } = require('../helpers/azure-storage-wrapper');
const { CONNECTION_STRING, APP_SECRET } = require('../constants');

class AuthService{

    constructor(azure){
        this.tableService = azure.createTableService(CONNECTION_STRING);
        this.azure = azure;
    }

    async getUsers(username){
        let query = new this.azure.TableQuery()
        .where('PartitionKey eq ?', 'User')
        
        if(username){
            query = query.and('Username eq ?', username);
        }
        const users = await queryTable(this.tableService, query, 'User');
        console.log(users);

        return users.entries.map(u => {
            return {
                username: u.Username._,
                id: u.RowKey._,
                password: u.Password._,
            };
        });
    }

    async getUserByAuthToken(request){
        const token = request.headers.authorize;
        if(token){
            try{
                const { userId } = jwt.verify(token, APP_SECRET);
                const query = new this.azure.TableQuery()
                    .where('PartitionKey eq ?', 'User')
                    .and('RowKey eq ?', userId);
                
                return await queryTable(this.tableService, query, 'User');
            
            } catch (e){
                throw new Error('Unable to verify id');
            }
        }
    }

    async checkForExistingUser(username){
        try{
            const user = await this.getUsers(username);

            return user.entries.length > 0 
                ? true 
                : false;
        } catch(e) {
            throw new Error(e);
        }
    }

    async createUser(username, password){
        const pwd = await bcrypt.hash(password, 10)

        const user = {
            PartitionKey: {'_': 'User'}, 
            RowKey:  {'_': guid.raw()},
            Username:  {'_': username},
            Password:  {'_': pwd},
        };
        try {
            const res = await insertEntity(this.tableService, user, 'User');
             
            const token = jwt.sign({ userId: user.RowKey._ }, APP_SECRET);
            return {
                token,
                user : {
                    username: user.username,
                    id: user.RowKey._
                }
            }
        } catch (e){
            throw new Error('Unable to register user');
        }
    }

    async login(username, password){
        try{
            let users = await this.getUsers(username);
            if(!users){
                throw new Error(`could not find user with email: ${args.email}`);
            }
            const user = users[0];
            
            if(!await bcrypt.compare(password, user.password)){
                throw new Error("Invalid password");
            }
            const token = await jwt.sign({ userId: user.id }, APP_SECRET);
            return {
                token,
                user: {
                    username: user.username,
                    id: user.id
                },
            };
        } catch (e){
            console.log(e);
        }
    }
}

module.exports = {
    AuthService,
}