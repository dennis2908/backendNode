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
  
  if(req.query){
	 if(typeof req.query.company_name !== 'undefined')
		  searchdata = "where company.company_name like '%"+req.query.company_name+"%'"
	  
	  if(typeof req.query.pic !== 'undefined'){
		  if(searchdata!=="")
			  searchdata += " AND pic like '%"+req.query.pic+"%'"
		  else
			  searchdata = "where pic like '%"+req.query.pic+"%'"
	  }
	  
	  if(typeof req.query.assignment_name !== 'undefined'){
		  if(searchdata!=="")
			  searchdata += " AND assignment_name like '%"+req.query.assignment_name+"%'"
		  else
			  searchdata = "where assignment_name like '%"+req.query.assignment_name+"%'"
	  }
	  
	  if(typeof req.query.namesort !== 'undefined')
	  {
		  if(req.query.namesort==="company_name")
				var ascdesc = " order by "+req.query.namesort
		  else 	
			  var ascdesc = " order by assignment."+req.query.namesort
	  }
	  else 
		  var ascdesc = " order by assignment.id"
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
  
  let _sql_rest_url = "SELECT assignment.*,company_name from assignment join company on company.id = assignment.m_company "
  _sql_rest_url += searchdata+ascdesc+" limit "+req.params.limit+" offset "+req.params.offset
  var rows = await pool.query(_sql_rest_url)
  res.json(rows.rows); 
   
});

exports.get_data_by_id  = (async function(req, res){

  if(typeof req.params.id !== 'undefined'){
	var _sql_rest_url = "SELECT * from assignment where id = "+req.params.id
	var rows = await pool.query(_sql_rest_url)
	res.json(rows.rows[0]); 
  }
   
});

exports.save_data  = (async function(req, res){	   
	pool.query(
  'insert into assignment(pic,employee,m_company,assignment_name) values ($1,$2,$3,$4)',
  [req.body.pic,req.body.employee,req.body.m_company,req.body.assignment_name],
  (err, res) => {
   if (err) console.log(err);

  
  }
  )
  res.json(true); 
});

exports.update_data  = (async function(req, res){
	pool.query(
  'update assignment set pic=$1,employee=$2,m_company=$3,assignment_name=$4 where id=$5',
   [req.body.pic,req.body.employee,req.body.m_company,req.body.assignment_name,req.params.id],
  (err, res) => {
   if (err) console.log(err);

  }
 ); 
 res.json(true); 
});

exports.delete_data  = (async function(req, res){	
	pool.query(
  'delete from assignment where id = $1',
  [req.params.id],
  (err, res) => {
   if (err) console.log(err);
   
  })
  res.json(true); 
});