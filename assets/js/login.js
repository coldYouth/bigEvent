$(function () {
    //登陆注册链接跳转
    $("#link_reg").on("click", function () {
        $(".login-box").hide();
        $(".reg-box").show();
    });

    $("#link_login").on("click", function () {
        $(".reg-box").hide();
        $(".login-box").show();
    });

    //添加密码验证规则
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //添加二次密码验证规则
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val();
            if (value !== pwd) { return '两次密码不一致' }
        }
    })

    //在每次提交ajax前拼接url地址
    $.ajaxPrefilter(function (options) {
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    })

    //监听注册表单的提交事件
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg input[name=username]").val(),
            password: $("#form_reg input[name=password]").val()
        }
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
            $("#link_login").click();
        })
    })

    //监听登陆表单的提交事件
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        var data = $("#form_login").serialize();
        $.post('/api/login', data, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            //存储token
            localStorage.setItem('token', res.token);
            //跳转到主页面
            location.href = '/index.html';
        })
    })






})