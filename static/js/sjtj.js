var cj = {
  getSearchWords: function () { },
  getSearchWords2: function () { }
};

(function () {
  function Ajax (params) {
    params = params || {};
    params.data = params.data || {};
    var _json = params.jsonp ? jsonp(params) : json(params); // 判断是json还是jsonp
    function json (params) { // 普通请求
      params.type = (params.type || 'GET').toUpperCase(); // 设置请求默认类型
      var urlData = formatParams(params.data); // 对数据进行格式化
      var xhr = null; // 对xhr进行初始化
      if (window.XMLHttpRequest) {
        xhr = new window.XMLHttpRequest();
      } else {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      }
      var headers = params.headers || {};
      if (params.type === 'GET') {
        xhr.open(params.type, params.url + '?' + urlData, true);
        setHeaders(xhr, headers);
        xhr.send(null);
      } else {
        xhr.open(params.type, params.url, true);
        setHeaders(xhr, headers);
        xhr.send(params.data);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          var status = xhr.status;
          if (status >= 200 && status < 300) {
            var response = '';
            var type = xhr.getResponseHeader('Content-Type');
            if (type.indexOf('xml') !== -1 && xhr.responseXML) { // xml格式
              response = xhr.responseXML;
            } else if (type.indexOf('application/json') !== -1) { // JSON格式
              response = JSON.parse(xhr.responseText);
            } else {
              response = xhr.responseText; // 字符串格式
            }
            params.success && params.success(response);
          } else {
            params.error && params.error(status);
          }
        }
      }
    }
    function jsonp (params) {
      var callbackName = params.jsonp; // 回调函数名
      var head = document.getElementsByTagName('head')[0];
      params.data['callback'] = callbackName;
      var data = formatParams(params.data);
      var script = document.createElement('script');
      head.appendChild(script);
      // 创建jsonp函数，成功后自动让success函数调用，在自动删除
      window[callbackName] = function (json) { // 设置回调，获取后台数据后才执行
        head.removeChild(script);
        clearTimeout(script.timer);
        window[callbackName] = null;
        params.success && params.success(json);
      };
      script.src = params.url + '?' + data; // 设置src的时候才开始向后台请求数据
      if (params.time) { // 限定时间
        script.timer = setTimeout(function () {
          window[callbackName] = null;
          head.removeChild(script);
          params.error && params.error({
            //message: '超时'
            message: '超时'
          })
        }, params.time)
      }

    }
    function formatParams (data) {
      // 使用 encodeURIComponent 对 URI的某部分编码
      var arr = [];
      for (var key in data) {
        arr.push(encodeURIComponent(key) + '=' + encodeURIComponent(data[key]));
      }
      // 添加随机数，防止缓存
      arr.push('v=' + random());
      return arr.join('&');
    }
    function random () {
      return Math.floor(Math.random() * 10000 + 500);
    }
    function setHeaders (xhr, headers) {
      for (var key in headers) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }
  }

  /*封装addEventListener*/

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach (callback, thisArg) {
      var T, k;
      if (this == null) {
        throw new TypeError("this is null or not defined");
      }
      var O = Object(this);
      var len = O.length >>> 0;
      if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
      }
      if (arguments.length > 1) {
        T = thisArg;
      }
      k = 0;
      while (k < len) {
        var kValue;
        if (k in O) {
          kValue = O[k];
          callback.call(T, kValue, k, O);
        }
        k++;
      }
    };
  }

  function addEvent (obj, type, fn) {//添加事件监听，三个参数分别为 对象、事件类型、事件处理函数，默认为false
    if (obj.addEventListener) {
      obj.addEventListener(type, fn, false);//非IE
    } else {
      obj.attachEvent('on' + type, fn);//ie,这里已经加上on，传参的时候注意不要重复加了
    };
  }
  /*封装addEventListener*/

  /****************************cookie_start******************************/
  function setCookie (cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function getCookie (cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return "";
  }

  function clearCookie (name) {
    setCookie(name, "", -1);
  }
  /****************************cookie_end********************************/
  
   /*滚动条的高度*/
   function getCurrScrollTop(){
    var currScrollTop =  document.body.scrollTop;
    if(currScrollTop == 0)
      currScrollTop = document.documentElement.scrollTop;
    return currScrollTop;
  } 

  /*返回点击链接的类型*/
  function getType (value) {
    switch (value) {
      case "adv":
        return 3
        break;
      case "friend":
        return 4
        break;
      case "zwfw":
        return 5
        break;
      default:
        return false;
    }
  }
  /*返回点击链接的类型*/

  var params = {};
  //获取cookies
  if (getCookie("enterType") == "") {
    params.enterType = 1;
    setCookie("enterType", 2, 360000)
  } else {
    params.enterType = 2;
  }

  //获取当前时间
  params.accessTime = new Date().getTime();
  //获取meta标签的信息
  params.colType = document.querySelector('meta[name=ColumnType]') == null ? '' : document.querySelector('meta[name=ColumnType]').content;
  params.description = document.querySelector('meta[name=Description]') == null ? '' : document.querySelector('meta[name=Description]').content;
  params.keywords = document.querySelector('meta[name=Keywords]') == null ? '' : document.querySelector('meta[name=Keywords]').content;
  params.pubDate = document.querySelector('meta[name=PubDate]') == null ? '' : document.querySelector('meta[name=PubDate]').content;
  params.author = document.querySelector('meta[name=Author]') == null ? '' : document.querySelector('meta[name=Author]').content;
  params.source = document.querySelector('meta[name=ContentSource]') == null ? '' : document.querySelector('meta[name=ContentSource]').content;
  params.columnDescription = document.querySelector('meta[name=ColumnDescription]') == null ? '' : document.querySelector('meta[name=ColumnDescription]').content;
  params.columnKeywords = document.querySelector('meta[name=ColumnKeywords]') == null ? '' : document.querySelector('meta[name=ColumnKeywords]').content;
  params.articleTitle = document.querySelector('meta[name=ArticleTitle]') == null ? '' : document.querySelector('meta[name=ArticleTitle]').content;
  params.articleId = document.querySelector('meta[name=articleId]') == null ? '' : document.querySelector('meta[name=articleId]').content;
  
  //获取用户id
  var userIdCode=getCookie('userIdCode')
  if( userIdCode && userIdCode!='' ){
  	params.userIdCode=userIdCode
  }
  
  //cookie支持
  if (window.navigator.cookieEnabled)
    params.cookieEnabled = '1'
  else {
    params.cookieEnabled = '0'
  }

  //Java支持
  if (window.navigator.javaEnabled)
    params.javaEnabled = '1'
  else {
    params.javaEnabled = '0'
  }


  //Document对象数据
  if (document) {
    params.domain = document.domain || '';
    params.url = document.URL || '';
    params.title = document.title || '';
    params.referrer = document.referrer || '';
    if (params.referrer != "") {
      var domain = params.referrer.split('/');
      if (domain[2]) {
        params.referrerDomain = domain[2];
      } else {
        params.referrerDomain = '';
      }
    }
  }
  //Window对象数据
  if (window && window.screen) {
    var sh = window.screen.height || 0;
    var sw = window.screen.width || 0;
    params.screenResolution = sw + '*' + sh;
    params.screenColor = window.screen.colorDepth + 'bit' || '';
    //params.browser = window.navigator.userAgent;
  }
  //navigator对象数据
  if (navigator) {
    params.lang = navigator.language || '';
  }
  //判断当前设备
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    params.deviceType = 2;
  } else {
    params.deviceType = 1;
  }
  params.xwhat = "pageview";
  sendJson();

  var nowTime = new Date();
  /*统计用户访问页面时长*/

  //addEvent(searchForm, "submit", test2)
  cj.getSearchWords = function (e) {
    params.siteSearchWords = e.children[2].value
    sendJson();
  }

  cj.getSearchWords2 = function (e) {
    params.siteSearchWords = e.children[1].value;
    sendJson();
  }
  
  //微信分享记录
  addEvent(window, "mouseover", getwechat)
  var lock=false;
  function getwechat(e){
	 if(e.target.className=='social-share-icon icon-wechat'&&!lock){ 
		  params.channel='wechat' 
		  sendJson();
		  lock=true   //只记录一次
	 }
    
  }
  
  /*保存跳转栏目文档的信息*/
  addEvent(window, "click", test)
  function test (e) {
    params.enterType = 2;
    var node;
    var isA = true;
    node = e.target; 
    params.pageX =  parseInt(e.clientX)
    params.pageY =  parseInt(e.clientY + getCurrScrollTop())
   

    if (node.nodeName.toLowerCase() == "input" && node.parentNode.nodeName.toLowerCase() == "form") {
       params.siteSearchWords = node.parentNode.children[3].value;
       sendJson();
       return;
     }

    //一直找父节点是a
    
    while (node.nodeName.toLowerCase() != "a") { 
      if(node.parentNode){
        node = node.parentNode; 
      }else{
        isA = false;
        break;
      }
      if (node.nodeName.toLowerCase() == "body") {
        isA = false;
        break;
      }
    
    }
    if (isA) {
      var htmlReg = /.html$/;
      var href = node.href;
      params.targetLink = href;
        
      //aType=node.attributes

      var inText;
      if (node.title) {
        params.targetTitle = node.title;
        inText = node.title;
      } else if (node.innerText) {
        inText = node.innerText;
      }
      var dataType = getType(node.getAttribute("data-type"))
      if (dataType == 5) {
        params.zwname = node.childNodes[1].innerText
      }

      if (dataType) { params.linkType = dataType }
      else {
        if (htmlReg.test(href)) {
          params.linkType = 2;
        } else {
          params.linkType = 1;
        }
      }
      params.targetText = inText;
      params.stayTime = getStaytime()
      nowTime = new Date();
	  
	  if(node.className=='social-share-icon icon-qzone'){params.actType=2;params.channel='qzone'}
	  if(node.className=='social-share-icon icon-qq'){params.actType=2;params.channel='qq'}
	  if(node.className=='social-share-icon icon-weibo'){params.actType=2;params.channel='weibo'}
	  //点赞
	  if(node.id=='dz'){params.actType=1}
	  //收藏就不要提交了
	  if(node.id=='sc'){return false}
	  //确认外链就不要提交了
	  if(node.className=='layui-layer-btn1'|| node.className=='layui-layer-btn0'){
		 return false
	  }
      sendJson();
      //e.preventDefault();
    }else{
      sendJson();
    }
    //return false
  }
  /*保存跳转栏目文档的信息*/

  /*统计用户访问页面时长*/
  ['keydown', 'mousemove', 'mousedown', 'click'].forEach(function (item, index) {
    addEvent(window, item, test2)
  })
  // addEvent(window, 'mousemove', test2)

  window.setTimeout(function () {
    var endTime = new Date();
  }, 1000)

  //用户太久没有操作*/
  var maxTime = 300;
  var time = maxTime;
  function test2 (e) {
    time = maxTime;
  }

  function getStaytime (time) {
    var endTime = time ? time : new Date();
    var stayTime = (endTime.getTime() - nowTime.getTime()) / 1000;
    return stayTime;
  }

  var intervalId = setInterval(function () {
    time--;
    if (time <= 0) {
      //console.log("用户停留页面的时间为：" + getStaytime() + "秒")
      params.stayTime = getStaytime();
      clearInterval(intervalId);
    }
  }, 1000)
  /*统计用户访问页面时长*/

  /* 用户关闭浏览器 */
  window.onbeforeunload = function () {
    params.stayTime = getStaytime();
    params.leaveTime = new Date().getTime();
    nowTime = new Date();
    sendJson();
    //return "退出?";
  };

  /* 发送ajax请求 */
  function sendJson () { 
	var sendData;
    for (var it in params) {
        //console.log(it)
        if(it=="siteSearchWords"){
            sendData += encodeURIComponent(it) + '=' + params[it] + '&'
        }else{
        sendData += encodeURIComponent(it) + '=' + encodeURIComponent(params[it]) + '&'
        }
    } 
 
	Ajax({
      url: '/yhxw/mdsj/dclt',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      //jsonp: 'cjsj',
      type:'post',
      time: 10000,
      data: sendData, 
      success: function (res) {
        //console.log(res)
        //if (getCookie("sessionid") == "") {
          //setCookie("sessionid", res.sessionid, 360000)
        //}
      },
      error: function (status) {
        console.log(status);
      }
    })
  }
})();
