// Code for search transition
const search = document.querySelector("#search img");
const input = document.querySelector("#search input");
let inputOn = false;

search.addEventListener("click", () => {
  if (!inputOn) {
    input.style.display = "inline-block";
    setTimeout(() => {
      input.style.transform = "translate(0)";
      search.style.borderTop = "1px solid white";
      search.style.borderBottom = "1px solid white";
    }, 5);
    setTimeout(() => {
      input.focus();
    }, 250);
  } else {
    input.style.transform = "translate(138px)";
    setTimeout(() => {
      input.style.display = "none";
      search.style.borderTop = "none";
      search.style.borderBottom = "none";
    }, 200);

    // Perform operation after search over here
    console.log("Search for :", input.value);
    if (input.value.length) {
      displayUserStats(input.value);
      input.value = "";
    }
  }
  inputOn = !inputOn;
});

// function to display user stats
function displayUserStats(user) {
  fetch(`https://api.github.com/users/${user}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data :", data);

      const type = data?.type;
      if (type === "User" || !type) {
        document.querySelector(".user_not_found").style.display = "none";

        let section = document.querySelector("section");
        if (!section) {
          section = document.createElement("section");
          document.querySelector("body").appendChild(section);
        }
        section.innerHTML = `
        <div class="user_details">
          <img
            src=${data.avatar_url}
            alt="avatar" />
          <div>
            <p id="user_name">${data.name}</p>
            <p id="user_id">${user}</p>
            <p><strong id="user_repo">${data.public_repos}</strong> repositories</p>
          </div>
        </div>
  
        <img
          src="https://github-readme-streak-stats.herokuapp.com?user=${user}&theme=dracula&hide_border=true&card_width=450"
          alt="Streak stats"
          class="streak_stats" />
  
        <div class="used_languages">
          <p>
            MOST <br />
            USED <br />
            LANGS
          </p>
          <img
            src="https://github-readme-stats.vercel.app/api/top-langs?username=${user}&show_icons=true&locale=en&layout=compact&theme=dracula&hide_border=true&hide_title=true"
            alt="Most used languages" />
        </div>
  
        <img
          src="https://github-readme-stats.vercel.app/api?username=${user}&theme=dracula&include_all_commits=true&count_private=true&show_icons=true&hide=contribs,commits&hide_border=true&hide_title=true"
          alt="Github stats"
          class="profile_stats" /> `;
      } else if (type === "Organization") {
        console.log("Organization Github profile");
      }
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}

// Send a message from the popup to the content script and receive a response
chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  chrome.tabs.sendMessage(
    tabs[0].id,
    { query: "get-user" },
    function (response) {
      const user = response?.user;
      console.log("User :", user);

      if (user) {
        displayUserStats(user);
      }
    }
  );
});
