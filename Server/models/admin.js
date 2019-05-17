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

    static login(email, password){

        return new Promise(function(resolve, reject){
            var db = require('../db').getDb();
            console.log(email);
            db.collection('admins').findOne({email:email}, function(err, document){
                if(err){
                    reject("DB error");
                    return;
                }
                if(document == null) reject("Email not found");
                else{
                    if(document.password != password) reject("Incorrect email or password");
                    else resolve(document.name);
                }
            });
        });

    }
    
}