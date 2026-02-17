/*
========================================================
📘 CLONING IN JAVASCRIPT
========================================================

This file covers:

1) Shallow Copy
2) Deep Copy
3) structuredClone()
4) JSON.parse(JSON.stringify()) old method
5) Differences and limitations

========================================================
*/


/*
========================================================
1️⃣ SHALLOW COPY
========================================================

A shallow copy copies only the top-level properties.
Nested objects still share the SAME reference.
*/

const originalShallow = {
  name: "Laksya",
  stats: {
    agility: 80
  }
};

// Using spread operator (shallow copy)
const shallowCopy = { ...originalShallow };

shallowCopy.stats.agility = 100;

console.log("Shallow Copy Example:");
console.log("Original:", originalShallow.stats.agility); 
// ❗ 100 (changed — because nested object shares reference)
console.log("Copy:", shallowCopy.stats.agility);

console.log("--------------------------------------------------");


/*
========================================================
2️⃣ DEEP COPY (structuredClone)
========================================================

structuredClone():
- Creates a true deep copy
- Copies nested objects
- Keeps Date, Map, Set etc.
- Does NOT copy functions
*/

const originalDeep = {
  name: "Laksya",
  stats: {
    agility: 80
  }
};

const deepCopy = structuredClone(originalDeep);

deepCopy.stats.agility = 200;

console.log("Deep Copy (structuredClone) Example:");
console.log("Original:", originalDeep.stats.agility); 
// ✅ 80 (safe — separate memory)
console.log("Copy:", deepCopy.stats.agility);

console.log("--------------------------------------------------");


/*
========================================================
3️⃣ OLD METHOD — JSON.parse(JSON.stringify())
========================================================

This was commonly used before structuredClone.

It works for:
- Simple objects
- Arrays
- Nested structures

But it has limitations.
*/

const originalJSON = {
  name: "Laksya",
  stats: {
    agility: 80
  },
  createdAt: new Date(),
  undef: undefined
};

const jsonCopy = JSON.parse(JSON.stringify(originalJSON));

console.log("JSON Method Example:");
console.log("Original Date:", originalJSON.createdAt);
console.log("Copied Date:", jsonCopy.createdAt); 
// ❗ becomes STRING, not Date object

console.log("Original undef:", originalJSON.undef);
console.log(jsonCopy)
console.log("Copied undef:", jsonCopy.undef);
// ❗ undef is removed

console.log("--------------------------------------------------");


/*
========================================================
4️⃣ structuredClone vs JSON Method
========================================================

structuredClone:
✔ Deep copy
✔ Keeps Date object
✔ Keeps Map, Set
✔ Keeps undefined
❌ Cannot clone functions

JSON.parse(JSON.stringify()):
✔ Works for simple objects
❌ Removes undefined
❌ Converts Date to string
❌ Removes functions
❌ Breaks Map/Set
*/


/*
========================================================
5️⃣ Extra Example with Date
========================================================
*/

const objWithDate = {
  today: new Date()
};

const cloneWithStructured = structuredClone(objWithDate);
const cloneWithJSON = JSON.parse(JSON.stringify(objWithDate));

console.log("Date Check:");
console.log("structuredClone keeps Date:",
  cloneWithStructured.today instanceof Date); // true

console.log("JSON method keeps Date:",
  cloneWithJSON.today instanceof Date); // false


/*
========================================================
🚀 FINAL SUMMARY
========================================================

Shallow Copy:
- Copies only first level
- Nested objects share memory

Deep Copy:
- Copies entire structure
- No shared references

Best Modern Solution:
→ structuredClone()

Old Hack:
→ JSON.parse(JSON.stringify())
Use only when you know limitations.

========================================================
*/
