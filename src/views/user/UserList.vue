<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="角色ID">
              <a-input placeholder="请输入"/>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="状态">
              <a-select placeholder="请选择" default-value="0">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <span class="table-page-search-submitButtons">
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px">重置</a-button>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>

    <s-table
      size="default"
      :columns="columns"
      :data="loadData"
    >
      <template v-slot:status="text">
        <a-tag :color="text ? 'blue' : 'red' ">{{ text | statusFilter }}</a-tag>
      </template>

      <template
        v-slot:expandedRowRender="record"
      >
        <div style="margin: 0">
          <a-row
            :gutter="24"
            :style="{ marginBottom: '12px' }">
            <a-col :span="12" v-for="(role, index) in record.authorities" :key="index" :style="{ marginBottom: '12px' }">
              <a-col :lg="4" :md="24">
                <span>{{ role }}：</span>
              </a-col>
              <a-col :lg="20" :md="24" v-if="record.authorities.length > 0">
                <a-tag color="cyan" v-for="(role1, k) in record.authorities" :key="k">{{ role1 }}</a-tag>
              </a-col>
              <a-col :span="20" v-else>-</a-col>
            </a-col>
          </a-row>
        </div>

      </template>
      <!-- 自 2.6.0 起被废弃 新推荐的语法请查阅 https://cn.vuejs.org/v2/guide/components-slots.html#%E4%BD%9C%E7%94%A8%E5%9F%9F%E6%8F%92%E6%A7%BD -->
      <!-- <span slot="action" slot-scope="text, record"> -->
      <!-- // eslint-disable-next-line -->
      <template v-slot:action="text, record">
        <a @click="onEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down" />
          </a>
          <template v-slot:overlay>
            <a-menu >
              <a-menu-item>
                <a @click="onView(record)">详情</a>
              </a-menu-item>
              <a-menu-item>
                <a @click="onDelete(record)">删除</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </s-table>

    <a-modal
      title="操作"
      style="top: 20px;"
      :width="800"
      v-model="visible"
      @ok="onOK"
    >
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
            v-decorator="[
              field.dataIndex,
              {rules: [{ required: !!field.required, message: field.title }]}
            ]"
            :disabled="field.disabled">
          </component>
        </a-form-item>

        <a-divider />

        <a-form-item
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
          label="拥有权限"
          hasFeedback
        >
          <a-row :gutter="16" v-for="(permission, index) in formData.permissions" :key="index">
            <a-col :span="4">
              {{ permission.permissionName }}：
            </a-col>
            <a-col :span="20">
              <a-checkbox-group :options="permission.actionsOptions"/>
            </a-col>
          </a-row>

        </a-form-item>

      </a-form>
    </a-modal>

  </a-card>
</template>
<script src="./js/UserList.js"></script>
<style lang="less">
@import url('./css/user-list.less');
</style>
