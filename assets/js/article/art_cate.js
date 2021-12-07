$(function () {
  var layer = layui.layer
  var form = layui.form

  initArtCateList()

  // 获取文章分类的列表
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        var htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }

  // 为添加类别按钮绑定点击事件
  var indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
    })
  })

  // 通过代理的形式，为 form-add 表单绑定 submit 事件
  $('body').on('submit', '#form-add', function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('新增分类失败！')
        }
        initArtCateList()
        layer.msg('新增分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
      }
    })
  })

  // 通过代理的形式，为 btn-edit 按钮绑定点击事件
  var indexEdit = null;
  $('tbody').on('click', '.btn-edit', function (e) {
    // 弹出一个修改文章分类信息的层
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章分类',
      content: $('#dialog-edit').html()
    })

    //绑定在按钮上的data-id
    //console.log($(this).attr('data-id'));
    var dataId = $(this).attr('data-id');

    // 根据 Id 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: '/my/article/cates/' + dataId,
      success: function (res) {
        layui.form.val('form-edit', res.data);
      }
    });
  })

  // 通过代理的形式，为修改分类的表单绑定 submit 事件
  $('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    // 根据 Id 更新文章分类数据
    $.ajax({
      method: 'post',
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("更新分类失败！");
        }
        //刷新文章列表
        initArtCateList()
        layui.layer.msg('更新分类成功！')
        // 根据索引，关闭对应的弹出层
        layer.close(indexEdit);
      }
    })

  })


  // 通过代理的形式，为删除按钮绑定点击事件
  $('tbody').on('click', '.btn-delete', function () {
    var dataId = $(this).attr('data-id');
    //删除文章的弹出层
    layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
      //发起ajax请求删除文章
      $.ajax({
        method: 'GET',
        url: '/my/article/deletecate/' + dataId,
        success: function (res) {
          if (res.status !== 0) {
            return layui.layer.msg("删除文章失败");
          }
          //刷新文章列表
          initArtCateList();
          layui.layer.msg("删除文章成功");
        }
      })
      layer.close(index);
    });
  })











})
