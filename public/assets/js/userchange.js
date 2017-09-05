$(function(){
    $.ajax({
		type: "get",
		url: window.host+"user",
		success: function (res) {
			 console.log(res);
             $("#name").val(res.name);
			 $("#nickname").val(res.nickname);
			 $("#phone").val(res.phone);
			 $("#email").val(res.email);
		},
		error: function (res) {
			window.location = 'login-page.html'

		}

	})

      
    $("button").click(function (e) {
        e.preventDefault();
		console.log($("#nickname").val())
        console.log($('#form').serialize())
        $.ajax({
            url:window.host+"modify",
            method: "post",
            data: {
				nickname:$("#nickname").val(),
				telephone:$("#phone").val(),
				email:$("#email").val(),
				oldPassword:$("#oldPassword").val(),
				newPassword:$("#newPassword").val()
			}
		
	        }).success(function (data) {
            console.log("接收成功")
            $("#message").html("修改成功");
        }).error(function(){
            console.log("失败")
            $("#message").html("修改失败,请规范填写");
        })
    })




})