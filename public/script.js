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


const getCrafts = async() =>
{
    try
    {
        // let response = await fetch("http://localhost:3000/api/crafts");
        // let response = await fetch("https://csce242assignment18server.onrender.com/api/crafts");
        return (await fetch("api/crafts/")).json();

    }
    catch(error)
    {
        console.log(error);
        // errorPrompt(result.error);


        return "";

    }

};


const showCrafts = async() =>
{
    craftsJSON = await getCrafts();

    const craftsDiv = document.getElementById("crafts");
    craftsDiv.innerHTML = "";

    if(craftsJSON == "")
    {
        craftsDiv.innerHTML = "There is no data to display"
    

        return;

    }

    const craftsContainer = document.createElement("section");
    craftsContainer.classList.add("crafts-container");
    craftsDiv.append(craftsContainer);

    let craftSection;

    for(let i=0; i<4; i++)
    {
        craftSection = document.createElement("section");
        craftSection.classList.add(`craft-section${i}`);
        craftsContainer.append(craftSection);

    }

    // FOR TESTING: console.log(craft);

    const craftSection0 = document.querySelector(".craft-section0");
    craftSection0.classList.add("craft-section0");
    // FOR TESTING: console.log(craftSection0);

    const craftSection1 = document.querySelector(".craft-section1");
    craftSection1.classList.add("craft-section1");

    const craftSection2 = document.querySelector(".craft-section2");
    craftSection2.classList.add("craft-section2");

    const craftSection3 = document.querySelector(".craft-section3");
    craftSection3.classList.add("craft-section3");


    // Sorts crafts into their respective columns for appearing as responsive images 
    for(let i=0; i<craftsJSON.length; i++)
    {
        // If craft ID has a remainder of 0 when divided by 4, places the craft in the section section (craftSection0) 
        if(i % 4 == 0)
        {
            const craftImage = document.createElement("img");
            craftImage.src = "images/" + craft.image;
            craftImage.classList.add("initial-image-preview");

            // Appends to craftSection0 
            craftSection0.append(craftImage);

            craftImage.onclick = (event) =>
            {
                // FOR TESTING: console.log("Clicked");

                // document.getElementById("crafts-modal").style.display = "block";
                openCraftsModal("expanded-image-section");
                openCraftsModal("expanded-info-section");

                const expandedInfoSection = document.getElementById("expanded-info-section");
                expandedInfoSection.innerHTML = "";

                const expandedCraftNameh3 = document.createElement("h2");
                expandedCraftNameh3.classList.add("inline");
                expandedCraftNameh3.innerHTML = craft.name;
                expandedInfoSection.append(expandedCraftNameh3);

                const editPencilLink = document.createElement("a");
                editPencilLink.innerHTML = "&#9998;";
                expandedInfoSection.append(editPencilLink);
                editPencilLink.id = "edit-pencil-image";

                const deleteXLink = document.createElement("a");
                deleteXLink.innerHTML = "X";
                expandedInfoSection.append(deleteXLink);
                deleteXLink.id = "delete-x-link";

                const expandedCraftDescriptionP = document.createElement("p");
                expandedCraftDescriptionP.innerHTML = craft.description;
                expandedInfoSection.append(expandedCraftDescriptionP);

                const expandedCraftSuppliesTitle = document.createElement("h3")
                expandedCraftSuppliesTitle.innerHTML = "Supplies:"
                expandedInfoSection.append(expandedCraftSuppliesTitle);

                const expandedCraftSuppliesUl = document.createElement("ul");
                
                for(let i=0; i<craft.supplies.length; i++)
                {
                    const expandedCraftSuppliesP = document.createElement("li");

                    expandedCraftSuppliesP.append(craft.supplies[i]);
                    
                    expandedCraftSuppliesUl.append(expandedCraftSuppliesP);
                    
                };
                
                expandedInfoSection.append(expandedCraftSuppliesUl);


                const expandedImageSection = document.getElementById("expanded-image-section");
                expandedImageSection.innerHTML = "";

                const expandedImage = document.createElement("img");
                expandedImage.classList.add("expanded-craft-image");
                expandedImage.src = "images/" + craft.image;
                expandedImageSection.append(expandedImage);

                editPencilLink.onclick = showAddCraftForm;
                
                deleteXLink.onclick = (event) => 
                {
                    event.preventDefault();
                    console.log("deleteXLink clicked")

                    deleteCraftPrompt(craft);

                } 

                populateCraftEditForm(craft);

            };

        }

        
        // If craft ID has a remainder of 1 when divided by 4, places the craft in the section section (craftSection1) 
        if(i % 4 == 1)
        {
            const craftImage = document.createElement("img");
            craftImage.src = "images/" + craft.image;
            craftImage.classList.add("initial-image-preview");

            // Appends to craftSection1 
            craftSection1.append(craftImage);

            craftImage.onclick = (event) =>
            {
                // FOR TESTING: console.log("Clicked");

                // document.getElementById("crafts-modal").style.display = "block";
                openCraftsModal("expanded-image-section");
                openCraftsModal("expanded-info-section");

                const expandedInfoSection = document.getElementById("expanded-info-section");
                expandedInfoSection.innerHTML = "";

                const expandedCraftNameh3 = document.createElement("h2");
                expandedCraftNameh3.classList.add("inline");
                expandedCraftNameh3.innerHTML = craft.name;
                expandedInfoSection.append(expandedCraftNameh3);

                const editPencilLink = document.createElement("a");
                editPencilLink.innerHTML = "&#9998;";
                expandedInfoSection.append(editPencilLink);
                editPencilLink.id = "edit-pencil-image";

                const deleteXLink = document.createElement("a");
                deleteXLink.innerHTML = "X";
                expandedInfoSection.append(deleteXLink);
                deleteXLink.id = "delete-x-link";

                const expandedCraftDescriptionP = document.createElement("p");
                expandedCraftDescriptionP.innerHTML = craft.description;
                expandedInfoSection.append(expandedCraftDescriptionP);

                const expandedCraftSuppliesTitle = document.createElement("h3")
                expandedCraftSuppliesTitle.innerHTML = "Supplies:"
                expandedInfoSection.append(expandedCraftSuppliesTitle);

                const expandedCraftSuppliesUl = document.createElement("ul");
                
                for(let i=0; i<craft.supplies.length; i++)
                {
                    const expandedCraftSuppliesP = document.createElement("li");

                    expandedCraftSuppliesP.append(craft.supplies[i]);
                    
                    expandedCraftSuppliesUl.append(expandedCraftSuppliesP);
                    
                };
                
                expandedInfoSection.append(expandedCraftSuppliesUl);


                const expandedImageSection = document.getElementById("expanded-image-section");
                expandedImageSection.innerHTML = "";

                const expandedImage = document.createElement("img");
                expandedImage.classList.add("expanded-craft-image");
                expandedImage.src = "images/" + craft.image;
                expandedImageSection.append(expandedImage);

                editPencilLink.onclick = showAddCraftForm;
                
                deleteXLink.onclick = (event) => 
                {
                    event.preventDefault();
                    console.log("deleteXLink clicked")

                    deleteCraftPrompt(craft);

                } 

                populateCraftEditForm(craft);

            };

        }

        // If craft ID has a remainder of 2 when divided by 4, places the craft in the section section (craftSection2) 
        if(i % 4 == 2)
        {
            const craftImage = document.createElement("img");
            craftImage.src = "images/" + craft.image;
            craftImage.classList.add("initial-image-preview");

            // Appends to craftSection1 
            craftSection2.append(craftImage);

            craftImage.onclick = (event) =>
            {
                // FOR TESTING: console.log("Clicked");

                // document.getElementById("crafts-modal").style.display = "block";
                openCraftsModal("expanded-image-section");
                openCraftsModal("expanded-info-section");

                const expandedInfoSection = document.getElementById("expanded-info-section");
                expandedInfoSection.innerHTML = "";

                const expandedCraftNameh3 = document.createElement("h2");
                expandedCraftNameh3.classList.add("inline");
                expandedCraftNameh3.innerHTML = craft.name;
                expandedInfoSection.append(expandedCraftNameh3);

                const editPencilLink = document.createElement("a");
                editPencilLink.innerHTML = "&#9998;";
                expandedInfoSection.append(editPencilLink);
                editPencilLink.id = "edit-pencil-image";

                const deleteXLink = document.createElement("a");
                deleteXLink.innerHTML = "X";
                expandedInfoSection.append(deleteXLink);
                deleteXLink.id = "delete-x-link";

                const expandedCraftDescriptionP = document.createElement("p");
                expandedCraftDescriptionP.innerHTML = craft.description;
                expandedInfoSection.append(expandedCraftDescriptionP);

                const expandedCraftSuppliesTitle = document.createElement("h3")
                expandedCraftSuppliesTitle.innerHTML = "Supplies:"
                expandedInfoSection.append(expandedCraftSuppliesTitle);

                const expandedCraftSuppliesUl = document.createElement("ul");
                
                for(let i=0; i<craft.supplies.length; i++)
                {
                    const expandedCraftSuppliesP = document.createElement("li");

                    expandedCraftSuppliesP.append(craft.supplies[i]);
                    
                    expandedCraftSuppliesUl.append(expandedCraftSuppliesP);
                    
                };
                
                expandedInfoSection.append(expandedCraftSuppliesUl);


                const expandedImageSection = document.getElementById("expanded-image-section");
                expandedImageSection.innerHTML = "";

                const expandedImage = document.createElement("img");
                expandedImage.classList.add("expanded-craft-image");
                expandedImage.src = "images/" + craft.image;
                expandedImageSection.append(expandedImage);

                editPencilLink.onclick = showAddCraftForm;
                
                deleteXLink.onclick = (event) => 
                {
                    event.preventDefault();
                    console.log("deleteXLink clicked")

                    deleteCraftPrompt(craft);

                } 

                populateCraftEditForm(craft);

            };

        }

        // If craft ID has a remainder of 3 when divided by 4, places the craft in the section section (craftSection3) 
        if(i % 4 == 3)
        {
            const craftImage = document.createElement("img");
            craftImage.src = "images/" + craft.image;
            craftImage.classList.add("initial-image-preview");

            // Appends to craftSection2
            craftSection3.append(craftImage);

            craftImage.onclick = (event) =>
            {
                // FOR TESTING: console.log("Clicked");

                // document.getElementById("crafts-modal").style.display = "block";
                openCraftsModal("expanded-image-section");
                openCraftsModal("expanded-info-section");

                const expandedInfoSection = document.getElementById("expanded-info-section");
                expandedInfoSection.innerHTML = "";

                const expandedCraftNameh3 = document.createElement("h2");
                expandedCraftNameh3.classList.add("inline");
                expandedCraftNameh3.innerHTML = craft.name;
                expandedInfoSection.append(expandedCraftNameh3);

                const editPencilLink = document.createElement("a");
                editPencilLink.innerHTML = "&#9998;";
                expandedInfoSection.append(editPencilLink);
                editPencilLink.id = "edit-pencil-image";

                const deleteXLink = document.createElement("a");
                deleteXLink.innerHTML = "X";
                expandedInfoSection.append(deleteXLink);
                deleteXLink.id = "delete-x-link";

                const expandedCraftDescriptionP = document.createElement("p");
                expandedCraftDescriptionP.innerHTML = craft.description;
                expandedInfoSection.append(expandedCraftDescriptionP);

                const expandedCraftSuppliesTitle = document.createElement("h3")
                expandedCraftSuppliesTitle.innerHTML = "Supplies:"
                expandedInfoSection.append(expandedCraftSuppliesTitle);

                const expandedCraftSuppliesUl = document.createElement("ul");
                
                for(let i=0; i<craft.supplies.length; i++)
                {
                    const expandedCraftSuppliesP = document.createElement("li");

                    expandedCraftSuppliesP.append(craft.supplies[i]);
                    
                    expandedCraftSuppliesUl.append(expandedCraftSuppliesP);
                    
                };
                
                expandedInfoSection.append(expandedCraftSuppliesUl);


                const expandedImageSection = document.getElementById("expanded-image-section");
                expandedImageSection.innerHTML = "";

                const expandedImage = document.createElement("img");
                expandedImage.classList.add("expanded-craft-image");
                expandedImage.src = "images/" + craft.image;
                expandedImageSection.append(expandedImage);

                editPencilLink.onclick = showAddCraftForm;
                
                deleteXLink.onclick = (event) => 
                {
                    event.preventDefault();
                    console.log("deleteXLink clicked")

                    deleteCraftPrompt(craft);

                } 

                populateCraftEditForm(craft);

            };

        }


    }


    // craftsJSON.forEach((craft) => 
    // {
    //     const craftImage = document.createElement("img");
    //     craftImage.src = "images/" + craft.image;
    //     craftImage.classList.add("initial-image-preview");

    //     // Appends to craftSection0 
    //     craftSection0.append(craftImage);

    //     craftImage.onclick = (event) =>
    //     {
    //         // FOR TESTING: console.log("Clicked");

    //         // document.getElementById("crafts-modal").style.display = "block";
    //         openCraftsModal("expanded-image-section");
    //         openCraftsModal("expanded-info-section");

    //         const expandedInfoSection = document.getElementById("expanded-info-section");
    //         expandedInfoSection.innerHTML = "";

    //         const expandedCraftNameh3 = document.createElement("h2");
    //         expandedCraftNameh3.classList.add("inline");
    //         expandedCraftNameh3.innerHTML = craft.name;
    //         expandedInfoSection.append(expandedCraftNameh3);

    //         const editPencilLink = document.createElement("a");
    //         editPencilLink.innerHTML = "&#9998;";
    //         expandedInfoSection.append(editPencilLink);
    //         editPencilLink.id = "edit-pencil-image";

    //         const deleteXLink = document.createElement("a");
    //         deleteXLink.innerHTML = "X";
    //         expandedInfoSection.append(deleteXLink);
    //         deleteXLink.id = "delete-x-link";

    //         const expandedCraftDescriptionP = document.createElement("p");
    //         expandedCraftDescriptionP.innerHTML = craft.description;
    //         expandedInfoSection.append(expandedCraftDescriptionP);

    //         const expandedCraftSuppliesTitle = document.createElement("h3")
    //         expandedCraftSuppliesTitle.innerHTML = "Supplies:"
    //         expandedInfoSection.append(expandedCraftSuppliesTitle);

    //         const expandedCraftSuppliesUl = document.createElement("ul");
            
    //         for(let i=0; i<craft.supplies.length; i++)
    //         {
    //             const expandedCraftSuppliesP = document.createElement("li");

    //             expandedCraftSuppliesP.append(craft.supplies[i]);
                
    //             expandedCraftSuppliesUl.append(expandedCraftSuppliesP);
                
    //         };
            
    //         expandedInfoSection.append(expandedCraftSuppliesUl);


    //         const expandedImageSection = document.getElementById("expanded-image-section");
    //         expandedImageSection.innerHTML = "";

    //         const expandedImage = document.createElement("img");
    //         expandedImage.classList.add("expanded-craft-image");
    //         expandedImage.src = "images/" + craft.image;
    //         expandedImageSection.append(expandedImage);

    //         editPencilLink.onclick = showAddCraftForm;
            
    //         // deleteXLink.onclick = deleteCraft.bind(this, craft);
    //         deleteXLink.onclick = (event) => 
    //         {
    //             event.preventDefault();
    //             console.log("deleteXLink clicked")

    //             deleteCraftPrompt(craft);

    //         } 

    //         populateCraftEditForm(craft);

    //     };

    // });

};

