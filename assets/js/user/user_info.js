$(function () {
    var layer = layui.layer;
    var form = layui.form;

    //昵称长度要在1~6位
    form.verify({
        nickname: [
            /^[\S]{1,6}$/
            , '昵称长度要在1~6位，且不能出现空格'
        ]
    })

    //获取用户基本信息
    function initUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户基本信息失败')
                }
                form.val("formUserInfo", res.data);
            }
        })
    }
    initUserInfo();

    //重置按钮功能
    $("#btnReset").on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    //监听提交按钮事件
    $('#btnSubmit').on('click', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/my/userinfo',
            data: $('.layui-form').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg("修改用户信息失败！");
                }
                //调用iframe子页面的父亲index页面方法；
                window.parent.getUserInfo();
                // console.log(window.parent);
            }
        });
    })
})






