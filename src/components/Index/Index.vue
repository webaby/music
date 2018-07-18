<template>
    <div class="home">
        <header>
            <el-row class="header_c inner_c" type="flex">
                <el-col :span="4" class="logo">
                  <a href="javescript: void(0)"></a>
                </el-col>
                <el-col :span="4">
                <nav>
                  <el-col :span="12" class="item cur">
                    <div class="myMusic" @click="go('index')">
                      发现音乐
                    </div>
                  </el-col>
                  <el-col :span="12" class="item">
                    <div class="myMusic" @click="go('song')">
                      我的音乐
                    </div>
                  </el-col>
                </nav>
                </el-col>
                <el-col :span="6" >
                  <div class="subnav">
                    <a href="javescript: void(0)">歌单</a>
                    <a href="javescript: void(0)">电台</a>
                    <a href="javescript: void(0)">音乐人</a>
                    <a href="javescript: void(0)">客户端</a>
                  </div>
                </el-col>
                <el-col :span="8" class="search">
                  <el-input placeholder="请输入内容" size="mini">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                      <el-option label="歌名" value="1"></el-option>
                      <el-option label="歌星" value="2"></el-option>
                      <el-option label="歌词" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                  </el-input>
                </el-col>
                <el-col :span="2" class="userinfo">
                    <a href="javescript: void(0)">消息</a>
                    <a href="javescript: void(0)">大西瓜</a>
                </el-col>
            </el-row>
        </header>
        <Gap v-bind:gapLeft="gapLeft" :gapRight="gapright"></Gap>
        <el-row class="inner_c">
          <el-col :span="16">
            <Main></Main>
          </el-col>
          <el-col :span="7" :offset="1">
            <SideBox></SideBox>
          </el-col>
        </el-row>
    </div>
</template>

<script>
import Gap from '../Gap/Gap.vue';
import Main from '../Main/Main.vue';
import SideBox from '../SideBox/sideBox.vue';

export default {
  data(){
    return {
      select: "搜索方式",
      gapLeft: ["热门", "排行榜", "专辑", "艺人", "风格", "寻光计划"],
      gapright: ["兑换码", "VIP会员", "最近播放", "下载客户端"],

    }
  },
  methods: {
    go(routername) {
      this.$router.push(routername)
    },
  },
  components: {
    Gap,
    Main,
    SideBox
  }
}
</script>

<style lang="less" scoped>
    .home {
        width: 100%;

    }
    header {
        background: #f77e1b;
        height: 60px;
        overflow: hidden;
        .logo{
          a {
            display: block;
            width: 100%;
            height: 100%;
            background-image: url(/static/images/default.png);
          }
        }
        nav{
          height: 60px;
          text-align: center;
          color: #fff;
          text-shadow: 0 1px 1px rgba(0,0,0,0.5);
          font: 16px/60px "Microsoft Yahei";
          .item{
            height: 60px;
            cursor: pointer;
            &.cur{
              background: linear-gradient(to bottom, #DB6600 0, #F57614 100%);
            }
          }
        }
        .subnav{
          margin-top: 15px;
          padding-left: 10px; 
          width: 100%;
          text-align: center;
          overflow: hidden;
          a{
            float: left;
            color: #fff;
            width: 60px;
            text-shadow: 0 1px 1px rgba(0,0,0,0.5);
            font: 14px/30px "Mircrosoft Yahei";
            height: 30px;
            border-color:  #DB6B16;
            border-width: 1px 0 1px 1px;
            border-style: solid;
            background: linear-gradient(to bottom, #FA8C1E 0, #FA8014 100%);
            &:last-child{
              border-width: 1px;
            }
            &:hover{
              background: linear-gradient(to bottom, #DB6600 0, #F57614 100%);
            }
          }
        }
        .search{
          padding: 16px 0 0 5px;
          .el-input-group__prepend{
            .el-select{
              width: 95px;
            }
          }
        }
        .userinfo{
          padding: 15px 0 0 3px;
          font: 14px/30px "微软雅黑";
          height: 30px;
          a{
            color: #fff;
          }
        }
    }
    .header_c {
      height: 60px;
    }
</style>