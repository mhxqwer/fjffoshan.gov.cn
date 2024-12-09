//<div class="gab"><a href="javascript:void(0)" onclick="aria.oldFixedStart()" target="_self">关怀版</a></div>

function search() {
　　var keyword = $('.keyword').val();
    if(keyword&&keyword!="请输入关键字"){
    // 　　var url = 'http://search.gd.gov.cn/search/local_msg/757001?keywords=' + window.encodeURIComponent(keyword);
        var url = 'https://www.foshan.gov.cn/so/s?qt=' + window.encodeURIComponent(keyword);
    　　window.open(url);
    }
}
function createHead2020(){
    document.write('<!-- <style>'+
'/** 试运行图标 */'+
'#header_utr_trip {'+
'	    width: 82px;'+
'        height: 22px;'+
'        position: absolute;'+
'        z-index: 999;'+
'        top: 10px;'+
'        right: 50px;'+
'}'+
'</style> -->'+

'  <script type="text/javascript" src="/js/sjtj.js?v2"></script>'+
'<style>.english{margin:0;}.btnList{width:404px;}#grzx:after{content:"";background:url(/images/login.png);width:15px;height:15px;left: 6px;top: 4px;position: absolute;}#wza:after{position: absolute;content:"";background:url(/images/wza.png);width:14px;height:16px;left: 6px;top: 4px;}#wza{position: relative;padding-left:23px;}#grzx{margin-left: 10px;position: relative;padding-left:23px;right:0;float:none;top:0;    line-height: inherit!important;}@media screen and (max-width:1001px){.rt-part .btnList{width:404px;}}@media screen and (max-width:768px){#grzx {right: 1%;display: block;width: 70px;}.btnList a#slh{float:right;}.btnList a{display:none;font-size:16px!important;}.btnList p{font-size:16px!important;}.btnList .english{float:right;display:block;}.rt-part .btnList{display:block;width:55px;float:right;}}@media screen and (max-width:540px){#wza{       width: 43px; display: none!important;}.rt-part .btnList{width:408px;/* display:none;*/ display:block;}.rt-part .btnList{width:185px;/* display:none;*/ display:block;float:right;}.rt-part .btnList a{font-size:16px!important;}.rt-part .btnList p{font-size:16px!important;}.gab{left: 67%;}.gab a {background: none;padding-left: 8px;}}</style>  '+
'	<link rel="stylesheet" href="//g.alicdn.com/de/prismplayer/2.7.4/skins/default/aliplayer-min.css" />'+
'<script charset="utf-8" type="text/javascript" src="//g.alicdn.com/de/prismplayer/2.7.4/aliplayer-min.js"></script>'+
' '+
'<div class="hbg">'+
'     <!-- <div id="header_utr_trip"><img src="/images/ShiYunXing.png"></div> -->'+
'    <div class="main">'+
'        <span style="display:none;color:#fff;cursor:pointer;position: relative;top: 5px;font-size:14px;" id="tcdltcdl">退出登录</span>'+

'        <div class="rt-part">'+
'            '+
'            <div class="btnList fl"> '+
'                '+
'                <a  id="slh" href="javascript:void(0)" onclick="aria.start()" target="_self"  style="background: #dd0900;">长者助手</a>'+
'       <a style="display:none;" id="grzx"  target="_blank" href="https://www.foshan.gov.cn/user.html"></a>'+
'                <a style="display: none;" id="StranLink" onclick="StranBody();" href="javascript:StranBody()" title="點擊以繁體中文方式瀏覽">繁</a>'+
'                    <a id="wza" href="javascript:void(0)" onclick="aria.start()" target="_self">无障碍</a>'+
'                <span class="lng">'+
'                    <a title="简体中文版" data-cok="0" class="on">简体</a>'+
'                    <a title="繁體中文版" data-cok="1">繁体</a>'+
'                </span>'+
// '                    <a class="english" href="https://www.foshan.gov.cn/english/" title="英文版">EN</a>'+
'            </div>'+
'                    <a style="display: none;"  href="javascript:void(0)"  id="changeType"><img src="http://www.foshan.gov.cn/images2019/tv.png" alt="" urlisabs="true"></a><p class="fr">网站支持IPv6</p>'+
'            </div>'+
'        <div class="section">'+
'            <a href="http://www.foshan.gov.cn/" class="logo">'+
'            <img src="http://www.foshan.gov.cn/images2019/logo.png" alt="佛山市人民政府" urlisabs="true"></a>'+
'        <div class="search">'+
'            <div class="searchbox clearfix" style="position:relative;">'+





'                <div id="searchForm" onkeydown="if(event.keyCode==13) {search()}">'+
'                    <input type="text" style="width:0;height:0;opacity: 0;position: absolute;border:none">'+
'                     <input value="请输入关键字" placeholder="请输入关键字" class="key keyword fl" oninput="connetSearch(value)">'+
'                     <input type="button" class="searchBtn submitBtn fl" value="">'+
'                     <input id="tk" name="keywords" type="hidden">'+
'                </div>'+

                '<div class="keyword-frame" id="input-keyword-frame" style="z-index:999;position: absolute;top: 48px;background: #fff;width: 100%;text-align: left;font-size: 14px;text-indent: 28px;line-height: 32px;border: 1px solid #ccc;box-sizing: border-box;border-top: none;color: #999;"></div>'+

'            </div>'+
'            <p class="hot-search"><span>热门搜索&nbsp;:</span>'+
'            <em id="hotKey">.hot-key'+
'                <a class="hot-key">出入境</a>'+
'                <a class="hot-key">政务服务</a>'+
'                <a class="hot-key">政府公报</a>'+
'                <a class="hot-key">12345热线</a>'+
'                <a class="hot-key">佛山通</a>'+
'                <a class="hot-key">科研成果</a>'+
'                </em></p>'+
'                </div>'+
'                 </div>'+
'                 </div>'+
'                 </div>'+
'<div class="menu-handler"><span class="burger burger1"></span><span class="burger burger2 trans-fast"></span><span class="burger burger3"></span></div>'+
'<div class="nav-part">'+
'    <div class="navbox ">'+
'        <div class="mask">'+
'     </div>'+
'     <div class="main">'+
'         <div class="nav clearfix">'+
'             <ul>'+
'                <li class="house"><a href=\'/\'>  <span class="iconfont iconzhuye"></span><em>首页</em></a></li>'+
'                <li><a href="http://www.foshan.gov.cn/rdtj/index.html"><span>热点推荐</span></a></li>'+
'         <li><a href="http://www.foshan.gov.cn/zwgk/index.html"><span>政务公开</span></a></li>'+
'                <li><a href="http://www.gdzwfw.gov.cn/?region=440600"><span>政务服务</span></a></li>'+
'                <li><a href="http://www.foshan.gov.cn/hdjl/index.html"><span>互动交流</span></a></li>'+
'                <li><a href="http://www.foshan.gov.cn/zjfs/index.html"><span>走进佛山</span></a></li>'+
'                <li class="last"><a target="_blank" href="http://gddata.gd.gov.cn/data/dataSet/toDataSet/dept/38"><span>数据开放</span></a></li>'+
'                </ul>'+
'            </div>'+
'        </div>'+
'    </div>'+
'</div>'+
'<script src="//slhsrv.southcn.com/wza/aria.js?app=www-foshan-gov-cn"  referrerpolicy="origin"></script>');
}
createHead2020();

