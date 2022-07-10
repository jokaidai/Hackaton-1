let hero = {
	name:"Elroy",
	baseDamage:"10",
	intelligence: "10",
	defense:"10",
	speed:"30",
	pv:"100",
	mana:"100",
	fireMagic:{spells:[{name:"Fire Bolt", manaCost:"10", type:"fire"}], mastery:"5"}, 
	waterMagic:{spells:[{name:"Water Bolt", manaCost:"10", type:"water"}], mastery:"5"},
	windMagic:{spells:[{name:"Wind Bolt", manaCost:"10", type:"wind"}], mastery:"5"},
	earthMagic:{spells:[{name:"Earth Bolt", manaCost:"10", type:"earth"}], mastery:"5"}
};

let monster = [
{
	name:"Ignit",
	pv:"100",
	speed:"30",
	defense:"20",
	baseDamage:"25",
	elemResist:["fire"],
	elemWeak:["water"]
},
{
	name:"Aqualit",
	pv:"100",
	speed:"20",
	defense:"25",
	baseDamage:"15",
	elemResist:["fire"],
	elemWeak:["water"]
},

{
	name:"Windit",
	pv:"100",
	speed:"40",
	defense:"10",
	baseDamage:"20",
	elemResist:["fire"],
	elemWeak:["water"]
},

{
	name: "Earthlit",
	pv:"100",
	speed:"10",
	defense:"40",
	baseDamage:"20",
	elemResist:["fire"],
	elemWeak:["water"]
}
]

let baakTik = {
	name:"Baak-Tik",
	pv:"100",
	speed:"50",
	defense:"50",
	baseDamage:"50",
	elemResist:["fire", "water", "wind", "earth"],
	elemWeak:[" "]
};


//---------- utility function ----------  (small functions to make my life easier :P)
function randomize(min, max){

	let random;

	if(min == 0){
		random = Math.floor(Math.random() * (max + 1));
		return random;
	}
	random = (Math.random() * (max - min) + min).toFixed(2)
	return random;
}

//---------- gen var for chooseTurn ----------
let aiTurn = false;
//---------- gen var for chooseTurn ----------
function chooseTurn(){

	if(opponent.speed == hero.speed || opponent.speed > hero.speed){
		aiTurn = true;
	}
}

function checkDead(){

	if(opponent.pv <= 0 || hero.pv <= 0){
		return true;
	}
	return false;
}

function isResistant(){

	if( spellSelected.type in opponent.elemResist){
		return 2;
	}
	return 1;
}
function isWeak(){

	if(opponent == baakTik){
		return 1;

	}else if(spellSelected.type in opponent.elemResist){
		return 2;
	}
	return 1;
}
//---------- utility function ----------

//---------- gen var for getOpponent ----------
let bossSumon = sessionStorage.getItem("pos"); // we get the position of the character box from mapgame.html
let vilainImg;
//---------- gen var for getOpponent ----------
function getOpponent(){ 

	let random = randomize(0,3); //random num for switch condition down 
	
	if(bossSumon >= 224){ // if pos >= 224 then the player enter the fight from one of the doors and not from the boss talk

		switch(random){ //choose a random monster from the monster array

			case 0:
			vilainImg =  document.querySelector("#vilainSide .char");
			vilainImg.setAttribute("src", "images/Ignit.png");
			return monster[0];

			case 1:
			vilainImg =  document.querySelector("#vilainSide .char");
			vilainImg.setAttribute("src", "images/Aqualit.png");
			return monster[1];

			case 2:
			vilainImg =  document.querySelector("#vilainSide .char");
			vilainImg.setAttribute("src", "images/Windlit.png");
			return monster[2];

			case 3:
			vilainImg =  document.querySelector("#vilainSide .char");
			vilainImg.setAttribute("src", "images/Earthlit.png");
			return monster[3];

		}
	}
	return baakTik;
}
// -----------gen var fo playerturn ----------
let newDiv;
let spellSelected = null;
let masteryModif; 

let fireSpell = document.querySelectorAll(".element")[0];
newDiv = document.createElement("div")
let fireSpellName = document.createTextNode(hero.fireMagic.spells[0].name);
newDiv.appendChild(fireSpellName);
newDiv.classList.add("fireSpell");
fireSpell.appendChild(newDiv);
fireSpell.addEventListener("click", function(){
	spellSelected = hero.fireMagic.spells[0];
	masteryModif = hero.fireMagic.mastery;
	playerTurn();
}); 

