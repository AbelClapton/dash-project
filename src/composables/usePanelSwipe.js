import { ref } from 'vue'
import { useSwipe, useInterval } from '@vueuse/core'

export function usePanelSwipe(panel, breakpoints, direction) {
	const currentBreakpoint = ref(0)
	const offsetY = ref(0)

	const { counter, resume, pause } = useInterval(10, {
		controls: true,
		immediate: false,
	})

	const {
		isSwiping,
		direction: swipeDirection,
		lengthY,
	} = useSwipe(panel, {
		passive: false,
		onSwipeStart() {
			counter.value = 0
			resume()
		},
		onSwipe() {
			const newTop = (offsetY.value = lengthY.value)
			top.value = newTop > 0 ? newTop : 0
		},
		onSwipeEnd() {
			pause()
			if (counter.value < 50)
				if (swipeDirection === direction) nextBreakpoint()
				else previousBreakpoint()
			else resizeToBreakpoint()
		},
	})

	// TODO: include directions
	const resizeToBreakpoint = () => {
		for (let i = 0; i < breakpoints.length; i++) return
	}

	const nextBreakpoint = () => {
		currentBreakpoint.value++
	}

	const previousBreakpoint = () => {
		currentBreakpoint.value--
	}

	return {
		isSwiping,
		nextBreakpoint,
		previousBreakpoint,
	}
}
