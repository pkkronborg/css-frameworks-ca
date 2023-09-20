import { auth } from "./auth.js";
const postUrl = "https://api.noroff.dev/api/v1/social/posts";

const createForm = document.getElementById("createForm");
const postHeader = document.getElementById("postHeading");
const postText = document.getElementById("postText");
const postFile = document.getElementById("file");
const createError = document.getElementById("createError");

/**
 * Create a post with API POST request
 *
 * Input from creat form.
 *
 * Function runs when submiting form.
 *
 *  @example
 * * ```js
 * // From submit form
 * title
 * body
 * media
 * // method post with autorization header
 * ```
 */
async function createPosts(event) {
  event.preventDefault();
  const postData = {
    title: postHeader.value,
    body: postText.value,
    media: postFile.value,
  };
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
    const json = await response.json();
    if (response.ok === true) {
      window.location.reload();
    } else {
      createError.innerHTML = `${json.errors[0].message}`;
      setTimeout(function () {
        createError.innerHTML = "";
      }, 5000);
    }
  } catch (error) {
    createError.innerHTML = `Something went wrong, ${error}`;
  }
}

createForm.addEventListener("submit", createPosts);