// Populates the edit form when the edit pencil is clicked 
populateCraftEditForm = (craft) =>
{
    const addCraftForm = document.getElementById("add-craft-form");

    addCraftForm._id.value = craft._id;
    addCraftForm.name_input.value = craft.name;
    addCraftForm.description_input.value = craft.description;

    document.getElementById("placeholder-preview-image").classList.remove("block");
    document.getElementById("placeholder-preview-image").classList.add("hidden");
    document.getElementById("image-preview").src = "images/" + craft.image;
    

    populateSupplies(craft.supplies);

};


const populateSupplies = (supplies) => 
{
    supplySection = document.getElementById("supplies-section");

    supplySection.innerHTML = "";
    
    supplies.forEach((supply) => 
    {
        const supplyInput = document.createElement("input");
        supplyInput.classList.add("supply");
        supplyInput.classList.add("block");
        supplyInput.type = "text";
        supplyInput.value = supply;
        supplySection.append(supplyInput);

    });

};


const openCraftsModal = (id) =>
{
    document.getElementById("crafts-modal").style.display = "block";

    // console.log("ID clicked: ", id);
    
    // Selects all of modal-content direct children for each item 
    document.querySelectorAll("#modal-content > *").forEach((item) =>
    {
        item.classList.add("hidden");
        // console.log("Item hidden: ", item);

        document.getElementById(id).classList.remove("hidden");
        // console.log("ID shown: ", id)

    });

};

