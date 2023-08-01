<template>
    <div>
        <li v-for="(record, year) in this.standings">
            {{ year }}: ({{ record.wins }}-{{ record.losses }})
        </li>
    </div>
</template>

<script>

export default {
    name: 'TeamHeaderCareerStandings',
    components: {
      
    },
    props: {
        standings: {},
    },
    data(){
      return {
        
      }
    },
    mounted() {

    },
    methods: {
        
    }
    
        
}

</script>

<style>
    
</style>