 function submit33(val1,flag){
　　var keyword = $('.keyword').val();
if(val1&&flag){
 var url = 'https://www.foshan.gov.cn/so/s?qt=' + val1;
    　　window.open(url);
}
  else  if(keyword&&keyword!="请输入关键字"){
 
        var url = 'https://www.foshan.gov.cn/so/s?qt=' + window.encodeURIComponent(keyword);
    　　window.open(url);
    }
}

/****************************cookie_start1******************************/

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString(); 
    document.cookie = cname + "=" + cvalue + "; " + expires + "; path=/; domain=www.foshan.gov.cn";
}


function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
}

function clearCookie(name) {
    setCookie(name, "", -1);
}
/****************************cookie_end********************************/

/****************************IE6-IE8检测********************************/
//if (!jQuery.support.leadingWhitespace) {
if (navigator.appName == "Microsoft Internet Explorer"&&parseInt(navigator.appVersion.split(";")[1].replace(/[ ]/g, "").replace("MSIE",""))<9) {
    // var pop = getCookie('checkBrowser');
    // if( pop != '1'){
    //     var ckbw = layer.confirm('<div style="margin-top:20px; font-size:16px; line-height: 36px;">发现您的浏览器版本较低，可能存在兼容性问题，为了得到最好的体验效果建议升级到最新版本!</div>', {
    //         btn:[ '不再提示', '关闭' ],
    //         title: false,
    //         shade: 0.7,
    //         area: ['480px', '170px']
    //     }, function() {
    //         setCookie('checkBrowser','1',1);
    //         layer.close(ckbw);
    //     }, function() {
    //     });
    // }
    alert('您的浏览器版本过低，为了更好的体验，建议升级到IE9以上版本')
}
/****************************IE6-IE8检测********************************/

/****************************头部搜索******************************/
jQuery('.searchBtn').click(function(){
    kw = jQuery('.key').val();
    if( kw == '请输入关键字' ){
        alert("请输入检索内容，谢谢！");
        return false;
    }

    // if(isDigit(kw)==true){
    //     alert("查询内容中含有非法字符...");
    //     return false;
    // }

    if( jQuery('#searchTypeBtn').html() == '政务百科' ){
        window.open('http://12345.foshan.gov.cn/FormOperationAction!listTheForm.action?jumpType=1&jumpPageTempletId=911&diyPager=1&q5='+ kw +'&offset=0&length=8&luceneCancelTag=1&luceneSsc=' + kw);
        return false
    }

    // kw = encodeURIComponent(kw) + '&OrderBy=URLTIME';
    jQuery('#searchForm').attr('action','https://search.gd.gov.cn/search/local_msg/757001');
    // 20190605
    jQuery('#searchForm').find('#tk').val(jQuery('#searchForm').find('.key').val());
  submit33(jQuery('#searchForm').find('.key').val())
});

jQuery('.key').focus(function(){
    var value = jQuery(this).val();
    if(this.value == '请输入关键字'){
        this.value=''
    }
}).blur(function(){
    var value = jQuery(this).val();
    if(this.value == ''){
        this.value='请输入关键字'
    }
});

jQuery('body').on('click','.hot-key',function(){
  jQuery('#searchForm').attr('action','https://search.gd.gov.cn/search/all/757001');
  jQuery('#searchForm').find('#tk').val(jQuery(this).text());
 submit33(jQuery(this).text(),true)
});

function enterKey(){
	console.log('')
    jQuery('.searchBtn').click();
}

