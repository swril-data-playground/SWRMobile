import { AccountType } from "types/account";
import { defaultAvatar } from "types/avatar";
import { defaultProgram, ProgramType } from "types/programs";
import { defaultSurvey, SurveyType } from "types/surveys";
import { mediumLorem } from "./lorem";

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
	]
}

export const examplePrograms:ProgramType[] = [
	{
		...defaultProgram,
		name: 'Exploring Bauhaus',
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
		name: 'Intro to Chemistry',
		caption: 'At a school near you',
		description: mediumLorem,
		location: 'Kitchener',
		date: '2022-09-21',
		startTime: '11:15',
		endTime: '13:00',
		image: 'https://picsum.photos/300/200'
	},
	{
		...defaultProgram,
		name: 'Plant Vegetables in Elmira',
		caption: 'Sign up now',
		description: mediumLorem,
		category: 'Gardening',
		location: 'Cambridge',
		date: '2022-09-28',
		startTime: '10:00',
		endTime: '11:30',
		repeat: 'Reurring Every Sunday & Tuesday',
		image: 'https://picsum.photos/300/200'
	},
]

export const exampleSurveys:SurveyType[] = [
	{
		name: 'What is your favourite park equipment?',
		description: mediumLorem,
		creator: 'Child & Your Planning Table',
		image: 'https://picsum.photos/300/200',
		questions: [
			{
				prompt: 'Which park equipment is your favourite?',
				type: 'Multiple choice',
				optional: false,
				choices: ['Slide', 'Swing', 'Monkey Bars', 'Other']
			},
			{
				prompt: 'What is best day to go to the park?',
				type: 'Multiple choice',
				optional: false,
				choices: ['Friday', 'Saturday', 'Sunday', 'Other']
			},
			{
				prompt: 'What is your date of birth?',
				type: 'Date',
				optional: false,
			},
		],
	},
	{
		name: 'What inspires you?',
		description: mediumLorem,
		creator: 'SWRIL',
		image: 'https://picsum.photos/300/200',
		questions: [
			{
				prompt: 'Wich season is the most inspiring?',
				type: 'Multiple choice',
				optional: false,
				choices: ['Spring', 'Summer', 'Fall', 'Winter']
			},
			{
				prompt: 'What colour is the most inspiring?',
				type: 'Multiple choice',
				optional: false,
				choices: ['Blue', 'Green', 'Pink', 'Yellow']
			},
			{
				prompt: 'Does being at the beach make you feel inspired?',
				type: 'Multiple choice',
				optional: false,
				choices: ['Yes', 'No']
			},
		],
	},
	{
		name: 'Nullam bibendum',
		description: mediumLorem,
		creator: 'Lorem Ipsum',
		image: 'https://picsum.photos/300/200',
		questions: [{
			prompt: 'Extra words extra words',
			type: 'Open-ended',
			optional: false,
		},
		{
			prompt: 'Extra words extra words, reallyreallylongword',
			type: 'Open-ended',
			optional: false,
		},],
	},
]