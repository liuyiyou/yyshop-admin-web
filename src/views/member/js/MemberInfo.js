import { mixinDevice } from '@/utils/mixin'
import DetailList from '@/components/tools/DetailList'
import memberService from './member.service'
import userDeliveryService from './userDelivery.service'

const DetailListItem = DetailList.Item
export default {
  name: 'MemberInfo',
  components: {
    DetailList,
    DetailListItem
  },
  mixins: [mixinDevice],
  data () {
    return {
      member: {},
      userDeliveries: [],
      userDeliveriesColumns: [
        {
          title: '收货人',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '收货人手机号',
          dataIndex: 'tel',
          key: 'tel'
        },
        {
          title: '身份证',
          dataIndex: 'idno',
          key: 'idno'
        },
        {
          title: '地址',
          dataIndex: 'address',
          key: 'address'
        }, {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  created () {
    const id = this.$route.query.id
    memberService.find(id).then(response => {
      const data = response.result
      this.member = data
    })
    userDeliveryService.listByUId(id).then(reponse => {
      const data = reponse.result
      this.userDeliveries = data
    })
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        agree: '成功',
        reject: '驳回'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        agree: 'success',
        reject: 'error'
      }
      return statusTypeMap[type]
    }
  },
  methods: {
    onCreate () {
    },
    onEdit (record) {
    },
    onView (record) {
    },
    onDelete (record) {
    },
    onOK (e) {
    },
    onChange (selectedRowKeys, selectedRows) {
    },
    toggleAdvanced () {
    },
    onSubmit (e) {
    }
  }

}