let waterSpell = document.querySelectorAll(".element")[1];
newDiv = document.createElement("div")
let waterSpellName = document.createTextNode(hero.waterMagic.spells[0].name);
newDiv.appendChild(waterSpellName);
newDiv.classList.add("waterSpell");
waterSpell.appendChild(newDiv);
waterSpell.addEventListener("click", function(){
	spellSelected = hero.waterMagic.spells[0];
	masteryModif = hero.waterMagic.mastery;
	playerTurn();
});  

let windSpell = document.querySelectorAll(".element")[2];
newDiv = document.createElement("div")
let windSpellName = document.createTextNode(hero.windMagic.spells[0].name);
newDiv.appendChild(windSpellName);
newDiv.classList.add("windSpell");
windSpell.appendChild(newDiv); 
windSpell.addEventListener("click", function(){
	spellSelected = hero.windMagic.spells[0];
	masteryModif = hero.windMagic.mastery;
	playerTurn();
}); 

let earthSpell = document.querySelectorAll(".element")[3];
newDiv = document.createElement("div")
let earthSpellName = document.createTextNode(hero.earthMagic.spells[0].name);
newDiv.appendChild(earthSpellName);
newDiv.classList.add("earthSpell");
earthSpell.appendChild(newDiv);
earthSpell.addEventListener("click", function(){
	spellSelected = hero.earthMagic.spells[0];
	masteryModif = hero.earthMagic.mastery;
	playerTurn();
});  
let oppPv = document.querySelector("#vilainSide .bars");
let mana = document.querySelector("#mana");
// -----------gen var fo playerturn ----------
async function playerTurn(){

	let weak; 
	let resist; 

	weak = isWeak();
	resist = isResistant();
	let random = randomize(0.85, 1.35);

	let damage = (hero.baseDamage * masteryModif / opponent.defense * resist) * hero.intelligence * weak * random;
	damage = Math.floor(damage);
	await createMessage(`${opponent.name} take ${damage}`);
	opponent.pv -= damage;
	oppPv.innerHTML = `PV = ${opponent.pv}`;
	oppPv.style.width =  opponent.pv + "%";
	mana.style.width =  100 - spellSelected.manaCost + "%";
	mana.innerHTML = `MANA = ${hero.mana - spellSelected.manaCost}` 
	if(checkDead()){
		endGame();
	}

	opponentTurn();
}

let pv = document.querySelector("#barsWin .bars");
async function opponentTurn(){
	let random = randomize(1.85, 3.35);

	let damage = (opponent.baseDamage / hero.defense) * random;
	damage = Math.floor(damage); 
	await createMessage(`You take ${damage} `);
	hero.pv -= damage;
	pv.innerHTML = `PV = ${hero.pv}`;
	pv.style.width = hero.pv + "%";
	if(checkDead()){
		endGame();
	}
}

async function endGame(){

	if (hero.pv <= 0){
		await createMessage("GAME OVER !!!");
		document.location.href='gameover.html';

	}else if(opponent != baakTik){

		await createMessage("Master Zivar: Well done !!! my apprentice !!")
		hero.intelligence ++;

		document.location.href='map.html';
	}
	else{

		await createMessage("Master Zivar: ... You defeated Baak-Tik !!!! You are now officially a rank 2 apprentice, we will soon start your IF's magic training !!!");

		document.location.href='evolution.html';
	}
}

//---------- gen var for combatHandler ----------
let opponent;
let textBox = document.querySelector("#textQueue");

function aaa(){

}
//---------- gen var for combatHandler ----------
async function createMessage(message){
	return await new Promise(resolve=>{

		let messChar = message.split("");
		let i = 0 ;
		let charInter = setInterval( ()=>{
			
			textBox.innerHTML += messChar[i];
			console.log('ccc=>', i , messChar[i])
			if(i == messChar.length-1){
				clearInterval(charInter);
				textBox.innerHTML="";
				return resolve()
			}
			i++;
			
		}, 100 );	

	})
	// setTimeout(function(){
	// 	textBox.innerHTML = message;
	// }, 3000); 
	
}

async function combatHandler(){

	await createMessage("An ennemy appears");
	opponent = getOpponent();
	
	chooseTurn();
	if (aiTurn) {
		await createMessage(`Master Zivar: ${opponent.name} is faster then you be ready to get hit`);
		opponentTurn();
		
	}else{
		await createMessage(`Master Zivar: You took ${opponent.name} by surprise !! quick choose a spell!!`);
	}
}
combatHandler();
// createMessage("je test");



