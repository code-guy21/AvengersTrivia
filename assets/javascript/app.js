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

$(document).ready(() => {
	$('#start').click(() => {
		$('#start').css('display', 'none');

		randomize();
	});
});
