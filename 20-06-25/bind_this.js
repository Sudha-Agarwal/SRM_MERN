const user = {
    name: "Shreyansh",
    greet: function () {
      setTimeout(function () {
        console.log("Hello, " + this.name); // this is NOT 'user'
      }, 1000);
    }
  };
  
  user.greet(); // Output: Hello, undefined
  
  //Solution: Use bind(this) to Preserve this
  const user1 = {
    name: "Shreyansh",
    greet: function () {
      setTimeout(function () {
        console.log("Hello, " + this.name); // ✅ now refers to `user`
      }.bind(this), 1000); // bind this to the outer context
    }
  };
  
  user1.greet(); // Output: Hello, Shreyansh
  