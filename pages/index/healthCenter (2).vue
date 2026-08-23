<template>
	<view class="container">
		<!--顶部提交成功提示-->
		<view v-if="showSubmitTip" class="tip-box">
			<u-icon name="checkmark-circle" color="#27ae60" size="36rpx"></u-icon>
			<text class="tip-text">陪诊记录已提交</text>
			<view class="close-tip" @click="showSubmitTip=false">✕</view>
		</view>

		<!--患者信息卡片-->
		<view class="patient-card">
			<view class="card-header">
				<view class="avatar">
					<u-icon name="account" color="#9c27b0" size="60rpx"></u-icon>
				</view>
				<view class="header-info">
					<view class="row-name">
						<text class="name">{{user.name}}</text>
						<text class="age">{{user.age}}岁</text>
					</view>
					<view class="row-status">
						<text class="status-text">{{user.status}}</text>
					</view>
				</view>
			</view>
			<view class="info-item">
				<u-icon name="phone" color="#9333ea" size="32rpx"></u-icon>
				<text class="info-val">{{user.phone}}</text>
			</view>
			<view class="info-item addr-row">
				<view class="addr-left">
					<u-icon name="map" size="32rpx" color="#666"></u-icon>
					<text class="info-val">{{user.hospital}}</text>
				</view>
				<view class="nav-btn" @click="handleNav">导航</view>
			</view>
		</view>

		<!--陪诊任务卡片-->
		<view class="task-card">
			<view class="card-title">陪诊任务</view>
			<view class="timeline">
				<!--任务1：到院签到-->
				<view class="timeline-item">
					<view class="dot" :class="task1AllDone ? 'dot-finish' : 'dot-active'"></view>
					<view class="timeline-body">
						<view class="task-title" :class="task1AllDone?'text-gray':''">任务 1: 到院签到</view>
						<view v-if="task1AllDone" class="done-row">
							<u-icon name="checkmark-circle" color="#27ae60" size="34rpx"></u-icon>
							<text class="done-text">已完成</text>
						</view>
						<!--只有当前任务才展示操作按钮-->
						<view v-if="currentTask === 1 && !task1AllDone" class="btn-group">
							<button class="action-btn" @click="doLocationCheck">定位打卡</button>
							<button class="action-btn" @click="doPhotoCheck">拍照打卡</button>
							<button v-if="task1AllDone" class="next-btn" @click="goTask2">下一步</button>
						</view>
					</view>
				</view>

				<!--任务2：诊疗进展记录-->
				<view class="timeline-item">
					<view class="dot" :class="task2Done?'dot-finish':(currentTask===2?'dot-active':'dot-wait')"></view>
					<view class="timeline-body">
						<view class="task-title" :class="task2Done?'text-gray':''">任务 2: 诊疗进展记录</view>
						<view v-if="task2Done" class="done-row">
							<u-icon name="checkmark-circle" color="#27ae60" size="34rpx"></u-icon>
							<text class="done-text">已完成</text>
						</view>
						<!--仅currentTask=2时才渲染表单-->
						<view v-if="currentTask===2 && !task2Done" class="task-form">
							<view class="form-label">当前进展描述</view>
							<textarea class="textarea" v-model="progressDesc" placeholder="请描述当前就诊进展情况..."></textarea>
							<view class="form-label">异常反馈</view>
							<picker :value="abnormalIdx" :range="abnormalList" @change="onAbnormalChange">
								<view class="picker-box">{{abnormalList[abnormalIdx]}}</view>
							</picker>
							<button class="next-btn" @click="submitTask2">下一步</button>
						</view>
					</view>
				</view>

				<!--任务3：最终陪诊反馈-->
				<view class="timeline-item">
					<view class="dot" :class="task3Done?'dot-finish':(currentTask===3?'dot-active':'dot-wait')"></view>
					<view class="timeline-body">
						<view class="task-title" :class="task3Done?'text-gray':''">任务 3: 最终陪诊反馈</view>
						<view v-if="task3Done" class="done-row">
							<u-icon name="checkmark-circle" color="#27ae60" size="34rpx"></u-icon>
							<text class="done-text">已完成</text>
						</view>
						<view v-if="currentTask===3 && !task3Done" class="task-form">
							<view class="form-label">陪诊总结</view>
							<textarea class="textarea" v-model="summaryText" placeholder="请对本次陪诊服务进行总结..."></textarea>
							<view class="form-label">服务是否达成</view>
							<view class="radio-group">
								<view class="radio-item" :class="{active:serviceResult===1}" @click="serviceResult=1">
									已达成</view>
								<view class="radio-item" :class="{active:serviceResult===0}" @click="serviceResult=0">
									未达成</view>
							</view>
							<button class="submit-btn" @click="submitAllRecord">提交陪诊记录</button>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="tab-bar">
			<view class="tab-item">
				<u-icon name="home" size="44rpx"></u-icon>
				<text>首页</text>
			</view>
			<view class="tab-item tab-active">
				<u-icon name="bag" size="44rpx"></u-icon>
				<text>服务中</text>
			</view>
			<view class="tab-item">
				<u-icon name="person" size="44rpx"></u-icon>
				<text>我的</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showSubmitTip: false,
				user: {
					name: "孙患者",
					age: 45,
					status: "陪诊进行中",
					phone: "138****5678",
					hospital: "杭州市第一人民医院"
				},
				locDone: false,
				photoDone: false,
				currentTask: 1,
				task2Done: false,
				progressDesc: "",
				abnormalIdx: 0,
				abnormalList: ["无异常", "候诊时间长", "检查排队", "医生临时停诊", "其他"],
				task3Done: false,
				summaryText: "",
				serviceResult: 1
			}
		},
		computed: {
			task1AllDone() {
				return this.locDone && this.photoDone
			}
		},
		methods: {
			doLocationCheck() {
				this.locDone = true
			},
			doPhotoCheck() {
				this.photoDone = true
			},
			goTask2() {
				this.currentTask = 2
			},
			onAbnormalChange(e) {
				this.abnormalIdx = Number(e.target.value)
			},
			submitTask2() {
				if (!this.progressDesc.trim()) {
					uni.showToast({
						title: "请填写就诊进展",
						icon: "none"
					})
					return
				}
				this.task2Done = true
				this.currentTask = 3
			},
			submitAllRecord() {
				if (!this.summaryText.trim()) {
					uni.showToast({
						title: "请填写陪诊总结",
						icon: "none"
					})
					return
				}
				this.task3Done = true
				this.showSubmitTip = true
				setTimeout(() => {
					this.showSubmitTip = false
				}, 3000)
			},
			handleNav() {
				uni.showToast({
					title: "跳转导航",
					icon: "none"
				})
			}
		}
	}
