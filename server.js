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
    name: String,
    description: String,
    supplies: [String],
    image: String

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

// GET from /api/crafts 
app.get("/api/crafts", async (request, response) => 
{
    console.log("API requested");
    // response.send("Test");
        
    // FOR TESTING: console.log(crafts);

    const crafts = await Craft.find();

    
    response.send(crafts);

});

// GET from specific ID in /api/crafts 
app.get("/api/crafts/:id", async (request, response) => 
{
    console.log("API with ID requested");

    const craftID = request.params.id;

    const craft = await Craft.findOne({_id:id});

    
    response.send(craft);

});


// Creates new array "crafts" and populates 
let crafts = 
[
    {
        _id: "0",
        name: "Beaded JellyFish",
        image: "bead-jellyfish.jpg",
        description: "Create a hanging jellyfish using eggcartons and multicolored beads",
        supplies: [
            "String",
            "Egg cartons",
            "Beads"
        ]
    },
    {
        _id: "1",
        name: "Character Bookmarks",
        image: "bookmarks.jpeg",
        description: "Create a little birdy bookmark to always remin you were you were",
        supplies: [
            "Yellow construction paper",
            "Orange construction paper",
            "Black construction paper"
        ]
    },
    {
        _id: "2",
        name: "Button Flowers",
        image: "button-flowers.jpeg",
        description: "Create a fun bouquet of flowers with your favorite buttons",
        supplies: [
            "Multicolored buttons",
            "Multicolored flet",
            "Green straws",
            "Ribbon"
        ]
    },
    
];


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
    crafts.push(newCraft);

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
    const updateCraftResult = await Craft.updateOne({_id:id}, craftFieldsToUpdate);

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