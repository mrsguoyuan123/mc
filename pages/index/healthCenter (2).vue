<template>
	<view>
		<view>
			<u-toast ref="uToast"></u-toast>
			<u-cell-group title-bg-color="rgb(243, 244, 246)">
				<u-cell :titleStyle="{fontWeight: 500}" :title="item.title" v-for="(item, index) in list"
					:key="index" isLink :icon="item.iconUrl" @click="showToast(item)">
				</u-cell>
			</u-cell-group>
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
				console.log(item)
				this.activeTab2 = item.id
			},
			showToast(params) {
				this.$refs.uToast.show({
					...params,
					complete() {
						params.url &&
							uni.navigateTo({
								url: params.url,
							});
					},
				});
			},
			routeTo(res) {

				uni.showLoading()
				uni.hideLoading()

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