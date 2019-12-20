<template>
  <div>
    <a-form-item
      v-for="(field, index) in formFields"
      :key="index"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
      :label="field.title"
    >
      <template v-if="field.component=='UploadImg'">
        <a-form-item :extra="field.uploadConfig.tooltips">
          <UploadImg
            :uploadConfig="field.uploadConfig"
            v-decorator="[field.dataIndex, field.option]"
          ></UploadImg>
        </a-form-item>
      </template>
      <template v-if="field.component=='Select'">
        <a-select :placeholder="field.placeholder" v-decorator="[field.dataIndex, field.option]">
          <a-select-option v-for="d in field.selectedList" :key="d.key">{{ d.value }}</a-select-option>
        </a-select>
      </template>
      <template v-if="field.component=='SelectMultiple'">
        <a-select :placeholder="field.placeholder" v-decorator="[field.dataIndex, field.option]" mode="multiple">
          <a-select-option v-for="d in field.selectedList" :key="d.key">{{ d.value }}</a-select-option>
        </a-select>
      </template>
      <template v-if="field.component=='RadioGroups'">
        <a-radio-group :name="field.name" v-decorator="[field.dataIndex, field.option]">
          <a-radio v-for="(item,index) in field.groupList" :key="index" :value="item.key">{{ item.value }}</a-radio>
        </a-radio-group>
      </template>
      <template v-if="field.component=='CheckBoxGroups'">
        <a-checkbox-group :name="field.name" v-decorator="[field.dataIndex, field.option]">
          <a-checkbox v-for="(item,index) in field.groupList" :key="index" :value="item.key">{{ item.value }}</a-checkbox>
        </a-checkbox-group>
      </template>
      <template v-if="field.component=='ATextarea'">
        <a-textarea v-decorator="[field.dataIndex,field.option]"></a-textarea>
      </template>
      <template v-if="!field.component || field.component=='input'">
        <component
          :is="'AInput'"
          :placeholder="field.placeholder"
          :id="field.dataIndex"
          v-decorator="[
            field.dataIndex,
            field.option
          ]"
          :disabled="field.disabled"
        ></component>
      </template>
    </a-form-item>
  </div>
</template>
<script>
import UploadImg from '@/components/tools/upload'
import SelectCmp from '@/components/Select/SelectCmp'
export default {
  name: 'FormItem',
  components: {
    UploadImg,
    SelectCmp
  },
  data () {
    return {
    }
  },
  props: {
    formFields: Array,
    formData: Object,
    labelCol: Object,
    wrapperCol: Object,
    showUploadList: Boolean,
    optionList: Array
  },
  watch: {

  },
  methods: {

  }
}
</script>
