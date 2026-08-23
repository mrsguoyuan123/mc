<template>
  <view class="page page-mine">
    <view class="page-body">
      <view class="title">我的页面</view>
    </view>
    <custom-tabbar :current="2"></custom-tabbar>
  </view>
</template>

<script>
import customTabbar from "@/components/custom-tabbar/custom-tabbar.vue";

export default {
  components: { customTabbar },
  data() {
    return {};
  }
};
</script>

<style scoped>
.page {
  padding-bottom: calc(120rpx + var(--safe-area-inset-bottom));
}
.page-body {
  padding: 30rpx;
}
.title {
  font-size: 32rpx;
}
</style>
