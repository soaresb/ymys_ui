<template>
    <div class="list-with-heading">
        <h6>{{this.heading}}</h6>
        <li v-for="i in this.list" :key="i" class="team-header-career-standings-li">
            {{i}}
        </li>
    </div>
    
</template>

<script>

export default {
    name: 'ListWithHeading',
    components: {
      
    },
    props: {
        list: [],
        heading: null
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