const showAddCraftForm = (event) =>
{
    event.preventDefault();

    // document.getElementById("crafts-modal").style.display = "none";
    openCraftsModal("add-craft-form");

    document.querySelectorAll("#expanded-image-info-section > *").forEach((item) =>
    {
        item.classList.add("hidden");

    });

    // console.log(event.target);

    if(event.target.getAttribute("id") != "edit-pencil-image")
    {
        resetCraftForm();

        return;

    }

};

const addSupply = (event) =>
{
    event.preventDefault();

    document.getElementById("add-supply-click").onclick = addSupply;

    const supplySection = document.getElementById("supplies-section");

    const supplyInput = document.createElement("input");
    supplyInput.classList.add("supply");
    supplyInput.classList.add("block");
    supplyInput.type = "text";
    supplySection.append(supplyInput);

};

const resetCraftForm = () =>
{
    const addCraftForm = document.getElementById("add-craft-form");
    addCraftForm.reset();

    addCraftForm._id.value = "";

    document.getElementById("supplies-section").innerHTML = "";

    document.getElementById("image-preview").src = "";

};

const addCraft = async (event) =>
{
    event.preventDefault();

    let response;

    const addCraftForm = document.getElementById("add-craft-form");
    const addCraftFormData = new FormData(addCraftForm);
    addCraftFormData.append("supplies", getSupplies());

    console.log(...addCraftFormData);

    // If adding craft 
    if(addCraftForm._id.value.trim() == "")
    {   
        console.log("Adding craft (POST)")

        response = await fetch("/api/crafts", 
        {
            method: "POST",
            body: addCraftFormData,

        });

    }
    // If editing craft 
    else
    {
        console.log("Editing craft (PUT)");

        response = await fetch(`/api/crafts/${addCraftForm._id.value}`,
        {
            method: "PUT",
            body: addCraftFormData,

        });

    }

    console.log("Status: ", response.status);

    if(response.status != 200)
    {
        console.log("Error adding or editing craft data");
        // errorPrompt(result.error);


        return;

    }


    await response.json();
    resetCraftForm();
    document.getElementById("crafts-modal").style.display = "none";

    showCrafts();

};

