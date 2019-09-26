<template>
  <div class="footer">
    <div class="links">
      <a href="http://liuyiyou.cn" target="_blank">博客</a>
      <a href="http://www.yiyou.site/#/" target="_blank">刘易友的学习笔记</a>
      <a href="http://www.yiyou.fun/" target="_blank">博客</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" />2019
      <span>liuyiyou.cn</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
