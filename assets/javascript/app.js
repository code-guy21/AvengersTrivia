$(document).ready(() => {

	//variables
	let timer;
	let time_rem;
	let current;
	let stats;

	//questions array
	const trivia = [
	
		{
			question: 'How many Infinity Stones exist in the MCU?',
			choices: ['6', '8', '5', '4'],
			answer: '6',
			img: './assets/images/infinity.png'
		},
		{
			question: 'Captain America\'s shield is made from which metal?',
			choices: ['Adamantium', 'Strontium', 'Barium', 'Vibranium'],
			answer: 'Vibranium',
			img: './assets/images/sheild.jpg'
		},
		{
			question: 'What Type of Doctor is Stephen Strange?',
			choices: ['Neurosurgeon', 'Pediatrician', 'Plastic Surgeon', 'Cardiologist'],
			answer: 'Neurosurgeon',
			img: './assets/images/doctorstrange.jpg'
		},
		{
			question: 'What Does May Call Spider-Man\'s Heightened Senses?',
			choices: ['The Tingle', 'Spidey Sense', 'That Special Thing', 'Peter Tingle'],
			answer: 'Peter Tingle',
			img: './assets/images/peterparker.jpeg'
		},
		{
			question: 'What Is The Name Of Star-Lord\'s Ship?',
			choices: ['Walrus', 'Milano', 'Sovereign', 'Simpson'],
			answer: 'Milano',
			img: './assets/images/milano.jpg'
		},
		{
			question: 'Who are the shape-shifting aliens in Captain Marvel?',
			choices: ['Titans', 'Kree', 'Skrulls', 'Xandarians'],
			answer: 'Skrulls',
			img: './assets/images/skrull.jpg'

		},
		{
			question: 'T\'Challa is the ruler of what nation?',
			choices: ['Kenya', 'Sokovia', 'Wakanda', 'Nigeria'],
			answer: 'Wakanda',
			img: './assets/images/wakanda.jpg'
		},
		{
			question: 'What radiation turned Bruce Banner into The Hulk?',
			choices: ['Infrared', 'Gamma', 'X-ray', 'Ultraviolet'],
			answer: 'Gamma',
			img: './assets/images/hulk.jpg'
		},
		{
			question: 'What particles allow Ant-Man to grow and shrink in size?',
			choices: ['Iridium', 'Palladium', 'Uru', 'Pym'],
			answer: 'Pym',
			img: './assets/images/pym.png'
		},
		{
			question: 'Thanos tells Thor, "You should have gone for the ___"?',
			choices: ['Hand', 'Leg', 'Head', 'Chest'],
			answer: 'Head',
			img: './assets/images/thanos.jpg'

		},
		
	];
	
	//randomizes the order of the questions
	const randomize = () => {
		for (let i = trivia.length - 1; i > 0; i--) {
			let randIndex = Math.floor(Math.random() * i);
			let original = trivia[i];
			trivia[i] = { ...trivia[randIndex] };
			trivia[randIndex] = { ...original };
		}
	};
	
	//every time a second expires run this function
	const checkTime = () => {

		//decrease amount of time left
		time_rem--;

		//check if time has ran out
		if(time_rem === 0){
			//clear the timer
			clearInterval(timer);

			//notify user has ran out of time
			$('#question').text('Time is Up!')

			//display the correct answer
			$('#choices').html('<div class="result">The correct answer was: <span class="answer">' + trivia[current].answer+'</span></div>');

			//increase the amount of questions that have gone unanswered
			stats.unanswered++;

			//load next question after 3 seconds
			setTimeout(loadQuestion, 3000);
		}

		//display time left to answer question
		$('#time').text(time_rem);
	}

	//loads the next trivia question
	const loadQuestion = () => {

		//removes the image for previous question if it exists
		$('img').remove();

		//increase index for trivia array
		current++;

		//check if we've run out questions
		if(current === trivia.length){

			//notify user the game is over
			$("#question").text('Game Over')

			//add game stats page
			$("#choices").html(Object.entries(stats).map((stat) => {
				let name = stat[0][0].toUpperCase() + stat[0].slice(1);

				return '<div class="result">' + name + ': ' + stat[1] +'</div>'
			}))

			//display the stats
			$('#choices').show();

			//display start button
			$('#start').show();

		}else{

			//clear the choices available for previous question
			$('#choices').empty();

			//display new time
			$('#time').text(10);

			//display new question
			$('#question').text(trivia[current].question)

			//add new choices to page
			$('#choices').html( trivia[current].choices.map((choice) => {
				return '<button class="choice">' + choice + '</button>'
			}))  

			//display choices
			$('#choices').show();

			//reset time remaining
			time_rem = 10;
			//start counter
			timer = setInterval(checkTime, 1000);
		}
		
	}

	//handles answer selection for user
	function checkAnswer () {

		//stop the timer
		clearInterval(timer);

		//check user clicked the correct answer
		if($(this).text() === trivia[current].answer){
			//increase total for questions answered correctly
			stats.correct++;

			//notify user their answer is correct
			$('#question').text('Correct')

			//display image for correct answer
			$('#choices').html($('<img src="'+ trivia[current].img+ '">'));
		}else{

			//notify user their answer is wrong
			$('#question').text('Wrong')

			//display the correct answer
			$('#choices').html('<div class="result">The correct answer was: <span class="answer">' + trivia[current].answer +'</span></div>');

			//increase total for questions answered incorrectly
			stats.incorrect++;
		}

		//load next question after 3 seconds
		setTimeout(loadQuestion, 3000);
	}
	
	//intially hide timer countdown
	$('#remaining').hide();

	//start button listener
	$('#start').click(() => {

		//reset variables
		current = -1;
		stats = {
			correct: 0,
			incorrect: 0,
			unanswered: 0,
		}

		//randomize order of questions
		randomize();

		//hide start button
		$('#start').hide();
		
		//display time remaining
		$('#remaining').show();

		//load first question
		loadQuestion();
	});

	//adds click listener for choice buttons
	$(document).on( 'click' ,'.choice', checkAnswer);
});
