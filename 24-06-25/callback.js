function fetchData(callback) {
  setTimeout(() => {
    const data = "Data fetched!";
    callback(data);
  }, 1000);
}

function handleData(data) {
  console.log(data);
}

fetchData(handleData);
