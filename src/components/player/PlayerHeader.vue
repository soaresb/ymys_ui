<template>
    <div class="container">
        <div class="row">
            <div class="col-12 col-sm-8">
                <div class="row player-header">
                    <div class="col-3">
                        <img :src="'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/' + this.player.espn_id + '.png&w=350&h=254'" width="150">
                    </div>
                    <div class="col align-self-center player-name">
                        <h3>{{this.player.name}}</h3>
                        <span>{{this.player.position}} - {{this.player.pro_team}}</span> 
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
// @ is an alias to /src


export default {
    name: 'PlayerHeader',
    components: {

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
    .player-header {
        border: 1px solid;
        border-radius: 10px;
        margin-top: 20px !important;
        margin-bottom: 20px !important;
    }
</style>