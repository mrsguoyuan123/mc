<template>
	<view class="page-content page-records">

		<view
			class="radius-15 card-top margin-bottom-2 card-border card-border-gray  u-flex space-between border-blue bg-blue">

			<view class="u-flex ">
				<view class="view-icon no-border">
					<u-icon name="account" color="#155DFC" bold="true" size="40rpx"></u-icon>
				</view>
				<view class="view-text">
					<view class="view-text1 font-m">
						<view>{{record.name}}</view>

					</view>
					<view class="view-text2 u-flex flex-start">
						<view>登记证号</view>
						<view> **** **** 1234</view>
					</view>
				</view>

			</view>

		</view>

		<view class="radius-15  bg-white card-border card-border-gray ">
			<view class="header-text">
				<view class="header-icon ">
					<u-icon name="account" color="#155DFC" bold="true" size="40rpx"></u-icon>
					<view class="header-name font-bold font-m">
						手术基本信息
					</view>
				</view>

			</view>
			<view>
				<view class="records-wrapper u-flex space-between">
					<view class="u-flex flex-start">
						<text class="custom-icon custom-icon-activity icon-bold margin-right-5"
							style="font-size:30rpx;color:#155DFC;"></text>
						<view class="font-s font-info">手术项目</view>
					</view>
					<view class="font-bold font-s">{{record.surgeryType}}</view>
				</view>
				<view class="records-wrapper u-flex space-between">
					<view class="u-flex flex-start">
						<text class="custom-icon custom-icon-activity icon-bold margin-right-5"
							style="font-size:30rpx;color:#155DFC;"></text>
						<view class="font-s font-info">手术地区</view>
					</view>
					<view class="font-bold font-s">{{record.surgeryRegion}}</view>
				</view>
				<view class="records-wrapper u-flex space-between">
					<view class="u-flex flex-start">
						<text class="custom-icon custom-icon-activity icon-bold margin-right-5"
							style="font-size:30rpx;color:#155DFC;"></text>
						<view class="font-s font-info">就诊医院</view>
					</view>
					<view class="font-bold font-s">{{record.hospital}}</view>
				</view>
				<view class="records-wrapper u-flex space-between">
					<view class="u-flex flex-start">
						<text class="custom-icon custom-icon-activity icon-bold margin-right-5"
							style="font-size:30rpx;color:#155DFC;"></text>
						<view class="font-s font-info">所属科室</view>
					</view>
					<view class="font-bold font-s">{{record.department}}</view>
				</view>
				<view class="records-wrapper u-flex space-between">
					<view class="u-flex flex-start">
						<text class="custom-icon custom-icon-activity icon-bold margin-right-5"
							style="font-size:30rpx;color:#155DFC;"></text>
						<view class="font-s font-info">主刀医生</view>
					</view>
					<view class="font-bold font-s">{{record.surgeon}}</view>
				</view>
				<view class="records-wrapper u-flex space-between">
					<view class="u-flex flex-start">
						<text class="custom-icon custom-icon-activity icon-bold margin-right-5"
							style="font-size:30rpx;color:#155DFC;"></text>
						<view class="font-s font-info">手术日期</view>
					</view>
					<view class="font-bold font-s">{{record.time}}</view>
				</view>
			</view>

		</view>


		<view class="radius-15  bg-white card-border card-border-gray ">
			<view class="header-text">
				<view class="header-icon ">
					<u-icon name="account" color="#155DFC" bold="true" size="40rpx"></u-icon>
					<view class="header-name font-bold font-m">
						保障情况
					</view>
				</view>

			</view>
			<view
				class="radius-15 card-top margin-bottom-2 card-border card-border-gray  u-flex space-between border-green bg-green">

				<view class="u-flex space-between column-center width-100">


					<view class="view-text2 font-green">
						<view class="font-m font-bold margin-bottom-5">手术意外保险</view>
						<view class="font-s font-green">Surgery Protection Active</view>
					</view>
					<view class="badge badge-blue-fill">已生效</view>

				</view>

			</view>
			<view class="u-flex space-between column-center width-100 margin-bottom-5">
				<view class="font-m  font-info ">保障金额</view>
				<view class="font-s font-bold ">¥10,000.00</view>


			</view>
			<view class="u-flex space-between column-center width-100">
				<view class="font-m   font-info ">保单编号</view>
				<view class="font-s font-bold ">1234565600</view>


			</view>
		</view>


		<u-button class="width-100 margin-top-2" shape="circle" hairline="false" @click="routeTo('consultation')"
			text="对此病历有疑问？立即咨询"></u-button>

	</view>
</template>



<script>
	export default {
		data() {
			return {
				record: {
					id: "p1",
					name: "张三",
					gender: "男",
					age: 45,
					surgeryRegion: "杭州",
					hospital: "浙一医院",
					department: "肛肠科",
					surgeryType: "痔疮手术",
					surgeon: "李医生",
					time: '2026-03-06',
					urgency: "high",
					status: "未沟通",
					servicePackage: "198术后康复手册",
					purchaseIntent: "高"
				},
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


				uni.navigateTo({
					url: `../index/` + res + `?data=` + encodeURIComponent(JSON.stringify(data))
				})

			},

		},
		onReady() {},
	};
</script>

<style scoped lang="scss">
	.page-records .records-wrapper {
		padding: 20rpx 0;
	}

	.page-records button {
		background: black;
		color: white;
	}
</style>