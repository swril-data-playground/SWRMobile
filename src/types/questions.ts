export const questionTypes = ['Open-ended', 'Multiple choice', 'Demographic', 'Date'] as const
export type typeOfQuestion = typeof questionTypes[number]

export interface QuestionType {
	id: string
	prompt: string
	type: typeOfQuestion
	choices?: string[]
	optional: boolean
}

export type AnswerType = string

export const defaultAnswer: AnswerType = ''