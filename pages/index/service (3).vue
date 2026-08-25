<template>
  <view class="container">
    <view class="item">
      <text>目的地地址：</text>
      <input
        v-model="destAddress"
        placeholder="请输入完整地址，例：上海市人民广场"
        class="input"
      />
    </view>

    <button type="primary" @click="addressConvertAndNav">高德解析地址并导航</button>

    <view v-if="lat && lng" class="result">
      <text>纬度latitude：{{ lat }}</text>
      <text>经度longitude：{{ lng }}</text>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      destAddress: "",
      lat: null,
      lng: null,
      amap: null
    };
  },
  onReady() {
    // 动态require，不要写在顶部import，解决vite找不到模块
    const AMapWX = require("@/static/amap‑wx.130.js").AMapWX;
    this.amap = new AMapWX({
      key: "73bfdddf9bc61ffba8add1e4afdb1247"
    });
  },
  methods: {
    addressConvertAndNav() {
      if (!this.destAddress.trim()) {
        return uni.showToast({ title: "请输入目的地地址", icon: "none" });
      }
      if (!this.amap) {
        return uni.showToast({ title: "SDK初始化失败", icon: "none" });
      }
      uni.showLoading({ title: "解析地址中..." });
      this.amap.getGeo({
        address: this.destAddress.trim(),
        success: (res) => {
          uni.hideLoading();
          console.log("高德返回", res);
          if (res.geocodes && res.geocodes.length > 0) {
            const geoItem = res.geocodes[0];
            const [lngStr, latStr] = geoItem.location.split(",");
            this.lng = Number(lngStr);
            this.lat = Number(latStr);
            uni.openLocation({
              latitude: this.lat,
              longitude: this.lng,
              name: geoItem.formatted_address,
              scale: 18
            })
          } else {
            uni.showToast({ title: "识别不到该地址", icon: "none" });
          }
        },
        fail: (err) => {
          uni.hideLoading();
          console.error(err);
          uni.showToast({ title: "地址解析出错", icon: "none" });
        }
      })
    }
  }
}
</script>


<style scoped>
.container {
  padding: 30rpx;
}
.item {
  margin-bottom: 40rpx;
}
.input {
  border: 1rpx solid #eee;
  padding: 20rpx;
  margin-top: 10rpx;
  border-radius: 8rpx;
}
.result {
  margin-top: 30rpx;
  font-size: 26rpx;
  color: #666;
}
</style>
