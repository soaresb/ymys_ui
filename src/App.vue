<template>
	<div class="container">
		<navbar />
		<router-view/>
	</div>
  
</template>

<script>

import Navbar from './components/Navbar.vue'

export default {
	name: 'App',
	components: {
		Navbar
	},
	created() {

    },
    data() {
        return {
            
        }
    },
    props: {
        player: {}
    },
    mounted() {
        
    },
    methods: {
		
    }
}
</script>

<style>

@import 'bootstrap';

#app {
	text-align: center;
    color: rgb(237, 237, 237);
    background-color: rgb(23, 23, 23);
    min-height: 100vh
}

.table-dark {
    color: rgb(237, 237, 237);
}
</style>
