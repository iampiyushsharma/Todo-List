const express = require('express');
const bodyParser = require('body-parser');
const date = require(__dirname+"/date.js");
const app = express();


var items=[];
var workItems=[];


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))


app.set('view engine', 'ejs');


app.get("/", function(req, res) {
  let day = date();
  res.render("list", {listTital: day, newListItems: items})
})
app.post("/",function(req,res){
  let item = req.body.newItem
  if(req.body.list==="work"){
    if(req.body.send=="delete"){
      workItems.pop();
      res.redirect("/work")
    }
    else{
      workItems.push(item)
      res.redirect("/work")
    }
    
  }else{
    if(req.body.send=="delete"){
      items.pop()
      res.redirect("/");
    }else{
      items.push(item);
      res.redirect("/");
    }
    
    
  }
})


app.delete("/",function(req,res){
  //let itemd = req.body.newItem
  items.pop();
  console.log(items);
  res.redirect("/");
})


app.get("/work",function(req,res){
  res.render("list", {listTital:"work list", newListItems: workItems})
})


app.listen(3000, function() {
  console.log("server is running")
})
