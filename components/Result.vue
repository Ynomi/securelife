<template>
  <v-card class="mx-auto my-16 pa-16" width="900">
    <v-card-title class="accent--text">Result</v-card-title>
    <v-card-text class="px-auto"
      >{{ questionList.length }}問中 {{ countCorrectAnswer }}問
      正解</v-card-text
    >
    <v-card-text
      class="text-center text--primary"
      v-html="message"
    ></v-card-text>

    <v-card-actions class="my-2">
      <v-spacer></v-spacer>
      <v-btn outlined rounded color="secondary" height="70" @click="showTop()"
        >Top</v-btn
      >
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  data() {
    return {
      message: '',
    }
  },
  created() {
    this.createMessage() // 結果メッセージの作成
  },
  computed: {
    ...mapState('common', ['questionList', 'countCorrectAnswer']),
  },
  methods: {
    ...mapMutations('common', ['setCurrentDisplay']),

    /**
     * 正解率によるメッセージの作成
     */
    createMessage() {
      const pca = this.countCorrectAnswer / this.questionList.length
      if (pca >= 0.9) this.message = 'バッチリです!!! その調子で！'
      else if (pca >= 0.6) this.message = '惜しい！ もう一度チャレンジ！'
      else
        this.message =
          'まだまだセキュリティの知識が<br />足りないようです<br />頑張りましょう'
    },
    showTop() {
      this.setCurrentDisplay('top')
    },
  },
}
</script>
>
