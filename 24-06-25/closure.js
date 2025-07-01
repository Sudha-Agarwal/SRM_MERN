function outerFunction() {
  let counter = 0;

  return function innerFunction() {
    counter++;
    console.log("Counter:", counter);
  };
}

const count = outerFunction();
count(); // Counter: 1
count(); // Counter: 2
