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

 var dataPrometheus = require("../utils/metrics");

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

	const metricsLabels = {
		route: "/user/refresh/token",
  		method: "POST",
		operation: "refreshToken",
	  };

	const timer = dataPrometheus.restResponseTimeHistogram.startTimer();    
	
    let jwtRefreshToken = process.env.REFRESH_TOKEN_SECRET;
	

	const refreshToken = await req.cookies;

    try {
		let token = ""

		
		const refreshToken = req.session.jwt;

		console.log(12222,refreshToken)

		jwt.verify(refreshToken, jwtRefreshToken, (err) => {
	
			const decoded = jwt.verify(refreshToken, jwtRefreshToken);
			let jwtSecretKey = process.env.JWT_SECRET_KEY;
			let data = {
				id:decoded.data.id
			}
			const newtoken = jwt.sign(data, jwtSecretKey);
			res.json({"new token":newtoken});	

			const token = jwt.sign(data, jwtSecretKey, {
				expiresIn: '30m'
			});
		  });

		  timer({ ...metricsLabels, success: "true" });	
    } catch (error) {
        // Access Deniedzz
		timer({ ...metricsLabels, success: "false" });	
		return res.status(401).send("refresh token expires");
    }
   
});