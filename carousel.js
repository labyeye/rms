fetch("./files/config.json").then((response) => {
  response.json().then((data) => {
    initial = true;
    data.news.forEach((item) => {
      
      html = `<article class="main-post ${(initial == true) ? 'main-post--active' : 'main-post--not-active'}">
                <div class="main-post__image">
                  ${(item.img.indexOf(".mp4") > 0) ?
                `<div class="video-container">
                <video autoplay muted loop style="object-fit: cover;">
                  <source src="${item.img}" type="video/mp4">
                </video>
              </div>`: `
                  <img
                    src="${item.img}"
                    alt="${item.subtitle}"
                  />
                  `
        }
                </div>
                
              </article>`;
      post = `<article class="post post--active">
              
            </article>`
      document.querySelector(".slides").insertAdjacentHTML("beforeend", html);
      document.querySelector(".posts-wrapper").insertAdjacentHTML("beforeend", post);
      initial = false;
    });
    let mainPosts = document.querySelectorAll(".main-post");
    let posts = document.querySelectorAll(".post");

    let i = 0;
    let postIndex = 0;
    let currentPost = posts[postIndex];
    let currentMainPost = mainPosts[postIndex];

    function progress() {
      if (i === 100) {
        i = -5;
        // reset progress bar
        currentPost.querySelector(".progress-bar__fill").style.width = 0;
        document.querySelector(
          ".progress-bar--primary .progress-bar__fill"
        ).style.width = 0;
        currentPost.classList.remove("post--active");

        postIndex++;

        currentMainPost.classList.add("main-post--not-active");
        currentMainPost.classList.remove("main-post--active");

        // reset postIndex to loop over the slides again
        if (postIndex === posts.length) {
          postIndex = 0;
        }

        currentPost = posts[postIndex];
        currentMainPost = mainPosts[postIndex];
      } else {
        i++;
        currentPost.querySelector(".progress-bar__fill").style.width = `${i}%`;
        document.querySelector(
          ".progress-bar--primary .progress-bar__fill"
        ).style.width = `${i}%`;
        currentPost.classList.add("post--active");

        currentMainPost.classList.add("main-post--active");
        currentMainPost.classList.remove("main-post--not-active");
      }
    }

    let progressInterval = setInterval(progress, 100);

    document.querySelectorAll(".posts-wrapper article").forEach((post) => {
      post.addEventListener("click", () => {
        console.log("clicked");
        clearInterval(progressInterval);
        progressInterval = setInterval(progress, 100);
        postIndex = [...posts].indexOf(post);
        currentPost.classList.remove("post--active");
        currentPost = post;
        i = 0;
        currentPost.classList.add("post--active");
        currentMainPost.classList.add("main-post--not-active");
        currentMainPost.classList.remove("main-post--active");
        currentMainPost = mainPosts[postIndex];
        currentMainPost.classList.add("main-post--active");
        currentMainPost.classList.remove("main-post--not-active");
      });
    });
  });
});