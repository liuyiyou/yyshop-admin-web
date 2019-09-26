import { STable } from '@/components'
import TariffService from './tariff.service'
import moment from 'moment'
export default {
  name: 'TariffList',
  components: {
    STable
  },
  data () {
    return {
      description: '列表使用场景：后台管理中的权限管理以及角色管理，可用于基于 RBAC 设计的角色权限控制，颗粒度细到每一个操作类型。',

      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      formData: {},

      // 高级搜索 展开/关闭
      advanced: false,

      // 表头
      columns: [
        {
          title: '序号',
          dataIndex: 'id'
        },
        {
          title: '销售类型',
          dataIndex: 'name'
        },
        {
          title: '说明',
          dataIndex: 'englishName'
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      //新增form
      formFields: [
        {
          title: '销售类型',
          dataIndex: 'name',
        },
        {
          title: '说明',
          dataIndex: 'alias',
        },
        {
          title: '税率',
          dataIndex: 'logo',
          component:'ATextarea'
        },
        {
            title: '发货地',
            dataIndex: 'logo',
            component:'ATextarea'
        }
      ],
      // 加载数据方法 必须为 Promise 对象

      loadData: async parameter => {
        console.log('loadData parameter ', parameter)
        const res = await TariffService.list(parameter)
        console.log('tariffList res', res)
        return res.result

      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {

  },
  filters: {
    statusFilter (status) {

      return status ? '正常' : '禁用'
    }

  },
  methods: {
    onCreate(){
      this.formData = {}
      console.log(this.formData['id'])
      this.visible = true
    },
    onEdit (record) {
      console.log('handleEdit', record)
      record.createdDate = moment(record.createdDate)
      this.formData = Object.assign({}, record)
      console.log(this.formData['id'])

      this.visible = true
    },
    onView (record) {
      record.createdDate = moment(record.createdDate)
      this.formData = Object.assign({}, record)
      console.log('onView', record)
      this.visible = true
    },
    onDelete (record) {
      console.log('onDelete', record)
    },
    onOK (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log('validateFields: ', err, values)
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    onChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    onSubmit (e) {
      console.log(this.form, this.formData)

    },
    handleChange(value) {
        console.log(`selected ${value}`);
    }
  },

}
