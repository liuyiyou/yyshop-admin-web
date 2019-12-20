import { STable } from '@/components'
import sysRoleService from './sysRole.service'
import moment from 'moment'

const treeData = [
    {
        title: '权限树',
        key: '0-0',
        children: [
            {
                title: '系统管理',
                key: '0-0-0',
                children: [
                    { title: '用户管理', key: '0-0-0-0' },
                    { title: '角色管理', key: '0-0-0-1' },
                    { title: '菜单管理', key: '0-0-0-2' }
                ]
            },
            {
                title: '订单管理',
                key: '0-0-1',
                children: [
                    { title: '订单列表', key: '0-0-1-0' },
                    { title: '退款列表', key: '0-0-1-1' },
                    { title: '0-0-1-2', key: '0-0-1-2' }
                ]
            },
            {
                title: '0-0-2',
                key: '0-0-2'
            }
        ]
    },
    {
        title: '0-1',
        key: '0-1',
        children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' }
        ]
    },
    {
        title: '0-2',
        key: '0-2'
    }
]
export default {
    name: 'SysRoleList',
    components: {
        STable
    },
    data() {
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
                    dataIndex: 'roleId'
                },
                {
                    title: '角色名称',
                    dataIndex: 'roleName'
                },
                {
                    title: '权限字符串',
                    dataIndex: 'roleKey'
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
                },

            ],
            // 加载数据方法 必须为 Promise 对象

            loadData: async parameter => {
                console.log('loadData parameter ', parameter)
                const res = await sysRoleService.list(parameter)
                return res.result

            },

            selectedRowKeys: [],
            selectedRows: [],
            //下面是树结构
            expandedKeys: ['0-0-0', '0-0-1'],
            autoExpandParent: true,
            checkedKeys: ['0-0-0'],
            selectedKeys: [],
            treeData
        }
    },
    created() {

    },
    watch: {
        checkedKeys(val) {
            console.log('onCheck', val)
        }
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

        }
        ,
        //树相关
        onExpand(expandedKeys) {
            console.log('onExpand', expandedKeys)
            // if not set autoExpandParent to false, if children expanded, parent can not collapse.
            // or, you can remove all expanded children keys.
            this.expandedKeys = expandedKeys
            this.autoExpandParent = false
        },
        onCheck(checkedKeys) {
            console.log('onCheck', checkedKeys)
            this.checkedKeys = checkedKeys
        },
        onSelect(selectedKeys, info) {
            console.log('onSelect', info)
            this.selectedKeys = selectedKeys
        }
    },

}
