<template>
	<view class="page-content">
		<!--患者信息卡片-->
		<view class="list-wrap list-wrap-purole">
			<view class="patient-card">
				<!-- 头部行：头像 + 姓名年龄时间 + 查看详情 -->
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
							<u-icon name="clock" color="#9c27b0" size="32rpx"></u-icon>
							<text class="time-text">{{user.time}}</text>
						</view>
					</view>
				</view>

				<view class="bottom-item">
					<u-icon name="phone" color="#666" size="32rpx"></u-icon>
					<text class="bottom-text">{{user.phone}}</text>
				</view>
				<view class="bottom-item">
					<u-icon name="map" size="32rpx" color="#666"></u-icon>
					<text class="bottom-text">杭州市第一人民医院</text>
					<view class="nav-btn" @click="goNav">
						<text class="custom-icon custom-icon-navigation icon-bold"
							style="font-size:28rpx;color:#9810fa;"></text>
						<text class=" font-m">导航</text>
					</view>
				</view>
			</view>
		</view>

		<!--陪诊任务卡片 时间线-->
		<view class="task-card">
			<view class="card-title">陪诊任务</view>
			<view class="timeline-wrap">
				<!--任务1 进行中-->
				<view class="timeline-item">
					<view class="dot active"></view>
					<view class="timeline-content">
						<view class="task-title">任务 1: 到院签到</view>
						<view class="btn-group">
							<button class="purple-btn" @click="locationCheck">
								<u-icon name="map" size="32rpx" color="#fff"></u-icon>
								<text>定位打卡</text>
							</button>
							<button class="purple-btn" @click="photoCheck">
								<u-icon name="camera" size="32rpx" color="#fff"></u-icon>
								<text>拍照打卡</text>
							</button>
						</view>
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

		<!--底部tabbar-->
		<view class="tab-bar">
			<view class="tab-item" @click="switchTab(0)">
				<u-icon name="home" size="44rpx" color="#999"></u-icon>
				<text>首页</text>
			</view>
			<view class="tab-item active" @click="switchTab(1)">
				<u-icon name="bag" size="44rpx" color="#9333ea"></u-icon>
				<text>服务中</text>
			</view>
			<view class="tab-item" @click="switchTab(2)">
				<u-icon name="account" size="44rpx" color="#999"></u-icon>
				<text>我的</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: {
					name: "孙患者",
					age: 45,
					status: "陪诊进行中",
					phone: "138****5678",
					hospital: "杭州市第一人民医院"
				},
			}
		},
		methods: {
			goNav() {
				uni.showToast({
					title: "打开导航",
					icon: "none"
				})
			},
			locationCheck() {
				uni.chooseLocation({
					success: (res) => {
						console.log('选点结果', res)
						// res.name 地址名称
						// res.address 完整地址
						// res.latitude 纬度
						// res.longitude 经度
						// 这里做打卡提交，传给后端
						uni.showModal({
							title: "定位打卡成功",
							content: `地址：${res.name}\n经纬度：${res.latitude},${res.longitude}`,
							showCancel: false
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
									if (res.confirm) {
										uni.openSetting()
									}
								}
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
					sourceType: ['camera'], //仅相机拍照
					success: (res) => {
						const tempPath = res.tempFiles[0].tempFilePath
						console.log("拍照路径", tempPath)
						// 此处上传图片到后端
						uni.showToast({
							title: "拍照打卡成功",
							icon: "success"
						})
					}
				})
			},

			switchTab(index) {
				// tab跳转逻辑，这里只做演示
				console.log('切换tab', index)
			}
		}
	}
</script>

<style scoped>
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

	.info-title {
		display: flex;
		flex-direction: column;
	}

	.name {
		font-size: 40rpx;
		font-weight: bold;
		color: #111;
	}

	.age {
		font-size: 32rpx;
		color: #666;
		margin-left: 12rpx;
	}

	.status-text {
		font-size: 28rpx;
		color: #888;
		margin-top: 8rpx;
	}

	.phone-row {
		display: flex;
		align-items: center;
		margin-bottom: 16rpx;
	}

	.phone {
		font-size: 34rpx;
		color: #9333ea;
		margin-left: 12rpx;
	}

	.addr-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.addr {
		font-size: 32rpx;
		color: #333;
		margin-left: 12rpx;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		color: #9333ea;
		font-size: 30rpx;
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

	.spacer {
		height: 80rpx;
	}

	.tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		height: 120rpx;
		background: #fff;
		display: flex;
		box-shadow: 0 -2rpx 10rpx rgba(0, 0, 0, 0.05);
	}

	.tab-item {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		font-size: 24rpx;
		color: #999;
	}

	.tab-item.active {
		color: #9333ea;
	}


	.page-onsite .u-grid {
		border-radius: 10rpx;
		overflow: hidden;
		position: relative;
		display: grid;
		gap: 15rpx;
		grid-template-columns: repeat(3, 1fr);
	}

	.page-onsite .u-grid>view {
		padding: 30rpx;
		background: white;
		/* border: 1px solid red; */
	}

	.page-onsite .view-icon {
		background: #af4afd;
		border-radius: 20rpx;
		margin-right: 10rpx;
	}

	.my-subsection {
		display: flex;
		background: white;
		border-radius: 16rpx;
		padding: 6rpx;
	}

	.sub-item {
		flex: 1;
		text-align: center;
		height: 64rpx;
		line-height: 64rpx;
		border-radius: 12rpx;
		font-size: 28rpx;
		color: #333;
	}

	.sub-item.active {
		color: #ffffff;
		/* box-shadow: 0 2rpx 12rpx rgba(0, 0, 0, 0.08); */
	}

	.list-wrap {
		margin-top: 30rpx;
	}

	.patient-card {
		background: #fff;
		border-radius: 32rpx;
		border: 2rpx solid #e9e4f8;
		padding: 32rpx;
		margin-bottom: 24rpx;
	}

	/* 头部flex：头像｜姓名时间｜查看详情 */
	.card-header {
		display: flex;
		gap: 24rpx;
		align-items: flex-start;
		margin-bottom: 32rpx;
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
		font-size: 30rpx;
		color: #888;
	}

	.row-time {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.time-text {
		font-size: 2rpx;
		/* color: #9810fa; */
	}

	.card-right {
		flex-shrink: 0;
	}

	.detail-text {
		font-size: 30rpx;
		color: #9810fa;
		font-weight: bold;
	}

	/* ---------------- */
	.bottom-item {
		display: flex;
		align-items: center;
		gap: 16rpx;
		margin-bottom: 24rpx;
		/* 左边距离 = 头像宽度 + gap(24rpx) */
		margin-left: 0rpx;
	}

	.bottom-text {
		font-size: 30rpx;
		color: #444;
	}

	.info-card {
		background: #ffffff;
		border-radius: 32rpx;
		padding: 40rpx 36rpx;
		margin-bottom: 30rpx;
		box-shadow: 0 2rpx 14rpx rgba(0, 0, 0, 0.06);
	}

	.info-header {
		display: flex;
		align-items: flex-start;
		margin-bottom: 32rpx;
	}

	.info-title {
		padding-top: 8rpx;
	}

	.name-row {
		display: flex;
		align-items: center;
	}

	.name {
		font-size: 48rpx;
		font-weight: bold;
		color: #111111;
	}

	.age {
		font-size: 40rpx;
		color: #888;
		margin-left: 16rpx;
	}

	.status-text {
		font-size: 32rpx;
		color: #999;
		margin-top: 10rpx;
	}

	.phone-row {
		display: flex;
		align-items: center;
		margin-bottom: 24rpx;
	}

	.phone {
		font-size: 40rpx;
		color: #9333ea;
		margin-left: 14rpx;
	}

	.addr-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.addr {
		font-size: 40rpx;
		color: #333;
		margin-left: 14rpx;
	}

	.nav-btn {
		display: flex;
		align-items: center;
		color: #9333ea;
		font-size: 36rpx;
	}
</style>