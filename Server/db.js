var url = "mongodb://localhost:27017/PetCare";
var MongoClient = require('mongodb').MongoClient;
var _db;

module.exports = {

    connectToServer: function( callback ) {
      MongoClient.connect( url,  { useNewUrlParser: true }, function( err, client ) {
        _db  = client.db('PetCare');
        return callback( err );
      } );
    },
  
    getDb: function() {
      return _db;
    }
  };