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


let player1 = createPlayer();
let monster1 = createMonster();

let nextBtn = document.getElementById("next");
nextBtn.addEventListener("click", function() {
	let characterNameInput = document.getElementById("characterNameInput");
	let characterName = characterNameInput.value;
	player1.setName(characterName);
	console.log(player1.getName());

});


let attackBtn = document.getElementById("attack");
attackBtn.addEventListener("click", function() {
	if(monster1.getHealth() > 0) {
		player1.attack(monster1);
		attackBtn.disabled = true;
		let playerDamageNode = document.createElement("p");
			let playerDamageInfo = (player1.getName() + " attacks: " + monster1.getName() +  " health: " + monster1.getHealth());
			playerDamageNode.innerHTML = playerDamageInfo;
			document.getElementById("damage").appendChild(playerDamageNode);
		console.log(player1.getName() + " attacks: " + monster1.getName() +  " health: " + monster1.getHealth());
		setTimeout(function(){
			monster1.attack(player1);
			setTimeout(function(){
			attackBtn.disabled = false;
		}, 2000);
			let monsterDamageNode = document.createElement("p");
			let monsterDamageInfo = (monster1.getName() + " attacks: " + player1.getName() +  " health: " + player1.getHealth());
			monsterDamageNode.innerHTML = monsterDamageInfo;
			document.getElementById("damage").appendChild(monsterDamageNode);
			console.log(monster1.getName() + " attacks: " + player1.getName() +  " health: " + player1.getHealth());
		}, 2000);
	}else {
		console.log(monster1.getName() + " is dead");
	}

});