//非法字符检查
function isDigit(s)
{
    var pattern = new RegExp(/[|&;jQuery%@'"+\\,<>()]|CR|LF/g);
    if (pattern.exec(s)){return true;}else{return false}
}
/****************************头部搜索******************************/


/****************************点击外链询问离开********************************/
var cklink = 1;
function extLink(act){
    if( act == false ){
        cklink = 0;
    }else{
        cklink = 1;
    }
}

jQuery(document).on('click','a',function(){
    if( cklink == 0 ) return;
    if ( jQuery(this).hasClass('ncolink') ) return;
    var o = jQuery(this);
    var href = o.attr('href');
    var host = getHost(href);
    var ckhost = host.indexOf('foshan.gov.cn');
    var ckhostOther = host.indexOf('sdata.gov.cn');
    var ckhostOther2 = host.indexOf('gd.gov.cn');
    var ckhostOther3 = host.indexOf('gz.gov.cn');
	var ckhostOther4 = host.indexOf('gdzwfw.gov.cn');

    if( host != 'null' && ckhostOther2 <= 0 && ckhostOther4 <= 0 && ckhostOther3 <= 0  && ckhost <= 0 && ckhostOther <= 0 && typeof(href)!='undefined' && o.data('ask')!='1'){
        o.removeAttr('href');
        var jx = true;
        var w = '480px';
        var h = '170px';
        if(window.screen.width < 768) { w = '90%'; h = '170px';}
        var cf = layer.confirm('<div class="ask" style="margin-top:30px; font-size:16px;">您访问的链接即将离开“佛山市政府网”门户网站 是否继续？</div>', {
            btn:[ '继续访问', '放弃' ],
            title: false,
            shade: 0.7,
            area: [w, h],
            cancel: function(index){ o.attr('href',href); }
        }, function() {
            o.attr('href',href);
            o.attr('target','_blank');
            o.data('ask','1');
            layer.close(cf);
            o[0].click();
        }, function() {
            o.attr('href',href);
        });
    }
});

//截取URL域名部份
var getHost = function(url) {
    var host = "null";
    if (typeof url == "undefined" || null == url) url = window.location.href;
    var regex = /.*\:\/\/([^\/]*).*/;
    var match = url.match(regex);
    if (typeof match != "undefined" && null != match) host = match[1];
    return host;
};

/****************************点击外链询问离开********************************/

/****************************js简繁转换_start******************************/
var Default_isFT = 0        //默认是否繁体，0-简体，1-繁体
var StranIt_Delay = 50      //翻译延时毫秒（设这个的目的是让网页先流畅的显现出来）
//－－－－－－－代码开始，以下别改－－－－－－－
//转换文本
function StranText(txt,toFT,chgTxt)
{
    if(txt==""||txt==null)return ""
    toFT=toFT==null?BodyIsFt:toFT
    if(chgTxt)txt=txt.replace((toFT?"简":"繁"),(toFT?"繁":"简"))
    if(toFT){return Traditionalized(txt)}
    else {return Simplized(txt)}
}
//转换对象，使用递归，逐层剥到文本
function StranBody(fobj)
{
    if(typeof(fobj)=="object"){var obj=fobj.childNodes}
    else
    {
        var tmptxt=StranLink_Obj.innerHTML.toString()
        if(tmptxt.indexOf("简")<0)
        {
            BodyIsFt=1
            StranLink_Obj.innerHTML=StranText(tmptxt,0,1)
            StranLink.title=StranText(StranLink.title,0,1)
        }
        else
        {
            BodyIsFt=0
            StranLink_Obj.innerHTML=StranText(tmptxt,1,1)
            StranLink.title=StranText(StranLink.title,1,1)
        }
        setCookie2(JF_cn,BodyIsFt,7)
        var obj=document.body.childNodes
    }
    for(var i=0;i<obj.length;i++)
    {
        var OO=obj.item(i)
        if("||BR|HR|TEXTAREA|".indexOf("|"+OO.tagName+"|")>0||OO==StranLink_Obj)continue;
        if(OO.title!=""&&OO.title!=null)OO.title=StranText(OO.title);
        if(OO.alt!=""&&OO.alt!=null)OO.alt=StranText(OO.alt);
        if(OO.tagName=="INPUT"&&OO.value!=""&&OO.type!="text"&&OO.type!="hidden")OO.value=StranText(OO.value);
        if(OO.nodeType==3){OO.data=StranText(OO.data)}
        else StranBody(OO)
    }
}
function JTPYStr()
{
    return '万与丑专业丛东丝丢两严丧个丬丰临为丽举么义乌乐乔习乡书买乱争于亏云亘亚产亩亲亵亸亿仅从仑仓仪们价众优伙会伛伞伟传伤伥伦伧伪伫体余佣佥侠侣侥侦侧侨侩侪侬俣俦俨俩俪俭债倾偬偻偾偿傥傧储傩儿兑兖党兰关兴兹养兽冁内冈册写军农冢冯冲决况冻净凄凉凌减凑凛几凤凫凭凯击凼凿刍划刘则刚创删别刬刭刽刿剀剂剐剑剥剧劝办务劢动励劲劳势勋勐勚匀匦匮区医华协单卖卢卤卧卫却卺厂厅历厉压厌厍厕厢厣厦厨厩厮县参叆叇双发变叙叠叶号叹叽吁后吓吕吗吣吨听启吴呒呓呕呖呗员呙呛呜咏咔咙咛咝咤咴咸哌响哑哒哓哔哕哗哙哜哝哟唛唝唠唡唢唣唤唿啧啬啭啮啰啴啸喷喽喾嗫呵嗳嘘嘤嘱噜噼嚣嚯团园囱围囵国图圆圣圹场坂坏块坚坛坜坝坞坟坠垄垅垆垒垦垧垩垫垭垯垱垲垴埘埙埚埝埯堑堕塆墙壮声壳壶壸处备复够头夸夹夺奁奂奋奖奥妆妇妈妩妪妫姗姜娄娅娆娇娈娱娲娴婳婴婵婶媪嫒嫔嫱嬷孙学孪宁宝实宠审宪宫宽宾寝对寻导寿将尔尘尧尴尸尽层屃屉届属屡屦屿岁岂岖岗岘岙岚岛岭岳岽岿峃峄峡峣峤峥峦崂崃崄崭嵘嵚嵛嵝嵴巅巩巯币帅师帏帐帘帜带帧帮帱帻帼幂幞干并广庄庆庐庑库应庙庞废庼廪开异弃张弥弪弯弹强归当录彟彦彻径徕御忆忏忧忾怀态怂怃怄怅怆怜总怼怿恋恳恶恸恹恺恻恼恽悦悫悬悭悯惊惧惨惩惫惬惭惮惯愍愠愤愦愿慑慭憷懑懒懔戆戋戏戗战戬户扎扑扦执扩扪扫扬扰抚抛抟抠抡抢护报担拟拢拣拥拦拧拨择挂挚挛挜挝挞挟挠挡挢挣挤挥挦捞损捡换捣据捻掳掴掷掸掺掼揸揽揿搀搁搂搅携摄摅摆摇摈摊撄撑撵撷撸撺擞攒敌敛数斋斓斗斩断无旧时旷旸昙昼昽显晋晒晓晔晕晖暂暧札术朴机杀杂权条来杨杩杰极构枞枢枣枥枧枨枪枫枭柜柠柽栀栅标栈栉栊栋栌栎栏树栖样栾桊桠桡桢档桤桥桦桧桨桩梦梼梾检棂椁椟椠椤椭楼榄榇榈榉槚槛槟槠横樯樱橥橱橹橼檐檩欢欤欧歼殁殇残殒殓殚殡殴毁毂毕毙毡毵氇气氢氩氲汇汉污汤汹沓沟没沣沤沥沦沧沨沩沪沵泞泪泶泷泸泺泻泼泽泾洁洒洼浃浅浆浇浈浉浊测浍济浏浐浑浒浓浔浕涂涌涛涝涞涟涠涡涢涣涤润涧涨涩淀渊渌渍渎渐渑渔渖渗温游湾湿溃溅溆溇滗滚滞滟滠满滢滤滥滦滨滩滪漤潆潇潋潍潜潴澜濑濒灏灭灯灵灾灿炀炉炖炜炝点炼炽烁烂烃烛烟烦烧烨烩烫烬热焕焖焘煅煳熘爱爷牍牦牵牺犊犟状犷犸犹狈狍狝狞独狭狮狯狰狱狲猃猎猕猡猪猫猬献獭玑玙玚玛玮环现玱玺珉珏珐珑珰珲琎琏琐琼瑶瑷璇璎瓒瓮瓯电画畅畲畴疖疗疟疠疡疬疮疯疱疴痈痉痒痖痨痪痫痴瘅瘆瘗瘘瘪瘫瘾瘿癞癣癫癯皑皱皲盏盐监盖盗盘眍眦眬着睁睐睑瞒瞩矫矶矾矿砀码砖砗砚砜砺砻砾础硁硅硕硖硗硙硚确硷碍碛碜碱碹磙礼祎祢祯祷祸禀禄禅离秃秆种积称秽秾稆税稣稳穑穷窃窍窑窜窝窥窦窭竖竞笃笋笔笕笺笼笾筑筚筛筜筝筹签简箓箦箧箨箩箪箫篑篓篮篱簖籁籴类籼粜粝粤粪粮糁糇紧絷纟纠纡红纣纤纥约级纨纩纪纫纬纭纮纯纰纱纲纳纴纵纶纷纸纹纺纻纼纽纾线绀绁绂练组绅细织终绉绊绋绌绍绎经绐绑绒结绔绕绖绗绘给绚绛络绝绞统绠绡绢绣绤绥绦继绨绩绪绫绬续绮绯绰绱绲绳维绵绶绷绸绹绺绻综绽绾绿缀缁缂缃缄缅缆缇缈缉缊缋缌缍缎缏缐缑缒缓缔缕编缗缘缙缚缛缜缝缞缟缠缡缢缣缤缥缦缧缨缩缪缫缬缭缮缯缰缱缲缳缴缵罂网罗罚罢罴羁羟羡翘翙翚耢耧耸耻聂聋职聍联聩聪肃肠肤肷肾肿胀胁胆胜胧胨胪胫胶脉脍脏脐脑脓脔脚脱脶脸腊腌腘腭腻腼腽腾膑臜舆舣舰舱舻艰艳艹艺节芈芗芜芦苁苇苈苋苌苍苎苏苘苹茎茏茑茔茕茧荆荐荙荚荛荜荞荟荠荡荣荤荥荦荧荨荩荪荫荬荭荮药莅莜莱莲莳莴莶获莸莹莺莼萚萝萤营萦萧萨葱蒇蒉蒋蒌蓝蓟蓠蓣蓥蓦蔷蔹蔺蔼蕲蕴薮藁藓虏虑虚虫虬虮虽虾虿蚀蚁蚂蚕蚝蚬蛊蛎蛏蛮蛰蛱蛲蛳蛴蜕蜗蜡蝇蝈蝉蝎蝼蝾螀螨蟏衅衔补衬衮袄袅袆袜袭袯装裆裈裢裣裤裥褛褴襁襕见观觃规觅视觇览觉觊觋觌觍觎觏觐觑觞触觯詟誉誊讠计订讣认讥讦讧讨让讪讫训议讯记讱讲讳讴讵讶讷许讹论讻讼讽设访诀证诂诃评诅识诇诈诉诊诋诌词诎诏诐译诒诓诔试诖诗诘诙诚诛诜话诞诟诠诡询诣诤该详诧诨诩诪诫诬语诮误诰诱诲诳说诵诶请诸诹诺读诼诽课诿谀谁谂调谄谅谆谇谈谊谋谌谍谎谏谐谑谒谓谔谕谖谗谘谙谚谛谜谝谞谟谠谡谢谣谤谥谦谧谨谩谪谫谬谭谮谯谰谱谲谳谴谵谶谷豮贝贞负贠贡财责贤败账货质贩贪贫贬购贮贯贰贱贲贳贴贵贶贷贸费贺贻贼贽贾贿赀赁赂赃资赅赆赇赈赉赊赋赌赍赎赏赐赑赒赓赔赕赖赗赘赙赚赛赜赝赞赟赠赡赢赣赪赵赶趋趱趸跃跄跖跞践跶跷跸跹跻踊踌踪踬踯蹑蹒蹰蹿躏躜躯车轧轨轩轪轫转轭轮软轰轱轲轳轴轵轶轷轸轹轺轻轼载轾轿辀辁辂较辄辅辆辇辈辉辊辋辌辍辎辏辐辑辒输辔辕辖辗辘辙辚辞辩辫边辽达迁过迈运还这进远违连迟迩迳迹适选逊递逦逻遗遥邓邝邬邮邹邺邻郁郄郏郐郑郓郦郧郸酝酦酱酽酾酿释里鉅鉴銮錾钆钇针钉钊钋钌钍钎钏钐钑钒钓钔钕钖钗钘钙钚钛钝钞钟钠钡钢钣钤钥钦钧钨钩钪钫钬钭钮钯钰钱钲钳钴钵钶钷钸钹钺钻钼钽钾钿铀铁铂铃铄铅铆铈铉铊铋铍铎铏铐铑铒铕铗铘铙铚铛铜铝铞铟铠铡铢铣铤铥铦铧铨铪铫铬铭铮铯铰铱铲铳铴铵银铷铸铹铺铻铼铽链铿销锁锂锃锄锅锆锇锈锉锊锋锌锍锎锏锐锑锒锓锔锕锖锗错锚锜锞锟锠锡锢锣锤锥锦锨锩锫锬锭键锯锰锱锲锳锴锵锶锷锸锹锺锻锼锽锾锿镀镁镂镃镆镇镈镉镊镌镍镎镏镐镑镒镕镖镗镙镚镛镜镝镞镟镠镡镢镣镤镥镦镧镨镩镪镫镬镭镮镯镰镱镲镳镴镶长门闩闪闫闬闭问闯闰闱闲闳间闵闶闷闸闹闺闻闼闽闾闿阀阁阂阃阄阅阆阇阈阉阊阋阌阍阎阏阐阑阒阓阔阕阖阗阘阙阚阛队阳阴阵阶际陆陇陈陉陕陧陨险随隐隶隽难雏雠雳雾霁霉霭靓静靥鞑鞒鞯鞴韦韧韨韩韪韫韬韵页顶顷顸项顺须顼顽顾顿颀颁颂颃预颅领颇颈颉颊颋颌颍颎颏颐频颒颓颔颕颖颗题颙颚颛颜额颞颟颠颡颢颣颤颥颦颧风飏飐飑飒飓飔飕飖飗飘飙飚飞飨餍饤饥饦饧饨饩饪饫饬饭饮饯饰饱饲饳饴饵饶饷饸饹饺饻饼饽饾饿馀馁馂馃馄馅馆馇馈馉馊馋馌馍馎馏馐馑馒馓馔馕马驭驮驯驰驱驲驳驴驵驶驷驸驹驺驻驼驽驾驿骀骁骂骃骄骅骆骇骈骉骊骋验骍骎骏骐骑骒骓骔骕骖骗骘骙骚骛骜骝骞骟骠骡骢骣骤骥骦骧髅髋髌鬓魇魉鱼鱽鱾鱿鲀鲁鲂鲄鲅鲆鲇鲈鲉鲊鲋鲌鲍鲎鲏鲐鲑鲒鲓鲔鲕鲖鲗鲘鲙鲚鲛鲜鲝鲞鲟鲠鲡鲢鲣鲤鲥鲦鲧鲨鲩鲪鲫鲬鲭鲮鲯鲰鲱鲲鲳鲴鲵鲶鲷鲸鲹鲺鲻鲼鲽鲾鲿鳀鳁鳂鳃鳄鳅鳆鳇鳈鳉鳊鳋鳌鳍鳎鳏鳐鳑鳒鳓鳔鳕鳖鳗鳘鳙鳛鳜鳝鳞鳟鳠鳡鳢鳣鸟鸠鸡鸢鸣鸤鸥鸦鸧鸨鸩鸪鸫鸬鸭鸮鸯鸰鸱鸲鸳鸴鸵鸶鸷鸸鸹鸺鸻鸼鸽鸾鸿鹀鹁鹂鹃鹄鹅鹆鹇鹈鹉鹊鹋鹌鹍鹎鹏鹐鹑鹒鹓鹔鹕鹖鹗鹘鹚鹛鹜鹝鹞鹟鹠鹡鹢鹣鹤鹥鹦鹧鹨鹩鹪鹫鹬鹭鹯鹰鹱鹲鹳鹴鹾麦麸黄黉黡黩黪黾鼋鼌鼍鼗鼹齄齐齑齿龀龁龂龃龄龅龆龇龈龉龊龋龌龙龚龛龟志制咨只里系范松没尝尝闹面准钟别闲干尽脏';
}
function FTPYStr()
{
    return '萬與醜專業叢東絲丟兩嚴喪個爿豐臨為麗舉麼義烏樂喬習鄉書買亂爭於虧雲亙亞產畝親褻嚲億僅從侖倉儀們價眾優夥會傴傘偉傳傷倀倫傖偽佇體餘傭僉俠侶僥偵側僑儈儕儂俁儔儼倆儷儉債傾傯僂僨償儻儐儲儺兒兌兗黨蘭關興茲養獸囅內岡冊寫軍農塚馮衝決況凍淨淒涼淩減湊凜幾鳳鳧憑凱擊氹鑿芻劃劉則剛創刪別剗剄劊劌剴劑剮劍剝劇勸辦務勱動勵勁勞勢勳猛勩勻匭匱區醫華協單賣盧鹵臥衛卻巹廠廳曆厲壓厭厙廁廂厴廈廚廄廝縣參靉靆雙發變敘疊葉號歎嘰籲後嚇呂嗎唚噸聽啟吳嘸囈嘔嚦唄員咼嗆嗚詠哢嚨嚀噝吒噅鹹呱響啞噠嘵嗶噦嘩噲嚌噥喲嘜嗊嘮啢嗩唕喚呼嘖嗇囀齧囉嘽嘯噴嘍嚳囁嗬噯噓嚶囑嚕劈囂謔團園囪圍圇國圖圓聖壙場阪壞塊堅壇壢壩塢墳墜壟壟壚壘墾坰堊墊埡墶壋塏堖塒塤堝墊垵塹墮壪牆壯聲殼壺壼處備複夠頭誇夾奪奩奐奮獎奧妝婦媽嫵嫗媯姍薑婁婭嬈嬌孌娛媧嫻嫿嬰嬋嬸媼嬡嬪嬙嬤孫學孿寧寶實寵審憲宮寬賓寢對尋導壽將爾塵堯尷屍盡層屭屜屆屬屢屨嶼歲豈嶇崗峴嶴嵐島嶺嶽崠巋嶨嶧峽嶢嶠崢巒嶗崍嶮嶄嶸嶔崳嶁脊巔鞏巰幣帥師幃帳簾幟帶幀幫幬幘幗冪襆幹並廣莊慶廬廡庫應廟龐廢廎廩開異棄張彌弳彎彈強歸當錄彠彥徹徑徠禦憶懺憂愾懷態慫憮慪悵愴憐總懟懌戀懇惡慟懨愷惻惱惲悅愨懸慳憫驚懼慘懲憊愜慚憚慣湣慍憤憒願懾憖怵懣懶懍戇戔戲戧戰戩戶紮撲扡執擴捫掃揚擾撫拋摶摳掄搶護報擔擬攏揀擁攔擰撥擇掛摯攣掗撾撻挾撓擋撟掙擠揮撏撈損撿換搗據撚擄摑擲撣摻摜摣攬撳攙擱摟攪攜攝攄擺搖擯攤攖撐攆擷擼攛擻攢敵斂數齋斕鬥斬斷無舊時曠暘曇晝曨顯晉曬曉曄暈暉暫曖劄術樸機殺雜權條來楊榪傑極構樅樞棗櫪梘棖槍楓梟櫃檸檉梔柵標棧櫛櫳棟櫨櫟欄樹棲樣欒棬椏橈楨檔榿橋樺檜槳樁夢檮棶檢欞槨櫝槧欏橢樓欖櫬櫚櫸檟檻檳櫧橫檣櫻櫫櫥櫓櫞簷檁歡歟歐殲歿殤殘殞殮殫殯毆毀轂畢斃氈毿氌氣氫氬氳彙漢汙湯洶遝溝沒灃漚瀝淪滄渢溈滬濔濘淚澩瀧瀘濼瀉潑澤涇潔灑窪浹淺漿澆湞溮濁測澮濟瀏滻渾滸濃潯濜塗湧濤澇淶漣潿渦溳渙滌潤澗漲澀澱淵淥漬瀆漸澠漁瀋滲溫遊灣濕潰濺漵漊潷滾滯灩灄滿瀅濾濫灤濱灘澦濫瀠瀟瀲濰潛瀦瀾瀨瀕灝滅燈靈災燦煬爐燉煒熗點煉熾爍爛烴燭煙煩燒燁燴燙燼熱煥燜燾煆糊溜愛爺牘犛牽犧犢強狀獷獁猶狽麅獮獰獨狹獅獪猙獄猻獫獵獼玀豬貓蝟獻獺璣璵瑒瑪瑋環現瑲璽瑉玨琺瓏璫琿璡璉瑣瓊瑤璦璿瓔瓚甕甌電畫暢佘疇癤療瘧癘瘍鬁瘡瘋皰屙癰痙癢瘂癆瘓癇癡癉瘮瘞瘺癟癱癮癭癩癬癲臒皚皺皸盞鹽監蓋盜盤瞘眥矓著睜睞瞼瞞矚矯磯礬礦碭碼磚硨硯碸礪礱礫礎硜矽碩硤磽磑礄確鹼礙磧磣堿镟滾禮禕禰禎禱禍稟祿禪離禿稈種積稱穢穠穭稅穌穩穡窮竊竅窯竄窩窺竇窶豎競篤筍筆筧箋籠籩築篳篩簹箏籌簽簡籙簀篋籜籮簞簫簣簍籃籬籪籟糴類秈糶糲粵糞糧糝餱緊縶糸糾紆紅紂纖紇約級紈纊紀紉緯紜紘純紕紗綱納紝縱綸紛紙紋紡紵紖紐紓線紺絏紱練組紳細織終縐絆紼絀紹繹經紿綁絨結絝繞絰絎繪給絢絳絡絕絞統綆綃絹繡綌綏絛繼綈績緒綾緓續綺緋綽緔緄繩維綿綬繃綢綯綹綣綜綻綰綠綴緇緙緗緘緬纜緹緲緝縕繢緦綞緞緶線緱縋緩締縷編緡緣縉縛縟縝縫縗縞纏縭縊縑繽縹縵縲纓縮繆繅纈繚繕繒韁繾繰繯繳纘罌網羅罰罷羆羈羥羨翹翽翬耮耬聳恥聶聾職聹聯聵聰肅腸膚膁腎腫脹脅膽勝朧腖臚脛膠脈膾髒臍腦膿臠腳脫腡臉臘醃膕齶膩靦膃騰臏臢輿艤艦艙艫艱豔艸藝節羋薌蕪蘆蓯葦藶莧萇蒼苧蘇檾蘋莖蘢蔦塋煢繭荊薦薘莢蕘蓽蕎薈薺蕩榮葷滎犖熒蕁藎蓀蔭蕒葒葤藥蒞蓧萊蓮蒔萵薟獲蕕瑩鶯蓴蘀蘿螢營縈蕭薩蔥蕆蕢蔣蔞藍薊蘺蕷鎣驀薔蘞藺藹蘄蘊藪槁蘚虜慮虛蟲虯蟣雖蝦蠆蝕蟻螞蠶蠔蜆蠱蠣蟶蠻蟄蛺蟯螄蠐蛻蝸蠟蠅蟈蟬蠍螻蠑螿蟎蠨釁銜補襯袞襖嫋褘襪襲襏裝襠褌褳襝褲襇褸襤繈襴見觀覎規覓視覘覽覺覬覡覿覥覦覯覲覷觴觸觶讋譽謄訁計訂訃認譏訐訌討讓訕訖訓議訊記訒講諱謳詎訝訥許訛論訩訟諷設訪訣證詁訶評詛識詗詐訴診詆謅詞詘詔詖譯詒誆誄試詿詩詰詼誠誅詵話誕詬詮詭詢詣諍該詳詫諢詡譸誡誣語誚誤誥誘誨誑說誦誒請諸諏諾讀諑誹課諉諛誰諗調諂諒諄誶談誼謀諶諜謊諫諧謔謁謂諤諭諼讒諮諳諺諦謎諞諝謨讜謖謝謠謗諡謙謐謹謾謫譾謬譚譖譙讕譜譎讞譴譫讖穀豶貝貞負貟貢財責賢敗賬貨質販貪貧貶購貯貫貳賤賁貰貼貴貺貸貿費賀貽賊贄賈賄貲賃賂贓資賅贐賕賑賚賒賦賭齎贖賞賜贔賙賡賠賧賴賵贅賻賺賽賾贗讚贇贈贍贏贛赬趙趕趨趲躉躍蹌蹠躒踐躂蹺蹕躚躋踴躊蹤躓躑躡蹣躕躥躪躦軀車軋軌軒軑軔轉軛輪軟轟軲軻轤軸軹軼軤軫轢軺輕軾載輊轎輈輇輅較輒輔輛輦輩輝輥輞輬輟輜輳輻輯轀輸轡轅轄輾轆轍轔辭辯辮邊遼達遷過邁運還這進遠違連遲邇逕跡適選遜遞邐邏遺遙鄧鄺鄔郵鄒鄴鄰鬱郤郟鄶鄭鄆酈鄖鄲醞醱醬釅釃釀釋裏钜鑒鑾鏨釓釔針釘釗釙釕釷釺釧釤鈒釩釣鍆釹鍚釵鈃鈣鈈鈦鈍鈔鍾鈉鋇鋼鈑鈐鑰欽鈞鎢鉤鈧鈁鈥鈄鈕鈀鈺錢鉦鉗鈷缽鈳鉕鈽鈸鉞鑽鉬鉭鉀鈿鈾鐵鉑鈴鑠鉛鉚鈰鉉鉈鉍鈹鐸鉶銬銠鉺銪鋏鋣鐃銍鐺銅鋁銱銦鎧鍘銖銑鋌銩銛鏵銓鉿銚鉻銘錚銫鉸銥鏟銃鐋銨銀銣鑄鐒鋪鋙錸鋱鏈鏗銷鎖鋰鋥鋤鍋鋯鋨鏽銼鋝鋒鋅鋶鐦鐧銳銻鋃鋟鋦錒錆鍺錯錨錡錁錕錩錫錮鑼錘錐錦鍁錈錇錟錠鍵鋸錳錙鍥鍈鍇鏘鍶鍔鍤鍬鍾鍛鎪鍠鍰鎄鍍鎂鏤鎡鏌鎮鎛鎘鑷鐫鎳鎿鎦鎬鎊鎰鎔鏢鏜鏍鏰鏞鏡鏑鏃鏇鏐鐔钁鐐鏷鑥鐓鑭鐠鑹鏹鐙鑊鐳鐶鐲鐮鐿鑔鑣鑞鑲長門閂閃閆閈閉問闖閏闈閑閎間閔閌悶閘鬧閨聞闥閩閭闓閥閣閡閫鬮閱閬闍閾閹閶鬩閿閽閻閼闡闌闃闠闊闋闔闐闒闕闞闤隊陽陰陣階際陸隴陳陘陝隉隕險隨隱隸雋難雛讎靂霧霽黴靄靚靜靨韃鞽韉韝韋韌韍韓韙韞韜韻頁頂頃頇項順須頊頑顧頓頎頒頌頏預顱領頗頸頡頰頲頜潁熲頦頤頻頮頹頷頴穎顆題顒顎顓顏額顳顢顛顙顥纇顫顬顰顴風颺颭颮颯颶颸颼颻飀飄飆飆飛饗饜飣饑飥餳飩餼飪飫飭飯飲餞飾飽飼飿飴餌饒餉餄餎餃餏餅餑餖餓餘餒餕餜餛餡館餷饋餶餿饞饁饃餺餾饈饉饅饊饌饢馬馭馱馴馳驅馹駁驢駔駛駟駙駒騶駐駝駑駕驛駘驍罵駰驕驊駱駭駢驫驪騁驗騂駸駿騏騎騍騅騌驌驂騙騭騤騷騖驁騮騫騸驃騾驄驏驟驥驦驤髏髖髕鬢魘魎魚魛魢魷魨魯魴魺鮁鮃鯰鱸鮋鮓鮒鮊鮑鱟鮍鮐鮭鮚鮳鮪鮞鮦鰂鮜鱠鱭鮫鮮鮺鯗鱘鯁鱺鰱鰹鯉鰣鰷鯀鯊鯇鮶鯽鯒鯖鯪鯕鯫鯡鯤鯧鯝鯢鯰鯛鯨鯵鯴鯔鱝鰈鰏鱨鯷鰮鰃鰓鱷鰍鰒鰉鰁鱂鯿鰠鼇鰭鰨鰥鰩鰟鰜鰳鰾鱈鱉鰻鰵鱅鰼鱖鱔鱗鱒鱯鱤鱧鱣鳥鳩雞鳶鳴鳲鷗鴉鶬鴇鴆鴣鶇鸕鴨鴞鴦鴒鴟鴝鴛鴬鴕鷥鷙鴯鴰鵂鴴鵃鴿鸞鴻鵐鵓鸝鵑鵠鵝鵒鷳鵜鵡鵲鶓鵪鶤鵯鵬鵮鶉鶊鵷鷫鶘鶡鶚鶻鶿鶥鶩鷊鷂鶲鶹鶺鷁鶼鶴鷖鸚鷓鷚鷯鷦鷲鷸鷺鸇鷹鸌鸏鸛鸘鹺麥麩黃黌黶黷黲黽黿鼂鼉鞀鼴齇齊齏齒齔齕齗齟齡齙齠齜齦齬齪齲齷龍龔龕龜誌製谘隻裡係範鬆冇嚐嘗鬨麵準鐘彆閒乾儘臟';
}
function Traditionalized(cc){
    var str='',ss=JTPYStr(),tt=FTPYStr();
    for(var i=0;i<cc.length;i++)
    {
        if(cc.charCodeAt(i)>10000&&ss.indexOf(cc.charAt(i))!=-1)str+=tt.charAt(ss.indexOf(cc.charAt(i)));
          else str+=cc.charAt(i);
    }
    return str;
}
function Simplized(cc){
    var str='',ss=JTPYStr(),tt=FTPYStr();
    for(var i=0;i<cc.length;i++)
    {
        if(cc.charCodeAt(i)>10000&&tt.indexOf(cc.charAt(i))!=-1)str+=ss.charAt(tt.indexOf(cc.charAt(i)));
          else str+=cc.charAt(i);
    }
    return str;
}
function setCookie2(name, value)        //cookies设置
{
    var argv = setCookie2.arguments;
    var argc = setCookie2.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    if(expires!=null)
    {
        var LargeExpDate = new Date ();
        LargeExpDate.setTime(LargeExpDate.getTime() + (expires*1000*3600*24));
    }
    document.cookie = name + "=" + escape (value)+((expires == null) ? "" : ("; expires=" +LargeExpDate.toGMTString()))+";path=/";
}
function getCookie2(Name)            //cookies读取
{
    var search = Name + "="
    if(document.cookie.length > 0)
    {
        offset = document.cookie.indexOf(search)
        if(offset != -1)
        {
            offset += search.length
            end = document.cookie.indexOf(";", offset)
            if(end == -1) end = document.cookie.length
            return unescape(document.cookie.substring(offset, end))
         }
    else return ""
      }
}
var StranLink_Obj=document.getElementById("StranLink")
if (StranLink_Obj)
{
    var JF_cn="ft"+self.location.hostname.toString().replace(/\./g,"")
    var BodyIsFt=getCookie2(JF_cn)
    if(BodyIsFt!="1")BodyIsFt=Default_isFT
    with(StranLink_Obj)
    {
        if(typeof(document.all)!="object")     //非IE浏览器
        {
            href="javascript:StranBody()"
        }
        else
        {
            href="#";
            onclick= new Function("StranBody();return false")
        }
        title=StranText("点击以繁体中文方式浏览",1,1)
        innerHTML=StranText(innerHTML,1,1)
    }
    if(BodyIsFt=="1"){setTimeout("StranBody()",StranIt_Delay)}
}
/****************************js简繁转换_end******************************/


//简繁
var id = getCookie2(JF_cn)?getCookie2(JF_cn):'0';
jQuery('.lng a').eq(id).addClass('on').siblings('a').removeClass('on');

jQuery('.lng').on('click', 'a', function(event) {
    var cok = getCookie2(JF_cn)?getCookie2(JF_cn):'0';
    var datacok = jQuery(this).data('cok');
     console.log(cok+'||'+datacok);
    if( (cok == '0' && datacok == '1') || (cok == '1' && datacok == '0') ){
        jQuery(this).addClass('on').siblings('a').removeClass('on');
        //StranBody();
        jQuery('#StranLink').click();
    }
});

/****************************js显示天气_start******************************/
// var tqstr = "";
// var flag="1";
// jQuery.ajax({
//     url: 'http://www.fs121.com/Jsonp/Jsonp.aspx?type=fswn',
//     dataType : 'jsonp',
//     jsonpCallback : 'fn',
//     success: function(data){
//         jQuery.each(data,function(i,json){
//             if(json.station == '禅城'){
//                 if(flag=="1"){
//                     tqstr = '<marquee scrollAmount=3 onmousemove="stop()" onmouseout="start()" class="weather" ><img src="images/weather.png"><a style="color:#000;text-decoration: underline;" target="_blank" href="http://www.fs121.com/warning.aspx"  target="_blank">' +json.station+'区'+json.name;
//                     flag="0";
//                 }else{
//                     tqstr = tqstr+'和'+json.name;
//                 }
//             }
//         })
//         if(tqstr==''){
//             tqstr = '<marquee scrollAmount=3 onmousemove="stop()" onmouseout="start()" class="weather"><img src="images/weather.png">';
//         }else{
//             tqstr =tqstr+'正在生效!</a> ';
//         }
//         jQuery.ajax({
//                 url: 'http://www.fs121.com/Jsonp/Jsonp.aspx?type=fost',
//                 dataType : 'jsonp',
//                 jsonpCallback : 'fn',
//                 success: function(data){
//                     jQuery.each(data,function(i,json){
//                         if( json.station == '禅城' ){
//                             //tqstr = '预计今天下午到傍晚（有效时间：5日14时至5日20时）：多云间晴，局部有雷阵雨，偏南风2级，气温：27－33℃，相对湿度：65%-95%；';
//                             tqstr = tqstr+json.efdate + '：' + json.ws + '，' + json.wind +'，气温：'+ json.tmin +'－'+ json.tmax +'℃，相对湿度：'+ json.hmin +'%-'+ json.hmax +'%；</marquee>';
//                             jQuery('#tq').prepend(tqstr);
//                              return false;
//                         }
//                     })
//                 }
//             });
//     }
// });

// jQuery('#tq').hover(
//     function () {
//         jQuery(this).children('.poptq').stop().slideDown(250);
//     },
//     function () {
//         jQuery(this).children('.poptq').stop().slideUp(50);
//     }
// );

/****************************js显示天气_end******************************/


/****************************底部友情_start******************************/
jQuery('.flinkBtn').click(function(e){
    e=e||window.event;
    if(jQuery(this).siblings('ul').css('display') == 'none'){
        jQuery(this).siblings('ul').slideDown(100);
    } else{
        jQuery(this).siblings('ul').slideUp(100);
    }


    jQuery(this).parent().siblings().each(function(){
        jQuery(this).find('ul').slideUp(100);
    });
    e.stopPropagation();
});

jQuery('.flink li ul').mouseleave(function(){
    jQuery('.flink li ul').slideUp(100);
});

jQuery('.flink li ul li').click(function(){
    //jQuery('.flink li ul').slideUp(100);
});

/****************************底部友情_end******************************/

/****************************menu_start******************************/
var menu = {
    trigger: ".menu-handler,.navbox .mask",
    init: function () {
        menu.bind();
    },
    bind: function () {
        jQuery(document).on("click", menu.trigger, menu.openNav);
    },
    openNav: function () {
        if (jQuery(".menu-handler").is(".active")) {
            jQuery(".menu-handler,.nav-part,.navPart").removeClass("active");
            jQuery(".navbox").removeClass("open");
        } else {
            jQuery(".menu-handler,.nav-part,.navPart").addClass("active");
            jQuery(".navbox").addClass("open");
        }

       
    }
};
menu.init();
/****************************menu_end******************************/


/****************************TAB切换_start******************************/
initTabs = function(tabs){
   var w = window.innerWidth > 0 ? window.innerWidth : document.body.clientWidth;
   var action = w < 1002 ? 'click' : 'mouseover';
    jQuery.each( tabs, function(i, n){
        var jQuerytab = jQuery('#'+n).find('a');
        var listName = '';
        jQuerytab.on(action, function(){
            if(action == 'mouseover'){
                if ( !jQuery(this).hasClass('notab') ){
                    jQuery(this).addClass('on').attr('href',jQuery(this).data('href'));
                    jQuerytab.not(jQuery(this)).not('.notab').removeClass('on').removeAttr('href');
                    listName = jQuery(this).data('tab');
                    jQuery.each( jQuerytab.not('.notab'), function(i2, n2){
                        if( jQuery(n2).data('tab') != listName ){
                            jQuery('#'+jQuery(n2).data('tab')).hide();
                        }else{
                            jQuery('#'+listName).show();
                        }
                    });
                }
            }else{
                if ( jQuery(this).hasClass('on') ){
                    jQuery(this).attr('href',jQuery(this).data('href'));
                }else{
                    if ( !jQuery(this).hasClass('notab') ){
                        jQuery(this).addClass('on');
                        jQuerytab.not(jQuery(this)).not('.notab').removeClass('on').removeAttr('href');
                        listName = jQuery(this).data('tab');
                        jQuery.each( jQuerytab.not('.notab'), function(i2, n2){
                            if( jQuery(n2).data('tab') != listName ){
                                jQuery('#'+jQuery(n2).data('tab')).hide();
                            }else{
                                jQuery('#'+listName).show();
                            }
                        });
                    }
                }
            }
        });
    });
}
/****************************TAB切换_end******************************/

/****************************热词******************************/

// jQuery(document).ready(function () {
//      jQuery.ajax({
//         url: 'http://219.128.72.151/businessHotWords/getPage?size=6',
//         dataType: "jsonp",
// 		jsonp : "callback",
// 	    jsonpCallback:"callback",
//         contentType: "application/json",
//         success: function (res) {
//             if (res.data.records) {
//                var str=''
//                for (var i = 0; i < res.data.records.length; i++) {
//                    str+='<a class="hot-key">'+res.data.records[i].name+'</a>'
//                };
//                jQuery("#hotKey").html(str)
//             };

//         }, error: function (XMLHttpRequest, textStatus, errorThrown) {
//           console.log(textStatus);
//         }
//       });
//  });
/****************************热词******************************/


/****************************登陆用户中心js******************************/
      $("#grzx").click(function(event){
          event.preventDefault();
          jump()
      })
      
      setText();

      function setText(){
        var acceToken=getCookie('acceToken') 
        console.log(acceToken,!getCookie('acceToken'))
        if(!getCookie('acceToken')){
            $("#grzx").html('用户登录').show()
        }else{
              
                        $("#grzx").html('个人空间').show();
                        $("#tcdltcdl").show();
                        $('.icon-yonghu10').hide();
          $.ajax({
                type:"get",
                url:'https://yhzx.foshan.gov.cn:8081/api/userinfo?accessToken='+acceToken,
                success:function(data){
                    //console.log(data)
                    if(data.code==200){
                        //console.log(data.data.useridcode)
                        setCookie('userIdCode', data.data.useridcode, '1')
                        //$("#grzx").html('个人空间').show()
                        //$("#tcdltcdl").show()
                    }else{
                        //$("#grzx").html('用户登录').show()
                    }
                },
                error:function(error){
                   $("#grzx").html('用户登录').show()
                }
         });
        }
      } 

      $("#tcdltcdl").click(function(event){
          event.preventDefault();
          logout()
      }) 

      
      function logout(){ 
            clearCookie('acceToken')
            clearCookie('userIdCode')
            //setCookie('acceToken', "", 1);

            var url ='https://yhzx.foshan.gov.cn:8081/auth/logout?redirect_uri=http://www.foshan.gov.cn/';  
            //var url ='https://yhzx.foshan.gov.cn:8081/'
            url=encodeURI(url)
         
            var link = document.createElement('a') //创建a标签 
            link.style.display = 'none'
            link.href = 'https://tyrz.gd.gov.cn/_tif_sso_logout_/?redirect_uri='+url 
            document.body.appendChild(link)
            link.click() //执行打开
            URL.revokeObjectURL(link.href) //释放url
            document.body.removeChild(link) //释放标签 
                
        //  $.ajax({
        //         type:"get",
        //         // url:'https://tyrz.gd.gov.cn/_tif_sso_logout_/?redirect_uri='+url,
        //         url:'https://yhzx.foshan.gov.cn:8081/api/dologout?accessToken='+getCookie('acceToken') +'&redirect_uri='+url,
        //         success:function(data){ 
        //             if(data.code==200){ 
        //             }else{ 
        //             }
                   
        //         },
        //         error:function(error){
        //            console.log(error)
        //         }
        // });
      }

      function jump(){
        var acceToken=getCookie('acceToken') 
        if( !getCookie('acceToken')){
            window.location.href='https://yhzx.foshan.gov.cn:8081/auth/login'
        }else{
          $.ajax({
                type:"get",
                url:'https://yhzx.foshan.gov.cn:8081/api/userinfo?accessToken='+acceToken,
                success:function(data){
                    //console.log(data)
                    if(data.code==200){
                        window.location.href='https://www.foshan.gov.cn/user.html' 
                    }else{
                        window.location.href='https://yhzx.foshan.gov.cn:8081/auth/login'
                    }
                   
                },
                error:function(error){
                  window.location.href='https://yhzx.foshan.gov.cn:8081/auth/login'
                }
        });
        }
      } 
        
        
        
/****************************登陆用户中心js******************************/
 


/****************************内容页js******************************/
jQuery("#large").click(function(){
   jQuery(".news-view2").find(".m-con").attr ('class','m-con large')
})
jQuery("#normal").click(function(){
   jQuery(".news-view2").find(".m-con").attr ('class','m-con')
})
jQuery("#small").click(function(){
   jQuery(".news-view2").find(".m-con").attr ('class','m-con small')
})


jQuery(".news-mes2 .zh a").click(function(){

          jQuery(this).addClass('on').siblings().removeClass('on')
 })

 
if(jQuery('#qrcode').length){
   jQuery(".news-mes2 span").eq(0).addClass('spanLeft')
   jQuery(".news-mes2 span").eq(1).addClass('spanLeft')
   jQuery(".content_function_module span").eq(0).hide()
   jQuery('#qrcode').qrcode({
            render: "canvas", //也可以替换为table
            width: 100,
            height: 100,
            text: "http://www.baidu.com"
        });
}


/****************************内容页js******************************/

if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
     document.getElementById("changeType").style.display="block";
     var ismobile=getCookie('webType')
     if (ismobile==""||ismobile=="手机") {
        clearCookie('webType')
        //document.getElementById("webType").innerText="电脑";
        document.getElementsByTagName('meta')['viewport'].content ='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no';
     }else if(ismobile=="电脑"){
        clearCookie('webType')
        document.getElementsByTagName('meta')['viewport'].content ="width=1200";
        document.getElementById("changeType").style.display="none";
        //document.getElementById("webType").innerText="手机";
     }
     document.getElementById("changeType").onclick=changeType
     function changeType(){
       if (ismobile=="电脑") {
          setCookie('webType', '手机', 1);
          location.replace(location)
       } else if(ismobile==""||ismobile=="手机"){
          setCookie('webType', '电脑', 1);
          location.replace(location)
       }
     }
} 
// 回到pc

        $("#changeType img").click(function(){
            $("meta[name='viewport']").attr('content',"");
		$("#changeType").hide();
        $(".main").css("wdith","1200px");
         $(".main2020").css("wdith","1200px");
		});