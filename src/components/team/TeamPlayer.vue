<template>
    <tr>
        <td class="team-player-center-text-td">
            <div class="team-player-slot-position-container">
                <div :class="this.getPosition()">{{this.player.slot_position}}</div>
                
            </div>
            
        </td>
        <td class="team-player-center-text-td">
            <img v-if="this.player.slot_position === 'D/ST'" width="50">
                <img v-else :src="'https://a.espncdn.com/combiner/i?img=/i/headshots/nfl/players/full/' + this.player.espn_id + '.png&w=350&h=254'" width="50">
        </td>
        <td class="team-player-center-text-td">
            <a class="team-player-center-text" :href="'/player/' + this.player.espn_id">{{this.player.name}}</a>
        </td>
        <td class="team-player-center-text-td">
            {{this.player.pro_team}}
        </td>
        <td class="team-player-center-text-td">
            {{this.player.pro_opponent}}
        </td>
        <td class="team-player-center-text-td">
            {{this.player.projected_points}}
        </td>
        <td class="team-player-center-text-td">
            {{this.player.points}}
        </td>
        
    </tr>
</template>

<script>



export default {
    name: 'TeamPlayer',
    components: {
      
    },
    props: {
        player: {}
    },
    data(){
        
    },
    mounted() {

    },
    methods: {
        getPosition () {
            var _class = "";
            switch(this.player.slot_position) {
                case "QB":
                    _class = "team-player-slot-position-qb";
                    break
                case "RB":
                    _class = "team-player-slot-position-rb";
                    break
                case "WR":
                    _class = "team-player-slot-position-wr";
                    break
                case "TE":
                    _class = "team-player-slot-position-te";
                    break
                case "RB/WR/TE":
                    _class = "team-player-slot-position-flex";
                    break
                case "K":
                    _class = "team-player-slot-position-k";
                    break;
                case "D/ST":
                    _class = "team-player-slot-position-dst";
                    break;
                case "DP":
                    _class = "team-player-slot-position-dp";
                    break;
                case "BE":
                    _class = "team-player-slot-position-be";
                    break;
                default:
                    _class = "team-player-slot-position-bench";
                    break;
            }
            return _class;
        }
    
    }
    
        
}

</script>

<style>
    .team-player-center-text {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .team-player-center-text-container {
        display: grid;
    }

    .team-player-center-text-td {
        vertical-align: middle;
    }

    .team-player-slot-position-container {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            border-radius: 8px;
            justify-content: center;
            width: 42px;
            height: 34px;
            margin: auto;
            color: #444;
            background: #2c3749;
    }

    .team-player-slot-position-qb {
            color: #ff2a6d;
    }

    .team-player-slot-position-rb {
            color: #00ceb8;
    }

    .team-player-slot-position-wr {
            color: #58a7ff;
    }

    .team-player-slot-position-te {
            color: #ffae58;
    }

    .team-player-slot-position-flex {
            color: #ff58f4;
    }

    .team-player-slot-position-k {
            color: #bd66ff
    }

    .team-player-slot-position-dst {
        color: #ffffff;
    }

    .team-player-slot-position-be {
        color: #ffffff
    }

    .team-player-slot-position-dp {
        color: #7988a1
    }
</style>