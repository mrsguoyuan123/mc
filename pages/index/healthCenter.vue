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
				<u-icon name="info-circle" color="#ff6900" size="12"></u-icon>
				<view class="font-xs font-info margin-left-5">数据监测连续更新 · 术后第 12 天</view>
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
		<view>
			<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between u-flex-column ">
				<view class="view-icon badge-blue-bg badge-circle margin-bottom-1">
					<u-icon name="camera" color="#155DFC" bold="true" size="40"></u-icon>
				</view>
				<view>

					<view class="view-text">
						<view class="view-text1 font-l margin-bottom-1">
							上传今日膳食照片
						</view>
						<view class="view-text2 font-info font-s margin-bottom-1">
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
					<view class="font-blue font-xs font-bold">
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
								bold="true" size="12"></u-icon>
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
							<u-icon name="download_check_select" custom-prefix="custom-icon" color="#155DFC" bold="true"
								size="12"></u-icon>
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
					<view class="button-wrapper u-flex flex-center" @click="showToast()" ref="uToast">
						<u-icon name="navigation"  custom-prefix="custom-icon"
							color="#155DFC" bold="true"></u-icon>
						同步到我的私人医生团队
					</view>
				</view>

				<u-toast ref="uToast" />
				
				


			</view>
		</view>

	</view>
</template>
<script>
	export default {
		data() {
			return {
				show: false,
				list: [{
						type: "default",
						title: "默认主题",
						message: "锦瑟无端五十弦",
						iconUrl: "https://uviewui.com/demo/toast/default.png",
					},
					{
						type: "error",
						icon: false,
						title: "失败主题",
						message: "一弦一柱思华年",
						iconUrl: "https://uviewui.com/demo/toast/error.png",
					},
					{
						type: "success",
						title: "成功主题(带图标)",
						message: "庄生晓梦迷蝴蝶",
						iconUrl: "https://uviewui.com/demo/toast/success.png",
					},
					{
						type: "loading",
						title: "正在加载",
						message: "正在加载",
						iconUrl: "https://uviewui.com/demo/toast/loading.png",
					},
					{
						type: "default",
						title: "结束后跳转标签页",
						message: "此情可待成追忆",
						url: "/pages/componentsB/tag/tag",
						iconUrl: "https://uviewui.com/demo/toast/jump.png",
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
				activeTab: 1,
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

				}],
				activeTab2: 1,
				swiperList: ['integral', 'kefu-ermai', 'coupon', 'gift', 'scan', 'pause-circle', 'wifi', 'email', 'list'],


			};
		},
		methods: {

			clickTab(item) {

				this.activeTab2 = item.id
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
					position:'top',
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
	.button-wrapper {
		border: 2px solid #155DFC;
		color: #155DFC;
		border-radius: 10px;
		padding: 10px;
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

	/* 	.page-heathCenter .u-grid {
		text-align: left;
	} */
</style>