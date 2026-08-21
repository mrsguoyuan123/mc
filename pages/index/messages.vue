<template>
	<view class="page-content page-message">
		<u-tabbar :value="activeTab" :placeholder="false" @change="id => activeTab = id" :fixed="true"
			activeColor="rgb(21, 93, 252)" inactiveColor="#d2d6dd" :safeAreaInsetBottom="false">
			<u-tabbar-item v-for="item in tabList" :key="item.id" :text="item.name" :icon="item.icon"
				:badge="item.badge" @click="routeTo(item.route)"></u-tabbar-item>
		</u-tabbar>
		<view class=" u-flex space-between align-center " style="margin-bottom: 1rem;">
			<view>
				<view class="view-text1 font-l">
					沟通记录
				</view>
				<view class="view-text2">
					MESSAGES
				</view>
			</view>
			<view>
				<view class="badge-bg  badge-blue-bg">
					术后康复专属通道
				</view>
			</view>
		</view>
		<view class="margin-bottom-1">
			<u--input placeholder="搜索消息或通知" shape="circle" prefixIcon="search"
				prefixIconStyle="font-size: 22px;color: #909399"></u--input>
		</view>
		<view class="margin-bottom-1">
			<u-tabs @click="tabClick" :list="list1" lineWidth="20" lineHeight="7" lineColor="#155DFC" :activeStyle="{
		        color: '#303133',
		        fontWeight: 'bold',
		        transform: 'scale(1.05)'
		    }" :inactiveStyle="{
		        color: '#606266',
		        transform: 'scale(1)'
		    }" itemStyle="padding-left: 15px; padding-right: 15px; padding-bottom:5px;height: 34px;">
			</u-tabs>

		</view>
		<!-- chatHistory: [{
				id: "group-1",
				name: "健康管理团队",
				lastMsg: "张先生，您的手术切口照片已收到，主刀团队正在审核，稍后给您回复。",
				time: "10:05",
				unread: true,
				unreadCount: 1,
				type: "human",
				status: "在线"
			}, -->
		<view v-for="(item,index) in chatHistory" class="radius-15 card-top bg-white card-border card-border-gray">
			<view class=" massage-list">
				<view class="massage-icon-left view-icon badge-blue-bg" v-if="item.type=='human'">
					<u-icon name="Headset1" color="#155DFC" custom-prefix="custom-icon" bold="true" size="25"></u-icon>
				</view>
				<view class="massage-icon-left view-icon badge-orange-bg" v-else-if="item.type=='system'">
					<u-icon name="order" color="#ff6900" bold="true" size="25"></u-icon>
				</view>
				<view class="massage-content">
					<!-- 内容 -->
					<view class="view-text">
						<view class="view-text1 font-l">
							{{item.name}}
						</view>
						<u--text size="12" class="font-info font-xs" :lines="1" :text="item.lastMsg"></u--text>
					</view>
					<!-- 时间  badge -->
					<view class="massage-time u-flex align-center space-between  u-flex-column">
						<view class="font-info font-xs">{{item.time}}</view>
						<view>
							<u-badge numberType="limit" max="99" :value="item.unreadCount"></u-badge>
						</view>
					</view>
				</view>
				<view class="massage-icon-right">
					<u-icon name="arrow-right" color="#909399" size="16"></u-icon>
				</view>

			</view>

		</view>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				current: 0,
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
				activeTab: 2,
				list1: [{
					name: '全部',

					badge: {
						value: 5,
					}
				}, {
					name: '健康管理团队',
					type: "human",

				}, {
					name: '系统通知',
					type: "system",

				}],
				chatHistory: [{
						id: "group-1",
						name: "健康管理团队",
						lastMsg: "张先生，您的手术切口照片已收到，主刀团队正在审核，稍后给您回复。",
						time: "10:05",
						unread: true,
						unreadCount: 1,
						type: "human",
						status: "在线"
					},
					{
						id: "sys-1",
						name: "服务到期续费",
						lastMsg: "您的术后康复尊享包还有3天到期，为避免服务中断，请及时续费。",
						time: "昨天",
						unread: true,
						unreadCount: 1,
						type: "system",
						status: ""
					},
					{
						id: "sys-2",
						name: "宣教资料更新",
						lastMsg: "《心血管术后饮食与活动指南》已下发，请您查收并按要求执行。",
						time: "09:30",
						unread: true,
						unreadCount: 1,
						type: "system",
						status: ""
					},
					{
						id: "sys-3",
						name: "系统更新公告",
						lastMsg: "V2.4.0版本已上线，优化了多端响应速度及专家团队回复效率。",
						time: "周一",
						unread: false,
						unreadCount: 0,
						type: "system",
						status: ""
					}
				]
			};
		},
		methods: {

			tabClick(item) {
				console.log('item', item);
			},
			getIconName(baseName, index) {
				// console.log((baseName,index))
				// console.log((baseName,index))
				// 如果当前选中，使用 fill 结尾的实心图标，否则使用空心图标
				if (this.current === index) {
					console.log(baseName)
					return `${baseName}-fill`;
				}
				return baseName;
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
	.page-message .view-text {
		/* width: 12rem; */
		overflow: hidden;
	}

	.page-message .bg-white {
		padding: 1rem;
	}
</style>