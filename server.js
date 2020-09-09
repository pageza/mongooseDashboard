//Importing the Express framework
const express = require("express");
// Importing animal
const mongoose = require("mongoose");

//Assigning Express to an object so we can use the functions
const app = express();

// Connecting mongoose to the MongoDB
mongoose.connect('mongodb://localhost/mongooseDashboard', {useNewUrlParser: true});

// Creating Schema and model 
const AnimalSchema = new mongoose.Schema({
    type: String,
    name: String,
    age: Number
   })
// create an object that contains methods for mongoose to interface with MongoDB
const Animal = mongoose.model('Animal', AnimalSchema);
   

//Setting the Express app to use the static folder
app.use(express.static(__dirname + "/static"));
//Setting the Express app to accept POST requests
app.use(express.urlencoded({extended: true}));

//Setting the Express app to use the EJS view enging and setting the directory for the views
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

//These are the routes

//This route will display all animals
app.get('/', (req,res) => {
  Animal.find()
    .then(data => res.render('animals', {animals: data}))
    .catch(err => res.json(err));
})

//This will display one animal by id
app.get('/animals/:id', (req,res) => {
  Animal.findById(req.params.id)
    .then(data => res.render('animal', {animal:data}))
    .catch(err => res.json(err))
})

//This will display a form to make a new animal
app.get('/animals/new', (req,res) => {
  res.render('create')
})

//This will be the POST action route for creating a new animal from GET /animals/new
app.post('/animals', (req,res) => {
  console.log(req.body);
  const animal = new Animal();
  animal.type = req.body.type;
  animal.name = req.body.name;
  animal.age = req.body.age;
  animal.save()
    .then(newAnimalData => console.log('animal created: ', newAnimalData))
    .catch(err => console.log(err))
  res.redirect('/');
})

//This will show a form to edit an existing animal
app.get('/animals/edit/:id', (req, res) => {
  Animal.findById(req.params.id)
    animal.name = req.body.name;
    animal.type = req.body.type;
    animal.age = req.body.age;
    animal.save()
      .then(updatedAnimalData => console.log('animal updated: ', updatedAnimalData))
      .catch(err => console.log(err))
    res.redirect('/')
})

//This will be the POST action for the form to edit a animal from '/animals/edit/:id'
app.post('/animals/:id')

//This will be the POST action to destroy a animal by id
app.post('/animals/destroy/:id')

//This sets the Express app to listen to port 8000 on our localhost
app.listen(8080, () => console.log("listening on 8080"));

