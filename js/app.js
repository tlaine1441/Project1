console.log("up and running");

// Player Constructor
const Player = function(name, weapon, hitPoints, health) {
	this.name = localStorage.getItem("name") || "Player";
	if (localStorage.getItem("name") === "Player" || !localStorage.getItem("name")) {
		this.xp =  1;
		this.level = 1;
	} else {
		this.xp = parseInt(localStorage.getItem("xp")) || 1;
		this.level = parseInt(localStorage.getItem("level")) || 1;
	}
	this.weapon = weapon || "sword";
	this.hitPoints = hitPoints|| 5;
	this.health = 10 * Math.floor(Math.pow("2", this.level)) || 20;
	this.baseHealth = 10 * Math.floor(Math.pow("2", this.level)) || 20;
	this.lastAttack;
}

// PROTOYPE METHODS

// Getter methods
Player.prototype.getName = function() {
	return this.name;
}

Player.prototype.getWeapon = function() {
	return this.weapon;
}

Player.prototype.getHitPoints = function() {
	return this.hitPoints;
}

Player.prototype.getHealth = function() {
	return this.health;
}


Player.prototype.getLastAttack = function() {
	return this.lastAttack;
}

Player.prototype.getXp = function() {
	return this.xp;
}

Player.prototype.getLevel = function() {
	return this.level;
}

// Setter methods
Player.prototype.setName = function(name) {
	this.name = name;
}

Player.prototype.setWeapon = function(weapon) {
	this.weapon = weapon;
}

Player.prototype.sethitPoints = function(hitPoints) {
	this.hitPoints = hitPoints;
}

Player.prototype.setHealth = function(health) {
	this.health = health;
}

Player.prototype.setLastAttack = function(lastAttack) {
	this.lastAttack = lastAttack;
}

Player.prototype.setXp = function(xp) {
	this.xp = xp;
}

Player.prototype.setLevel = function(level) {
	this.level = level;
}

Player.prototype.attack = function(monster) {
	let randomGenerator = Math.floor(Math.random() * (2 - 0)) + 0;
	let damage = (this.hitPoints+randomGenerator);
	if ((monster.getHealth() - (damage) < 0)) {
		player1.setLastAttack(damage);
		monster.setHealth(0);
		monster1.displayHealth();
	} else{
		monster.setHealth(monster.getHealth() - (damage));
		player1.setLastAttack(damage);
		monster1.displayHealth();
	}
}

Player.prototype.displayHealth = function() {
	const initialHealth = this.health;
	let playerHealth = document.getElementById("player-health");
	playerHealth.innerHTML = this.health;
	let playerInitialHealth = document.getElementById("player-initial-health");
	playerInitialHealth.innerHTML = this.baseHealth;

}

Player.prototype.namePlate = function() {
	let namePlate = document.getElementById("player-name");
	let name = document.createElement("h2");
	name.textContent = this.name;
	namePlate.appendChild(name);
}

// Monster Constructor
const Monster = function(name, hitPoints, health) {
	this.name = name || "Garb";
	this.level =  Math.floor(Math.random() * ((player1.getLevel() + 1) - (player1.getLevel())) + (player1.getLevel()));
	this.hitPoints = hitPoints|| 3;
	this.health = 15 * Math.floor(Math.pow("2", this.level)) || 30;
	this.baseHealth = 15 * Math.floor(Math.pow("2", this.level)) || 30;
	this.lastAttack;
}

// PROTOYPE METHODS

// Getter methods
Monster.prototype.getName = function() {
	return this.name;
}

Monster.prototype.getHitPoints = function() {
	return this.hitPoints;
}

Monster.prototype.getHealth = function() {
	return this.health;
}

Monster.prototype.getLastAttack = function() {
	return this.lastAttack;
}

// Setter methods
Monster.prototype.sethitPoints = function(hitPoints) {
	this.hitPoints = hitPoints;
}

Monster.prototype.setHealth = function(health) {
	this.health = health;
}

Monster.prototype.setLastAttack = function(lastAttack) {
	this.lastAttack = lastAttack;
}

Monster.prototype.attack = function(player) {
	let randomGenerator = Math.floor(Math.random() * (2 - 0)) + 0;
	let damage = (this.hitPoints+randomGenerator);
	if ((player.getHealth() - (damage) < 0)) {
		player.setHealth(0);
		monster1.setLastAttack(damage);
		player1.displayHealth();
	} else{
		player.setHealth(player.getHealth() - (damage));
		monster1.setLastAttack(damage);
		player1.displayHealth();
	}
}

Monster.prototype.displayHealth = function() {
	const initialHealth = this.health;
	let enemyHealth = document.getElementById("enemy-health");
	enemyHealth.innerHTML = this.health;
	let enemyInitialHealth = document.getElementById("enemy-initial-health");
	enemyInitialHealth.innerHTML = this.baseHealth;
}

