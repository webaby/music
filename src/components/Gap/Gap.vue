<template>
    <div class="gap">
        <el-row class="inner_c">
            <el-col :span="10" class="gapL" :offset="3">
                <ul>
                    <li v-for="item in gapLeft">
                        <a href="javascript: void(0)">{{item}}</a>
                    </li>
                    <span></span>
                </ul>
            </el-col>
            <el-col :span="9" :offset="2" class="gapR">
                <ul>
                    <li v-for="item in gapRight">
                        <a href="javascript: void(0)">{{item}}</a>
                    </li>
                </ul>
            </el-col>
        </el-row>
    </div>
</template>
<script>
export default {
    props: ["gapLeft", "gapRight"],
    mounted(){
        var $lisul = $(".gapL ul li");
        var $span = $(".gapL ul span");
        $span.css("width", $lisul.eq(0).innerWidth());
        $lisul.mouseenter(function(){
            var $spanLeft = 0;
            $(this).prevAll().each(function(){
                $spanLeft += $(this).outerWidth(true);
            });
            $span.css("width", $(this).innerWidth()).stop(true).animate({
                "left": $spanLeft
            }, 270);
        });
        $(".gapL ul").mouseleave(function(){
             $(".gapL ul span").css("width", $lisul.eq(0).innerWidth()).stop(true).animate({"left": 0}, 270);
        });
    },
    updated(){
        console.log("更新了");
    },
    data(){
        return {}
    }
}
</script>

<style lang="less" scoped>
    .gap{
        width: 100%;
        height: 30px;
        margin-bottom: 20px;
        background: linear-gradient( #f77e1b, yellowgreen,#fff);
        ul{
        height: 30px;
        position: relative;
            li{
                position: relative;
                float: left;
                height: 30px;
                margin-right: 10px;
                z-index: 5;
                padding: 0 10px;
                a{
                    display: block;
                    height: 30px;
                    font: 14px/30px "微软雅黑";
                    text-align: center;
                    text-shadow: 0 1px 10px rgba(255,215,0,0.5);
                }
            }
        }
        .gapL{
            span{
                position: absolute;
                display: block;
                height: 30px;
                background: rgba(	139,0,139, 0.5);
                // border: 1px groove gold;
                // border-radius: 55px;
                top: 0;
            }  
        }
        .gapR{
            a{
                &:hover{
                    color: orange;
                }
            }
        }
    }
    .gap::before{
        content:"";
        width: 100%;
        height: 30px;
        position: absolute;
        background: rgba(0,0,0,0.5);
    }
</style>
