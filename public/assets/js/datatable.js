/* Formatting function for row details - modify as you need */
function format(d) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">' +
        '<tr>' +
        '<td>学校：</td>' +
        '<td>' + d.university + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>最近操作日期：</td>' +
        '<td>' + d.date + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>面试时间：</td>' +
        '<td>' + d.end_result+ '</td>' +
        '</tr>'+
        '<tr>' +
        '<td>描述：</td>' +
        '<td>' + d.data + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>流程状态：</td>' +
        '<td>' + d.statu + '</td>' +
        '</tr>' +
        '<tr>' +
        '<td>来源：</td>' +
        '<td>' + d.source+ '</td>' +
        '</tr>' +
        '</table>';
}
function datatable() {

    var table = $('#example').DataTable({
        "ajax": "/hr",
        "iDisplayLength" : 25,
        "columns": [
            {
                "class": 'details-control',
                "orderable": false,
                dataSrc: 'data',
                "defaultContent" : ''
            },
            { title: '姓名', "data": "name" },
            { title: '性别', "data": "sex" },
            { title: '学历', "data": "education" },
            { title: '电话', "data": "phone" },
            { title: '邮箱', "data": "email" },
            { title: '经验', "data": "year" },
            { title: '评价', "data": "evaluate" },
            { title: '来源', "data": "source" },
            { title: '职位', "data": "interview_assessment" ,"defaultContent" : ''}
        ],
        "order": [[1, 'asc']],
        columnDefs: [{
            targets: 10,
            render: function (data, type, row, meta) {
                console.log("row", row);
                return '<a type="button"  class="btn btn-danger  btn-block"  href="#" onclick=window.changeFrom("' + row.name + '","' + row.phone + '") >修改</a>';
            }
        }, { "orderable": false, "targets": 10},
        ],
    });
    function delFromID() {
    }

    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row(tr);
        if (row.child.isShown()) {
            row.child.hide();
            tr.removeClass('shown');
        }
        else {

            row.child(format(row.data())).show();
            tr.addClass('shown');

        }
    });
    window.changeFrom = function (row_name, row_phone) {
        $("#h2").html( `面试人员基本信息修改<small style="color:red" id="message"></small> `);
        $('#con li').eq(0).show().siblings().hide();
        $('#text').eq(0).hide().siblings().show();
        $('#submit').eq(0).hide();
        $('#changes').eq(0).show();
        $.ajax({
            url: "/change/" + row_name + "/" + row_phone,
            method: "get",
        }).success(function (data) {

            Object.keys(data).forEach(function (ele, index) {
                $(`#${ele}`).val(Object.values(data)[index]);
            })
             $("#time").val(new Date().toLocaleString());
             $("#message").html(data);
        }).error(function (info) {
            console.log("失败")
             $("#message").html("");
        })
    }
}

$(document).ready(function(){
     datatable();
});
$('#li_t').click(function(){
   location.reload() ;
});




