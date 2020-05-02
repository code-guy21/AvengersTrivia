$(document).ready(() => {

	let timer;
	let time_rem = 10;
	let current = 0;

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
			console.log('time is up')
			clearInterval(timer);
		}else{
			$('#time').text(time_rem);
		}
	}

	function checkAnswer () {
		console.log($(this).text())
	}
	
	const displayQuestion =() => {
		$('#question').text(trivia[current].question)
		trivia[current].choices.forEach((choice) => {
			$('#choices').append('<button class="choice">' + choice + '</button>')
		})
	}

	$('#remaining').hide();
	randomize();

	$('#start').click(() => {
		$('#start').hide();
		$('#remaining').show();

		timer = setInterval(checkTime, 1000);

		displayQuestion();
	});

	$(document).on( 'load' ,'.choice', checkAnswer);
});
