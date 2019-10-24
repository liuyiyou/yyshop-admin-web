<template>
  <a-card :bordered="false">
    <div class="table-page-search-wrapper">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="8" :sm="24">
            <a-form-item label="订单号">
              <a-input v-model="queryParam.id" placeholder />
            </a-form-item>
          </a-col>
          <a-col :md="8" :sm="24">
            <a-form-item label="订单状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0">
                <a-select-option value="0">待付款</a-select-option>
                <a-select-option value="1">待发货</a-select-option>
                <a-select-option value="2">待发货</a-select-option>
                <a-select-option value="3">待确认收货</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="8" :sm="24">
              <a-form-item label="调用次数">
                <a-input-number v-model="queryParam.callNo" style="width: 100%" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="更新日期">
                <a-date-picker v-model="queryParam.date" style="width: 100%" placeholder="请输入更新日期" />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="使用状态">
                <a-select placeholder="请选择" default-value="0">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 8 || 24" :sm="24">
            <span
              class="table-page-search-submitButtons"
              :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
            >
              <a-button type="primary" @click="onSearch(queryParam)">查询</a-button>
              <a-button style="margin-left: 8px" @click="() => queryParam = {}">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'" />
              </a>
            </span>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <s-table size="default" :columns="columns" :data="loadData">
      <template v-slot:action="text, record">
        <a @click="onEdit(record)">编辑</a>
        <a-divider type="vertical" />
        <a @click="onView(record)">查看</a>
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
<script src="./js/OrderList.js"></script>
