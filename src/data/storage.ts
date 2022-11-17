import AsyncStorage from '@react-native-async-storage/async-storage'

export class Storage {
	static async get(key: string): Promise<string|null> {
		return await AsyncStorage.getItem(key)
	}
	static async set(key: string, value: string): Promise<void> {
		await AsyncStorage.setItem(key, value)
	}
	static async remove(key: string): Promise<void> {
		await AsyncStorage.removeItem(key)
	}
	static async clear(): Promise<void> {
		await AsyncStorage.clear()
	}
	static async getJson<T>(key: string): Promise<T|null> {
		const value = await AsyncStorage.getItem(key)
		return value ? JSON.parse(value) as T : null
	}
	static async setJson(key: string, value: any): Promise<void> {
		await AsyncStorage.setItem(key, JSON.stringify(value))
	}
}