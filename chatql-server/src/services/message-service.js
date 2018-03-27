const guid = require("guid");

const {
  insertEntity,
  queryTable,
  retrieveEntity
} = require("../helpers/azure-storage-wrapper");
const { CONNECTION_STRING, APP_SECRET } = require("../constants");

function makeMessageService({ azure, tableService }) {
  return Object.freeze({
    createMessage,
    getMessages
  });

  async function createMessage(user, content) {
    //send call to query the table
    const message = {
      //if I implement different rooms the partition key
      //will be the room name or something
      PartitionKey: { _: "Main" },
      RowKey: { _: guid.raw() },
      UserId: { _: user.RowKey._ },
      Content: { _: content }
    };
    try {
      const res = await insertEntity(tableService, message, "Message");
      const timestamp = new Date().toLocaleString();
      return {
        id: message.RowKey._,
        content: message.Content._,
        timestamp,
        sentBy: {
          username: user.Username._,
          id: user.RowKey._
        }
      };
    } catch (e) {
      throw new Error("Unable to register user");
    }
  }
  
  async function getMessages(take) {
      
    const query = new azure.TableQuery()
      .where("PartitionKey eq ?", "Main")
      .top(take);
    const messages = await queryTable(tableService, query, "Message");
    return messages.entries.map(async m => {
      const user = await retrieveEntity(
        tableService,
        "User",
        "User",
        m.UserId._
      );
      return {
        id: m.RowKey._,
        content: m.Content._,
        timestamp: m.Timestamp._,
        sentBy: {
          username: user.Username._,
          id: user.RowKey._
        }
      };
    });
  }
}

module.exports = {
  makeMessageService
};
