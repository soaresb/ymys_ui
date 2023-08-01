<template>
    <div class="table-responsive">
        <table class="table table-scroll table-striped table-dark" style="white-space: nowrap;">
            <thead>
                <th class="player-stats-th">Year</th>
                <th class="player-stats-th">Week</th>
                <th class="player-stats-th">NFL Team</th>
                <th class="player-stats-th">YMYS Team</th>
                <th class="player-stats-th">Slot</th>
                <th class="player-stats-th" v-if="this.player.position === 'QB'">C / A</th>
                <th class="player-stats-th" v-if="this.player.position === 'QB'">YDS</th>
                <th class="player-stats-th" v-if="this.player.position === 'QB'">TD</th>
                <th class="player-stats-th" v-if="this.player.position === 'QB'">INT</th>
                <th class="player-stats-th">Points</th>
            </thead>
            <tbody>
                <player-stat v-for="stat in this.playerStats" v-bind:key="stat.id" :stat="stat" :player="this.player"/>
            </tbody>
            
        </table>
    </div>
</template>

<script>

import PlayerStat from './PlayerStat.vue';

export default {
    name: 'PlayerStats',
    components: {
        PlayerStat
    },
    props: {
        playerStats: [],
        player: {}
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

    .table-scroll {
        overflow-x:auto;
    }

    .player-stats-th {
        padding: 5px;
    }
    
</style>