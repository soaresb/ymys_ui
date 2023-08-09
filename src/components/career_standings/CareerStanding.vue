<template>
    <div class="card career-standing-card">
        <img src="" class="card-img-top" alt="">
        <div class="card-body">
            <h5 class="card-title">{{this.standing.team.name}} ({{this.standing.standing.wins}}-{{this.standing.standing.losses}})</h5>
            <div class="container">
                <div class="row">
                    <div class="col-5">
                        <list-with-heading :list="this.standingList" :heading="'Yearly Standings'" />
                    </div>
                    <div class="col-2">
                        <img alt="Vue logo" :src="this.standing.team.logo_url" style="width: 100%">
                    </div>
                    <div class="col-5">
                        <career-standing-superlatives :team="this.standing.team"/>
                    </div>
                    <!-- <a href="#" class="btn btn-primary">Go somewhere</a> -->
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import ListWithHeading from '../common/ListWithHeading.vue'
import _ from "lodash"
import CareerStandingSuperlatives from './CareerStandingSuperlatives.vue'



export default {
    name: 'CareerStanding',
    components: {
        ListWithHeading,
        CareerStandingSuperlatives
    },
    props: {
        standing: {}
    },
    data(){
        return {
            standingList: []
        }
    },
    mounted() {
        this.prepareStandingList();
    },
    methods: {
        prepareStandingList() {
            const l = [];
            _.forOwn(this.standing.standing, (standing, year) => {
                if (_.isObject(standing)) {
                    l.push(`${year}: ${standing.wins}-${standing.losses}`)
                }
            })
            this.standingList = l;
        }
    }
    
        
}

</script>

<style>

.card {
    margin-bottom: 20px;
}

.career-standing-card {
    background-color: #2c3749 !important;
    color: white !important;
}


</style>