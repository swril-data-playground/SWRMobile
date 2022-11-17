import { ApolloClient, InMemoryCache } from '@apollo/client';


export const client = new ApolloClient({
	uri: 'https://flame-bands-skiing-london.trycloudflare.com/query',
	cache: new InMemoryCache()
});