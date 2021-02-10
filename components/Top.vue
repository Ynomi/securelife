<template>
  <div>
    <h1 class="title">{{ title }}</h1>

    <ul>
      <li
        v-for="(qLevel, index) in settingInformation.questionPaths"
        :key="index"
        :class="{ selected: selectLevelPath === qLevel.path }"
        @click="selectQuizLevel(qLevel.path)"
      >
        {{ qLevel.title }}
      </li>
    </ul>

    <button :disabled="!selectLevelPath" @click="showQuiz()">Start</button>
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
      if (path === this.selectLevelPath) {
        this.selectLevelPath = ''
      } else {
        this.selectLevelPath = path
      }
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
