console.log("up and running");

// Player Constructor
const Player = function(name, weapon, hitPoints, health) {
	this.name = name || "Player";
	this.weapon = weapon || "sword";
	this.hitPoints = hitPoints|| 5;
	this.health = health || 20;
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

Player.prototype.attack = function(monster) {
	let randomGenerator = Math.floor(Math.random() * (2 - 0)) + 0;
	if ((monster.getHealth() - (this.hitPoints+randomGenerator) < 0)) {
		monster.setHealth(0);
	} else{
		monster.setHealth(monster.getHealth() - (this.hitPoints+randomGenerator));
	}
}


// Monster Constructor
const Monster = function(name, hitPoints, health) {
	this.name = name || "Garb";
	this.hitPoints = hitPoints|| 3;
	this.health = health || 30;
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

// Setter methods
Monster.prototype.sethitPoints = function(hitPoints) {
	this.hitPoints = hitPoints;
}

Monster.prototype.setHealth = function(health) {
	this.health = health;
}

Monster.prototype.attack = function(player) {
	let randomGenerator = Math.floor(Math.random() * (2 - 0)) + 0;
	if ((player.getHealth() - (this.hitPoints+randomGenerator) < 0)) {
		player.setHealth(0);
	} else{
		player.setHealth(player.getHealth() - (this.hitPoints+randomGenerator));
	}
}

const createPlayer = function() {
	//let player = new Player(chooseName(), chooseWeapon());
	let player = new Player();
	return player;
}

const createMonster = function() {
	const monsterNames = ["Grub", "Nightscream", "Dreamling", "Germspawn", "Morncreep", "The Electric Ooze"];
	let randomGenerator = Math.floor(Math.random() * (5 - 0)) + 0;
	console.log(randomGenerator);
	return new Monster(monsterNames[randomGenerator]);
}

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
	 document.getElementById('main-game').className="show-div";  
}


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

const startGame = function() {
	showGame();
	// select attack button on dom
	let attackBtn = document.getElementById("attack");
	// add event listener to attackBtn
	attackBtn.addEventListener("click", function() {
		// if monster 1's health is greater than 0
		if(monster1.getHealth() > 0) {
			// player attack monster
			player1.attack(monster1);
			// disable attackBtn while monster attacks
			attackBtn.disabled = true;
			// create a p node to append player damge to dom 
			let playerDamageNode = document.createElement("p");
				// create damge string to put inside damage node
				let playerDamageInfo = (player1.getName() + " attacks: " + monster1.getName() +  " health: " + monster1.getHealth());
				// pass damage info string into playerDamageNode
				playerDamageNode.innerHTML = playerDamageInfo;
				// append playerDamageNode to div with id #damage
				document.getElementById("damage").appendChild(playerDamageNode);
			console.log(player1.getName() + " attacks: " + monster1.getName() +  " health: " + monster1.getHealth());
				// set 2 sec timeout for monster attack delay
				setTimeout(function(){
					// if monster health is > 0 allow attack
					if (monster1.getHealth() > 0) {
						// monster attack player
						monster1.attack(player1);
						// create p node to append monster damage to dom
						let monsterDamageNode = document.createElement("p");
						// // create damge string to put inside damage node
						let monsterDamageInfo = (monster1.getName() + " attacks: " + player1.getName() +  " health: " + player1.getHealth());
						// append monsterDamageNode to div with id #damage
						monsterDamageNode.innerHTML = monsterDamageInfo;
						document.getElementById("damage").appendChild(monsterDamageNode);
						console.log(monster1.getName() + " attacks: " + player1.getName() +  " health: " + player1.getHealth());
					}
					// set 2sec delay to reactivate player attack button
					setTimeout(function(){
						// reactivate attackBtn
						attackBtn.disabled = false;
					}, 2000);
			}, 2000);
		} else {
			console.log(monster1.getName() + " is dead");
		}

	});
}

const generateStartBtn = function() {
	let div = document.getElementById("ready-to-play-content");
	let h1 = document.createElement('h1');
	h1.innerHTML = (player1.name + " are you ready?");
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


let player1 = createPlayer();
let monster1 = createMonster();
