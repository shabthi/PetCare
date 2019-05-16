var db = require('../db').getDb();

module.exports = class Admin {

    static create(email, name, password){

        return new Promise(function(resolve, reject){
            var db = require('../db').getDb();
            var obj = {
                name:name,
                email:email,
                password:password,
                _id:email
            }
            db.collection('admins').insertOne(obj, function(err, result){
                if(err) reject(err);
                else resolve("Inserted");
            });
        });

    }
    
}