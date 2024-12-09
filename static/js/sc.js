// setCookie('userIdCode', '3e7d380efae44a46ab8e435fe2f0d01b', '1')
var pubTime = $("#pubTime em").html()
var userIdCode = getCookie('userIdCode')
var acceToken = getCookie('acceToken')
var flag = false;//是否已经登录
var params = {}
params.url = document.URL || '';
params.articleTitle = document.querySelector('meta[name=ArticleTitle]') == null ? '' : document.querySelector(
	'meta[name=ArticleTitle]').content;
params.articleId = document.querySelector('meta[name=articleId]') == null ? '' : document.querySelector(
	'meta[name=articleId]').content;
params.userIdCode = getCookie('userIdCode')
params.publishtime = $("#pubTime").html() ? $("#pubTime").html() : ''

//clearCookie(useridcode)
// console.log(userIdCode) 
if ((userIdCode && userIdCode != '' && acceToken && acceToken != '')) {
	//	$("#sc").show()
	//	$("#dy").show()
	flag = true
}


/* $.ajax({
						 type:"get",
						 url:'https://yhzx.foshan.gov.cn:8081/api/userinfo?accessToken='+acceToken,
						 success:function(data){
								 //console.log(data)
								 if(data.code==200){
								 flag=true
					 
									$.ajax({
 type: "post",
 url: 'http://www.foshan.gov.cn/yhxw/anon/userfav/isfav?articleId='+params.articleId+'&userIdCode='+params.userIdCode, 
 success: function(data) { 
		 if(data==true&&flag){
		 $("#sc").addClass('on')
	 } 
 },
 error: function(error) {
	 console.log(error)
 }
});
$.ajax({
type: "get",
url: 'http://www.foshan.gov.cn/yhxw/anon/usercatagory/issubscribed',
data: {
 userIdCode: params.userIdCode,
 channelId: channelId
},
success: function(data) { 
 if (data == true&&flag) {
		$("#dy").addClass('on')
 }
},
error: function(error) {
 console.log(error)
}
});
						  
								 }else{
									 
								 }
						 },
						 error:function(error){
					 
						 }
			});
*/

// 获取初始的收藏状态
$.ajax({
	type: "post",
	url: 'http://www.foshan.gov.cn/yhxw/anon/userfav/isfav?articleId=' + params.articleId + '&userIdCode=' + params.userIdCode,
	success: function (data) {
		if (data == true && flag) {
			$("#sc").addClass('on')
		}
	},
	error: function (error) {
		console.log(error)
	}
});
// 获取初始的收藏状态	

// 获取初始的订阅状态
$.ajax({
	type: "get",
	url: 'http://www.foshan.gov.cn/yhxw/anon/usercatagory/issubscribed',
	data: {
		userIdCode: params.userIdCode,
		channelId: channelId
	},
	success: function (data) {
		if (data == true && flag) {
			$("#dy").addClass('on')
		}
	},
	error: function (error) {
		console.log(error)
	}
});
// 获取初始的订阅状态


//订阅
$("#dy").click(function () {
	if (flag) {
   if (!$("#dy").hasClass("on")) {
		$.ajax({
			type: "get",
			url: 'http://www.foshan.gov.cn/yhxw/anon/usercatagory/subscribe',
			data: {
				userIdCode: params.userIdCode,
				channelId: channelId,
				channelName: channelName,
				url: channelUrl
			},
			success: function (data) {
				console.log(data)
				if (!$("#dy").hasClass("on")) {
					$.tipsBox2({
						obj: $("#dy"),
						str: "订阅成功",
						callback: function () {
							//alert(5);
						}
					});
				}
				$("#dy").addClass('on')

			},
			error: function (error) {
				console.log(error)
			}
		});
		}else{
			//取消订阅
			$.ajax({
			type: "get",
			url: 'http://www.foshan.gov.cn/yhxw/anon/usercatagory/unsubscribe',
			data: {
				userIdCode: params.userIdCode,
				channelId: channelId
			},
			success: function (data) { 
		    if (data.code==200) {
					// $.tipsBox2({
					// 	obj: $("#dy"),
					// 	str: "取消订阅成功",
					// 	callback: function () {
						 
					// 	}
					// }); 
			  	$("#dy").removeClass('on') 
		    }
			},
			error: function (error) {
				console.log(error)
			}
		});

		}
	} else {
		var w = '480px';
		var h = '170px';
		if (window.screen.width < 768) { w = '90%'; h = '170px'; }
		var cf = layer.confirm('<div class="ask" style="margin-top:30px; font-size:16px;">需登录后才能订阅</div>', {
			btn: ['登录', '放弃'],
			title: false,
			shade: 0.7,
			area: [w, h],
			cancel: function (index) { o.attr('href', href); }
		}, function () {
			window.location.href = 'https://yhzx.foshan.gov.cn:8081/auth/login'
		});
	}


});
//订阅


