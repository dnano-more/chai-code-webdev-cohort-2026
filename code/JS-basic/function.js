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