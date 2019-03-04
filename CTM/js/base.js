//无对象则加载
if (typeof Base == "undefined") Base = function() {}

// 获取时间对象的基本方法
Base.prototype.getTime = function() {
	var date = new Date();
	var yyyy = date.getFullYear(); //四位年份
	var month = date.getMonth() + 1; //月份 0-11
	var day = date.getDate(); //日
	var HH = date.getHours(); //时
	var minute = date.getMinutes(); //分钟
	var second = date.getSeconds(); //秒
	var milliseconds = date.getMilliseconds(); //毫秒
	if (month < 10) {
		month = "0" + month;
	}
	if (day < 10) {
		day = "0" + day;
	}
	if (HH < 10) {
		HH = "0" + HH;
	}
	if (minute < 10) {
		minute = "0" + minute;
	}
	if (second < 10) {
		second = "0" + second;
	}
	var time = yyyy + "-" + month + "-" + day + " " + HH + ":" + minute + ":" + second + " " + milliseconds;
	var timeTxt = yyyy + month + day + HH + minute + second;
	var times = {
		DateTime: time,
		TimeTxt: timeTxt
	}
	return times;
}

// 浏览器检测，获取，弹出框提醒IE  返回浏览器详情
Base.prototype.getBrowserAndSystem = function() {


	var BrowserMatch = {
		init: function() {
			this.browser = this.getBrowser().browser || "An Unknown Browser";
			this.version = this.getBrowser().version || "An Unknown Version";
			this.OS = this.getOS() || "An Unknown OS";
		},
		getOS: function() {
			if (navigator.platform.indexOf("Win") != -1) return "Windows";
			if (navigator.platform.indexOf("Mac") != -1) return "Mac";
			if (navigator.platform.indexOf("Linux") != -1) return "Linux";
			if (navigator.userAgent.indexOf("iPhone") != -1) return "iPhone/iPod";
		},
		getBrowser: function() {
			var browser = "Unknown Browse";
			var version = 0;
			var rMsie = /(msie\s|trident\/7)([\w\.]+)/;
			var rTrident = /(trident)\/([\w.]+)/;
			var rFirefox = /(firefox)\/([\w.]+)/;
			var rOpera = /(opera).+version\/([\w.]+)/;
			var rNewOpera = /(opr)\/(.+)/;
			var rChrome = /(chrome)\/([\w.]+)/;
			var rSafari = /version\/([\w.]+).*(safari)/;
			var ua = navigator.userAgent.toLowerCase();
			var matchBS, matchBS2;
			matchBS = rMsie.exec(ua);
			if (matchBS != null) {
				matchBS2 = rTrident.exec(ua);
				if (matchBS2 != null) {
					switch (matchBS2[2]) {
						case "4.0":
							return {
								browser: "IE",
								version: "8"
							};
							break;
						case "5.0":
							return {
								browser: "IE",
								version: "9"
							};
							break;
						case "6.0":
							return {
								browser: "IE",
								version: "10"
							};
							break;
						case "7.0":
							return {
								browser: "IE",
								version: "11"
							};
							break;
						default:
							return {
								browser: "IE",
								version: "Undefined"
							};
					}
				} else {
					return {
						browser: "IE",
						version: matchBS[2] || "0"
					};
				}
			}
			matchBS = rFirefox.exec(ua);
			if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
				return {
					browser: matchBS[1] || "",
					version: matchBS[2] || "0"
				};
			}
			matchBS = rOpera.exec(ua);
			if ((matchBS != null) && (!(window.attachEvent))) {
				return {
					browser: matchBS[1] || "",
					version: matchBS[2] || "0"
				};
			}
			matchBS = rChrome.exec(ua);
			if ((matchBS != null) && (!!(window.chrome)) && (!(window.attachEvent))) {
				matchBS2 = rNewOpera.exec(ua);
				if (matchBS2 == null) {
					return {
						browser: matchBS[1] || "",
						version: matchBS[2] || "0"
					};
				} else {
					return {
						browser: "Opera",
						version: matchBS2[2] || "0"
					};
				}
			}
			matchBS = rSafari.exec(ua);
			if ((matchBS != null) && (!(window.attachEvent)) && (!(window.chrome)) && (!(window.opera))) {
				return {
					browser: matchBS[2] || "",
					version: matchBS[1] || "0"
				};
			}
		}
	};
	BrowserMatch.init();
	// 获取浏览器名:BrowserMatch.browser;  
	// 获取浏览器版本:BrowserMatch.version;  
	// 获取所处操作系统:BrowserMatch.OS;  

	if (BrowserMatch.browser == "IE" && BrowserMatch.version < 9) {

		alert("您当前浏览器为：" +
			BrowserMatch.browser +
			"\nVersion：" +
			BrowserMatch.version + ".0" +
			"\n所处操作系统为：" +
			BrowserMatch.OS

			+
			"\n你当前的浏览器不支持本网页大多功能， " +
			"\n为了更好体验宝宝提供的服务，\n请点点你的小手手升级或换个更厉害的浏览器吧！"
		);


	}
	return "您当前浏览器为：" + BrowserMatch.browser + "\nVersion：" + BrowserMatch.version + ".0" + "\n所处操作系统为：" + BrowserMatch.OS;

}