// function log(uuid) {
//     var data = {
//         uuid: uuid
//     };
//     $.ajax({
//         url: 'http://192.168.11.32:9081/anon/userActive',
//         type: "post",
//         data: JSON.stringify(data),
//         dataType: "json",
//         contentType: "application/json",
//         success: function (res) {},
//     });
// }

function submit(){
　　var keyword = $('.keyword').val();
    if(keyword&&keyword!="请输入关键字"){
 
        var url = 'https://www.foshan.gov.cn/so/s?qt=' + window.encodeURIComponent(keyword);
    　　window.open(url);
    }
}

//防止搜索抖动
let timer = null;
function connetSearch(value) {
    clearTimeout(timer);
    $('#input-keyword-frame').html('')
    var uuid = new Date().getTime();
    var data = { text: value, uuid: uuid };
    // var data = { keyword: value};
    // log(uuid);
    timer = setTimeout(function(){
        $.ajax({
            headers: {
                "Content-Type": "application/json"
            },
            type: "post",
            dataType: "json",
            url: 'https://www.foshan.gov.cn/search/searchApi/anon/api/isearch/input',
            data: JSON.stringify(data),
            success: function (res) {
                let data = res.data;
                let html = "";
                for(i in data){
                    html += '<a href="javascript:void(0);" style="display:block;" class="keyword-frame-item">'+data[i]+'</a>'
                }
                $('#input-keyword-frame').html(html)

                $(".keyword-frame-item").on("click", function () {
                    $('.keyword').val($(this).html());
                    submit();
                    $('#input-keyword-frame').html('')
                })
            },
        });
    },300)
}

$(document).ready(function(){
    $('.submitBtn').on('click', function () {
    　　var keyword = $('.keyword').val();
        if(keyword&&keyword!="请输入关键字"){
        // 　　var url = 'http://search.gd.gov.cn/search/local_msg/757001?keywords=' + window.encodeURIComponent(keyword);
        
            var url = 'https://www.foshan.gov.cn/so/s?qt=' + window.encodeURIComponent(keyword);
        　　window.open(url);
        }
    });
})

window.addEventListener("load", (event) => {
    document.getElementById("wza").style.display = 'inline-block';
    document.getElementById("slh").style.display = 'inline-block';
    $('#slh').on('keydown', function (e) {
      var keyCode = e.keyCode || window.event.keyCode;
      if(keyCode == 13) {
        this.click()
      }
    })
    $('#wza').on('keydown', function (e) {
      var keyCode = e.keyCode || window.event.keyCode;
      if(keyCode == 13) {
        this.click()
      }
    })
    document.getElementById("wza").onclick = function() {
      ariaTool.init({
        ariaPcGabMode: false
      })
    }
    document.getElementById("slh").onclick = function() {
      ariaTool.init()
    }
  });