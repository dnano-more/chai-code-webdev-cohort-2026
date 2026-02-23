function TataCar(chassisNumber, modelName) {
  // {}
  this.chassisNumber = chassisNumber;
  this.modelName = modelName;
  this.fuelLevel = 100;
}

TataCar.prototype.status = function () {
  return `Tata ${this.modelName} #${this.chassisNumber} | Fuel: ${this.fuelLevel}`;
};

const car1 = new TataCar("MH-101", "Nexon");
const car2 = new TataCar("DL-202", "Harrier");

console.log(car1.modelName);
console.log(car2.modelName);
console.log(car1.status());
console.log(car2.status());

// new working
// 1. creates a new empty object
// 2. sets the value of this to the new empty object
// 3. executes the constructor function with the given arguments
// 4. returns the new object created in step 1 (unless the constructor function returns a non-primitive value, in which case that value is returned instead)

// Step 1: brand new object is created {}

// Step 2: every function has a prototype. Even the object itself also has prototype
// we LINK both of them together

// Step 3: now comes “this”, whoever calls it will bind with caller reference.
// bind “this” to new object

// Step 4: automatically the newly created object is returned by the Constructor
// Explicit return of object


// this is not same as above
//
// factory function - A function that creates and returns a new object without using `new`.
function createAutoRickshaw(id, route) {
  return {
    id,
    route,
    run() {
      return `Auto ${this.id} running on ${this.route}`;
    },
  };
}

const auto1 = createAutoRickshaw("UP-1", "Lucknow-kanpu");
const auto2 = createAutoRickshaw("UP-2", "Agra-Mathura");
console.log(auto1.run());
console.log(auto2.run());
/*
----------------------------------------
Important Points:
----------------------------------------

1) No `new` keyword used.
2) No `this` binding confusion like constructor.
3) Simply returns a fresh object every time.
4) Easy to read and beginner friendly.

----------------------------------------
Factory vs Constructor (Interview Quick View)
----------------------------------------

Factory Function:
✔ No `new`
✔ Simple return object
✔ Easy to control what is returned
❌ Each object gets its own copy of methods (more memory)

Constructor Function:
✔ Uses `new`
✔ Methods can be shared via prototype (memory efficient)
❌ `this` can be confusing

----------------------------------------
When to Use Factory?
----------------------------------------

- When object logic is simple
- When you want to avoid `new`
- When you want more control over returned object
*/