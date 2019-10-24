<template>
    <a-row :gutter="24">
      <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card title="角色列表">
          <s-table size="default" :columns="columns" :data="loadData">
            <!-- 自 2.6.0 起被废弃 新推荐的语法请查阅 https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD -->
            <!-- <span slot="action" slot-scope="text, record"> -->
            <!-- // eslint-disable-next-line -->
            <template v-slot:action="text, record">
              <a @click="onEdit(record)">编辑</a>
              <a-divider type="vertical" />
              <a @click="onDelete(record)">删除</a>
            </template>
          </s-table>

          <a-modal title="操作" style="top: 20px;" :width="800" v-model="visible" @ok="onOK">
            <a-form :form="form" @submit="onSubmit">
              <a-form-item
                v-for="(field, index) in formFields"
                :key="index"
                :labelCol="labelCol"
                :wrapperCol="wrapperCol"
                :label="field.title"
                :required="!!field.required"
                hasFeedback
              >
                <!-- <a-input :placeholder="field.title" v-model="formData[field.dataIndex]" :id="field.dataIndex" :disabled="field.disabled" /> -->
                <component
                  v-model="formData[field.dataIndex]"
                  :is="field.component ? field.component :'AInput'"
                  :placeholder="field.title"
                  :id="field.dataIndex"
                  :disabled="field.disabled"
                ></component>
              </a-form-item>
            </a-form>
          </a-modal>
        </a-card>
      </a-col>
      <a-col style="padding: 0 12px" :xl="8" :lg="24" :md="24" :sm="24" :xs="24">
        <a-card title="权限分配">
          <a-tree
            checkable
            @expand="onExpand"
            :expandedKeys="expandedKeys"
            :autoExpandParent="autoExpandParent"
            v-model="checkedKeys"
            @select="onSelect"
            :selectedKeys="selectedKeys"
            :treeData="treeData"
          />
        </a-card>
      </a-col>
    </a-row>
</template>

<script>
const treeData = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' }
        ]
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
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
  data() {
    return {
      expandedKeys: ['0-0-0', '0-0-1'],
      autoExpandParent: true,
      checkedKeys: ['0-0-0'],
      selectedKeys: [],
      treeData
    }
  },
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    }
  },
  methods: {
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
  }
}
</script>

<script src="./js/SysRoleList.js"></script>
