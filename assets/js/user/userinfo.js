$(function() {
    var form = layui.form;
    var layer = layui.layer
    form.verify({
        nickname: function(value) {
            console.log("asadad");
            if (value.length > 6) {
                return "输入的名字不可以大于8个字符"
            }
        }
    })

    //获取用户的基本信息
    getinfo()

    function getinfo() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message);
                form.val("formUserInfo", res.data)
            }
        })
    }


    //提交发起ajax
    $("#laiuiinfo").on("submit", function(e) {
            console.log("三生三世", $(this).serialize());
            e.preventDefault()
            $.ajax({
                method: "post",
                url: "/my/userinfo",
                data: $(this).serialize(),
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layer.msg("信息更新失败")
                    }
                    layer.msg("信息更新成功");
                    console.log(window.parent);
                    //window.parent.getinfo()

                }
            })

        })
        //实现重置按钮
    $("#btnReset").on("click", function(e) {
        e.preventDefault()
        getinfo()
    })
})