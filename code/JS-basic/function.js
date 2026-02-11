// function se result return karke ek variable me stoare karna
function add(num1, num2) {
  let addition = num1 + num2;
  return addition;
}

const addResult = add(4, 2); // addResult me addition stoare hogi; add fun se return hoke

// function se function ko return karna
function cartoon() {
    function cartoonInSideCartoon(){};

    return cartoonInSideCartoon;
}

const anime = cartoon();   // same as above yaha par anime me cartoonInSideCartoon stoare hoga.
console.log(anime);  // [Function: cartoonInSideCartoon]


// Bahar se unadar wale function ko call karna
function cartoon() {
    function cartoonInSideCartoon(){
        return "Naruto";
    };

    return cartoonInSideCartoon;
}

const animeNaruto = cartoon();
animeNaruto()  // anime call kiya to ab iske unad ka cartoonInSideCartoon function automatically call hoga aur uska result anime me return hoga.


// function expression - ek variable me function dalna

let cartoonMoca = function () {
    console.log('Anime');
};

cartoonMoca();


// arrow function
const isAllowedToVote = (age) => {
  return age >= 18;
};

console.log(isAllowedToVote(23));

// oneliner arrow function
const remo = (age) => age >= 18;

console.log(remo(28));


// HOF - High Order Function
// A function that takes another function as parameter then we can call them high order function.

function meraBadaFunction (udharKaFunc) {
    return udharKaFunc() + 40;
}

function savkarFunction () {
    return 10;
}

console.log(meraBadaFunction(savkarFunction));


// forEach - array ke sare elemets pe loop perform karta hain.

const myArr = ["mango", "papaya", "angir", "cheeku"];

// myArr.forEach(element => console.log(element));


// Polyfill for forEach

dnanosForEach(saareFal => console.log(saareFal));

function dnanosForEach (WhatToDoWithFruits) {
    for(let i = 0; i < myArr.length; i++) {
       WhatToDoWithFruits(myArr[i]);
    }
}


// map function
const nums = [1, 2, 3, 4, 5, 6];

const result = [];

// for(let i = 0; i < nums.length; i++) {
//     result.push(nums[i] * 2);
// }
// console.log('this is results log: ',result);

// By using map
const doubledArr = nums.map(e => e * 2);

console.log(doubledArr);

// map polyfill

function dannosMapFun (fn) {
    const result = [];

    for (let i = 0; i < nums.length; i++) {
        const currentElement = nums[i];

        const runForEveryElm = fn(currentElement);
        result.push(runForEveryElm);
    }

    return result;
}

const dnanosDoubledArr = dannosMapFun(arrElm => arrElm * 3);
console.log("this is tripled of nums arr ", dnanosDoubledArr);
// console.log(result)