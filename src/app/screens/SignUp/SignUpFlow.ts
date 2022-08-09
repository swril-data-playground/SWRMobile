export interface SignUpData {
	type: 'Human'|'Org'
	name: string
	firstName: string
	lastName: string
	password: string
	password2: string
}

export const defaultSignUpData: SignUpData = {
	type: 'Human',
	name: '',
	firstName: '',
	lastName: '',
	password: '',
	password2: ''
}

export type setSignUpData = (newData: SignUpData) => void 

export type step = () => void
