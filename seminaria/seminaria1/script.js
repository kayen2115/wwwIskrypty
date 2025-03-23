document.addEventListener("DOMContentLoaded",function(){
  // Flex Direction
  const flexDirectionButtons = document.querySelectorAll(".flex-direction-btn");
  const flexContainer = document.querySelector("#flex-container");

  flexDirectionButtons.forEach(button => {
    button.addEventListener("click", () => {
      flexContainer.classList.remove(
        'flex-row',
        'flex-row-reverse',
        'flex-column',
        'flex-column-reverse',
        'flex-md-row'
      );
      
      flexContainer.classList.add(`flex-${button.dataset.value}`);
      
      flexDirectionButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });

  // flex wrap
  const flexWrapButtons = document.querySelectorAll("#flex-wrap button");
  const div1 = document.querySelector(".flex-wrap-demo");

  flexWrapButtons.forEach(button => {
    button.addEventListener("click", () => {
      div1.style.flexWrap = button.dataset.value;
    });
  });

  // justify content
  const justifyContentButtons = document.querySelectorAll("#justify-content button");
  const div2 = document.querySelector(".justify-content-demo");

  justifyContentButtons.forEach(button => {
    button.addEventListener("click", () => {
      div2.style.justifyContent = button.dataset.value;
    });
  });

  // align items
  const alignItemsButtons = document.querySelectorAll("#align-items button");
  const div3 = document.querySelector(".align-items-demo");
  
  alignItemsButtons.forEach(button => {
    button.addEventListener("click", () => {
      div3.style.alignItems = button.dataset.value;
    });
  });

  // align content
  const alignContentButtons = document.querySelectorAll("#align-content button");
  const div4 = document.querySelector(".align-content-demo");
  
  alignContentButtons.forEach(button => {
    button.addEventListener("click", () => {
      div4.style.alignContent = button.dataset.value;     
    })
  });
})