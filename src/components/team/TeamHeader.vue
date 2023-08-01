<template>
    <div class="row player-header">
        <div class="col-6 my-auto">
          
            <h3>{{this.team.name}} ({{this.wins}}-{{this.losses}})</h3>
          
          
        </div>
        <div class="col-6">
            <team-header-career-standings :standings="this.standings" />
        </div>
    </div>
</template>

<script>

import TeamHeaderCareerStandings from './TeamHeaderCareerStandings.vue'
import _ from 'lodash'

export default {
    name: 'TeamHeader',
    components: {
      TeamHeaderCareerStandings
    },
    props: {
        team: {},
    },
    data(){
      return {
        standings: {},
        wins: "",
        losses: ""
      }
    },
    mounted() {
      this.getCareerStandings();
    },
    methods: {
      methodToRunOnSelect(payload) {
        this.object = payload;
      },
      getCareerStandings() {
        return Promise.all([
            this.$ymysApi.get(`league/career-standings?teamId=${this.$route.params.teamId}`),
        ]).then((responses) => {
            const [careerStandingsResponse] = responses;
            const { standing } = _.head(careerStandingsResponse.data.results);
            this.wins = standing.wins;
            this.losses = standing.losses;
            this.standings = _.omit(standing, ['wins', 'losses']);;
        });
      }
    }
    
        
}

</script>

<style>
    
</style>