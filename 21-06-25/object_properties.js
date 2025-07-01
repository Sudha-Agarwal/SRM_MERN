const car = {
    brand:'Toyota',
    model:"Innova",
    year:2022,
    getPrice:function(){

    },
    address:{city:"delhi"}
};

//accessing properties
console.log(car.brand);
console.log(car[model]);

//delete a property
delete car.year;