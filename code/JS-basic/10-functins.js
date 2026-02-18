//console.log(brewPotion("Healing Herbs", 3));

// function declairation
function brewPotion(ingredient, dose) {
  return `Brewing potion with ${ingredient} (x${dose})... Potion ready`;
}

//function expression
const mixElixir = function (ingredient) {
  return `Mixing elexir with ${ingredient}`;
};

// Arrow function - no args, no own 'this'
const mixEl = (ingredient) => {
  return `Mixing elexir with ${ingredient}`;
};

// function ko agar parameter nahi bhi doge to bhi apne aap wo internally arguments ko handle karta hain.
function oldBrewingLogs() {
  //console.log("Type: ", typeof arguments); // object
  //console.log("Is Array: ", Array.isArray(arguments)); // Is Array:  false
  //console.log(arguments);
  // output: [Arguments] { '0': 'sage', '1': 'Rosemary' }  <-- its called array-like object

  const argumentsArr = Array.from(arguments);
  //console.log(argumentsArr);
  // output: [ 'sage', 'Rosemary' ]
}

oldBrewingLogs("sage", "Rosemary");

const arrowBrew = () => {
  try {
    console.log(arguments);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

// arrowBrew();

// Impure Function ex:
let globalCount = 0;

function brewAndCount(name) {
  globalCount++;
}

// HOF - A function that takes another functions as an arguments or returns a function is called Higher Order Function.
function anotherFunctionForClass(brewAndCount) {
  function newBrew() {
    //do something
  }
  return newBrew;
}

// IIFE
// Syntax - ()()

// (function () {})();

// best for privatorization
const potionShop = (function () {
  let inventory = 0;

  return {
    brew() {
      inventory++;
      return `Brew potion #${inventory}`;
    },
    getStock() {
      return inventory;
    },
  };
})();

console.log(potionShop);
console.log(potionShop.brew());  // Brew potion #1
console.log(potionShop.inventory);  // undefined (kivn ki IIFE me closure kaam nahi karta)


// Closure overview

function mazeNav() {
  const nav = "dnano";

  function navDakhva() {
    console.log(nav);
  }

  return navDakhva;
}

const nav = mazeNav();
console.log(nav);
nav()  