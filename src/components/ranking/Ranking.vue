<template>
  <h2 class="ranking-header"> Year {{this.year}} Week {{this.week}} Power Rankings</h2>
  <div class="ql-editor ranking-display" v-html="result"></div>
</template>

<script>
import { useRoute } from "vue-router";

// define vue component
export default {
  name: 'Ranking',
  components: {
    
  },
  setup(){
    
  }, 
  data() {
        return {
            year: "",
            week: "",
            result: ""
        }
    },
  mounted() {
    const route = useRoute();
    this.year = route.params.year;
    this.week = route.params.week;
    return Promise.all([
          this.$ymysApi.get("/league/power-ranking", { params: { week: this.week, year: this.year } })
      ]).then((responses) => {
          const [rankingResponse] = responses;
          this.result = rankingResponse.data.results.body;
      }).catch((err) => {
          console.log(err);
      })
  },
  methods: {
    
  }
}
</script>

<style>
    .ranking-display {
      margin: 30px auto;
      max-width: 1000px;
    }
    .ranking-header {
      margin-top: 30px
    }
</style>