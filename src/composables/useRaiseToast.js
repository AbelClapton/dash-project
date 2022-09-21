import { useToastsStore } from '@/stores/toasts.js'

export default function useRaiseToast() {
	const toastsStore = useToastsStore()

	const success = (message, title = 'Operación exitosa') => {
		toastsStore.addToast({
			title,
			message,
			type: 'success',
		})
	}

	const info = (message, title = 'Atención') => {
		toastsStore.addToast({
			title,
			message,
			type: 'info',
		})
	}

	const error = (message, title = 'Ocurrió un error') => {
		toastsStore.addToast({
			title,
			message,
			type: 'info',
		})
	}

	return { success, info, error }
}
