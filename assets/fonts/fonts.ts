export const fonts = {
	'main': require('./Bai_Jamjuree/BaiJamjuree-Regular.ttf'),
	'medium': require('./Bai_Jamjuree/BaiJamjuree-Medium.ttf'),
	'bold': require('./Bai_Jamjuree/BaiJamjuree-Bold.ttf'),
} as const

export type fontName = keyof typeof fonts
