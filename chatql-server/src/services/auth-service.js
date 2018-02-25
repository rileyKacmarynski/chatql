const  bcrypt  = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const guid = require('guid');

const { insertEntity, queryTable } = require('../helpers/azure-storage-wrapper');
const { APP_SECRET } = require('../constants');

class AuthService{

    constructor(tableService){
        this.tableService = tableService;
    }

    async checkForExistingUser(azure, username){
        const query = new azure.TableQuery()
        .where('PartitionKey eq ?', 'User')
        .and('username eq ?', username);
    
        try{
            const queryRes = await queryTable(this.tableService, query, 'User');
            return queryRes.entries.length > 0 ? true : false;
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
            console.log(token);
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
        
    }
}

module.exports = {
    AuthService,
}