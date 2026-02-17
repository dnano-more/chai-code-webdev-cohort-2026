// Arrays

const carriage  = ["harsh", "sachin", "suyesh"];
const emptyCarriage = [];

// creating array using Constructor method
const emptyEmptySeats = Array(3);  // it gives you three empty slots in array.
console.log(emptyEmptySeats);  // [ <3 empty items> ]   // empty means jsut empty space in array. [not null/undefined]
console.log(emptyEmptySeats.length) // 3 [these are not actual values/elements of array they are just empty slots]

const passengers = Array("sachin", "harsh", "ravi"); // aise bhi bana sakte ko aaray value pass karke.

const singlePassenger = Array.of(4);
console.log(singlePassenger); // [ 4 ]  //this is actual value in aaray
console.log(singlePassenger.length); // 1  

// string value se array creation 
const game  = Array.from('BGMI');
console.log(game);  // [ 'B', 'G', 'M', 'I' ];


// array length gotcha
const friends = ["ravi", "rahul", "gaju", "abhijit", "ashok"];

friends.length = 2;  // note: ham array ki length change/update kar sakte hain.
console.log(friends); // [ 'ravi', 'rahul' ]  // length 2 karne se baaki ka data/elements delete ho gaye automaticlly.

friends.length = 5;
console.log(friends);  // [ 'ravi', 'rahul', <3 empty items> ]


// Array methods
// Mutating array methods: push(), pop(), shift(), unshift(), splice()
// Non-Mutating methods: concat(), slice(), flat()

// non-mutating methods are usefull for copying array to another variable
// [because non-mutating array return karte hain naya aaray.]
// ex:
const trainCopy = friends.slice();

// array searching methods: indexOf(), includes(), find(), findIndex();


// checking array hain ya nahi
console.log(typeof [])  // object [but we really want to check its type for validation.]
console.log(Array.isArray([]))  // true  [ye tarika hain array hain ya nahi pata karne ka]
console.log(Array.isArray("hellow"))  // false


//key points
// 1. Use - []   Avoid - Array (4)
// 2. array are 0 based
// 3. Mutating methods: push pop, shift, unshift, splice
// 4. Non Mutating: concat, slice, flat, flatmap [1, 2, 3, [5, 6]]
// 5. Searching includes
// 6. Array.isArray()

console.log("----------------------------------")
const arr = ["dnano", "harsh"];
console.log(0 in arr); // true
console.log(1 in arr); // true

console.log("jab 2 index access karoge to element present nahi hain array me to phir property bhi nahi hogi isliye false milega");
console.log(2 in arr); // false

console.log("----------------------------------")

console.log(friends)
console.log("Upar wale array ka 2nd index khali hain to agar access karne ki koshish karoge to false hoga result")
console.log(2 in arr); // false
