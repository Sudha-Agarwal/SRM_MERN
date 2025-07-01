// 1️ Create a new Map
const userMap = new Map();

// 2️ Add key-value pairs using set()
userMap.set("name", "Shreyansh");
userMap.set("age", 13);
userMap.set("isStudent", true);

console.log("User Map:", userMap);

// 3️ Get values using get()
console.log("Name:", userMap.get("name"));       // Shreyansh
console.log("Age:", userMap.get("age"));         // 13

// 4️ Check if a key exists using has()
console.log("Has 'isStudent'?", userMap.has("isStudent")); // true
console.log("Has 'grade'?", userMap.has("grade"));         // false

// 5️ Size of the Map
console.log("Size of map:", userMap.size); // 3

// 6️ Delete a key-value pair using delete()
userMap.delete("age");
console.log("After deleting 'age':", userMap);

// 7️ Clear the entire Map
const tempMap = new Map(userMap); // make a copy
tempMap.clear();
console.log("After clearing tempMap:", tempMap);

// 8️ Keys of any type
const objKey = { id: 1 };
const funcKey = function () {};
const numKey = 123;

const mixedMap = new Map();
mixedMap.set(objKey, "Object as key");
mixedMap.set(funcKey, "Function as key");
mixedMap.set(numKey, "Number as key");

console.log("Mixed Map:", mixedMap);

// 9️ Iterating over a Map

const countries = new Map([
  ["IN", "India"],
  ["US", "United States"],
  ["FR", "France"]
]);

console.log("Map iteration using for...of:");
for (let [key, value] of countries) {
  console.log(`${key} => ${value}`);
}

console.log("Map iteration using forEach():");
countries.forEach((value, key) => {
  console.log(`${key} => ${value}`);
});

// 10 Getting just keys, values, and entries

console.log("Keys:");
for (let key of countries.keys()) {
  console.log(key);
}

console.log("Values:");
for (let value of countries.values()) {
  console.log(value);
}

console.log("Entries:");
for (let entry of countries.entries()) {
  console.log(entry); // [key, value]
}

// 1️1️ Convert Map to Array
const mapToArray = Array.from(countries);
console.log("Map to array:", mapToArray);

// 1️2️ Convert Array to Map
const arr = [["brand", "Toyota"], ["model", "Camry"]];
const carMap = new Map(arr);
console.log("Array to Map:", carMap);

// 1️3️ Use case: Frequency counter with Map
const data = ["apple", "banana", "apple", "orange", "banana", "apple"];
const freqMap = new Map();

for (let item of data) {
  freqMap.set(item, (freqMap.get(item) || 0) + 1);
}

console.log("Frequency Map:", freqMap);

// 1️4️ Nested Maps
const student1 = new Map();
student1.set("name", "Aryan");
student1.set("marks", new Map([["Math", 95], ["Science", 88]]));

console.log("Student Name:", student1.get("name"));
console.log("Math Marks:", student1.get("marks").get("Math"));
