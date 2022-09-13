import { useToastsStore } from '@/data/toasts.js'

const toastsStore = useToastsStore()

export default function useRaiseToast() {
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
