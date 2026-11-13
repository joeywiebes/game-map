let luckPotions = 0;
let luck = 1;
let rollSpeedBoostEnd = 0;

let baseLuck = 1;
let luckUpgradeLevel = 0;
let luckBoostEnd = 0;
let potionDuration = 5 * 60 * 1000;
let rollSpeedLevel = 0;
let totalRolls = 0;
let pirateShopTokens = 0;

let rollsByRarity = {
    "Common": [],
    "Uncommon": [],
    "Rare": [],
    "Epic": [],
    "Legendary": [],
    "Mythical": [],
    "Exotic": [],
    "Secret": [],
    "Abyssal": [],
    "Prismatic": [],
    "Apex": [],
    "Insanity": [],
    "???": [],
    "3rr0r": [],
    "fr4ctur3d": [],
    "The rarity": [],
};

let selectedRarity = null;
let autoRollUnlocked = false;

// Roll button + raritys

document.getElementById("knop").addEventListener("click", function() {

if (Math.random() < 1 / 100000) {
    pirateShopTokens++;
    updateInventory();
    console.log("Pirate Shop Token ontvangen!");
}

    let knop = document.getElementById("knop");

    knop.disabled = true;

    setTimeout(function() {
        knop.disabled = false;
    }, getRollDelay());

    let resultaat = document.getElementById("resultaat");
    let rarity = document.getElementById("rarity");

    totalRolls++;

document.getElementById("roll-count").textContent =
    "Total Rolls: " + totalRolls;

    let randomGetal = Math.floor(
        -Math.log(1 - Math.random()) * 12 * luck
    ) + 1;

    randomGetal = Math.min(randomGetal, 10000);
    resultaat.textContent = randomGetal;

    if (randomGetal <= 25) {
        rarity.textContent = "Common";
        rarity.style.color = "gray";
    }
    else if (randomGetal <= 50) {
        rarity.textContent = "Uncommon";
        rarity.style.color = "green";
    }
    else if (randomGetal <= 75) {
        rarity.textContent = "Rare";
        rarity.style.color = "blue";
    }
    else if (randomGetal <= 100) {
        rarity.textContent = "Epic";
        rarity.style.color = "purple";
    }
    else if (randomGetal <= 150) {
        rarity.textContent = "Legendary";
        rarity.style.color = "gold";
    }
    else if (randomGetal <= 200) {
        rarity.textContent = "Mythical";
        rarity.style.color = "red";
    }
    else if (randomGetal <= 300) {
        rarity.textContent = "Exotic";
        rarity.style.color = "orange";
    }
    else if (randomGetal <= 450) {
        rarity.textContent = "Secret";
        rarity.style.color = "cyan";
    }
    else if (randomGetal <= 750) {
        rarity.textContent = "Abyssal";
        rarity.style.color = "darkblue";
    }
    else if (randomGetal <= 850) {
        rarity.textContent = "Prismatic";
        rarity.style.color = "magenta";
    }
    else if (randomGetal <= 990) {
        rarity.textContent = "Apex";
        rarity.style.color = "crimson";
    }
    else if (randomGetal <= 1100) {
        rarity.textContent = "Insanity";
        rarity.style.color = "pink";
    }
    else if (randomGetal <= 1500) {
        rarity.textContent = "???";
        rarity.style.color = "purple";
    }
    else if (randomGetal <= 2000) {
        rarity.textContent = "3rr0r";
        rarity.style.color = "white";
    }
    else if (randomGetal <= 3000) {
        rarity.textContent = "fr4ctur3d";
        rarity.style.color = "#2d2315";
    }
else {
    rarity.textContent = "The rarity";
    rarity.classList.add("rainbow-text");
}

    rollsByRarity[rarity.textContent].push(randomGetal);

    updateRarityInventory();
    updateShop();

    // Potion chances

    let potionChance;

    if (randomGetal > 5000) {
        potionChance = 1;
    }
    else if (randomGetal > 500) {
        potionChance = 0.001;
    }
    else if (randomGetal > 2500) {
        potionChance = 0.05
    }
    else {
        potionChance = 0.0005;
    }

if (Math.random() < potionChance) {
    luckPotions++;
    updateInventory();
    showPotionAlert();
}

if (Math.random() < potionChance) {
    rollspeedPotions++;
    updateInventory();
}

});

