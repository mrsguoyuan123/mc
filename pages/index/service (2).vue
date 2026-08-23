<template>
	<view class="page-content">
		<!--患者信息卡片-->
		<view class="list-wrap">
			<view class="patient-card">
				<!-- 头部行：头像 + 姓名年龄状态 -->
				<view class="card-header">
					<view class="card-avatar avatar">
						<u-icon name="account" color="#9c27b0" size="60rpx"></u-icon>
					</view>
					<view class="header-info">
						<view class="row-name">
							<text class="name">{{user.name}}</text>
							<text class="age">{{user.age}}岁</text>
						</view>
						<view class="row-time">
							<text class="time-text">{{user.status}}</text>
						</view>
					</view>
				</view>
				<view class="bottom-item">
					<u-icon name="phone" color="#9333ea" size="32rpx"></u-icon>
					<text class="phone-text">{{user.phone}}</text>
				</view>
				<!-- 医院+导航：两端对齐 -->
				<view class="bottom-item addr-row">
					<view class="addr-left">
						<u-icon name="map" size="32rpx" color="#666"></u-icon>
						<text class="addr-text">{{user.hospital}}</text>
					</view>
					<view class="nav-btn" @click="goNav">
						<text class="custom-icon custom-icon-navigation icon-bold"
							style="font-size:28rpx;color:#9333ea;"></text>
						<text>导航</text>
					</view>
				</view>
			</view>
		</view>
		<!--陪诊任务卡片 时间线-->
		<view class="task-card">
			<view class="card-title">陪诊任务</view>
			<view class="timeline-wrap">
				<!--任务1 -->
				<view class="timeline-item">
					<view class="dot" :class="task1Finished ? 'finished' : 'active'"></view>
					<view class="timeline-content">
						<view class="task-title" :class="task1Finished?'gray':''">任务 1: 到院签到</view>
						<view class="btn-group" v-if="!task1Finished">
							<button class="purple-btn" @click="locationCheck">
								<u-icon name="map" size="32rpx" color="#fff"></u-icon>
								<text>定位打卡</text>
							</button>
							<button class="purple-btn" @click="photoCheck">
								<u-icon name="camera" size="32rpx" color="#fff"></u-icon>
								<text>拍照打卡</text>
							</button>
						</view>
						<view  class="done-tip">✅已完成到院签到打卡</view>
					</view>
				</view>
				<!--任务2 未开始-->
				<view class="timeline-item">
					<view class="dot"></view>
					<view class="timeline-content">
						<view class="task-title gray">任务 2: 诊疗进展记录</view>
					</view>
				</view>
				<!--任务3 未开始-->
				<view class="timeline-item">
					<view class="dot"></view>
					<view class="timeline-content">
						<view class="task-title gray">任务 3: 最终陪诊反馈</view>
					</view>
				</view>
			</view>
		</view>
		<view class="spacer"></view>
		<custom-tabbar :current="1"></custom-tabbar>
	</view>
</template>

