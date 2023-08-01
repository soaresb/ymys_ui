<template>
	<div class="container">
		<navbar :teams="this.teams" />
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
            teams: [],
            leagueInfo: {}
        }
    },
    props: {
        player: {}
    },
    mounted() {
        return Promise.all([
            this.$ymysApi.get("/teams"),
        ]).then((responses) => {
            const [teamsResponse] = responses;
            this.teams = teamsResponse.data.results.map((team) => {
                return { ...team, value: team.name,  href: `/team/${team.espn_team_id}`};
            });
        })
        .catch((error) => {
            console.error(error.response);
        });
        
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

.table {
    white-space: nowrap !important;
}

.table th {
    padding: 0 5px !important;
}
</style>
