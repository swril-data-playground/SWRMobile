import { ApolloClient, InMemoryCache } from '@apollo/client';


export const client = new ApolloClient({
	uri: 'https://coat-whale-tie-allocated.trycloudflare.com/query',
	cache: new InMemoryCache()
});