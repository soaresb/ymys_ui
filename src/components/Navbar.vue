<template>
<div class="row">
    <nav class="navbar sticky-top navbar-expand-md" style="background-color: #444444; color: #EDEDED">
        <a class="navbar-brand" href="/">
            <img src="https://ymys.s3.us-east-2.amazonaws.com/images/unai.png" width="80" alt="">
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="container-fluid">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <dropdown :options="this.teams" :name="'Teams'"/>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/draft">Draft History</a>
                    </li>
                    <dropdown :options="this.options" :name="'Power Rankings'"/>
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="/career-standings">YMYS Career Standings</a>
                    </li>
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
        teams: []
    },
    data(){
        return {
            teamsIsActive: false,
            league: {},
            years: [],
            weeks: [],
            options: [
                {"name": "test", "value": "test", "href": "https://www.google.com", children: 
                    [
                        {"name": "test", "value": "test", "href": "https://www.google.com", children: [{}]}
                    ]
                }
            ],
            options_name: "Test"
        }
    },
    mounted() {
        return Promise.all([
            this.$ymysApi.get("/league/info"),
        ]).then((responses) => {
            const [leagueResponse] = responses;
            this.leagueInfo = leagueResponse.data.results;
            return this.setPowerRankingOptions();
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