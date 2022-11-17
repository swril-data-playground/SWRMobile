export const questionTypes = ['Open-ended', 'Multiple choice', 'Demographic', 'Date', 'Select'] as const
export type typeOfQuestion = typeof questionTypes[number]

export interface QuestionType {
	id?: string
	prompt: string
	type?: typeOfQuestion
	choices?: string[]
	optional?: boolean
}

export const defaultQuestion:QuestionType = {
	prompt: ''
}	

export type AnswerType = string

export const defaultAnswer: AnswerType = ''