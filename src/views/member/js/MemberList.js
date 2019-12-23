import { STable } from '@/components'
import memberService from './member.service'
import moment from 'moment'

export default {
  name: 'MemberList',
  components: {
    STable
  },
  data () {
    return {
      description: '',
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
      pagination: { showSizeChanger: true, showQuickJumper: true, current: 0, showTotal: total => `总共${total}条` },
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
          title: '账号',
          dataIndex: 'account'
        },
        {
          title: '真实姓名',
          dataIndex: 'realName'
        },
        {
          title: '创建时间',
          dataIndex: 'createdDate'
        },
        {
          title: '性别',
          dataIndex: 'gender',
          scopedSlots: { customRender: 'gender' }
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
          title: '编号',
          dataIndex: 'id'
        }

      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: async parameter => {
        console.log('loadData parameter ', parameter)
        console.log('reload parameter', Object.assign(parameter, this.queryParam))
        // const res = await memberService.list(Object.assign(parameter, this.queryParam))
        return memberService.list(Object.assign(parameter, this.queryParam)).then(res => {
          return res.result
        })
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
    },
    genderFilter (gender) {
      if (gender == '1') {
        return '男'
      } else if (gender == '2') {
        return '女'
      } else {
        return '未知'
      }
    }

  },
  methods: {
    onCreate () {
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
      this.$router.push({
        path: '/member/MemberInfo',
        query: { id: record.id }
      })
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
  }

}
