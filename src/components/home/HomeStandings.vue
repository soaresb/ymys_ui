<template>
    <div class="homerankings">
        <div v-for="division in standings" v-bind:key="division.id" class="homestandings-division">
            <div>
                <table class="table table-scroll table-striped table-dark">
                    <thead>
                        <th>Rank</th>
                        <th>Team</th>
                        <th>W</th>
                        <th>L</th>
                        <th>T</th>
                        <th>Points</th>
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

</style>