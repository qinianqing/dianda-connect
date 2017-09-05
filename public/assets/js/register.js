    $("#register").click(function (e) {
        e.preventDefault();
        // console.log($('#form').serialize())
        $.ajax({
            url:window.host+"register",
            method: "post",
            data: $('#form').serialize(),
        }).success(function (data) {
            console.log("接收成功")
            $("#message").html("注册成功");
            document.getElementById('form').reset();
        }).error(function(){
            console.log("失败")
            $("#message").html("注册失败,请规范填写");
        })
    })