Monster.prototype.namePlate = function() {
	let namePlate = document.getElementById("enemy-name");
	let name = document.createElement("h2");
	name.textContent = this.name;
	namePlate.appendChild(name);
}

// Creates player
const createPlayer = function() {
	let player = new Player();
	return player;
}

// Create Monster
const createMonster = function() {
	const monsterNames = ["Grub", "Nightscream", "Dreamling", "Germspawn", "Morncreep", "The Electric Ooze"];
	let randomGenerator = Math.floor(Math.random() * (5 - 0)) + 0;
	console.log(randomGenerator);
	return new Monster(monsterNames[randomGenerator]);
}

// Updates Xp
const updateXp = function() {
	let currentXp = player1.getXp();
	let newXp = currentXp + (10 * Math.pow("2", player1.getLevel()));
	let toLevel = 100 * Math.floor(Math.pow("2.1", player1.getLevel()));
	let totalXp = document.getElementById("xp");
	totalXp.innerHTML = "XP: " + currentXp + "/" + toLevel;
	localStorage.setItem("xp", player1.getXp());
}

// Resets xp when you level up so you do not carry xp into next level
const resetXp = function() {
	player1.setXp(1);
	updateXp();
}

// Updates level when xp is great enough
const updateLevel = function() {
	let level = document.getElementById("level");
	level.innerHTML = "Level: " + player1.getLevel();
	localStorage.setItem("level", player1.getLevel());
}

// Increases player xp as well calls necessary functions to update xp approperately
// Also appends xp to UI
const increaseXp = function() {
	let currentXp = player1.getXp();
	let newXp = currentXp + (10 * Math.pow("2", player1.getLevel()));
	let toLevel = 100 * Math.floor(Math.pow("2.1", player1.getLevel()))
	player1.setXp(newXp);
	let xpTextNode = document.createElement("p");
		xpTextNode.className="xpText";
		xpTextNode.innerHTML = ("XP: " + newXp);
		document.getElementById("damage").appendChild(xpTextNode);
		setTimeout(function() {
			xpTextNode.remove();
		}, 2000);
		updateXp();
		updateLevel();
	if (player1.getXp() >= toLevel) {
		player1.setLevel(player1.getLevel() + 1);
		updateXp();
		updateLevel();
		resetXp();
		player1.displayHealth();
		monster1.displayHealth();
	}
}

// Hide and Show functions
const hideNameInput = function() {
    document.getElementById('name-container').className='hidden-div';  
}

const showPlayBtn = function() {
    document.getElementById('ready-to-play').className="ready-to-play show-div";  
}

const hidePlayBtn = function() {
    document.getElementById('ready-to-play').className="ready-to-play hidden-div";  
}

const showGame = function() {
	 document.getElementById('game').className="game show-div";
	 document.getElementById('nav').className="show-div";
	 let body = document.getElementById("body");
	 body.style.background = "url('images/background/background.jpg') no-repeat center center fixed"; 
	 player1.namePlate();
	 monster1.namePlate();
	 saveGameAddClick();
	 updateLevel();
	 updateXp();
}

// Countdown function displayer cool down on attack spell
const countDown = function() {
	let countDownDiv = document.getElementById("countdown");
	let count = 3;
	countDownDiv.innerHTML = 4;
	countDownDiv.className = "countdown show-countdown";
	let countDown = setInterval(function() {
		if (count > 0) {
		 countDownDiv.innerHTML = count;
		} else {
		countDownDiv.innerHTML = "";
		}
		count--;
		if (count < 0) {
			clearInterval(countDown);
			countDownDiv.className = "countdown hidden-div";
		}
	}, 1000);
}

// Appends player damage to UI
const displayPlayerDamage = function() {
	let playerDamageNode = document.createElement("p");
	playerDamageNode.className="player-damage";
	// create damge string to put inside damage node
	let playerDamageInfo = (player1.getLastAttack());
	// pass damage info string into playerDamageNode
	playerDamageNode.innerHTML = (playerDamageInfo + " Damage Delt");
	// append playerDamageNode to div with id #damage
	document.getElementById("damage").appendChild(playerDamageNode);
	setTimeout(function() {
		playerDamageNode.remove();
	}, 2000);
	console.log(player1.getName() + " attacks: " + monster1.getName() +  " health: " + monster1.getHealth());
}

// Appends enemy damage to UI
const displayEnemyDamage = function() {
	// create p node to append monster damage to dom
	let enemyDamageNode = document.createElement("p");
	enemyDamageNode.className="enemy-damage";
	// create damge string to put inside damage node
	let enemyDamageInfo = (monster1.getLastAttack());
	console.log(monster1.getLastAttack());
	// pass damage info string into playerDamageNode
	enemyDamageNode.innerHTML = (enemyDamageInfo + " Damage Recieved");
	// append playerDamageNode to div with id #damage
	document.getElementById("damage").appendChild(enemyDamageNode);
	setTimeout(function() {
		enemyDamageNode.remove();
	}, 2000);
	console.log(monster1.getName() + " attacks: " + player1.getName() +  " health: " + player1.getHealth());

}

