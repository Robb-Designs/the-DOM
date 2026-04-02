# Blog Post App

A client-side blog post application that allows users to create, edit, and delete posts. Data is saved using the browser's local storage.

---


## How It Works

### HTML Structure

- A form for submitting posts
- A display section for rendering posts dynamically

Form fields:
- Title (minimum 5 characters)
- Content

---


### State Management

```js
let posts = JSON.parse(localStorage.getItem("posts")) || [];
```
---
# Reflection

One of the biggest things I worked through was how to manage state. Using an array to store posts and syncing it with localStorage helped me understand how data persists and updates across user interactions (which was a challenge I facedd initially, I didnt fully grasp this idea). At first, I had to think carefully about when to update the array versus when to re-render the UI, but that flow started to make more sense over time.

