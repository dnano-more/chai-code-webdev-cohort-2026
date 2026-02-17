const orders = [
  { dish: "Pasta Carbonara", price: 14, spicy: false, qty: 2 },
  { dish: "Dragon Ramen", price: 12, spicy: true, qty: 1 },
  { dish: "Caesar Salad", price: 9, spicy: false, qty: 3 },
  { dish: "Inferno Wings", price: 11, spicy: true, qty: 2 },
  { dish: "Truffle Risotto", price: 18, spicy: false, qty: 1 },
];

const myData = orders.forEach((order, index) => {
  console.log(` #${index + 1} : ${order.qty}x ${order.dish}`);
});
console.log(myData); // undefined  (because foreach kuch return nahi karta)

const pavti = orders.map((o) => `${o.dish} : $${o.price * o.qty}`);
console.log(pavti);
/* output: 
[
  'Pasta Carbonara : $28',
  'Dragon Ramen : $12',
  'Caesar Salad : $27',
  'Inferno Wings : $22',
  'Truffle Risotto : $18'
]
  */

const masaledarOders = orders.filter((o) => o.spicy);
console.log(masaledarOders);

// reduce()

// dummy example:
const array = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  initialValue,
);

console.log(sumWithInitial);
// Expected output: 10

const tottleRevenue = orders.reduce((sum, order) => {
  return sum + order.price * order.qty;
}, 0);

console.log(tottleRevenue); // output: 107

// above sum is the accumulator[ek simple variable jo operation ka result store kar rah hain. uski initial value 0 define ki huyi hian.] and order is the current value[array ke element]

// sum = total jama hone wali amount (start 0 se hoti hai)
// order = array ka current item
// har step par: price * qty karke sum me add hota rehta hai
// akhir me reduce total revenue return karta hai

// Reduce function to group orders by spicy/mild category
// acc (accumulator): stores grouped dishes → starts with { spicy: [], mild: [] }
// order: current order item from the orders array
// returns: updated accumulator object after adding the dish to the appropriate category
const grouped = orders.reduce(
  (acc, order) => {
    const category = order.spicy ? "spicy" : "mild";
    acc[category].push(order.dish);
    return acc;  // IMPORTANT: must return the accumulator for next iteration
  },
  { spicy: [], mild: [] },  // initial value: empty arrays for each category
);

console.log(grouped);


// Gotchas

const ticketNumbers = [100, 20, 10, 23, 9, 56];
const sorted = [...ticketNumbers].sort();  // [ 10, 100, 20, 23, 56, 9 ]

// acending oreder
const acendingSort = [...ticketNumbers].sort((a, b) => a - b);  // [ 9, 10, 20, 23, 56, 100 ]

// acending oreder
const decendingSort = [...ticketNumbers].sort((a, b) => b - a);  // [ 9, 10, 20, 23, 56, 100 ]


const kitchenOrders = [
  { dish: "Pasta Carbonara", price: 14, spicy: false, qty: 2 },
  { dish: "Dragon Ramen", price: 12, spicy: true, qty: 1 },
  { dish: "Caesar Salad", price: 9, spicy: false, qty: 3 },
  { dish: "Inferno Wings", price: 11, spicy: true, qty: 2 },
  { dish: "Truffle Risotto", price: 18, spicy: false, qty: 1 },
];

const mildReport = kitchenOrders
  .filter(order => !order.spicy)
  .map(order => ({
    dishOrder: order.dish,
    total: order.price * order.qty
  }))
  // .sort((a, b) => a -b)
  .toSorted((a, b) => a.total - b.total)
  console.log(mildReport);