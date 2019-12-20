import { STable } from '@/components'
import brandService from './brand.service'
import brandModal from '../modules/BrandModal'
import countryApi from '@/api/country.api'
import SearchHead from '@/components/tools/SearchHead'
import FormItem from '@/components/FormItem/FormItem'
export default {
  name: 'BrandList',
  components: {
    STable,
    SearchHead,
    FormItem,
    brandModal
  },
  data() {
    return {
      description: '',
      visible: false,
      isSearch: false,
      pagination: { showSizeChanger: true, showQuickJumper: true, showTotal: total => `总共${total}条` },
      inCurrent: 0,
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
      countryList: [],
      advanced: false,
      pageSize: 10,
      searchFields: [
        {
          title: '品牌信息',
          placeholder: '品牌名称/别名',
          component: 'InputSearch'
        }
      ],
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
          dataIndex: 'id',
          key: 'id'
        },
        {
          title: '品牌名称',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '品牌英文',
          dataIndex: 'englishName',
          key: 'englishName'
        },
        {
          title: '别名',
          dataIndex: 'alias',
          key: 'alias'
        },
        {
          title: '所属国家',
          dataIndex: 'countryName',
          key: 'countryName'
        },
        {
          title: '图标',
          dataIndex: 'logo',
          key: 'logo',
          customRender: (imageUrl, record, index) => {
            var url = 'http://oss.yanglaoban.com/' + imageUrl
            return <a-avatar src={url} shape="square" icon="user" />
          }
        },
        {
          title: '操作',
          width: '150px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      list: [],
      selectedRowKeys: [],
      selectedRows: [],
      formFields: [
        {
          title: '品牌名称',
          placeholder: '请输入品牌名称',
          dataIndex: 'name',
          required: true,
          option: { rules: [{ required: true, max: 15, message: '最多允许输入15个汉字' }], initialValue: '' }
        },
        {
          title: '品牌英文名',
          placeholder: '请输入品牌英文名',
          dataIndex: 'englishName',
          required: true,
          option: { rules: [{ required: true, max: 15, message: '最多允许输入15个汉字' }], initialValue: '' }
        },
        {
          title: '品牌别名',
          placeholder: '请输入品牌别名',
          dataIndex: 'alias',
          required: true,
          option: { rules: [{ required: true, max: 15, message: '最多允许输入15个汉字' }], initialValue: '' }
        },
        {
          title: '上传图片',
          component: 'UploadImg',
          required: true,
          uploadConfig: {
            uploadQuantity: 1,
            tooltips: '只能上传jpg/png格式文件，180*180px，文件不能超过50kb',
            imgType: ['image/jpeg', 'image/jpg', 'image/png'],
            imgSize: 50,
            width: 180,
            height: 180
          },
          dataIndex: 'uploadimg',
          option: { rules: [{ required: true, message: '请上传图片' }], initialValue: [] }
        },
        {
          title: '上传图片',
          component: 'UploadImg',
          required: true,
          uploadConfig: {
            uploadQuantity: 1,
            tooltips: '只能上传jpg/png格式文件，180*180px，文件不能超过50kb',
            imgType: ['image/jpeg', 'image/jpg', 'image/png'],
            imgSize: 50,
            width: 180,
            height: 180
          },
          dataIndex: 'uploadimg2',
          option: { rules: [{ required: true, message: '请上传图片' }], initialValue: [] }
        },
        {
          title: '所属国家',
          component: 'Select',
          placeholder: '请选择国家',
          dataIndex: 'country',
          required: true,
          selectedList: [],
          option: { rules: [{ required: true, message: '请选择国家' }] }
        }
      ],
      isSearchStatus: false,
      imgList: [],
      tooltips: '只能上传jpg/png格式文件，180*180px，文件不能超过50kb'
    }
  },
  mounted() {
    this.fetch({ 'pageNo': 0, 'pageSize': 10 })
  },
  created() {
    const pageable = { 'pageNo': 0, 'pageSize': 9999 }
    countryApi.list(pageable).then(res => {
      for (var index in res.result.content) {
        res.result.content[index].value = res.result.content[index].countryNameCn
        res.result.content[index].key = res.result.content[index].countryId
      }
      this.countryList = res.result.content
    })
  },
  filters: {
    statusFilter(status) {
      return status ? '正常' : '禁用'
    }
  },
  methods: {
    onCreate() {
      this.$refs.modal.add()
    },
    onEdit(record) {
      this.$refs.modal.edit(record)
    },
    onSearch(value) {
      let parameter
      if (!value) {
        parameter = `name like '*' or alias like '*'`
      } else {
        parameter = `name like '*${value}*' or alias like '*${value}*'`
      }
      this.isSearchStatus = true
      this.queryParam = parameter
      this.onTableChange({ 'pageNo': 0, 'pageSize': this.pageSize, 'current': 0 })
    },
    onTableChange(pagination, sorter) {
      const pager = { ...this.pagination }
      pager.current = pagination.current
      this.pagination = pager
      if (this.isSearchStatus) {
        this.fetch({
          pageNo: pagination.current,
          pageSize: pagination.pageSize,
          sort: sorter
        }, true, this.queryParam)
      } else {
        this.fetch({
          pageNo: pagination.current,
          pageSize: pagination.pageSize,
          sort: sorter
        }, false)
      }
    },
    fetch(params, isSearched, whereClause) {
      this.loading = true
      const _this = this
      if (isSearched) {
        brandService.advancedSearch(whereClause, params).then(res => {
          _this.list = res.result.content
          const pagination = { ...this.pagination }
          pagination.total = res.result.totalElements
          pagination.pageSize = params.pageSize
          _this.loading = false
          _this.pagination = pagination
        })
      } else {
        brandService.list(params).then(res => {
          const pagination = { ...this.pagination }
          pagination.total = res.result.totalElements
          _this.loading = false
          _this.list = res.result.content
          _this.pagination = pagination
        })
      }
    },
    onDelete(record) {
      const id = record.id
      this.$confirm({
        title: '确认删除?',
        content: '',
        onOk() {
          brandService.delete(id).then(res => {
            this.fetch({ 'pageNo': 0, 'pageSize': 10 })
          })
        },
        class: 'test'
      })
    },
    handleOk(res) {
      if (res == 'creat') {
        this.localPagination = Object.assign({}, {
          current: 1, pageSize: this.pageSize
        })
        this.onTableChange(this.localPagination)
      } else {
        this.pagination = Object.assign({}, {
          current: this.pagination.current, pageSize: this.pageSize
        })
        this.onTableChange(this.pagination)
      }
    }
  }
}
