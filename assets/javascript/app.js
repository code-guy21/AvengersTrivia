$(document).ready(() => {

	let timer;
	let time_rem = 10;
	let current = -1;

	const trivia = [
		{
			question: 'What movie did Thanos first appear in?',
			choices: ['Avengers 2012', 'Iron Man', 'Captain America', 'Thor'],
			answer: 'Avengers 2012',
		},
		{
			question: 'What does S.H.I.E.L.D. stand for?',
			choices: [
				'Strategic Homeland Intervention Enforcement and Logistics Division',
				'Strategic Hazard Intervention Espionage Logistics Directorate',
				'Supreme Headquarters International Espionage Law Enforcement Division',
				'Supreme Hazard Intervention Enforcement and Logistics Division',
			],
			answer:
				'Strategic Homeland Intervention Enforcement and Logistics Division',
		},
		{
			question: 'How many Infinity Stones exist in the MCU?',
			choices: ['6', '8', '5', '4'],
			answer: 6,
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
			$('#question').html('Time is Up!')
			$('#choices').html('The correction answer was: ' + trivia[current].answer);
			setTimeout(loadQuestion, 3000);
		}

		$('#time').text(time_rem);
	}

	const loadQuestion = () => {
		current++;

		if(current === trivia.length){
			console.log('game over!')
			current = -1;
			$('#start').show();
		}else{

			$('#choices').empty();

			time_rem = 10;
			timer = setInterval(checkTime, 1000);
			$('#time').text(10);

			$('#question').text(trivia[current].question)
			trivia[current].choices.forEach((choice) => {
			$('#choices').append('<button class="choice">' + choice + '</button>')})
		}
		
	}

	function checkAnswer () {
		clearInterval(timer);
		$('#question').html('You answered!')
		$('#choices').html('The correct answer was: ' + trivia[current].answer);
		setTimeout(loadQuestion, 3000);
	}
	

	$('#remaining').hide();
	randomize();

	$('#start').click(() => {
		$('#start').hide();
		$('#remaining').show();
		loadQuestion();
	});

	$(document).on( 'click' ,'.choice', checkAnswer);
});
