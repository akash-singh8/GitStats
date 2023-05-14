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
      input.value = "";
    }, 200);
  }
  inputOn = !inputOn;
  console.log("Search for :", input.value);
});
