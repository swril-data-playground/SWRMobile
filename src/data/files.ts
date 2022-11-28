import { DocumentResult } from "expo-document-picker";
import { ImageInfo } from "expo-image-picker";
import { statusType } from "types/data";

export const uploadFile = async (file: DocumentResult): Promise<{status: statusType}> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return {
		status: 200,
	}
}


export const uploadImage = async (image: ImageInfo): Promise<{status: statusType}> => {
	await new Promise((resolve) => setTimeout(resolve, 5000))
	return {
		status: 200,
	}
}