$("#sc").click(function () {
	if (flag) {
		if ($("#sc").hasClass("on")) {
			//取消收藏
			$.ajax({
				type: "post",
				url: 'http://www.foshan.gov.cn/yhxw/anon/userfav/del?articleId=' + params.articleId + '&userIdCode=' + params.userIdCode,
				success: function (data) {
					if (data.code == 200) {
						$("#sc").removeClass("on")
					}
				},
				error: function (error) {
					console.log(error)
				}
			});
			return false
		} else {
			$.ajax({
				type: "get",
				url: 'http://www.foshan.gov.cn/yhxw/mdsj/fav',
				data: params,
				success: function (data) {
					console.log(data)
					if (data.code == 200) {
						$("#sc").addClass('on')
						$.tipsBox2({
							obj: $("#sc"),
							str: "收藏成功",
							callback: function () {
								//alert(5);
							}
						});
					}
				},
				error: function (error) {
					console.log(error)
				}
			});
		}
	} else {
		var w = '480px';
		var h = '170px';
		if (window.screen.width < 768) { w = '90%'; h = '170px'; }
		var cf = layer.confirm('<div class="ask" style="margin-top:30px; font-size:16px;">需登录后才能收藏？</div>', {
			btn: ['登录', '放弃'],
			title: false,
			shade: 0.7,
			area: [w, h],
			cancel: function (index) { o.attr('href', href); }
		}, function () {
			window.location.href = 'https://yhzx.foshan.gov.cn:8081/auth/login'
		});
	}

});
$(function () {
	$("#dz").click(function () {

		$.tipsBox({
			obj: $(this),
			str: "+1",
			callback: function () {
				//alert(5);
			}
		});


	});
});

(function ($) {
	$.extend({
		tipsBox: function (options) {
			options = $.extend({
				obj: null, //jq对象，要在那个html标签上显示
				str: "+1", //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
				startSize: "12px", //动画开始的文字大小
				endSize: "30px", //动画结束的文字大小
				interval: 600, //动画时间间隔
				color: "red", //文字颜色
				callback: function () { } //回调函数
			}, options);
			$("body").append("<span class='num'>" + options.str + "</span>");
			var box = $(".num");
			var left = options.obj.offset().left + options.obj.width() / 2;
			var top = options.obj.offset().top - options.obj.height();
			box.css({
				"position": "absolute",
				"left": left + "px",
				"top": top + "px",
				"z-index": 9999,
				"font-size": options.startSize,
				"line-height": options.endSize,
				"color": options.color
			});
			box.animate({
				"font-size": options.endSize,
				"opacity": "0",
				"top": top - parseInt(options.endSize) + "px"
			}, options.interval, function () {
				box.remove();
				options.callback();
			});
		},
		tipsBox2: function (options) {
			options = $.extend({
				obj: null, //jq对象，要在那个html标签上显示
				str: "+1", //字符串，要显示的内容;也可以传一段html，如: "<b style='font-family:Microsoft YaHei;'>+1</b>"
				startSize: "12px", //动画开始的文字大小
				endSize: "16px", //动画结束的文字大小
				interval: 600, //动画时间间隔
				color: "red", //文字颜色
				callback: function () { } //回调函数
			}, options);
			$("body").append("<span class='num'>" + options.str + "</span>");
			var box = $(".num");
			var left = options.obj.offset().left + options.obj.width() / 2;
			var top = options.obj.offset().top - options.obj.height();
			box.css({
				"position": "absolute",
				"left": left + "px",
				"top": top + "px",
				"z-index": 9999,
				"font-size": options.startSize,
				"line-height": options.endSize,
				"color": options.color
			});
			box.animate({
				"font-size": options.endSize,
				"opacity": "0",
				"top": top - parseInt(options.endSize) + "px"
			}, options.interval, function () {
				box.remove();
				options.callback();
			});
		}
	});
})(jQuery);
