// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const req = require("express/lib/request");
const res = require("express/lib/response");
const mongoose = require('mongoose');
const read = require("body-parser/lib/read");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
mongoose.connect("mongodb+srv://alfaz_hosain:01756279911@cluster0.ginyg.mongodb.net/todoListDB")

const peopleShema = new mongoose.Schema({
  name : String,
});

const People = mongoose.model('People', peopleShema);

const people = new People ({
  name : "",
});

const defaultItem = [people];

// CODE FOR GET THE DAY AND DATE

app.get("/", (req, res) => {
  let d = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let dayName = days[d.getDay()];
  if (d.getDay() === 6 || d.getDay === 0) {
    day = dayName;
  } else {
    day = dayName;
  }

  

  People.find({},function(err,foundItems){
    if (foundItems === day){
      People.insertMany(defaultItem,function(err) {
        if(err){
          console.log(err);
        }else{
          console.log("Success")
          res.redirect("/");
        };
      });
      
    }else{
      res.render("list", { kindOfDay: day, newListItems: foundItems});
    };
  });
});



// ADD NEW ITEM TO THE LIST 

app.post("/", (req, res) => {
  const itemName = req.body.todo;
  const newItem = new People({
    name: itemName,
    age : 20
  })
  newItem.save()
  res.redirect('/')
});

// REMOVE ITEMS FROM THE LIST 
app.post('/delete',(req,res)=>{
  const deleteItem = req.body.check;
  console.log(deleteItem)
  People.findByIdAndRemove(deleteItem, function(err){
    if(err){
      console.log(err);
    }else{
    res.redirect('/');
    };
  });
});


// SERVER RUNNING
app.listen(process.env.PORT || 3000, () => {
  console.log("Server started on port : 3000");
});