deleteCraftPrompt = (craft) =>
{
    const deletePrompt = document.getElementById("delete-prompt");
    deletePrompt.innerHTML = "";
    
    const deletePromptText = document.createElement("h5");
    deletePromptText.innerHTML = "Are you sure you want to delete this craft?";
    deletePrompt.append(deletePromptText);
    
    const yesDelete = document.createElement("button");
    yesDelete.id = "yes-delete-button";
    yesDelete.innerHTML = "Yes";
    deletePrompt.append(yesDelete);

    const noDelete = document.createElement("button");
    noDelete.id = "no-delete-button";
    noDelete.innerHTML = "No";
    deletePrompt.append(noDelete);

    deletePrompt.classList.remove("hidden");

    yesDelete.onclick = deleteCraft.bind(this, craft);

    noDelete.onclick = () => 
    {
        console.log("noDelete clicked");

        deletePrompt.classList.add("hidden");

    }

}

const deleteCraft = async (craft) =>
{    
    let response = await fetch(`/api/crafts/${craft._id}`,
    {
        method:"DELETE",
        headers:
        {
            "Content-Type":"application/json;charset=utf-8"
        }
        
    });

    if(response.status != 200)
    {
        console.log("There was an error deleting the craft");
        // errorPrompt(result.error);


        return;

    }

    await response.json();
    resetCraftForm();
    document.getElementById("crafts-modal").style.display = "none";

    showCrafts();

};


