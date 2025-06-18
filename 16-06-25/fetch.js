var url = "https://jsonplaceholder.typicode.com/todos/1";

//GET request to fetch user data
fetch(url)
.then(data=> data.json()) //parses the JSON response
.then(data=>console.log(data))

//POST request to send new user data
fetch(url,{
    method:'POST',
    headers: {
        'Content-Type':'application/json'
    },
    body: JSON.stringify({
        title: 'New Post',
        body:"this is the content of the post",
        userId:1
    })
})
.then(function(response){
    return response.json()
}).then(function(data){
    console.log(data)
})
.catch(error=>console.log(error))




//HTTP Methods