let potionAlertTimeout;

function showPotionAlert() {

    let alert = document.getElementById("potion-alert");

    alert.classList.add("show");

    clearTimeout(potionAlertTimeout);

    potionAlertTimeout = setTimeout(function() {
        alert.classList.remove("show");
    }, 5000);
}

// Rarity inventory

function updateRarityInventory() {

    let buttons = document.getElementById("rarity-buttons");

    buttons.innerHTML = "";

    for (let rarityName in rollsByRarity) {

        let button = document.createElement("button");

        button.classList.add("rarity-button");

        button.textContent =
            rarityName + " (" + rollsByRarity[rarityName].length + ")";

        button.addEventListener("click", function() {

            selectedRarity = rarityName;

            showRarityRolls();

        });

        buttons.appendChild(button);
    }
}

function showRarityRolls() {

    let display = document.getElementById("rarity-rolls");

    if (selectedRarity === display.dataset.rarity) {
        selectedRarity = null;
        display.innerHTML = "<p>Select a rarity to see your rolls!</p>";
        display.dataset.rarity = "";
        return;
    }

    display.innerHTML = "";
    display.dataset.rarity = selectedRarity;

    let title = document.createElement("h3");
    title.textContent = selectedRarity;
    display.appendChild(title);

    let rolls = rollsByRarity[selectedRarity];

    if (rolls.length === 0) {

        let message = document.createElement("p");
        message.textContent = "You haven't rolled this rarity yet!";
        display.appendChild(message);

    } else {

        let rollContainer = document.createElement("div");
        rollContainer.classList.add("roll-container");

        let counts = {};

        for (let number of rolls) {
            counts[number] = (counts[number] || 0) + 1;
        }

        for (let number in counts) {

            let roll = document.createElement("span");
            roll.classList.add("roll-number");

            if (counts[number] > 1) {
                roll.textContent = number + " x" + counts[number];
            } else {
                roll.textContent = number;
            }

            rollContainer.appendChild(roll);
        }

        display.appendChild(rollContainer);
    }
}

// Inventory (MAAK HIER ITEMS AAN MET COUNT)

function updateInventory() {
    document.getElementById("potion-count").textContent =
        "Luck Potion x" + luckPotions;

    document.getElementById("luck-value").textContent =
        "Luck: " + luck;

    document.getElementById("use-potion").disabled =
        luckPotions <= 0;

        document.getElementById("rollspeed-count").textContent =
    "Roll Speed Potion x" + rollspeedPotions;

        document.getElementById("token-count").textContent =
    "Pirate Shop Token x" + pirateShopTokens;

    document.getElementById("rollspeed-potion").disabled =
    rollspeedPotions <= 0;
}

document.getElementById("use-potion").addEventListener("click", function() {

    if (luckPotions > 0) {
        luckPotions--;

        let now = Date.now();

        if (luckBoostEnd > now) {
            luckBoostEnd += potionDuration;
        }
        else {
            luckBoostEnd = now + potionDuration;
            luck = baseLuck + 2;
        }

        updateInventory();
        updateLuckTimer();
    }

});

document.getElementById("rollspeed-potion").addEventListener("click", function() {

    if (rollspeedPotions > 0) {

        rollspeedPotions--;

        let now = Date.now();

        if (rollSpeedBoostEnd > now) {
            rollSpeedBoostEnd += potionDuration;
        } else {
            rollSpeedBoostEnd = now + potionDuration;
        }

        refreshAutoRollInterval();

        updateInventory();
    }

});

function refreshAutoRollInterval() {

    if (!autoRoll) {
        return;
    }

    clearInterval(autoRollInterval);

    autoRollInterval = setInterval(function() {
        document.getElementById("knop").click();
    }, getRollDelay() + 50);

}

// Luck timer

function updateLuckTimer() {

    let timer = document.getElementById("luck-timer");

    let remaining = luckBoostEnd - Date.now();

    if (remaining <= 0) {

        if (luckBoostEnd !== 0) {
            luckBoostEnd = 0;
            luck = baseLuck;
            updateInventory();
        }

        timer.textContent = "Geen actieve boost";
        return;
    }

    let minutes = Math.floor(remaining / 60000);
    let seconds = Math.ceil((remaining % 60000) / 1000);

    timer.textContent =
        "Luck Boost: " + minutes + ":" + String(seconds).padStart(2, "0");
}

