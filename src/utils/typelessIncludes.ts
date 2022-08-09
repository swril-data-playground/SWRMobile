export const listIncludes = (list: any[] | readonly any[] , item: any): boolean => {
	for (let i=0; i< list.length; i++) {
		if (item == list[i]) return true
	}
	return false
}