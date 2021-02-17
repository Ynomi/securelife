<template>
  <div>
    <v-card class="mx-auto" width="900">
      <v-layout justify-center>
        <h1 class="primary--text">{{ title }}</h1>
      </v-layout>
    </v-card>

    <v-card class="mx-auto my-3 py-10" width="900" height="450">
      <v-list nav class="mx-16 pa-16" elevation="2" color="accent">
        <v-subheader class="mb-6">Select a level</v-subheader>
        <v-list-item-group color="success">
          <v-list-item
            v-for="(qLevel, i) in settingInformation.questionPaths"
            :key="i"
            :class="{ selected: selectLevelPath === qLevel.path }"
            @click="selectQuizLevel(qLevel.path)"
          >
            {{ qLevel.title }}
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>

    <v-layout justify-center class="my-10">
      <v-btn
        rounded
        color="secondary"
        :disabled="!selectLevelPath"
        height="100"
        @click="showQuiz()"
        >Start</v-btn
      >
    </v-layout>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import axios from 'axios'

export default {
  data() {
    return {
      title: 'SecureLife', // タイトル
      selectLevelPath: '', // 選択した問題の難易度ファイルパス
    }
  },
  created() {
    this.selectLevelPath = '' // 選択したファイルパスのリセット
  },
  computed: {
    ...mapState('common', ['questionList', 'settingInformation']),
  },
  methods: {
    ...mapMutations('common', ['setCurrentDisplay', 'setQuestionList']),
    /**
     * 問題の難易度を選択
     * 選択済みの場合、選択を解除する
     *
     * @param {string} path 各問題ファイルまでのパス
     */
    selectQuizLevel(path) {
      path === this.selectLevelPath
        ? (this.selectLevelPath = '')
        : (this.selectLevelPath = path)
    },
    /**
     * クイズコンポーネントを表示する
     *
     * 現在はSample
     * 問題のジャンル等を導入する場合、手前に処理を挟む
     *
     * sample 問題パス
     * ./question/sample.json
     */
    showQuiz() {
      axios
        .get(this.selectLevelPath)
        .then((response) => {
          this.shuffleQuestion(response.data.questionList)
          this.setCurrentDisplay('quiz')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    // 取得した問題をシャッフルして store に格納する
    shuffleQuestion(questionList) {
      for (let i = questionList.length - 1; i >= 0; i--) {
        const r = Math.floor(Math.random() * (i + 1))
        // 配列を入れ替える
        ;[questionList[i], questionList[r]] = [questionList[r], questionList[i]]
      }
      // 問題をVuexに格納する
      this.setQuestionList(questionList)
    },
  },
}
</script>
