export interface LoginData {
	type: 'Human'|'Org'
    keyPhrase: string
	walletID: string
	password: string
}

export const defaultLoginData: LoginData = {
	type: 'Human',
    keyPhrase: '',
	walletID: '',
	password: ''
}

export type setLoginData = (newData: LoginData) => void 

export type step = () => void
