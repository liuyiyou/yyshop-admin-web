<template>
  <div v-if="searchFields.length>1">
    <a-col :md="8" :sm="24" v-for="(field, index) in searchFields" :key="index">
      <a-form-item
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :label="field.title"
        :required="!!field.required"
        hasFeedback
      >
        <template v-if="field.component=='SelectCmp'">
          <a-select
                  :placeholder="field.placeholder"
                  @change="onChange"
                  style="width: 200px">
            <a-select-option v-for="d in field.selectList" :key="d.key">{{ d.value }}</a-select-option>
          </a-select>
<!--          <select-cmp :placeholder="field.placeholder" :selectList="field.selectList" @change="onChange"></select-cmp>-->
        </template>
        <!--        <template v-if="field.component=='DatePicker'">-->
        <!--          <a-range-picker @change="onChange1" />-->
        <!--        </template>-->

        <template v-if="!field.component">
          <component
            :is="'AInput'"
            :placeholder="field.placeholder"
            :id="field.dataIndex"
            v-decorator="[]"
            :disabled="field.disabled"
            @change="onText"
          ></component>
        </template>
      </a-form-item>
    </a-col>
    <a-col :md="8" :sm="24">
      <a-form-item>
        <a-button type="primary" @click="onSearch">查询</a-button>
      </a-form-item>
    </a-col>
  </div>
  <div v-else>
    <a-form-item
      v-for="(field, index) in searchFields"
      :key="index"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="field.title"
      :required="!!field.required"
      hasFeedback
    >
      <template v-if="field.component=='InputSearch'">
        <a-input-search
          :placeholder="field.placeholder"
          @search="onSearch1"
          enterButton="查询"/>
      </template>
    </a-form-item>
  </div>
</template>

<script>
// import InputSearch from '@/components/InputSearch/InputSearch'
import DatePicker from '@/components/DatePicker/DatePicker'
import SelectCmp from '@/components/Select/SelectCmp'
export default {
  name: 'SearchHead',
  components: {
    // InputSearch,
    SelectCmp,
    DatePicker
  },
  data () {
    return {
      querySel: '',
      queryTxt: '',
      dateRange: []
      // formFields: {},
    }
  },
  props: {
    searchFields: Array,
    formData: Object,
    labelCol: Object,
    wrapperCol: Object,
    showUploadList: Boolean,
    selectList: Array

    // onSearch: Function
  },
  methods: {
    onSearch1 (value) {
      this.$emit('search', value)
    },
    onSearch () {
      this.$emit('search', this.queryTxt, this.querySel)
    },
    onChange (value) {
      this.querySel = value
      console.log(this.querySel)
    },
    onText (e) {
      this.queryTxt = e.target.value
    },
    onChange1 (date, dateString) {
      console.log(date, dateString)
      this.dateRange = dateString
    }
  }

}
</script>

<style scoped>

</style>
