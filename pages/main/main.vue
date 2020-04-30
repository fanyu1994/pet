<template>
	<view class="main">
		<!-- 头部自定义 -->
		<view class="navigationBar">
			<view class="navigationBar_title">
				你好,<open-data type="userNickName"></open-data>！
			</view>
		</view>
		<!-- myInput组件 -->
		<my-input></my-input>
		<!-- 头部轮播图 -->
		<swiper 
			class="main_swiper"
			indicator-dots="true"
			autoplay="true"
			interval="2000"
			duration="500"
			previous-margin="12.5px"
			indicator-active-color="#FF1493"
			>
				<swiper-item v-for="(item, index) in topList" :key="index">
					<image class="main_img" :src="item.img" mode="" @click="toItem(item)"></image>
				</swiper-item>
		</swiper>
		<!-- 萌宠TOP榜 -->
		<view class="main-middle">
			<view class="main_middle_title">
				萌宠TOP榜
			</view>
			<scroll-view class="scroll" scroll-x="true">
					<view 
					v-for="(item,index) in scrollList" 
					:key="index" 
					class="scroll_item"
					@click="toItem(item)">
						<image class="myImg" mode="" :src="item.img"></image>
						<view class="myText">
							<text class="myText_red">NO.{{index+1}}</text> {{item.name}}
						</view>
					</view>
			</scroll-view>
		</view>
		<!-- 其它宠物 -->
		<view class="main_bottom">
			<view class="main_bottome_title">
				其它
			</view>
			<view class="main_bottom_main">
				<view class="item" v-for="(item,index) in bottomList" :key="index" @click="toItem(item)">
					<view class="bg" style="background:url({{item.img}}) no-repeat top/cover;"></view>
					<view class="description">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="main_bottom_bottom" v-if="showD">
				已经没有数据了
			</view>
		</view>
	</view>
</template>
<script>
	import data from "../../data.json"
	import myInput from "../../components/myInput.vue"
	// let observer = null;
	export default {
		data(){
			return {
				topList:[],
				scrollList:[],
				bottomList:[],
				showD:false,
				linimg:"https://tempim-1256796114.cos-website.ap-shanghai.myqcloud.com/placeholder/300x240"
			}
		},
		components:{
			myInput
		},
		onLoad() {
			this.$store.dispatch("getUser")
		},
		onReady() {
			/**
			 * 这里使用懒加载，不过uniapp好像没能实现部分功能，再议
			 */
			// observer = uni.createIntersectionObserver(this,{observeAll:true});
			//             observer.relativeTo('.scroll').observe('.myImg', (res) => {
			// 							const query = uni.createSelectorQuery().in(this).select(".myImg");
			// 							console.log(query)
			//             })
		},
		created() {
			/**
			 *获取一些数据做轮播图
			 */
			data.slice(5,10).forEach(item=>{
				this.topList.push(item)
			})
			this.scrollList = data//假装通过接口获取的数据
			this.bottomList = data.slice(0,4)
		},
		onReachBottom() {
			let len = this.bottomList.length
			let dlen = data.length
			if(len == dlen){
				this.showD = true
			}
			uni.showLoading({
				title:"加载中..."
			})
			setTimeout(()=>{
				this.bottomList = this.bottomList.concat(data.slice(len,len+4))
				uni.hideLoading()
			},1000)
		},
		methods:{
			toItem(item){
				uni.showLoading({
					title: '跳转中。。。',
					mask: false
				});
				uni.navigateTo({
				   url: `/pages/item/item?id=${item.id}`,
					 success() {
					 	uni.hideLoading()
					 }
				});
				
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "./main.styl";
</style>
