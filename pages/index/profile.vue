<template>
	<view class="page-content page-profile">
		<u-tabbar :value="activeTab" :placeholder="false" @change="name => activeTab = name" :fixed="true"
			activeColor="rgb(21, 93, 252)" inactiveColor="#d2d6dd" :safeAreaInsetBottom="false">
			<u-tabbar-item v-for="item in tabList" :key="item.id" :text="item.name" :icon="item.icon"
				:badge="item.badge" @click="routeTo(item.route)"></u-tabbar-item>
		</u-tabbar>
		<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between" @click="routeTo('records')">
			<view class="u-flex ">
				<view class="view-icon bg-orange margin-right-5">
					<u-icon name="order" color="#ff6900" bold="true" size="40rpx"></u-icon>
				</view>
				<view class="view-text">
					<view class="view-text1 font-l">
						术后病历查询
					</view>
					<view class="view-text2">
						Medical Records
					</view>
				</view>

			</view>
			<view class="">
				<u-icon name="arrow-right" color="#909399" size="20rpx"></u-icon>
			</view>

		</view>

		<view class="radius-15  bg-white card-border card-border-gray ">
			<view>基本信息</view>
			<view>
				<u--form labelStyle="width:100px;color:#909399;fontSize:20rpx" labelPosition="left" :model="model1"
					:rules="rules" ref="uForm">
					<view class="view-between">
						<u-form-item label="姓名" prop="userInfo.name" labelWidth="100%" labelPosition="top" labelStyle="{
									    width: '100px',
									    color: '#606266',
									    fontWeight: 'bold'
									  }" ref="item1">
							<u--input prefixIcon="account" prefixIconStyle="font-size: 22px;color: #447dfd"
								v-model="model1.userInfo.name"></u--input>
						</u-form-item>
						<u-form-item label="性别" labelWidth="100%" prop="userInfo.sex" labelPosition="top"
							@click="showSex = true; hideKeyboard()" ref="item1">
							<u--input prefixIconStyle="font-size: 22px;color: #447dfd" prefixIcon="account"
								v-model="model1.userInfo.sex" disabled disabledColor="#ffffff"
								placeholder="请选择性别"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
					</view>
					<u-form-item label="年龄" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input type="number" placeholder="前置图标" prefixIcon="order"
							prefixIconStyle="font-size: 22px;color: #447dfd"></u--input>
					</u-form-item>
					<u-form-item label="地区" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input placeholder="前置图标" prefixIcon="map"
							prefixIconStyle="font-size: 22px;color: #447dfd"></u--input>
					</u-form-item>


				</u--form>

				<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false"
					@select="sexSelect">
				</u-action-sheet>


			</view>

		</view>
		<view class="radius-15  bg-white card-border card-border-gray ">
			<view>手术信息</view>
			<view>
				<u--form labelStyle="width:100px;color:#909399;fontSize:20rpx" labelPosition="left" :model="model1"
					:rules="rules" ref="uForm">


					<u-form-item label="手术医院" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input placeholder="前置图标" prefixIcon="coupon"
							prefixIconStyle="font-size: 22px;color: #447dfd"></u--input>
					</u-form-item>
					<u-form-item label="科室" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input placeholder="前置图标" prefixIcon="home"
							prefixIconStyle="font-size: 22px;color: #447dfd"></u--input>
					</u-form-item>
					<u-form-item label="手术类别" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input placeholder="前置图标" prefixIcon="gift"
							prefixIconStyle="font-size: 22px;color: #447dfd"></u--input>
					</u-form-item>
					<u-form-item label="主刀医生" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input placeholder="前置图标" prefixIcon="man-delete"
							prefixIconStyle="font-size: 22px;color: #447dfd"></u--input>
					</u-form-item>
				</u--form>

				<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false"
					@select="sexSelect">
				</u-action-sheet>


			</view>

		</view>
		
		<u-button class="width-100"  shape="circle"  hairline="false" @click="logOut()" type="error" text="退出当前账号" ></u-button>

	</view>
</template>



<script>
	export default {
		data() {
			return {
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
				activeTab: 3,
				isShow: true,
				showSex: false,
				message1: "完善专业档案",
				message2: "您好，患者。请填写以下信息以提供精准服务",
				model1: {
					userInfo: {
						name: '',
						sex: '',
					},
				},
				actions: [{
						name: '男',
					},
					{
						name: '女',
					},

				],
				rules: {
					'userInfo.name': {
						type: 'string',
						required: true,
						message: '请填写姓名',
						trigger: ['blur', 'change']
					},
					'userInfo.sex': {
						type: 'string',
						max: 1,
						required: true,
						message: '请选择性别',
						trigger: ['blur', 'change']
					},
				},
				radio: '',
				switchVal: false
			};
		},
		methods: {
			sexSelect(e) {
				this.model1.userInfo.sex = e.name
				this.$refs.uForm.validateField('userInfo.sex')
			},

			routeTo(res) {
				
				let data = {
					title: 'hello',
					id: 1
				}
				console.log(res)
				uni.navigateTo({
					url: `../index/` + res + `?data=` + encodeURIComponent(JSON.stringify(data))
				})

			},
			logOut(res) {
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
			this.$refs.uForm.setRules(this.rules)
		},
	};
</script>

<style scoped lang="scss">
	.page-profile{
		padding-bottom: 70px;
	}
</style>