<script>
	import customTabbar from "@/components/custom-tabbar/custom-tabbar.vue";
	export default {
		components: {
			customTabbar
		},
		data() {
			return {
				user: {
					name: "孙患者",
					age: 45,
					status: "陪诊进行中",
					phone: "138****5678",
					hospital: "杭州市第一人民医院"
				},
				task1Finished: false
			}
		},
		methods: {
			goNav() {
				uni.openLocation({
					latitude: 30.2741,
					longitude: 120.1550,
					name: "杭州市第一人民医院",
					address: "杭州市第一人民医院",
					fail: () => {
						uni.showToast({
							title: "打开地图失败",
							icon: "none"
						})
					}
				})
			},
			locationCheck() {
				uni.chooseLocation({
					success: (res) => {
						console.log('选点结果', res)
						uni.showModal({
							title: "定位打卡成功",
							content: `地址：${res.name}\n经纬度：${res.latitude},${res.longitude}`,
							showCancel: false,
							success: () => {
								this.task1Finished = true
							}
						})
					},
					fail: (err) => {
						console.error(err)
						if (err.errMsg.includes("auth")) {
							uni.showModal({
								title: "需要位置权限",
								content: "请开启位置权限才能定位打卡",
								confirmText: "去设置",
								success: (res) => {
									if (res.confirm) uni.openSetting()
								}
							})
						} else if (err.errMsg.includes('cancel')) {
							uni.showToast({
								title: "已取消定位打卡",
								icon: "none"
							})
						} else {
							uni.showToast({
								title: "打开地图失败",
								icon: "none"
							})
						}
					}
				})
			},
			photoCheck() {
				uni.chooseMedia({
					count: 1,
					mediaType: ['image'],
					sourceType: ['camera'],
					success: (res) => {
						const tempPath = res.tempFiles[0].tempFilePath
						console.log("拍照路径", tempPath)
						uni.showModal({
							title: "拍照打卡成功",
							content: "拍照签到完成",
							showCancel: false,
							success: () => {
								this.task1Finished = true
							}
						})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.page-content {
		padding: 30rpx;
	}

	.patient-card {
		background: #fff;
		border-radius: 32rpx;
		border: 2rpx solid #e9e4f8;
		padding: 32rpx;
		margin-bottom: 24rpx;
	}

	.card-header {
		display: flex;
		gap: 24rpx;
		align-items: flex-start;
		margin-bottom: 32rpx;
	}

	.avatar {
		width: 100rpx;
		height: 100rpx;
		flex-shrink: 0;
		border-radius: 24rpx;
		background: #f8f0fc;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.header-info {
		flex: 1;
	}

	.row-name {
		display: flex;
		align-items: baseline;
		gap: 16rpx;
		margin-bottom: 16rpx;
	}

	.name {
		font-size: 40rpx;
		font-weight: bold;
		color: #111;
	}

	.age {
		font-size: 28rpx;
		color: #888;
	}

	.time-text {
		font-size: 32rpx;
		color: #999;
	}

	.bottom-item {
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
		gap: 16rpx;
	}

	/* 医院+导航 两端对齐 */
	.addr-row {
		justify-content: space-between;
	}

	.addr-left {
		display: flex;
		align-items: center;
		gap: 16rpx;
	}

	.phone-text {
		font-size: 36rpx;
		color: #9333ea;
	}

	.addr-text {
		font-size: 30rpx;
		color: #444;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		color: #9333ea;
		font-size: 30rpx;
		gap: 8rpx;
	}

	.task-card {
		background: #fff;
		border-radius: 24rpx;
		padding: 36rpx;
		box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.06);
	}

	.card-title {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 32rpx;
	}

	.timeline-wrap {
		position: relative;
	}

	.timeline-wrap::before {
		content: "";
		position: absolute;
		left: 12rpx;
		top: 0;
		bottom: 0;
		width: 2rpx;
		background: #ddd;
	}

	.timeline-item {
		display: flex;
		margin-bottom: 40rpx;
		position: relative;
	}

	.dot {
		width: 24rpx;
		height: 24rpx;
		border-radius: 50%;
		background: #ddd;
		flex-shrink: 0;
		margin-right: 24rpx;
		z-index: 2;
	}

	.dot.active {
		background: #9333ea;
	}

	.dot.finished {
		background: #36d399;
	}

	.timeline-content {
		flex: 1;
	}

	.task-title {
		font-size: 34rpx;
		font-weight: bold;
		margin-bottom: 24rpx;
	}

	.task-title.gray {
		color: #999;
	}

	.btn-group {
		display: flex;
		flex-direction: column;
		gap: 24rpx;
	}

	.purple-btn {
		background: #9333ea;
		color: #fff;
		border-radius: 99rpx;
		height: 96rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		border: none;
		margin: 0;
	}

	.done-tip {
		font-size: 30rpx;
		color: #36d399;
	}

	.spacer {
		height: 80rpx;
	}
</style>