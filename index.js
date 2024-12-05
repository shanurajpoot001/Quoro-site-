const express = require("express");
const app = express();
const port = 8080;
const { v4: uuidv4} = require('uuid');
const path = require("path"); // folder access process
// method override access krne ke liye
const methodOverride = require("method-override");

// all API read using this
app.use(express.urlencoded({ extended : true}));
app.use(methodOverride("_method"));

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname, "views")); // path view access process

app.use(express.static(path.join(__dirname, "public"))); // path public access process

let posts = [
  {
    id: uuidv4(),
    username: "shanu rajpoot",
    content: "hard work is important"
  },
  {
    id: uuidv4(),
    username: "mr this",
    content: "hard work is important"
  },
  {
    id: uuidv4(),
    username: " miss this",
    content: "hard work is important"
  },
];

app.get("/posts" ,(req, res) =>{
  res.render("index.ejs" , {posts});
});

app.get("/posts" , (req , res) =>{
  res.send("server is working well!")
});

app.get("/posts/new" , (req ,res) =>{
  res.render("new.ejs");
});

app.post("/posts" , (req, res) =>{
  let { username , content} = req.body;
  let id = uuidv4();
  posts.push({ id , username , content});
 // res.send("post request working!");
  res.redirect("/posts"); // that are use to link multi pages
});

app.get("/posts/:id", (req,res) =>{
  let {id} = req.params;
  console.log(id);
  let post = posts.find((p) =>  id === p.id);
  res.render("show.ejs" , { post});
});

app.patch("/posts/:id" , (req , res) =>{
  let {id} = req.params;
  let newCont = req.body.content;
  let post = posts.find((p) =>  id === p.id);
  post.content = newCont;
  console.log(post);
  res.redirect("/posts");

  //console.log(newCont , id);
  //res.send("patch request is working!");
});

app.delete("/posts/:id" , (req,res) => {
  let {id} = req.params;
  posts = posts.filter((p) =>  id !== p.id);
  res.redirect("/posts");
});

app.get("/posts/:id/edit", (req , res) =>{
  let {id} = req.params;
  let post = posts.find((p) =>  id === p.id);
  res.render("edit.ejs" , {post});
});

app.listen(port , () =>{
  console.log("listen to port: 8080");
});