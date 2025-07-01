function asyncOperation() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const success = true;
      if (success) resolve("Operation successful");
      else reject("Operation failed");
    }, 1000);
  });
}

asyncOperation()
  .then(result => console.log(result))
  .catch(error => console.error(error));