const getSupplies = () =>
{
    const supplyInputs = document.querySelectorAll("#supplies-section input");

    const supplies = [];

    supplyInputs.forEach((input) =>
    {
        supplies.push(input.value);

    });


    return supplies;

};


showCrafts();

document.getElementById("add-craft-form").onsubmit = addCraft;

document.getElementById("plus-sign-add-craft").onclick = showAddCraftForm;
document.getElementById("add-supply-click").onclick = addSupply;

document.getElementById("image_input").onchange = (event) =>
{
    // const imagePreview = document.getElementById("image-preview");

    // If an image was not picked or the file chosen is blank 
    if(!event.target.files.length)
    {
        document.getElementById("image-preview").src = "";


        return;

    }

    document.getElementById("placeholder-preview-image").classList.remove("block");
    document.getElementById("placeholder-preview-image").classList.add("hidden");

    // Populates URL of src attribute of imagePreview with 0th (first/only) file chosen 
    document.getElementById("image-preview").src = URL.createObjectURL(event.target.files.item(0));

};

document.getElementById("cancel-add-craft-button").onclick = () =>
{
    console.log("Cancel button clicked");
    document.getElementById("crafts-modal").style.display = "none";

};

document.getElementById("modal-close").onclick = () =>
{
    // console.log("Clicked");
    document.getElementById("crafts-modal").style.display = "none";
    
    // document.getElementById("add-craft-form").style.display = "none";
    
    document.querySelectorAll("#expanded-image-info-section > *").forEach((item) =>
    {
        item.classList.add("hidden");

    });

};



