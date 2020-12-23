<template>
	<view class="sortBox">
		<view class="sortItem" style="background-color: pink;" @click="toSubject('html')">
			<image src="/static/practice/006.png"></image>
			<view>html</view>
		</view>
		<view class="sortItem" style="background-color: yellow;" @click="toSubject('css')">
			<image src="/static/practice/007.png"></image>
			<view>css</view>
		</view>
		<view class="sortItem" style="background-color: orange;" @click="toSubject('js')">
			<image src="/static/practice/009.png"></image>
			<view>js</view>
		</view>
		<view class="sortItem" style="background-color:royalblue ;" @click="toSubject('jq')">
			<image src="/static/practice/008.png"></image>
			<view>jq</view>
		</view>
		<view class="sortItem" style="background-color: #B2A6E5;" @click="toSubject('ajax')">
			<image src="/static/practice/013.png"></image>
			<view>ajax</view>
		</view>
		<view class="sortItem" style="background-color: #BCE771;" @click="toSubject('es6')">
			<image src="/static/practice/012.png"></image>
			<view>es6</view>
		</view>
		<view class="sortItem" style="background-color: #31E0F5;" @click="toSubject('vue')">
			<image src="/static/practice/011.png"></image>
			<view>vue</view>
		</view>
		<view class="sortItem" style="background-color: #D2DCE2;" @click="toSubject('react')">
			<image src="/static/practice/010.png"></image>
			<view>react</view>
		</view>
		<view class="sortItem" style="background-color: #35DCA4;" @click="toSubject('node')">
			<image src="/static/practice/node.png"></image>
			<view>node</view>
		</view>
		<view class="sortItem" style="background-color: #35DCA4;" @click="toSubject('webpack')">
			<image src="/static/practice/webpack%20.png"></image>
			<view>web</view>
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
		height: 100%;
		.sortItem{
			width: 30%;
			height: 35px;
			float: left;
			margin: 10px 0px 10px 47px;
			border-radius: 5px;
			image{
				width: 20%;
				height: 80%;
				float: left;
				padding-top: 5px;
				padding-left: 20px;
			}
			view{
				height: 35px;
				line-height: 35px;
				float: left;
				padding-left: 10px;
			}
		}
	}
</style>
