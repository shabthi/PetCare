var db = require('../db').getDb();

module.exports = class Stats {

    static newUser(){
        var db = require('../db').getDb();
        let date = new Date().toISOString().split("T")[0];
        db.collection('report_data').update({date:date}, {$inc: {new_users:1}}, { upsert: true, multi: true });
    }

    static adoptionsByDay(start, end) {

        var db = require('../db').getDb();
        return new Promise(function (resolve, reject) {
            db.collection('report_data').find(
                {
                    "date": { $gte: start, $lte: end }
                },
                { 
                    'adoptions': 1, 'date': 1, '_id':0 
                }
            ).toArray(function (err, documents) {

                if (err) {
                    reject("DB Error");
                    return;
                }


                var res = {};
                documents.forEach(function(document){
                    res[document.date] = document.adoptions;
                })

                console.log(res);   

                resolve(res);

            })
        });
    }

    static requestsByDay(start, end) {
        var db = require('../db').getDb();
        return new Promise(function (resolve, reject) {
            db.collection('report_data').find(
                {
                    "date": { $gte: start, $lte: end }
                },
                { 
                    'requests': 1, 'date': 1, '_id':0 
                }
            ).toArray(function (err, documents) {

                if (err) {
                    reject("DB Error");
                    return;
                }


                var res = {};
                documents.forEach(function(document){
                    res[document.date] = document.requests;
                })

                console.log(res);   

                resolve(res);

            })
        });
    }

    static petsByDay(start, end) {
        var db = require('../db').getDb();
        return new Promise(function (resolve, reject) {
            db.collection('report_data').find(
                {
                    "date": { $gte: start, $lte: end }
                },
                { 
                    'pets': 1, 'date': 1, '_id':0 
                }
            ).toArray(function (err, documents) {

                if (err) {
                    reject("DB Error");
                    return;
                }


                var res = {};
                documents.forEach(function(document){
                    res[document.date] = document.pets;
                })

                console.log(res);   

                resolve(res);

            })
        });
    }

    static usersByDay(start, end) {
        var db = require('../db').getDb();
        return new Promise(function (resolve, reject) {
            db.collection('report_data').find(
                {
                    "date": { $gte: start, $lte: end }
                },
                { 
                    'new_users': 1, 'date': 1, '_id':0 
                }
            ).toArray(function (err, documents) {

                if (err) {
                    reject("DB Error");
                    return;
                }


                var res = {};
                documents.forEach(function(document){
                    res[document.date] = document.new_users;
                })

                console.log(res);   

                resolve(res);

            })
        });
    }

}