// Displays and adds click to character name selection screen
// Also sets character name to what user types into input
// Sets Player to default if no name is entered
const nextBtn = function() {
		let nextBtn = document.getElementById("continue-btn");
		nextBtn.addEventListener("click", function() {
			let characterNameInput = document.getElementById("characterNameInput");
			let characterName = characterNameInput.value;
			if (characterName) {
				player1.setName(characterName);
			} else {
				player1.setName("Player");
			}
			hideNameInput();
			showPlayBtn();
			generateStartBtn();
			console.log(player1.getName());

		});
}

// Saves user data to local storage
const saveGame = function() {
	localStorage.setItem('name', player1.getName());
	localStorage.setItem("xp", player1.getXp());
	localStorage.setItem("level", player1.getLevel());
}

// Adds click to save button
const saveGameAddClick = function() {
	let saveBtn = document.getElementById("save");
	saveBtn.addEventListener("click", function() {
		saveGame();
	});
}

// Main Start game function 
const startGame = function() {
	showGame();
	player1.displayHealth();
	monster1.displayHealth();
	// select attack button on dom
	let attackBtn = document.getElementById("attack");
	// add event listener to attackBtn
	attackBtn.addEventListener("click", function() {
		// if monster 1's health is greater than 0
		if(monster1.getHealth() > 0 || player1.getHealth() > 0) {
			// player attack monster
			player1.attack(monster1);
			// disable attackBtn while monster attacks
			countDown();
			attackBtn.disabled = true;
			attackBtn.className = "attack-btn grey-out";
			displayPlayerDamage();
			console.log(player1.getName() + " attacks: " + monster1.getName() +  " health: " + monster1.getHealth());
				// set 2 sec timeout for monster attack delay
				setTimeout(function(){
					// if monster health is > 0 allow attack
					if (monster1.getHealth() > 0) {
						// monster attack player
						monster1.attack(player1);
						// create p node to append monster damage to dom
						displayEnemyDamage();
					}
					// set 2sec delay to reactivate player attack button
					setTimeout(function(){
						// reactivate attackBtn
						if (player1.getHealth() > 0 && monster1.getHealth() > 0) {
							attackBtn.disabled = false;
							attackBtn.className = "attack-btn";
						}
						checkWin();
					}, 2000);
			}, 2000);
		} else {
			console.log(monster1.getName() + " is dead");
		}

	});
}

// Generates start button and asks user "by name" if they are ready to battle
const generateStartBtn = function() {
	let div = document.getElementById("ready-to-play-content");
	let h1 = document.createElement('h1');
	h1.innerHTML = (player1.getName() + " are you ready?");
	div.appendChild(h1);
	let button = document.createElement("button");
	button.innerHTML = "Play";
	button.id = "play-btn"
	div.appendChild(button);

	let playBtn = document.getElementById("play-btn");
	playBtn.addEventListener("click", function() {
		hidePlayBtn();
		startGame();
	});
}

// Checks win condition if player or enemy dies
const checkWin = function() {
	var playAgainBtn = document.createElement("button");
	playAgainBtn.innerHTML = "Play Again";
	playAgainBtn.className = "play-again-btn";
	if (player1.getHealth() <= 0 && monster1.getHealth() >= 0) {
		let winTextNode = document.createElement("p");
		winTextNode.className="winText";
		winTextNode.innerHTML = (monster1.getName() + " Wins!!!");
		winTextNode.style.color = "red";
		// append playerDamageNode to div with id #damage
		document.getElementById("damage").appendChild(winTextNode);
		document.getElementById("damage").appendChild(playAgainBtn);
		playAgainBtn.addEventListener("click", function() {
			playAgain();
		})
	} else if (player1.getHealth() >= 0 && monster1.getHealth() <= 0) {
		let winTextNode = document.createElement("p");
		winTextNode.className="winText";
		winTextNode.innerHTML = (player1.getName() + " Wins!!!");
		winTextNode.style.color = "#ff0aee";
		// append playerDamageNode to div with id #damage
		document.getElementById("damage").appendChild(winTextNode);
		increaseXp();
		document.getElementById("damage").appendChild(playAgainBtn);
		playAgainBtn.addEventListener("click", function() {
			playAgain();
		})
	}
}

// Reloads 
const playAgain = function() {
	location.reload(false);
}

// Creates instance of monster and player objects
var player1 = createPlayer();
var monster1 = createMonster();

// Test if user has saved
if (localStorage.getItem("name") === "Player" || !localStorage.getItem("name")) {
	nextBtn();
} else {
	hideNameInput();
	showPlayBtn();
	generateStartBtn();
}