setInterval(updateLuckTimer, 1000);

document.addEventListener("keydown", function(event) {

    if (event.code === "Space") {
        event.preventDefault();

        document.getElementById("knop").click();
    }

});

function updateRollSpeedTimer() {

    if (rollSpeedBoostEnd > 0 && Date.now() >= rollSpeedBoostEnd) {

        rollSpeedBoostEnd = 0;

        refreshAutoRollInterval();
    }

}

setInterval(updateRollSpeedTimer, 1000);

// Upgrades

let luckUpgrades = [
    {
        name: "Luck I",
        costs: {
            "Common": 10
        }
    },
    {
        name: "Luck II",
        costs: {
            "Uncommon": 5,
            "Common": 5
        }
    },
    {
        name: "Luck III",
        costs: {
            "Rare": 5,
            "Uncommon": 10,
            "Common": 1
        }
    },
    {
        name: "Luck IV",
        costs: {
            "Epic": 5,
            "Rare": 7,
            "Legendary": 2
        }
    },
    {
        name: "Luck V",
        costs: {
            "Legendary": 8,
            "Epic": 3,
            "Mythical": 3
        }
    },
    {
        name: "Luck VI",
        costs: {
            "Mythical": 7,
            "Legendary": 7,
            "Exotic": 3
        }
    },
    {
        name: "Luck VII",
        costs: {
            "Mythical": 10,
            "Exotic": 10,
            "Secret": 5
        }
    },
    {
        name: "Luck VIII",
        costs: {
            "Common": 300,
            "Uncommon": 200,
            "Secret": 10
        }
    },
    {
        name: "Luck IX",
        costs: {
            "Rare": 250,
            "Epic": 100,
            "Exotic": 50
        }
    },
    {
        name: "Luck X",
        costs: {
            "Pristmatic": 3,
            "Secret": 10,
            "Common": 500
        }
    }
];

// Roll speed

let rollSpeedUpgrades = [
    {
        name: "Roll Speed I",
        costs: {
            "Rare": 5
        }
    },
    {
        name: "Roll Speed II",
        costs: {
            "Mythical": 10,
            "Legendary": 5
        }
    },
    {
        name: "Roll Speed III",
        costs: {
            "Exotic": 10,
            "Secret": 1
        }
    },
    {
        name: "Roll Speed IV",
        costs: {
            "Secret": 15,
            "Abyssal": 5
        }
    },
    {
        name: "Roll Speed V",
        costs: {
            "Prismatic": 5,
            "Apex": 1,
            "Abyssal": 10
        }
    },
    {
        name: "Roll speed VI",
        costs: {
            "Apex": 10,
            "Common": 2500,
            "Insane": 1
        }
    }
];

function getRollDelay() {
    let delay = Math.max(100, 400 - rollSpeedLevel * 60);

    if (rollSpeedBoostEnd > Date.now()) {
        return Math.max(50, delay / 2);
    }

    return delay;
}

// Upgrade shop

