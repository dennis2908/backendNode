const path = require('path');	 
var async = require('async');
var flash = require('express-flash-messages')
const express = require('express');
const app = express();
var async = require('async');

const format = require('pg-format');
const pool = require('../database.js');

exports.get_data  = (async function(req, res){
	 var searchdata = "";	
  //console.log(req.query)
  if(req.query){
	 if(typeof req.query.username !== 'undefined')
		  searchdata = "where username like '%"+req.query.username+"%'"
	 if(typeof req.query.firstname !== 'undefined'){
		  if(searchdata!=="")
			  searchdata += " AND firstname like '%"+req.query.firstname+"%'"
		  else
			  searchdata = "where username like '%"+req.query.username+"%'"
	  }
	  if(typeof req.query.lastname !== 'undefined'){
		  if(searchdata!=="")
			  searchdata += " AND lastname like '%"+req.query.lastname+"%'"
		  else
			  searchdata = "where lastname like '%"+req.query.lastname+"%'"
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
  var _sql_rest_url = "SELECT * from employee "+searchdata+ascdesc+" limit "+req.params.limit+" offset "+req.params.offset
  var rows = await pool.query(_sql_rest_url)
  res.json(rows.rows); 
   
});
exports.get_data_by_id  = (async function(req, res){

  if(typeof req.params.id !== 'undefined'){
	var _sql_rest_url = "SELECT * from employee where id = "+req.params.id
	var rows = await pool.query(_sql_rest_url)
	res.json(rows.rows[0]); 
  }
   
});

exports.get_all_data  = (async function(req, res){

    var _sql_rest_url = "SELECT * from employee order by username"
	  var rows = await pool.query(_sql_rest_url)
  	res.json(rows.rows); 
   
});

exports.save_data  = (async function(req, res){	
	pool.query(
  'insert into employee(username,firstName,lastName,email,birthDate,basicsalary,status,groupdata,created_date) values ($1,$2,$3,$4,$5,$6,$7,$8,now())',
  [req.body.username,req.body.firstname,req.body.lastname,req.body.email,req.body.birthdate,req.body.basicsalary,req.body.status,req.body.groupdata],
  (err, res) => {
   if (err) console.log(err);

  
  }
  )
  res.json(true); 
});

exports.update_data  = (async function(req, res){	
	pool.query(
  'update employee set username=$1,firstName=$2,lastName=$3,email=$4,birthDate=$5,basicsalary=$6,status=$7,created_date=now(),groupdata=$8 where id = $9',
  [req.body.username,req.body.firstname,req.body.lastname,req.body.email,req.body.birthdate,req.body.basicsalary,req.body.status,req.body.groupdata,req.params.id],
  (err, res) => {
   if (err) console.log(err);

  }
 ); 
 res.json(true); 
});

exports.delete_data  = (async function(req, res){	
	pool.query(
  'delete from employee where id = $1',
  [req.params.id],
  (err, res) => {
   if (err) console.log(err);
   
  })
  res.json(true); 
});