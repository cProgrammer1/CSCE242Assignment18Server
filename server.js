/* 
    Created by Chrissy Dobrowolski 
    Assignment 18- Server CRUD with MongoDB (copied over from Assignment 17) 
    CSCE 242- 001 
    Due: 4.14.2024 

*/


// Function for displaying errors 
errorPrompt = (error) =>
{
    const errorPrompt = document.getElementById("error-prompt");
    errorPrompt.innerHTML = "";
    
    const errorPromptText = document.createElement("h5");
    errorPromptText.innerHTML = "ERROR: ", error;
    errorPrompt.append(errorPromptText);

    errorPrompt.classList.remove("hidden");

}


// Extensions Setup: 

const express = require("express");
const app = express();

const joi = require("joi");
const multer = require("multer");

app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.use(express.json());

const cors = require("cors");
app.use(cors());

const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const storage = multer.diskStorage
({
    destination: (request, file, cb) =>
    {
      cb(null, "./public/images/");

    },

    filename: (request, file, cb) => 
    {
      cb(null, file.originalname);

    },

});

const upload = multer({storage: storage});


// Mongoose/MongoDB Setup: 

mongoose
    .connect("mongodb+srv://cProgrammer1:D4U3SSP3tuIlt7HL@cluster0.wta7byh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => 
    {
        console.log("Connected to MongoDB")
        
    })
    .catch((error) => 
    {
        console.log("Couldn't connect to MongoDB; ERROR: ", error);
        errorPrompt(result.error);

    });

// Creates new schema (format for parameters) for crafts 
const craftSchema = new mongoose.Schema
({
    id: Number,
    name: String,
    description: String,
    supplies: [String],
    image: String,

});

// Creates new Object "Craft" with schema craftSchema 
const Craft = mongoose.model("Craft", craftSchema);


// GET from root 
app.get("/", (request, response) => 
{
    // FOR TESTING: 
        // response.send("Test");
        // const testArray = ["test1, test2, test3"];
        // response.send(testArray);

    // Responds with file in existing directory 
    response.sendFile(__dirname + "/index.html");

});


// Retrieves crafts from MongoDB database 
const getCrafts = async (response) =>
{
    const crafts = await Craft.find();

    response.send(crafts);

}

// GET from /api/crafts 
app.get("/api/crafts", (request, response) => 
{
    console.log("API requested");
    // response.send("Test");
        
    // FOR TESTING: console.log(crafts);

    getCrafts(response);

});

// GET from specific ID in /api/crafts 
app.get("/api/crafts/:id", async (request, response) => 
{
    console.log("API with ID requested");

    const craftID = request.params.id;

    const craft = await Craft.findOne({_id:craftID});

    response.send(craft);

});


// Adds a new craft  
app.post("/api/crafts", upload.single("image_input"), async (request, response) =>
{
  console.log("Inside POST");


  // Creates new variable "result" equal to validated craft 
  const result = validateCraft(request.body);

  if(result.error)
  {
    // In event of 400 error, sends result's first error in array of errors 
    response.status(400).send(result.error.details[0].message);
    errorPrompt(result.error);


    return;

  }

    // Creates new craft "newCraft" of type Craft and populates with form input 
    const newCraft = new Craft
    ({
        // _id: crafts.length,
        _id: ObjectId(request.params.id),
        name: request.body.name_input,
        description: request.body.description_input,
        supplies: request.body.supplies.split(",") // Splits comma-separated items in array 

    });

    if(request.file)
    {
        newCraft.image = request.file.filename;

    }


    // Saves newCraft 
    const saveCraft = await newCraft.save();

    console.log("New craft added: ", newCraft);

    response.send(newCraft);
  
    console.log("Past the validator");

});


