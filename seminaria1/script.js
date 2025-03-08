document.addEventListener("DOMContentLoaded",function(){
  let flexDirections = document.querySelectorAll("#flex-direction button")
  let div0 = document.querySelector(".flex-direction-demo")
  flexDirections.forEach(button => {
    button.addEventListener("click", function() {
      div0.style.flexDirections = button.dataset.value
    })
  });
  let flexWrap = document.querySelectorAll("#flex-wrap button")
  let div1 = document.querySelector(".flex-wrap-demo")
  flexWrap.forEach(button => {
    button.addEventListener("click", function() {
      div1.style.flexDirections = button.dataset.value
    })
  });
  let justifyContent = document.querySelectorAll("#justify-content button")
  let div2 = document.querySelector(".justify-content-demo")
  justifyContent.forEach(button => {
    button.addEventListener("click", function() {
      div2.style.flexDirections = button.dataset.value
    })
  });
  let alignItems = document.querySelectorAll("#align-items button")
  let div3 = document.querySelector(".align-items-demo")
  alignItems.forEach(button => {
    button.addEventListener("click", function() {
      div3.style.flexDirections = button.dataset.value
    })
  });
  let alignContent = document.querySelectorAll("#align-content button")
  let div4 = document.querySelector(".align-content-demo")
  alignContent.forEach(button => {
    button.addEventListener("click", function() {
      div4.style.flexDirections = button.dataset.value
    })
  });
})