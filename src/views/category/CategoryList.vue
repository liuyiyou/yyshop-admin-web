<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="8">
        <a-row>
          <a-col :xs="{ span: 16 }" :lg="{ span: 8 }">
            <a-button type="default" icon="edit" @click="onEdit" style="margin-right:20px">编辑类目</a-button>
          </a-col>
          <a-col :xs="{ span: 16 }" :lg="{ span: 8 }">
            <a-button type="default" icon="delete" @click="onDelete" style="margin-right:20px">删除类目</a-button>
          </a-col>
          <a-col :xs="{ span: 16 }" :lg="{ span: 8 }">
            <a-button type="default" icon="plus" @click="onCreate" style="margin-right:20px">添加分类</a-button>
          </a-col>
        </a-row>
        <category-tree ref="categoryTree" @complete="onSelectedKeys" />
      </a-col>
      <a-col :span="16">
        <a-row :gutter="19">
          <a-col>
            <a-button type="default" icon="plus" @click="onPropValue" style="float: right">关联属性</a-button>
          </a-col>
        </a-row>
        <div style="border:1px solid #e4e4e4;padding:15px 38px; margin-top:28px">
          <p>基础属性</p>
          <a-table ref="table" size="default" :columns="baseColumns" :dataSource="baseList">
            <template v-slot:action="text, record">
              <a @click="onCancleBase(record)">取消关联</a>
            </template>
          </a-table>
        </div>
        <div style="border:1px solid #e4e4e4;padding:15px 38px; margin-top:18px">
          <p>销售属性（商品规格）</p>
          <a-table ref="table" size="default" :columns="saleColumns" :dataSource="saleList">
            <template v-slot:action="text, record">
              <a @click="onUnbound(record)">取消关联</a>
            </template>
          </a-table>
        </div>
      </a-col>
    </a-row>
    <creatCategoryModal
      ref="creatCategoryModal"
      @complete="onCreatCategoryOk"
      :breadcrumbList="breadcrumbList"
    />
    <propValueModal
      ref="propValueModal"
      :breadcrumbList="breadcrumbList"
      :selectedRowKeys="selectedRowKeys"
    />
  </a-card>
</template>

<script src="./js/CategoryList.js"></script>

<style lang="less">
@import url('./css/category-list.less');
</style>