// Edits an existing craft 
app.put("/api/crafts/:id", upload.single("image_input"), async (request, response) =>
{
    console.log("Inside PUT");


    // Creates new variable "result" equal to validated craft 
    const result = validateCraft(request.body);

    if(result.error)
    {
        // In event of 400 error, sends result's first error in array of errors 
        result.status(400).send(result.error.details[0].message);
        errorPrompt(result.error);
        

        return;

    }

    // Creates new variable "craftFieldsToUpdate" storing updated given craft information 
    let craftFieldsToUpdate = 
    {
        name: request.body.name_input,
        description: request.body.description_input,
        supplies: request.body.supplies.split(",") // Splits comma-separated items in array 

    }

    if(request.file)
    {
        craftFieldsToUpdate.image = "images/" + request.file.filename;

    }

    const craftID = request.params.id;

    // Creates new variable "deleteCraft" equal to given craft with updated information 
    const updateCraftResult = await Craft.updateOne({_id:craftID}, craftFieldsToUpdate);

    response.send(updateCraftResult);

});


app.delete("/api/crafts/:id", async (request, response) => 
{
    // Creates new variable "deleteCraft" equal to deleted craft 
    const deleteCraft = await Craft.findByIdAndDelete(request.params.id);
    
    response.send(deleteCraft);

});


function validateCraft(craft)
{
    const schema = joi.object
    ({
        // Can be empty or full if editing existing recipe 
        _id: joi.allow(""),

        name_input: joi.string().min(3).required(),
        description_input: joi.string().min(3).required(),

        // Allowed to not have supplies / be empty here 
        supplies: joi.allow(""),

        // image_input: joi.object().required(),

    });


    return schema.validate(craft);

}

// Listens to port 3000 for server 
app.listen(3000, () => 
{
    console.log("Listening to server");

});




// TEST CODE: 

/*

let testArray = 

[
    {
        _id: "0"
    },

    {
        _id: "0"
    },

    {
        _id: "0"
    },

];

const test = testArray.find((t) => t._id === "0");
console.log("test: ", test);

*/


// REJECTED CODE: 

/*

console.log(crafts[0]);
const craftID = parseInt(request.params.id);
console.log("Edit craft ID: " + craftID);
const editCraft = crafts.find((c) => c._id === craftID);

*/


// RETIRED CODE: 

/* 

// // "c" represents a craft 
    // const editCraft = crafts.find((c) => c._id === parseInt(request.params.id).toString());
    // console.log("editCraft: ", editCraft);

    // if(!editCraft)
    // {
    //     response.status(404).send("Recipe with the given ID was not found");

    // }

    // const result = validateCraft(request.body);

    // // In event of 400 error, sends result's first error in array of errors 
    // if(result.error)
    // {
    //     result.status(400).send(result.error.details[0].message);


    //     return;

    // }

    // editCraft.name = request.body.name_input;
    // editCraft.description = request.body.description_input;
    // editCraft.supplies = request.body.supplies.split(","); // Splits comma-separated items in array 

    // if(request.file)
    // {
    //     editCraft.image = request.file.filename;

    // }


    // response.send(crafts);

*/

/*

// const deleteCraft = crafts.find((c) => c._id === parseInt(request.params.id).toString());
    // console.log("deleteCraft: ", deleteCraft);

    // const craftIndex = crafts.indexOf(deleteCraft);
    // crafts.splice(craftIndex, 1);

    // response.send(deleteCraft);

*/

/* 

// // Defines how craft should look 
// const validateCraft = (craft) =>
// {
//   const schema = joi.object
//   ({
//     // Can be empty or full if editing existing recipe 
//     _id: joi.allow(""),

//     name_input: joi.string().min(3).required(),
//     description_input: joi.string().min(3).required(),

//     // Allowed to not have supplies / be empty here 
//     supplies: joi.allow(""),

//   });

//   return schema.validate(craft);

// };

*/

