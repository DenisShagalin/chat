const express = require('express');
const router = express.Router();

const mysql = require("mysql2");


router.get('/', (req, res) => {

	const connection = mysql.createConnection({
		host: "127.0.0.1",
		user: "root",
		database: "library",
		password: ""
	});

	connection.query("SELECT * FROM users",
		function (err, results, fields) {
			console.log(err);
			console.log(results); // собственно данные
			console.log(fields); // мета-данные полей 
		});
	connection.end();
});

module.exports = router;
