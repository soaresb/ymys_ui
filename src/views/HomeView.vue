<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <h2>YMYS FF</h2>
        </div>
        <div class="col-12 col-sm-8">
          <div class="row">
              <div class="col-6">
                <div class="card home-card">
                  <img class="card-img-top home-card-img" src="https://ymys.s3.us-east-2.amazonaws.com/images/unai.png" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">Latest Rankings</h5>
                    <!-- <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> -->
                    <a href="#" class="btn btn-light">Go</a>
                  </div>
                </div>
              </div>
              <div class="col-6">
                <div class="card home-card">
                  <img class="card-img-top home-card-img" src="https://ymys.s3.us-east-2.amazonaws.com/images/kyle.png" alt="Card image cap">
                  <div class="card-body">
                    <h5 class="card-title">YMYS History</h5>
                    <!-- <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> -->
                    <a href="#" class="btn btn-light">Go</a>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="col-12 col-sm-4">
          <div class="row">
              <div class="col-12 col-sm-12 border" style="margin-bottom: 20px;">
                <home-standings :standings="this.standings"/>
              </div>
          </div>

        </div>
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

<style>
  
.home {
    margin-top: 20px;
}

.home-card {
    background-color: #2c3749 !important;
    color: white !important;
    min-height: 500px;
}

</style>
