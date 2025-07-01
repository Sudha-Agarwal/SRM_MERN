//syntax
//   /pattern/modifiers
const pattern1 = /hello/i;
console.log(" test():", pattern1.test("Hello world")); // true

// 2️ exec() method
const pattern2 = /\d+/;
console.log(" exec():", pattern2.exec("My age is 25")); // [ '25', index: 11, input: 'My age is 25' ]

// 3️ match() method
const str1 = "cat, bat, mat";
console.log(" match():", str1.match(/.at/g)); // ['cat', 'bat', 'mat']

// 4️ replace() method
const str2 = "Today is sunny";
console.log(" replace():", str2.replace(/sunny/, "rainy")); // Today is rainy
console.log(str2) //original is not updated

// 5 Flags
const str3 = "JavaScript is great. javascript is popular.";
console.log(" Flags (gi):", str3.match(/javascript/gi)); // ['JavaScript', 'javascript']

// 6 Validate email
const emailPattern = /^[^\s\d@]+@[^\s@]+\.[^\s@]+$/;
console.log(" Email validation:", emailPattern.test("test@example.com")); // true
