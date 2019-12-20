<template>
  <div>
    <a-form :form="form" :formData="formData" @submit="onSubmit">
      <FormItem
        :formFields="formFields"
        :formData="formData"
        :showUploadList="false"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
        :optionList="optionList"
      ></FormItem>
    </a-form>
  </div>
</template>
<script>
import { emit } from 'cluster'
export default {
  name: '',
  data () {
    return {

    }
  },
  props: {
    formData: {},
    formFields: {}

  },
  methods: {
    onSubmit () {
      if (!validate()) {
        return
      }
      emit('OK')
    },
    validate () {
      for (const field in formFields) {
        const fieldValue = formData[field.dataIndex]
        const validateRules = field.rules
        if (fieldValue > 0) {
          alert('error')
        }
      }
    }

  }
}
</script>
