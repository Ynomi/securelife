<template>
  <div>
    <p class="mx-12" v-html="question.q"></p>
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
