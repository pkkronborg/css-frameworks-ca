import { auth } from "./auth.js";
const getUrl = "https://api.noroff.dev/api/v1/social/posts?_author=true";

const feedPosts = document.getElementById("feedPosts");

/**
 * Get posts from API.
 *
 * Creating html cards for each posts.
 */
async function getPosts() {
  try {
    const getPostOptions = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(getUrl, getPostOptions);
    const result = await response.json();
    console.log(result);
    for (let i = 0; i < 30; i++) {
      var media = result[i].media;
      const { id, title, body, author } = result[i];
      if (media === null) {
        media = "";
      } else {
        media = result[i].media;
      }
      feedPosts.innerHTML += `
      <div class="col py-2 posts">
      <a href="postDetails.html?id=${id}" class="text-decoration-none text-reset">
          <div class="card p-3 rounded-0">
            <h3 class="card-title">${title}</h3>
            <p class="card-text">${author.name}</p>
            <p class="card-text">
            ${body}
            </p>
            <img
              src="${media}"
              class="card-img-top rounded-0 media"
              alt=""
            />
          </div>
        </a>
      </div>
        `;
    }
  } catch (error) {
    feedPosts.innerHTML += `Something went wrong, ${error}`;
  }
}

getPosts();
