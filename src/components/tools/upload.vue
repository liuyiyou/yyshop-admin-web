<template>
  <div class="clearfix">
    <a-upload
      :action="actionUrl"
      :data="getUploadTokenData"
      listType="picture-card"
      :beforeUpload="beforeUpload"
      :fileList="fileList"
      @change="handleChange"
      accept="image/*"
      :multiple="multiple"
    >
      <div v-if="fileList.length < uploadConfig.uploadQuantity">
        <a-icon type="plus" />
        <div class="ant-upload-text">选择图片</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
import uploadApi from '@/components/tools/js/upload.api'
import { randomString } from '@/utils/util'
export default {
  name: 'UploadImg',
  data () {
    return {
      loading: false,
      imageUrl: '',
      previewVisible: false,
      previewImage: '',
      fileList: [],
      getUploadTokenData: {},
      actionUrl: '',
      multiple: true
    }
  },
  props: {
    uploadConfig: {
      type: Object,
      default: function () {
        return {
          uploadStyle: 0,
          imgSize: 1024,
          uploadQuantity: 1,
          imgType: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
          width: 0, // 固定宽度 0 代表不限
          height: 0, // 固定高度 0 代表不限
          maxWidth: 0, // 最大宽度 0 代表不限
          maxHeight: 0, // 最大高度 0 代表不限
          minWidth: 0, // 最小宽度 0 代表不限
          minHeight: 0 // 最小高度 0 代表不限
        }
      }
    }
  },
  methods: {
    initFn (initList) {
      this.fileList = initList
    },
    getUploadToken (file, callBack) {
      uploadApi.getPolicy().then(res => {
        const suffix = file.name.slice(file.name.lastIndexOf('.'))
        const filename = Date.now() + randomString(10) + suffix
        file.oosUrl = res.result.host + '/' + res.result.dir + filename
        this.actionUrl = res.result.host
        this.getUploadTokenData = {
          'name': file.name,
          'key': res.result.dir + filename,
          'policy': res.result.policy,
          'OSSAccessKeyId': res.result.accessid,
          'success_action_status': '200',
          'signature': res.result.signature
        }
        callBack()
      })
    },
    handleChange (info) {
      if (info.file.status === 'uploading') {
        this.loading = true
      }
      if (info.file.status === 'done') {
        this.$emit('complete', info.fileList)
      }
      this.fileList = info.fileList
    },
    beforeUpload (file) {
      return new Promise((resolve, reject) => {
        const imgType = this.uploadConfig.imgType
        const isType = imgType.includes(file.type)
        const imgTypeTis = imgType.join('，')
        if (!isType) {
          this.$message.error(`只能上传${imgTypeTis}格式文件`)
          return reject(new Error('errorMsg'))
        }
        const checkSize = parseInt(file.size / 1024) <= parseInt(this.uploadConfig.imgSize)
        if (!checkSize) {
          this.$message.error(`图片的体积不能大于${this.uploadConfig.imgSize}KB!`)
          return reject(new Error('errorMsg'))
        }
        const that = this
        this.getUploadToken(file, function () {
          return resolve(isType && checkSize && that.checkImageWH(file))
        })
      })
    },
    handleCancel () {

    },
    checkImageWH (file) {
      const self = this
      const width = this.uploadConfig.width
      const height = this.uploadConfig.height
      const maxWidth = this.uploadConfig.maxWidth
      const maxHeight = this.uploadConfig.maxHeight
      const minWidth = this.uploadConfig.minWidth
      const minHeight = this.uploadConfig.minHeight
      return new Promise(function (resolve, reject) {
        const callReject = reject
        if (width === 0 && height === 0) {
          resolve(true)
        }
        const filereader = new FileReader()
        filereader.addEventListener('load', e => {
          const data = e.target.result
          // 加载图片获取图片真实宽度和高度
          const image = new Image()
          image.addEventListener('load', () => {
            if (width !== 0 && height !== 0) {
              if (width && image.width !== width) {
                self.$message.error('请上传宽度为' + width + 'px的图片')
                callReject()
              } else if (height && image.height !== height) {
                self.$message.error('请上传高度为' + height + 'px的图片')
                callReject()
              }
            }
            if (maxWidth !== 0 && image.width > maxWidth) {
              self.$message.error('请上传宽度小于' + width + 'px的图片')
              callReject()
            }
            if (maxHeight !== 0 && image.height > maxHeight) {
              self.$message.error('请上传高度小于' + height + 'px的图片')
              callReject()
            }
            if (minWidth !== 0 && image.width < minWidth) {
              self.$message.error('请上传宽度大于' + width + 'px的图片')
              callReject()
            }
            if (minHeight !== 0 && image.height < minHeight) {
              self.$message.error('请上传高度大于' + height + 'px的图片')
              callReject()
            }
            resolve()
          })
          image.src = data
        })
        filereader.readAsDataURL(file)
      })
    }
  }
}
</script>
<style>
  /*.ant-upload.ant-upload-select-picture-card {*/
  /*width: 130px;*/
  /*height: 40px;*/
  /*}*/
  /*.ant-upload-select-picture-card i {*/
  /*font-size: 20px;*/
  /*color: #999;*/
  /*margin-right: 6px;*/
  /*}*/

  /*.ant-upload-select-picture-card .ant-upload-text {*/
  /*color: #666;*/
  /*display: inline;*/
  /*}*/
</style>
