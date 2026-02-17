const hero = {
  name: "Luna the Brave",
  class: "Mage",
  level: 12,
  health: 85,
  mana: 120,
  isAlive: true,
};

// Accessing keys  using . notation
console.log(hero.name);

// Accessing keys  using [] notation
console.log(hero["class"]); // dynamic keys, spacial symbols ye sab access karne ke liye

// overwrite value
hero.level = 14; // original obj ki value update ho jayegi

// deleting property
delete hero.mana; // mana property of hero object is deleted now


// Gotchas
const ranger = {
    name: "Laksya the swift",
    agility: 80,
    stealth: undefined
};

// check property exist karti hain ya nahi using in notation
console.log("name" in ranger)  // true (own property)
console.log("level" in ranger)  // false

console.log("stealth" in ranger);  // true

console.log("toString" in ranger);  // true (prototype se mila)
console.log(ranger.hasOwnProperty("toString"));  // false (Ye sirf direct object ki properties check karta hai.)

console.log(ranger.__proto__); // [Object: null prototype] {}
console.log(ranger.__proto__.toString);  // [Function: toString]


// note: in <-- operator prototype chain tak check karta hai.