import { ProgramType } from "./programs";
import { SurveyType } from "./surveys";

export type CreationType = {
	// type: "Poll", data: PollType
} | {
	type: "Survey", data: SurveyType
}| {
	type: "Program", data: ProgramType
}