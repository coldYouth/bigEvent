$(function () {
    //在每次提交ajax前拼接url地址
    $.ajaxPrefilter(function (options) {
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

        //统一为'/my/'开头的请求添加headers
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            };
        }

        //统一添加complete函数,防止跳过登录进入主页
        options.complete = function (res) {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                //验证失败就清空token
                localStorage.removeItem('token');
                //验证失败就跳回登录页
                location.href = '/login.html';
            }
        }


    })


})