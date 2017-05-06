$(document).ready(function(){

	var character = [
		{ name: 'c3po', 			title: 'C-3PO',			hp: 140, 	attack: 7, 	counter: 4 },
		{ name: 'r2-d2', 			title: 'R2-D2',			hp: 120, 	attack: 7, 	counter: 5 },
		{ name: 'yoda', 			title: 'Yoda',			hp: 205, 	attack: 12,	counter: 10},
		{ name: 'bb-8', 			title: 'BB-8',			hp: 150, 	attack: 8, 	counter: 6 },
		{ name: 'chewbacca', 	title: 'Chewbacca',	hp: 200, 	attack: 10, 	counter: 8 },
		
		{ name: 'emperor', 			title: 'The Emperor',		hp: 110, 	attack: 6, 	counter: 20},
		{ name: 'stormtrooper', title: 'Stormtrooper',	hp: 90,		attack: 5, 	counter: 10},
		{ name: 'darth-vader', 	title: 'Darth Vader',		hp: 160,	attack: 10,	counter: 25},
		{ name: 'darth-maul', 	title: 'Darth Maul',		hp: 120,	attack: 8, 	counter: 20},
		{ name: 'boba-fett', 		title: 'Boba Fett',			hp: 110,	attack: 7, 	counter: 15},
	];

	var user, enemy, u, e;
	var uHP, uHPi, uA, uAi, uCA, eHP, eHPi, eCA;
	var uHPcur, uAcur;

	// indeces for selected characters in character array
	var uI, eI;

////////////////////////////////////////////////////////////////////////////////
	function restart() {
		var eSel = '#'+ enemy;
		var uSel = '#'+ user

			$(uSel).show();
			var uImg = $('#good-area').find('img');
			$(uSel).append(uImg);

			
			$(eSel).show();
			// $(eSel).css('display','inline-block')
			var eImg = $('#bad-area').find('img');
			$(eSel).append(eImg);
			$('.char-wrap').css('display','inline-block');

			// reset HP text in hp bars
			$('.hp-text').text('');

			$('.hp-bar').css({
					'width': '100%',
					'background-color': '#2ecc71'
				});

			// Reset All Values
			user = enemy = u = e = null;
			uHP = uHPi = uA = uAi = uCA = eHP = eHPi = eCA = null;
			eI = uI = null;

			readyToAttack();

			// clear status
			$('.arena-area').attr('status','empty');

			$('img.good').on('click',userSelect);
			$('img.good').removeClass('inactive');

			// Remove handler from attack button
			$('#attack').off('click',attack);
		
		}
	$('#restart').on('click',restart);


function badSelect(){
		var $t = $(this);
		var $p = $(this).parent();
		enemy = $p.attr('id');
		var $area = $('#bad-area');
		var s = $area.attr('status');

		// Find Enemy Index
		for (var i=0; i<character.length; i++) {
			if ( character[i].name === enemy )
				eI = i;
		};
		e = character[eI];
		eHP = e['hp'];
		eHPi = e['hp'];
		eCA = e['counter'];

		if (s === 'empty') {	
			// hide image wrap in row of chars
			$t.parent().hide();
			$area.append($t);
			$area.attr('status','taken');
			$('#bad-area .hp-text').text(eHP);
		}

		$('.hp-bar.bad').css('width','100%');
		$('.hp-bar.bad').css('background-color','#2ecc71');

		return enemy;
	}

function userSelect(){
		var $t = $(this);
		user = $t.parent().attr('id');
		var $area = $('#good-area');
		var s = $area.attr('status');

		// Find User Index
		for (var i=0; i<character.length; i++) {
			if ( character[i].name === user )
				uI = i;
		};

		// Prep User Values
		u = character[uI];
		uHP = u['hp'];
		uHPi = u['hp'];
		uA = u['attack'];
		uAi = u['attack'];

		// Only selects character if nothing else is selected.
		if ( s === 'empty') {	
			// hide image wrap in row of chars
			$t.parent().hide();
			$area.append($t);
			$area.attr('status','taken');
			$('#good-area .hp-text').text(uHP);
		}

		// Remove click handler from user selection
		$('img.good').off('click',userSelect);
		$('img.good').addClass('inactive');

		return user;
	}

function nextEnemy(){
		var eSel = '#'+ enemy;
		// Remove enemy img form arena area
		// var badHold = $('#bad-area img').css('opacity', 0.5);
		// $('.char-container.bad').append(badHold);
		var eImg = $('#bad-area').find('img');
		$(eSel).append(eImg);
		$('#bad-area img').css('display','none');

			// $(eSel).show();
			// $(eSel).css('display','inline-block')
			$(eSel).append(eImg);
			var eImg = $('#bad-area').find('img');

		// Change background color of attack button
		$('#attack').removeClass('inactive');

		// Remove handler from attack button, which deactivates it.
		$('#attack').off('click',attack);

		// Reset enemy value to null;
		enemy = null;

		// Reset occupancy status of bad area
		$('#bad-area').attr('status','empty');
	}

function attack(){
		// User Attacks
			// current enemy HP minus attack value
			eHP -= uA;

		// Enemy Counters
			uHP -= eCA;

		// Update HP bars, values
			$('.hp-text.good').text(uHP);
			$('.hp-text.bad').text(eHP);

			var uW = (uHP/uHPi)*100;
			var eW = (eHP/eHPi)*100;

			$('.hp-bar.good').animate({'width': uW+'%'}, 300);
			$('.hp-bar.bad').animate({'width': eW+'%'}, 300);

		// Change HP bar color when low
			if (uW <= 30) 			$('.hp-bar.good').css('background-color','#e74c3c');
			else if (uW <= 60) 	$('.hp-bar.good').css('background-color','#f39c12');
			else							 	$('.hp-bar.good').css('background-color','#2ecc71');
			
			if (eW <= 30) 			$('.hp-bar.bad').css('background-color','#e74c3c');
			else if (eW <= 60) 	$('.hp-bar.bad').css('background-color','#f1c40f');
			else 								$('.hp-bar.bad').css('background-color','#2ecc71');

		// Feed Text
			var uT = u['title'];
			var eT = e['title'];
			var feed1text = uT + ' attacked ' + eT + ' for ' + uA + ' HP. ' + eT + ' now has ' + eHP + ' HP left.';	
			var feed2text = eT + ' attacked ' + uT + ' for ' + eCA + ' HP. ' + uT + ' now has ' + uHP + ' HP left.';

		// Check for Deaths
			if ( eHP <= 0 ) {
				feed1text = uT + ' attacked ' + eT + ' for ' + uA + 'HP. ' + eT + ' has died. Select your next opponent.';
				nextEnemy ();
			}
			if ( uHP <= 0 ) {
				feed2text = eT + ' attacked ' + uT + ' for ' + eCA + 'HP. ' + uT + 'has died. Game Over.';
				console.log('---------GAME OVER-----------');
			}

		// Update Feeds
			$('#feed1').text(feed1text);
			$('#feed2').text(feed2text); 
			
				console.log(feed2text);
				console.log(feed1text);

		// Increment User's attack value by initial value of attack
			uA += uAi;
			console.log('new uA', uA);
	} 

function readyToAttack(){
		// When both characters selected, their variables will be strings, 
		// and we can activate the attack button
		if ( $.type(user) === 'string' && $.type(enemy) === 'string' ){
					// Change background color
					$('#attack').removeClass('inactive');

					// Attach handler to attack button, which activates it.
					$('#attack').on('click',attack);

					$('img.good').off('click',userSelect);
		}
	} // end readytoAttack()



$('img.bad').on('click',badSelect);
$('img.good').on('click',userSelect);
$('img.char').on('click',readyToAttack);


}) ////////////////////////////////////////////////////////////


	// $('img, div,span,button').on('click',function(){
	// 	console.log('this',$(this));
	// 	console.log('user',user);
	// });