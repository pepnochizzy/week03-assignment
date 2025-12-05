# week03-assignment

A clicker game

# User Stories

- 🐿️ As a developer, I want to retrieve upgrade information from an API so that all the developers working on the game can access a single, consistent source of up-to-date information.
- 🐿️As a user, I want to be able to purchase upgrades from the shop so that I can enhance my gameplay experience.
- 🐿️ As a developer, I want to use functions effectively to keep my code organised and reusable.
- 🐿️ As a user, I’d like the website to respond dynamically so that my interactions with the website are responsive and smooth.
- 🐿️ As a user, I want my cookie count and relevant game information to be stored in local storage so that my progress is saved and I can continue playing from where I left off later.
- 🐿️ As a user, I want the cookie count to increment automatically and the game state to update each second so that the game progresses even when I’m not actively clicking.
- 🐿️ As a user, I want the game state to be managed every second using setInterval to ensure my progress is saved and the game remains updated.

# Requirements

- 🎯 Fetch upgrade data from the provided API and at least one upgrade from the API update the cookie count.
- 🎯 Ensure that functions are used effectively to keep code organised and reusable.
- 🎯 Implement event listeners to handle user interactions.
- 🎯 Use local storage to save and restore the cookie count and relevant game information.
- 🎯 Use setInterval to increment the cookie count and manage the game state each second.
- 🎯Managing the game state includes saving progress and updating the DOM.

# Reflection

# Things I found difficult:

- when making the container for shop upgrades, I wanted to make the whole div a button. I knew that the eventHandler would need to update totalSnailCount and sps by the cost and the increase provided by the API, however, I knew that these variables/values were declared inside a function AND inside a for loop. What ended up happening is that if I assigned the containers as eventListeners inside the loop, I could not give the handler arguments as it would call the handler each iteration. If I did not give the handler arguments, I do not know how to get the information into the eventHandler and it felt wrong to also have the handler inside the upgradeContainer(). I also tried putting the eventlistener outside of the for loop but within upgradeContainer() but it did not work as intended either. Perhaps I could declare the handler inside the listener? This is another issue with scope, although I felt much more confident with scope throughout the rest of this assignment and so I do feel I am progressing. This was a scope issue with added complexity of for loops and wanting wet code.
- I wanted the upgrades in the shop to show the increase to sps as "+x sps", Originally I had it as just "+x" and this made removing the + quite easy with replace("+", ""). When I added the sps after the number it made it more difficult to remove both and I wanted to have the ability to change the text in the upgrade as much as I wanted without having to constantly change the repalce() code. When searching Stackoverflow, I found this page: https://stackoverflow.com/questions/19577748/what-does-this-javascript-regular-expression-d-mean, a reg ex where I can match anything that is not a digit, period or hyphen and then replace it with "".
