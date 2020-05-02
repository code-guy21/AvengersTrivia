$(document).ready(() => {

	let timer;
	let time_rem;
	let current;
	let stats;

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
			answer: '6',
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

				return '<div>' + name + ': ' + stat[1] +'</div>'
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
			$('#question').html('Correct!')
			$('#choices').html('The correct answer was: ' + trivia[current].answer);
		}else{
			$('#question').html('Wrong!!')
			$('#choices').html('The correct answer was: ' + trivia[current].answer);
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
