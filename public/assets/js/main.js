
// 注册登录
let $login_btn = $('.login');
let $user = $('#user');
let $user_inner = $user.find('.user-inner');
let $user_login = $user.find('.login');
let $close_btn = $user.find('.close');
let $switch_login = $user.find('.switch-login').find('a');


let user_h = 0;
let login_h = $user_login.height();


$login_btn.click(function () {
  $user.fadeIn();
  $user_login.css({ height: login_h }).show();
  user_h = $user_inner.height();
  $user_inner.css({ marginTop: -(user_h / 2) });
  return false;
});
$close_btn.click(function () {
  $user.fadeOut();
});
$(document).click(function () {
  $user.fadeOut();
});
$user_inner.click(function () {
  return false;
});
  $user_login.show().animate({ height: login_h });
// 发数据
$(function () {
  var verifyCode = new GVerify("v_container");
  $("#login").click(function (e) {
    e.preventDefault();
    var res = verifyCode.validate(document.getElementById("code_input").value);
    if (res) {
      $.ajax({
        type: "POST",
        url: window.host+"login",
        data: $('#form').serialize(),// 要提交的表单 
        success: function (res) {
           $("#message").html("登陆成功")
          window.location = 'landing-page.html'
        },
        error: function (res) {
          // alert("用户名或密码错误");
          $("#message").html("用户名或密码错误")
          $("input").click(function(){
             $("#message").html("");
          })
        }
        
      });
    } else {
      // alert("验证码错误");
      $("#message").html("验证码错误")
      $("input").click(function(){
             $("#message").html("");
          })
    }
  })

})


