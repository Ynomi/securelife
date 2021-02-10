<template>
  <div>
    <h1>Result</h1>
    <h2>{{ questionList.length }}問中、{{ countCorrectAnswer }}問正解</h2>

    <button @click="showTop()">Top</button>
  </div>
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
