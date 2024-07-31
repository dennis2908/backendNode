const path = require('path');	 
var async = require('async');
var flash = require('express-flash-messages')
const express = require('express');
const app = express();
var async = require('async');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

const format = require('pg-format');
const pool = require('../database.js');

 const bcrypt = require("bcrypt");

 dotenv.config();



exports.validateToken  = (async function(req, res, next){
    
	
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
		let token = ""

		
		if (req.headers.authorization.split(' ')[0] === 'Bearer') {
			token = req.headers.authorization.split(' ')[1];
		} 

		jwt.verify(token, jwtSecretKey, (err) => {
			if (err) {
				return res.status(401).send("Need Auth");
			}	
			next();
		  });
    } catch (error) {
        // Access Denied
		return res.status(401).send("Need Auth");
    }
   
});


exports.refreshToken  = (async function(req, res){
    
	
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
		let token = ""

		
		if (req.headers.authorization.split(' ')[0] === 'Bearer') {
			token = req.headers.authorization.split(' ')[1];
		} 

		jwt.verify(token, jwtSecretKey, (err) => {
			if (err) {
				return res.status(401).send("need auth");
			}	
			let jwtSecretKey = process.env.JWT_SECRET_KEY;
			let data = {
				time: Date(),
				userId: 12,
			}
			const newtoken = jwt.sign(data, jwtSecretKey);
			res.json({"new token":newtoken});	

			const token = jwt.sign(data, jwtSecretKey);
		  });
    } catch (error) {
        // Access Deniedzz
		return res.status(401).send("need auth");
    }
   
});