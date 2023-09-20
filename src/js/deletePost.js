import { auth } from "./auth.js";
const queryString2 = document.location.search;
const params3 = new URLSearchParams(queryString2);
const postId = params3.get("id");
const deleteUrl = `https://api.noroff.dev/api/v1/social/posts/${postId}`;
const deleteButton = document.getElementById("deletePost");
const deleteError = document.getElementById("deleteError");
/**
 * Delete a post with a API Delete request.
 *
 * Headers need autorization and post ID.
 *
 */
async function deletePost(event) {
  event.preventDefault();
  try {
    const deletePostOptions = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${auth}`,
        ID: postId,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(deleteUrl, deletePostOptions);
    const json = await response.json();
    if (response.ok === true) {
      window.location.href = "index.html";
    } else {
      deleteError.innerHTML = `${json.errors[0].message}`;
      setTimeout(function () {
        deleteError.innerHTML = "";
      }, 5000);
    }
  } catch (error) {
    deleteError.innerHTML = `Something went wrong, ${error}`;
  }
}

deleteButton.addEventListener("submit", deletePost);
