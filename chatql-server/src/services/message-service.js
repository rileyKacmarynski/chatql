const guid = require('guid');

const { insertEntity, queryTable } = require('../helpers/azure-storage-wrapper');
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
             console.log(user.Username._)
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
}

module.exports = {
    MessageService,
}