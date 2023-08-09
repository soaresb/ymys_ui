<template>
    <div class="container">
        <team-header v-if="this.team" :team="this.team"/>
        <nav>
            <div class="nav nav-tabs justify-content-end" id="nav-tab" role="tablist">
                <button class="nav-link active" id="nav-roster-tab" data-bs-toggle="tab" data-bs-target="#nav-roster" type="button" role="tab" aria-controls="nav-roster" aria-selected="true">Roster</button>
                <button class="nav-link" id="nav-matchups-tab" data-bs-toggle="tab" data-bs-target="#nav-matchups" type="button" role="tab" aria-controls="nav-matchups" aria-selected="false">Matchups</button>
                <button class="nav-link" id="nav-team-draft-history-tab" data-bs-toggle="tab" data-bs-target="#nav-team-draft-history" type="button" role="tab" aria-controls="nav-team-draft-history" aria-selected="false">Draft History</button>
                <button class="nav-link" id="nav-team-superlatives-tab" data-bs-toggle="tab" data-bs-target="#nav-team-superlatives" type="button" role="tab" aria-controls="nav-team-superlatives" aria-selected="false">Superlatives</button>
            </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
            <div class="tab-pane fade show active" id="nav-roster" role="tabpanel" aria-labelledby="nav-roster-tab">
                <div class="container" style="margin: 15px 0;">
                    <div class="row">
                        <div class="col-3 col-sm-4">
                        </div>
                        <div class="col-3 col-sm-2">
                            Year
                            <dropdown :options="this.years" :selected="this.year.year" v-on:updateOption="onSelectYear" :name="this.year.year"></dropdown>
                        </div>
                        <div class="col-3 col-sm-2">
                            Week
                            <dropdown :options="this.weeks" :selected="this.weeks.week" v-on:updateOption="onSelectWeek" :name="this.week.week"></dropdown>
                        </div>
                        <div class="col-3 col-sm-4">
                        </div>
                    </div>
                </div>
                <div class="row" style="border: 1px solid; border-radius: 10px;">
                    <div class="col-12">
                        <team-players v-if="this.roster" :players="this.roster"/>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-matchups" role="tabpanel" aria-labelledby="nav-matchups-tab">
                <div class="row">
                    <div class="col-12">
                        <team-matchups />
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-team-draft-history" role="tabpanel" aria-labelledby="nav-team-draft-history-tab">
                <div class="row">
                    <div class="col-12">
                        <team-draft-history v-if="this.teamDraftHistory" :draftHistory="this.teamDraftHistory"/>
                    </div>
                </div>
            </div>
            <div class="tab-pane fade" id="nav-team-superlatives" role="tabpanel" aria-labelledby="nav-team-superlatives-tab">
                <div class="row">
                    <div class="col-12">
                        <team-superlatives :team="this.team" v-if="this.team !== {}" />
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script>
// @ is an alias to /src

import TeamPlayers from '../components/team/TeamPlayers.vue';
import TeamHeader from '../components/team/TeamHeader.vue';
import TeamMatchups from '../components/team/TeamMatchups.vue';
import TeamDraftHistory from '../components/team/TeamDraftHistory.vue';
import TeamSuperlatives from '../components/team/TeamSuperlatives.vue';
import Dropdown from '../components/nav/Dropdown.vue'
import _ from 'lodash'


export default {
  name: 'Team',
  components: {
      TeamPlayers,
      TeamHeader,
      TeamMatchups,
      TeamDraftHistory,
      TeamSuperlatives,
      Dropdown
  },
  created() {

  },
  data() {
      return {
          roster: [],
          seasons: [],
          team: {},
          matchups: [],
          year: {
            year: 2022,
            name: 2022
          },
          week: {
            week: 17,
            name: 17
          },
          weeks: [],
          years: [],
          teamDraftHistory: null
      }
  },
  mounted() {
        this.fetchTeam();
        this.fetchRoster(null, null);
        return Promise.all([
            this.$ymysApi.get(`/seasons`),
        ])
        .then((responses) => {
            const [seasonsResponse] = responses;
            this.seasons = seasonsResponse.data.results;
            this.years = seasonsResponse.data.results.seasons.map((season) => {
            return { year: season.year, name: season.year };
            });
            this.weeks = _.last(this.seasons.seasons).weeks.map((week) => {
            return { week, name: week };
            });
            this.fetchDraftPicks();
            
        })
        .catch((error) => {
            console.error(error.response);
        });
    
  },
  methods: {
    fetchTeam() {
        return Promise.all([
            this.$ymysApi.get(`/team/${this.$route.params.teamId}`)
        ])
        .then((responses) => {
            const [teamResponse] = responses;
            this.team = teamResponse.data.results;
        })
        .catch((error) => {
            console.error(error.response);
        });
    },

    fetchRoster(year, week) {
        const params = {};
        let rosterUrl = `/team/${this.$route.params.teamId}/roster`;
        params.year = year || this.year.year;
        params.week = week || this.week.week
        return Promise.all([
            this.$ymysApi.get(rosterUrl, { params }),
        ]).then((responses) => {
            const [rosterResponse] = responses;
            this.roster = rosterResponse.data.results.map((player) => {
                if (player.slot_position === "RB/WR/TE") {
                    player.slot_position = "FLEX"
                }
                return player;
            });
        })
        .catch((error) => {
          console.error(error.response);
        });
    },

    fetchDraftPicks() {
        return Promise.all([
        this.$ymysApi.get(`/team/${this.$route.params.teamId}/draftpicks?details=true`, { details: true })
        ])
        .then((responses) => {
            const [teamDraftHistory] = responses;
            this.teamDraftHistory = teamDraftHistory.data.results;
        })
        .catch((error) => {
            console.error(error.response);
        });
    },

    onSelectYear(payload) {
        const { year }  = payload;
        this.year = {
            year,
            name: year
        };
        this.fetchRoster(year, null);
    },

    onSelectWeek(payload) {
        const { week }  = payload;
        this.week = {
            week,
            name: week
        }
        this.fetchRoster(null, week);
    },
  }
}
</script>

<style>
    nav-item > ::marker {
        display: none;
    }

    nav-tabs .nav-link {
        background: #2c3749;
    }
    
</style>
