$(document).ready(function () {
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  // hide/show element
  $("#hide-me").on("click", function () {
    $(this).parent().parent().fadeToggle();
    setTimeout(()=>{
      $(".goback").fadeToggle().css("display","flex");
    },1000)
  });

  $("#go-back").on("click", function () {
    $(this).parent().fadeToggle();
    setTimeout(()=>{
      $("#hide").fadeToggle();
    },1000)
  });

  // dynamic elements
  $("#create-elements").on("click", function () {
    const menu = $("#elements");
    menu.empty();
    items = Array.from({ length: $('#amount').val() }, (_, i) => `Item ${i + 1}`);    
    items.forEach((item) => {     
      const menuItem = $("<div>")
        .addClass("menu-item")
        .text(item)
        .on("click", function () {
          alert(`You clicked on ${item}`);
        });
      menu.append(menuItem);
    });
  });

  $("#delete-elements").on("click", function () {
    $("#elements").empty();
  });

  // dynamic width
  $("#center").on("mousedown", function (e) {
    e.preventDefault();

    $(document).on("mousemove", function (moveEvent) {
      const container = $("#dynamic-width");
      const containerOffset = container.offset();
      const containerWidth = container.width();

      let relativeX = moveEvent.clientX - containerOffset.left;

      relativeX = Math.max(10, Math.min(containerWidth - 10, relativeX));

      const leftWidth = (relativeX / containerWidth) * 100;
      const rightWidth = 100 - leftWidth - 2;

      $("#center").css("left", `${relativeX / containerWidth}px`);
      $("#left").css("width", `${leftWidth}%`);
      $("#right").css("width", `${rightWidth}%`);
    });

    $(document).on("mouseup", function () {
      $(document).off("mousemove mouseup");
    });
  });

  // path game
  let path = [];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = $("<div>")
        .addClass("cell")
        .attr("id", `cell-${i}-${j}`)
        .on("click", function () {
          if (path.length == 0) {
            path.push([i, j]);
            $(this).addClass("lastselected");
          } else {
            // check if the cell is adjacent to the last cell in the path
            let last = path[path.length - 1];
            if (Math.abs(last[0] - i) <= 1 && Math.abs(last[1] - j) <= 1) {
              path.push([i, j]);
              $(".lastselected").addClass("selected")
              $(".lastselected").removeClass("lastselected")
              $(this).addClass("lastselected");
            }
          }

        });
      $("#field").append(cell);
    }
  }

  const pawn = $("<div>").addClass("pawn").attr("id", "pawn");
  let currentIndex = 0;

  let game = false;
  $("#start").on("click", function () {
    if (path.length > 0) {
      const startCell = path[0];
      $(`#cell-${startCell[0]}-${startCell[1]}`).append(pawn);
      game = true;
    } else {
      alert("Please select a path!");
    }
  });

  $("#move").on("click", function () {
    if (!game){
      alert("Start the game first!");
      return;
    }
    if (currentIndex < path.length - 1) {
      currentIndex++;
      const nextCell = path[currentIndex];
      $(`#cell-${nextCell[0]}-${nextCell[1]}`).append(pawn);
    } else {
      alert("Pawn has reached the end of the path!");
    }
  });

  $("#reset").on("click", function () {
    game = false;
    path = [];
    currentIndex = 0;
    $(".cell").removeClass("selected lastselected");
    $("#pawn").remove();
  });
  $("#auto").on("click", function () {
    if (path.length > 0) {
      const startCell = path[0];
      $(`#cell-${startCell[0]}-${startCell[1]}`).append(pawn);
      game = true;
      async function loopWithDelay(){
        for(let i = 0; i < path.length - 1; i++){
          await delay(200);
          if (currentIndex < path.length - 1) {
            currentIndex++;
            const nextCell = path[currentIndex];
            $(`#cell-${nextCell[0]}-${nextCell[1]}`).append(pawn);
          
          } 
          await delay(500);
        }
        if(currentIndex == path.length - 1) {
          alert("Pawn has reached the end of the path!");
        }
      }
      loopWithDelay()
    }
    
  });
});