// REJECTED CODE: 


// // If craft ID has a remainder of 0 when divided by 4, places the craft in the section section (craftSection0) 
// if(craft._id % 4 == 0)
// {
//     const craftImage = document.createElement("img");
//     craftImage.src = "images/" + craft.image;
//     craftImage.classList.add("initial-image-preview");

//     // Appends to craftSection0 
//     craftSection0.append(craftImage);

//     craftImage.onclick = (event) =>
//     {
//         // FOR TESTING: console.log("Clicked");

//         // document.getElementById("crafts-modal").style.display = "block";
//         openCraftsModal("expanded-image-section");
//         openCraftsModal("expanded-info-section");

//         const expandedInfoSection = document.getElementById("expanded-info-section");
//         expandedInfoSection.innerHTML = "";

//         const expandedCraftNameh3 = document.createElement("h2");
//         expandedCraftNameh3.classList.add("inline");
//         expandedCraftNameh3.innerHTML = craft.name;
//         expandedInfoSection.append(expandedCraftNameh3);

//         const editPencilLink = document.createElement("a");
//         editPencilLink.innerHTML = "&#9998;";
//         expandedInfoSection.append(editPencilLink);
//         editPencilLink.id = "edit-pencil-image";

//         const deleteXLink = document.createElement("a");
//         deleteXLink.innerHTML = "X";
//         expandedInfoSection.append(deleteXLink);
//         deleteXLink.id = "delete-x-link";

//         const expandedCraftDescriptionP = document.createElement("p");
//         expandedCraftDescriptionP.innerHTML = craft.description;
//         expandedInfoSection.append(expandedCraftDescriptionP);

//         const expandedCraftSuppliesTitle = document.createElement("h3")
//         expandedCraftSuppliesTitle.innerHTML = "Supplies:"
//         expandedInfoSection.append(expandedCraftSuppliesTitle);

//         const expandedCraftSuppliesUl = document.createElement("ul");
        
//         for(let i=0; i<craft.supplies.length; i++)
//         {
//             const expandedCraftSuppliesP = document.createElement("li");

//             expandedCraftSuppliesP.append(craft.supplies[i]);
            
//             expandedCraftSuppliesUl.append(expandedCraftSuppliesP);
            
//         };
        
//         expandedInfoSection.append(expandedCraftSuppliesUl);


//         const expandedImageSection = document.getElementById("expanded-image-section");
//         expandedImageSection.innerHTML = "";

//         const expandedImage = document.createElement("img");
//         expandedImage.classList.add("expanded-craft-image");
//         expandedImage.src = "images/" + craft.image;
//         expandedImageSection.append(expandedImage);

//         editPencilLink.onclick = showAddCraftForm;
        
//         // deleteXLink.onclick = deleteCraft.bind(this, craft);
//         deleteXLink.onclick = (event) => 
//         {
//             event.preventDefault();
//             console.log("deleteXLink clicked")

//             deleteCraftPrompt(craft);

//         } 

//         populateCraftEditForm(craft);

//     };

// }


// // If craft ID has a remainder of 1 when divided by 4, places the craft in the section section (craftSection1) 
// if(craft._id % 4 == 1)
// {
//     const craftImage = document.createElement("img");
//     craftImage.src = "images/" + craft.image;
//     craftImage.classList.add("initial-image-preview");

