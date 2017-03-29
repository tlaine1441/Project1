console.log("up and running");

// Player Constructor
const Player = function(name, weapon, hitPoints, health) {
	this.name = name || "Player";
	this.weapon = weapon || "sword";
	this.hitPoints = hitPoints|| 5;
	this.health = health || 20;
	this.baseHealth = 20;
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
	playerHealth.textContent = this.health;
	let playerInitialHealth = document.getElementById("player-initial-health");
	playerInitialHealth.textContent = this.baseHealth;

}

// Monster Constructor
const Monster = function(name, hitPoints, health) {
	this.name = name || "Garb";
	this.hitPoints = hitPoints|| 3;
	this.health = health || 30;
	this.baseHealth = 30;
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
	enemyHealth.textContent = this.health;
	let enemyInitialHealth = document.getElementById("enemy-initial-health");
	enemyInitialHealth.textContent = this.baseHealth;
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
	 let body = document.getElementById("body");
	 body.style.background = "url('images/background/background.jpg') no-repeat center center fixed"; 
}

const countDown = function() {
	let countDownDiv = document.getElementById("countdown");
	let count = 3;
	countDownDiv.textContent = 4;
	setInterval(function() {
		if (count > 0) {
		 countDownDiv.textContent = count;
		} else {
		countDownDiv.textContent = "";
		}
		count--;
	}, 1000);
}

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
	player1.displayHealth();
	monster1.displayHealth();
	// select attack button on dom
	let attackBtn = document.getElementById("attack");
	// add event listener to attackBtn
	attackBtn.addEventListener("click", function() {
		// if monster 1's health is greater than 0
		if(monster1.getHealth() > 0) {
			// player attack monster
			player1.attack(monster1);
			// disable attackBtn while monster attacks
			countDown();
			attackBtn.disabled = true;
			attackBtn.className = "attack-btn grey-out"
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
						attackBtn.disabled = false;
						attackBtn.className = "attack-btn"
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

