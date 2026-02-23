//nodejs me this emptyobject hain.
console.log(this); // {}

// browser me this window obj hain.
console.log(this); // Window {0: Window, window: Window, self: Window, document: document, name: '', location: Location, …}

function ranvirOnGlobalStage() {
  return typeof this;
}

console.log(ranvirOnGlobalStage()); // object

// Nodejs this ka behavior/working
function ranvirWithScript() {
  return this;
}
console.log(ranvirWithScript()); // current object me this nahi mila to global ko point karega. global obj return hoga.
// output: Object [global] { ... }

ranvirWithArrowFunc = () => {
  return this;
}
console.log("arrow function returning this node env: ",ranvirWithArrowFunc());
// output: {}
// Arrow function me surrounding scope ka this use hota hai, aur surrounding scope me this empty object hain. isliye output {} milta hain.
// browser me arrow function me this window ko point karega, output bhi window object hoga.

// Interview Gotcha
function ranvirWithNoScript() {
  "use strict"; // directive

  return this;
}

console.log(ranvirWithNoScript()); // undefined
// local function execution me "use strict" use ho raha ho to this ko global ka access nahi milega isliye undeifned.

// normal this behavior
const bollywoodFilm = {
  name: "Bajirao Mastani",
  lead: "Ranveer",

  introduce() {
    return `${this.lead} performs in ${this.name}`;
  },
};
console.log(bollywoodFilm.introduce()); // Ranveer performs in Bajirao Mastani


// Interview Gotchas
// 1). arrow func confusion
const filmDirector = {
  name: "Sanjay Leela Bansali",
  cast: ["Ranveer", "Priyanka", "Aliya"],

  announceCast() {
    this.cast.map((actors) => {
      console.log(`${this.name} introduces ${actors}`);
    });
  },
};
filmDirector.announceCast(); // whats the output?

// 2) nested func
const filmSet = {
  crew: "Spot boys",
  prepareProps() {
    console.log(`Outer this.crew: ${this.crew}`);

    function arrangeChairs() {
      console.log(`Inner this.crew: ${this.crew}`);
    }
    arrangeChairs();

    // Detached Methods
    const arrangeLights = () => {
      console.log(`Ditached this.crew: ${this.crew}`);  
    }
    arrangeLights();
  },
};

filmSet.prepareProps();  // whats the output?
// output :
// Outer this.crew: Spot boys
// Inner this.crew: undefined
// Ditached this.crew: Spot boys
// Answer: A regular nested function does not inherit this. thats why inner.crew = undefined
// by default "use strict" directive use ho raha hain arrangeChairs(){} me. ye bhi reason hain undefined milne ka.
// Arrow func this create nahi karte balki wo apne surrounding scope ka this use karta hai 
// this.crew ne surrounding se matlab yahan par parent ka this liya hain. isse lexical this bhi bolte hain.
// thats why Ditached this.crew: Spot Boys


// Detached Methods

const actor = {
    name: "Ranveer",
    bow() {
        return `${this.name} takes a bow`
    }
}

const detachedBow = actor.bow   // yaha sirf function ka reference store hua hai
console.log(detachedBow())
// output: undefined takes a bow

// Ans -
// Hum poora actor object copy nahi kar rahe, sirf function ka reference le rahe hain.
// detachedBow ek normal function ki tarah call ho raha hai, actor ke through nahi.
// Isliye call time par `this` undefined ho jata hai (strict mode me).
// Isi wajah se `this.name` bhi undefined milta hai.

console.log(actor.bow()); 
// Ranveer takes a bow (yaha method object ke through call hua hai,
// isliye `this` actor ko refer karta hai.)