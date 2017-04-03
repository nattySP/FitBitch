import mongoose from 'mongoose';
import config from 'config';
import Promise from 'bluebird';

class DatabaseService {
    constructor(){
        this.db = null;
    }

    connect(){
        //debugger;
        var connectToDb = Promise.promisify(mongoose.connect, {context: mongoose});
        return connectToDb(config.mongo.connection)
            .then(()=>{
                this.db = mongoose.connection;
            })
            .catch((err)=>{
                console.log('Mongo Connection Error', err);
            })

    }
}

module.exports = new DatabaseService();