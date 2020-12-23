<template>
  <view class="homeContaienr">
    <view class="searchBoxCon">
      <view class="searchBox">
        <view class="searchImg">
          <image src="../../static/search/sousuo.png"
                 mode=""></image>
        </view>
        <input type="text"
               v-model="inpvalue"
               value=""
               @click="goSearch"
               class="inp"
               placeholder="搜索您想要的内容" />
      </view>
      <view class='searchbtn'>
        <text>搜索</text>
      </view>
    </view>
    <view class="swiperBox">
      <swiper class="swiper"
              :indicator-dots="indicatorDots"
              :autoplay="autoplay"
              :interval="interval"
              :duration="duration">
        <swiper-item v-for="item in bannerList"
                     :key="item.id"
                     class="swiperImg">
          <image :src="item.url"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="officialQuestion">
      <p class="title">官方题库</p>
      <view class="iconsBox">
        <view class="icons"
              v-for="item in iconList"
              :key='item.id'
              @click="switchPage(item.txt)">
          <image :src="item.url"></image>
          <text>{{item.txt}}</text>
        </view>
      </view>
    </view>
    <!-- 热门功能 -->
    <view class="hotFunction">
      <p class="title">热门功能</p>
      <view class="hotImg">
        <image src="../../static/index/hot1.png"
               mode=""></image>
        <image src="../../static/index/hot2.png"
               mode=""></image>
      </view>
    </view>
    <!-- 最新消息 -->
    <view class="hotNews">
      <p class="title">最新消息</p>
      <view class="newsbox"
            v-for="(item,index) in dataList[0]"
            :key='item.id'>
        <image :src="item.cover"
               mode=""></image>
        <view class="rightbox">
          <h2 class="sort"> {{index+1}}.</h2>
          <h2>{{item.title}}</h2>
          <text class="summary">描述：{{item.summary}}</text>
          <text>{{item.updated_at}}</text>
        </view>
      </view>
      <view class="addmore">
        <p @click="addMore">{{indexFlag+1==dataList.length?"没有更多数据了":"加载更多"}}</p>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      inpvalue: "",
      indicatorDots: false,
      autoplay: true,
      interval: 2000,
      duration: 500,
      dataList: [], //数据列表
      indexFlag: 0, //下标
      bannerList: [
        {
          url: "../../static/index/banner1.png",
          id: 1
        },
        {
          url: "../../static/index/banner2.png",
          id: 2
        },
        {
          url: "../../static/index/banner3.png",
          id: 3
        }
      ],
      iconList: [
        {
          id: 1,
          url: "../../static/index/html.png",
          txt: "html"
        },
        {
          id: 2,
          url: "../../static/index/css1.png",
          txt: "css"
        },
        {
          id: 3,
          url: "../../static/index/js.png",
          txt: "js"
        },
        {
          id: 4,
          url: "../../static/index/Jquery.png",
          txt: "jq"
        },
        {
          id: 5,
          url: "../../static/index/vue.png",
          txt: "vue"
        },
        {
          id: 6,
          url: "../../static/index/jsx.png",
          txt: "react"
        }
      ],
      newDdata: []
    };
  },
  onLoad() {
    this.getCurrentData();
  },
  methods: {
    // 加载更多
    addMore() {
      if (this.dataList.length > this.indexFlag + 1) {
        this.dataList[this.indexFlag + 1].forEach(item => {
          this.dataList[0].push(item);
        });
        this.indexFlag += 1;
      }
    },
    switchPage(myclass) {
      uni.navigateTo({
        url: `/pages/practice/practice?myclass=${myclass}`
      });
    },
    // 实时新闻
    getCurrentData() {
      uni.request({
        url: "https://unidemo.dcloud.net.cn/api/news",
        method: "GET",
        data: {},
        success: res => {
          let newarr = [];
          for (let i = 0; i < res.data.length; i += 3) {
            newarr.push(res.data.slice(i, i + 3));
          }
          this.dataList = newarr;
        }
      });
    },
    // 跳转到搜索页面
    goSearch() {
      uni.switchTab({
        url: "/pages/search/search"
      });
    },
    // 轮播
    changeIndicatorDots(e) {
      this.indicatorDots = !this.indicatorDots;
    },
    changeAutoplay(e) {
      this.autoplay = !this.autoplay;
    },
    intervalChange(e) {
      this.interval = e.target.value;
    },
    durationChange(e) {
      this.duration = e.target.value;
    }
  }
};
</script>

<style scoped lang="scss">
* {
  margin: 0;
  padding: 0;
}

.homeContaienr {
  overflow: hidden;

  .searchBoxCon {
    width: 100vw;
    height: 60px;
    margin: 10px 0px 0px 15px;
    .searchBox {
      width: 65vw;
      height: 35px;
      border: 1px solid #fe5407;
      border-radius: 25px;
      float: left;
      margin-left: 10px;

      .searchImg {
        width: 6%;
        height: 45%;
        margin: 7px 17px;
        float: left;

        image {
          width: 100%;
          height: 100%;
        }
      }

      .inp {
        width: 60%;
        height: 60%;
        padding: 6px 5px;
        float: left;
      }
    }

    .searchbtn {
      padding: 10px;
      width: 50px;
      height: 18px;
      font-size: 15px;
      background: #fe5407;
      float: left;
      border-radius: 25px;
      margin-left: 20px;

      text {
        display: block;
        text-align: center;
        color: #ffffff;
        line-height: 18px;
      }
    }
  }

  .swiperBox {
    width: 95%;
    margin: auto;

    .swiperImg {
      image {
        width: 100vw;
        height: 150px;
      }
    }
  }

  .title {
    margin: 5px 12px;
    font-weight: 600;
    font-size: 15px;
  }

  .officialQuestion {
    width: 100%;
    height: 180px;
    // background: pink;
    margin: 20px auto;

    .iconsBox {
      width: 100%;
      height: 80%;
      margin: 13px auto;
      display: flex;
      flex-flow: wrap;

      .icons {
        width: 70px;
        height: 60px;
        margin: 10px 0px 0px 45px;

        // flex: 3;
        text {
          text-align: center;
          padding: 5px;
          font-size: 12px;
        }

        image {
          width: 35px;
          height: 30px;
          display: block;
        }
      }
    }
  }

  .hotFunction {
    .hotImg {
      display: flex;

      image {
        width: 160px;
        height: 100px;
        margin: 10px 0px 0px 15px;
      }
    }
  }

  .hotNews {
    width: 100%;
    margin-top: 20px;

    .addmore {
      width: 80%;
      margin: 20px auto;
      font-size: 14px;

      p {
        text-align: center;
      }
    }

    .newsbox {
      width: 90%;
      height: 100%;
      padding: 10px;
      margin: 10px auto;
      background: #f8f8f8;
      border-radius: 5px;
      display: flex;
      justify-content: space-between;

      .rightbox {
        width: 100%;
        margin-left: 20px;
        font-size: 12px;

        .sort {
          float: left;
        }

        h2 {
          font-size: 12px;
        }

        .summary {
          padding: 10px 2px;
          display: block;
        }
      }

      image {
        width: 135px;
        height: 100px;
        padding-top: 6px;
        display: block;
      }
    }
  }
}
</style>