/* 

// Creates new array "crafts" and populates 
// let crafts = 
// [
//     {
//         _id: "0",
//         name: "Beaded JellyFish",
//         image: "bead-jellyfish.jpg",
//         description: "Create a hanging jellyfish using eggcartons and multicolored beads",
//         supplies: [
//             "String",
//             "Egg cartons",
//             "Beads"
//         ]
//     },
//     {
//         _id: "1",
//         name: "Character Bookmarks",
//         image: "bookmarks.jpeg",
//         description: "Create a little birdy bookmark to always remin you were you were",
//         supplies: [
//             "Yellow construction paper",
//             "Orange construction paper",
//             "Black construction paper"
//         ]
//     },
//     {
//         _id: "2",
//         name: "Button Flowers",
//         image: "button-flowers.jpeg",
//         description: "Create a fun bouquet of flowers with your favorite buttons",
//         supplies: [
//             "Multicolored buttons",
//             "Multicolored flet",
//             "Green straws",
//             "Ribbon"
//         ]
//     },
//     {
//         _id: "3",
//         name: "Cheerio Necklaces",
//         image: "cheerio-necklace.webp",
//         description: "Create a fun and edible necklace",
//         supplies: [
//             "Cheerios or Fruit Loops",
//             "Elastic string"
//         ]
//     },
//     {
//         _id: "4",
//         name: "Cotton Ball Cupcakes",
//         image: "cotton-ball-cupcakes.webp",
//         description: "Decorate your fun filled cupcake however you want.",
//         supplies: [
//             "Construction Paper",
//             "Cotton Balls",
//             "Black Sharpie",
//             "Glitter"
//         ]
//     },
//     {
//         _id: "5",
//         name: "School Themed Mason Jars",
//         image: "decorated-jars.jpeg",
//         description: "Let's make mason jars to ",
//         supplies: [
//             "Construction Paper",
//             "Cotton Balls",
//             "Black Sharpie",
//             "Glitter"
//         ]
//     },
//     {
//         _id: "6",
//         name: "Egg Carton Flowers",
//         image: "egg-carton-flowers.jpg",
//         description: "Make a beautiful bouquet with egg cartons and other items you can find around the house",
//         supplies: [
//             "Egg Cartons",
//             "Butons",
//             "Green Pipe Cleaner",
//             "Ribbon",
//             "Canvas"
//         ]
//     },
//     {
//         _id: "7",
//         name: "Finger Puppets",
//         image: "finger-puppets.jpeg",
//         description: "These little critters are easy to make, and will entertain your little one while they make a show.",
//         supplies: [
//             "Pom-poms",
//             "Googly Eyes",
//             "Pipe Cleaner"
//         ]
//     },
//     {
//         _id: "8",
//         name: "Ribbon Flower Headbands",
//         image: "flower-headbands.jpg",
//         description: "Let your little one show off her new style with these pretty and customizable headbands",
//         supplies: [
//             "Plain headband",
//             "Ribbon",
//             "Buttons",
//             "Gems"
//         ]
//     },
//     {
//         _id: "9",
//         name: "Hand Print Fish Puppets",
//         image: "handprint-fish.jpg",
//         description: "We all need to take every opportunity we can to remember those tiny hands, and what better way to do it, then to make fish puppets!",
//         supplies: [
//             "Popsicle sticks",
//             "Cardstock",
//             "Gems",
//             "Googly Eyes"
//         ]
//     },
//     {
//         _id: "10",
//         name: "Hand Print Tree",
//         image: "hand-print-tree.jpeg",
//         description: "This is a fun way to get your little one into finger painting.",
//         supplies: [
//             "Watercolor Paper",
//             "Finger paint"
//         ]
//     },
//     {
//         _id: "11",
//         name: "Melted Bead Bowl",
//         image: "melted-bead-bowl.jpeg",
//         description: "All they need to do is shape their faviorte design, warm it up and they have a brand new bowl.",
//         supplies: [
//             "Beads",
//             "Bowl",
//             "Parchment paper"
//         ]
//     },
//     {
//         _id: "12",
//         name: "Monster Kites",
//         image: "monster-rolls.jpg",
//         description: "Let's make those scary toilet paper rolls fly!",
//         supplies: [
//             "Toilet paper rolls",
//             "Paint",
//             "Tissue Paper",
//             "String"
//         ]
//     },
//     {
//         _id: "13",
//         name: "Pool Noodle Boats",
//         image: "noodle-boats.png",
//         description: "Let's make a boat that will actually float, due to the floating bottom of a pool noodle.",
//         supplies: [
//             "Pool Noodle",
//             "Straw",
//             "Plastic Paper"
//         ]
//     },
//     {
//         _id: "14",
//         name: "Paper Plate Bees",
//         image: "paper-plate-bees.jpeg",
//         description: "Let's have fun with making cute little bees, or big bees actually.",
//         supplies: [
//             "Paper Plate",
//             "Googly Eyes",
//             "Close Pins",
//             "Black pom poms",
//             "Yellow Paint",
//             "Black Paint"
//         ]
//     },
//     {
//         _id: "15",
//         name: "Paper Plate Dinosaurs",
//         image: "paper-plate-dinosaurs.jpg",
//         description: "Who would have thought that half a paper plate would be the base of a dinosaur.",
//         supplies: [
//             "Paper Plate",
//             "Paint",
//             "Close Pins",
//             "Construction Paper"
//         ]
//     },
//     {
//         _id: "16",
//         name: "Porcupine Leafs",
//         image: "porcupine-leaf.webp",
//         description: "Let's turn an ordinary paper plate into a fun filled mask.",
//         supplies: [
//             "Leafs",
//             "Berries",
//             "Acorns",
//             "Construction Paper"
//         ]
//     },
//     {
//         _id: "17",
//         name: "Rainbow Cloud",
//         image: "rainbow-cloud.webp",
//         description: "Some cotton and color and you'll have a beautiful rainbow.",
//         supplies: [
//             "Paper Plate",
//             "Cotton Balls",
//             "Construction Paper"
//         ]
//     },
//     {
//         _id: "18",
//         name: "Fun Shaped Crayons",
//         image: "shaped-crayons.jpg",
//         description: "Let's melt some crayons together and let them harden into fun shapes.",
//         supplies: [
//             "Broken Crayons",
//             "Mold"
//         ]
//     },
//     {
//         _id: "19",
//         name: "Straw Farris Wheel",
//         image: "straw-faris-wheel.jpg",
//         description: "It might be too small to ride, but this farris wheel is the most colorful of all.",
//         supplies: [
//             "Multicolored straws",
//             "Platform"
//         ]
//     },
//     {
//         _id: "20",
//         name: "Sunny String",
//         image: "sun-string.jpg",
//         description: "Let's practice our fine motor skills while we weave the string into a fun sun.",
//         supplies: [
//             "Yellow String",
//             "Paper Plate",
//             "Yellow construction paper",
//             "Yellow and Orange beads"
//         ]
//     },
//     {
//         _id: "21",
//         name: "Tissue Ballerinas",
//         image: "tisue-dancer.jpeg",
//         description: "These beautiful dancers will look great on display",
//         supplies: [
//             "Pipe cleaner",
//             "Tissue Paper",
//             "Elastics"
//         ]
//     },
//     {
//         _id: "22",
//         name: "Toilet Paper Roll Animals",
//         image: "toilet-paper-animals.jpeg",
//         description: "These beautiful dancers will look great on display",
//         supplies: [
//             "Toilet Paper Rolls",
//             "Construction Paper",
//             "Googly Eyes"
//         ]
//     },
//     {
//         _id: "23",
//         name: "Toilet Paper Butterfly",
//         image: "toilet-paper-butterfly.jpg",
//         description: "Such a sweat little flyer",
//         supplies: [
//             "Toilet Paper Rolls",
//             "Construction Paper",
//             "Googly Eyes",
//             "Buttons"
//         ]
//     },
//     {
//         _id: "24",
//         name: "Valentines Jar",
//         image: "valentines-jar.webp",
//         description: "So much hearts all in one",
//         supplies: [
//             "Clay",
//             "Glitter"
//         ]
//     },
// ];

*/