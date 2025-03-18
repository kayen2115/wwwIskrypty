document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("mouseover",rozsuwanie)
    function rozsuwanie() {
    var menu = document.getElementById("burger")
    var pozycje = document.getElementById("pozycje");
    if (pozycje.style.display === "block") {
      menu.style.display ="block";
      pozycje.style.display = "none";
    } else {
      pozycje.style.display = "block";
      menu.style.display ="none"
    }
  }
  document.getElementById("pozycje").addEventListener("mouseleave",rozsuwanie)
})
