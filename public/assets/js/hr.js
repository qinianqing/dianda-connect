$(
$.ajax({
		type: "get",
		url: "/user",
		success: function (res) {
			 
		},
		error: function (res) {
			window.location = 'login-page.html'

		}

	})

)

$("#changes").eq(0).hide();
//单页切换

$(function(){
    var i=window.sessionStorage.getItem("page")|0
    $('#con li').eq(i).show().siblings().hide();
    $('#tit li').addClass('active').siblings().removeClass('active');
    
})

$('#tit li').click(function () {
    var i = $(this).index();//下标第一种写法
    //var i = $('tit').index(this);//下标第二种写法
    window.sessionStorage.setItem('page',i)
     $('#con li').eq(i).show().siblings().hide();
     $('input[type="text"]').val("");
    $(this).addClass('active').siblings().removeClass('active');
   
     
    $('#text').eq(0).show();
     $('#submit').eq(0).show();

});

$("#push_ot").click(function () {
var log = console.log.bind(console);
var keyDescription = {
    name: ['姓名'],
    education: ['学历/学位', '学历层次', '教育程度'],
    email: ['电子邮件', '电子邮箱', '邮箱'],
    phone: ['联系电话', '手机号码', '电话','手机'],
    year:['工作年限'],
    age: ['年龄'],
   university: ['学校','毕业院校',],
    sex: ['性别'],
    political: ['政治面貌'],
    location:['现地址'],
    home:['户口地址']
};
var valueTrait = {
    education: ['本科', '学士', '硕士', '博士','专科'],
    sex: ['男', '女']
};
//返回当前key的位置与长度
function matchKey(key, resume) {
    var reg = key.split('').join('( *| *|\n*)*');
    var regExp = new RegExp(reg);
    var match = regExp.exec(resume);
    if (!match) {
        return { key: key, keyPosition: -1 };
    }
    var _a = [match.index, match[0].length], keyPosition = _a[0], keyWidth = _a[1];
    return { key: key, keyPosition: keyPosition, keyWidth: keyWidth };
}
//去除冗余信息
function trim(s) {
    return s
        .split('\n')[0].trim()
        .replace('：', '').trim()
        .replace(':', '').trim()
        .split(' ')[0].trim();
}
//收集可用的key，生成初步的信息
function collectByKey(keyDescription, resume) {
    var keyMap = [];
    for (var _i = 0, _a = Object.keys(keyDescription); _i < _a.length; _i++) {
        var key = _a[_i];
        for (var _b = 0, _c = keyDescription[key]; _b < _c.length; _b++) {
            var keyName = _c[_b];
            var match = matchKey(keyName, resume);
            if (match.keyPosition !== -1) {
                match.key = key;
                keyMap.push(match);
                break;
            }
        }
    }
    keyMap.sort(function (a, b) { return a.keyPosition - b.keyPosition; });
    var collected = {};
    for (var i = 0; i < keyMap.length - 1; i += 1) {
        var current = keyMap[i];
        var next = keyMap[i + 1];
        var part_1 = resume.slice(current.keyPosition + current.keyWidth, next.keyPosition);
        collected[current.key] = trim(part_1);
    }
    // console.log(keyMap)
    if (!keyMap.length) {
        return collected;
    }
    var last = keyMap[keyMap.length - 1];
    var part = resume.slice(last.keyPosition + last.keyWidth);
    collected[last.key] = trim(part);
    return collected;
}
//尝试寻找额外信息
function collectAdditional(collected, valueTrait, resume) {
    for (var _i = 0, _a = Object.keys(valueTrait); _i < _a.length; _i++) {
        var key = _a[_i];
        if (!collected[key]) {
            for (var _b = 0, _c = valueTrait[key]; _b < _c.length; _b++) {
                var trait = _c[_b];
                if (resume.indexOf(trait) !== -1) {
                    collected[key] = trait;
                }
            }
        }
    }
    return collected;
}
    let resume = $("#post").val();
    var collected = collectByKey(keyDescription, resume);
    log(collectAdditional(collected, valueTrait, resume));
    let result = collectAdditional(collected, valueTrait, resume);
    // $("#name").val(result.name);
    // $("#sex").val(result.sex);
    // $("#year").val(result.year);
    // $("#age").val(result.age);
    // $("#phone").val(result.phone);
    // $("#email").val(result.email);
    // $("#source").val(result.source);
    // $("#education").val(result.edu);
    // $("#university").val(result.college);
   
    Object.keys(result).forEach(function (ele, index) {
                $(`#${ele}`).val(Object.values(result)[index]);
            })
     $("#interview_assessment").val(new Date().toLocaleString());
})


$("#submit").click(function(e){
    e.preventDefault();
        console.log($('#form').serialize())
        $.ajax({
            url:"/hr",
            method: "post",
            data: $('#form').serialize(),
        }).success(function (info) {
            $("#message").html(info.info);
        }).error(function(info){
            console.log(info.responseJSON.info)
            $("#message").html(info.responseJSON.info);
        })
})
$("#changes").click(function(e){
    e.preventDefault();
        console.log($('#form').serialize())
        $.ajax({
            url:"/changes",
            method: "post",
            data: $('#form').serialize(),
        }).success(function (data) {
            console.log(data.info);
            $("#message").html(data.info);
            
        }).error(function(data){
            console.log("修改后选者失败")
            $("#message").html(data.responseJSON.info);
        })
})


$(".year").click(function(){
    $("#year").val(this.value);
})
$(".sexs").click(function(){
    $("#sex").val(this.value);
})
$(".sou").click(function(){
    $("#source").val(this.value);
})
$(".eva").click(function(){
    $("#evaluate").val(this.value);
})
$(".edu").click(function(){
    $("#education").val(this.value);
})
$(".education").click(function(){
     $("#education").val($("#education").val()+','+this.value);
})
$(".sta").click(function(){
     
    $("#statu").val(this.value+','); 
    
})
$("#interview_times").shijian();


