<template>
  <div>
    <Top v-if="currentDisplay === 'top'"></Top>
    <Quiz v-if="currentDisplay === 'quiz'"></Quiz>
    <Result v-if="currentDisplay === 'result'"></Result>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import settingJsonPath from '~/static/settings.json'

export default {
  components: {
    Top: () => import('~/components/Top.vue'),
    Quiz: () => import('~/components/Quiz.vue'),
    Result: () => import('~/components/Result.vue'),
  },
  computed: {
    ...mapState('common', [
      // store/index.jsの場合('common')は必要ない
      'currentDisplay',
      'settingInformation',
    ]),
  },
  created() {
    // インスタンスが作成された後で実行(ライフサイクルフック)
    this.initialSettings() // 初期設定
  },
  methods: {
    ...mapMutations('common', ['setCurrentDisplay', 'setSettingInformation']),
    // 初期設定
    initialSettings() {
      this.setSettingInformation(settingJsonPath)
      this.setCurrentDisplay('top')
    },
  },
}
</script>
