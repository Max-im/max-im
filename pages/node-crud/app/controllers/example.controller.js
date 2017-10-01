const {MongoClient, ObjectID} = require('mongodb');


module.exports = {

	showHome: (req, res) => {
		res.render('pages/example');
	},



	addItem: function(req, res){

		MongoClient.connect('mongodb://user:pass@ds157964.mlab.com:57964/crud', (error, db) => {
			if(error){
				return console.log('Unable to connect');
			}

			db.collection('tessssst').insert({
				name: req.body.name,
				val: req.body.val
			});

			db.close();
		});
	},



	removeItem: function(req, res){
		console.log(req.body.id)
		MongoClient.connect('mongodb://user:pass@ds157964.mlab.com:57964/crud', (error, db) => {
			if(error){
				return console.log('Unable to connect');
			}

			db.collection('tessssst').findOneAndDelete({
				 "_id" : new ObjectID("59d111789b723b089cbc4443")
			});

			db.close();
		});
	}


}



