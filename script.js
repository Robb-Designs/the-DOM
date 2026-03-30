//Global variables--------------------------------------------------------
let posts = JSON.parse(localStorage.getItem("posts")) || [];
let currentEditId = null;



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
                <button class="editBtn" >Edit</button>
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

const editPost = (e) => {
    if (e.target.classList.contains("editBtn")) {
        const postElement = e.target.closest(".card");
        const editId = Number(postElement.dataset.id);

        post = posts.find(post => post.id === editId);

        postTitle.value = post.title;

        postContent.value = post.content;

        currentEditId = editId;
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
        titleError.style.webkitTextFillColor = "red"
        titleError.textContent = "Your title is too short!";
        isValid = false;

    } else {
        titleError.textContent = "";

    }

    //content validation
    if (!contentInput || contentInput.length < 10) {
        contentError.style.webkitTextFillColor = "red"
        contentError.innerHTML = "Make your post more lively with more words!";
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

    if (currentEditId) {
        posts = posts.map(post => {
            if (post.id === currentEditId) {
                return {
                    ...post,
                    title: titleInput,
                    content: contentInput
                };
            } else {
                return post;
            }
        });

        currentEditId = null;

    } else {
        const newPostObj = {
            id: Date.now(),
            title: titleInput,
            content: contentInput,
            createdAt: new Date().toISOString()
        };

        posts.push(newPostObj);
    }

    localStorage.setItem("posts", JSON.stringify(posts));
    renderPosts();
    form.reset();

}



//Event Listening & Calls--------------------------------------------------
form.addEventListener("submit", handleSubmit)

blogDisplay.addEventListener("click", (e) => {
    removePost(e);
    editPost(e);
});