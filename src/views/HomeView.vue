<template>
  <div class="home">
    <div class="row">
        <div class="col-12 col-md-4 border">
          <score-board :matchups="this.matchups" />
        </div>
        <div class="col-12 col-md-4 border">
          <h2>YMYS FF</h2>
          <img alt="Vue logo" src="../assets/logo.jpg" style="width: 100%">
        </div>
        <div class="col-12 col-md-4 border">
          <home-standings :standings="this.standings"/>
        </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HomeRankings from '../components/home/HomeRankings.vue';
import ScoreBoard from '../components/home/ScoreBoard.vue';
import HomeStandings from '../components/home/HomeStandings.vue';


export default {
  name: 'HomeView',
  components: {
      HomeRankings,
      ScoreBoard,
      HomeStandings
  },
  created() {

  },
  data() {
      return {
          standings: [],
          matchups: [],
          seasons: [],
      }
  },
  mounted() {
    return Promise.all([
      this.$ymysApi.get("/league/division/standings"),
      this.$ymysApi.get("/league/matchups")
    ])
    .then((responses) => {
      const [standingsResponse, matchupResponse] = responses;
      this.matchups = matchupResponse.data.results;
      this.standings = standingsResponse.data.results;
    })
    .catch((error) => {
      console.error(error.response);
    });
  }
}
</script>
