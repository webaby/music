<template>
    <div class="player">
        <el-row class="header">
            <el-col :span="4" class="logo">
                <h3>
                    西瓜音乐
                </h3>
            </el-col>
            <el-col :span="6">sdf</el-col>
            <el-col :span="10">
                <div class="search">
                    <el-input placeholder="请输入内容" size="mini">
                    <el-select v-model="select" slot="prepend" placeholder="请选择">
                        <el-option label="歌名" value="1"></el-option>
                        <el-option label="歌星" value="2"></el-option>
                        <el-option label="歌词" value="3"></el-option>
                    </el-select>
                    <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="3" class="sign">
                <span>
                    <a href="javascript:">测试用户</a>
                </span>
                <span>
                    <a href="javascript:">注销</a>
                </span>
            </el-col>
        </el-row>
        <div class="content">
            <el-row class="song-content clearFix">
                <el-col :span="8" class="album fl">
                    <div class="albumImg">
                        <a href="javascript:" :title="playList[$store.state.musicStore.curIdx].musicName">
                            <img :src="playList[$store.state.musicStore.curIdx].albumImg">
                        </a>
                    </div>
                    <div class="download-music">
                        <a href="http://xiami.com">下载这首歌</a>
                    </div>
                </el-col>
                <el-col :span="16" class="lrc-content">
                    <div class="lrchead">
                        <p>
                            歌曲名：{{lrc.head.musicName}}
                        </p>
                        <p>
                            歌手名：{{lrc.head.singer}}
                        </p>
                    </div>
                    <div class="lrcbody">
                        <ul>
                            <li v-for="item in lrc.body">
                                {{item[1]}}
                            </li>
                        </ul>
                    </div>
                </el-col>
            </el-row>
            <div class="blurBg" :style="{background: `url(${playList[$store.state.musicStore.curIdx].playerbg}) no-repeat 0 0/ 100% 100%`}"></div>
            <div class="blurBgMask"></div>
        </div>
        <!-- 控制面板区 -->
        <el-row class="controlPanel">
            <audio 
                ref="audio" 
                :src="playList.length ? playList[$store.state.musicStore.curIdx].musicUrl : null" 
                autoplay
                @timeupdate="playing()"
            ></audio>
            <!-- 控制左边区域 -->
            <el-col :span="4" class="control-left">
                <a @click="changeCurIdx('prev')" class="v-icon v-prev"></a>
                <a
                    @click="playOrPause"
                    class="v-icon" 
                    :class="isPlay ? 'v-pause' : 'v-play'"
                ></a>
                <a @click="changeCurIdx('next')" class="v-icon v-next"></a>
            </el-col>
            <!-- 专辑封面 -->
            <el-col :span="2" class="singer">
                <div class="imgbox">
                    <a href="">
                        <img :src="playList[$store.state.musicStore.curIdx].albumImg" alt="">
                    </a>
                </div>
            </el-col>
            <!-- 模块中间部分：含歌名，时间，进度条 -->
            <el-col :span="9">
                <div class="control-bar">
                    <el-row>
                        <el-col :span="18" class="musicName">{{`${playList[$store.state.musicStore.curIdx].musicName} - ${playList[$store.state.musicStore.curIdx].musicSinger}`}}</el-col>
                        <el-col :span="6" class="duration">
                            <!-- 当前时间 -->
                            <i class="current-time">
                                00:00
                            </i>
                            {{" / "}}
                            <!-- 总时间 -->
                            <i class="all-time">
                                00:00
                            </i>
                        </el-col>
                    </el-row>
                    <div class="bar">
                        <div class="bar_bg" @click="goTime($event)">
                            <span ref="process"></span>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :offset="1" :span="4">
                <el-row :gutter="10" class="control-right">
                    <el-col :span="6">
                        <a class="iconfont icon-laba" href="javascript:"></a>
                    </el-col>
                    <el-col :span="6">
                        <a class="iconfont icon-xunhuan" href="javascript:"></a>
                    </el-col>
                    <el-col :span="6">
                        <a class="iconfont icon-icon--" href="javascript:"></a>
                    </el-col>
                    <el-col :span="6">
                        <a class="iconfont icon-fenxiang1" href="javascript:"></a>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="2" class="list">
                    <a class="iconfont icon-zhankaicaidan" href="javascript:" @click="changeShowPlayerList"></a>
                    <div class="musiclist" v-if="isShowPlayerList">
                        <ul>
                            <li v-for="(item, index) in playList" :class="index == playerIdx ? 'cur' : null">
                                <a href="javascript:" @click="changeCurIdx(index)">
                                    {{`${playList[index].musicName} - ${playList[index].musicSinger}`}}
                                </a>
                            </li>
                        </ul>
                    </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    data(){
        return {
            "playList": this.$store.state.musicStore.myMusic,
            "isPlay": false,
            "lrc": {
                "head": "",
                "body": ""
            },
            "select": "搜索方式",
            "isShowPlayerList": false
        }
    },
    mounted(){
        $(".content").css("height", $(window).height() - $(".header").height());
        window.onresize = function() {
            $(".content").css("height", $(window).height() - $(".header").height());
        }
        this.$http.get(this.$store.state.musicStore.myMusic[this.$store.state.musicStore.curIdx].musicLyric).then(data => {
            $(".lrc-content .lrcbody").height($(".content").height() - $(".lrc-content .lrchead").height() - $(".controlPanel").height() - 30);
            this.lrc = this.fixLrc(data.data);
        });
    },
    watch: {
        playerIdx() {
            const self = this;
            // console.log(this.$store.state.musicStore.myMusic[this.$store.state.musicStore.curIdx].musicLyric);

            self.$http.get(this.$store.state.musicStore.myMusic[this.$store.state.musicStore.curIdx].musicLyric).then(data => {
                $(".lrc-content .lrcbody").height($(".content").height() - $(".lrc-content .lrchead").height() - $(".controlPanel").height() - 30);
                this.lrc = this.fixLrc(data.data);
            });
        }
    },
    computed: {
        playerIdx() {
            return this.$store.state.musicStore.curIdx;
        }
    },
    methods: {
        playOrPause() {
            this.isPlay = !this.isPlay;
            this.isPlay && this.$refs.audio.pause();
            this.isPlay == false && this.$refs.audio.play();
        },
        changeCurIdx(payload) {
            this.isPlay = false;
            this.isShowPlayerList = false;
            this.$store.commit("musicStore/CHANGECURIDX", payload);
        },
        playing() {
            if(!this.$refs.audio) return;
            var process = this.$refs.process, audio = this.$refs.audio;
            $(process).width(audio.currentTime / audio.duration * 100 + '%');
            
            // 时间转换为分秒格式
            var sec_to_time = function(s) {
            var t;
            if(s > -1){
            var min = Math.floor(s/60) % 60;
            var sec = s % 60;
    
            if(min < 10){min = "0" + min;}
            t = min + ":";
            if(sec < 10){t += "0";}
            t += sec.toFixed(0);
            }
            return t;
            }
            // 改变当前时间内容
            $(".current-time").html(sec_to_time(audio.currentTime));
            // 改变全部时间内容
            $(".all-time").html(sec_to_time(audio.duration));
            // 如果歌曲结束，到下一首
            audio.ended && this.changeCurIdx(1);
            // 动态调整歌词的位置
            for (var i = 0; i < this.lrc.body.length; i++) {
                if( audio.currentTime >= this.lrc.body[i][0] && i >= 3){
                    $(".lrc-content ul").css({
                        "top": 30 - (i - 3) * 30
                    }).children("li").eq(i).addClass("cur").siblings("li").removeClass("cur");
                }
            };
        },
        fixLrc(lrc) {
            // 将头部信息存储
            var lrcidx, head = {}, body = [];;
            var lines = lrc.split(/\n/);
            var rule = /\[\d{2}:\d{2}.\d{2}\]/g;
            for(var i = 0; i < lines.length; i ++) {
                var kaishi = lines[i].indexOf("[");
                var maohao = lines[i].indexOf(":");
                var jieshu = lines[i].indexOf("]");
                if(lines[i].substring(kaishi + 1, maohao) == "ar") {
                console.log(123);
                    head.singer = lines[i].substring(maohao + 1, jieshu)
                }else if(lines[i].substring(kaishi + 1, maohao) == "ti") {
                    head.musicName = lines[i].substring(maohao + 1, jieshu)
                }
                if(rule.test(lines[i])) break;
            }
            // 开始过滤，找到含时间的索引值
            while(!rule.test(lines[0])) {
                lines = lines.splice(1);
            }
            lines[lines.length - 1].length == 0 && lines.pop();
            lines.forEach(item => {
                // 时间和歌词分界点
                var fenjiedian = item.indexOf("]");
                // var time = item.substring(1, fenjiedian);
                var minute = item.substring(1, item.indexOf(":") );
                var second = item.substring(item.indexOf(":") + 1, fenjiedian);
                var geci = item.substring(fenjiedian + 1);
                var seconds = minute * 60 + parseFloat(second);
                body.push([parseFloat(seconds), geci]);
            });
            return {head, body};
        },
        goTime($event) {
            this.$refs.audio.currentTime = ($event.offsetX / $(".bar_bg").width()) * this.$refs.audio.duration;
        },
        changeShowPlayerList() {
            this.isShowPlayerList = !this.isShowPlayerList;
        }
    },
}
</script>

