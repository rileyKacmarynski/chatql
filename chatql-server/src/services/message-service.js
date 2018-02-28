const guid = require('guid');

const { insertEntity, queryTable, retrieveEntity } = require('../helpers/azure-storage-wrapper');
const { CONNECTION_STRING, APP_SECRET } = require('../constants');

class MessageService {
    constructor(azure){
        this.tableService = azure.createTableService(CONNECTION_STRING);
        this.azure = azure;
    }

    async createMessage(user, content){
        //send call to query the table
        const message = {
            //if I implement different rooms the partition key 
            //will be the room name or something
            PartitionKey: {'_': 'Main'}, 
            RowKey:  {'_': guid.raw()},
            UserId:  {'_': user.RowKey._},
            Content:  {'_': content},
        };
        try {
            const res = await insertEntity(this.tableService, message, 'Message');
            const timestamp = new Date().toLocaleTimeString();
            return {
                id: message.RowKey._,
                content: message.Content._,
                timestamp,
                sentBy : {
                    username: user.Username._,
                    id: user.RowKey._
                }
            }
        } catch (e){
            throw new Error('Unable to register user');
        }
    }

    async getMessages(take){
        const query = new this.azure.TableQuery()
        .where('PartitionKey eq ?', 'Main')
        .top(take);
        const messages = await queryTable(this.tableService, query, 'Message');
              
        return messages.entries.map(async (m) => {    
            const user = await retrieveEntity(this.tableService, 'User', 'User', m.UserId._);

            return {
                id: m.RowKey._,
                content: m.Content._,
                timestamp: m.Timestamp._,
                sentBy : {
                    username: user.Username._,
                    id: user.RowKey._
                }  
            }
        });
    }
}

module.exports = {
    MessageService,
}