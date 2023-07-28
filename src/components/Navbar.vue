<template>
<div class="row">
    <nav class="navbar navbar-expand-lg" style="background-color: #444444; color: #EDEDED">
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li class="nav-item dropdown">
                        <a @click="toggleTeams()" class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Teams
                        </a>
                        <div class="initial" :class="{'dropdown-menu' : teamsIsActive}" aria-labelledby="navbarDropdown">
                            <div v-for="team in this.teams" v-bind:key="team._id">
                                <a class="dropdown-item" :href="team.url">{{team.name}}</a>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/draft">Draft History</a>
                    </li>
                    <dropdown :options="this.options" :name="'Power Rankings'"/>
                </ul>
            </div>
        </div>
    </nav>
</div>
</template>

<script>

import _ from 'lodash';
import Dropdown from '../components/nav/Dropdown.vue'

export default {
    name: 'Navbar',
    components: {
        Dropdown
    },
    props: {
        
    },
    data(){
        return {
            teams: [],
            teamsIsActive: false,
            league: {},
            years: [],
            weeks: [],
            options: [
                {"name": "test", "value": "test", "href": "https://www.google.com", children: []}
            ],
            options_name: "Test",
            leagueInfo: {}
        }
    },
    mounted() {
        return Promise.all([
            this.$ymysApi.get("/teams"),
            this.$ymysApi.get("/league/info"),
        ]).then((responses) => {
            const [teamsResponse, leagueResponse] = responses;
            this.teams = teamsResponse.data.results.map((team) => {
                return { ...team, url: `/team/${team.espn_team_id}`};
            });
            this.leagueInfo = leagueResponse.data.results;
            return this.setPowerRankingOptions();
            })
        .catch((error) => {
            console.error(error.response);
        });
    },
    methods: {
        toggleTeams() {
            this.teamsIsActive = !this.teamsIsActive;
        },

        setPowerRankingOptions() {
            const options = []
            const years = _.groupBy(this.leagueInfo.powerRankings, "year");
            console.log(years);
            _.forOwn(years, (weeks, year) => {
                
                const option = { children: [], href: `/power-rankings/${year}/1`, name: year, year };
                weeks.forEach((week) => {
                    console.log(week.week)
                    option.children.push({ week, name: week.week, href: `/power-rankings/${year}/${week.week}` })
                })
                options.push(option);
            })
            // this.years.forEach((year) => {
            //     year.children = []
            //     year.href = `/power-rankings/${year.name}/1`
            //     year.weeks.forEach((week) => {
            //         year.children.push({ week, name: week, href: `/power-rankings/${year.name}/${week}` })
            //     })
            //     options.push(year);
            // });
            this.options = options;
        }
    }
    
        
}

</script>

<style>
    .initial {
        display: none;
    }

    /* .dropdown-menu {
        display: block !important;
    } */

    .dropdown-toggle {
        background-image: none !important;
        min-width: auto !important;
    }

    .caret {
        display: none !important
    }
    
    
</style>