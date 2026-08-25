<template>
	<view class="workbench-page">
		<!-- 顶部消息提示弹窗 -->
		<view v-if="topTip.show" class="top-tip">
			<view class="tip-close" @click="topTip.show=false">✕</view>
			<view class="tip-icon">ℹ️</view>
			<view class="tip-text">{{topTip.text1}}</view>
			<view class="tip-text">{{topTip.text2}}</view>
		</view>

		<!-- 头部标题 + 头像 -->
		<view class="page-header">
			<view>
				<text class="title">客服工作台</text>
				<view class="sub-title">CS WORKBENCH</view>
			</view>
			<view class="avatar-box">
				<text class="avatar-icon">👤</text>
				<view class="dot"></view>
			</view>
		</view>

		<!-- 搜索框 -->
		<view class="search-wrap">
			<view class="search-input">
				<text class="search-icon">🔍</text>
				<input placeholder="搜索患者姓名、意向、手机号..." />
			</view>
		</view>

		<!-- 统计数字卡片组 -->
		<view class="stat-row">
			<view class="stat-item">
				<view class="dot red"></view>
				<view class="badge">3</view>
				<text class="num">8</text>
				<text class="stat-label">高意向</text>
			</view>
			<view class="stat-item">
				<view class="dot orange"></view>
				<view class="badge">5</view>
				<text class="num">15</text>
				<text class="stat-label">待电话沟通</text>
			</view>
			<view class="stat-item">
				<view class="dot green"></view>
				<view class="badge">12</view>
				<text class="num">23</text>
				<text class="stat-label">待信息回复</text>
			</view>
		</view>

		<!-- 沟通记录标题 -->
		<view class="record-head">
			<text class="record-title">沟通记录 (6)</text>
			<text class="tip">实时同步意向</text>
		</view>

		<scroll-view scroll-y class="list-scroll">
			<!-- 患者列表项 -->
			<view class="record-item"  v-for="(item, idx) in list" :key="idx" @click="openStepPanel(item)">
				<view class="left-bar" :class="{active: item.highlight}"></view>
				<view class="short-avatar">{{ item.name.charAt(0) }}</view>
				<view class="info">
					<view class="name-row">
						<text class="name">{{ item.name }}</text>
						<text class="intent-tag" :class="item.intentClass">{{ item.intent }}</text>
						<text class="msg-icon">💬</text>
					</view>
					<view class="desc-line">
						<text class="desc">{{ item.operation }} | {{ item.hospital }}</text>
					</view>
					<view class="sub-desc">
						<text>主刀: {{ item.doctor }} | 地区: {{ item.area }}</text>
					</view>
				</view>
				<view class="btn-group">
					<button class="call-btn" :class="item.btnClass">📞 拨打</button>
					<text class="btn-tip">{{ item.btnTip }}</text>
				</view>
			</view>

			<!-- ========== 多步骤向导面板 ========== -->
			<view v-if="showStepPanel" class="step-panel">
				<!-- 步骤条 -->
				<view class="step-bar">
					<view class="step-item" v-for="(s,si) in stepList" :key="si">
						<view class="step-circle" :class="{done:currentStep>si+1,active:currentStep===si+1}">
							<text v-if="currentStep>si+1">✓</text>
							<text v-else>{{si+1}}</text>
						</view>
						<view class="step-line" :class="{done:currentStep>si+1}"></view>
					</view>
				</view>
				<view class="step-title">{{stepList[currentStep-1].title}}</view>

				<!-- step1 第一步：电话沟通 -->
				<view v-if="currentStep===1" class="step-content">
					<view v-if="callLoading" class="call-loading-box">
						<view class="call-icon">📞</view>
						<text class="call-text">正在为您呼叫患者...</text>
						<text class="call-en">SECURE LINE CONNECTING</text>
					</view>
					<view v-else class="call-connected">
						<view class="call-state-row">
							<text class="state-label">📞 沟通线路状态</text>
							<text class="state-tag">● 线路已接通</text>
						</view>
						<view class="call-row">
							<view class="phone-box">📞 {{form1.phone}}</view>
							<picker :value="form1.statusIndex" :range="callStatusList" @change="onCallStatusChange">
								<view class="picker-btn">{{callStatusList[form1.statusIndex]}}</view>
							</picker>
						</view>
						<view class="reconnect-tip">
							<text>呼叫失败？</text>
							<text class="link">重新连接云端线路</text>
						</view>
					</view>
					<button class="next-btn" @click="nextStep">下一步 ></button>
				</view>

				<!-- step2 第二步：记录信息 -->
				<view v-if="currentStep===2" class="step-content">
					<view class="form-item">
						<text class="label">*用药情况:</text>
						<picker :value="form2.medicIndex" :range="medicOptions"
							@change="e=>form2.medicIndex=e.target.value">
							<view class="picker-input">{{medicOptions[form2.medicIndex]}}</view>
						</picker>
					</view>
					<view class="form-item">
						<text class="label">*身体恢复情况:</text>
						<picker :value="form2.recoverIndex" :range="recoverOptions"
							@change="e=>form2.recoverIndex=e.target.value">
							<view class="picker-input">{{recoverOptions[form2.recoverIndex]}}</view>
						</picker>
					</view>
					<view class="form-item">
						<text class="label">*遵医嘱情况:</text>
						<picker :value="form2.followIndex" :range="followOptions"
							@change="e=>form2.followIndex=e.target.value">
							<view class="picker-input">{{followOptions[form2.followIndex]}}</view>
						</picker>
					</view>
					<view class="form-item">
						<text class="label">备注:</text>
						<textarea class="textarea" v-model="form2.remark" placeholder="如漏服原因、调整用药具体操作等..."></textarea>
						<text class="orange-hint">如身体较差需说明具体症状: 伤口红肿、头晕等</text>
					</view>
					<button class="next-btn" @click="nextStep">下一步 ></button>
				</view>

				<!-- step3 第三步：服务包记录 -->
				<view v-if="currentStep===3" class="step-content">
					<view class="form-item">
						<text class="label">*当前服务包反馈:</text>
						<picker :value="form3.pkgFeedIndex" :range="pkgFeedOptions"
							@change="e=>form3.pkgFeedIndex=e.target.value">
							<view class="picker-input">{{pkgFeedOptions[form3.pkgFeedIndex]}}</view>
						</picker>
					</view>
					<view class="form-item">
						<text class="label">*二次购买意向:</text>
						<picker :value="form3.buyIndex" :range="buyOptions" @change="e=>form3.buyIndex=e.target.value">
							<view class="picker-input">{{buyOptions[form3.buyIndex]}}</view>
						</picker>
					</view>
					<view class="form-item">
						<text class="label">备注:</text>
						<textarea class="textarea" v-model="form3.remark"
							placeholder="备注未使用原因、购意向购买时间、顾虑点等..."></textarea>
					</view>
					<button class="next-btn" @click="nextStep">下一步 ></button>
				</view>

				<!-- step4 第四步：评价满意度 -->
				<view v-if="currentStep===4" class="step-content">
					<view class="eval-box">
						<view class="eval-left">
							<text class="eval-title">电话评价结果</text>
							<text class="eval-sub">患者已通过电话按键/语音确认</text>
						</view>
						<view class="eval-tag">✅ 非常满意</view>
					</view>
					<view class="form-item">
						<text class="label">改进建议:</text>
						<textarea class="textarea" v-model="form4.suggest" placeholder="患者反馈的改进建议..."></textarea>
					</view>
					<view class="form-item">
						<text class="label">其他需求记录:</text>
						<textarea class="textarea" v-model="form4.demand" placeholder="记录患者的其他相关需求..."></textarea>
					</view>
					<view class="btn-row-two">
						<button class="btn-cancel" @click="closeStepPanel">取消</button>
						<button class="btn-save" @click="handleSave">💾 保存</button>
					</view>
					<button class="btn-save-push" @click="handleSavePush">✈️ 保存并推送至沟通群</button>
				</view>
			</view>

			<view class="bottom-space"></view>
		</scroll-view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue'

	// 列表数据
	const list = ref([{
			name: '张三',
			intent: '高意向',
			intentClass: 'tag-high',
			highlight: true,
			operation: '痔疮手术',
			hospital: '浙一医院',
			doctor: '李医生',
			area: '杭州',
			btnClass: 'btn-orange',
			btnTip: '首次触达 (强制记录)'
		},
		{
			name: '李四',
			intent: '中等意向',
			intentClass: 'tag-mid',
			highlight: false,
			operation: '骨折修复',
			hospital: '瑞金医院',
			doctor: '王医生',
			area: '上海',
			btnClass: 'btn-blue',
			btnTip: '二次采购 (拨号已激活)'
		},
		{
			name: '王五',
			intent: '低意向',
			intentClass: 'tag-low',
			highlight: false,
			operation: '支架手术',
			hospital: '协和医院',
			doctor: '陈医生',
			area: '北京',
			btnClass: 'btn-blue',
			btnTip: '待跟进'
		},
	])

	// 步骤条配置
	const stepList = ref([{
			title: "第一步电话沟通"
		},
		{
			title: "第二步记录信息"
		},
		{
			title: "第三步服务包相关记录"
		},
		{
			title: "第四步评价以及满意度记录"
		}
	])
	const showStepPanel = ref(false)
	const currentStep = ref(1)
	const callLoading = ref(false)

	// 顶部提示
	const topTip = reactive({
		show: false,
		text1: "正在通过云端线路发起呼叫...",
		text2: "正在为您生成加密虚拟保护号码"
	})

	// step1 表单
	const callStatusList = ["状态登记", "沟通成功", "沟通失败"]
	const form1 = reactive({
		phone: "0571‑53979574",
		statusIndex: 0
	})
	const onCallStatusChange = (e) => {
		form1.statusIndex = Number(e.target.value)
	}

	// step2 下拉选项
	const medicOptions = ["请选择", "按时用药", "间断用药", "未用药"]
	const recoverOptions = ["请选择", "恢复良好", "一般恢复", "恢复较差"]
	const followOptions = ["请选择", "完全遵守", "部分遵守", "未遵医嘱"]
	const form2 = reactive({
		medicIndex: 0,
		recoverIndex: 0,
		followIndex: 0,
		remark: ""
	})

	// step3
	const pkgFeedOptions = ["请选择", "服务满意", "部分不满意", "很不满意"]
	const buyOptions = ["请选择", "强烈意向", "一般意向", "无意向"]
	const form3 = reactive({
		pkgFeedIndex: 0,
		buyIndex: 0,
		remark: ""
	})

	// step4
	const form4 = reactive({
		suggest: "",
		demand: ""
	})

	// 打开步骤面板，模拟拨号
	const openStepPanel = (item) => {
		showStepPanel.value = true
		currentStep.value = 1
		callLoading.value = true
		topTip.show = true
		// 模拟呼叫接口延时
		setTimeout(() => {
			callLoading.value = false
		}, 2200)
	}
	const closeStepPanel = () => {
		showStepPanel.value = false
		currentStep.value = 1
		topTip.show = false
	}
	const nextStep = () => {
		if (currentStep.value < 4) {
			currentStep.value++
		}
	}
	// 保存
	const handleSave = () => {
		uni.showToast({
			title: "保存成功"
		})
		closeStepPanel()
	}
	// 保存并推送
	const handleSavePush = () => {
		topTip.show = true
		topTip.text1 = "已成功推送至患者沟通群"
		topTip.text2 = "康复进度记录已同步，点击患者详情可查看完整对话。"
		uni.showToast({
			title: "推送完成"
		})
		closeStepPanel()
	}
