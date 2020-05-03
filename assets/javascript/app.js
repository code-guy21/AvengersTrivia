$(document).ready(() => {

	let timer;
	let time_rem;
	let current;
	let stats;

	const trivia = [
	
		{
			question: 'How many Infinity Stones exist in the MCU?',
			choices: ['6', '8', '5', '4'],
			answer: '6',
		},
		{
			question: 'Captain America\'s shield is made from which metal?',
			choices: ['Adamantium', 'Strontium', 'Barium', 'Vibranium'],
			answer: 'Vibranium',
		},
		{
			question: 'What Type of Doctor is Stephen Strange?',
			choices: ['Neurosurgeon', 'Pediatrician', 'Plastic Surgeon', 'Cardiologist'],
			answer: 'Neurosurgeon',
		},
		{
			question: 'What Does May Call Spider-Man\'s Heightened Senses?',
			choices: ['The Tingle', 'Spidey Sense', 'That Special Thing', 'Peter Tingle'],
			answer: 'Peter Tingle',
		},
		{
			question: 'What Is The Name Of Star-Lord\'s Ship?',
			choices: ['Walrus', 'Milano', 'Sovereign', 'Simpson'],
			answer: 'Milano',
		},
		{
			question: 'Who are the shape-shifting aliens in Captain Marvel?',
			choices: ['Titans', 'Kree', 'Skrulls', 'Xandarians'],
			answer: 'Skrulls',
		},
		{
			question: 'T\'Challa is the ruler of what nation?',
			choices: ['Kenya', 'Sokovia', 'Wakanda', 'Nigeria'],
			answer: 'Wakanda',
		},
		{
			question: 'What radiation turned Bruce Banner into The Hulk?',
			choices: ['Infrared', 'Gamma', 'X-ray', 'Ultraviolet'],
			answer: 'Gamma',
		},
		{
			question: 'What particles allow Ant-Man to grow and shrink in size?',
			choices: ['Iridium', 'Palladium', 'Uru', 'Pym'],
			answer: 'Pym',
		},
		{
			question: 'Thanos tells Thor, "You should have gone for the ___"?',
			choices: ['Hand', 'Leg', 'Head', 'Chest'],
			answer: 'Head',
		},
		
	];
	
	const randomize = () => {
		for (let i = trivia.length - 1; i > 0; i--) {
			let randIndex = Math.floor(Math.random() * i);
			let original = trivia[i];
			trivia[i] = { ...trivia[randIndex] };
			trivia[randIndex] = { ...original };
		}
	};
	
	const checkTime = () => {
		time_rem--;

		if(time_rem === 0){
			clearInterval(timer);
			$('#question').text('Time is Up!')
			$('#choices').html('<div class="result">The correction answer was: <span class="answer">' + trivia[current].answer+'</span></div>');
			stats.unanswered++;
			setTimeout(loadQuestion, 2000);
		}

		$('#time').text(time_rem);
	}

	const loadQuestion = () => {
		current++;

		if(current === trivia.length){
			$("#question").text('Game over, here are your stats')

			$("#choices").html(Object.entries(stats).map((stat) => {
				let name = stat[0][0].toUpperCase() + stat[0].slice(1);

				return '<div class="result">' + name + ': ' + stat[1] +'</div>'
			}))

			$('#start').show();
		}else{

			$('#choices').empty();

			$('#time').text(10);

			$('#question').text(trivia[current].question)

			$('#choices').html( trivia[current].choices.map((choice) => {
				return '<button class="choice">' + choice + '</button>'
			}))  

			time_rem = 10;
			timer = setInterval(checkTime, 1000);
		}
		
	}

	function checkAnswer () {
		clearInterval(timer);

		if($(this).text() === trivia[current].answer){
			stats.correct++;
			$('#question').text('Correct!')
			$('#choices').html('<div class="result">The correct answer was: <span class="answer">' + trivia[current].answer + '</span></div>');
		}else{
			$('#question').text('Wrong!!')
			$('#choices').html('<div class="result">The correct answer was: <span class="answer">' + trivia[current].answer +'</span></div>');
			stats.incorrect++;
		}

		setTimeout(loadQuestion, 3000);
	}
	

	$('#remaining').hide();

	$('#start').click(() => {
		current = -1;
		stats = {
			correct: 0,
			incorrect: 0,
			unanswered: 0,
		}

		randomize();

		$('#start').hide();
		
		$('#remaining').show();

		loadQuestion();
		
	});

	$(document).on( 'click' ,'.choice', checkAnswer);
});
