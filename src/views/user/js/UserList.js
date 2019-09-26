import { STable } from '@/components'
import { getRoleList, getServiceList } from '@/api/manage'
import userService from './user.service'
import moment from 'moment'
export default {
  name: 'UserList',
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
          title: 'ID',
          dataIndex: 'id',

          disabled: true
        },
        {
          title: '头像',
          dataIndex: 'imageUrl',
          customRender: (imageUrl, record, index) => {
            return <a-avatar src={imageUrl} shape="square" icon="user"/>
          }

        },
        {
          title: '账号',
          dataIndex: 'login'

        },
        {
          title: '状态',
          dataIndex: 'activated',

          scopedSlots: { customRender: 'status' }
        },
        // {
        //   title: '语言',
        //   dataIndex: 'langKey',
        //   customRender: (text, record, index) => {
        //     return <a-badge count={index || '550'}><a-avatar shape="square" icon="user" /></a-badge>
        //   }

        // },

        {
          title: '创建时间',
          dataIndex: 'createdDate',
          sorter: true,
          customRender: (text, record, index) => {
            const date = moment(text).format('YYYY-MM-DD HH:mm')

            return <p>{ date === 'Invalid date' ? '' : date }</p>
          }
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
          title: 'ID',
          dataIndex: 'id',
          disabled: true
        },
        {
          title: '账号',
          dataIndex: 'login',
          required: true
        },
        {
          title: '状态',
          dataIndex: 'activated',
          component: 'ASwitch',
          disabled: false
        }

      ],
      // 加载数据方法 必须为 Promise 对象

      loadData: async parameter => {
        console.log('loadData parameter ', parameter)
        const res = await userService.getUserList(parameter)
        console.log('userList res', res)
        return res.result
        // return getRoleList(parameter)
        //   .then(res => {
        //     console.log('getRoleList', res)
        //     // console.log(JSON.stringify(res))
        //     return res.result
        //   })
      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created () {
    getServiceList().then(res => {
      console.log('getServiceList.call()', res)
    })

    getRoleList().then(res => {
      console.log('getRoleList.call()', res)
    })
  },
  filters: {
    statusFilter (status) {
      console.log('statusFilter', status)

      return status ? '正常' : '禁用'
    }

  },
  methods: {
    onEdit (record) {
      console.log('handleEdit', record)
      this.formData = Object.assign({}, record)
      console.log(this.formData['id'])

      // this.formData.permissions.forEach(permission => {
      //   permission.actionsOptions = permission.actionEntitySet.map(action => {
      //     return { label: action.describe, value: action.action, defaultCheck: action.defaultCheck }
      //   })
      // })

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
      // const { form: { validateFields } } = this
      // validateFields((errors, values) => {
      //   // ...
      //   console.log(errors, values)
      // })

      // e.preventDefault()
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     console.log('Received values of form: ', values)
      //   }
      // })
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
