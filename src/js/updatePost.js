import { auth } from "./auth.js";
const queryString1 = document.location.search;
const params2 = new URLSearchParams(queryString1);
const id2 = params2.get("id");
const updateUrl = `https://api.noroff.dev/api/v1/social/posts/${id2}`;

const editForm = document.getElementById("editForm");
const postHeader = document.getElementById("postHeading");
const postText = document.getElementById("postText");
const postFile = document.getElementById("file");
const editError = document.getElementById("editError");

/**
 * Update a post with a API PUT request.
 *
 * The function is run when submiting the form
 *
 *
 *  @example
 * ```js
 * // From submit form
 * title
 * body
 * media
 * // method put with authorzation and id headers
 * ```
 */
async function updatePost(event) {
  event.preventDefault();
  const postData = {
    title: postHeader.value,
    body: postText.value,
    media: postFile.value,
  };
  const postOptions = {
    method: "PUT",
    body: JSON.stringify(postData),
    headers: {
      Authorization: `Bearer ${auth}`,
      id: id2,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await fetch(updateUrl, postOptions);
    console.log(response);
    const json = await response.json();
    console.log("json", json);
    if (response.ok === true) {
      window.location.reload();
    } else {
      editError.innerHTML = `${json.errors[0].message}`;
      setTimeout(function () {
        editError.innerHTML = "";
      }, 5000);
    }
  } catch (error) {
    console.log("dette er error:", error);
  }
}

editForm.addEventListener("submit", updatePost);
