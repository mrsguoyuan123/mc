<template>
	<view class=" page-content">
		<view class="bg-absolute  bg-blue-top">

		</view>
		<view class="bg-relative ">
			<view class="p1">{{message1}}</view>
			<view class="p2 margin-bottom-1">{{message2}}</view>

			<view class="bg-white " v-show="isShow">
				<u--form labelStyle="width:100px;color:#909399;fontSize:.6rem" labelPosition="left" :model="model1"
					:rules="rules" ref="uForm">
					<view class="view-between">
						<u-form-item style="margin-right: 15px;" class="form-50" label="患者姓名" prop="userInfo.name"
							labelWidth="100%" labelPosition="top" labelStyle="{
									    width: '100px',
									    color: '#606266',
									    fontWeight: 'bold'
									  }" ref="item1">
							<u--input v-model="model1.userInfo.name"></u--input>
						</u-form-item>
						<u-form-item class="form-50" label="患者性别" labelWidth="100%" prop="userInfo.sex"
							labelPosition="top" @click="showSex = true; hideKeyboard()" ref="item1">
							<u--input v-model="model1.userInfo.sex" disabled disabledColor="#ffffff"
								placeholder="请选择性别"></u--input>
							<u-icon slot="right" name="arrow-right"></u-icon>
						</u-form-item>
					</view>
					<u-form-item label="年龄" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input type="number" placeholder="前置图标" prefixIcon="order"
							prefixIconStyle="font-size: 22px;color: #909399"></u--input>
					</u-form-item>
					<u-form-item label="手术地区" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input placeholder="前置图标" prefixIcon="map"
							prefixIconStyle="font-size: 22px;color: #909399"></u--input>
					</u-form-item>
					<u-form-item label="手术医院" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input placeholder="前置图标" prefixIcon="coupon"
							prefixIconStyle="font-size: 22px;color: #909399"></u--input>
					</u-form-item>
					<u-form-item label="科室" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input placeholder="前置图标" prefixIcon="home"
							prefixIconStyle="font-size: 22px;color: #909399"></u--input>
					</u-form-item>
					<u-form-item label="手术类别" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input placeholder="前置图标" prefixIcon="gift"
							prefixIconStyle="font-size: 22px;color: #909399"></u--input>
					</u-form-item>
					<u-form-item label="主刀医生" labelWidth="100%" prop="userInfo.name" labelPosition="top" ref="item1">
						<u--input placeholder="前置图标" prefixIcon="man-delete"
							prefixIconStyle="font-size: 22px;color: #909399"></u--input>
					</u-form-item>
				</u--form>
				<u-button type="primary" text="完成注册" @click="handleClick"></u-button>
				<u-action-sheet :show="showSex" :actions="actions" title="请选择性别" @close="showSex = false"
					@select="sexSelect">
				</u-action-sheet>


			</view>
			<view class="bg-white " v-show="!isShow">

				<view class="icon-wrapper">
					<u-icon name="checkmark-circle" color="#19be6b" bold="true" size="50"></u-icon>
				</view>
				<view class="view-h1">
					认证完成
				</view>

				<view class="view-h5">
					欢迎加入，您的术后康复助手已准备就绪，我们将为您建立专属康复计划。
				</view>
				<view class="view-card">

					<view class="view-icon bg-white1 margin-right-10">
						<u-icon  custom-prefix="custom-icon" name="stethoscope" color="#155DFC" bold="true" size="20"></u-icon>
					</view>
					<view class="view-text">
						<view class="view-text1">
							专属服务
						</view>
						<view class="view-text2">
							最专业医学服务已开启
						</view>
					</view>

				</view>
				<u-button type="primary" text="进入首页" @click="routeTo"></u-button>
			</view>
		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
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

			handleClick() {
				//先验证填写内容
				this.isShow = false;
				this.message1 = "资料已就绪";
				this.message2 = "您的档案已审核通过，现在可以进入系统"
			},
			routeTo() {
				uni.showLoading()
				uni.hideLoading()

				let data = {
					title: 'hello',
					id: 1
				}


				uni.navigateTo({
					url: `../index/home?data=` + encodeURIComponent(JSON.stringify(data))
				})
				// uni.navigateTo({
				//        url: 'pages/loginFirst/loginFirst', // 携带参数
				//        success: () => {
				//          console.log('跳转成功');
				//        },
				//        fail: (err) => {
				//          console.error('跳转失败', err);
				//          uni.showToast({ title: '跳转失败，请检查路径', icon: 'none' });
				//        }
				//      });
				// this.$refs.form.validate().then(res => {
				// 	uni.hideLoading()
				// 	console.log('表单数据信息：', res);
				// 	 uni.navigateTo({
				// 	        url: '/pages/loginFirst/loginFirst?id=1&name=test', // 携带参数
				// 	        success: () => {
				// 	          console.log('跳转成功');
				// 	        },
				// 	        fail: (err) => {
				// 	          console.error('跳转失败', err);
				// 	          uni.showToast({ title: '跳转失败，请检查路径', icon: 'none' });
				// 	        }
				// 	      });
				// }).catch(err => {
				// 	uni.hideLoading()
				// 	console.log('表单错误信息：', err);
				// })
			}
		},
		onReady() {
			//如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
			this.$refs.uForm.setRules(this.rules)
		},
	};
</script>

<style>
	.view-between {
		display: flex;
		justify-content: space-between;
	}

	.view-card {
		padding: 1rem;
		border-radius: 10px;
		border: #a0cfff solid 1px;
		margin: 3rem auto;
		background-color: #ecf5ff;
		opacity: .8;
	}






	.view-h1 {
		font-weight: bold;
		/* color: #82848a; */
		font-size: 1.6rem;
		margin: 1rem auto;
		text-align: center;
	}

	.view-h5 {
		text-align: center;
		color: #909399;
		font-size: .8rem;
	}

	.form-50 {
		/* width: 50%;
		float: left; */
	}

	

	.bg-blue-top {
		height: 10rem;

		border-bottom-right-radius: 40px;
		border-bottom-left-radius: 40px;
		background-color: #155DFC;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
	}


</style>