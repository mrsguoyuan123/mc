<template>
	<view class="page-content page-heathCenter">
		<!-- 		<swiper :indicator-dots="true" class="swiper">
			<swiper-item>
				<u-grid :border="true">
					<u-grid-item :customStyle="{width:420+'rpx',height:220+'rpx'}" v-for="(item, index) in swiperList"
						:index="index" :key="index">
						<u-icon :customStyle="{paddingTop:20+'rpx'}" :name="item" :size="22"></u-icon>
						<text class="grid-text">{{ '宫格' + (index + 1) }}</text>
					</u-grid-item>
				</u-grid>
			</swiper-item>

		</swiper> -->
		<u-tabbar :value="activeTab" :placeholder="false" @change="name => activeTab = name" :fixed="true"
			activeColor="rgb(21, 93, 252)" inactiveColor="#d2d6dd" :safeAreaInsetBottom="false">
			<u-tabbar-item v-for="item in tabList" :key="item.id" :text="item.name" :icon="item.icon"
				:badge="item.badge" @click="routeTo(item.route)"></u-tabbar-item>
		</u-tabbar>

		<view class="margin-bottom-1">
			<view class="font-bold font-xl margin-bottom-5">健康管理中心</view>
			<view class="u-flex ">
				<u-icon name="info-circle" color="#ff6900" size="0.6rem"></u-icon>
				<view class="font-s font-info margin-left-5">数据监测连续更新 · 术后第 12 天</view>
			</view>

		</view>
		<view class="tab-scroll margin-bottom-1">

			<swiper :indicator-dots="true" class="swiper">
				<swiper-item>
					<view class="u-flex space-between align-center tab-wrapper">
						<view @click="clickTab(item)" :class="activeTab2 == item.id?'activeTab':''"
							v-for="item in tabList2" :key="item.id"
							class="tab-icons radius-1 card-border-gray u-flex space-between align-center u-flex-column">
							<u-icon :name="item.icon" :color="activeTab2 == item.id?'white':'#909399'"
								custom-prefix="custom-icon" size="25"></u-icon>
							<view class="font-info font-s font-bold tab-font ">
								{{item.name}}
							</view>
						</view>
					</view>
				</swiper-item>
			</swiper>

		</view>
		<!-- 饮食分析 -->
		<view v-if="activeTab2 == 1">
			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="view-icon badge-blue-bg badge-circle margin-bottom-1">
					<u-icon name="camera" color="#155DFC" bold="true" size="40"></u-icon>
				</view>
				<view>

					<view class="view-text">
						<view class="view-text1 font-l margin-bottom-1 text-center ">
							上传今日膳食照片
						</view>
						<view class="view-text2 font-info font-s margin-bottom-1 text-center ">
							实时拍照分析食物营养与食物含量分析
						</view>
					</view>

				</view>
				<view class="">
					<u-button style="padding: 0 40px;" color="#155DFC" type="primary" text="立即拍照/上传"
						shape="circle"></u-button>
				</view>

			</view>

			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="header-text">
					<view class="header-icon ">
						<view class="header-name font-bold">
							饮食分析报告
						</view>
					</view>
					<view class="font-green font-xs font-bold">
						今日累计
					</view>
				</view>
				<view class="float-wrapper">
					<view class="u-float-left u-width-50">
						<view class="font-xs font-info margin-bottom-5">总热量</view>
						<view class="u-flex  column-center">
							<view class="font-xl font-bold  margin-right-5">546</view>
							<view class="font-s font-info  ">kal</view>
						</view>
					</view>
					<view class="u-float-left u-width-50">
						<view class="font-xs font-info margin-bottom-5">蛋白质</view>
						<view class="u-flex  column-center">
							<view class="font-xl font-bold  margin-right-5">546</view>
							<view class="font-s font-info  ">g</view>
						</view>
					</view>
				</view>
				<view class="radius-15 bg-gray gray-content">
					<view class="font-bold font-l margin-bottom-1">营养占比分析</view>
					<view class="u-flex  space-around">
						<view class="badge-blue-bg radius-1 padding-15">
							<view class="font-xl font-bold">24.4</view>
							<view class="font-xs font-info">蛋白质（g)</view>
						</view>
						<view class="badge-orange-bg radius-1 padding-15">
							<view class="font-xl font-bold">24.4</view>
							<view class="font-xs font-info">碳物（g)</view>
						</view>
						<view class="badge-green-bg radius-1 padding-15">
							<view class="font-xl font-bold">24.4</view>
							<view class="font-xs font-info">维生素</view>
						</view>
					</view>
					<view class="radius-1 bg-white margin-top-1 padding-1">
						<view class="float-wrapper ">
							<u-icon class="u-float-left" name="trending-up" custom-prefix="custom-icon" color="#009689"
								bold="true" size="0.6rem"></u-icon>
							<text class=" font-green font-xs margin-left-5">
								医学专业评估：
							</text>
							<text class="  font-xs margin-left-5">
								当前膳食结构符合术后康复标准，蛋白质占比 24% 处于理想区间。
							</text>
						</view>

					</view>
					<view class="radius-1 bg-white margin-top-1 padding-1 border-blue bg-linear-blue">
						<view class="u-flex space-start">
							<u-icon name="checkmark-circle" color="#155DFC" bold="true" size="1rem"></u-icon>
							<text class=" font-bold font-s margin-left-5">
								本周饮食汇总
							</text>
						</view>
						<view class="  font-xs margin-top-10">
							本周平均热量摄入符合建议。建议适当增加深海鱼类摄入。
						</view>
						<view class="font-blue font-xs margin-top-10 font-bold">
							查看详细报告 →
						</view>
					</view>

				</view>
			</view>
		</view>
		<!-- 运动处方 -->
		<view v-else-if="activeTab2 == 2">

			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="header-text">
					<view class="header-icon ">
						<view class="header-name font-bold">
							今日运动方案
						</view>
					</view>
					<view class="font-blue font-xs font-bold">
						术后康复期 (第2阶段)
					</view>
				</view>
				<view :class="item.completed?'activeCheckbox':''" @click="toggleTask(item.id)" v-for="item in useState"
					:key="item.id"
					class="u-flex space-between radius-1 margin-bottom-1 badge-gray-bg bg-gray padding-1 healthCheckbox">
					<view class="u-flex align-center">
						<view v-if="!item.completed">
							<u-icon name="checkmark-circle" color="#909399" size="20"></u-icon>
						</view>
						<view v-else>
							<u-icon name="checkmark-circle-fill" color="#155dfc" size="20"></u-icon>
						</view>
						<view class="margin-left-5">
							<view class="font-bold  font-m font-gray-dark">{{item.name}}</view>
							<view class="font-info font-s">{{item.duration}}</view>
						</view>

					</view>
					<view class="badge-white badge">{{item.intensity}}</view>
				</view>

			</view>
			<view class="radius-1 bg-white margin-top-1 padding-1 border-blue bg-linear-purple">
				<view class="u-flex space-start">
					<u-icon name="trending-up" custom-prefix="custom-icon" color="#155DFC" bold="true"
						size="0.8rem"></u-icon>
					<text class=" font-bold font-m margin-left-5">
						运动建议
					</text>
				</view>
				<view class="font-xs margin-top-10">
					今日运动心率平稳，建议保持当前强度。若感到胸闷或气促请立即停止。
				</view>
			</view>

		</view>
		<!-- 体重动态 -->
		<view v-else-if="activeTab2 == 3">
			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="header-text">
					<view class="header-icon ">
						<view class="header-name font-bold">
							今日体重记录
						</view>
					</view>

				</view>
				<view class="u-flex space-between align-center weight-wrapper">
					<u--input placeholder="请输入体重" type="number" class="margin-right-5"></u--input>
					<view class="font-bold font-info">kg</view>
				</view>
				<view class="button-wrapper-fill u-flex flex-center margin-top-1">
					保存记录
				</view>

			</view>
			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="header-text">
					<view class="header-icon ">
						<view class="header-name font-bold">
							体重趋势
						</view>
					</view>
					<view class="font-info font-xs ">
						近7天
					</view>
				</view>
				<view class="header-text">
					<view class="header-icon ">
						<view class=" font-m">
							当前体重
						</view>
					</view>
					<view class="font-bold font-xl ">
						65kg
					</view>
				</view>
				<view class="radius-1 badge-green-bg  padding-1 card-green">
					<view class="u-flex space-start">
						<u-icon name="trending-down" custom-prefix="custom-icon" color="#009689" bold="true"
							size="20"></u-icon>
						<text class=" font-green font-l margin-left-5">
							较初始减重 1.7 kg
						</text>

					</view>

				</view>

			</view>

			<view class="radius-1 bg-white margin-top-1 padding-1 border-orange bg-linear-orange">
				<view class="u-flex space-start">
					<u-icon name="info-circle" color="#ff6900" bold="true" size="1rem"></u-icon>
					<text class=" font-bold font-s margin-left-5">
						医学监测预警
					</text>
				</view>
				<view class="  font-xs margin-top-10">
					体重控制处于安全区间，建议维持当前方案。
				</view>
			</view>

		</view>
		<!-- 血压血糖 -->
		<view v-else-if="activeTab2 == 4">
			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="header-text">
					<view class="header-icon ">
						<view class="header-name font-bold">
							今日数据录入
						</view>
					</view>

				</view>
				<view class="input-wrapper margin-bottom-5 font-gray-dark">血压 (mmHg)</view>
				<view class="u-flex space-between align-center weight-wrapper">
					<u--input placeholder="收缩压" type="number"></u--input>
					<view style="margin: 0 5px;">/</view>
					<u--input placeholder="舒张压" type="number"></u--input>
				</view>
				<view class="input-wrapper margin-bottom-5 font-gray-dark margin-top-1">血糖 (mmol/L)</view>
				<view class="u-flex space-between align-center weight-wrapper">
					<u--input placeholder="请输入血糖" type="number"></u--input>
				</view>
				<view class="button-wrapper-fill u-flex flex-center margin-top-1">
					保存数据
				</view>

			</view>
			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="header-text">
					<view class="header-icon ">
						<view class="header-name font-bold">
							今日数据对比
						</view>
					</view>

				</view>
				<view class="u-flex  space-between card-spe">
					<view class="badge-blue-bg radius-1 padding-15 margin-right-1">
						<view class="u-flex  space-start ">
							<u-icon name="activity" custom-prefix="custom-icon" color="#155DFC" size="1rem"></u-icon>
							<view class=" font-s margin-left-5">
								血压
							</view>
						</view>
						<view class="font-xl font-bold">24.4</view>
						<view class="font-xs  font-green font-bold">正常范围</view>
					</view>

					<view class="badge-green-bg radius-1 padding-15">
						<view class="u-flex  space-start ">
							<u-icon name="activity" custom-prefix="custom-icon" color="#00a63e" size="1rem"></u-icon>
							<view class=" font-s margin-left-5">
								血糖
							</view>
						</view>
						<view class="font-xl font-bold">24.4</view>
						<view class="font-xs  font-green font-bold">控制良好</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 睡眠管理 -->
		<view v-else-if="activeTab2 == 5">
			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="header-text">
					<view class="header-icon ">
						<view class="font-l font-bold">
							今日用药
						</view>
					</view>
					<view class="font-blue font-bold font-xs ">
						+添加
					</view>
				</view>

				<view class="card-list  radius-1 card-top badge-green-bg card-border border-green">
					<view class=" massage-list">
						<view class="massage-icon-left massage-icon-left1 view-icon  margin-right-10 ">
							<u-icon name="check-circle" custom-prefix="custom-icon" color="white" size="25"></u-icon>
						</view>


						<view class="massage-content">
							<!-- 内容 -->
							<view class="view-text">
								<view class=" font-m margin-bottom-5 font-black font-bold">
									阿司匹林肠溶片
								</view>
								<u--text size="12" class="font-info font-xs" :lines="1" text="100mg · 早餐后"></u--text>
							</view>

						</view>


					</view>

				</view>
				<view class="card-list  radius-1 card-top margin-top-1 card-border-gray no-shadow ">
					<view class=" massage-list">
						<view
							class="massage-icon-left massage-icon-left2   massage-icon-left2 view-icon  margin-right-10 ">
							<u-icon name="PillOutline" custom-prefix="custom-icon" color="white" size="25"></u-icon>
						</view>


						<view class="massage-content">
							<!-- 内容 -->
							<view class="view-text">
								<view class=" font-m margin-bottom-5 font-black font-bold">
									阿托伐他汀钙片
								</view>
								<u--text size="12" class="font-info font-xs" :lines="1" text="100mg · 早餐后"></u--text>
							</view>

						</view>
						<view class="massage-icon-right font-blue font-bold font-xs">
							标记已服用
						</view>

					</view>

				</view>

			</view>
			<view class="radius-1 bg-white margin-top-1 padding-1 border-pink bg-linear-pink">
				<view class="u-flex space-start">

					<u-icon name="PillOutline" custom-prefix="custom-icon" color="#9810fa" size="1rem"></u-icon>
					<text class=" font-bold font-s margin-left-5">
						用药提醒设置
					</text>
				</view>
				<view class="  font-xs margin-top-10">
					系统将在每日 8:00 和 19:00 推送用药提醒。
				</view>
				<view class="font-blue font-xs margin-top-10 font-bold">
					编辑提醒时间 →
				</view>
			</view>

		</view>
		<view v-else-if="activeTab2 == 6">
			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="radius-1   padding-1  bg-gray-dark gray-content width-100-2rem">
					<view class="  font-m margin-bottom-1">
						睡眠评估
					</view>
					<view class="u-flex space-start">
						<u-icon name="check-circle" custom-prefix="custom-icon" color="#00a63e" size="1rem"></u-icon>
						<text class="  font-xs margin-left-5">
							睡眠质量良好
						</text>
					</view>


				</view>
				<view class="font-blue font-xs margin-top-10 font-bold width-100">
					记录今日睡眠 →
				</view>
			</view>
			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="header-text">
					<view class="header-icon ">
						<view class="font-m font-bold">
							心理健康内容
						</view>
					</view>

				</view>

				<view class="card-list  radius-1 card-top  card-border card-border-gray no-shadow bg-gray">
					<view class=" massage-list">

						<view class="massage-icon-left view-icon badge-blue-bg">
							<u-icon name="file-text" color="#155DFC" bold="true" size="25"></u-icon>
						</view>

						<view class="massage-content">
							<!-- 内容 -->
							<view class="view-text">
								<view class=" font-m margin-bottom-5 font-black font-bold">
									术后焦虑怎么办？专业医生为您解答
								</view>
								<view class="u-flex space-start">
									<view class="badge-bg  badge-blue-bg">
											文章
										</view>
										<u--text size="12" class="font-info font-xs" :lines="1" text="5分钟"></u--text>
									
								</view>
							</view>

						</view>


					</view>

				</view>
				<view class="card-list margin-top-1  radius-1 card-top  card-border card-border-gray no-shadow bg-gray">
					<view class=" massage-list">
						<view class="massage-icon-left view-icon badge-blue-bg">
							<u-icon name="heart" color="#155DFC" bold="true" size="25"></u-icon>
						</view>


						<view class="massage-content">
							<!-- 内容 -->
							<view class="view-text">
								<view class=" font-m margin-bottom-5 font-black font-bold">
									康复期的正念冥想练习
								</view>
								<view class="u-flex space-start">
									<view class="badge-bg  badge-blue-bg">
											视频
										</view>
										<u--text size="12" class="font-info font-xs" :lines="1" text="5分钟"></u--text>
									
								</view>
							</view>

						</view>


					</view>

				</view>


			</view>

		</view>
		<view v-show="activeTab2 != 5" class="button-wrapper u-flex flex-center" @click="showToast()" ref="uToast">
			<u-icon name="navigation" custom-prefix="custom-icon" color="#155DFC" bold="true"></u-icon>
			同步到我的私人医生团队
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				show: false,
				activeTab: 1,
				activeTab2: 6,
				useState: [{
						id: 1,
						name: "有氧步行 (散步)",
						duration: "30分钟",
						completed: true,
						intensity: "轻度"
					},
					{
						id: 2,
						name: "呼吸功能训练",
						duration: "10分钟",
						completed: true,
						intensity: "低强度"
					},
					{
						id: 3,
						name: "上肢柔韧性练习",
						duration: "15分钟",
						completed: false,
						intensity: "轻度"
					},
				],
				tabList: [{
					id: 1,
					name: "首页",
					icon: "home",
					badge: "",
					route: "home"
				}, {
					id: 2,
					name: "健康",
					icon: "heart",
					badge: "",
					route: "healthCenter"
				}, {
					id: 3,
					name: "消息",
					icon: "chat",
					badge: "3",
					route: "messages"
				}, {
					id: 4,
					name: "我的",
					icon: "account",
					badge: "",
					route: "profile"
				}],

				tabList2: [{
					id: 1,
					name: "饮食分析",
					icon: "camera",
				}, {
					id: 2,
					name: "运动处方",
					icon: "camera",
					badge: "",
					route: "healthCenter"
				}, {
					id: 3,
					name: "体重动态",
					icon: "scale",
					badge: "3",
					route: "messages"
				}, {
					id: 4,
					name: "血压血糖",
					icon: "activity",
					badge: "",
					route: "profile"
				}, {
					id: 5,
					name: "用药提醒",
					icon: "PillOutline",

				}, {
					id: 6,
					name: "睡眠管理",
					icon: "moon",

				}],


			};
		},
		methods: {
			toggleTask(id) {
				console.log(id)
				const newState = this.useState.map((item, index) => {
					// 处理逻辑
					if (item.id == id) {
						item.completed = !item.completed
					}

					return item;
				});
				console.log(newState)
				// this.useState.map(t => t.id === id ? { ...t, completed: !t.completed } : t))

			},
			clickTab(item) {
				this.activeTab2 = item.id;
				console.log(this.activeTab2)
			},
			showToast(params) {

				// this.$refs.uToast.show({
				// 	...params,
				// 	complete() {
				// 		params.url &&uni.navigateTo({
				// 				url: params.url,
				// 			});
				// 	},
				// });
				this.$refs.uToast.show({
					title: '',
					position: 'top',
					message: "数据已加密发送至我的私人医生团队,已生成健康卡片同步至聊天窗口",
					// 如果不传此type参数，默认为default，也可以手动写上 type: 'default'
					type: 'success',
					// 如果不需要图标，请设置为false
					icon: 'checkmark-circle'
				})
				// this.$refs.uToast.show({
				// 	title: '操作成功',
				// 	url: '/pages/user/index',
				// 	params: {
				// 		id: 1,
				// 		menu: 3
				// 	}
				// })
			},
			routeTo(res) {

				let data = {
					title: 'hello',
					id: 1
				}


				uni.navigateTo({
					url: `../index/` + res + `?data=` + encodeURIComponent(JSON.stringify(data))
				})

			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。

		},
	};
</script>


<style>
	.page-heathCenter .badge {
		height: max-content;
	}

	.healthCheckbox {
		width: calc(100% - 2rem);
		border: 1px solid #f3f4f6;
	}

	.page-heathCenter .button-wrapper {
		border: 2px solid #155DFC;
		color: #155DFC;
		border-radius: 10px;
		padding: 10px;
	}

	.page-heathCenter .button-wrapper-fill {
		background-color: #155DFC;
		border-radius: 10px;
		padding: 10px;
		color: white;
		width: calc(100% - 1rem);
	}

	.page-heathCenter .header-text {
		width: 100%;
		margin: 0 0 1rem 0;
	}

	.page-heathCenter {
		/* width: 100%; */
	}

	.page-heathCenter .float-wrapper .u-icon {
		position: relative;
		top: 6px;

	}

	.weight-wrapper {
		width: 100%;
	}

	/* .weight-wrapper .u-input{
		width: calc(100% - 30px);
		
	} */

	/* 	.page-heathCenter .u-grid {
		text-align: left;
	} */
</style>