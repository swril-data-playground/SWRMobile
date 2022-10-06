export interface Toast {
	title: string
	details?: string
	type: 'success' | 'error' | 'warning' | 'info'
}