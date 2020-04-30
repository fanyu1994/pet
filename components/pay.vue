<template>
	<view class="pay" v-if="showPay">
		<view class="pay_main">
			<!-- <view v-for="(item,index) in list" :key="index" class="pay_item">
				<image class="pay_img" :src="item.img" mode="widthFix"></image>
				<text>{{item.name}}</text>
			</view> -->
			<view class="pay_text">您准备好把这些宠物带回家了吗？</view>
			<view class="pay_fix" @click="submit">确定</view>
			<view class="pay_giveup" @click="goBack">再想想</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				showPay:false,
				list:[]
			};
		},
		computed:{
			...mapState(["payList"])	
		},
		methods:{
			//确定购买
			submit(){
				uni.showToast({
					title:"支付中。。。"
				})
			// 	uni.request({
			// 						url: '',
			// 						data: {
			// 							code: code,
			// 							payMoney: 1,
			// 							uid: '',
			// 							type: '1'
			// 						},
			// 						header: {
			// 							'custom-header': '' //自定义请求头信息
			// 						},
			// 						success: (res) => {
			// 							console.log(res);
			// 							// 调起支付
			// 							uni.requestPayment({
			// 								provider: 'alipay',
			// 								orderInfo: {
			// 									"dealId": res.dealId,
			// 									"appKey": res.appKey,
			// 									"totalAmount": res.totalAmount,
			// 									"tpOrderId": res.tpOrderId,
			// 					 				"dealTitle": res.dealTitle,
			// 									"rsaSign": res.rsaSign,
			// 									"bizInfo": res.bizInfo
			// 								}, //订单数据
			// 								success: function(res) {
			// 									console.log('success:' + JSON.stringify(res));
			// 								},
			// 								fail: function(err) {
			// 									console.log('fail:' + JSON.stringify(err));
			// 								}
			// 							});
			// 						}
			// 					})
			},
			//再想想
			goBack(){
				this.showPay = false
			}
			// getPayList(){
			// 	this.list = this.payList
			// }
		}
	}
</script>

<style lang="stylus" scoped>
@import "../style/pay.styl"
</style>
