let ls;
fetch("/committee/resources/data.json").then((response) => {
  response.json().then((data) => {
    ls = data;
    content = "<ul>";
    for (let i = 0; i < Object.keys(ls).length; i++) {
      content += `<li class="text-center"><a href="#${Object.keys(ls)[i]}">${
        Object.keys(ls)[i]
      }</a></li>`;
    }
    document.querySelector("#committee_category").innerHTML = content + "</ul>";
    if (window.location.href.split("#").length > 1) {
      load_committee(window.location.href.split("#")[1].replace(/%20/g, " "));
    }
  });
});

const load_committee = (category) => {
  let content = `<span class="committee_view"><button class="button is-primary is-light" id="goback">Go Back</button> <h3 class='is-size-3'>${category}</h3></span><br><div id="members">`;
  if (ls[category] == null) {
    content = `
        <h3 class="is-size-3 text-center">INVALID REQUEST RECIEVED. MEMBER TYPE ISN'T DEFINED</h3>
    `;
  } else {
    document.querySelector("#committee_category").classList.add("hide");
    document.querySelector("#committee_list").classList.remove("hide");
  }
  for (let i = 0; i < ls[category].length; i++) {
    content += `
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-48x48">
                        ${
                          ls[category][i].img != null &&
                          ls[category][i].img != ""
                            ? `<img src="${
                                ls[category][i].img.search("http") != 0
                                  ? "/committee/resources/images/"
                                  : ""
                              }${ls[category][i].img}" alt="${
                                ls[category][i].name
                              }" class="img-fluid">`
                            : ""
                        }
                    </figure>
                </div>
                <div class="media-content">
                    <p class="title is-4">${ls[category][i].name}</p>
                    <p class="subtitle is-6">${ls[category][i].designation}</p>
                </div>
            </div>
        </div>
    </div>`;
  }
  document.querySelector("#committee_list").innerHTML = content + "</div>";
  document.getElementById("committee_list").scrollIntoView();
  document.querySelector("#goback").removeEventListener("click", () => {});
    document.querySelector("#goback").addEventListener("click", () => {
        document.querySelector("#committee_category").classList.remove("hide");
        document.querySelector("#committee_list").classList.add("hide");
        window.location.href = "#";
    });
};

window.addEventListener("popstate", function () {
console.log(window.location.href.split("#")[1])
  load_committee(window.location.href.split("#")[1].replace(/%20/g, " "));
});