Base.browser = function() {}
Base.browser.getBrowserIdentity = function() {
	return " navigator.appName : " + navigator.appName +
		"\n navigator.appVersion: " + navigator.appVersion +
		"\n navigator.appMinorVersion: " + navigator.appMinorVersion +
		"\n appCodeName: " + navigator.appCodeName +
		"\n cookieEnabled: " + navigator.cookieEnabled +
		"\n os: " + navigator.platform +
		"\n userProfile: " + navigator.userProfile +
		"\n userAgent: " + navigator.userAgent +
		"\n userLanguage: " + navigator.userLanguage;
}

//外部网络连接状态检测
Base.prototype.connectionLisner = function() { //onload="conectSuccess()"onerror="conectError()" 
	$("body").prepend('<img id="connect-test" style="display:none;"  /> ');

	var imgPath = "https://www.baidu.com/img/bd_logo1.png";
	var timeStamp = Date.parse(new Date());
	$("#connect-test").attr("src", imgPath + "?timestamp=" + timeStamp);
	$("#connect-test").load(function() {
		alert("Network connect!");
	});
	$("#connect-test").error(function() {
		alert("Network disconnect!");
	});
}

//打印数组到控制台
Base.prototype.printArryLog = function(array) {
	console.log("BASE-OUT----------- START-----------");
	if (typeof array != "object") {
		console.log(array);
	} else {
		array.forEach(function(item, index) {
			console.log("[" + index + "]:" + item);

		});
	}
	console.log("BASE-OUT------------ END -----------");
}

//数据匹配
Base.valiMatch = function() {}

//数据匹配 括号验证
Base.valiMatch.Parenthesis = function(ptstring) {

	//生成base对象 调用控制台输出
	var out = new Base();
	out.printArryLog("Parenthesis extraction ..... ");
	//匹配模式 提取括号！ if(patt.test(item))
	var patt = /[\{\}\[\]\(\)]/g;
	//生成括号数组
	var ptArray = ptstring.match(patt);
	//stack 申请
	var stack = new Array();
	//遍历parenthesis 检测是否匹配
	ptArray.forEach(function(item, index) {
		if (/[\{\[\(]/g.test(item)) {
			stack.unshift(item);
			out.printArryLog("<-入栈...'" + item + "'");
		} else {
			if (stack[0] + item == "()" || stack[0] + item == "{}" || stack[0] + item == "[]") {
				stack.shift();
				out.printArryLog(item + "...出栈->");
			} else {
				stack.unshift(item);
				out.printArryLog("-ERRO-'" + item + "'");
			}
		}
	})


	out.printArryLog(stack + "剩余元素：" + stack.length + "   匹配状态:" + (stack[0] == undefined));

	return (stack[0] == undefined);
}

//基础函数 extend

Base.array = function() {
	alert("ok");
}
Base.array.copyArray = function(inSrcArray, inDestArry) {
	var i;
	for (var i = 0; i <= inSrcArray.length; i++) {
		inDestArry.push(inSrcArray[i]);
	}
	return inDestArry;
}
Base.array.findInArray = function(inArray, inValue) {
	var i;
	for (i = 0; i < inArray.length; i++) {
		if (inArray[i] == inValue) {
			return i;
		}
		return -1;
	}
}
Base.array.arrayAverage = function() {
	var accumulator = 0;
	var i;
	for (i = 0; i < inArray.length; i++) {
		accumulator += inArray[i];
	}
	return accumulator / inArray.length;
}

Base.datetime = function() {}

Base.datetime.isLeapYear = function(inYear) {
	if ((inYear % 4 == 0 && !(inYear % 100 == 0)) || inYear % 400 == 0) {
		return true;
	} else {
		return false;
	}
}
Base.datetime.getNumberDaysInMonth = function(inMontn, inYear) {
	inMontn = inMontn - 1;
	var leap_year = this.isLeapYear(inYear);
	if (leap_year) {
		leap_year = 1;
	} else {
		leap_year = 0;
	}
	if (inMontn == 3 || inMontn == 5 || inMontn == 8 || inMontn == 10) {
		return 30;
	} else if (inMontn == 1) {
		return 28 + leap_year;
	} else {
		return 31;
	}
}
Base.debug = function() {}
Base.debug.ennumprops = function(inObj) {
	var props = "";
	var i;
	for (i in inObj) {
		props += i + " = " + inObj[i] + "\n";
	}
	alert(props);
} //end enumprops;
