$(function() {
    var layer = layui.layer;
    var form = layui.form;
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //用于判断新旧密码不可以一致
        samePwd: function(value) {
            if (value == $("[name=oldPwd]").val()) {
                return "新旧密码不可以一致"

            }
        },
        //用于两次密码是否一致
        rePwd: function(value) {
            if (value != $("[name=newPwd]").val()) {
                return "两次输入的密码不一致"
            }
        }
    })

    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: "post",
            data: $(this).serialize(),
            url: "/my/updatepwd",
            success: function(res) {
                console.log(res, "重置密码");
                if (res.status != 0) {
                    return layer.msg("重置密码失败")
                }
                layer.msg("重置密码成功");
                //修改成功以后清空表单
                $(".layui-form")[0].reset()
            }
        })






    })


})