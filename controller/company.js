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
	 if(typeof req.query.company_name !== 'undefined')
		  searchdata = "where company_name like '%"+req.query.company_name+"%'"
	 if(typeof req.query.address !== 'undefined'){
		  if(searchdata!=="")
			  searchdata += " AND address like '%"+req.query.address+"%'"
		  else
			  searchdata = "where address like '%"+req.query.address+"%'"
	  }
	  if(typeof req.query.email !== 'undefined'){
		  if(searchdata!=="")
			  searchdata += " AND email like '%"+req.query.email+"%'"
		  else
			  searchdata = "where email like '%"+req.query.email+"%'"
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
  var _sql_rest_url = "SELECT company.*,branch_name from company join branch on branch.id = company.m_branch "
  _sql_rest_url += searchdata+ascdesc+" limit "+req.params.limit+" offset "+req.params.offset
  var rows = await pool.query(_sql_rest_url)
  res.json(rows.rows); 
   
});
exports.get_data_by_id  = (async function(req, res){

  if(typeof req.params.id !== 'undefined'){
	var _sql_rest_url = "SELECT * from company where id = "+req.params.id
	var rows = await pool.query(_sql_rest_url)
	res.json(rows.rows[0]); 
  }
   
});

exports.get_all_data  = (async function(req, res){

    var _sql_rest_url = "SELECT * from company order by company_name"
	  var rows = await pool.query(_sql_rest_url)
  	res.json(rows.rows); 
   
});

exports.save_data  = (async function(req, res){	
	pool.query(
  'insert into company(company_name,address,email,m_branch,phone) values ($1,$2,$3,$4,$5)',
  [req.body.company_name,req.body.address,req.body.email,req.body.m_branch,req.body.phone],
  (err, res) => {
   if (err) console.log(err);

  
  }
  )
  res.json(true); 
});

exports.update_data  = (async function(req, res){	
	pool.query(
  'update company set company_name=$1,address=$2,email=$3,m_branch=$4,phone=$5 where id = $6',
  [req.body.company_name,req.body.address,req.body.email,req.body.m_branch,req.body.phone,req.params.id],
  (err, res) => {
   if (err) console.log(err);

  }
 ); 
 res.json(true); 
});

exports.delete_data  = (async function(req, res){	
	pool.query(
  'delete from company where id = $1',
  [req.params.id],
  (err, res) => {
   if (err) console.log(err);
   
  })
  res.json(true); 
});