function updateShop() {

    let shop = document.getElementById("shop-upgrades");
    shop.innerHTML = "";

    let upgradeContainer = document.createElement("div");
    upgradeContainer.classList.add("upgrade-container");

    // Luck upgrades

    if (luckUpgradeLevel < luckUpgrades.length) {

        let upgrade = luckUpgrades[luckUpgradeLevel];

        let upgradeItem = document.createElement("div");
        upgradeItem.classList.add("upgrade-item");

        let title = document.createElement("h3");
        title.textContent = upgrade.name;

        let effect = document.createElement("p");
        effect.textContent = "Permanent Luck: +1";

        upgradeItem.appendChild(title);
        upgradeItem.appendChild(effect);

        let enoughRarities = true;

        for (let rarityName in upgrade.costs) {

            let required = upgrade.costs[rarityName];
            let available = rollsByRarity[rarityName].length;

            let costText = document.createElement("p");
            costText.textContent = rarityName + ": " + available + " / " + required;

            upgradeItem.appendChild(costText);

            if (available < required) {
                enoughRarities = false;
            }
        }

        let buyButton = document.createElement("button");

        buyButton.textContent = "Buy Upgrade";
        buyButton.disabled = !enoughRarities;
        buyButton.addEventListener("click", buyLuckUpgrade);

        upgradeItem.appendChild(buyButton);
        upgradeContainer.appendChild(upgradeItem);

    } else {

        let luckDone = document.createElement("div");
        luckDone.classList.add("upgrade-item");

        let doneText = document.createElement("h3");
        doneText.textContent = "All Luck Upgrades Purchased!";

        luckDone.appendChild(doneText);
        upgradeContainer.appendChild(luckDone);
    }

    // Auto Roll upgrade

    if (!autoRollUnlocked) {

        let autoUpgrade = document.createElement("div");
        autoUpgrade.classList.add("upgrade-item");

        let title = document.createElement("h3");
        title.textContent = "Auto Roll Unlock";

        let effect = document.createElement("p");
        effect.textContent = "Unlocks automatic rolling!";

        autoUpgrade.appendChild(title);
        autoUpgrade.appendChild(effect);

        let costs = {
            "Exotic": 25,
            "Secret": 5,
            "Abyssal": 1
        };

        let enoughRarities = true;

        for (let rarityName in costs) {

            let required = costs[rarityName];
            let available = rollsByRarity[rarityName].length;

            let costText = document.createElement("p");
            costText.textContent = rarityName + ": " + available + " / " + required;

            autoUpgrade.appendChild(costText);

            if (available < required) {
                enoughRarities = false;
            }
        }

        let buyButton = document.createElement("button");

        buyButton.textContent = "Unlock Auto Roll";
        buyButton.disabled = !enoughRarities;
        buyButton.addEventListener("click", buyAutoRollUpgrade);

        autoUpgrade.appendChild(buyButton);
        upgradeContainer.appendChild(autoUpgrade);

    } else {

        let unlockedItem = document.createElement("div");
        unlockedItem.classList.add("upgrade-item");

        let unlockedText = document.createElement("h3");
        unlockedText.textContent = "Auto Roll Unlocked!";

        unlockedItem.appendChild(unlockedText);
        upgradeContainer.appendChild(unlockedItem);
    }

    // Roll Speed upgrade

if (rollSpeedLevel < rollSpeedUpgrades.length) {

    let upgrade = rollSpeedUpgrades[rollSpeedLevel];

    let speedUpgrade = document.createElement("div");
    speedUpgrade.classList.add("upgrade-item");

    let title = document.createElement("h3");
    title.textContent = upgrade.name;

    let effect = document.createElement("p");
    effect.textContent = "Roll delay: " + getRollDelay() + " ms";

    speedUpgrade.appendChild(title);
    speedUpgrade.appendChild(effect);

    let enoughRarities = true;

    for (let rarityName in upgrade.costs) {

        let required = upgrade.costs[rarityName];
        let available = rollsByRarity[rarityName].length;

        let costText = document.createElement("p");
        costText.textContent = rarityName + ": " + available + " / " + required;

        speedUpgrade.appendChild(costText);

        if (available < required) {
            enoughRarities = false;
        }
    }

    let buyButton = document.createElement("button");

    buyButton.textContent = "Buy Roll Speed";
    buyButton.disabled = !enoughRarities;
    buyButton.addEventListener("click", buyRollSpeedUpgrade);

    speedUpgrade.appendChild(buyButton);
    upgradeContainer.appendChild(speedUpgrade);

} else {

    let completed = document.createElement("div");
    completed.classList.add("upgrade-item");

    let completedText = document.createElement("h3");
    completedText.textContent = "Max Roll Speed!";

    completed.appendChild(completedText);
    upgradeContainer.appendChild(completed);
}

    shop.appendChild(upgradeContainer);
}

