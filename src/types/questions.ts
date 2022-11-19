export const questionTypes = ['Open-ended', 'Multiple choice', 'Date', 'Select', 'Unit', 'SmallInt'] as const
export type typeOfQuestion = typeof questionTypes[number]

export interface QuestionType {
	id?: string
	prompt: string
	type?: typeOfQuestion
	choices?: string[]
	optional?: boolean
}

export const defaultQuestion:QuestionType = {
	prompt: '',
	choices: [],
}	

export type AnswerType = string

export const defaultAnswer: AnswerType = ''