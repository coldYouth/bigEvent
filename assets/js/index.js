$(function () {
    getUserInfo();
    logout();
})

//获取用户信息
function getUserInfo() {
    $.ajax({
        method: 'get',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户基本信息失败');
            }
            // 渲染用户头像
            renderAvatar(res.data);
        }
    })
}

//渲染头像
function renderAvatar(user) {
    // 显示用户名
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    //渲染头像
    if (user.user_pic !== null) {
        //渲染用户的头像
        $('.text-avatar').hide();
        $('.layui-nav-img').attr('src', user.user_pic).show();
    } else {
        //渲染文字头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();

    }
}

//退出登录
function logout() {
    $("#logout_btn").on('click', function () {
        var layer = layui.layer;
        //eg1
        layer.confirm('确定退出登录吗?', { icon: 3, title: '提示' }, function (index) {
            //清除token
            localStorage.removeItem('token');
            //回到登录页
            location.href = '/login.html';
            layer.close(index);
        });

    })
}

