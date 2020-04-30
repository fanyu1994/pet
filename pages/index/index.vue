<template>
	<view class="content">
		<view class="navigationBar">
			<text class="navigationBar_title">萌宠阁</text>
		</view>
		<view class="main" :animation="animationData">
			<image class="main_img" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1318242250,3619688598&fm=26&gp=0.jpg"></image>
			<text class="text" @click="toPath">点击进入</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				animationData:{},
				animationDataText:{}
			}
		},
		onLoad() {
			this.animation = uni.createAnimation({
				duration: 3000,
				timingFunction: 'ease',
			})
			this.animation.scale(1,1).opacity(1).step()
			this.animationData = this.animation.export()
		},
		onUnload() {
			this.animationData = null
		},
		methods: {
			toPath(){
				uni.switchTab({
					url:"/pages/main/main"
				})
			}
		}
	}
</script>

<style lang="stylus" scoped>
@import "./index.styl";
@import "../../uni.styl"
.main
	// background url($nui-bg) no-repeat
	background-position 40%
	background-size cover
	transform scale(2,2)
	opacity 0
	z-index -1
</style>
