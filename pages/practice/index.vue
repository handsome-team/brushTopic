<template>
	<view class="sortBox">
		<view class="sortItem" @click="toSubject('html')">
			<image src="/static/practice/006.png"></image>
			<view>html</view>
		</view>
		<view class="sortItem" @click="toSubject('css')">
			<image src="/static/practice/007.png"></image>
			<view>css</view>
		</view>
		<view class="sortItem" @click="toSubject('js')">
			<image src="/static/practice/009.png"></image>
			<view>js</view>
		</view>
		<view class="sortItem" @click="toSubject('jq')">
			<image src="/static/practice/008.png"></image>
			<view>jq</view>
		</view>
		<view class="sortItem" @click="toSubject('ajax')">
			<image src="/static/practice/013.png"></image>
			<view>ajax</view>
		</view>
		<view class="sortItem" @click="toSubject('es6')">
			<image src="/static/practice/012.png"></image>
			<view>es6</view>
		</view>
		<view class="sortItem" @click="toSubject('vue')">
			<image src="/static/practice/011.png"></image>
			<view>vue</view>
		</view>
		<view class="sortItem" @click="toSubject('react')">
			<image src="/static/practice/010.png"></image>
			<view>react</view>
		</view>
		<view class="sortItem" @click="toSubject('node')">
			<image src="/static/practice/node.png"></image>
			<view>node</view>
		</view>
		<view class="sortItem" @click="toSubject('webpack')">
			<image src="/static/practice/webpack%20.png"></image>
			<view>webpack</view>
		</view>
		<view class="sortItem" @click="toSubject('')">
			<image src="/static/practice/016.png"></image>
			<view>all</view>
		</view>
	</view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    toSubject: function(myclass) {
      uni.navigateTo({
        url: `./practice?myclass=${myclass}`
      });
    }
  }
};
</script>

<style scoped lang="scss">
	.sortBox{
		width: 100%;
		height: 100vh;
		.sortItem{
			width: 40%;
			height: 8vh;
			float: left;
			margin: 20px 0px 10px 25px;
			border-radius: 5px;
			box-shadow: 0px 4px 20px -6px #C0C0C0;
			image{
				width: 23%;
				height: 58%;
				float: left;
				margin: 8% 0 0% 15%;
			}
			view{
				font-size: 14px;
				height: 8vh;
				line-height: 8vh;
				float: left;
				margin-left: 8%;
			}
		}
	}
</style>
