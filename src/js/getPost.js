import { auth } from "./auth.js";
const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");
const getUrl = `https://api.noroff.dev/api/v1/social/posts/${id}?_author=true`;

const detailPost = document.getElementById("detailPost");
const editablePostHeader = document.getElementById("postHeading");
const editablePostText = document.getElementById("postText");
const editablePostFile = document.getElementById("file");

/**
 * Get post with use of post id.
 *
 * Creates a post details page with card from the specific post.
 *
 * It also fill up the edit fields with info for the specific post
 *
 */
async function getPost() {
  try {
    const getPostOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth}`,
        id: id,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(getUrl, getPostOptions);
    const result = await response.json();
    const { title, body, author, media } = result;
    const postMedia = media || "";
    detailPost.innerHTML += `
      <div class="col py-2">
          <div class="card p-3 rounded-0">
            <h3 class="card-title">${title}</h3>
            <p class="card-text">Author: ${author.name}</p>
            <p class="card-text">
            ${body}
            </p>
            <img
              src="${postMedia}"
              class="card-img-top rounded-0 media"
              alt=""
            />
          </div>
        </div>
  `;
    editablePostHeader.value = result.title;
    editablePostText.value = result.body;
    editablePostFile.value = media;
  } catch (error) {
    detailPost.innerHTML = `Something went wrong, ${error}`;
  }
}

getPost();
