let inter;


let character = document.querySelectorAll('div')[1]
// console.log(character)

let posLeftRight = 0;

let posTopBotom = 0;
let pos;

let container1 = document.querySelector('.text')
let perso = document.querySelector('.character img')
// console.log(perso.setAttribute('src','elroyLastdown.png'))


//let getData = sessionStorage.getItem('pos')


document.addEventListener('keydown', function(event){

	// console.log(event.key,event.keyCode)

// move bottom
if (event.keyCode == 83) {

	let pos = 1;
	character.style.top = posTopBotom  +'px';
	posTopBotom=posTopBotom+(7*pos);
	perso.setAttribute('src', 'images/elroyLastdown.png')
}
//move top
if(event.keyCode == 87){

	let pos = -1;
	character.style.top = posTopBotom  +'px';
	posTopBotom=posTopBotom+(7*pos);
	perso.setAttribute('src','images/elroylastup.png')
}
//move right
if (event.keyCode==68) {

	let pos = 1;
	character.style.left = posLeftRight + 'px';
	posLeftRight= posLeftRight+7;
	perso.setAttribute('src','images/elroyLastright.png')
}
//move left
if(event.keyCode==65){

	let pos = -1;
	character.style.left = posLeftRight + 'px';
	posLeftRight= posLeftRight+ (7*pos);
	perso.setAttribute('src','images/elroylastleft.png')
}
if (posLeftRight>= 406 && posLeftRight<=441  && posTopBotom >=224  && posTopBotom<=225) {

		//battle zone house 1

		console.log(posTopBotom, posLeftRight)

		alert('Whats happening?');

		sessionStorage.setItem("pos", posTopBotom);
		document.location.href='battle.html';

		return;
	}

	if (posLeftRight>= 749 && posLeftRight<=791  && posTopBotom >=224  && posTopBotom<=225) {
		
		//battle house 2

		console.log(posTopBotom, posLeftRight)

		alert('Whats happening?');

		sessionStorage.setItem("pos", posTopBotom);
		document.location.href='battle.html';
		return;

	}
	if (posLeftRight>= 952 && posLeftRight<=955  && posTopBotom >=154  && posTopBotom<=182) {
		
		// interaction

		alert("Hey what's up? If you're looking for Baak Tick he is behind the tree, be careful he is angry");
		confirm('Are you strong enough to fight him?');

		return;

	}
	if (posLeftRight>= 1071 && posLeftRight<=1072  && posTopBotom >=14  && posTopBotom<=36) {

		//boss location	

		alert('Angry Baak Tick appears ');
		sessionStorage.setItem("pos", posTopBotom);
		document.location.href='battle.html';
		return;
	}

//stop movement

let collision = setInterval(function(){
	if(posLeftRight == 91 && posLeftRight <= 160 && posTopBotom>=0 && posTopBotom<=427){
		console.log( posLeftRight = 0);
	}
})},7);

document.addEventListener('keyup', function(event){

	console.log(event.key,event.keyCode)
	clearInterval(inter)
})






