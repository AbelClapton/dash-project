import { defineStore } from 'pinia'

export const useToastsStore = defineStore({
	id: 'toasts',
	state: () => ({
		toasts: [],
	}),
	actions: {
		addToast(toast) {
			this.toasts.push(toast)
		},
		clearToast(title) {
			const index = this.toasts.findIndex((toast) => toast.title === title)
			this.toasts.splice(index, 1)
		},
	},
})
