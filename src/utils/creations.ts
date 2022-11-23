import { CreationsType } from "types/account";
import { CreationType } from "types/creation";

export const mapCreationObjectToList = (creations:CreationsType):CreationType[] => {
	const creationList: CreationType[] = []
	creations.programs.forEach(program => creationList.push({
		type: 'Program',
		data: program
	}))
	creations.surveys.forEach(survey => creationList.push({
		type: 'Survey',
		data: survey
	}))
	return creationList
}