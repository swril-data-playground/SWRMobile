import { AccountType } from "types/account";
import { defaultAvatar } from "types/avatar";
import { PollType } from "types/polls";
import { defaultProgram, ProgramType } from "types/programs";
import { defaultSurvey, SurveyType } from "types/surveys";

export const mediumLorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla suscipit arcu sed efficitur pharetra. Aenean pretium blandit dictum. Nullam nulla,vulputate tempor augue.'


export const examplePrograms:ProgramType[] = [
	{
		...defaultProgram,
		title: 'Exploring Bauhaus',
		caption: 'Learn new things',
		description: mediumLorem,
		category: 'Gardening',
		date: '2022-09-14',
		startTime: '14:00',
		endTime: '16:00',
		image: 'https://picsum.photos/300/200'
	},
	{
		...defaultProgram,
		title: 'Intro to Chemistry',
		caption: 'At a school near you',
		description: mediumLorem,
		municipality: 'Kitchener',
		date: '2022-09-21',
		startTime: '11:15',
		endTime: '13:00',
		image: 'https://picsum.photos/300/200'
	},
	{
		...defaultProgram,
		title: 'Plant Vegetables in Elmira',
		caption: 'Sign up now',
		description: mediumLorem,
		category: 'Gardening',
		municipality: 'Cambridge',
		date: '2022-09-28',
		startTime: '10:00',
		endTime: '11:30',
		repeat: 'Reurring Every Sunday & Tuesday',
		image: 'https://picsum.photos/300/200'
	},
]

export const exampleSurveys:SurveyType[] = [
	{
		title: 'What is your favourite park equipment?',
		description: mediumLorem,
		creator: 'Child & Your Planning Table',
		image: 'https://picsum.photos/300/200',
		questions: [
			{
				id: '11',
				prompt: 'Which park equipment is your favourite?',
				type: 'Multiple choice',
				choices: ['Slide', 'Swing', 'Monkey Bars', 'Other']
			},
			{
				id: '2',
				prompt: 'What is best day to go to the park?',
				type: 'Multiple choice',
				choices: ['Friday', 'Saturday', 'Sunday', 'Other']
			},
			{
				id: '3',
				prompt: 'What is your date of birth?',
				type: 'Date',
			},
		],
	},
	{
		title: 'What inspires you?',
		description: mediumLorem,
		creator: 'SWRIL',
		image: 'https://picsum.photos/300/200',
		questions: [
			{
				id: '4',
				prompt: 'Wich season is the most inspiring?',
				type: 'Multiple choice',
				choices: ['Spring', 'Summer', 'Fall', 'Winter']
			},
			{
				id: '5',
				prompt: 'What colour is the most inspiring?',
				type: 'Multiple choice',
				choices: ['Blue', 'Green', 'Pink', 'Yellow']
			},
			{
				id: '6',
				prompt: 'Does being at the beach make you feel inspired?',
				type: 'Multiple choice',
				choices: ['Yes', 'No']
			},
		],
	},
	{
		title: 'Nullam bibendum',
		description: mediumLorem,
		creator: 'Lorem Ipsum',
		image: 'https://picsum.photos/300/200',
		questions: [{
			id: '7',
			prompt: 'Extra words extra words',
			type: 'Open-ended',
		},
		{
			id: '8',
			prompt: 'Extra words extra words, reallyreallylongword',
			type: 'Open-ended',
		},],
	},
]

export const examplePolls:PollType[] = [
	{
		title: 'What is your favourite park equipment?',
		description: mediumLorem,
		creator: 'Child & Your Planning Table',
		image: 'https://picsum.photos/300/200',
		questions: [
			{
				id: '11',
				prompt: 'Which park equipment is your favourite?',
				choices: ['Slide', 'Swing', 'Monkey Bars', 'Other']
			},
			{
				id: '2',
				prompt: 'What is best day to go to the park?',
				choices: ['Friday', 'Saturday', 'Sunday', 'Other']
			},
			{
				id: '9',
				prompt: 'What is your favourite primary colour?',
				choices: ['Red', 'Blue', 'Yelow']
			},
			{
				id: '8',
				prompt: 'What is your favourite secondary colour?',
				choices: ['Green', 'Purple', 'Orange']
			},
		],
	},
	{
		title: 'What inspires you?',
		description: mediumLorem,
		creator: 'SWRIL',
		image: 'https://picsum.photos/300/200',
		questions: [
			{
				id: '4',
				prompt: 'Wich season is the most inspiring?',
				choices: ['Spring', 'Summer', 'Fall', 'Winter']
			},
			{
				id: '5',
				prompt: 'What colour is the most inspiring?',
				choices: ['Blue', 'Green', 'Pink', 'Yellow']
			},
			{
				id: '6',
				prompt: 'Does being at the beach make you feel inspired?',
				choices: ['Yes', 'No']
			},
		],
	},
	{
		title: 'Nullam bibendum',
		description: mediumLorem,
		creator: 'Lorem Ipsum',
		image: 'https://picsum.photos/300/200',
		questions: [{
			id: '7',
			prompt: 'Extra words extra words',
			choices: ['1', '2', '3', '4', '5']
		},
		{
			id: '8',
			prompt: 'Extra words extra words, reallyreallylongword',
			choices: ['1', '2', '3', '4', '5']
		},],
	},
]

export const exampleAccount:AccountType = {
	firstName: 'Jonathan',
	lastName: 'Lateef',
	avatar: defaultAvatar,
	walletId: '4252-427e-af7d-3dcaaf2db2df',
	keyPhrase: 'One two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen',
	householdMembers: [
		{firstName: 'Miriam', lastName: 'Lateef', avatar: defaultAvatar},
		{firstName: 'Zainab', lastName: 'Lateef', avatar: defaultAvatar},
		{firstName: 'Seth', lastName: 'Lateef', avatar: defaultAvatar},
	],
	creations: {
		programs: [...examplePrograms],
		surveys: [...exampleSurveys],
	}
}
