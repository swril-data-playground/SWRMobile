export interface SignUpData {
	type: 'Human'|'Org'
	name: string
	firstName: string
	lastName: string
	password: string
	password2: string
	publicaddr : string 
}

export const defaultSignUpData: SignUpData = {
	type: 'Human',
	name: '',
	firstName: '',
	lastName: '',
	password: '',
	password2: '',
	publicaddr : ''

}

export type setSignUpData = (newData: SignUpData) => void 

export type step = () => void
