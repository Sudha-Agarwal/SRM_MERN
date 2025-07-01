function getData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Data received");
    }, 1000);
  });
}

async function displayData() {
  console.log("Waiting for data...");
  const result = await getData();
  console.log(result);
}

displayData();
