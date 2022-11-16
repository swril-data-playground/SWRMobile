import { ProgramType } from "./programs";
import { SurveyType } from "./surveys";
import { QuestionType } from "./questions";

export type CreationType = {
	type: "Survey", data: SurveyType
} | {
	type: "Program", data: ProgramType
}

export interface progScheme{
	name:string
	version:string
	attributes:{
		actionType:string
		description:string
		category:string
		municipality:string
		address:string
		questions:QuestionType[]
	}
}

export interface surveySchema{
	name:string
	version:string
	attributes:{
		actionType:string
		description:string
		category?:string
		questions:QuestionType[]
	}
}