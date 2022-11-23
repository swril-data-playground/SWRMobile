export interface ContactData {
	email: string
    message: string
}

export const defaultContactData: ContactData = {
    email: '',
    message: ''
}

export type setContactData = (newData: ContactData) => void 
