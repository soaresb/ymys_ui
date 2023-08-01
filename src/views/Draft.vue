<template>
    <h1>YMYS Draft {{this.year.year}}</h1>
    <dropdown class="draft-dropdown" :options="years" :selected="this.year.year" :name="this.year.year" v-on:updateOption="onSelectYear" :placeholder="this.year.year" :padding="this.padding"></dropdown>
    <div v-if="this.loading" class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
    <div class="table-responsive">
        <draft-table v-if="!this.loading" :rounds="this.rounds" :order="this.order" />
    </div>
</template>

<script>
// @ is an alias to /src

import DraftTable from "../components/draft/DraftTable.vue";
import Dropdown from '../components/nav/Dropdown.vue'
import _ from 'lodash'

export default {
    name: 'Draft',
    components: {
        DraftTable,
        Dropdown
    },
    created() {

    },
    data() {
        return {
            draftPicks: [],
            rounds: [],
            order: [],
            year: {},
            years: [],
            loading: true,
            padding: 5
        }
    },
    mounted() {
        this.fetchDraft();
        return Promise.all([
            this.$ymysApi.get(`/seasons`)
        ])
        .then((responses) => {
            const [seasonsResponse] = responses;
            this.years = seasonsResponse.data.results.seasons.map((season) => {
                return { year: season.year, name: season.year };
            });
            this.year = _.last(this.years);
        })
        .catch((error) => {
            console.error(error.response);
        });
    },
    methods: {
        modifyRounds(rounds) {
            const r = [];
            _.forIn(rounds, (round, roundNum) => {
                if (roundNum % 2 === 0) {
                    r.push(_.reverse(_.sortBy(round, "pick")));
                } else {
                    r.push(_.sortBy(round, "pick"));
                }
            })
            this.rounds = r;
            this.order = r[0].map((pick) => pick.team.name);
            this.loading = false;
        },

        fetchDraft(year) {
            const params = {};
            params.year = year || this.year.year;
            return Promise.all([
                this.$ymysApi.get(`/league/draft`, { params }),
            ])
            .then((responses) => {
                const [draftResponse] = responses;
                this.draftPicks = draftResponse.data.results;
                const rounds = _.groupBy(this.draftPicks, "round");
                this.modifyRounds(rounds);
            })
            .catch((error) => {
                console.error(error.response);
            });
        },

        onSelectYear(payload) {
            this.loading = true;
            const { year }  = payload;
            this.year = {
                year,
                name: year
            };
            this.fetchDraft(year);
        },
    }
}
</script>

<style>

    .draft-dropdown {
        border: 1px solid white;
        display: inline-block !important;
        
    }

</style>
