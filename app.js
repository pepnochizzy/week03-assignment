console.log(`Hello World!`);

//=================================================================================================================================

//data storage
let totalSnailCount = 10000; //TODO set to 0 before submit
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
let upgradeTotals = {
  "auto-clicker": 0,
  "Lettuce farm": 0,
  "Enhanced lettuce": 0,
  "Snail nannies": 0,
  "Egg daycare": 0,
  "Egg baths": 0,
  "Time machine": 0,
  "Quantum farm": 0,
  "Druid technology": 0,
  "Interdimensional snails": 0,
};
// let stats = {
//     totalSnailCount: 0,
//     sps: 0,
// }

//if you need to clear your local storage
function clearPreferences() {
  localStorage.removeItem("total snail count");
  localStorage.removeItem("sps");
  localStorage.removeItem("upgrade totals");
}

//if there is data already in local storage, update the stats in game with this data so the user picks it up where they left off!
function init() {
  const storedTotal = localStorage.getItem(
    "total snail count",
    JSON.stringify(totalSnailCount)
  );
  const storedSps = localStorage.getItem("sps", JSON.stringify(sps));
  const storedUpgrades = localStorage.getItem(
    "upgrade totals",
    JSON.stringify(upgradeTotals)
  );
  if (storedTotal !== null) {
    totalSnailCount = JSON.parse(storedTotal);
    totalSnailText.textContent = totalSnailCount;
  }
  if (storedSps !== null) {
    sps = JSON.parse(storedSps);

    spsText.textContent = sps;
  }
  if (storedUpgrades !== null) {
    upgradeTotals = JSON.parse(storedUpgrades);
  }
  createPurchasedContainer();
}
window.addEventListener("load", init);

function save() {
  localStorage.setItem("total snail count", JSON.stringify(totalSnailCount));
  localStorage.setItem("sps", JSON.stringify(sps));
  localStorage.setItem("upgrade totals", JSON.stringify(upgradeTotals));
  totalSnailText.textContent = totalSnailCount;
  spsText.textContent = sps;
}
//================================================================================================================================

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

//================================================================================================================================
//create multiple DOM elements to contain the upgrades (loop):
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
    container.addEventListener("click", function () {
      upgradePurchase(upgradeData[i], name);
    });
    shop.appendChild(container);
  }
}

function createPurchasedContainer() {
  const upgradeContainer = document.getElementById("upgrade-container");
  const h1 = upgradeContainer.querySelector("h1");
  upgradeContainer.innerHTML = ""; //reset because I am calling this in the initialising AND when a purchase happens, this prevents it from creating 10 originally and then 20 etc
  if (h1) upgradeContainer.appendChild(h1);
  for (let key in upgradeTotals) {
    //loops for each name in upgradeTotals object
    const container = document.createElement("div");
    container.className = "purchased-upgrade";
    upgradeContainer.appendChild(container);
    const name = document.createElement("p");
    name.textContent = key;
    name.className = "purchased-name";
    container.appendChild(name);
    const count = document.createElement("p");
    count.textContent = `You have: ${upgradeTotals[key]}`; //this displays the value within the key
    count.className = "upgrade-count";
    container.appendChild(count);
  }
}

function upgradePurchase(upgradeData, name) {
  if (totalSnailCount >= upgradeData.cost) {
    totalSnailCount -= upgradeData.cost;
    sps += upgradeData.increase;
    upgradeTotals[name]++; //trying to update upgradeTotals object by one for each name.
    save();
  } else {
    window.alert("You do not have the funds for this upgrade");
  }
  createPurchasedContainer();
}
//================================================================================================================================

//================================================================================================================================
//click
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

//auto save every minute, not required as I save every second.
// setInterval(function () {
//   save();
// }, 60000);
