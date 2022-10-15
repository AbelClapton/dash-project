import { defineStore } from 'pinia'
/* import useClient from '@/libraries/supabase' */
/**/
/* const supabase = useClient() */

export const useScheduleStore = defineStore({
	id: 'schedule',
	state: () => ({
		schedule: [],
	}),
	actions: {},
	getters: {},
})
