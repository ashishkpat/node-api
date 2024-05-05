// Module calling
var mongoose = require('mongoose');

// Server path
const url = 'mongodb://localhost:27017/nak_db';

// Name of the database
//const dbname = "student-api";

mongoose.connect(url, (err,client)=>{
	if(!err) {
		console.log("successful connection with the server");
	}
	else
		console.log("Error in the connectivity");
});