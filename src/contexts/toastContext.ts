import { createContext } from 'react'
import { Toast } from 'types/toast'

export type ToastContextType = {
	activeToasts: Toast[]
	toasts: Toast[]
}
export const defaultToastValue: ToastContextType = {
	activeToasts: [],
	toasts: [],
}

export const ToastContext = createContext<{
	content: ToastContextType; 
	pushToast: (toast: Toast) => void 
}>({
	content: defaultToastValue,
	pushToast: (toast: Toast) => {}
})