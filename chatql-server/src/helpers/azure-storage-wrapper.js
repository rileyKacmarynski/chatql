const insertEntity = (tableService, entity, partitionKey) =>{
    return new Promise(function(resolve, reject){
        tableService.insertEntity(partitionKey, entity, (error, result, response) => {
            if(error){
                reject(error);
            } else{
                resolve(result);
            }
        });
    });
}

const queryTable = (tableService, query, partitionKey) => {
    return new Promise((resolve, reject) => {
        tableService.queryEntities(partitionKey, query, null, (error, result, response) => {
            if(error){
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

const retrieveEntity = (tableService, table, partitionKey, rowKey ) => {
    return new Promise((resolve, reject) => {
        tableService.retrieveEntity(table, partitionKey, rowKey, (error, result, response) => {
            if(error){
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}


module.exports = {
    insertEntity,
    queryTable,
    retrieveEntity,
}