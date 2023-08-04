<template>
    <h6>Superlatives</h6>
    <div class="career-standing-superlatives-container">
        <li v-for="(superlatives, year) in this.superlatives" v-bind:key="superlatives.id" class="career-standing-superlatives-li">
            <span><h7>{{year}}</h7></span>
            <div v-for="superlative in superlatives" v-bind:key="superlative.id">

                <img alt="Vue logo" :src="'https://ymys.s3.us-east-2.amazonaws.com/images/icons/' + superlative.image" style="width: 40px"> {{superlative.superlative_name}} <span v-if="superlative.value">- {{superlative.value}}</span>
            </div>
            <br />
        </li>
    </div>
    
</template>

<script>
import _ from "lodash"

export default {
    name: 'CareerStandingSuperlatives',
    components: {
      
    },
    props: {
        team: {}
    },
    data(){
        return {
            superlatives: []
        }
        
    },
    mounted() {
        const params = {};
        params.teamId = this.team.espn_team_id;
        return Promise.all([
            this.$ymysApi.get("team/superlatives", { params }),
        ]).then((responses) => {
            const [superlativesResponse] = responses;
            const superlatives = superlativesResponse.data.results;
            this.superlatives = _.groupBy(superlatives, "year");
        });
    },
    methods: {
        
    }
    
        
}

</script>

<style>

.career-standing-superlatives-li {
    list-style: none;
}

.career-standing-superlatives-container {
    max-height: 300px;
    overflow-y: auto
}

</style>