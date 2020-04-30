<template>
	<view class="shop">
		<!-- 头部 -->
		<view class="navigationBar">
			<view class="navigationBar_title">
				<open-data type="userNickName"></open-data>的购物车
			</view>
		</view>
		<!-- pay remove窗口 -->
		<pay ref="pay"></pay>
		<!-- 背景 -->
		<view class="shop_bg" v-if="!pet.length">
			<image class="shop_bg_img" src="../../static/empty.png" mode="widthFix"></image>
			<view class="shop_bg_text" @click="toPath">
				空空如也，快去挑选喜欢的萌宠吧！
				<image class="shop_bg_text_img" src="../../static/pet.png" mode="widthFix"></image>
			</view>
		</view>
		<!-- 商品 -->
		<view class="shop_main">
			<view 
			class="shop_item" 
			v-for="(item,index) in pet"
			:key="index"
			@click="toItem($event,item)">
				<view class="item_tf" @click="itemPay(item,index)"><view :class='[item.isSelect?"item_t":"item_f"]' ></view></view>
				<image class="shop_item_img" :src="item.img" mode="widthFix"></image>
				<view class="shop_item_right">
					<view class="shop_item_name">
						名字：{{item.name}}
					</view>
					<view class="shop_item_age">
						年龄：{{item.age}}
					</view>
					<view class="shop_item_address">
						住址：{{item.address}}
					</view>
					<view class="shop_item_price">
						价格：{{item.price}}
					</view>
				</view>
			</view>
		</view>
		<!-- 底部 -->
		<view class="shop_foot">
			<view class="shop_foot_title" @click="titleTab">
				{{title}}
			</view>
			<view class="shop_remove" v-show="isRemove">
				<view :class="[isAll?'re_t':'re_f']" @click="isAllClick"></view>
				<text class="shop_remove_all" @click="isAllClick">全选</text>
				<view :class="[isRe?'shop_remove_re_t':'shop_remove_re_f']" @click="remove">
					删除
				</view>
			</view>
			<view class="shop_pay" v-show="!isRemove">
				<view :class="[isAllPay?'pay_t':'pay_f']" @click="isAllPayClick"></view>
				<view class="shop_pay_select" @click="isAllPayClick">全选</view>
				<view class="shop_pay_price">
					合计：<text class="shop_pay_price_red">￥{{allPrice}}</text>
				</view>
				<view :class="[isPay?'shop_pay_re_t':'shop_pay_re_f']" @click="pay">
					结算
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pay from "../../components/pay.vue"
	export default {
		data(){
			return {
				pet:[],
				title:"编辑",
				isRemove:false,
				isAll:true,
				isRe:true,
				isAllPay:true,
				isPay:true,
				allPrice:0,
			}
		},
		components:{
			pay
		},
		onShow() {
			uni.getStorage({
				key:"pet",
				success:(res)=> {
					this.pet = res.data
					this.pet.forEach(item=>{
						item.isSelect = true
					})
					this.getAllPrice()
				},
				fail(err) {
					console.log(err)
					
				}
			})		
		},
		methods:{
			//编辑和取消切换
			titleTab(){
				this.getAllPrice()
				if(this.isRemove){
					this.title = "编辑"
					this.isRemove = false
				}else{
					this.title = "取消"
					this.isRemove = true
				}
			},
			//在可编辑页是否全选
			isAllClick(){
				this.isAll = !this.isAll
				this.isAllPay = !this.isAllPay
				if(this.isAll){
					this.pet.forEach(item=>{
						item.isSelect = true
					})
					this.getAllPrice()
				}else{
					this.pet.forEach(item=>{
						item.isSelect = false
					})
					this.getAllPrice()
				}
			},
			//在不可编辑页面是否全选
			isAllPayClick(){
				this.isAll = !this.isAll
				this.isAllPay = !this.isAllPay
				if(this.isAllPay){
					this.pet.forEach(item=>{
						item.isSelect = true
					})
					this.getAllPrice()
				}else{
					this.pet.forEach(item=>{
						item.isSelect = false
					})
					this.getAllPrice()
				}
			},
			//计算全部金额
			getAllPrice(){
				this.allPrice = 0
				this.pet.forEach(item=>{
					if(item.isSelect){
						this.allPrice += item.price
					}
				})
			},
			//单个商品处理
			itemPay(item,index){	
				item.isSelect = !item.isSelect
				this.$set(this.pet,index,item)
				this.getAllPrice()
				this.isAll = this.isAllPay = this.pet.every(p=>p.isSelect)
				this.isPay = this.isRe = this.pet.some(p=>p.isSelect)
			},
			//去支付
			pay(){
				let v = this.pet.filter(item=>item.isSelect)
				if(this.allPrice){
					this.$store.commit("setPay",v)
					this.$refs.pay.showPay = true
				}else{
					uni.showToast({
						title:"目前购物车为空！",
						image:"../../static/cry.png",
						duration:2000
					})
				}
				// this.$refs.pay.getPayList()
			},
			//删除商品
			remove(){
				this.pet = this.pet.filter((item,index)=>{
					return item.isSelect === false
				})
				uni.setStorage({
					key:"pet",
					data:this.pet,
					success:()=>{
						this.$store.commit("setPetByRemove",this.pet)
					},
					fail:function(err){
						console.log(err)
					}
				})
			},
			//去item详情页
			toItem(event,item){
				let e = event.touches[0]
				if(e.pageX>300){
					return 
				}
				uni.showLoading({
					title:'跳转中...',
					success:()=>{
						uni.navigateTo({
							url:`../item/item?id=${item.id}`,
							success:()=>{
								uni.hideLoading()
							}
						})		
					}
				})
				
			},
			//回到主会场
			toPath(){
				uni.showLoading({
					title:"跳转中..."
				})
				uni.switchTab({
					url:"../main/main",
					success:()=>{
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>
<style>
	page{
		background-color: #e8e8e8;
	}
</style>
<style lang="stylus" scoped>
	@import "./shoppingCar.styl";
	
</style>
