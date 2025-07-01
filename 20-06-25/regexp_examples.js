// 1️ Basic test() method
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

// 5️ split() method
console.log(" split():", "apple,banana|mango".split(/,|\|/)); // ['apple', 'banana', 'mango']

// 6️ Flags
const str3 = "JavaScript is great. javascript is popular.";
console.log(" Flags (gi):", str3.match(/javascript/gi)); // ['JavaScript', 'javascript']

// 7️ Character classes
console.log(" Character class \\d:", /\d/.test("abc123")); // true
console.log("   Character class \\w:", /\w/.test("!@#abc")); // true
console.log("   Character class \\s:", /\s/.test("Hello world")); // true

// 8️ Quantifiers
console.log(" Quantifier +:", /a+/.test("caaaandy")); // true
console.log("   Quantifier *:", /lo*/.test("Hellooooo")); // true
console.log("   Quantifier {n,}:", /a{2,}/.test("baaa")); // true

// 9️ Anchors
console.log(" Start anchor ^:", /^Hi/.test("Hi there")); // true
console.log("   End anchor $:", /there$/.test("Hi there")); // true

// 1️0 Escaping special characters
console.log(" Escape dot \\.:", /\./.test("file.txt")); // true

// 1️1 Validate email
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
console.log(" Email validation:", emailPattern.test("test@example.com")); // true