function buyLuckUpgrade() {

    if (luckUpgradeLevel >= luckUpgrades.length) {
        return;
    }

    let upgrade = luckUpgrades[luckUpgradeLevel];

    for (let rarityName in upgrade.costs) {

        if (rollsByRarity[rarityName].length < upgrade.costs[rarityName]) {
            return;
        }
    }

    for (let rarityName in upgrade.costs) {

        rollsByRarity[rarityName].splice(
            0,
            upgrade.costs[rarityName]
        );
    }

    luckUpgradeLevel++;

    baseLuck++;
    luck++;

    updateInventory();
    updateRarityInventory();

    if (selectedRarity !== null) {
        document.getElementById("rarity-rolls").dataset.rarity = "";
        showRarityRolls();
    }

    updateShop();
}

function buyAutoRollUpgrade() {

    let costs = {
        "Exotic": 25,
        "Secret": 5,
        "Abyssal": 1
    };

    // Controleren of je genoeg rarities hebt

    for (let rarityName in costs) {

        if (rollsByRarity[rarityName].length < costs[rarityName]) {
            return;
        }
    }

    // Rarities betalen

    for (let rarityName in costs) {

        rollsByRarity[rarityName].splice(0, costs[rarityName]);
    }

    autoRollUnlocked = true;

    // Auto Roll-knop vrijgeven

    document.getElementById("auto-roll").disabled = false;

    updateRarityInventory();

    if (selectedRarity !== null) {
        document.getElementById("rarity-rolls").dataset.rarity = "";
        showRarityRolls();
    }

    updateShop();
}

document.getElementById("open-shop").addEventListener("click", function() {
    updateShop();
    document.getElementById("shop-overlay").style.display = "flex";
});

document.getElementById("close-shop").addEventListener("click", function() {
    document.getElementById("shop-overlay").style.display = "none";
});

function buyRollSpeedUpgrade() {

    if (rollSpeedLevel >= rollSpeedUpgrades.length) {
        return;
    }

    let upgrade = rollSpeedUpgrades[rollSpeedLevel];

    for (let rarityName in upgrade.costs) {

        if (rollsByRarity[rarityName].length < upgrade.costs[rarityName]) {
            return;
        }
    }

    for (let rarityName in upgrade.costs) {

        rollsByRarity[rarityName].splice(
            0,
            upgrade.costs[rarityName]
        );
    }

    rollSpeedLevel++;

    updateRarityInventory();

    if (selectedRarity !== null) {
        document.getElementById("rarity-rolls").dataset.rarity = "";
        showRarityRolls();
    }

    // Auto Roll snelheid aanpassen als deze actief is

refreshAutoRollInterval();

    updateShop();
}

updateShop();

let autoRoll = false;
let autoRollInterval;

// Auto roll

document.getElementById("auto-roll").addEventListener("click", function() {

    if (!autoRollUnlocked) {
        return;
    }

    autoRoll = !autoRoll;

    let rollButton = document.getElementById("knop");
    let autoButton = document.getElementById("auto-roll");

    if (autoRoll) {

        rollButton.classList.add("auto-active");
        autoButton.classList.add("active");

autoRollInterval = setInterval(function() {
    rollButton.click();
}, getRollDelay() + 50);

    } else {

        rollButton.classList.remove("auto-active");
        autoButton.classList.remove("active");

        clearInterval(autoRollInterval);
    }
});

let inventoryOverlay = document.getElementById("inventory-overlay");

document.getElementById("open-inventory").addEventListener("click", function() {
    inventoryOverlay.style.display = "flex";
});

document.getElementById("close-inventory").addEventListener("click", function() {
    inventoryOverlay.style.display = "none";
});

    // let mythicalKans = Math.random() < 0.1;

    // if (randomGetal === 50 && mythicalKans){
    //     rarity.textContent = "mythical";
    //     rarity.style.color = "red";
    //     }
    //     else if (randomGetal <=49){
    //     rarity.textContent = "Common";
    //     rarity.style.color = "gray";
    // }
    // else if (randomGetal <= 80) {
    //     rarity.textContent = "Uncommon";
    //     rarity.style.color = "green";
    // }
    // else if (randomGetal <= 95) {
    //     rarity.textContent = "Rare";
    //     rarity.style.color = "blue";
    // }
    // else if (randomGetal <= 105) {
    //     rarity.textContent = "Epic";
    //     rarity.style.color = "purple";
    // }
    // else if (randomGetal <=110) {
    //     rarity.textContent = "Legendary";
    //     rarity.style.color = "gold";
    // }