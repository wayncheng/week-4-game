$(document).ready(function(){

	var character = [
		{ name: 'c3po', 			hp: 140, 	attack: 7, 	counter: 4 },
		{ name: 'r2-d2', 			hp: 120, 	attack: 7, 	counter: 5 },
		{ name: 'yoda', 			hp: 205, 	attack: 12,	counter: 10},
		{ name: 'bb-8', 			hp: 150, 	attack: 8, 	counter: 6 },
		{ name: 'chewbacca', 	hp: 200, 	attack: 10, 	counter: 8 },
		
		{ name: 'emperor', 			hp: 110, 	attack: 6, 	counter: 20},
		{ name: 'stormtrooper', hp: 90,		attack: 5, 	counter: 10},
		{ name: 'darth-vader', 	hp: 160,	attack: 10,	counter: 25},
		{ name: 'darth-maul', 	hp: 120,	attack: 8, 	counter: 20},
		{ name: 'boba-fett', 		hp: 110,	attack: 7, 	counter: 15},
	];

	var user, enemy, u, e;
	var uHP, uA, uAi, uCA, eHP, eCA;
	var uHPcur, uAcur;
	var round = 1;

	// indeces for selected characters in character array
	var uI, eI;

////////////////////////////////////////////////////////////////////////////////
	function restart() {
		var original;
	}

////////////////////////////////////////////////////////////////////////////////
	function badSelect(){
		var $t = $(this);
		var $p = $(this).parent();
		enemy = $p.attr('id');
		var $area = $('#defender-area');
		var s = $area.attr('status');
		console.log($t); 
		console.log('enemy',enemy); 

		if (s === 'empty') {	
			// hide image wrap in row of chars
			$t.parent().css('display','none');
			$area.append($t);
			$area.attr('status','taken');
		}

		return enemy;
	}


////////////////////////////////////////////////////////////////////////////////
	function userSelect(){
		var $t = $(this);
		user = $t.parent().attr('id');
		var $area = $('#good-area');
		var s = $area.attr('status');

		if ( s === 'empty') {	
			// hide image wrap in row of chars
			$t.parent().css('display','none');
			$area.append($t);
			$area.attr('status','taken');
		}
		console.log('user',user);
		return user;
	}

	$('img.bad').on('click',badSelect);
	$('img.good').on('click',userSelect);


////////////////////////////////////////////////////////////////////////////////
	function nextEnemy(){
		// Remove enemy img form arena area
		$('#defender-area img').css('display','none');

		// Change background color of attack button
		$('#attack').css('background-color','#7f8c8d');
		// Remove handler from attack button, which deactivates it.
		$('#attack').off('click',attack);

		// Reset enemy value to null;
		enemy = null;

		// Reset occupancy status of defender area
		$('#defender-area').attr('status','empty');
	}

////////////////////////////////////////////////////////////////////////////////		
	function attack(){
		// Increment user attack up, initially set at 0, so must increment before attack
		// uA += u_A;

		// User Attacks
			// current enemy HP minus attack value
			eHP -= uA;
			console.log('uA for',uA,'eHP now',eHP); 

		// Enemy Counters
			uHP -= eCA;
			console.log('eCA for',eCA,'uHP now', uHP);

		// Increment User's attack value by initial value of attack
			uA += uAi;
			console.log('new uA', uA);

		// Check for Deaths
		if ( eHP <= 0 ) {
			nextEnemy ();
		}
		if ( uHP <= 0 ) {
			console.log('---------GAME OVER-----------');
		}


	} 


////////////////////////////////////////////////////////////////////////////////
	function readyToAttack(){
		// When both characters selected, their variables will be strings, 
		// and we can activate the attack button
		if ( $.type(user) === 'string' && $.type(enemy) === 'string' ){

			for (var i=0; i<character.length; i++) {
				var ix = character[i].name;
				if ( ix === user ) {
					uI = i;
				}
				else if ( ix === enemy ){
					eI = i;
				}
			};


			// Prep Enemy Values
			e = character[eI];
			eHP = e['hp'];
			eCA = e['counter'];

			if ( round <= 1 ) {
				// Prep User Values
				u = character[uI];
				uHP = u['hp'];
				uA = u['attack'];
				uAi = u['attack'];
			}



			// Change background color
			$('#attack').css('background-color','#3498db');

			// Attach handler to attack button, which activates it.
			$('#attack').on('click',attack);

			// Increment round
			round++;

		} //////////// end if() ////////////

	} // end readytoAttack()


	$('img.char').on('click',readyToAttack);



}) ////////////////////////////////////////////////////////////


	// $('img, div,span,button').on('click',function(){
	// 	console.log('this',$(this));
	// 	console.log('user',user);
	// });