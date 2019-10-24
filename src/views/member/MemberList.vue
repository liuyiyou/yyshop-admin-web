<template>
  <a-card :bordered="true">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-card title="筛选查询">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="会员名称">
                <a-input placeholder="会员名称" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <span class="table-page-search-submitButtons">
                <a-button type="primary">查询</a-button>
              </span>
            </a-col>
          </a-row>
        </a-card>
      </a-form>
    </div>
    <s-table size="default" :columns="columns" :data="loadData">
      <template v-slot:action="text, record">
        <a @click="onView(record)">查看</a>
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
</template>
<script src="./js/MemberList.js"></script>
