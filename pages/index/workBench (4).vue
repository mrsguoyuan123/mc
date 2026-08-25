<template>
	<view class="page-workbench page-content">
		<!-- 头部标题 + 头像 -->
		<view class="page-header">
			<view>
				<text class="font-l font-bold">客服工作台</text>
				<view class="margin-top-5 font-m font-info">CS WORKBENCH</view>
			</view>
			<view class="avatar-box">
				<text class="avatar-icon">
					<u-icon name="account" color="#909399" bold="true" size="50rpx"></u-icon>
				</text>
				<view class="dot"></view>
			</view>
		</view>

		<!-- 搜索框 -->
		<view class="margin-30 ">
			<u--input placeholder="搜索患者姓名、意向、手机号" shape="" prefixIcon="search"
				prefixIconStyle="font-size: 22px;color: #909399"></u--input>
		</view>
		
		<!-- 统计数字卡片组 -->
		<view class="stat-row">
			<view class="stat-item">
				<view class="dot red"></view>
				<u-badge class="badge" bgColor="#f53f3f" max="99" value="3"></u-badge>
				<text class="num">8</text>
				<text class="stat-label">高意向</text>
			</view>
			<view class="stat-item">
				<view class="dot orange"></view>
				<u-badge class="badge" bgColor="#f53f3f" max="99" value="8"></u-badge>
				<text class="num">15</text>
				<text class="stat-label">待电话沟通</text>
			</view>
			<view class="stat-item">
				<view class="dot green"></view>
				<u-badge class="badge" bgColor="#f53f3f" max="99" value="13"></u-badge>
				<text class="num">23</text>
				<text class="stat-label">待信息回复</text>
			</view>
		</view>

		<!-- 沟通记录标题 -->
		<view class="record-head">
			<text class="font-m font-bold">沟通记录 (6)</text>
			<text class="tip font-s font-info">实时同步意向</text>
		</view>

		<!-- 沟通记录列表 -->
		<scroll-view scroll-y class="list-scroll">
			<view class="record-item" v-for="(item, idx) in list" :key="idx">
				<!-- 左侧竖条标记 -->
				<view class="left-bar" :class="{active: item.highlight}"></view>
				<!-- 头像缩写 -->
				<view class="short-avatar">{{ item.name.charAt(0) }}</view>
				<view class="info">
					<view class="name-row">
						<text class="name">{{ item.name }}</text>
						<view class="intent-tag-wrapper">
							<text class="intent-tag" :class="item.intentClass">{{ item.intent }}</text>
						</view>
						<text class="custom-icon custom-icon-message" style="font-size:45rpx;color:#1ec76f;"></text>
					</view>
					<view class="desc-line">
						<text class="desc">{{ item.operation }} | {{ item.hospital }}</text>
					</view>
					<view class="sub-desc">
						<text>主刀: {{ item.doctor }} | 地区: {{ item.area }}</text>
					</view>
				</view>
				<view class="btn-group">

					<u-button class="call-btn" :class="item.btnClass" type="primary" icon="phone-fill"
						text="拨打"></u-button>
					<!-- <button icon="phone" class="call-btn" :class="item.btnClass">
						
						</button> -->
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
			
		</scroll-view>
	</view>
</template>

<script setup>
	const list = [{
			name: '张三',
			intent: '高意向',
			intentClass: 'tag-high',
			highlight: true,
			operation: '痔疮手术',
			hospital: '浙一医院',
			doctor: '李医生',
			area: '杭州',
			btnClass: 'btn-green',
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
		{
			name: '赵六',
			intent: '高意向',
			intentClass: 'tag-high',
			highlight: true,
			operation: '阑尾切除',
			hospital: '浙二医院',
			doctor: '张医生',
			area: '杭州',
			btnClass: 'btn-green',
			btnTip: '首次触达 (强制记录)'
		}
	]
</script>

<style scoped>
	/* 头部 */
	.page-header {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		margin-bottom: 30rpx;
	}

	.title {
		/* font-size:52rpx; */
		/* font-weight:bold; */
		/* color:#111; */
	}

	.sub-title {
		font-size: 28rpx;
		color: #888;
		margin-top: 8rpx;
	}

	.avatar-box {
		/*  width:110rpx;
  height:110rpx; */
		background: #fff;
		padding: 30rpx;
		border-radius: 24rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
	}

	.dot {
		width: 18rpx;
		height: 18rpx;
		background: #28c76f;
		border-radius: 50%;

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
		padding: 30rpx 10rpx;
		position: relative;
	}

	.stat-row .dot {
		position: absolute;
		top: 40rpx;
		left: 50%;
		transform: translate(-50%, -50%);
	}


	.avatar-box .dot {
		top: -4rpx;
		right: -4rpx;
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

	.page-workbench .badge {
		position: absolute;
		top: 0;
		right: -25%;
		padding: 10rpx 20rpx;
		transform: translate(-50%, -50%);
		z-index: 999;
		/* background: #f53f3f;
		color: #fff;
		border-radius: 100%;
		 */
		/* font-size: 24rpx; */
		/* line-height: 44rpx; */
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

	/* 列表项 */
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
		width: 80rpx;
		height: 80rpx;
		background: #f6f7f8;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 20rpx;
		color: #909399;
		margin-right: 24rpx;
	}

	.info {
		flex: 1;
		margin-right: 24rpx;
		/* border: 1px solid ; */
	}

	.name-row {
		display: flex;
		align-items: center;
		gap: 16rpx;
		margin-bottom: 12rpx;
	}

	.name {
		font-size: 30rpx;
		font-weight: bold;
	}
.intent-tag-wrapper{
	flex: 1;
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
		font-size: 20rpx;
		color: #333;
		margin-bottom: 8rpx;
	}

	.sub-desc {
		font-size: 20rpx;
		color: #909399;
	}

	.btn-group {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 180rpx;
	}

	.page-workbench .call-btn {
		border: none;
		color: #fff;
		border-radius: 20rpx;
		padding: 16rpx 40rpx;
		font-size: 32rpx;
		margin-bottom: 8rpx;
	}

	.page-workbench .btn-green {
		background: #00a63e;
	}

	.page-workbench .btn-blue {
		background: #155dfc;
	}

	.page-workbench .btn-gray {
		background: #f3f4f6;
	}

	.page-workbench .btn-tip {
		font-size: 18rpx;
		color: #909399;
		transform: scale(0.8);
	}

	.bottom-space {
		height: 160rpx;
	}
</style>