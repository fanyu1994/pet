<template>
	<view class="search">
		<view class="navigationBar">
			<view class="navigationBar_title">
				你好,<open-data type="userNickName"></open-data>！
			</view>
			<image 
				class="navigationBar_img" 
				src="../../static/bg/back.png" 
				mode="widthFix"
				@click="back"></image>
		</view>
		<view class="search_title">
			/ 美丽的搜索区 /
		</view>
		<view class="search_all">
			<view
			class="search_main" 
			v-for="(item,index) in list" 
			:key="index"
			@click="toPath(item)">
				<image class="search_main_img" :src="item.img" mode="widthFix"></image>
				<view class="search_main_name">{{item.name}}</view>
				<view class="search_main_val">{{item.val}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				list:[]
			};
		},
		computed:{
			...mapState(["searchList"])
		},
		created(){
			let idList = []
			Object.values(this.searchList).forEach(i=>{
				if(!idList.includes(i.id)){
					idList.push(i.id)
					this.list.push(i)
				}
			})
		},
		methods:{
			//返回
			back(){
				uni.navigateBack()
			},
			//跳转详情页
			toPath(item){
				uni.showLoading({
					title:"搜索中。。。"
				})
				uni.navigateTo({
					url:`/pages/item/item?id=${item.id}`,
					success:()=>{
						uni.hideLoading()
					}
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
@import "./search.styl"
</style>
