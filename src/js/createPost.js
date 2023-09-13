import { auth } from "./auth.js";
const postUrl = "https://api.noroff.dev/api/v1/social/posts";

const createForm = document.getElementById("createForm");
const postHeader = document.getElementById("postHeading");
console.log(postHeader);
const postText = document.getElementById("postText");
console.log(postText);
const postFile = document.getElementById("file");
console.log(postFile);

/**
 * Create a post with API POST request
 *
 * Input from creat form
 */
async function createPosts(event) {
  event.preventDefault();
  const postData = {
    title: postHeader.value,
    body: postText.value,
    media: postFile.value,
  };
  console.log(postFile.value);
  const postOptions = {
    method: "POST",
    body: JSON.stringify(postData),
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(postUrl, postOptions);
    console.log(response);
    const json = await response.json();
    console.log(json);
    window.location.reload();
  } catch (error) {
    console.log(error);
  }
}

createForm.addEventListener("submit", createPosts);
