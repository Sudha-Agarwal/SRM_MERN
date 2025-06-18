function getData(){
    var xhr = new XMLHttpRequest();

    var url = "https://jsonplaceholder.typicode.com/todos/1";
    xhr.open("GET",url,true);
    xhr.send()

    xhr.onreadystatechange = function(){
        if(this.readyState==4 && this.status==200){
            document.getElementById('para1').innerHTML = this.responseText;
        }
    }
}