<template>
    <Ranking />
</template>

<script>
// @ is an alias to /src
import Ranking from '../components/ranking/Ranking.vue'

export default {
    name: 'PowerRankings',
    components: {
        Ranking
    },
    created() {

    },
    data() {
        return {

        }
    },
    mounted() {

    },
    methods: {

    },
    beforeRouteLeave (to, from, next) {
        console.log("1234");
        const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
        if (answer) {
            next()
        } else {
            next(false)
        }
    },
}
</script>

<style>
    
</style>
