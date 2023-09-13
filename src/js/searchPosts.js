const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", search);

/**
 * Text search thorug posts.
 *
 * Searching throug body and title.
 *
 */
function search() {
  const searchText = document.getElementById("searchText");
  console.log(searchText.value);
  const search = searchText.value.toLowerCase();
  const postContainers = document.querySelectorAll(".posts");
  postContainers.forEach((postContainer) => {
    if (search === " ") {
      return;
    }
    postTitle = postContainer.querySelector("h3").textContent.toLowerCase();
    postBody = postContainer.querySelector("p").textContent.toLowerCase();
    if (postTitle.includes(search) || postBody.includes(search)) {
      postContainer.style.display = "block";
    } else {
      postContainer.style.display = "none";
    }
  });
}
