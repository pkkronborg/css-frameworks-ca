const filter = document.getElementById("filter");

filter.addEventListener("change", filterChange);

/**
 * Filter posts by select from html.
 *
 * All posts showing all posts.
 *
 * Only media posts filters to show just posts with media files.
 *
 */
function filterChange() {
  const postContainers = document.querySelectorAll(".posts");

  if (filter.value === "media") {
    console.log("Only media posts");
    console.log(postContainers);

    postContainers.forEach((postContainer) => {
      const media = postContainer.querySelector(".media");
      console.log(media.currentSrc);
      if (media.currentSrc === "" || !media.currentSrc) {
        postContainer.style.display = "none";
      }
    });
  } else {
    console.log("All posts");
    postContainers.forEach((postContainer) => {
      postContainer.style.display = "block";
    });
  }
}
