<template>
    <tr>
        <td class="team-player-center-text-td">
            {{this.team.division_ranking}}
        </td>
        <td class="team-player-center-text-td">
            {{this.team.team_name}}
        </td>
        <td class="team-player-center-text-td">
            {{this.team.wins}}
        </td>
        <td class="team-player-center-text-td">
            {{this.team.losses}}
        </td>
        <td class="team-player-center-text-td">
            {{this.team.ties}}
        </td>
        <td class="team-player-center-text-td">
            {{this.team.points}}
        </td>
        
    </tr>
</template>

<script>



export default {
    name: 'HomeStandingRow',
    components: {
      
    },
    props: {
        team: {}
    },
    data(){
        
    },
    mounted() {

    },
    methods: {
    
    }
    
        
}

</script>

<style>
    .team-player-center-text {
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>