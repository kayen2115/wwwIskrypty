document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click",rozsuwanie)
    function rozsuwanie() {
    var x = document.getElementById("pozycje");
    console.log("cpsw")
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }
  document.getElementById("burger").addEventListener("click",rozsuwanie)
})
