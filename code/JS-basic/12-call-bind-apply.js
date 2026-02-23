// call and apply ==> basic chef (kitchen) ==> ye dono result return karte hain.
// bind ==> return a new function

// call() and apply() are used to invoke a function with a specific 'this' context and arguments.
// The main difference between call() and apply() is how they handle arguments:
// - call() accepts an argument list, while apply() accepts a single array of arguments.
function cookDish(ingredient, style) {
  console.log(arguments);
  return `${this.name} prepares ${ingredient} in ${style} style!`;
}

const shrmaKitchen = { name: "Sharma jis Kitchen" };
const GuptaKitchen = { name: "Gupta jis Kitchen" };

console.log(cookDish(shrmaKitchen, "paav bhaji", "laturkar")); // Aise to nahi pass kar sakte.
// output: undefined prepares [object Object] in paav bhaji style!

console.log(cookDish.call(shrmaKitchen, "paav bhaji", "laturkar")); // perfect example for call()
// output: Sharma jis Kitchen prepares paav bhaji in laturkar style!

const guptaOrder = ["Chole kulche", "Punjabi Dhaba"];

console.log(cookDish.apply(GuptaKitchen, guptaOrder)); // first argument this ki value hain. and second baki ke arguments.
// guptaOrder array ke do elements ko function ne do paramete me accept kiya. aur operation perform hua.
// this is best for agar tumhe pura ek array ko pass karana hain aur function us me se ek ek element pick karle apne aap. to use karo apply()
// output:
// [Arguments] { '0': 'Chole kulche', '1': 'Punjabi Dhaba' }
// Gupta jis Kitchen prepares Chole kulche in Punjabi Dhaba style!

// Another short example of apply()
const bills = [100, 30, 45, 29, 34];

Math.max.apply(null, bills);

// its ok to do in modern way also like ⤵
Math.max(...bills);

// call and apply are used to set the value of this inside a function, while bind is used to create a new function with a specific this value.
function reportDelivery(location, status) {
  return `${this.name} at ${location}: ${status}`;
}
const deliveryBoy = { name: "Ranveer" };

console.log("Call: ", reportDelivery.call(deliveryBoy, "Lyari", "Ordered"));
console.log("Apply: ", reportDelivery.apply(deliveryBoy, ["Marse", "Pick up"]));
console.log("bind: ", reportDelivery.bind(deliveryBoy, ["Lyari", "Ordered"]));   // ek function return karega jisme this set hoga deliveryBoy ke sath. aur arguments bhi set honge.

const bindReport = reportDelivery.bind(deliveryBoy, "Haridwar", "Ordered");
console.log("Bind: ", bindReport()); 
// bind se ek naya function create hota hain jisme this value set hoti hain. 
// to use karo jab tumhe baar baar same this value ke sath function call karna hain.

// we can do this way also ⤵
const bindReport2 = reportDelivery.bind(deliveryBoy);
console.log("Bind with arguments: ", bindReport2("Haridwar", "Ordered"));