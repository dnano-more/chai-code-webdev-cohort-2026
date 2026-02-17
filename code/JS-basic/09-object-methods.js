const artifact = {
  name: "Obsidian Crown",
  era: "Ancient",
  value: 50000,
  material: "volcanic glass",
};
4;
const keys = Object.keys(artifact);
const values = Object.values(artifact);
const entries = Object.entries(artifact);

console.log(keys); // output me ek array milega usme artifact object ki saari keys hongi
console.log(values); // yahan par bhi sari values milengi ek array me

console.log(entries); // Output - key and their value ka Array of Array milega.
// niche dekho entries ka result ⤵
[
  ["name", "Obsidian Crown"],
  ["era", "Ancient"],
  ["value", 50000],
  ["material", "volcanic glass"],
];

for (const [key, value] of Object.entries(artifact)) {
  console.log(`${key}: ${value}`);
}

// converting array of arrays into array of objects
const priceList = [
  ["Obsidian Crown", 50000],
  ["Ruby Pendant", 30000],
  ["Iron Shield", 5000],
];

const priceObject = Object.fromEntries(priceList);
console.log(priceObject);

// Object.freez()
const displayCase = {
  artifact: "Obsidian",
  Location: "Hall A, Case 3",
  locked: true,
};

Object.freeze(displayCase); // Object ab immutable ban gaya hain.
delete displayCase.locked; // nahi hoga delete.
displayCase.locked = false; // nahi hoga update.
console.log(displayCase);

console.log(
  "---------------------------------------------------------------------------",
);

// Object.seal() - used when you want allow to edit existing property
const catalogEntry = {
  id: "ART-001",
  description: "Ancient Crows",
  verified: true,
};

Object.seal(catalogEntry);
catalogEntry.verified = false; // update karne dega.
delete catalogEntry.verified; // nahi hoga delete.
catalogEntry.city = "New York"; // nahi kar sakte nayi proprety add
console.log(catalogEntry);

console.log("----------------------------------------------------")

const secureArtificats = {};
Object.defineProperty(secureArtificats, "catelogId", {
  value: "SEC-999",
  writable: false,  // catelogId property ko change/update nahi kar sakte
  enumerable: false,  // agar false hain to loop se skip ho jayegi; agar true hain to loop me aayegi.
  configurable: false,  // delete ya redefine nahi kar sakte.
});

console.log(secureArtificats.catelogId);
secureArtificats.catelogId = "HACKED";
console.log(secureArtificats.catelogId);

for (const [key, value] of Object.entries(secureArtificats)) {
  console.log(`${key} ${value}`);
}

const desc = Object.getOwnPropertyDescriptor(secureArtificats, "catelogId");
console.log(desc);
