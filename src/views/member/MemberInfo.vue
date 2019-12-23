<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div>
    <a-card style="margin-top:24px" :bordered="false" title="用户详情">
      <detail-list title="基本信息">
        <detail-list-item term="账号">{{member.account}}</detail-list-item>
        <detail-list-item term="真实姓名">{{member.realName}}</detail-list-item>
        <detail-list-item term="Email">{{member.email}}</detail-list-item>
        <detail-list-item term="性别">{{member.gender}}</detail-list-item>
      </detail-list>
      <detail-list title="账户信息">
        <detail-list-item term="余额">100</detail-list-item>
        <detail-list-item term="红包">100</detail-list-item>
      </detail-list>
    </a-card>
    <a-card tstyle="margin-top:24px" :bordered="false" title="收获地址列表">
      <a-table :columns="userDeliveriesColumns" :dataSource="userDeliveries" :pagination="false">
        <template v-slot:action="text, record">
          <a @click="onView(record)">修改</a>
          <a-divider type="vertical"/>
          <a @click="onDelete(record)">删除</a>
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script src='./js/MemberInfo.js'/>

<style lang="less" scoped>
  .detail-layout {
    margin-left: 44px;
  }

  .text {
    color: rgba(0, 0, 0, 0.45);
  }

  .heading {
    color: rgba(0, 0, 0, 0.85);
    font-size: 20px;
  }

  .no-data {
    color: rgba(0, 0, 0, 0.25);
    text-align: center;
    line-height: 64px;
    font-size: 16px;

    i {
      font-size: 24px;
      margin-right: 16px;
      position: relative;
      top: 3px;
    }
  }

  .mobile {
    .detail-layout {
      margin-left: unset;
    }
    .text {
    }
    .status-list {
      text-align: left;
    }
  }
</style>
