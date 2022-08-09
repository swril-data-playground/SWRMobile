interface OrgType {
	name: string
	members: number[]
}

const defaultOrg: OrgType = {
	name: '',
	members: [],
}

export { defaultOrg }
export type { OrgType }
