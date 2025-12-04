console.log(`Hello World!`);

//game logic
//when the user clicks on the cookie, the total count of cookies goes up by 1
//when the user clicks on the buy button in the shop/upgrade, the total count of cookies goes down by the cost of the upgrade, and the cps value goes up.

//we will need functions to contain game logic
//to create the logic for shop upgrades:
//option 1: a function to handle each upgrade
//option 2: a reusable function that works for every upgrade --this one (iterates for length of object array?)

//tip on local storage: make sure the local storage values are updates after the user buys an upgrade OR when the user clicks on the 'cookie'

//=================================================================================================================================

//data storage
let totalSnailCount = 0;
let sps = 0; //snails per second, of course.

// let stats = {
//     totalSnailCount: 0,
//     sps: 0,
// }

//if there is data already in local storage, update the stats in game with this data so the user picks it up where they left off!

//================================================================================================================================

//shop upgrade
//fetch the upgrades from the API
//create multiple DOM elements to contain the upgrades (loop)

//TODO: create DOM elements for the shop upgrades
//- create element
//- assign value to its property (textContent)
//- append it to DOM

// after you complete this tast, you should see the upgrades in your shop-container :D

//TODO: create function(s) to HANDLE the purchase action
//the user needs a button to buy an item
//when the user clicks the button:
//- subtract cost of upgrade from totalSnailCount
//- add increase value to sps (value is in API)

//================================================================================================================================

//the interval
setInterval(function () {
  totalSnailCount += sps; //totalSnailCount = tsc + sps
  //update DOM to reflect changes in the values
  //save the values in local storage
}, 1000);
