$(function () {
    //密码验证
    var form = layui.form;
    var layer = layui.layer;

    form.verify({
        pwd: [
            /^\S{1,6}$/,
            '密码长度要在1~6位，且不能有空格'
        ],
        samePwd: function (value) {
            if (value === $('input[name="oldPwd"]').val()) {
                return "新密码不能与旧密码一致"
            }
        },
        rePwd: function (value) {
            if (value !== $('input[name="newPwd"]').val()) {
                return "两次密码不一致"
            }
        }
    })

    //监听提交按钮
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("更新密码失败！");
                }
                layer.msg("更新密码成功！");
                $('.layui-form')[0].reset();
            }
        });
    })









})