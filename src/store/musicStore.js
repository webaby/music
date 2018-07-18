export default {
    namespaced: true,
    state: {
        "curIdx": 0,
        "lists": {
            "like": [
                {
                    "todayRecommend":[
                        "//pic.xiami.net/images/album/img93/14/5b2b605a4b116_707493_1529569370.jpg@1e_1c_100Q_100w_100h",
                        "//pic.xiami.net/images/album/img38/273038/2730381519273039.jpg@1e_1c_100Q_100w_100h",
                        "//pic.xiami.net/images/album/img72/251472/2514721528251472.jpg@1e_1c_100Q_100w_100h",
                        "//pic.xiami.net/images/album/img21/197/58228b04f0d5d_9877321_1478658820.jpg@1e_1c_100Q_100w_100h"
                    ]
                },
                {
                    "imgSrc": "//pic.xiami.net/images/album/img85/122/59ba12fa60265_6114285_1505366778.jpg@1e_1c_100Q_185w_185h",
                    "href": "https://www.xiami.com/album/9cAh5cf755c"
                },
                {
                    "imgSrc": "//pic.xiami.net/images/album/img87/77/59140491e1436_3858987_1494484113.jpg@1e_1c_100Q_185w_185h",
                    "href": "https://www.xiami.com/album/yhOSaZ994ee"
                },
                {
                    "imgSrc": "//pic.xiami.net/images/album/img95/499495/4994951476499495.jpg@1e_1c_100Q_185w_185h",
                    "href": "https://www.xiami.com/album/yhN1JTaec1a"
                },
                {
                    "imgSrc": "//pic.xiami.net/images/album/img10/198/590202564e11e_9913510_1493303894.jpg@1e_1c_100Q_185w_185h",
                    "href": "https://www.xiami.com/album/yhOOZ6bbb12"
                }
            ],
            "newDist": [

            ]
        },
        myMusic: [
            {
                "singerImg": "/static/images/music/myMusic/艾辰.jpg",
                "playerbg": "/static/images/music/bg/艾辰.jpg",
                "albumImg": "/static/images/music/album/艾辰/艾辰.jpg",
                "musicName": "来不及说再见",
                "musicSinger": "艾辰",
                "musicUrl": "/static/audio/myMusic/艾辰 - 来不及说再见.mp3",
                "musicLyric": "/static/audio/myMusic/Lyric/艾辰 - 来不及说再见-13bc0feff49764ca0d85aaa5aef21717-23834965-00000000.lrc"
            },
            {
                "singerImg": "/static/images/music/myMusic/张蔷.jpg",
                "playerbg": "/static/images/music/album/张蔷/张蔷.jpg",
                "albumImg": "/static/images/music/album/张蔷/张蔷.jpg",
                "musicName": "我希望在你的爱情里",
                "musicSinger": "张蔷",
                "musicUrl": "/static/audio/myMusic/张蔷 - 我希望在你的爱情里.mp3",
                "musicLyric": "/static/audio/myMusic/Lyric/张蔷 - 我希望在你的爱情里-5e0f3a652e6cfa06f84fd6ef4fc2bc68-30072585-00000000.lrc"
            },
            {
                "singerImg": "/static/images/music/myMusic/艾辰.jpg",
                "playerbg": "/static/images/music/bg/艾辰.jpg",
                "albumImg": "/static/images/music/album/艾辰/艾辰.jpg",
                "musicName": "9420",
                "musicSinger": "艾辰",
                "musicUrl": "/static/audio/myMusic/艾辰 - 9420.mp3",
                "musicLyric": "/static/audio/myMusic/Lyric/艾辰 - 9420-48547c64a5aa9f6f0e4426fe233a59b5-26427848-00000000.lrc"
            },
            {
                "singerImg": "/static/images/music/myMusic/艾辰.jpg",
                "playerbg": "/static/images/music/bg/艾辰.jpg",
                "albumImg": "/static/images/music/album/艾辰/艾辰.jpg",
                "musicName": "我的一个道姑朋友",
                "musicSinger": "艾辰",
                "musicUrl": "/static/audio/myMusic/艾辰 - 我的一个道姑朋友.mp3",
                "musicLyric": "/static/audio/myMusic/Lyric/艾辰 - 我的一个道姑朋友-2cb60923f2064dc352534f82c1acd4c7-28177725-00000000.lrc"
            },
            {
                "singerImg": "/static/images/music/myMusic/艾辰.jpg",
                "playerbg": "/static/images/music/myMusic/艾辰bg.jpg",
                "albumImg": "/static/images/music/album/艾辰/艾辰.jpg",
                "musicName": "花桥流水",
                "musicSinger": "纳兰珠儿、高安",
                "musicUrl": "/static/audio/myMusic/纳兰珠儿、高安 - 花桥流水.mp3",
                "musicLyric": "/static/audio/myMusic/Lyric/纳兰珠儿、高安 - 花桥流水-d1690509d2742b80042d0bb254b73553-27704996-00000000.lrc"
            },
        ]
    },
    mutations: {
        CHANGECURIDX(state, payload){
            if(payload == "prev") {
                state.curIdx = state.curIdx == 0 ? state.myMusic.length - 1 : state.curIdx - 1;
            }else if(payload == "next") {
                state.curIdx = state.curIdx >= state.myMusic.length - 1 ? 0 : state.curIdx + 1;
            }else if(typeof payload == "number") {
                state.curIdx = payload;
            }
        }
    },
    actions: {

    }
}