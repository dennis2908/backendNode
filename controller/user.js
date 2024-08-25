const path = require('path');	 
var async = require('async');
var flash = require('express-flash-messages')
const express = require('express');

const session = require('express-session');
const app = express();
var async = require('async');

const jwt = require('jsonwebtoken');

const dotenv = require('dotenv');

const format = require('pg-format');
const pool = require('../database.js');

 const bcrypt = require("bcrypt");



 dotenv.config();

exports.get_data  = (async function(req, res){
	
  var searchdata = "";	
  
  if(req.query){
	 if(typeof req.query.username !== 'undefined')
		 
		  searchdata = "where username like '%"+req.query.username+"%'"
	 if(typeof req.query.name !== 'undefined'){
		  if(searchdata!=="")
			  searchdata += " AND name like '%"+req.query.name+"%'"
		  else
			  searchdata = "where name like '%"+req.query.name+"%'"
	  }
	  if(typeof req.query.email !== 'undefined'){
		  if(searchdata!=="")
			  searchdata += " AND email like '%"+req.query.email+"%'"
		  else
			  searchdata = "where email like '%"+req.query.email+"%'"
	  }
	  if(typeof req.query.role_name !== 'undefined'){
		  if(searchdata!=="")
			  searchdata += " AND role_name like '%"+req.query.role_name+"%'"
		  else
			  searchdata = "where role_name like '%"+req.query.role_name+"%'"
	  }
	  if(typeof req.query.namesort !== 'undefined')
	  {
		  var ascdesc = " order by "+req.query.namesort
	  }
	  else 
		  var ascdesc = " order by id"
	  if(typeof req.query.ascdesc !== 'undefined'){
      if(req.query.ascdesc==='1')
		  ascdesc += " desc"
	  else 
		  ascdesc += " asc"
	  }
	  else 
		  ascdesc += " desc"
  }
  if(parseInt(req.params.offset) < 0)
	  req.params.offset = 0
  
  let _sql_rest_url = "SELECT distinct(users.id) as idUser,users.*,role_name from users join role on users.m_role = role.id "
  _sql_rest_url += searchdata+ascdesc+" limit "+req.params.limit+" offset "+req.params.offset
//   console.log(_sql_rest_url);
  var rows = await pool.query(_sql_rest_url)
  res.json(rows.rows); 
   
});

exports.doLogin  = (async function(req, res){

    let _sql_rest_url = "SELECT users.*,role_name,role_assign from users join role on role.id = users.m_role where username = '"+req.body.username+"'"
	var rows = await pool.query(_sql_rest_url)
	if(Object.keys(rows.rows).length > 0){
		const validPassword = await bcrypt.compare(req.body.password, rows.rows[0].password);
		if(validPassword){
			let jwtSecretKey = process.env.JWT_SECRET_KEY;
			let data = {
				id:rows.rows[0].id
			}

			const token = jwt.sign(data, jwtSecretKey, {
				expiresIn: '30m'
			});

			const refreshToken = jwt.sign({
				data
			}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });
	 

			req.session.jwt = refreshToken;
			res.status(200).send({"token":token});
		}
		else 
			 res.json(false); 
	}
	else
	   res.json(false); 
   
});

// exports.doLogin  = (async function(req, res){

//     let _sql_rest_url = "SELECT users.*,role_name,role_assign from users join role on role.id = users.m_role where username = '"+req.body.username+"' and password = '"+req.body.password+"'"
// 	var rows = await pool.query(_sql_rest_url)
// 	if(Object.keys(rows.rows).length > 0){
// 		res.json(rows.rows[0]);	
// 	}
// 	else
// 	   res.json(false); 
   
// });

exports.findOneById  = (async function(id){

    let _sql_rest_url = "SELECT users.*,role_name,role_assign from users join role on role.id = users.m_role where users.id = '"+id+"'"
	var rows = await pool.query(_sql_rest_url)
	if(Object.keys(rows.rows).length > 0){
		return true;
	}
	else
		return false; 
   
});


exports.get_data_by_id  = (async function(req, res){

  if(typeof req.params.id !== 'undefined'){
	var _sql_rest_url = "SELECT * from users where id = "+req.params.id
	var rows = await pool.query(_sql_rest_url)
	res.json(rows.rows[0]); 
  }
   
});

exports.save_data  = (async function(req, res){	

   
    // now we set user password to hashed password
   const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
	pool.query(
  'insert into users(username,name,password,email,birthdate,m_role) values ($1,$2,$3,$4,$5,$6)',
  [req.body.username,req.body.name,req.body.password,req.body.email,req.body.birthdate,req.body.m_role],
  (err, res) => {
   if (err) console.log(err);

  
  }
  )
  res.json(true); 
});

exports.update_data  = (async function(req, res){	
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
	pool.query(
  'update users set username=$1,name=$2,password=$3,email=$4,birthdate=$5,m_role=$6 where id = $7',
  [req.body.username,req.body.name,req.body.password,req.body.email,req.body.birthdate,req.body.m_role,req.params.id],
  (err, res) => {
   if (err) console.log(err);

  }
 ); 
 res.json(true); 
});

exports.delete_data  = (async function(req, res){	
	pool.query(
  'delete from users where id = $1',
  [req.params.id],
  (err, res) => {
   if (err) console.log(err);
   
  })
  res.json(true); 
});