<style lang="less" scoped>
    .player{
        width: 80%;
        margin: 0 auto;
        .header{
            width: 100%;
            height: 60px;
            background: rgba(0,0,0,.6);
            .logo {
                h3 {
                    color: #fff;
                    text-shadow: 0 1px 1px rgba(0,0,0,.5);
                    text-align: center;
                    font: 20px/60px "微软雅黑";
                }
            }
            .search {
                padding: 16px 0 0 5px;
                .el-input-group__prepend{
                    .el-select{
                    width: 95px;
                    }
                }
                .el-input__inner{
                    background: rgba(0,0,0,.1);
                }
                button {
                background: rgba(0,0,0,.1);
                }
            }
            .sign {
                text-align: center;
                font: 16px/60px "微软雅黑";
                a {
                    &:hover {
                        color:gold;
                    }
                }
            }
        }
        .content{
            position: relative;
            width: 100%;
            background-size: 100% 100%;
            overflow: hidden;
            .song-content {
                position: absolute;
                left: 50%;
                top: 5%;
                transform:translate(-50%);
                width: 60%;
                z-index: 9;
                .album {
                    .albumImg {
                        margin-bottom: 20px;
                        a{
                            display: block;
                            font-size: 0;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .download-music {
                        position: relative;
                        margin: 0 auto;
                        text-align: center;
                        height: 50px;
                        border: 1px solid #ddd;
                        border-radius: 10px;
                        width: 80%;
                        font: 18px/50px "微软雅黑";
                        // background: url(/static/images/v-icon/downlaod_bg.png) no-repeat 0 0;
                        background-size: 100% 100%;
                    }
                }
                .lrc-content {
                    min-height: 100px;
                    font-size: 14px;
                    color: #fff;
                    position: relative;
                    font: 16px/30px "微软雅黑";
                    .lrchead{
                        p {
                            text-align: center;
                            height: 30px;
                            text-shadow: rgba(0,0,0,.6);
                        }
                    }
                    .lrcbody {
                        position: relative;
                        overflow: hidden;
                        ul{
                            width: 100%;
                            position: absolute;
                            top: 30px;
                            left: 0;
                            transition: all 0.3s ease 0s;
                            li{
                                height: 30px;
                                text-shadow: 0 1px 1px rgba(0,0,0,.6);
                                font: 16px/30px "微软雅黑";
                                text-align: center;

                                &.cur {
                                    position: relative;
                                    color: gold;
                                    // &::after {
                                    //     position: absolute;
                                    //     top: 0;
                                    //     left: 0;
                                    //     display: block;
                                    //     content: "";
                                    //     width: 100%;
                                    //     height: 30px;
                                    //     background: rgba(200,200,200,.2);
                                    // }
                                }
                            }
                        }

                    }
                }
            }
            .blurBg {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                filter: blur(80px);
                -webkit-filter: blur(80px);
                -moz-filter: blur(80px);
                -ms-filter: blur(80px);
            }
            .blurBgMask {
                width: 100%;
                height: 100%;
                background-color: rgba(0,0,0,.6);
                opacity: .6;
            }
        }
        .controlPanel{
            padding: 0 3%;
            position: fixed;
            width: 80%;
            bottom: 0;
            height: 80px;
            z-index: 77;
            &:before{
                position: absolute;
                display: block;
                left: 0;
                width: 100%;
                height: 80px;
                background-color: #000;
                opacity: .3;
                filter: alpha(opacity=30);
                box-shadow: 0 -10px 20px #403f3f;
            }
            .el-col{
                position: relative;
                height: 80px;
            }
            .control-left{
                position: relative;
                height: 100%;
                .iconfont {
                    text-align: center;
                    position: absolute;
                    width: 40px;
                    height: 50px;
                    font-size:  35px;
                    line-height: 50px;
                }
                .v-icon {
                    display: block;                    
                    text-align: center;
                    position: absolute;
                    cursor: pointer;
                    background-image: url(/static/images/v-icon/btn.png);
                    background-repeat: no-repeat;
                }
                .v-prev, .v-next {
                    width: 36px;
                    height: 36px;
                    top: 50%;
                    margin-top: -18px;
                }
                .v-prev {
                    left: 10px;
                    background-position: 0 -143px;
                }
                .v-next {
                    right: 10px;
                    background-position: -144px -143px;
                }
                .v-play, .v-pause {
                    left: 50%;
                    top: 50%;
                    margin-left: -30px;
                    margin-top: -30px;
                    width: 60px;
                    height: 60px;
                }

                .v-play {
                    background-position: 0 -60px;
                }

            }
            .singer {
                margin-left: 2%;
                .imgbox{
                    position: absolute;
                    width: 60px;
                    height: 60px;
                    left: 50%;
                    top: 50%;
                    margin-left: -30px;
                    margin-top: -30px;
                }
                img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    animation: xuanzhuan 5s linear 0s infinite;
                    @keyframes xuanzhuan
                    {
                        from {transform: rotate(0deg);}
                        to {transform: rotate(360deg);}
                    }

                    @-moz-keyframes xuanzhuan /* Firefox */
                    {
                        from {transform: rotate(0deg);}
                        to {transform: rotate(360deg);}
                    }

                    @-webkit-keyframes xuanzhuan /* Safari 和 Chrome */
                    {
                        from {transform: rotate(0deg);}
                        to {transform: rotate(360deg);}
                    }

                    @-o-keyframes xuanzhuan /* Opera */
                    {
                        from {transform: rotate(0deg);}
                        to {transform: rotate(360deg);}
                    }
                }
            }
            .control-bar {
                position: relative;
                height: 100%;
                padding-top: 3%;
                margin-left: 5%;
                .musicName {
                    color: #fff;
                }
                .bar {
                    position: absolute;
                    width: 100%;
                    height: 5px;
                    top: 55%;
                    margin-top: -2.5px;
                    .bar_bg {
                        position: absolute;
                        width: 100%;
                        height: 3px;
                        top: 50%;
                        cursor: pointer;
                        margin-top: -1.5px;
                        background: rgba(200, 200, 200, 0.1);
                    }
                    span {
                        height: 3px;
                        position: absolute;
                        top: 50%;
                        margin-top: -1.5px;
                        background: #bbb;
                        display: block;
                    }
                }
                .duration {
                    color: #fff;
                    font-family: Tahoma,Arial,Verdana;
                    font-size: 12px;
                    i {
                        font-style: normal;
                    }
                }

            }
            .control-right {
                .iconfont {
                    font-size: 25px;
                    text-align: center;
                    position: absolute;
                    width: 30px;
                    height: 3opx;
                    line-height: 30px;
                    top: 50%;
                    left: 50%;
                    margin-left: -15px;
                    margin-top: -15px;
                }
            }
            .list {
                position: relative;
                margin-left: 10px;
                .iconfont {
                    font-size: 25px;
                    text-align: center;
                    position: absolute;
                    width: 30px;
                    height: 3opx;
                    line-height: 30px;
                    top: 50%;
                    margin-top: -15px;
                }
                .musiclist {
                    position: absolute;
                    bottom: 50px;
                    background: rgba(0,0,0,.3);
                    width: 200%;
                    height: 180px;
                    margin-left: 5px;
                    ul {
                        width: 100%;
                        position: absolute;
                        padding-top: 5%;
                        li {
                            width: 100%;
                            height: 25px;
                            &.cur {
                                background: rgba(245, 245, 56, 0.2);
                            }
                            a {
                                display: block;
                                width: 100%;
                                height: 25px;
                                text-indent: 1em;
                                color: #fff;
                                text-shadow: 0 1px 1px rgba(0,0,0,.2);
                                font: 14px/25px "微软雅黑";
                                overflow: hidden;
                                text-overflow:ellipsis;
                                white-space: nowrap;
                            }
                        }
                    }
                }
            }
        }
    }

</style>