</script>

<style scoped>
	page {
		background: #f4f6fa;
	}

	.container {
		padding: 30rpx;
	}

	.tip-box {
		display: flex;
		align-items: center;
		background: #e8f9ee;
		padding: 24rpx 30rpx;
		border-radius: 16rpx;
		margin-bottom: 24rpx;
		border: 1rpx solid #b2e8c4;
	}

	.tip-text {
		font-size: 30rpx;
		color: #208943;
		margin-left: 12rpx;
		flex: 1;
	}

	.close-tip {
		font-size: 32rpx;
		color: #666;
		padding: 0 10rpx;
	}

	.patient-card {
		background: #fff;
		border-radius: 24rpx;
		padding: 40rpx;
		margin-bottom: 30rpx;
	}

	.card-header {
		display: flex;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.avatar {
		width: 110rpx;
		height: 110rpx;
		background: #f3e8fc;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 24rpx;
	}

	.row-name {
		display: flex;
		align-items: center;
	}

	.name {
		font-size: 36rpx;
		font-weight: bold;
		color: #111;
	}

	.age {
		font-size: 32rpx;
		color: #444;
		margin-left: 12rpx;
	}

	.status-text {
		font-size: 28rpx;
		color: #888;
		margin-top: 8rpx;
	}

	.info-item {
		display: flex;
		align-items: center;
		margin: 20rpx 0;
		font-size: 32rpx;
	}

	.info-val {
		margin-left: 14rpx;
		color: #333;
	}

	.addr-row {
		justify-content: space-between;
	}

	.addr-left {
		display: flex;
		align-items: center;
	}

	.nav-btn {
		color: #9333ea;
		font-size: 30rpx;
	}

	.task-card {
		background: #fff;
		border-radius: 24rpx;
		padding: 40rpx;
	}

	.card-title {
		font-size: 38rpx;
		font-weight: bold;
		color: #111;
		margin-bottom: 40rpx;
	}

	.timeline-item {
		display: flex;
		margin-bottom: 48rpx;
		position: relative;
	}

	.dot {
		width: 36rpx;
		height: 36rpx;
		border-radius: 50%;
		flex-shrink: 0;
		margin-right: 26rpx;
		margin-top: 6rpx;
	}

	.dot-finish {
		background: #27ae60;
	}

	/*已完成：绿色圆点*/
	.dot-active {
		background: #9333ea;
	}

	/*当前进行：紫色圆点*/
	.dot-wait {
		background: #dddddd;
	}

	/*未开始：灰色圆点*/

	.timeline-item:not(:last-child)::before {
		content: "";
		position: absolute;
		left: 17rpx;
		top: 42rpx;
		width: 2rpx;
		height: calc(100% + 12rpx);
		background: #ddd;
	}

	.timeline-body {
		flex: 1;
	}

	.task-title {
		font-size: 34rpx;
		font-weight: 600;
		color: #111;
		margin-bottom: 16rpx;
	}

	.text-gray {
		color: #999;
	}

	.done-row {
		display: flex;
		align-items: center;
	}

	.done-text {
		color: #27ae60;
		font-size: 30rpx;
		margin-left: 10rpx;
	}

	.btn-group {
		display: flex;
		gap: 20rpx;
		flex-wrap: wrap;
	}

	.action-btn {
		background: #9333ea;
		color: #fff;
		border-radius: 16rpx;
		padding: 16rpx 32rpx;
		font-size: 30rpx;
		border: none;
	}

	.next-btn {
		width: 100%;
		background: #9333ea;
		color: #fff;
		border-radius: 20rpx;
		padding: 22rpx 0;
		font-size: 34rpx;
		margin-top: 20rpx;
		border: none;
	}

	.form-label {
		font-size: 30rpx;
		color: #333;
		margin: 24rpx 0 12rpx;
	}

	.textarea {
		width: 100%;
		min-height: 160rpx;
		background: #f7f8fa;
		border-radius: 20rpx;
		padding: 24rpx;
		font-size: 30rpx;
		box-sizing: border-box;
	}

	.picker-box {
		background: #f7f8fa;
		border-radius: 20rpx;
		padding: 24rpx;
		font-size: 30rpx;
	}

	.radio-group {
		display: flex;
		gap: 24rpx;
		margin: 20rpx 0;
	}

	.radio-item {
		flex: 1;
		text-align: center;
		padding: 24rpx 0;
		border: 2rpx solid #ddd;
		border-radius: 20rpx;
		font-size: 32rpx;
	}

	.radio-item.active {
		background: #27ae60;
		color: #fff;
		border-color: #27ae60;
	}

	.submit-btn {
		width: 100%;
		background: #27ae60;
		color: #fff;
		border-radius: 20rpx;
		padding: 22rpx 0;
		font-size: 34rpx;
		border: none;
		margin-top: 20rpx;
	}

	.tab-bar {
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #fff;
		display: flex;
		padding: 16rpx 0;
		border-top: 1rpx #eee solid;
	}

	.tab-item {
		flex: 1;
		text-align: center;
		font-size: 24rpx;
		color: #999;
	}

	.tab-active {
		color: #9333ea;
	}
</style>