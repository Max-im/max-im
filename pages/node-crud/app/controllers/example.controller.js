const {MongoClient, ObjectID} = require('mongodb');


module.exports = {

	showHome: (req, res) => {
		res.render('pages/example');
	},



	addItem: function(req, res){
		res.send('res');
		MongoClient.connect(process.env.DB_URI, (error, db) => {
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
		res.send('res');
		MongoClient.connect(process.env.DB_URI, (error, db) => {
			if(error){
				return console.log('Unable to connect');
			}

			db.collection('tessssst').findOneAndDelete({
				 "_id" : new ObjectID(req.body.id)
			});

			db.close();
		});
	},


	updateItem: function(req, res){
		res.send('res');
		MongoClient.connect(process.env.DB_URI, (error, db) => {
			if(error){
				return console.log('Unable to connect');
			}

			db.collection('tessssst').findOneAndUpdate(
			{"_id" : new ObjectID(req.body.id)},
			{
				$set: {	name: req.body.name, val: req.body.phone },
				
			},
			{ returnOriginal: false });

			db.close();
		});
	},


	getData: function(req, res){

		MongoClient.connect(process.env.DB_URI, (error, db) => {
			if(error){
				return console.log('Unable to connect');
			}

			db.collection('tessssst').find().toArray().then( (docs) => {
				res.send(docs)

			});

			db.close();
		});
	}


}