</script>

<style scoped>
	.workbench-page {
		background-color: #f7f8fa;
		min-height: 100vh;
		padding: 40rpx 30rpx 0;
	}

	/*顶部提示框*/
	.top-tip {
		background: #e8f4ff;
		border-radius: 20rpx;
		padding: 30rpx;
		margin-bottom: 24rpx;
		position: relative;
	}

	.tip-close {
		position: absolute;
		top: 16rpx;
		right: 20rpx;
		font-size: 32rpx;
	}

	.tip-icon {
		font-size: 36rpx;
		position: absolute;
		left: 20rpx;
		top: 32rpx;
	}

	.tip-text {
		display: block;
		font-size: 30rpx;
		color: #0052cc;
		margin-left: 70rpx;
		line-height: 1.8;
	}

	/* 头部 */
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 30rpx;
	}

	.title {
		font-size: 52rpx;
		font-weight: bold;
		color: #111;
	}

	.sub-title {
		font-size: 28rpx;
		color: #888;
		margin-top: 8rpx;
	}

	.avatar-box {
		width: 110rpx;
		height: 110rpx;
		background: #fff;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.avatar-icon {
		font-size: 48rpx;
	}

	.dot {
		width: 18rpx;
		height: 18rpx;
		background: #28c76f;
		border-radius: 50%;
		position: absolute;
		top: 4rpx;
		right: 4rpx;
	}

	/* 搜索 */
	.search-wrap {
		margin-bottom: 40rpx;
	}

	.search-input {
		background: #fff;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		padding: 24rpx 30rpx;
	}

	.search-icon {
		font-size: 32rpx;
		color: #999;
		margin-right: 16rpx;
	}

	.search-input input {
		flex: 1;
		font-size: 32rpx;
	}

	/* 统计卡片 */
	.stat-row {
		display: flex;
		gap: 24rpx;
	}

	.stat-item {
		flex: 1;
		background: #fff;
		border-radius: 24rpx;
		text-align: center;
		padding: 40rpx 10rpx;
		position: relative;
	}

	.dot {
		width: 14rpx;
		height: 14rpx;
		border-radius: 50%;
		position: absolute;
		top: 24rpx;
		left: 30rpx;
	}

	.dot.red {
		background: #f53f3f;
	}

	.dot.orange {
		background: #ff9500;
	}

	.dot.green {
		background: #28c76f;
	}

	.badge {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		background: #f53f3f;
		color: #fff;
		border-radius: 50%;
		width: 44rpx;
		height: 44rpx;
		font-size: 24rpx;
		line-height: 44rpx;
	}

	.num {
		font-size: 52rpx;
		font-weight: bold;
		display: block;
		margin: 10rpx 0;
	}

	.stat-label {
		font-size: 26rpx;
		color: #666;
	}

	/* 沟通记录标题 */
	.record-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 40rpx 0 24rpx;
	}

	.record-title {
		font-size: 40rpx;
		font-weight: bold;
	}

	.tip {
		font-size: 28rpx;
		color: #888;
	}

	/* 列表 */
	.list-scroll {
		height: calc(100vh - 560rpx);
	}

	.record-item {
		background: #fff;
		border-radius: 28rpx;
		display: flex;
		align-items: center;
		padding: 32rpx 24rpx;
		margin-bottom: 24rpx;
		position: relative;
	}

	.left-bar {
		width: 8rpx;
		height: 100rpx;
		background: transparent;
		border-radius: 4rpx;
		position: absolute;
		left: 0;
	}

	.left-bar.active {
		background: #f53f3f;
	}

	.short-avatar {
		width: 110rpx;
		height: 110rpx;
		background: #f1f2f5;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 42rpx;
		color: #444;
		margin-right: 24rpx;
	}

	.info {
		flex: 1;
	}

	.name-row {
		display: flex;
		align-items: center;
		gap: 16rpx;
		margin-bottom: 12rpx;
	}

	.name {
		font-size: 40rpx;
		font-weight: bold;
	}

	.intent-tag {
		font-size: 24rpx;
		padding: 4rpx 14rpx;
		border-radius: 12rpx;
	}

	.tag-high {
		background: #ffe9e9;
		color: #e53935;
	}

	.tag-mid {
		background: #fff3e0;
		color: #f57c00;
	}

	.tag-low {
		background: #f0f1f3;
		color: #666;
	}

	.msg-icon {
		font-size: 36rpx;
	}

	.desc-line {
		font-size: 30rpx;
		color: #333;
		margin-bottom: 8rpx;
	}

	.sub-desc {
		font-size: 26rpx;
		color: #888;
	}

	.btn-group {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.call-btn {
		border: none;
		color: #fff;
		border-radius: 99rpx;
		padding: 16rpx 40rpx;
		font-size: 32rpx;
		margin-bottom: 8rpx;
	}

	.btn-green {
		background: #00a846;
	}

	.btn-blue {
		background: #2478f5;
	}

	.btn-orange {
		background: #ff7800;
	}

	.btn-tip {
		font-size: 22rpx;
		color: #777;
	}

	/* ========== 步骤面板 ========== */
	.step-panel {
		background: #f0f6ff;
		border-radius: 32rpx;
		padding: 40rpx 30rpx;
		margin: 30rpx 0;
	}

	.step-bar {
		display: flex;
		align-items: center;
	}

	.step-item {
		flex: 1;
		display: flex;
		align-items: center;
	}

	.step-circle {
		width: 72rpx;
		height: 72rpx;
		border-radius: 50%;
		border: 3rpx solid #ccd8f0;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
	}

	.step-circle.active {
		border-color: #2478f5;
		background: #fff;
		color: #2478f5;
	}

	.step-circle.done {
		background: #2478f5;
		border-color: #2478f5;
		color: #fff;
	}

	.step-line {
		flex: 1;
		height: 4rpx;
		background: #ccd8f0;
	}

	.step-line.done {
		background: #2478f5;
	}

	.step-title {
		text-align: center;
		font-size: 30rpx;
		color: #2478f5;
		margin: 20rpx 0 30rpx;
	}

	.step-content {}

	/* step1 呼叫中 */
	.call-loading-box {
		text-align: center;
		padding: 60rpx 20rpx;
	}

	.call-icon {
		width: 140rpx;
		height: 140rpx;
		background: #2478f5;
		color: #fff;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 60rpx;
		margin: 0 auto 30rpx;
	}

	.call-text {
		font-size: 36rpx;
		color: #2478f5;
		display: block;
	}

	.call-en {
		font-size: 26rpx;
		color: #6699dd;
		margin-top: 10rpx;
	}

	.call-connected {}

	.call-state-row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 24rpx;
	}

	.state-label {
		font-size: 32rpx;
		color: #0052cc;
	}

	.state-tag {
		font-size: 28rpx;
		color: #28a745;
		background: #e6f9ed;
		padding: 6rpx 16rpx;
		border-radius: 12rpx;
	}

	.call-row {
		display: flex;
		gap: 20rpx;
		align-items: center;
	}

	.phone-box {
		flex: 1;
		border: 3rpx solid #28c76f;
		border-radius: 20rpx;
		padding: 30rpx;
		font-size: 40rpx;
		color: #009933;
		font-weight: bold;
	}

	.picker-btn {
		background: #fff;
		border: 2rpx solid #ccd8f0;
		border-radius: 16rpx;
		padding: 24rpx 30rpx;
		font-size: 32rpx;
	}

	.reconnect-tip {
		margin: 30rpx 0;
		text-align: center;
	}

	.link {
		color: #0052cc;
		font-size: 32rpx;
	}

	/* 表单通用 */
	.form-item {
		margin-bottom: 30rpx;
	}

	.label {
		font-size: 32rpx;
		color: #333;
		display: block;
		margin-bottom: 14rpx;
	}

	.picker-input {
		background: #fff;
		border: 2rpx solid #e4e7ed;
		border-radius: 16rpx;
		padding: 28rpx 24rpx;
		font-size: 32rpx;
	}

	.textarea {
		width: 100%;
		background: #fff;
		border: 2rpx solid #e4e7ed;
		border-radius: 20rpx;
		padding: 24rpx;
		min-height: 160rpx;
		font-size: 30rpx;
		box-sizing: border-box;
	}

	.orange-hint {
		font-size: 26rpx;
		color: #ff7800;
		margin-top: 8rpx;
	}

	.next-btn {
		width: 100%;
		background: #fff;
		border: 2rpx solid #e4e7ed;
		border-radius: 99rpx;
		padding: 28rpx;
		font-size: 34rpx;
		margin-top: 20rpx;
	}

	/* step4 评价 */
	.eval-box {
		background: #e6f9ed;
		border-radius: 20rpx;
		padding: 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.eval-title {
		font-size: 34rpx;
		color: #008833;
		font-weight: bold;
	}

	.eval-sub {
		font-size: 26rpx;
		color: #28a745;
		display: block;
		margin-top: 6rpx;
	}

	.eval-tag {
		background: #fff;
		border: 2rpx solid #28c76f;
		border-radius: 16rpx;
		padding: 14rpx 24rpx;
		font-size: 34rpx;
		font-weight: bold;
		color: #008833;
	}

	.btn-row-two {
		display: flex;
		gap: 24rpx;
		margin-top: 20rpx;
	}

	.btn-cancel {
		flex: 1;
		background: #fff;
		border: 2rpx solid #ddd;
		border-radius: 99rpx;
		padding: 28rpx;
		font-size: 34rpx;
		color: #666;
	}

	.btn-save {
		flex: 1;
		background: #2478f5;
		color: #fff;
		border: none;
		border-radius: 99rpx;
		padding: 28rpx;
		font-size: 34rpx;
	}

	.btn-save-push {
		width: 100%;
		background: #2478f5;
		color: #fff;
		border: none;
		border-radius: 99rpx;
		padding: 28rpx;
		font-size: 34rpx;
		margin-top: 20rpx;
	}

	.bottom-space {
		height: 160rpx;
	}
</style>