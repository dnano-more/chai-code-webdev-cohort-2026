const aadhaar_of_dnano = Symbol("aadhaar");
const aadhaar_of_sachin = Symbol("aadhaar");

console.log(typeof aadhaar_of_dnano); // symbol
console.log(aadhaar_of_dnano === aadhaar_of_sachin); // false

console.log(aadhaar_of_dnano.toString()); // Symbol(aadhaar)
console.log(aadhaar_of_dnano.description); // aadhaar  (symbol ka label return karta hain)

// Interview question
const nonIndian = Symbol();
console.log(nonIndian.description); // guess the output

const biometricHash = Symbol("biometricHash");
const bloodGroup = Symbol("bloodGroup");

const citizenRecord = {
  name: "Ved Pandey",
  age: 21,
  [biometricHash]: "a7yknfky788dn",
  [bloodGroup]: "O+",
};

console.log(Object.keys(citizenRecord)); // [ 'name', 'age' ]

console.log(Object.getOwnPropertySymbols(citizenRecord)); // [ Symbol(biometricHash), Symbol(bloodGroup) ]

// Symbol Usecases
// 1. Unique property keys
// 2. Hiding properties (jo log easily access nahi kar sakte)
// 3. Implementing iterators (next class me dekhenge)
const rtiQueryBook = {
  queries: ["Infra budget", "Ration Card", "Education budget", "Startup laws"],
  [Symbol.iterator]() {
    let index = 0;
    const queries = this.queries;
    return {
      next() {
        if (index < queries.length) {
          return { value: queries[index++], done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

for (const query of rtiQueryBook) {
  console.log("Filing RTI: ${query}");
}

// Symbol.toPrimitive
const governmentScheme = {
    name: "PM Kisan Yojna",
    people: 54,
    [Symbol.toPrimitive](hint) {
        if (hint === "string") return this.name;
        if (hint === "number") return this.people;
    },
};

console.log(+governmentScheme); // 54 (number hint)
console.log(`${governmentScheme}`); // PM Kisan Yojna (string hint)

// Symbol ko use karne ke liye hum square brackets ka use karte hain. Agar hum dot notation se access karne ki koshish karenge to wo symbol ko as a string treat karega. Isliye symbol ko access karne ke liye square brackets ka use karna padta hain.
