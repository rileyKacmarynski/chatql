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

    async getUser(username){
        const query = new this.azure.TableQuery()
        .where('PartitionKey eq ?', 'User')
        .and('username eq ?', username);
    
        return await queryTable(this.tableService, query, 'User');
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
            const user = await this.getUser(username);

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
            username:  {'_': username},
            password:  {'_': pwd},
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
            let user = await this.getUser(username)
            if(!user){
                throw new Error(`could not find user with email: ${args.email}`);
            }
            user = user.entries[0];
            if(!await bcrypt.compare(password, user.password._)){
                throw new Error("Invalid password");
            }
            const token = await jwt.sign({ userId: user.RowKey._ }, APP_SECRET);
            return {
                token,
                user: {
                    username: user.username._,
                    id: user.RowKey._
                },
            };
        } catch (e){
            throw e;
        }
    }
}

module.exports = {
    AuthService,
}