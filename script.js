//Global variables---------------------------------------------
let posts = [];


// DOM variables-----------------------------------------------
const form = document.getElementById("postForm");
const postTitle = document.getElementById("title");
const postContent = document.getElementById("content");
const titleError = document.getElementById("titleError");
const descriptionError = document.getElementById("contentError");
const blogDisplay = document.getElementById("blogPostDisplay");


//Functions---------------------------------------------------
//Displays posts
const renderPost = (e) =>{
    console.log("rendering function...");

}

//Handles submission
const handleSubmit = () =>{
    
    console.log("submitting...")
}



//Event Listening & Calls
form.addEventListener("submit", renderPost)