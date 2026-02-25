// Promises, setTimeout, callback hell, converting callback hell to promises

function prepareOrederCB(dish, cb) {
    setTimeout(() => cb(null, {dish, status: "prepared"}), 1000)
}

// consuming callback
prepareOrederCB("Pizza", function(error, result) {
    //console.log(error); 
    //console.log(result);
})

// Callback with setTimeout - creation
function pickupOrederCB(order, cb) {
    setTimeout(() => cb(null, {...order, status: "picked-up!"}), 1000)
}
function deliverOrederCB(order, cb) {
    setTimeout(() => cb(null, {...order, status: "delivered!"}), 1000)
}

// cb hell (consuming call back)
prepareOrederCB("Pizza", (error, order) => {
    if(error) return console.log(error); 

    pickupOrederCB(order, (err, pickedOrder) => {
        if(err) return console.log(err);

        deliverOrederCB(pickedOrder, (err, deliveredOrder) => {
            if(err) return console.log(err);

            console.log(deliveredOrder);
        }) 
    })
})

// Convertinf callback hell to promises
// promise creation
function prepareOrederPromise(dish) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!dish) {
                reject (new Error("No dish is there"));
                return;
            }
            console.log(`${dish} is ready`);
            resolve({dish, status: "prepared"})
        }, 1000)
    })
}
function pickupOrederPromise(pickedOrder) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!pickedOrder) {
                reject (new Error("No dish is there"));
                return;
            }
            console.log(`${pickedOrder.dish} is ready`);
            resolve({...pickedOrder, status: "picked-up"})
        }, 1000)
    })
}
function deliveredOrederPromise(deleveredOrder) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(!deleveredOrder) {
                reject (new Error("No dish is there"));
                return;
            }
            console.log(`${deleveredOrder.dish} is ready`);
            resolve({...deleveredOrder, status: "delivered"})
        }, 1000)
    })
}

// consuming promise
prepareOrederPromise("Pizza")
    .then(order => pickupOrederPromise(order))
    .then(pickedOrder => deliveredOrederPromise(pickedOrder))
    .then(deliveredOrder => console.log(deliveredOrder))
    .catch(error => console.log(error))