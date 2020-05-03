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
			img: 'https://fsb.zobj.net/crop.php?r=SHV3V4wPUy5NeW0sLwZuCsYbM7Xr4CXEZ4hE8-eBoFqiLt7Jv7dAxTDg7Yx9y5VUUJvTZ-EHZ06qXbLcDX14tgsZ2hsEoUTeoL2FAp9PaFO0ny53IgAcaM64nldZCh2GNA7Ycaspz2V-8gUE'
		},
		{
			question: 'Captain America\'s shield is made from which metal?',
			choices: ['Adamantium', 'Strontium', 'Barium', 'Vibranium'],
			answer: 'Vibranium',
			img: 'https://wallpapercave.com/wp/wp1887622.jpg'
		},
		{
			question: 'What Type of Doctor is Stephen Strange?',
			choices: ['Neurosurgeon', 'Pediatrician', 'Plastic Surgeon', 'Cardiologist'],
			answer: 'Neurosurgeon',
			img: 'https://filmschoolrejects.com/wp-content/uploads/2018/04/Doctor-Strange-Good-Hands.jpg'
		},
		{
			question: 'What Does May Call Spider-Man\'s Heightened Senses?',
			choices: ['The Tingle', 'Spidey Sense', 'That Special Thing', 'Peter Tingle'],
			answer: 'Peter Tingle',
			img: 'https://i0.wp.com/whatwouldbaledo.com/wp-content/uploads/2018/12/peter-parker-spiderman.jpeg?w=1800&ssl=1'
		},
		{
			question: 'What Is The Name Of Star-Lord\'s Ship?',
			choices: ['Walrus', 'Milano', 'Sovereign', 'Simpson'],
			answer: 'Milano',
			img: 'http://images.fandango.com/images/fandangoblog/Guardians-of-the-Galaxy-Quill-Flying-Milano.jpg.jpg'
		},
		{
			question: 'Who are the shape-shifting aliens in Captain Marvel?',
			choices: ['Titans', 'Kree', 'Skrulls', 'Xandarians'],
			answer: 'Skrulls',
			img: 'https://studentedgeapplication.azureedge.net/articles/b329a9fc-2ab2-44af-a02f-da186796857a.jpg'

		},
		{
			question: 'T\'Challa is the ruler of what nation?',
			choices: ['Kenya', 'Sokovia', 'Wakanda', 'Nigeria'],
			answer: 'Wakanda',
			img: 'https://media.gizmodo.co.uk/wp-content/uploads/2018/03/Screenshot_29.jpg'
		},
		{
			question: 'What radiation turned Bruce Banner into The Hulk?',
			choices: ['Infrared', 'Gamma', 'X-ray', 'Ultraviolet'],
			answer: 'Gamma',
			img: 'https://vignette.wikia.nocookie.net/disney/images/8/8e/Hulk.jpg.jpg/revision/latest?cb=20190616151504'
		},
		{
			question: 'What particles allow Ant-Man to grow and shrink in size?',
			choices: ['Iridium', 'Palladium', 'Uru', 'Pym'],
			answer: 'Pym',
			img: 'https://vignette.wikia.nocookie.net/marvelcinematicuniverse/images/0/03/Pym_Particles.png/revision/latest?cb=20190729033630'
		},
		{
			question: 'Thanos tells Thor, "You should have gone for the ___"?',
			choices: ['Hand', 'Leg', 'Head', 'Chest'],
			answer: 'Head',
			img: 'https://media.vanityfair.com/photos/5ae27183bf895348ccd55338/master/w_2560%2Cc_limit/avengers-death-infinity-war.jpg'

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
			$('#choices').html('<div class="result">The correct answer was: <span class="answer">' + trivia[current].answer+'</span></div>');
			stats.unanswered++;
			setTimeout(loadQuestion, 2000);
		}

		$('#time').text(time_rem);
	}

	const loadQuestion = () => {

		$('img').remove();

		current++;

		if(current === trivia.length){


			$("#question").text('Game Over')

			$("#choices").html(Object.entries(stats).map((stat) => {
				let name = stat[0][0].toUpperCase() + stat[0].slice(1);

				return '<div class="result">' + name + ': ' + stat[1] +'</div>'
			}))

			$('#choices').show();

			$('#start').show();

		}else{

			$('#choices').empty();

			$('#time').text(10);

			$('#question').text(trivia[current].question)

			
			$('#choices').html( trivia[current].choices.map((choice) => {
				return '<button class="choice">' + choice + '</button>'
			}))  

			$('#choices').show();

			time_rem = 10;
			timer = setInterval(checkTime, 1000);
		}
		
	}

	function checkAnswer () {
		clearInterval(timer);

		if($(this).text() === trivia[current].answer){
			stats.correct++;
			$('#question').text('Correct')
			$('#choices').hide();
			$('main').append($('<img src="'+ trivia[current].img+ '">'));
		}else{
			$('#question').text('Wrong')
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
		debugger;
	});

	$(document).on( 'click' ,'.choice', checkAnswer);
});
