function hamburger() {
  let nav = document.getElementById("myTopnav");
  if (nav.className === "nav") {
    nav.className += " responsive";
  } else {
    nav.className = "nav";
  }
} 