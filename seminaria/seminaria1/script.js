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
        'flex-sm-row'
      );
      
      flexContainer.classList.add(`flex-${button.dataset.value}`);
      
      flexDirectionButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  // Flex Wrap
  const flexWrapButtons = document.querySelectorAll(".flex-wrap-btn");
  const flexWrapper = document.querySelector("#flex-wrapper");

  flexWrapButtons.forEach(button => {
    button.addEventListener("click", () => {
      flexWrapper.classList.remove(
        'flex-wrap',
        'flex-wrap-reverse',
        'flex-nowrap',
      );
      
      flexWrapper.classList.add(`${button.dataset.value}`);
      
      flexWrapButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  const flexJustifyButtons = document.querySelectorAll(".justify-content-btn");
  const flexJustifier = document.querySelector("#flex-justifier");

  flexJustifyButtons.forEach(button => {
    button.addEventListener("click", () => {
      flexJustifier.classList.remove(
        'justify-content-start',
        'justify-content-end',
        'justify-content-center',
        'justify-content-between',
        'justify-content-around'
      );
      
      flexJustifier.classList.add(`${button.dataset.value}`);
      
      flexJustifyButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
    });
  });
  // justify content

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