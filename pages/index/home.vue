<template>
	<view class="page-content page-home	">
		<u-tabbar :value="activeTab" :placeholder="false" @change="name => activeTab = name" :fixed="true"
			activeColor="rgb(21, 93, 252)" inactiveColor="#d2d6dd" :safeAreaInsetBottom="false">
			<u-tabbar-item v-for="item in tabList" :key="item.id" :text="item.name" :icon="item.icon"
				:badge="item.badge" @click="routeTo(item.route)"></u-tabbar-item>

		</u-tabbar>

		<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between"
			@click="routeTo('profile')">

			<view class="u-flex ">
				<view class="view-icon no-border">
					<u-icon name="account" color="#155DFC" bold="true" size="20"></u-icon>
				</view>
				<view class="view-text">
					<view class="view-text1 font-l">
						张三
					</view>
					<view class="view-text2">
						支架手术
					</view>
				</view>

			</view>
			<view class="view-icon-circle">
				<u-icon name="arrow-right" color="#909399" size="15"></u-icon>
			</view>

		</view>
		<view class="button-wrapper">
			<view class="radius-15 card-top card-bg card-blue">
				<view class="view-icon bg-blue">
					<u-icon name="chat" color="white" bold="true" size="20"></u-icon>
				</view>
				<view class="text-white">
					<view class="white-text1">
						在线咨询
					</view>
					<view class="white-text2">
						专属医助服务
					</view>
				</view>
			</view>
			<view class="radius-15 card-top card-bg  card-green">
				<view class="view-icon">
					<u-icon name="heart" color="white" bold="true" size="20"></u-icon>
				</view>
				<view class="text-white">
					<view class="white-text1">
						健康管理中心
					</view>
					<view class="white-text2">
						全方位健康管理
					</view>
				</view>
			</view>

		</view>
		<view class="header-text">
			<view class="header-icon ">
				
				<u-icon name="account" color="#155DFC" bold="true" size="20"></u-icon>
				<view class="header-name font-bold">
					我的私人医生团队
				</view>
			</view>

		</view>
		<view class="my-team bg-white radius-15 card-top card-border card-border-gray">

			<view class="team-icon view-icon">
				<u-icon custom-prefix="custom-icon" name="stethoscope" color="white" bold="true" size="3rem"></u-icon>
			</view>
			<view class="team-content">
				<view class="font-bold text-center">医生团队</view>
				<view class="my-badge">
					<view class="badge badge-blue margin-right-5">心内科</view>
					<view class="badge badge-blue margin-right-5">副主任医师</view>
					<view class="badge badge-purple">副主任医师</view>
				</view>
				<view class=" text-center font-info font-xs">温州医科大学附属第一医院</view>
				<view class="radius-15 bg-gray gray-content">
					<view class="sub-title font-bold font-xs">
						专业擅长
					</view>
					<view class=" font-info font-xs">
						医学博士，主任医师，教。现任中国医药信学会心脏监护专业委员会副主任委员。曾任职于中国人民解放军总医院（301医院），从事心血管内科临床工作三十余年，在心血管疾病的诊治与危重症抢救方面积累了深厚经验。
					</view>
					<view class="sub-title font-bold font-xs">
						个人简介
					</view>
					<view class=" font-info font-xs">
						医学博士，主任医师，教���。现任中国医药信��学会心脏监护专业委员会副主任委员。曾任职于中国人民解放军总医院（301医院），从事心血管内科临床工作三十余年，在心血管疾病的诊治与危重症抢救方面积累了深厚经验。
					</view>
				</view>

			</view>
		</view>
		<view class="bg-chart bg-white radius-15 card-border card-border-gray">
			<view class=" font-bold">
				实时健康监测看板
			</view>
			<view class="chart-content">
				<view>
					<view class="chart-title">
						<view class="header-icon ">
							<u-icon name="activity"  custom-prefix="custom-icon" color="#155DFC" bold="true" size="20"></u-icon>
							<view class="header-name font-bold">
								血压点位
							</view>
						</view>
					</view>
					<view class="progress-content">
						<view>
							<view class="font-info font-xs">舒张压</view>
							<u-line-progress :percentage="80" height="8" activeColor="#2b7fff"
								:showText="false"></u-line-progress>
						</view>
						<view>
							<view class="font-info font-xs">收缩压</view>
							<u-line-progress :percentage="60" height="8" activeColor="#fdc700"
								:showText="false"></u-line-progress>
						</view>
						<view>
							<view class="font-info font-xs">综合率</view>
							<u-line-progress :percentage="90" height="8" activeColor="#00c950"
								:showText="false"></u-line-progress>
						</view>
					</view>
				</view>
				<view>
					<view class="chart-title">
						<view class="header-icon ">
							<u-icon name="activity"  custom-prefix="custom-icon" color="#00c950" bold="true" size="20"></u-icon>
							<view class="header-name font-bold">
								血糖体征
							</view>

						</view>

					</view>
					<view class="space-between align-start">
						<view class="font-info font-xs">血压</view>
						<view class="font-bold font-s">118/78</view>
					</view>
					<view class="space-between align-start">
						<view class="font-info font-xs">血糖</view>
						<view class="font-bold font-s">5.34</view>
					</view>
				</view>
			</view>
			<view class=" bg-pink radius-15    ">
				<view class="chart-title">
					<view class="header-icon ">
						<u-icon name="trending-down" custom-prefix="custom-icon"  color="#f6339a" bold="true" size="20"></u-icon>
						<view class="header-name font-bold">
							体重运动趋势
						</view>
					</view>
				</view>
				<view class="u-flex space-between align-center">
					<u-line-progress :percentage="60" height="8" activeColor="#f6339a"
						:showText="false"></u-line-progress>
					<view class="font-bold font-pink font-s" style="margin-left: 10px;">
						-1.2kg
					</view>
				</view>
			</view>
			<view class=" bg-yellow radius-15    ">
				<view class="chart-title">
					<view class="header-icon ">
						<u-icon name="file-text" color="#e7c174" bold="true" size="20"></u-icon>
						<view class="header-name font-bold">
							今日服用
						</view>
					</view>
				</view>
				<view class="my-badge">
					<view class="badge badge-blue bg-blue">本品+钙剂</view>
					<view class="badge badge-blue bg-blue">钙片促吸收</view>
					<view class="badge badge-blue bg-blue">降压药</view>
				</view>
			</view>
		</view>
		<view class="header-text">
			<view class="header-icon ">
				<u-icon name="user-check"  custom-prefix="custom-icon"  color="#155DFC" bold="true" size="20"></u-icon>
				<view class="header-name font-bold">
					健康护照师申请
				</view>
			</view>
			<view class="font-blue font-xs font-bold">
				上门服务
			</view>
		</view>
		<view class="radius-15 card-top bg-white card-border card-border-gray  u-flex space-between">
			<view class="view-icon bg-blue-dark">
				<u-icon name="shield"    custom-prefix="custom-icon" color="white" bold="true" size="30"></u-icon>
			</view>
			<view>

				<view class="view-text">
					<view class="view-text1 font-l">
						专业照护人员上门服务
					</view>
					<view class="view-text2">
						术后康复专项指导 · 居家生活护理 · 24h全天候陪伴
					</view>
				</view>
				<view class="badge-bg  badge-blue-bg">
					已有 1000+ 患者选择
				</view>
			</view>
			<view class="">
				<u-icon name="arrow-right" color="#909399" size="15"></u-icon>
			</view>

		</view>
		<view class="header-text">
			<view class="header-icon ">
				<u-icon name="heart" color="#fb2c36" bold="true" size="20"></u-icon>
				<view class="header-name font-bold">
					术后健康知识库
				</view>
			</view>
			<view class="font-blue font-xs font-bold">
				为您精选
			</view>
		</view>
		<view v-for="item in articles" :key="item.id"
			class="my-article bg-white radius-15  card-border card-border-gray">
			<view class="u-flex space-between align-center">
				<view class="img-wrapper">
					<img :src="item.image" :alt="item.desc" style="width:100%">
				</view>
				<view>
					<view class="badge-bg badge-pink-bg">
						{{item.dept}}

					</view>
					<view class="font-bold font-s" style="margin: 10px auto;">{{item.title}}</view>
					<view class="font-info font-xs">{{item.desc}}</view>
				</view>


			</view>

		</view>
	</view>