//     // Appends to craftSection1 
//     craftSection1.append(craftImage);

//     craftImage.onclick = (event) =>
//     {
//         // FOR TESTING: console.log("Clicked");

//         // document.getElementById("crafts-modal").style.display = "block";
//         openCraftsModal("expanded-image-section");
//         openCraftsModal("expanded-info-section");

//         const expandedInfoSection = document.getElementById("expanded-info-section");
//         expandedInfoSection.innerHTML = "";

//         const expandedCraftNameh3 = document.createElement("h2");
//         expandedCraftNameh3.classList.add("inline");
//         expandedCraftNameh3.innerHTML = craft.name;
//         expandedInfoSection.append(expandedCraftNameh3);

//         const editPencilLink = document.createElement("a");
//         editPencilLink.innerHTML = "&#9998;";
//         expandedInfoSection.append(editPencilLink);
//         editPencilLink.id = "edit-pencil-image";

//         const deleteXLink = document.createElement("a");
//         deleteXLink.innerHTML = "X";
//         expandedInfoSection.append(deleteXLink);
//         deleteXLink.id = "delete-x-link";

//         const expandedCraftDescriptionP = document.createElement("p");
//         expandedCraftDescriptionP.innerHTML = craft.description;
//         expandedInfoSection.append(expandedCraftDescriptionP);

//         const expandedCraftSuppliesTitle = document.createElement("h3")
//         expandedCraftSuppliesTitle.innerHTML = "Supplies:"
//         expandedInfoSection.append(expandedCraftSuppliesTitle);

//         const expandedCraftSuppliesUl = document.createElement("ul");
        
//         for(let i=0; i<craft.supplies.length; i++)
//         {
//             const expandedCraftSuppliesP = document.createElement("li");

//             expandedCraftSuppliesP.append(craft.supplies[i]);
            
//             expandedCraftSuppliesUl.append(expandedCraftSuppliesP);
            
//         };
        
//         expandedInfoSection.append(expandedCraftSuppliesUl);


//         const expandedImageSection = document.getElementById("expanded-image-section");
//         expandedImageSection.innerHTML = "";

//         const expandedImage = document.createElement("img");
//         expandedImage.classList.add("expanded-craft-image");
//         expandedImage.src = "images/" + craft.image;
//         expandedImageSection.append(expandedImage);

//         editPencilLink.onclick = showAddCraftForm;
        
//         deleteXLink.onclick = (event) => 
//         {
//             event.preventDefault();
//             console.log("deleteXLink clicked")

//             deleteCraftPrompt(craft);

//         } 

//         populateCraftEditForm(craft);

//     };

// }

// // If craft ID has a remainder of 2 when divided by 4, places the craft in the section section (craftSection2) 
// if(craft._id % 4 == 2)
// {
//     const craftImage = document.createElement("img");
//     craftImage.src = "images/" + craft.image;
//     craftImage.classList.add("initial-image-preview");

//     // Appends to craftSection1 
//     craftSection2.append(craftImage);

//     craftImage.onclick = (event) =>
//     {
//         // FOR TESTING: console.log("Clicked");

//         // document.getElementById("crafts-modal").style.display = "block";
//         openCraftsModal("expanded-image-section");
//         openCraftsModal("expanded-info-section");

//         const expandedInfoSection = document.getElementById("expanded-info-section");
//         expandedInfoSection.innerHTML = "";

//         const expandedCraftNameh3 = document.createElement("h2");
//         expandedCraftNameh3.classList.add("inline");
//         expandedCraftNameh3.innerHTML = craft.name;
//         expandedInfoSection.append(expandedCraftNameh3);

//         const editPencilLink = document.createElement("a");
//         editPencilLink.innerHTML = "&#9998;";
//         expandedInfoSection.append(editPencilLink);
//         editPencilLink.id = "edit-pencil-image";

//         const deleteXLink = document.createElement("a");
//         deleteXLink.innerHTML = "X";
//         expandedInfoSection.append(deleteXLink);
//         deleteXLink.id = "delete-x-link";

//         const expandedCraftDescriptionP = document.createElement("p");
//         expandedCraftDescriptionP.innerHTML = craft.description;
//         expandedInfoSection.append(expandedCraftDescriptionP);

