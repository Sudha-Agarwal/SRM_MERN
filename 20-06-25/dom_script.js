// 1Click Event
document.getElementById("clickBtn").addEventListener("click", function () {
    alert("Button clicked!");
  });
  
  // Input Event
  document.getElementById("nameInput").addEventListener("input", function (event) {
    document.getElementById("output").textContent = "Hello, " + event.target.value;
  });
  
  // Mouseover Event
  document.getElementById("clickBtn").addEventListener("mouseover", function () {
    this.style.backgroundColor = "lightblue";
  });
  
  // Mouseout Event
  document.getElementById("clickBtn").addEventListener("mouseout", function () {
    this.style.backgroundColor = "";
  });

  
  

  