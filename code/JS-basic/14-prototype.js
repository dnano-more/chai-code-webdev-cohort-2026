const prithviraj = {
  name: "Prithviraj",
  generation: "grandfather",
  cookTraditionalDish() {
    return `${this.name} cooks an ancient family recipe`;
  },
};

const raj = Object.create(prithviraj); // raj me prithviraj object ki sari properties inherit ho gai.
console.log(raj); // {}  // raj ke prototype me milengi wo properties.
console.log(raj.name); // Prithviraj

// Overriding properties
raj.name = "raj";
raj.generation = "father";
raj.runBusiness = function () {
  return `${this.name} runs the family business`;
};

console.log(raj);
console.log(raj.runBusiness()); // raj runs the family business

// Prototype chain
console.log(raj.cookTraditionalDish()); // raj cooks an ancient family recipe
// this is the prototypal Inheritance magic.

const ranbir = Object.create(raj);
ranbir.name = "ranbir";
ranbir.generation = "son";
ranbir.makeFilm = function () {
  return `${this.name} directs blockbustur movies`;
};

console.log(ranbir.makeFilm()); // ranbir directs blockbustur movies
console.log(ranbir.runBusiness()); // ranbir runs the family business
console.log(ranbir.cookTraditionalDish()); // ranbir cooks an ancient family recipe (yahan par do level up kar ke prithviraj ke cookTraditionalDish method ko access kiya hain. Its called prototype chaining or multilevel inheritance.)


Array.prototype.last = function () {
    return this[this.length - 1];
}

const numbers = [1, 2, 3, 4, 5];
console.log(numbers.last()); // 5

const names = ["harsh", "Sachin", "Rahul"];
console.log(names.last()); // Rahul

