<template>
    <div class="homerankings">
        <div v-for="division in standings" v-bind:key="division.id" class="homestandings-division">
            <div class="table-responsive">
                <table class="table table-scroll table-striped table-dark">
                    <thead>
                        <th class="homestandings-header">Rank</th>
                        <th class="homestandings-header">Team</th>
                        <th class="homestandings-header">W</th>
                        <th class="homestandings-header">L</th>
                        <th class="homestandings-header">T</th>
                        <th class="homestandings-header">Points</th>
                    </thead>
                    <tbody>
                        <home-standing-row v-for="team in division" v-bind:key="team.id" class="homestandings-team" :team="team" />
                    </tbody> 
                </table>
            
            </div>
        </div>
    </div>
</template>

<script>

import HomeStandingRow from './HomeStandingsRow.vue';


export default {
    name: 'HomeStandings',
    components: {
        HomeStandingRow
    },
    props: {
        standings: []
    },
    data(){
        return {
            
        }
    },
    mounted() {

    },
    methods: {
    
    }
    
        
}

</script>

<style>

    .homestandings-list {
        text-align: left;
    }

    .homestandings-team {
        list-style: initial;
    }

    .homestandings-division {
        border: 1px solid black;
        margin: 10px 0;
    }

    .homestandings-header {
        overflow: auto;
        max-width: 100px;   
    }

</style>