//         const expandedCraftSuppliesTitle = document.createElement("h3")
//         expandedCraftSuppliesTitle.innerHTML = "Supplies:"
//         expandedInfoSection.append(expandedCraftSuppliesTitle);

//         const expandedCraftSuppliesUl = document.createElement("ul");
        
//         for(let i=0; i<craft.supplies.length; i++)
//         {
//             const expandedCraftSuppliesP = document.createElement("li");

//             expandedCraftSuppliesP.append(craft.supplies[i]);
            
//             expandedCraftSuppliesUl.append(expandedCraftSuppliesP);
            
//         };
        
//         expandedInfoSection.append(expandedCraftSuppliesUl);


//         const expandedImageSection = document.getElementById("expanded-image-section");
//         expandedImageSection.innerHTML = "";

//         const expandedImage = document.createElement("img");
//         expandedImage.classList.add("expanded-craft-image");
//         expandedImage.src = "images/" + craft.image;
//         expandedImageSection.append(expandedImage);

//         editPencilLink.onclick = showAddCraftForm;
        
//         deleteXLink.onclick = (event) => 
//         {
//             event.preventDefault();
//             console.log("deleteXLink clicked")

//             deleteCraftPrompt(craft);

//         } 

//         populateCraftEditForm(craft);

//     };

// }

// // If craft ID has a remainder of 3 when divided by 4, places the craft in the section section (craftSection3) 
// if(craft._id % 4 == 3)
// {
//     const craftImage = document.createElement("img");
//     craftImage.src = "images/" + craft.image;
//     craftImage.classList.add("initial-image-preview");

//     // Appends to craftSection2
//     craftSection3.append(craftImage);

//     craftImage.onclick = (event) =>
//     {
//         // FOR TESTING: console.log("Clicked");

//         // document.getElementById("crafts-modal").style.display = "block";
//         openCraftsModal("expanded-image-section");
//         openCraftsModal("expanded-info-section");

//         const expandedInfoSection = document.getElementById("expanded-info-section");
//         expandedInfoSection.innerHTML = "";

//         const expandedCraftNameh3 = document.createElement("h2");
//         expandedCraftNameh3.classList.add("inline");
//         expandedCraftNameh3.innerHTML = craft.name;
//         expandedInfoSection.append(expandedCraftNameh3);

//         const editPencilLink = document.createElement("a");
//         editPencilLink.innerHTML = "&#9998;";
//         expandedInfoSection.append(editPencilLink);
//         editPencilLink.id = "edit-pencil-image";

//         const deleteXLink = document.createElement("a");
//         deleteXLink.innerHTML = "X";
//         expandedInfoSection.append(deleteXLink);
//         deleteXLink.id = "delete-x-link";

//         const expandedCraftDescriptionP = document.createElement("p");
//         expandedCraftDescriptionP.innerHTML = craft.description;
//         expandedInfoSection.append(expandedCraftDescriptionP);

//         const expandedCraftSuppliesTitle = document.createElement("h3")
//         expandedCraftSuppliesTitle.innerHTML = "Supplies:"
//         expandedInfoSection.append(expandedCraftSuppliesTitle);

//         const expandedCraftSuppliesUl = document.createElement("ul");
        
//         for(let i=0; i<craft.supplies.length; i++)
//         {
//             const expandedCraftSuppliesP = document.createElement("li");

//             expandedCraftSuppliesP.append(craft.supplies[i]);
            
//             expandedCraftSuppliesUl.append(expandedCraftSuppliesP);
            
//         };
        
//         expandedInfoSection.append(expandedCraftSuppliesUl);


//         const expandedImageSection = document.getElementById("expanded-image-section");
//         expandedImageSection.innerHTML = "";

//         const expandedImage = document.createElement("img");
//         expandedImage.classList.add("expanded-craft-image");
//         expandedImage.src = "images/" + craft.image;
//         expandedImageSection.append(expandedImage);

//         editPencilLink.onclick = showAddCraftForm;
        
//         deleteXLink.onclick = (event) => 
//         {
//             event.preventDefault();
//             console.log("deleteXLink clicked")

//             deleteCraftPrompt(craft);

//         } 

//         populateCraftEditForm(craft);

//     };

// }