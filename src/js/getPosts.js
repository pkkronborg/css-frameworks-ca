import { auth } from "./auth.js";
const getUrl = "https://api.noroff.dev/api/v1/social/posts?_author=true";

const feedPosts = document.getElementById("feedPosts");
const searchButton = document.getElementById("searchButton");
const filter = document.getElementById("filter");

// Event listener filter and search
filter.addEventListener("change", filterChange);
searchButton.addEventListener("click", search);

let data = [];

/**
 * Get posts from API.
 *
 * Stores data for use for filter and search.
 *
 * Sending data to writePosts for creating html for feed.
 *
 * @throws {error} if fails
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
    data = result;
    writePosts(data);
  } catch (error) {
    feedPosts.innerHTML += `Something went wrong, ${error}`;
  }
}

getPosts();

/**
 *
 * Creating HTML for posts
 *
 * @params {array} posts - array of posts that are going to be rendered in the feed.
 *
 * creates html for post from an array
 */
function writePosts(posts) {
  feedPosts.innerHTML = "";
  for (let i = 0; i < 30; i++) {
    if (posts[i] === undefined) {
      return;
    }
    const { id, title, body, author, media } = posts[i];
    const postMedia = media || "";
    const postBody = body || "";
    feedPosts.innerHTML += `
    <div class="col py-2 posts">
    <a href="postDetails.html?id=${id}" class="text-decoration-none text-reset">
        <div class="card p-3 rounded-0">
          <h3 class="card-title">${title}</h3>
          <p class="card-text">${author.name}</p>
          <p class="card-text">
          ${postBody}
          </p>
          <img
            src="${postMedia}"
            class="card-img-top rounded-0 media"
            alt=""
          />
        </div>
      </a>
    </div>
      `;
  }
}

/**
 * Text search throug posts.
 *
 * Search text from input field.
 *
 * Searching throug body and title in data from api.
 *
 * searchData is sent to function writePosts
 *
 */
function search() {
  const searchText = document.getElementById("searchText");
  const search = searchText.value.toLowerCase();

  const searchData = data.filter((post) => {
    const { title, body } = post;
    const postBody = body || "";
    return (
      title.toLowerCase().includes(search) ||
      postBody.toLowerCase().includes(search)
    );
  });
  writePosts(searchData);
}

/**
 * Filter posts from data.
 *
 * All posts showing all posts.
 *
 * Only media posts filters to show just posts with media files.
 * Creates an array of posts and sent to function writePosts
 *
 *
 */
function filterChange() {
  if (filter.value === "media") {
    const filterData = data.filter((post) => {
      const { media } = post;
      const postMedia = media || "";
      return postMedia;
    });
    writePosts(filterData);
  } else {
    writePosts(data);
  }
}
