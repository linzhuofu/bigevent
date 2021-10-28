$(function() {
    var layer = layui.layer
        // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
            // 纵横比
            aspectRatio: 1,
            // 指定预览区域
            preview: '.img-preview'
        }
        // 1.3 创建裁剪区域
    $image.cropper(options)


    $("#btnChooseImage").on("click", function() {
        $("#file").click()
    })

    //监听文件发生改变的事件//
    $("#file").on("change", function(e) {
        var tagetfile = e.target.files;
        console.log(tagetfile);
        if (tagetfile.length <= 0) {
            return layer.msg("请选择图片")
        } else {
            //更换裁剪的图片
            var file = e.target.files[0]
            var newImgURL = URL.createObjectURL(file)
            $image
                .cropper('destroy') // 销毁旧的裁剪区域
                .attr('src', newImgURL) // 重新设置图片路径
                .cropper(options) // 重新初始化裁剪区域

        }

    })

    $("#btnUpload").on("click", function() {
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        console.log(dataURL, "dataURL");
        $.ajax({
            method: "post",
            data: dataURL,
            url: "/my/update/avatar",
            success: function(res) {
                console.log(res, "kkkk");
                if (res.status != 0) {
                    return layer.msg("更新头像失败")
                } else {
                    layer.msg("更新头像成功")
                    console.log(window.parent);
                }

            }
        })
    })
})