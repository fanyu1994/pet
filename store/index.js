import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
	state:{
		user:"",
		location:"",
		pet:[],
		historyList:[],
		searchList:[],
		payList:[]
	},
	mutations:{
		setPet(state,v){
			if(state.pet.includes(v)){
				uni.showToast({
					title:"购物车里已经存在的宠物"
				})  
			}else{
				state.pet.push(v)
			}
		},
		setPetByRemove(state,v){
			state.pet = v
		},
		setHistory(state,v){
			if(!state.historyList.includes(v)){
				state.historyList.push(v)  
			}
		},
		deleteAll(state){
			state.historyList = []
		},
		setSearch(state,v){
			state.searchList = v
		},
		setPay(state,v){
			state.payList = v
		}
	},
	actions:{
		getUser(ctx){
			setTimeout(()=>{
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    // 获取用户信息
				    uni.getUserInfo({
				      provider: 'weixin',
				      success: function (infoRes) {
				        console.log('用户昵称为：' + infoRes.userInfo.nickName);
				      },
							fail(err) {
								console.log(err);
							}
				    });
				  }
				})
			},80)
		}
	}
})

export default store;