function sum(num1,...numbers){
    console.log(num1)
    let res = 0;
    for(i of numbers){
        res+= i;
    }
    console.log(res)
}
sum(1,2);
sum(1,2,3,4)