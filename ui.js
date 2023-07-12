/* Set the width of the side navigation to 250px */
function openAbout() {
  document.getElementById("about").style.right = "0vw";
}

/* Set the width of the side navigation to 0 */
function closeAbout() {
  document.getElementById("about").style.right = "-70vw";
}

// Add an event listener listening for scroll
const main = document.querySelector("main");
main.addEventListener("scroll", navHighlighter);

//Ad
const aboutButton = document.querySelector(".aboutButton");
aboutButton.addEventListener("click", openAbout);
// Get all sections that have an ID defined
const sections = main.querySelectorAll("div[id]");
// console.log(sections);

function navHighlighter() {
  // Get current scroll position
  //   let scrollY = window.pageYOffset;
  let scrollY = main.scrollTop;

  // Now we loop through sections to get height, top and ID values for each
  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    var sectionId = current.getAttribute("id");
    // console.log(sectionId);
    console.log(scrollY);

    /*
  - If our current scroll position enters the space where current section on screen is, add .active class to corresponding navigation link, else remove it
  - To know which link needs an active class, we use sectionId variable we are getting while looping through sections as an selector
  */
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".top a[href*=" + sectionId + "]")
        .classList.add("active");
      console.log("added");
      console.log(sectionHeight);
    } else {
      document
        .querySelector(".top a[href*=" + sectionId + "]")
        .classList.remove("active");
      console.log("taken");
    }
  });
}
