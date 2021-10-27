$.ajaxPrefilter(function(options) {
    console.log(options.url) // 获取出请求的地址
        //发起真正的Ajax请求之前，统一拼接请求的根路径
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        //判断是否在地址中有/my然后携带token

    if (options.url.indexOf("/my")) {
        options.headers = { 'Authorization': localStorage.getItem("token") };
    }



    //全局挂载complete
    options.complete = function(res) {
        //无论请求是否成功都会调用函数//
        console.log(res, "Ssss");
        if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            localStorage.removeItem("token");
            location.href = "./login.html"

        }
    }

});