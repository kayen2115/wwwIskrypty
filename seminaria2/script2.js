document.addEventListener("DOMContentLoaded", function () {
    function delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  
    document.getElementById("hide-me").addEventListener("click", function () {
      let parentElement = this.parentElement.parentElement;
      parentElement.style.transition = "opacity 1s";
      parentElement.style.opacity = parentElement.style.opacity === "0" ? "1" : "0";
      setTimeout(() => {
          let goBack = document.querySelector(".goback");
          goBack.style.display = goBack.style.display === "flex" ? "none" : "flex";
          goBack.style.opacity = goBack.style.opacity === "1" ? "0" : "1";
      }, 1000);
  });
  
  document.getElementById("go-back").addEventListener("click", function () {
      let parentElement = this.parentElement;
      parentElement.style.transition = "opacity 1s";
      parentElement.style.opacity = parentElement.style.opacity === "0" ? "1" : "0";
      setTimeout(() => {
          let hideElement = document.getElementById("hide");
          hideElement.style.display = hideElement.style.display === "none" ? "block" : "none";
          hideElement.style.opacity = hideElement.style.opacity === "1" ? "0" : "1";
      }, 1000);
  });
  
  
    document.getElementById("go-back").addEventListener("click", function () {
      this.parentElement.style.display = "none";
      setTimeout(() => {
        document.getElementById("hide").style.display = "block";
      }, 1000);
    });
  
    document.getElementById("create-elements").addEventListener("click", function () {
      const menu = document.getElementById("elements");
      menu.innerHTML = "";
      const amount = document.getElementById("amount").value;
      
      for (let i = 0; i < amount; i++) {
        let menuItem = document.createElement("div");
        menuItem.classList.add("menu-item");
        menuItem.textContent = `Item ${i + 1}`;
        menuItem.addEventListener("click", function () {
          alert(`You clicked on Item ${i + 1}`);
        });
        menu.appendChild(menuItem);
      }
    });
  
    document.getElementById("delete-elements").addEventListener("click", function () {
      document.getElementById("elements").innerHTML = "";
    });
  
    const center = document.getElementById("center");
    center.addEventListener("mousedown", function (e) {
      e.preventDefault();
      
      function onMouseMove(moveEvent) {
        const container = document.getElementById("dynamic-width");
        const containerRect = container.getBoundingClientRect();
        let relativeX = moveEvent.clientX - containerRect.left;
        relativeX = Math.max(10, Math.min(containerRect.width - 10, relativeX));
        
        const leftWidth = (relativeX / containerRect.width) * 100;
        const rightWidth = 100 - leftWidth - 2;
        
        document.getElementById("left").style.width = `${leftWidth}%`;
        document.getElementById("right").style.width = `${rightWidth}%`;
      }
  
      function onMouseUp() {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
      }
      
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    });
  
    let path = [];
    const field = document.getElementById("field");
  
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.id = `cell-${i}-${j}`;
        cell.addEventListener("click", function () {
          if (path.length === 0) {
            path.push([i, j]);
            this.classList.add("lastselected");
          } else {
            let last = path[path.length - 1];
            if (Math.abs(last[0] - i) <= 1 && Math.abs(last[1] - j) <= 1) {
              path.push([i, j]);
              document.querySelector(".lastselected").classList.add("selected");
              document.querySelector(".lastselected").classList.remove("lastselected");
              this.classList.add("lastselected");
            }
          }
        });
        field.appendChild(cell);
      }
    }
  
    let pawn = document.createElement("div");
    pawn.classList.add("pawn");
    pawn.id = "pawn";
    let currentIndex = 0;
    let game = false;
  
    document.getElementById("start").addEventListener("click", function () {
      if (path.length > 0) {
        document.getElementById(`cell-${path[0][0]}-${path[0][1]}`).appendChild(pawn);
        game = true;
      } else {
        alert("Please select a path!");
      }
    });
  
    document.getElementById("move").addEventListener("click", function () {
      if (!game) {
        alert("Start the game first!");
        return;
      }
      if (currentIndex < path.length - 1) {
        currentIndex++;
        document.getElementById(`cell-${path[currentIndex][0]}-${path[currentIndex][1]}`).appendChild(pawn);
      } else {
        alert("Pawn has reached the end of the path!");
      }
    });
  
    document.getElementById("reset").addEventListener("click", function () {
      game = false;
      path = [];
      currentIndex = 0;
      document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("selected", "lastselected"));
      if (pawn.parentElement) pawn.parentElement.removeChild(pawn);
    });
  
    document.getElementById("auto").addEventListener("click", async function () {
      if (path.length > 0) {
        document.getElementById(`cell-${path[0][0]}-${path[0][1]}`).appendChild(pawn);
        game = true;
        for (let i = 0; i < path.length - 1; i++) {
          await delay(200);
          if (currentIndex < path.length - 1) {
            currentIndex++;
            document.getElementById(`cell-${path[currentIndex][0]}-${path[currentIndex][1]}`).appendChild(pawn);
          }
          await delay(500);
        }
        if (currentIndex === path.length - 1) {
          alert("Pawn has reached the end of the path!");
        }
      }
    });
  });
  
