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
const notFound = document.querySelector(".user_not_found");
const section = document.querySelector("section");

function displayUserStats(user) {
  fetch(`https://api.github.com/users/${user}`)
    .then((response) => response.json())
    .then((data) => {
      console.log("Data :", data);

      notFound.style.display = "none";
      section.style.display = "flex";

      document
        .querySelector(".user_details img")
        .setAttribute("src", data.avatar_url);

      document.getElementById("user_name").innerText = data.name;
      document.getElementById("user_id").innerText = user;
      document.getElementById("user_repo").innerText = data.public_repos;

      document
        .querySelector(".streak_stats")
        .setAttribute(
          "src",
          `https://github-readme-streak-stats.herokuapp.com?user=${user}&theme=dracula&hide_border=true&card_width=450`
        );

      document
        .querySelector(".used_languages img")
        .setAttribute(
          "src",
          `https://github-readme-stats.vercel.app/api/top-langs?username=${user}&show_icons=true&locale=en&layout=compact&theme=dracula&hide_border=true&hide_title=true`
        );

      document
        .querySelector(".profile_stats")
        .setAttribute(
          "src",
          `https://github-readme-stats.vercel.app/api?username=${user}&theme=dracula&include_all_commits=true&count_private=true&show_icons=true&hide=contribs,commits&hide_border=true&hide_title=true`
        );
    })
    .catch((error) => {
      console.log("Error:", error);
    });
}
