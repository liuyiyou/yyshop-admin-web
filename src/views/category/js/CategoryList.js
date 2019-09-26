import STree from '@/components/Tree/Tree'
  import { STable } from '@/components'
  import OrgModal from '../modules/OrgModal'
  import { getOrgTree, getServiceList } from '@/api/manage'

  export default {
    name: 'CategoryList',
    components: {
      STable,
      STree,
      OrgModal
    },
    data () {
      return {
        openKeys: ['key-01'],

        // 查询参数
        queryParam: {},
        // 表头
        columns: [
          {
            title: '#',
            dataIndex: 'no'
          },
          {
            title: '成员名称',
            dataIndex: 'description'
          },
          {
            title: '登录次数',
            dataIndex: 'callNo',
            sorter: true,
            needTotal: true,
            customRender: (text) => text + ' 次'
          },
          {
            title: '状态',
            dataIndex: 'status',
            needTotal: true
          },
          {
            title: '更新时间',
            dataIndex: 'updatedAt',
            sorter: true
          },
          {
            title: '操作',
            dataIndex: 'action',
            width: '150px',
            scopedSlots: { customRender: 'action' }
          }
        ],
        // 加载数据方法 必须为 Promise 对象
        loadData: parameter => {
          return getServiceList(Object.assign(parameter, this.queryParam))
            .then(res => {
              return res.result
            })
        },
        orgTree: [],
        selectedRowKeys: [],
        selectedRows: []
      }
    },
    created () {
      getOrgTree().then(res => {
        this.orgTree = res.result
      })
    },
    methods: {
      handleClick (e) {
        console.log('handleClick', e)
        this.queryParam = {
          key: e.key
        }
        this.$refs.table.refresh(true)
      },
      handleAdd (item) {
        console.log('add button, item', item)
        this.$message.info(`提示：你点了 ${item.key} - ${item.title} `)
        this.$refs.modal.add(item.key)
      },
      handleTitleClick (item) {
        console.log('handleTitleClick', item)
      },
      titleClick (e) {
        console.log('titleClick', e)
      },
      handleSaveOk () {

      },
      handleSaveClose () {

      },

      onSelectChange (selectedRowKeys, selectedRows) {
        this.selectedRowKeys = selectedRowKeys
        this.selectedRows = selectedRows
      }
    }
  }