	/* 
	name
	do while
	user name
	difficulty

	Create a game where the user can guess a number from a range and can select the difficulty i.e. 1-20, 1-50, 1-100.
	
	depending on the difficulty the user has x amount of attemps to figure out the correct number 3, 5, 8

	User should be able insert his/her name 
	user should be able to to see latest scores which should be saved using html5 web storage api

	steps:
	1. chosse diffculty
	2. play
	3 result 
		3.1 if winner ask name
	4 show high scores answered with least attempts

type guessed number
add number to attempts
check number
	if success, show success message & go to collect user data
	if not success check attemps left
		if attemps left, clear input so user can add new number
		if no attemps left, show msg run out of attemps 

	*/

	// Global variables
	var level, difficulty, totalAttempts, answer, winners;
	var attempts = 0;

	/*****************************************
	 Select Difficulty and set attempts
	 *****************************************/
	function chooseDifficulty(e){
		level = e.target.getAttribute('data-diffculty');		
		if(level == 'hard'){
			totalAttempts = 8;
			difficulty = 100;			
		}else if(level == "middle"){
			totalAttempts = 5;
			difficulty = 50;			
		}else{
			totalAttempts = 3;
			difficulty = 15;			
		}
		document.getElementById('select-difficulty').setAttribute('class','hide-section');
		document.getElementById('game-on').setAttribute('class','show-section');
		// set number to be guessed according to the difficulty
		answer = Math.floor(Math.random() * difficulty) + 1;
		console.log(answer);
	}
	
	// get all difficulty buttons and attach the click event to them
	var elBtn = document.getElementsByClassName('difficulty-btn');	
	for (var i = 0; i < elBtn.length; i++) {
		elBtn[i].addEventListener('click',chooseDifficulty);
	}

	/*****************************************
	 Check answers and attepmts
	 *****************************************/
	function checkAnswer(){
		if (guessedNum.value === '') {
			msg.textContent = 'yo! submit a number';
		}else{
			attempts += 1; 				
			if (guessedNum.value == answer){			
				successMessage();
			}else{
				if (guessedNum.value > answer){
					msg.textContent = "Too high";
				}else{
					msg.textContent = "Too low";
				}
				attemptsLeft();
			}
			numAttempts.textContent = attempts + ' out of ' + totalAttempts;
		}		
	}
	// check if there's any attempts left before or show failure
	function attemptsLeft(){
		if(totalAttempts == attempts){
			document.getElementById('game-on').removeAttribute('class');			
			document.getElementById('failure').setAttribute('class','show-section');
			document.getElementById('failure-answer').textContent = answer;				
		}else{
			// empty field
			guessedNum.value = '';			
		}
	}

	// get guessed number 
	var guessedNum = document.getElementById('user-answer');
	// get button and attach event to run function to check answer
	var runAnswer = document.getElementById('check-answer');
	runAnswer.addEventListener('click', function(event){
		event.preventDefault();
		checkAnswer();
	});
	// get paragraph to display results
	var msg = document.getElementById('result-msg');
	// get paragraph to display attempts
	var numAttempts = document.getElementById('attempts');	

	/*****************************************
	 success message 
	 *****************************************/
	function successMessage(){
		document.getElementById('game-on').removeAttribute('class','show-section');
		document.getElementById('success').setAttribute('class','show-section');
		document.getElementById('correct-answer').textContent = answer;	
	}

	/*****************************************
	 Collect user data
	 *****************************************/
	var winnerName = document.getElementById('winner-name');
	var saveWinner = document.getElementById('save-winner');
	saveWinner.addEventListener('click', function(){
		recordUser(level);
	}, false);

	function recordUser(level){
		var topTenLevel = 'topTen'+level;
		// previous users from local storage
		if(localStorage.getItem(topTenLevel) === null){		
			winners = [];
		}else{
			// web storage only saves strings so we use JSON.parse to convert the string back into an array
			winners = JSON.parse(localStorage.getItem(topTenLevel));
		}
		// current user score
		var userScore = [winnerName.value,attempts,totalAttempts];
		winners.push(userScore);
		// sort winners by least amount of attempts
		winners.sort( function(a,b){
			return a[1] - b[1];
		});		

		// update local storage, we used JSON.stringify to convert our arrays into string before saving it into a local storage because it only accepts strings
		localStorage.setItem(topTenLevel,JSON.stringify(winners));

		// prin table
		printTopTen();
	}

	// print top ten table
	function printTopTen(){		
		document.getElementById('score-board').setAttribute('class','show-section');
		document.getElementById('success').removeAttribute('class','show-section');
		var topTen = document.getElementById('top-ten');
		var levelMode = document.getElementById('levelMode');
		levelMode.textContent = level;

		for (var i = 0; i < 10; i++) {
			var winner = document.createElement('li');
			winner.textContent =  winners[i][0] + ' ' +  winners[i][1] + ' out of ' +  winners[i][2] + ' tries';
			topTen.appendChild(winner);
		}
	}

	/*****************************************
	 play again
	 *****************************************/
	var playAgainBtn = document.getElementsByClassName('play-again');
	for (var i = 0; i < playAgainBtn.length; i++) {
		playAgainBtn[i].addEventListener('click',playAgain,false);
	}	

	function playAgain(){
		/* clean everything
		totalAttempts = answer = attempts = 0;
		guessedNum.value = winnerName.value = '';
		numAttempts.textContent = msg.textContent = '';
		document.getElementById('top-ten').textContent = '';
		// hide all divs and make sure to show the first step
		var hideAll = document.querySelectorAll('section');
		for (var i = 0; i < hideAll.length; i++) {
			if(hideAll[i].hasAttribute('class')){
				hideAll[i].removeAttribute('class');
			}
		}
		// show first step
		document.getElementById('select-difficulty').setAttribute('class','show-section');		
		*/
		window.location.reload(false);		
	}