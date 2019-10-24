
<template>
  <div>
    <a-card :bordered="false" title="订单状态">
      <a-steps :direction="isMobile() && 'vertical' || 'horizontal'" :current="1" progressDot>
        <a-step title="待付款"></a-step>
        <a-step title="待发货"></a-step>
        <a-step title="待确认收货"></a-step>
        <a-step title="已完成"></a-step>
      </a-steps>
    </a-card>
    <a-card style="margin-top:24px" :bordered="false" title="订单详情">
      <detail-list title="收货人信息">
        <detail-list-item term="用户姓名">{{order.consignee}}</detail-list-item>
        <detail-list-item term="身份证">{{order.consignIdno}}</detail-list-item>
        <detail-list-item term="联系方式">{{order.consignPhone}}</detail-list-item>
        <detail-list-item term="联系地址">浙江省杭州市西湖区黄姑山路工专路交叉路口</detail-list-item>
      </detail-list>
      <detail-list title="订单金额">
        <detail-list-item term="商品总额">{{order.totalPrice}}</detail-list-item>
        <detail-list-item term="创建时间">{{order.createTime}}</detail-list-item>
        <detail-list-item></detail-list-item>
      </detail-list>
      <detail-list title="支付信息">
        <detail-list-item term="支付方式">支付宝</detail-list-item>
        <detail-list-item term="支付时间">{{order.createTime}}</detail-list-item>
        <detail-list-item term="支付单号">{{order.tradeNo}}</detail-list-item>
      </detail-list>
    </a-card>
    <!-- 操作 -->
    <a-card tstyle="margin-top:24px" :bordered="false" title="商品详情">
      <a-table :columns="orderItemsColumns" :dataSource="orderItems" :pagination="false">
        <template slot="status" slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
        </template>
      </a-table>
    </a-card>
  </div>
</template>

<script src='./js/OrderInfo.js'/>

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
