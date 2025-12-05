console.log(`Hello World!`);

//game logic
//when the user clicks on the cookie, the total count of cookies goes up by 1✅
//when the user clicks on the buy button in the shop/upgrade, the total count of cookies goes down by the cost of the upgrade, and the cps value goes up.✅

//we will need functions to contain game logic
//to create the logic for shop upgrades: ✅
//- a reusable function that works for every upgrade --this one (iterates for length of object array?) ✅

//tip on local storage: make sure the local storage values are updates after the user buys an upgrade OR when the user clicks on the 'cookie'

//=================================================================================================================================

//data storage
let totalSnailCount = 10000;
let sps = 0; //snails per second, of course.

const totalSnailText = document.getElementById(`totalSnailCount`);
const spsText = document.getElementById(`spsText`);
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
const snail = document.getElementById(`snailImg`);
// let stats = {
//     totalSnailCount: 0,
//     sps: 0,
// }

function clearPreferences() {
  localStorage.removeItem("total snail count");
  localStorage.removeItem("sps");
  localStorage.removeItem("total Snail Count");
}

//if there is data already in local storage, update the stats in game with this data so the user picks it up where they left off!
function init() {
  const storedTotal = localStorage.getItem(
    "total snail count",
    JSON.stringify(totalSnailCount)
  );
  const storedSps = localStorage.getItem("sps", JSON.stringify(sps));

  if (storedTotal !== null) {
    totalSnailCount = JSON.parse(storedTotal);
    totalSnailText.textContent = totalSnailCount;
  }
  if (storedSps !== null) {
    sps = JSON.parse(storedSps);

    spsText.textContent = sps;
  }
}
window.addEventListener("load", init);

function save() {
  localStorage.setItem("total snail count", JSON.stringify(totalSnailCount));
  localStorage.setItem("sps", JSON.stringify(sps));
  totalSnailText.textContent = totalSnailCount;
  spsText.textContent = sps;
}
//================================================================================================================================
//I want to create a function that gets upgrades from api but also renames them, so I have made an array to change names

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
    const container = document.createElement("button");
    const title = document.createElement("p");
    const cost = document.createElement("p");
    const increase = document.createElement("p");
    const name = upgradeNames[i];
    title.textContent = name;
    title.className = "upgradeTitle";
    cost.textContent = upgradeData[i].cost;
    cost.className = "upgradeCost";
    increase.textContent = `+${upgradeData[i].increase} sps`;
    increase.className = "upgradeIncrease";
    const shop = document.getElementById("shop-container");
    container.className = "upgradeDiv";
    container.id = "clickable";
    container.appendChild(title);
    container.appendChild(cost);
    container.appendChild(increase);
    container.addEventListener("click", function (event) {
      upgradePurchase(event.currentTarget);
    });
    shop.appendChild(container);
  }
  //TODO: check with manny/bertie, how to get info to eventHandler and only for each button (currently takes away all upgrade costs and increases), I know it doesn't belong in this function as this is why it adds all up (I had it in the for loop). Does it belong in createUpgrades?? should I use container.name??
}
// after you complete this task, you should see the upgrades in your shop-container :D

//TODO: create function(s) to HANDLE the purchase action  ✅
//the user needs a button to buy an item
//when the user clicks the button:
//- subtract cost of upgrade from totalSnailCount  ✅
//- add increase value to sps (value is in API)  ✅
//- save new values in local storage  ✅
function upgradePurchase(eventTarget) {
  console.log(eventTarget);
  const increase = Number(
    eventTarget
      .querySelector(".upgradeIncrease")
      .textContent.replace(/[^\d]/g, "") //Here I am using the eventTarget so that when the argument event.currentTarget is passed, the button only sees the clicked buttons data. It has to be query selector
  ); ///"[^\d]/g" found in stackoverflow, I will add the link in reflections. This is a regex (I have done these solo before) that means "match anything that is not a digit, a period, or a hyphen".
  const cost = eventTarget.querySelector(".upgradeCost").textContent;
  console.log(cost);
  if (totalSnailCount >= cost) {
    totalSnailCount -= cost;
    console.log(totalSnailCount);
    sps += increase;
    console.log(sps);
    save();
  } else {
    window.alert("You do not have the funds for this upgrade");
  }
}
//================================================================================================================================
//TODO: make snail button increase totalSnailCount by 1 each click and save
snail.addEventListener("click", snailClick);
function snailClick() {
  ++totalSnailCount;
  console.log(totalSnailCount);
  save();
}

//================================================================================================================================

// the interval
setInterval(function () {
  totalSnailCount += sps; //totalSnailCount = tsc + sps
  save();
}, 1000);
