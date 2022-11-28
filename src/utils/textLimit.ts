export const textLimit = (text: string, limit: number): string => {
	if (text.length <= limit) return text
	let newText = text.slice(0, limit)
	return newText
}