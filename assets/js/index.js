$(function() {



    getinfo()

    function getinfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function(res) {
                var layer = layui.layer
                if (res.status !== 0) {
                    layer.msg("获取用户数据失败")
                } else {
                    console.log(res);
                    getavatar(res.data)

                }
            },
            // //无论请求是否成功都会调用函数//
            // complete: function(res) {
            //     console.log(res, "Ssss");
            //     if (res.responseJSON.status == 1 && res.responseJSON.message == "身份认证失败！") {
            //         localStorage.removeItem("token");
            //         location.href = "./login.html"

            //     }
            // }
        })
    }



    //渲染用户头像
    function getavatar(data) {
        console.log(data);
        var name = data.nickname || data.username
        console.log(name[0]);
        if (data.user_pic !== null) {
            $(".layui-nav-img").attr("src", data.user_pic).show();
            $(".text-avatar").hide();
        } else {
            $(".layui-nav-img").hide();
            $(".text-avatar").show();
            $(".text-avatar").html(name[0].toUpperCase())
            $("#welcome").html("欢迎&nbsp;&nbsp;" + name)
        }
    }



    $('#btnLogout').on('click', function() {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1. 清空本地存储中的 token
            localStorage.removeItem('token')
                // 2. 重新跳转到登录页面
            location.href = '/login.html'

            // 关闭 confirm 询问框
            layer.close(index)
        })
    })

})