</template>


<script>
	export default {
		data() {
			return {
				activeTab: 0,
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
				articles: [{
						id: "h1",
						dept: "支架手术",
						title: "支架手术术后常见护理方案",
						desc: "术后48小时是关键期，注意用药与活动量控制...",
						image: "https://images.unsplash.com/photo-1576091160550-2173dad999ef?w=400&q=80"
					},
					{
						id: "h2",
						dept: "支架手术",
						title: "支架术后饮食指南：如何保护血管",
						desc: "低盐低脂饮食，规律作息，避免剧烈运动...",
						image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80"
					},
					{
						id: "h3",
						dept: "骨科",
						title: "骨折术后康复锻炼：从被动到主动",
						desc: "阶梯式功能练习有助于关节活动度的恢复...",
						image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80"
					},
					{
						id: "h4",
						dept: "骨科",
						title: "关节置换术后：如何居家安全活动",
						desc: "环境布置、助行器使用及跌倒预防全攻略...",
						image: "https://images.unsplash.com/photo-1598184273446-94410290f6e7?w=400&q=80"
					},
					{
						id: "h5",
						dept: "心外科",
						title: "支架术后生活指南",
						desc: "戒烟限酒、规律用药是心脏支架术后长久的关键...",
						image: "https://images.unsplash.com/photo-1505751172107-573225ad4b73?w=400&q=80"
					},
					{
						id: "h6",
						dept: "妇产科",
						title: "产后康复：骨盆修复与腹直肌调理",
						desc: "科学月子期护理，帮助身体机能快速回弹...",
						image: "https://images.unsplash.com/photo-1518331647614-7a1f04cd34cf?w=400&q=80"
					},

				]

			};
		},
		methods: {
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


	};
</script>

<style scoped lang="scss">
	.page-home .view-icon {
		padding: 10px;
		border-radius: 15px;
		float: left;


	}

	.img-wrapper {
		overflow: hidden;
		width: 100px;
		height: 100px;
		border-radius: 1rem;
		margin-right: 10px;
	}

	.img-wrapper img {
		object-fit: cover;
		width: 100%;
		height: 100%;
		max-height: 100%;
		// border-radius: 1

	}

	.bg-chart .font-info {
		margin: 6px auto;
	}

	.my-article {
		padding: 1rem;
		margin: 1rem auto // border: 1px solid red;
	}


	.bg-chart .bg-pink,
	.bg-chart .bg-yellow {
		padding: 1rem;
		margin: 1rem auto;
	}



	.chart-title .header-icon {
		justify-content: start;
		margin: .5rem auto;
	}

	.chart-content {
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		align-items: start;
		margin: 10px 0;
	}

	.chart-content .space-between {
		margin: 10px auto;
	}

	.chart-content>view {
		width: calc(50% - 10px)
	}

	.bg-chart {
		margin: 1rem auto;
		padding: 1rem;
	}




	.my-badge {
		display: flex;
		justify-content: start;
		flex-wrap: nowrap;
		align-items: center;
		margin: 10px 0;
	}



	.team-content {
		margin-top: 2rem;
		width: 100%
	}

	.my-team {
		position: relative;
		margin-top: 3rem;
		background-color: white;
	}

	.team-icon.view-icon {
		background-color: #155dfc;
		border: 3px solid white;
		position: absolute;
		top: -35px;
		left: calc(50% - 35px);

	}




	.card-green .view-icon {
		background-color: #33b865;
	}

	.card-blue .view-icon {
		background-color: #447dfd
	}

	.card-green {
		background-color: #00a63e;
	}

	.card-blue {
		background-color: #155dfc;
		margin-right: 10px;
	}

	.button-wrapper {
		margin: 1rem 0;
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		align-items: center;
	}

	.view-icon-circle {
		border-radius: 100%;
		background-color: #f9fafb;
		width: 15px;
		height: 15px;
		padding: 10px;
	}

	.card-top {
		padding: 1rem;
		display: flex;
		justify-content: space-between;
		flex-wrap: nowrap;
		align-items: center;

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
</style>