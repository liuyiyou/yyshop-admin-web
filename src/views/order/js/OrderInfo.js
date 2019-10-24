import orderService from './order.service'
import orderItemService from './orderItem.service'
import moment from 'moment'
import { mixinDevice } from '@/utils/mixin'
import { PageView } from '@/layouts'
import DetailList from '@/components/tools/DetailList'
const DetailListItem = DetailList.Item
export default {
    name: 'OrderInfo',
    components: {
        DetailList,
        DetailListItem
    },
    mixins: [mixinDevice],
    data() {
        return {
            order: {},
            orderItems: [],
            orderItemsColumns: [
                {
                    title: '商品编码',
                    dataIndex: 'skuId',
                    key: 'skuId'
                },
                {
                    title: '商品条码',
                    dataIndex: 'barcode',
                    key: 'barcode'
                },
                {
                    title: '商品名称',
                    dataIndex: 'prodName',
                    key: 'prodName',
                },
                {
                    title: '单价',
                    dataIndex: 'unitPrice',
                    key: 'unitPrice'
                },
                {
                    title: '数量',
                    dataIndex: 'prodNum',
                    key: 'prodNum'
                }
            ],

        }
    },
    created() {
        let id = this.$route.query.id;
        orderService.find(id).then(response => {
            let data = response.result;
            this.order = data;
        })
        orderItemService.find(id).then(response => {
            let data = response.result;
            this.orderItems = data;
        })


    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                agree: '成功',
                reject: '驳回'
            }
            return statusMap[status]
        },
        statusTypeFilter(type) {
            const statusTypeMap = {
                agree: 'success',
                reject: 'error'
            }
            return statusTypeMap[type]
        }
    },
    methods: {
        onCreate() {
        },
        onEdit(record) {
        },
        onView(record) {
        },
        onDelete(record) {
        },
        onOK(e) {
        },
        onChange(selectedRowKeys, selectedRows) {
        },
        toggleAdvanced() {
        },
        onSubmit(e) {
        }
    },

}




