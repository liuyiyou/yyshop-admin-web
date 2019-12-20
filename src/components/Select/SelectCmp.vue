<template>
  <a-select
    :value="val"
    @change="handleCurrencyChange"
    style="width: 200px">
    <a-select-option v-for="d in optionList" :key="d.key">{{ d.value }}</a-select-option>
  </a-select>
</template>

<script>
export default {
  name: 'SelectCmp',
  data () {
    const value = this.value || {}
    return {
      val: value.val || ''
    }
  },
  props: ['value', 'optionList'],
  watch: {
    value (val = {}) {
      this.val = val.val
    }
  },
  methods: {
    handleCurrencyChange (val) {
      this.triggerChange({ val })
    },
    triggerChange (changedValue) {
      this.$emit('change', Object.assign({}, this.$data, changedValue))
    }
  }
}
</script>

<style scoped>

</style>
