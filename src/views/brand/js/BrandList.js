import { STable } from '@/components'
import brandService from './brand.service'
import moment from 'moment'
export default {
  name: 'BrandList',
  components: {
    STable
  },
  data () {
    return {
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
      // 查询参数
      queryParam: {},
      searchCodition: [
        {
          title: 'ID',
          dataIndex: 'id',
          disabled: true
        },

        {
          title: '账号',
          dataIndex: 'login'
        },
        {
          title: '状态',
          dataIndex: 'activated',
          meta: {
            component: 'dropdown'
          },

          scopedSlots: { customRender: 'status' }
        }
      ],
      // 表头
      columns: [
        {
          title: '编号',
          dataIndex: 'id'
        },
        {
          title: '品牌名称',
          dataIndex: 'name'
        },
        {
          title: '品牌英文',
          dataIndex: 'englishName'
        },
        {
          title: '别名',
          dataIndex: 'alias'
        },
        {
          title: '所属国家',
          dataIndex: 'countryName'
        },
        {
          title: '图标',
          dataIndex: 'logo'
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],

      formFields: [
        {
          title: '品牌名称',
          dataIndex: 'name',
        },
        {
          title: '品牌英文',
          dataIndex: 'englishName'
        },
        {
          title: '品牌别名',
          dataIndex: 'alias',
        },
        {
          title: '品牌LOGO',
          dataIndex: 'logo',
        },
        {
          title: '所属国家',
          dataIndex: 'countryName',
          component:'ASelect'
        }

      ],
      // 加载数据方法 必须为 Promise 对象

      loadData: async parameter => {
        console.log('loadData parameter ', parameter)
        const res = await brandService.list(parameter)
        console.log('brandList res', res)
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
      console.log('onView', record)
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

    }
  },

}
