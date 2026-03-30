//Global variables--------------------------------------------------------
let posts = JSON.parse(localStorage.getItem("posts")) || [];



// DOM variables----------------------------------------------------------
const form = document.getElementById("postForm");
const postTitle = document.getElementById("title");
const postContent = document.getElementById("content");
const titleError = document.getElementById("titleError");
const contentError = document.getElementById("contentError");
const blogDisplay = document.getElementById("blogPostDisplay");


//Functions---------------------------------------------------------------
//Displays posts to browser
const renderPosts = () => {
    blogDisplay.innerHTML = "";

    posts.forEach((post) => {
        const postHTML = `
        <div class="card bg-base-200 p-4 shadow" data-id="${post.id}">
            <h3 class="text-lg font-bold">${post.title}</h3>
            <div class="flex gap-4">
                <p>${post.content}</p>
                <button class="removeBtn" >Remove</button>
            </div>
        </div>
        `;

        blogDisplay.innerHTML += postHTML;
    });

    console.log("rendering function...");

}


const removePost = (e) => {
    if (e.target.classList.contains("removeBtn")) {

        const postElement = e.target.closest(".card");
        const postId = Number(postElement.dataset.id);
        // new array with all posts whose id doesnt  match the one we clicked
        posts = posts.filter(post => post.id !== postId);

        localStorage.setItem("posts", JSON.stringify(posts));

        renderPosts();

        console.log(postId);
    }

}

//Handles submission
//Gets input values from submit event and checks validity
const handleSubmit = (e) => {
    e.preventDefault();

    const titleInput = postTitle.value.trim();
    const contentInput = postContent.value.trim();
    let isValid = true;

    //title validation
    if (!titleInput || titleInput.length < 5) {
        titleError.textContent = "Your title is too short!";
        isValid = false;

    } else {
        titleError.textContent = "";

    }

    //content validation
    if (!contentInput || contentInput.length < 10) {
        contentError.textContent = "Make your post more lively with more words!";
        isValid = false;

    } else {
        contentError.textContent = "";

    }

    //checks and stops if invalid
    if (!isValid) {
        console.log("validation failed");
        return;
    }

    const newPostObj = {
        id: Date.now(),
        title: titleInput,
        content: contentInput,
        createdAt: new Date().toISOString()
    };

    posts.push(newPostObj);

    form.reset();

    localStorage.setItem("posts", JSON.stringify(posts));

     renderPosts();

}



//Event Listening & Calls--------------------------------------------------
form.addEventListener("submit", handleSubmit)

blogDisplay.addEventListener("click", removePost)