import { ApolloClient, InMemoryCache } from '@apollo/client';


export const client = new ApolloClient({
	uri: 'https://london-catalog-thanksgiving-retrieved.trycloudflare.com/query',
	cache: new InMemoryCache()
});