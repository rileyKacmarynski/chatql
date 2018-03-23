const  bcrypt  = require('bcryptjs');
const  jwt = require('jsonwebtoken');
const guid = require('guid');

const { insertEntity, queryTable } = require('../helpers/azure-storage-wrapper');
const { CONNECTION_STRING, APP_SECRET } = require('../constants');

function makeAuthService({
    tableService,
    azure
}){
    return Object.freeze({
        getUsers, 
        getUserByAuthToken,
        checkForExistingUser,
        createUser,
        login
    });

    
    async function getUsers(username){
        let query = new azure.TableQuery()
        .where('PartitionKey eq ?', 'User')
        
        if(username){
            query = query.and('Username eq ?', username);
        }
        const users = await queryTable(tableService, query, 'User');

        return users.entries.map(u => {
            return {
                username: u.Username._,
                password: u.Password._,
                id: u.RowKey._
            };
        });
    }

    async function getUserByAuthToken(request){
        let token = request.headers.authorization
        if(!token){
            return;
        }

        token = token.replace('Bearer ', '');
        if(token){
            try{
                const { userId } = jwt.verify(token, APP_SECRET);
                const query = new azure.TableQuery()
                    .where('PartitionKey eq ?', 'User')
                    .and('RowKey eq ?', userId);
                
                return await queryTable(tableService, query, 'User');
            
            } catch (e){
                console.log("Welp we tried.");
            }
        }
    }

    async function checkForExistingUser(username){
        try{
            const user = await getUser(username);

            return user.entries.length > 0 
                ? true 
                : false;
        } catch(e) {
            throw new Error(e);
        }
    }

    async function createUser(username, password){
        const pwd = await bcrypt.hash(password, 10)

        const user = {
            PartitionKey: {'_': 'User'}, 
            RowKey:  {'_': guid.raw()},
            Username:  {'_': username},
            Password:  {'_': pwd},
        };
        try {
            const res = await insertEntity(tableService, user, 'User');
             
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

    async function login(username, password){
        try{
            let user = await getUsers(username)
            // console.log(user);
            if(!user){
                throw new Error(`could not find user with email: ${args.email}`);
            }
            user = user[0];
            // console.log(user);
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
            throw e;
        }
    }


}

module.exports = {
    makeAuthService,
}