import * as Location from 'expo-location';

export const locationRequest = async () => {
	try {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== 'granted') {
			console.error('Permission to access location was denied');
			return;
		}

      	let location = await Location.getCurrentPositionAsync({});
		console.log(location)
	} catch (e) {
		console.error(e)
	}
}