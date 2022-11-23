import { ApolloClient, InMemoryCache, NormalizedCacheObject } from '@apollo/client';


class GraphQL {
	private client: ApolloClient<any>
	private auth: string|null = null

	constructor(client: ApolloClient<NormalizedCacheObject>) {
		this.client = client
	}

	public setAuth(auth: string|null) {
		this.auth = auth
	}
	public async mutate(mutation: any, variables: any) {
		return await this.client.mutate({
			mutation,
			variables : {input : {...variables}},
			context: { 
				"authorization": this.auth,
				headers: { 
					"authorization": this.auth
				} 
			},
		})
	}
	public async query(query: any, variables: any) {
		return await this.client.query({
			query,
			variables,
			context: { 
				"authorization": this.auth,
				headers: { 
					"authorization": this.auth
				} 
			},
		})
	}
}

export const graphql = new GraphQL(new ApolloClient({
	uri: 'https://api.demo.swrdataplayground.ca',
	cache: new InMemoryCache(),
}))