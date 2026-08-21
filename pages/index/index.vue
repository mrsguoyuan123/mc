<template>
	<view class="login-container">

	<view class="login-card ">
		<view class="card-header">
		  <span>术后康复管理</span>
		</view>
		<view class="text-center">
		  <span class="card-body">连接医生与患者的康复桥梁</span>
		
		</view>
		<u-form :modelValue="formData" ref="form">
			<u-form-item name="username" label="账号">
				<u-input v-model="formData.username" type="text" placeholder="账号/手机号" />
			</u-form-item>
			<u-form-item name="username" label="密码">
				<u-input v-model="formData.password" type="text" placeholder="请输入密码" />
			</u-form-item>
			<button class="button-login" type="primary" @click="handleLogin" style="width: 100%">登录</button>
			<button class="button-login button-white" type="default" @click="handleLogin" style="width: 100%">手机号一键登录</button>
			
			<u-form-item>
				
                 <view style="margin-top: .5rem;">
					 <!-- 	<u-form-item >
					 						<uni-data-checkbox v-model="baseFormData.sex" :localdata="sexs" />
					 					</u-form-item> -->
					<u-radio-group v-model="formData.checkbox">
						
						<u-radio shape="circle">
							<span class="size-xs font-info" >我已阅读并同意</span>
							<text class="size-xs font-primary" >《用户服务协议》</text>
							<span class="size-xs font-info" >与</span>
							<span class="size-xs font-primary" >《隐私条款》</span>
							
						</u-radio>
					</u-radio-group>
					
				 </view>
    
	 
			     
			</u-form-item>
		</u-form>
			
				
	</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			formData:{
				
				username:'',
				password:'',
				checkbox:false,
				
			},
			rules: {
				age: {
					rules: [{
						required: true,
						errorMessage: '请输入年龄',
					},{
						validateFunction: (rule, value, data, callback) => {
							// 异步需要返回 Promise 对象
							return new Promise((resolve, reject) => {
								setTimeout(() => {
									if (value > 10 ) {
										// 通过返回 resolve
										resolve()
									} else {
										// 不通过返回 reject(new Error('错误信息'))
										reject(new Error('年龄必须大于十岁'))
									}
								}, 2000)
							})
						}
					}]
				}
			}
		}
	},
	onReady() {
		// 需要在onReady中设置规则
		// this.$refs.form.setRules(this.rules)
	},
	methods: {
		/**
		 * 表单提交
		 * @param {Object} event
		 */
		handleLogin() {
			uni.showLoading()
			uni.hideLoading()
			
			let data = {
			    title:'hello',
			    id: 1
			}
			
			
			// const targetUrl = '/pages/index/index?id=1';
			
			// if (targetUrl && validPath(targetUrl)) {
			//   uni.navigateTo({ url: targetUrl });
			// } else {
			//   console.error('无效的路径:', targetUrl);
			// }
			
			// function validPath(path) {
			//   // 检查路径是否在已注册的页面列表中
			//   const validPaths = ['/pages/index/index'];
			//   return validPaths.includes(path.split('?')[0]);
			// }

			uni.navigateTo({
				url:`../index/loginFirst?data=`+ encodeURIComponent(JSON.stringify(data))
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
	}
}
</script>
<style>
	.font-primary{
		color:#007aff ;
	}
	.font-info{
		color:#909399 ;
	}
	.size-xs{
		font-size: .6rem;
	}
	.login-container {
		padding-top: 20vh;

	      background-color: var(--color-gray-50);
	 
	}
	.button-login{
		font-size: .8rem;
	}
	.button-white{
		background-color: white;
		color: #007aff;
		margin-top: 1rem;
	}
	.text-center{
	    text-align: center;
		   margin-bottom: 2rem;
	}
	.login-card {
	  
	  /* padding: 20px; */
	      width: 80vw;
		  margin: 0 auto;
	      /* border: 1px solid red; */
	  /* margin-right: 10%; */
	}
	
	.card-header {
	  text-align: center;
	  font-size: 1.3rem;
	  font-weight: bold;
	  margin-bottom: .1rem;
	}
	.card-body {
	  text-align: center;
	  font-size: .7rem;
	
	  color: #909399;
	}

</style>
