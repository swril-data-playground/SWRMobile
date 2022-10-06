import { BackButton } from "components/BackButton"
import { SWRText } from "components/SWRText"
import { useState } from "react"
import { Image, StyleSheet, View } from "react-native"
import { gs } from "styles/globals"
import { SWRButton } from "components/SWRButton"
import { images } from "assets/images"
import { DocumentResult, getDocumentAsync}  from 'expo-document-picker';
import { ImageInfo, launchImageLibraryAsync, requestMediaLibraryPermissionsAsync}  from 'expo-image-picker';
import { uploadFile, uploadImage } from "data/files"
import { Processing } from "./Processing"

export const UploadScreen = () => {
	const [file, setFile] = useState<DocumentResult|null>(null)
	const [image, setImage] = useState<ImageInfo|null>(null)
	const [processing, setProcessing] = useState(false)
	const selectFile = async () => {
		const selectedFile = await getDocumentAsync({})
		if (selectedFile.type !== 'cancel') {
			setImage(null)
			setFile(selectedFile)
		}
	}
	const selectImage = async () => {
		const res = await requestMediaLibraryPermissionsAsync()
		if (res.granted) {
			const selectedImage = await launchImageLibraryAsync()
			if (!selectedImage.cancelled) {
				setFile(null)
				setImage(selectedImage)
			}
		} 
	}
	const clearFiles = () => {
		setFile(null)
		setImage(null)
	}
	const fileSelected = file !== null || image !==null
	const upload = async () => {
		let status;
		if (file !== null) {
			const { status: fileStatus } = await uploadFile(file)
			status = fileStatus;
		} else if (image !== null) {
			const { status: imageStatus } = await uploadImage(image)
			status = imageStatus;
		} else return;
		if (status === 200) {
			clearFiles()
		} else {
			console.log('failed')
		}
	}
	return (
		<View style={gs.fullScreen}>
			<BackButton onPressPrefix={clearFiles} leftAlign/>
			<View style={[styles.container, processing?{display:'none'}:null]}>
				<Image source={images.couch_dog} style={styles.couchImage}/>
				<SWRText style={gs.h2}>Upload a file</SWRText>
				<SWRText style={gs.h7}>Supported formats: JPEG, PNG, GIF, MP4, PDF, DOCX, PPT</SWRText>
				<View style={{display: fileSelected?'none':'flex'}} >
					<SWRButton onPress={selectFile} style={styles.selectButton}>
						<SWRText style={gs.h4}>Select File</SWRText>
						<Image style={styles.addIcon} source={images.add}/>
					</SWRButton>
					<SWRButton onPress={selectImage} style={styles.selectButton}>
						<SWRText style={gs.h4}>Select Image</SWRText>
						<Image style={styles.addIcon} source={images.add}/>
					</SWRButton>
				</View>
				<View style={{display: fileSelected?'flex':'none'}} >
					<View style={styles.preview} >
						{image !== null && 
							<Image style={styles.previewImage} source={{uri: image.uri}} />
						}
						<SWRText>{image? image.uri.split('/').slice(-1): file?.type==='cancel' ? '' : file?.name  }</SWRText>
						<SWRButton onPress={clearFiles}>
							<SWRText style={gs.h4}>Remove</SWRText>
						</SWRButton>
					</View>
					<SWRButton onPress={() => setProcessing(true)} style={styles.uploadButton}>
						<SWRText style={gs.h3}>Upload</SWRText>
					</SWRButton>
				</View>
			</View>
			{processing && <>
				<Processing process={upload} done={() => setProcessing(false)} />
			</>}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: 20
	},
	selectButton: {
		width: '100%',
		marginVertical: 10
	},
	couchImage: {
		width: 300,
		height: 180,
		marginLeft: 60
	},
	addIcon: {
		marginLeft: 20,
		height: 40,
		width: 40
	},
	preview: {
		alignItems: 'center',
		justifyContent: 'center',
		marginVertical: 10
	},
	previewImage: {
		height: 200,
		width: 200,
		resizeMode: 'contain',
		marginVertical: 20
	},
	uploadButton: {
		marginTop: 10
	}
})