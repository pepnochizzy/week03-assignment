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
function init() {
  const storedTotal = localStorage.getItem(
    "total snail count",
    JSON.stringify(totalSnailCount)
  );
  const storedSps = localStorage.getItem("sps", JSON.stringify(sps));

  if (storedTotal !== null) {
    totalSnailCount = JSON.parse(storedTotal);
  }
  if (storedSps !== null) {
    sps = JSON.parse(storedSps);
  }
}
window.addEventListener("load", init);

function save() {
  localStorage.setItem("total snail count", JSON.stringify(totalSnailCount));
  localStorage.setItem("sps", JSON.stringify(sps));
}
//================================================================================================================================
//I want to create a function that gets upgrades from api but also renames them, so I have made an array to change names
const upgradeNames = [
  "auto-clicker",
  "Lettuce farm",
  "Enhanced lettuce",
  "Snail nannies",
  "Egg daycare",
  "Egg baths",
  "Time machine",
  "Quantum farm",
  "Druid technology",
  "Interdimensional snails",
];
//shop upgrade
//fetch the upgrades from the API
async function createUpgrades() {
  const response = await fetch(
    "https://cookie-upgrade-api.vercel.app/api/upgrades"
  );
  const upgradeData = await response.json();
  console.log(upgradeData);
  upgradeContainer(upgradeData);
  return upgradeData;
}
createUpgrades();

//create multiple DOM elements to contain the upgrades (loop):
//TODO: create DOM elements for the shop upgrades
//- create element
//- assign value to its property (textContent)
//- append it to DOM
function upgradeContainer(upgradeData) {
  for (let i = 0; i < upgradeData.length; i++) {
    const container = document.createElement("div");
    const title = document.createElement("p");
    const cost = document.createElement("p");
    const increase = document.createElement("p");
    const name = upgradeNames[i];
    title.textContent = name;
    title.className = "upgradeTitle";
    cost.textContent = upgradeData[i].cost;
    cost.className = "upgradeCost";
    increase.textContent = `sps increase + ${upgradeData[i].increase}`;
    increase.className = "upgradeIncrease";
    const shop = document.getElementById("shop-container");
    container.className = "upgradeDiv";
    container.id = "clickable";
    shop.appendChild(container);
    container.appendChild(title);
    container.appendChild(cost);
    container.appendChild(increase);
    container.addEventListener("click", upgradePurchase);
  }
}

// after you complete this task, you should see the upgrades in your shop-container :D

//TODO: create function(s) to HANDLE the purchase action
//the user needs a button to buy an item
//when the user clicks the button:
//- subtract cost of upgrade from totalSnailCount
//- add increase value to sps (value is in API)
//- save new values in local storage
function upgradePurchase() {
  totalSnailCount -= cost;
  sps += increase;
  save();
}

//================================================================================================================================

//the interval
setInterval(function () {
  totalSnailCount += sps; //totalSnailCount = tsc + sps
  //update DOM to reflect changes in the values
  //save the values in local storage
}, 1000);
