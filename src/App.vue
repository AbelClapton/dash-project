<template>
		<!-- <div v-if="authStore.user">
			<TheNavbar />
		</div>
		<LoginView v-else /> -->
		<TheNavbar />
	<div class="p-4">
		<router-view></router-view>
	</div>
</template>

<script setup>
// import { authStore } from '@/stores/auth.js'
// import { supabase } from '@/helpers/supabase.js'
// import LoginView from '@/views/LoginView.vue'
import TheNavbar from '@/components/TheNavbar.vue'

// authStore.user = supabase.auth.user()
// supabase.auth.onAuthStateChange((_, session) => (authStore.user = session.user))
</script>
