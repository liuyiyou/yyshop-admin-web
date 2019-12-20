import { STable } from '@/components'
import orderService from './order.service'
import moment from 'moment'
export default {
  name: 'OrderList',
  components: {
    STable
  },
  data() {
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
          title: '订单编号',
          dataIndex: 'orderId',
          sorter: true
        },
        {
          title: '下单时间',
          dataIndex: 'createTime',
        },
        {
          title: '订单金额',
          dataIndex: 'totalPrice'
        },
        {
          title: '订单状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' }
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],

      formFields: [
      ],
      // 加载数据方法 必须为 Promise 对象

      loadData: async parameter => {
        console.log('loadData parameter ', parameter)
        const res = await orderService.list(parameter)
        console.log('orderList res', res)
        return res.result

      },

      selectedRowKeys: [],
      selectedRows: []
    }
  },
  created() {

  },
  filters: {
    statusFilter(status) {
      return status ? '正常' : '禁用'
    }

  },
  methods: {
    onCreate() {
      this.formData = {}
      console.log(this.formData['id'])
      this.visible = true
    },
    onEdit(record) {
      console.log('handleEdit', record)
      record.createdDate = moment(record.createdDate)
      this.formData = Object.assign({}, record)
      console.log(this.formData['id'])

      this.visible = true
    },
    onView(record) {
      console.log('onView', record)
      this.$router.push({
        path: `/order/OrderInfo`,
        query: { id: record.orderId }
      })
    },
    onDelete(record) {
      console.log('onDelete', record)

    },
    onOK(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        console.log('validateFields: ', err, values)
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    onChange(selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced() {
      this.advanced = !this.advanced
    },
    onSubmit(e) {
      console.log(this.form, this.formData)
    },
    onSearch(e) {
      console.log(this.queryParam)
      const res = orderService.list(queryParam)
      console.log('orderList res', res)
      return res.result
    }
  },

}
