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
	 if(typeof req.query.role_name !== 'undefined')
		  searchdata = "where role_name like '%"+req.query.role_name+"%'"
	  
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
  var _sql_rest_url = "SELECT * from role "+searchdata+ascdesc+" limit "+req.params.limit+" offset "+req.params.offset
  var rows = await pool.query(_sql_rest_url)
  res.json(rows.rows); 
   
});
exports.get_data_by_id  = (async function(req, res){

  if(typeof req.params.id !== 'undefined'){
	var _sql_rest_url = "SELECT * from role where id = "+req.params.id
	var rows = await pool.query(_sql_rest_url)
	res.json(rows.rows[0]); 
  }
   
});

exports.get_all_data  = (async function(req, res){
    var _sql_rest_url = "SELECT * from role order by role_name"
	var rows = await pool.query(_sql_rest_url)
	res.json(rows.rows); 
	
   
});

exports.save_data  = (async function(req, res){	
	pool.query(
  'insert into role(role_name) values ($1)',
  [req.body.role_name],
  (err, res) => {
   if (err) console.log(err);

  
  }
  )
  res.json(true); 
});

exports.update_data  = (async function(req, res){	
	pool.query(
  'update role set role_name=$1 where id = $2',
  [req.body.role_name,req.params.id],
  (err, res) => {
   if (err) console.log(err);

  }
 ); 
 res.json(true); 
});

exports.update_assign  = (async function(req, res){	
	pool.query(
  'update role set role_assign=$1 where id = $2',
  [req.body.role_assign,req.params.id],
  (err, res) => {
   if (err) console.log(err);

  }
 ); 
 res.json(true); 
});

exports.delete_data  = (async function(req, res){	
	pool.query(
  'delete from role where id = $1',
  [req.params.id],
  (err, res) => {
   if (err) console.log(err);
   
  })
  res.json(true); 
});