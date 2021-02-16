<template>
  <div>
    <v-card-text v-html="question.q"></v-card-text>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: ['question', 'qNum'],
  methods: {
    ...mapMutations('common', ['setAnswerList']),
  },
}
</script>
