<template>
		<view class="item">
			<view class="navigationBar">
				<text class="navigationBar_title">{{item.name}}</text>
				<image @click="back" class="navigationBar_back" src="../../static/bg/back.png" mode="widthFix"></image>
			</view>
			<view class="item_main">
				<view class="main_top">	
					<view class="main_top_bg1" style="background: url({{item.img}}) no-repeat top/cover"></view>						
					<view class="main_top_bg2"></view>
					<view class="main_top_pj">{{item.num}}人喜欢它</view>
					<uni-icons
					@click="clickmain(1)"
					type="hand-thumbsup" size="30" 
					color="#ffffff" class="main_top_empty" v-if="empty"></uni-icons>
					<uni-icons 
					@click="clickmain(2)"
					type="hand-thumbsup-filled" size="30" 
					color="red" class="main_top_up" v-if="!up"></uni-icons>
					<uni-icons 
					@click="clickmain(3)"
					type="hand-thumbsdown-filled" size="30" 
					color="red" class="main_top_down" v-if="(up)&&(!empty)"></uni-icons>
					<image class="main_top_img" :src="item.img" mode="widthFix"></image>
					<view class="main_top_text">
						<view class="text_name">
							名字：{{item.name}}
						</view>
						<view class="text_age">
							年龄：{{item.age}}个月大
						</view>
						<view class="text_gender">
							性别：{{item.gender}}
						</view>
						<view class="text_price">
							价格：{{item.price}}元
						</view>
						<view class="text_breed">
							品种：{{item.breed}}
						</view>
					</view>
				</view>
				<view class="main_bottom">
					<text class="main_bottom_title">喂养须知:</text>
					<p>
						1、祖籍{{item.zj}}的{{item.name}}出生在{{item.address}}
						一个富裕的家庭，{{item.character}}的它，你喜欢吗?
					</p>
					<p>
						2、{{item.linsten}}
					</p>
				</view>
			</view>
			<view class="item_footer">
				<uni-icons type="phone" size="40" color="#3CC51F" class="footer_icon"></uni-icons>
				<view class="footer_a" @click="callPthone">联系它家长？</view>
				<view class="footer_c" @click="getIt">想要它</view> 
			</view>
		</view>
</template>
<script>
	import data from "../../data.json"
	import uniIcons from "@/components/uni-icons/uni-icons.vue"
	export default {
		data(){
			return {
				item:{},
				empty:true,
				up:true
			}
		},
		components:{
			uniIcons
		},
		onLoad(option){
			let id = option.id - 1
			this.item = data[id]
		},
		methods:{
			// {param:number} 为宠物点赞，这里需要数据库来关联用户和宠物
			clickmain(param){
				if(param == 2){
					this.up = !this.up
					this.item.num--
				} else if(param == 3){
					this.up = !this.up
					this.item.num++
				}else{
					this.empty = false
					this.up = false
					this.item.num++
				}
			},
			//打波电话
			callPthone(){
				console.log(this.item.phone)
				uni.makePhoneCall({
					phoneNumber: this.item.phone.toString(),
					success(){
						console.log("正在拨打电话")
					},
					fail(err){
						console.log(err)
					}
				})
			},
			//得到它
			getIt(){
				this.$store.commit("setPet",this.item)
				uni.setStorage({
					key:"pet",
					data:this.$store.state.pet,
					success:()=>{
						uni.switchTab({
							url:`../shoppingCar/shoppingCar`,
							success:()=>{
								uni.showToast({
									title:`已将${this.item.name}加入想要列表`
								})
							}
							
						})
					},
					fail:function(err){
						console.log(err)
					}
				})
			},
			//back
			back(){
				uni.navigateBack({
					  url: '../main/main',
						fail(err){
							console.log(err)
						}
				})
			}
		}
	}
</script>
<style lang="stylus" scoped>
@import "./item.styl"
</style>
