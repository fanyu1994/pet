<template>
	<!-- input框框 -->
		<view class="input">
			<image class="input_img" src="../static/dog.png" mode="widthFix"></image>
			<input 
				class="myinput"
				@focus="focus"
				@confirm="search"
				@input="input"
				confirm-type="search" 
				v-model="value" 
				placeholder="  大家都在搜金毛"
				placeholderStyle="font-size:10px;font-weight:200"
				maxlength="20"/>
			<view class="input_enter" @click="enter">
				搜
			</view>	
			<!-- input搜索联想区 -->
			<view class="input_inpList_out" v-if="value">
				<scroll-view
					class="input_inpList" 
					scroll-y="true"
					@touchmove.stop.prevent="stopScroll">
					<view 
					class="inp_item" 
					v-for="(item,index) in inpList" 
					:key="index"
					@click="toPath(item)"
					hover-class="inp_item_hover">
						<text class="inp_item_name">{{item.name}}</text>
						<image class="inp_item_img" :src="item.img" mode="widthFix"></image>
						<text class="inp_item_val">{{item.val}}</text>
					</view>
				</scroll-view>
			</view>
			<!-- input框抽屉 -->
			<view 
				class="inputMore" 
				:animation="animationData" 
				@touchstart="startHandle"
				@touchmove.stop.prevent="moveHandle">
				<!-- 历史搜索区 -->
				<view class="inputMore_top">
					<view class="inputMore_top_title">
						历史搜索
						<image class="more_img" @click="deleteAll"
						src="../static/delete.png" mode="widthFix"></image>
					</view>
					<view class="inputMore_top_main">
						<view 
							class="inputMore_top_main_item"
							v-for="(item,index) in historyList"
							:key="index"
							@click="historyClick(item)">
							{{item}}
						</view>
					</view>
				</view>
				<!-- 热门搜索区 -->
				<view class="inputMore_top">
					<view class="inputMore_top_title">
						热门搜索
						<image class="more_img" src="../static/hot1.png" mode="widthFix"></image>
					</view>
					<view class="inputMore_top_main">
						<view 
							class="inputMore_top_main_item"
							v-for="(item,index) in hotSearchList"
							:key="index"
							@click="clickHot(item)">
							{{item}}
						</view>
					</view>
				</view>
				<!-- 遮罩阴影区 -->
				<view class="more_close" @click="close">
					<image class="more_close_img" src="../static/close.png" mode="widthFix"></image>
				</view>
			</view>
		</view>
</template>

<script>
	import data from "../data.json"
	import {debounce} from "../js/debounce.js"
	
	export default {
		data() {
			return {
				historyList:[],
				hotSearchList:["金钱龟","杭州市","雄性","布丁仓鼠","虎皮鹦鹉","拉布拉多","金毛","哈士奇","泰迪"],
				inpList:[],
				animationData:[],//动画效果
				value:"",//input值
				startClientX:0,//当前触摸点x坐标
				flag:false,//先赋值startClientX,再判断
			};
		},
		methods:{
			//打开抽屉
			focus(){
				this.animations(1,410).then(()=>{
					this.animationData = []
				})
			},
			//关闭抽屉
			close(){
				this.animations(0,-410).then(()=>{
					this.animationData = []
				})
			},
			//删除历史记录
			deleteAll(){
				this.$store.commit("deleteAll")
				uni.setStorage({
					key:"historyList",
					data:this.$store.state.historyList,
					success:(res)=>{
						this.historyList = this.$store.state.historyList
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			},
			//输入联想
			lxHandel(){
				let len = data.length;
				let curList = [];
				let patt = /http/;
				for(let i = 0; i < len; i++){
					Object.values(data[i]).forEach((item,index,cur)=>{
						if(item.toString().includes(this.value) && !patt.test(item.toString())){
							curList.push({
								id:cur[0],
								name:cur[1],
								img:cur[13],
								val:item
							})
						}
					})
				}
				this.inpList = curList
				this.$store.commit("setSearch",curList)
			},
			//input事件 联想
			input:debounce(function(){
				this.lxHandel()
			},500),
			//联想下的点击搜索
			toPath(item){
				this.close()
				this.historyHandel();
				uni.showLoading({
					title:"搜索中。。。"
				})
				uni.navigateTo({
					url:`/pages/item/item?id=${item.id}`,
					success:()=>{
						this.value = ""
						uni.hideLoading()
					}
				})
			},
			//搜索
			enter(){
				this.close();//关闭抽屉
				this.historyHandel();//历史记录
				uni.showLoading({
					title:"跳转中。。。"
				})
				uni.navigateTo({
					url: `/pages/search/search`,
					success:()=>{
						this.value = ""
						uni.hideLoading()
					}
				})
			},
			//键盘确认回车
			search(){
				this.close();//关闭抽屉
				this.historyHandel();//历史记录
				uni.showLoading({
					title:"跳转中。。。"
				})
				uni.navigateTo({
					url: `/pages/search/search`,
					success:()=>{
						this.value = ""
						uni.hideLoading()		
					}
				})
			},
			//滑动事件
			moveHandle(e){
				let curCliextY = e.touches[0].pageY;
				if(this.flag){
					if( this.startClientY - curCliextY > 75){
						this.close()
					}
				}
			},
			//开始滑动
			startHandle(e){
				this.startClientY = e.touches[0].pageY;
				this.flag = true
			},
			//历史记录
			historyHandel(){
				uni.getStorage({
					key:"historyList",
					success:(res)=>{
						this.$store.commit("setHistory",this.value)
						uni.setStorage({
							key:"historyList",
							data:this.$store.state.historyList,
							success:(res)=>{
								this.historyList = this.$store.state.historyList
							},
							fail:(err)=>{
								console.log(err)
							}
						})
					},
					fail:(err)=>{
						this.$store.commit("setHistory",this.value)
						uni.setStorage({
							key:"historyList",
							data:this.$store.state.historyList
						})
					}
				})
			},
			//历史记录点击
			historyClick(item){
				this.value = item
				this.lxHandel()
			},
			//热搜词汇点击
			clickHot(item){
				this.value = item
				this.lxHandel()
			},
			//抽屉动画效果（o,x）: (opacity, Y轴偏移)
			animations(o,x){
				return new Promise((resolve,reject)=>{
					const animation = uni.createAnimation({
						duration:500,
						timingFunction:"ease-out"
					})
					animation.opacity(o).translateY(x).step()
					this.animationData = animation.export()
					resolve()
				})
			},
			//禁止遮罩下层滑动
			stopScroll(){}
		}
	}
</script>

<style lang="stylus" scoped>
@import "../style/myInput.styl"
</style>
