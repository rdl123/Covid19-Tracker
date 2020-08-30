const express=require("express");
var bodyParser=require('body-parser');
var sessions=require('express-session')

const app=express();

var session;
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(sessions({
  secret:'key',
  resave:false,
  saveUninitialized:true,

}))

const { Client, Query } = require('pg')

// Setup connection
var username = "postgres" // sandbox username
var password = "123456789" // read only privileges on our table
var host = "localhost:5432"
var database = "EHTP" // database name
var conString = "postgres://"+username+":"+password+"@"+host+"/"+database; // Your Database Connection

var database=[];

var query1 = 'SELECT id,objectid,nom_reg,pop_urbain,pop_rurale,cas_confirmes,cas_deces,taux_deces from "Regions"';
var query2='SELECT id,nomprefpro,cas_confirmes from "Provinces_wgs"';
app.all('/data_regions', function (req, res) {
  var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(query1));
  query.on("row", function (row, result) {
      result.addRow(row);
      database.push(row);
     
  });
  query.on("end", function (result) {
      res.send(result.rows);
      res.end();
  });
});
app.all('/data_provinces', function (req, res) {
  var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(query2));
  query.on("row", function (row, result) {
      result.addRow(row);
      database.push(row);
     
  });
  query.on("end", function (result) {
      res.send(result.rows);
      res.end();
  });
});


var query3= 'SELECT * from covid';

app.all('/datacovid', function (req, res) {
  var client = new Client(conString);
  client.connect();
  var query = client.query(new Query(query3));
  query.on("row", function (row, result) {
      result.addRow(row);
      database.push(row);
     
  });
  query.on("end", function (result) {
      res.send(result.rows);
      res.end();
  });
});

app.post('/login',function(req,res){
  session=req.session;
   if (req.body.username=='admin'&& req.body.password=='admin' )
   {
     session.uniqueID=req.body.username;
   }
  res.redirect('/admin.html');
})

app.post('/admin',function(req,res){
   console.log(req.body);
   var cas_confirmes_regions=req.body.cas_confirmes;
   var cas_deces_regions=req.body.cas_deces;
   var taux_deces_regions=req.body.taux_deces;
   var nbrcasconfirmes=req.body.nbrcas;
   var decedes=req.body.nbrdeces;
   var exclus=req.body.nbrexclus;
   var age=req.body.age;
   var gueris=req.body.nbrgueris;
   var client = new Client(conString);
   client.connect();
   client.query('UPDATE covid SET confirmes=($1), decedes=($2), "Exclus"=($3), "MoyenAge"=($4),"Gueris"=($5)',
    [nbrcasconfirmes,decedes,exclus,age,gueris]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=5',
    [cas_confirmes_regions,cas_deces_regions,taux_deces_regions]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=1',
    [req.body.cas_confirmesR,req.body.cas_decesR,req.body.taux_decesR]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=6',
    [req.body.cas_confirmesF,req.body.cas_decesF,req.body.taux_decesF]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=2',
    [req.body.cas_confirmesO,req.body.cas_decesO,req.body.taux_decesO]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=3',
    [req.body.cas_confirmesB,req.body.cas_decesB,req.body.taux_decesB]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=4',
    [req.body.cas_confirmesM,req.body.cas_decesM,req.body.taux_decesM]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=7',
    [req.body.cas_confirmesD,req.body.cas_decesD,req.body.taux_decesD]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=8',
    [req.body.cas_confirmesT,req.body.cas_decesT,req.body.taux_decesT]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=9',
    [req.body.cas_confirmesS,req.body.cas_decesS,req.body.taux_decesS]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=11',
    [req.body.cas_confirmesE,req.body.cas_decesE,req.body.taux_decesE]);
    client.query('UPDATE "Regions" SET cas_confirmes=($1), cas_deces=($2),taux_deces=($3) where id=12',
    [req.body.cas_confirmesL,req.body.cas_decesL,req.body.taux_decesL]);
    
    res.redirect('/')


})












app.listen(3000,() => console.log("listening at 3000"));



