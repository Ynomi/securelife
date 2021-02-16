<template>
  <v-card>
    <v-card-title>Result</v-card-title>
    <v-card-text>{{ questionList.length }}問中、{{ countCorrectAnswer }}問正解</v-card-text>

    <v-btn color="secondary" @click="showTop()">Top</v-btn>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState('common', ['questionList', 'countCorrectAnswer']),
  },
  methods: {
    ...mapMutations('common', ['setCurrentDisplay']),

    showTop() {
      this.setCurrentDisplay('top')
    },
  },
}
</script>
>
