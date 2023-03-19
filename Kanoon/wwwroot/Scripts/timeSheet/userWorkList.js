var userId = localStorage['userId'];
var FirstName = localStorage['FirstName'];
var LastName = localStorage['LastName'];
var Mobile = localStorage['Mobile'];
var Credit = localStorage['Credit'];
var GroupName = localStorage['GroupName'];
var NationalCode = localStorage['NationalCode'];

var allClockSum = 0;
var userClockSum = 0;
var WorkType = 0;
var selectedWorkForStart = 0;
var selectedWorkForFinish = 0;

window.onload = function () {
	var isloggedin = localStorage['isUserLoggedIn'];
	if (isloggedin == 'T') {


	} else {
		window.location.href = "login?id=1";
	};
    var sh = screen.height;
    var sw = screen.width;

    if (sh < 900 && sw < 450) {
        window.setTimeout("redirect()", 3000)
    } else {

        redirect()
    }
};




function redirect() {
    var sh = screen.height;
    var sw = screen.width;

    if ((sh < 900 && sw < 450) || (sh <= 1100 && sw <= 800)) {
        if (localStorage['isFromAdmin']) {
            if (localStorage['selectedWorkTitleUserId'] == 0) {
                if (WorkType == 2) {
                    var a1 = document.getElementsByClassName('UItem');

                    for (var m = 1; m < a1.length; m++) {

                        a1[m].style.fontSize = "20px";

                    }



                }
            }
        }
 

    } else {
        var x = document.getElementsByClassName('dateSelect');

    
        for (var i = 0; i < x.length; i++) {
            x[i].style.width = "4vw";
            x[i].style.height = "3vw";
            x[i].style.minWidth = "4vw";
            x[i].style.fontSize = "1vw";
            x[i].style.borderRadius = "1vw";
        }
        
        var y = document.getElementsByClassName('form-wrapper');
   
        for (var j = 0; j < y.length; j++) {
            y[j].style.maxWidth = "84vw";
            y[j].style.margin = "auto";
        }


        var z = document.getElementsByClassName('UItem');
       
        for (var k = 0; k < z.length; k++) {
            z[k].style.minHeight = "4vw";
            z[k].style.fontSize = "1.5vw";
            z[k].style.padding = "1vw";
            z[k].style.margin = "0.4vw";
        }

        var a = document.getElementsByClassName('listItems');
        
        //for (var m = 0; m < a.length; m++) {
        //    a[m].style.width = "16.66%";
        //    a[m].style.minWidth = "16.66%";
        //    a[m].style.fontSize = "1.5vw";
        //}
        var a0 = document.getElementsByClassName('listItems0');

        //for (var m = 0; m < a0.length; m++) {
        //    a0[m].style.width = "16.66%";
        //    a0[m].style.minWidth = "16.66%";
        //    a0[m].style.fontSize = "1.5vw";
        //}

        var b = document.getElementsByClassName('dateTitle');
      
        for (var n = 0; n < b.length; n++) {
            b[n].style.width = "12vw";
            b[n].style.minWidth = "12vw";
            b[n].style.fontSize = "1.5vw";
        }

        var c = document.getElementById('dateContainer');

            c.style.maxWidth = "60vw";
            c.style.margin = "auto";
        


        var d = document.getElementsByClassName('menuList');
        
        for (var t = 0; t < d.length; t++) {
            d[t].style.fontSize = "1.5vw";
            d[t].style.fontSize = "1.5vw";
        }

        var e = document.getElementsByClassName('menuli');

    
        for (var r = 0; r < e.length; r++) {
            e[r].style.padding = "0.5vw";

        }

        var f = document.getElementsByClassName('tabButoon');

        
        for (var i = 0; i < f.length; i++) {

            f[i].style.margin = "auto";
            f[i].style.height = "4vw";
            f[i].style.padding = "1vw";
            f[i].style.fontSize = "2vw";

        }
        

        var g = document.getElementsByClassName('startButton');

        for (var i = 0; i < g.length; i++) {

          
            g[i].style.fontSize = "1.5vw";
            g[i].style.padding = "1vw";

        }
       // document.getElementById('userList').style.width = "65vw";
     


        document.getElementById('navbar').style.padding = "0.1vw 1vw";
        document.getElementById('mainTitle').style.fontSize = "1.7vw";
        document.getElementsByClassName('menuIcon')[0].style.width = "2vw";
        document.getElementsByClassName('menuIcon')[0].style.height = "2vw";





        //popups

        var g = document.getElementsByClassName('description');


        for (var i = 0; i < g.length; i++) {

           
            g[i].style.height = "15vw";
           

        }

        var h = document.getElementsByClassName('form-cont');

        for (var i = 0; i < h.length; i++) {

            h[i].style.width = "40vw";
            h[i].style.padding = "2vw";

        }

      
        //document.getElementById('description').style.height = "15vw";
        //document.getElementById('newWorkTitle').style.height = "15vw";


        //document.getElementById('form-cont').style.width = "40vw";
        //document.getElementById('form-cont').style.padding = "2vw";

        //document.getElementById('formButton1').style.fontSize = "2vw";
        //document.getElementById('formButton1').style.padding = "1vw";
        document.getElementById('formButtonC1').style.fontSize = "2vw";
        document.getElementById('formButtonC1').style.padding = "1vw";
        document.getElementById('formButtonC1').style.width = "49%";

        document.getElementById('formButton2').style.fontSize = "2vw";
        document.getElementById('formButton2').style.padding = "1vw";
        document.getElementById('formButton2').style.width = "49%";
        document.getElementById('formButtonC2').style.fontSize = "2vw";
        document.getElementById('formButtonC2').style.padding = "1vw";
        document.getElementById('formButtonC2').style.width = "49%";

        document.getElementById('formButton3').style.fontSize = "2vw";
        document.getElementById('formButton3').style.padding = "1vw";
        document.getElementById('formButton3').style.width = "49%";
        document.getElementById('formButtonC3').style.fontSize = "2vw";
        document.getElementById('formButtonC3').style.padding = "1vw";
        document.getElementById('formButtonC3').style.width = "49%";

        document.getElementById('formButton4').style.fontSize = "2vw";
        document.getElementById('formButton4').style.padding = "1vw";
        document.getElementById('formButton4').style.width = "49%";
        document.getElementById('formButtonC4').style.fontSize = "2vw";
        document.getElementById('formButtonC4').style.padding = "1vw";
        document.getElementById('formButtonC4').style.width = "49%";

        document.getElementById('backButton').style.fontSize = "2vw";
        var j = document.getElementsByClassName('popLable1');
        for (var i = 0; i < j.length; i++) {
            j[i].style.margin = "0 0 1vw 0";
            j[i].style.fontSize = "2vw";
        }


        var k = document.getElementsByClassName('popLable2');
        for (var i = 0; i < k.length; i++) {
            k[i].style.margin = "0 0 1vw 0";
            k[i].style.fontSize = "1.5vw";
        }




    }
    return
}





$(document).ready(function () {
    getDates();
    localStorage.setItem('isFromWorkTitle', 1);
    if (localStorage['isFromAdmin']) {
        
        if (localStorage['selectedWorkTitleUserId'] == 0) {
            WorkType = 1;
            document.getElementById('menoIcon').style.display = "none";
            document.getElementById('notDoneWorks').style.backgroundColor = "#6464641a";
            document.getElementById('doneWorks').style.backgroundColor = "#6464641a";
            document.getElementById('currentWorks').style.backgroundColor = "#ffff001a";
        } else {
            WorkType = 0;
            document.getElementById('menoIcon').style.display = "block";
            document.getElementById('notDoneWorks').style.backgroundColor = "#ffff001a";
            document.getElementById('doneWorks').style.backgroundColor = "#6464641a";
            document.getElementById('currentWorks').style.backgroundColor = "#6464641a";
            getActiveProjectsList();
            getActiveDefinedWorkList();
        }
    } else{
        WorkType = 0;
        document.getElementById('menoIcon').style.display = "block";
        document.getElementById('notDoneWorks').style.backgroundColor = "#ffff001a";
        document.getElementById('doneWorks').style.backgroundColor = "#6464641a";
        document.getElementById('currentWorks').style.backgroundColor = "#6464641a";
        getActiveProjectsList();
        getActiveDefinedWorkList();
    }
   
    
});

function getActiveProjectsList() {
  
    var hrid = 1
    var url1 = "/timeSheetApi/getProjectList";
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            HeadRoleId: hrid,

        },

        error: function (xhr, _status, _error) {

            if (xhr.status >= 400) {
                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {

        console.log(returnedData);
        $("#projectForAdmin").empty();
        var option = document.createElement("option");
        $("#projectForAdmin").append('<option value=' + 0 + '>پروژه</option>');

        $.each(returnedData.Data.activeProject, function (key, value) {

            $("#projectForAdmin").append('<option value=' + value.Id + '>' + value.ProjectTitle + '</option>');

        });
        document.getElementById('projectForAdmin').style.display = 'block';

    });


}
function getActiveDefinedWorkList() {

    var hrid = 1
    var url1 = "/timeSheetApi/getDefinedWorkList";
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            HeadRoleId: hrid,

        },

        error: function (xhr, _status, _error) {

            if (xhr.status >= 400) {
                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {

        console.log(returnedData);
        $("#DefinedWorkForAdmin").empty();
        var option = document.createElement("option");
        $("#DefinedWorkForAdmin").append('<option value=' + 0 + '>عنوان کار</option>');

        $.each(returnedData.Data.activedefinedWork, function (key, value) {

            $("#DefinedWorkForAdmin").append('<option value=' + value.Id + '>' + value.DefinedWorkTitle + '</option>');

        });
        document.getElementById('DefinedWorkForAdmin').style.display = 'block';

    });


}
function getDates() {
    var url1 = "/timeSheetApi/getPersianDates";
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
        },


        error: function (xhr, _status, _error) {

            if (xhr.status >= 400) {
                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {

        console.log(returnedData);

        $("#day1").empty();
        $("#day2").empty();
        $("#year1").empty();
        $("#year2").empty();
        $("#mount1").empty();
        $("#mount2").empty();
        var days = [];
        var mounts = [];
        var years = [];
        
        $.each(returnedData.Data.days, function (key, value) {

            $("#day1").append('<option value=' + Math.floor(value.PersianDate % 100) + '>' + Math.floor(value.PersianDate % 100) + '</option>');
            $("#day2").append('<option value=' + Math.floor(value.PersianDate % 100) + '>' + Math.floor(value.PersianDate % 100) + '</option>');
            days.push(Math.floor(value.PersianDate % 100));
        });

        
        $.each(returnedData.Data.mounts, function (key, value) {

            $("#mount1").append('<option value=' + Math.floor(value.PersianDate % 10000 / 100) * 100 + '>' + Math.floor(value.PersianDate % 10000 / 100) + '</option>');
            $("#mount2").append('<option value=' + Math.floor(value.PersianDate % 10000 / 100) * 100 + '>' + Math.floor(value.PersianDate % 10000 / 100) + '</option>');
            mounts.push(Math.floor(value.PersianDate % 10000 / 100));
        });

        $.each(returnedData.Data.years, function (key, value) {

            $("#year1").append('<option value=' + Math.floor(value.PersianDate / 10000) * 10000 + '>' + Math.floor(value.PersianDate / 10000) + '</option>');
            $("#year2").append('<option value=' + Math.floor(value.PersianDate / 10000) * 10000 + '>' + Math.floor(value.PersianDate / 10000) + '</option>');
            years.push(Math.floor(value.PersianDate / 10000));
        });

        $("#finishPredictDateList").append('<option style="text-align:center;" value=' + 0 + '>' + 'پیش‌بینی پایان کار' + '</option>');

        $.each(returnedData.Data.this30Days, function (key, value) {

            $("#finishPredictDateList").append('<option value=' + value + '>' + Math.floor(value / 10000) + '/' + Math.floor(value % 10000 / 100) + '/' + Math.floor(value % 100) + '</option>');

        });

        

        document.getElementById("day1").selectedIndex = String(days.indexOf(Math.floor(returnedData.Data.onMonthDay % 100)) );
        document.getElementById("day2").selectedIndex = String(days.indexOf(Math.floor(returnedData.Data.TodayPersianDate % 100)));
        document.getElementById("year1").selectedIndex = String(years.indexOf(Math.floor(returnedData.Data.onMonthDay / 10000)));
        document.getElementById("year2").selectedIndex = String(years.indexOf(Math.floor(returnedData.Data.TodayPersianDate / 10000)));
        document.getElementById("mount1").selectedIndex = String(mounts.indexOf(Math.floor(returnedData.Data.onMonthDay % 10000 / 100)));
        document.getElementById("mount2").selectedIndex = String(mounts.indexOf(Math.floor(returnedData.Data.TodayPersianDate % 10000 / 100)));

        


        openUserWorkList(WorkType);

    });
}

function activeDeactiveUser() {
    userId = localStorage['selectedWorkTitleUserId'];
    var myAlert = window.confirm('آیا از تغییر وضعیت کاربر مطمئن هستید؟');
    document.getElementById('loading').style.display = "block";

    if (myAlert) {
        var url2 = '/TimeSheetApi/ActiveDeactiveUser';
        $.ajax({
            url: url2,
            type: 'POST',
            data: {

                userId: userId,


            },
            headers: {
                'Authorization': 'bearer' + ' ' + localStorage['StudentId'],
            },
            error: function (xhr, status, _error) {
                document.getElementById('loading').style.display = "none";

                //console.log(error);
                console.log(status);
                console.log(xhr.status);
                if (xhr.status >= 400) {
                    alert('خطا در ارسال اطلاعات!');
                }

            }

        }).done(function (returnedData) {
            document.getElementById('loading').style.display = "none";

            console.log(returnedData);


            alert(returnedData.Data.Message);
            window.location.reload();


        });
    }
    else {
        document.getElementById('loading').style.display = "none";

    }




}

function setWorkType(workType) {
    WorkType = workType;
    if (workType == 0) {
        document.getElementById('notDoneWorks').style.backgroundColor = "#ffff001a";
        document.getElementById('doneWorks').style.backgroundColor = "#6464641a";
        document.getElementById('currentWorks').style.backgroundColor = "#6464641a";

    } 
    else if (workType == 1) {
        document.getElementById('currentWorks').style.backgroundColor = "#ffff001a";
        document.getElementById('doneWorks').style.backgroundColor = "#6464641a";
        document.getElementById('notDoneWorks').style.backgroundColor = "#6464641a";

    } else if (workType == 2) {
        document.getElementById('currentWorks').style.backgroundColor = "#6464641a";
        document.getElementById('doneWorks').style.backgroundColor = "#ffff001a";
        document.getElementById('notDoneWorks').style.backgroundColor = "#6464641a";
    }
    openUserWorkList();
}
// لیست کار کاربران در یک نگاه localStorage['isFromAdmin'] و  localStorage['selectedWorkTitleUserId'] == 0
// هر کاربر جدا localStorage['isFromAdmin'] برای ادمین
// در غیر این صورت لیست  کارها برای خود کاربران
function openUserWorkList() {
    var userId = 0;
    if (localStorage['isFromAdmin']) {
        userId = localStorage['selectedWorkTitleUserId'];

    } else {
        userId = localStorage['userId'];
    }
    var url2 = '/timeSheetApi/getUserWorkList';
    $.ajax({
        url: url2,
        type: 'POST',
        data: {
            userId: userId,
            workType: WorkType,
            FromPDate: (Number($("#year1").val()) + Number($("#mount1").val()) + Number($("#day1").val())),
            ToPDate: (Number($("#year2").val()) + Number($("#mount2").val()) + Number($("#day2").val())),
        },
        headers: {
            'Authorization': 'bearer' + ' ' + localStorage['StudentId'],
        },
        error: function (xhr, status, _error) {
            //console.log(error);
            console.log(status);
            console.log(xhr.status);
            if (xhr.status >= 400) {
                // window.location.href = "expire";
                RT(localStorage['groupId'], 2);
            }
            var err = eval("(" + xhr.responseText + ")");
            //alert(err.Message);
        }

    }).done(function (returnedData) {
        console.log(returnedData);
       
        document.getElementById('mainTitle').innerHTML = returnedData.Data.userName.Name + " " + returnedData.Data.userName.Family ;
        
        $("#userList").empty();
        $("#userList1").empty();
        userClockSum = 0;
        if (localStorage['isFromAdmin']) {
            if (localStorage['selectedWorkTitleUserId'] == 0) {
                document.getElementById('mainTitle').innerHTML = returnedData.Data.userName;


                if (WorkType == 2) {

                    $("#userList").append('<li class="UItem" style="background-color: aquamarine; min-height: 9vw;" >' +
                        '<div class="listItems" style="text-align:center; width:18.7%;" >' + "نام کاربر" +
                        '</div><div class="listItems" style="text-align:center; width:16.66%;" >' + " ورود کار" +
                        '</div><div class="listItems" style="text-align:center; width:16.66%;" >' + " شروع کار" +
                        '</div><div class="listItems" style="text-align:center; width:20%;"> ' + "عنوان کار" +
                        '</div><div class="listItems" style="text-align:center; width:10.7%;"> ' + "تعداد روز" +
                        '</div><div class="listItems" style="text-align:center; width:16.66%;" >' + "پایان کار" + '</div>' + '</li>');


                    $.each(returnedData.Data.WorkList, function (key, value) {
                        $("#userList").append('<li class="UItem" onclick="openTitle(\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle + '\')" >' +
                            '<div class="listItems" style="text-align:center; width:18.7%;" >' + value.userNames + '</div>' +
                            '<div class="listItems" style="text-align:center;width:16.67%;  height=10vw" >' +
                            Math.floor(value.a.InsertPersianDate / 10000) +
                            "/" + Math.floor(value.a.InsertPersianDate % 10000 / 100) +
                            "/" + Math.floor(value.a.InsertPersianDate % 100) +
                            '</div><div class="listItems" style="text-align:center;width:16.67%;" >' +
                            Math.floor(value.a.StartPersianDate / 10000) +
                            "/" + Math.floor(value.a.StartPersianDate % 10000 / 100) +
                            "/" + Math.floor(value.a.StartPersianDate % 100) +
                            '</div><div class="listItems" style="width:20%; text-align:center;"> ' + value.DefinedWorkTitle +
                            '</div>' +
                            '</div><div class="listItems" style="width: 10.7%;  text-align:center;"> ' + value.a.Days +
                            '</div>' + '<div class="listItems" style="text-align:center; width:16.67%;" >' +
                            Math.floor(value.a.HeadPredictFinishedDate / 10000) +
                            "/" + Math.floor(value.a.HeadPredictFinishedDate % 10000 / 100) +
                            "/" + Math.floor(value.a.HeadPredictFinishedDate % 100) +
                            '</div>' +
                            '<button class="startButton" onclick="openComment(\'' + value.a.UserComment + '\',\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle +
                            '\')">مشاهده کامنت</button>' +
                            '</li>');
                    });

                }
                else if (WorkType == 1) {
                    $("#userList").append('<li class="UItem" style="background-color: aquamarine; min-height: 9vw;" >' +
                        '<div class="listItems" style="text-align:center; width:20%;" >' + "نام کاربر" +
                        '</div><div class="listItems" style="text-align:center; width:15%;" >' + "ورود کار" +
                        '</div><div class="listItems" style="width:25%; text-align:center;">' + "عنوان کار" +
                        '</div><div class="listItems" style="text-align:center; width:15%; " >' + "شروع کار" +
                        '</div>' + '</div><div class="listItems" style="text-align:center; width:15%;" >' + "پیش‌بینی" +
                        '</div><div class="listItems" style="text-align:center; width:10%;">' + "حذف کار" + '</div>' +
                        '</div>' + '</li>');
                    $.each(returnedData.Data.WorkList, function (key, value) {
                        $("#userList").append('<li class="UItem" onclick="openTitle(\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle + '\')" >' +
                            '<div class="listItems" style="text-align:center; width:20%;" >' + value.userNames + '</div>' +
                            '<div class="listItems" style="text-align:center; width:15%;" >' + Math.floor((value.a.InsertPersianDate / 10000)%100) +
                            "/" + Math.floor(value.a.InsertPersianDate % 10000 / 100) +
                            "/" + Math.floor(value.a.InsertPersianDate % 100) +
                            '</div><div class="listItems" style="width: 25%;">' + value.DefinedWorkTitle + '</div>' +
                            '<div class="listItems" style="text-align:center; width:15%;" >' + Math.floor((value.a.StartPersianDate / 10000)%100) +
                            "/" + Math.floor(value.a.StartPersianDate % 10000 / 100) +
                            "/" + Math.floor(value.a.StartPersianDate % 100) +
                            '</div>' + '<div class="listItems" style="text-align:center; width:15%;" >' + Math.floor((value.a.HeadPredictFinishedDate / 10000)%100) +
                            "/" + Math.floor(value.a.HeadPredictFinishedDate % 10000 / 100) +
                            "/" + Math.floor(value.a.HeadPredictFinishedDate % 100) +
                            '</div><div class="listItems" style="text-align:center; width:10%;">' + '<button class="finishButton" style="font-size: inherit; margin: 0; padding: 4px; border-radius: 4px; width: 80px;" onclick="deleteWorkTitle(\'' + value.a.Id + '\')">حذف</button>' +
                            '</div>' + '</li>');
                    });

                }
                else if (WorkType == 0) {
                    $("#userList").append('<li class="UItem" style="background-color: aquamarine; min-height: 9vw;" >'+
                        '<div class="listItems" style="text-align:center; width:30%;" >' + "نام کاربر" +
                        '</div><div class="listItems" style="text-align:center; width:17%;" >' + "تاریخ ورود کار" +
                        '</div><div class="listItems" style="text-align:center; width:41%;"> ' + "عنوان کار" +
                        '</div><div class="listItems" style="text-align:center; width:12%;">' + "حذف کار" + '</div>' +
                        '</li>');
                    $.each(returnedData.Data.WorkList, function (key, value) {
                        $("#userList").append('<li class="UItem"  onclick="openTitle(\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle + '\')" >' +
                            '<div class="listItems" style="text-align:center; width:30%;" >' + value.userNames + '</div>' +
                            '<div class="listItems" style="text-align:center; width:17%;" >' +
                            Math.floor(value.a.InsertPersianDate / 10000) + "/" + Math.floor(value.a.InsertPersianDate % 10000 / 100) + "/" + Math.floor(value.a.InsertPersianDate % 100) +
                            '</div><div  class="listItems" style="text-align:center; width: 43%;">' + value.DefinedWorkTitle +
                            '</div><div class="listItems" style="text-align:center; width:10%;">' + '<button class="finishButton" style="font-size: inherit; margin: 0; padding: 4px; border-radius: 4px; width: 80px;" onclick="deleteWorkTitle(\'' + value.a.Id + '\')">حذف</button>' +
                           '</div>' +
                            '</li>');
                    });

                }

            }
            else {

                document.getElementById('activeDeactiveUser').style.display = 'block';
                if (returnedData.Data.userName.isActive == true) {
                    document.getElementById('activeDeactiveUser').innerHTML = 'غیر فعال کردن کاربر';
                } else {
                    document.getElementById('activeDeactiveUser').innerHTML = 'فعال کردن کاربر';

                }
               
            if (WorkType == 2) {
                
                $("#userList").append('<li class="UItem" style="background-color: aquamarine; min-height: 9vw;" >' +
                    '<div class="listItems" style="text-align:center; width:12%;" >' + " ورود کار" +
                    '</div><div class="listItems" style="text-align:center; width:12%;" >' + " شروع کار" +
                    '</div><div class="listItems" style="text-align:center; width:45%;"> ' + "عنوان کار" +
                    '</div><div class="listItems" style="text-align:center; width:10%;"> ' + "تعداد روز" +
                    '</div><div class="listItems" style="text-align:center; width:12%" >' + "پایان کار" + '</div>' + '</li>');




                
                $.each(returnedData.Data.WorkList, function (key, value) {
                    $("#userList").append('<li class="UItem" onclick="openTitle(\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle +'\')" >' +
                        '<div class="listItems" style="text-align:center;width:12%;  height=10vw" >' +
                        Math.floor(value.a.InsertPersianDate / 10000) +
                        "/" + Math.floor(value.a.InsertPersianDate % 10000 / 100) +
                        "/" + Math.floor(value.a.InsertPersianDate % 100) +
                        '</div><div class="listItems" style="text-align:center;width:12%;" >' +
                        Math.floor(value.a.StartPersianDate / 10000) +
                        "/" + Math.floor(value.a.StartPersianDate % 10000 / 100) +
                        "/" + Math.floor(value.a.StartPersianDate % 100) +
                        '</div><div class="listItems" style="width:45%; text-align:center;"> ' + value.DefinedWorkTitle +
                        '</div>' +
                        '</div><div class="listItems" style="width: 10%;  text-align:center;"> ' + value.a.Days +
                        '</div>' + '<div class="listItems" style="text-align:center;width:12%;" >' +
                        Math.floor(value.a.HeadPredictFinishedDate / 10000) +
                        "/" + Math.floor(value.a.HeadPredictFinishedDate % 10000 / 100) +
                        "/" + Math.floor(value.a.HeadPredictFinishedDate % 100) +
                        '</div>' +
                        '<button class="startButton" onclick="openComment(\'' + value.a.UserComment + '\',\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle +
                        '\')">مشاهده کامنت</button>' +
                        '</li>');
                });

            }
            else if (WorkType == 1) {
                $("#userList").append('<li class="UItem" style="background-color: aquamarine; min-height: 9vw;" >' +
                    '<div class="listItems" style="text-align:center; width:12%;" >' + "ورود کار" +
                    '</div><div class="listItems" style="width:50%; text-align:center;">' + "عنوان کار" +
                    '</div><div class="listItems" style="text-align:center; width:12%; " >' + "شروع کار" +
                    '</div>' + '</div><div class="listItems" style="text-align:center; width:12%;" >' + "پیش‌بینی" +
                    '</div><div class="listItems"  style="text-align:center; width:14%;">' + "حذف کار" + '</div>' +

                    '</div>' + '</li>');
                $.each(returnedData.Data.WorkList, function (key, value) {
                    $("#userList").append('<li class="UItem" onclick="openTitle(\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle +'\')" >' +
                        '<div class="listItems" style="text-align:center; width:12%;" >' + Math.floor(value.a.InsertPersianDate / 10000) +
                        "/" + Math.floor(value.a.InsertPersianDate % 10000 / 100) +
                        "/" + Math.floor(value.a.InsertPersianDate % 100) +
                        '</div><div class="listItems" style="text-align:center; width:50%;">' + value.DefinedWorkTitle + '</div>' +
                        '<div class="listItems" style="text-align:center; width:12%;" >' + Math.floor(value.a.StartPersianDate / 10000) +
                        "/" + Math.floor(value.a.StartPersianDate % 10000 / 100) +
                        "/" + Math.floor(value.a.StartPersianDate % 100) +
                        '</div>' + '<div class="listItems" style="text-align:center; width:12%;" >' + Math.floor(value.a.HeadPredictFinishedDate / 10000) +
                        "/" + Math.floor(value.a.HeadPredictFinishedDate % 10000 / 100) +
                        "/" + Math.floor(value.a.HeadPredictFinishedDate % 100) +
                        '</div><div class="listItems"  style="text-align:center; width:14%;">' + '<button class="finishButton" style="font-size: inherit; margin: 0; padding: 4px; border-radius: 4px; width: 80px;" onclick="deleteWorkTitle(\'' + value.a.Id + '\')">حذف</button>' +

                        '</div>' + '</li>');
                });

            }
            else if (WorkType == 0) {
                $("#userList").append('<li class="UItem" style="background-color: aquamarine; min-height: 9vw;" >' +
                    '<div class="listItems" style="text-align:center; width:33.33%;"  >' + "تاریخ ورود کار" +
                    '</div><div class="listItems"  style="text-align:center; width:56.33%;"> ' + "عنوان کار" +
                    '</div><div class="listItems"  style="text-align:center; width:10.33%;">' + "حذف کار" + '</div>' +
                    '</li>');
                $.each(returnedData.Data.WorkList, function (key, value) {
                    $("#userList").append('<li class="UItem"  onclick="openTitle(\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle +'\')" >' +
                        '<div class="listItems"  style="text-align:center; width:33.33%;">' +
                        Math.floor(value.a.InsertPersianDate / 10000) + "/" + Math.floor(value.a.InsertPersianDate % 10000 / 100) + "/" + Math.floor(value.a.InsertPersianDate % 100) +
                        '</div><div  class="listItems"  style="text-align:center; width:56.33%;">' +
                        value.DefinedWorkTitle + '</div>' + '<span class=""></span>' +
                        '</div><div class="listItems"  style="text-align:center; width:10.33%;">' + '<button class="finishButton" style="font-size: inherit; margin: 0; padding: 4px; border-radius: 4px; width: 80px;" onclick="deleteWorkTitle(\'' + value.a.Id + '\')">حذف</button>' +
                        '</div>' +
                        '</li>');
                });

                    }
            }
        } else {
            //document.getElementById('menoIcon').style.display = "none";

            if (WorkType == 2) {
                $("#userList").append('<li class="UItem" style="background-color: aquamarine; min-height: 9vw;" >' +
                    '<div class="listItems" style="width:33.33%;" >' + "تاریخ ورود کار" +
                    '</div><div class="listItems" style="width:33.33%;"> ' + "عنوان کار" +
                    '</div><div class="listItems" style="width:33.33%;" >' + "تاریخ پایان کار" + '</div>' + '</li>');

                $.each(returnedData.Data.WorkList, function (key, value) {
                    $("#userList").append('<li class="UItem" onclick="openTitle(\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle + '\')" >' +
                            '<div class="listItems" style="width:33.33%;" >' +
                            Math.floor(value.a.InsertPersianDate / 10000) +
                            "/" + Math.floor(value.a.InsertPersianDate % 10000 / 100) +
                            "/" + Math.floor(value.a.InsertPersianDate % 100) +
                        '</div><div class="listItems" style="width:33.33%; ">' + value.DefinedWorkTitle +
                        '</div><div class="listItems" style="width:33.33%; ">' + value.a.FinishedPersianDate + '</div>' + '</li>');
                    });

                } else if (WorkType == 1) {
                $("#userList").append('<li class="UItem" style="background-color: aquamarine; min-height: 9vw;" >' +
                    '<div class="listItems" style="width:20%; " >' + "ورود کار" +
                    '</div><div class="listItems" style=" width:20% "> ' + "عنوان کار" +
                    '</div><div class="listItems" style="width:20%; " >' + "شروع کار" +
                    '</div><div class="listItems" style="width:20%; " >' + "پیش‌بینی" +
                    '</div>' + '</li>');

                    $.each(returnedData.Data.WorkList, function (key, value) {
                        $("#userList").append('<li class="UItem" >' +
                            '<div class="listItems" style="width:20%;"; >' + Math.floor(value.a.InsertPersianDate / 10000) +
                            "/" + Math.floor(value.a.InsertPersianDate % 10000 / 100) +
                            "/" + Math.floor(value.a.InsertPersianDate % 100) +
                            '</div><div class="listItems" style="width:20%;"> ' + value.DefinedWorkTitle + '</div>' +
                            '<div class="listItems" style="width:20%;" >' + Math.floor(value.a.StartPersianDate / 10000) +
                            "/" + Math.floor(value.a.StartPersianDate % 10000 / 100) +
                            "/" + Math.floor(value.a.StartPersianDate % 100) +
                            '</div>' + '<div class="listItems" style="width:20%;" >' + Math.floor(value.a.HeadPredictFinishedDate / 10000) +
                            "/" + Math.floor(value.a.HeadPredictFinishedDate % 10000 / 100) +
                            "/" + Math.floor(value.a.HeadPredictFinishedDate % 100) +
                            '</div>' +
                            '<button class="finishButton" style="font-size: inherit;" onclick="openfinishtWork(\'' + value.a.Id + '\',\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle + '\')">پایان کار</button>' +
                            '</li>');
                    });

                } else if (WorkType == 0) {
                $("#userList").append('<li class="UItem" style="background-color: aquamarine; min-height: 9vw;"  >' +
                    '<div class="listItems" style="width:33.33%;" >' + "تاریخ ورود کار" +
                    '</div><div class="listItems" style="width:33.33%;"> ' + "عنوان کار" +
                    '</div><div class="listItems" style="width:33.33%;" >' + "پیش‌بینی" +
                    '</div>' + '</li>');

                    $.each(returnedData.Data.WorkList, function (key, value) {

                        $("#userList").append('<li class="UItem" onclick="openTitle(\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle + '\')">' +
                            '<div class="listItems" style="width:33.33%" >' + Math.floor(value.a.InsertPersianDate / 10000) +
                            "/" + Math.floor(value.a.InsertPersianDate % 10000 / 100) + "/" + Math.floor(value.a.InsertPersianDate % 100) +
                            '</div><div  class="listItems" style="width:33.33%;"> ' + value.DefinedWorkTitle +
                            '</div>' + '<div class="listItems" style="width:33.33%" >' + Math.floor(value.a.HeadPredictFinishedDate / 10000) +
                            "/" + Math.floor(value.a.HeadPredictFinishedDate % 10000 / 100) +
                            "/" + Math.floor(value.a.HeadPredictFinishedDate % 100) +
                            '</div>' + '<button class="startButton" onclick="openStartWork(\'' + value.a.Id + '\',\'' + value.a.WorkTitle + '\',\'' + value.ProjectTitle + '\',\'' + value.DefinedWorkTitle +'\')">شروع کار</button>' + '</li>');
                    });
                    
                }      
        }
        document.getElementById('backButton').setAttribute("onclick", 'back(' + 1 + ')');
      
        var sh = screen.height;
        var sw = screen.width;
        if ((sh < 900 && sw < 450) || (sh <= 1100 && sw <= 800)) {
           
        } else {
            redirect();
        }
        
    });

}


function openComment(comment, wTitle, pTitle, dwTitle) {
    document.getElementById("mWorkProjectTitle").innerHTML = " پروژه: " + pTitle;
    document.getElementById("mDefinedWorkTitle").innerHTML = " عنوان کار: " + dwTitle;
    if (wTitle != '') {
        document.getElementById("mWorkTitle").innerHTML = "توضیح کار: " + wTitle;
    } else {
        document.getElementById("mWorkTitle").innerHTML = "توضیح کار: " + "بدون توضیح کار فرعی از طرف مدیر";

    }
    document.getElementById("mWorkComment").innerHTML ="کامنت کاربر: " + comment;
    document.getElementById("WorkTitlePopUp").style.display = "block";
    document.getElementById("mWorkComment").style.display = "block";
}


function openTitle(wTitle, pTitle, dwTitle) {
    document.getElementById("mWorkProjectTitle").innerHTML = " پروژه: " + pTitle;
    document.getElementById("mDefinedWorkTitle").innerHTML = " عنوان کار: " + dwTitle;
    if (wTitle != '') {
        document.getElementById("mWorkTitle").innerHTML = "توضیح کار: " + wTitle;
    } else {
        document.getElementById("mWorkTitle").innerHTML = "توضیح کار: " + "بدون توضیح کار فرعی از طرف مدیر";

    }
    document.getElementById("WorkTitlePopUp").style.display = "block";

}

function openStartWork(workId, wTitle, pTitle, dwTitle) {
    document.getElementById("sWorkProjectTitle").innerHTML = " پروژه: " + pTitle;
    document.getElementById("sDefinedWorkTitle").innerHTML = " عنوان کار: " + dwTitle;
    if (wTitle != '') {
    document.getElementById("sWorkTitle").innerHTML = " توضیح کار: " + wTitle;
    } else {
        document.getElementById("sWorkTitle").innerHTML = "توضیح کار: " + "بدون توضیح کار فرعی از طرف مدیر";

    }
    document.getElementById('setStartWorkLabel').innerHTML = "شروع کار جدید";
    document.getElementById("startNewWorkPopUp").style.display = "block";
    selectedWorkForStart = workId;
    
}

function openfinishtWork(workId, wTitle, pTitle, dwTitle) {
    document.getElementById("fWorkProjectTitle").innerHTML = " پروژه: " + pTitle;
    document.getElementById("fDefinedWorkTitle").innerHTML = " عنوان کار: " + dwTitle;
    if (wTitle != '') {
        document.getElementById("fWorkTitle").innerHTML = "توضیح کار: " + wTitle;

    } else {
        document.getElementById("fWorkTitle").innerHTML = "توضیح کار: " + "بدون توضیح کار فرعی از طرف مدیر";

    }


    document.getElementById('setFinishWorkLabel').innerHTML = "پایان کار ";
    document.getElementById("finishWorkPopUp").style.display = "block";
    selectedWorkForFinish = workId;

}


function StartWork() {
  
    
        var url2 = '/TimeSheetApi/startNewWork';
        $.ajax({
            url: url2,
            type: 'POST',
            data: {
                userId: localStorage['userId'],
                workId: selectedWorkForStart,
            //    finishPredict: $("#finishPredictDateList").val(),
            },
            headers: {
                'Authorization': 'bearer' + ' ' + localStorage['StudentId'],
            },
            error: function (xhr, status, _error) {
                //console.log(error);
                console.log(status);
                console.log(xhr.status);
                if (xhr.status >= 400) {
                    alert('خطا در ارسال اطلاعات!');
                }

            }

        }).done(function (returnedData) {
            console.log(returnedData);
            if (returnedData.Data.success == 1) {

                alert(returnedData.Data.message);
                window.location.reload();

            }
        });
  
   
}

function finishWork() {

   // if ($("#finishWorkComment").val() != '') {

    var url2 = '/TimeSheetApi/finishCurrentWork';
        $.ajax({
            url: url2,
            type: 'POST',
            data: {
                userId: localStorage['userId'],
                currentWorkId: selectedWorkForFinish,
                comment: $("#finishWorkComment").val(),

            },
            headers: {
                'Authorization': 'bearer' + ' ' + localStorage['StudentId'],
            },
            error: function (xhr, status, _error) {
                //console.log(error);
                console.log(status);
                console.log(xhr.status);
                if (xhr.status >= 400) {
                    alert('خطا در ارسال اطلاعات!');
                }

            }

        }).done(function (returnedData) {
            console.log(returnedData);
            if (returnedData.Data.success == 1) {

                alert(returnedData.Data.message);
                window.location.reload();

            }
        });

    //} else {
    //    alert('لطفا توضیحات  کار خود را بنویسید! ');

    //}

}

function openInsertNewWorkForm() {

    document.getElementById('setNewWorkLabel').innerHTML = "ثبت کار جدید";


    document.getElementById("insertNewWorkPopUp").style.display = "block";

}

function insertNewWorkTitle() {

    var userId = 0;
    if (localStorage['isFromAdmin']) {
        userId = localStorage['selectedWorkTitleUserId'];

    } else {
        userId = localStorage['userId'];
    }
    if ($("#projectForAdmin").val() != 0) {
        if ($("#DefinedWorkForAdmin").val() != 0) {
        if ($("#finishPredictDateList").val() != 0) {
           /* if ($("#newWorkTitle").val() != '') {*/
                var url2 = '/TimeSheetApi/insertNewWork';
                $.ajax({
                    url: url2,
                    type: 'POST',
                    data: {
                        userId: userId,
                        isFromAdmin: localStorage['isFromAdmin'],
                        ProjectId: $("#projectForAdmin").val(),
                        DefinedWorkId: $("#DefinedWorkForAdmin").val(),
                        NewWorkTitle: $("#newWorkTitle").val(),
                        finishPredict: $("#finishPredictDateList").val(),
                    },
                    headers: {
                        'Authorization': 'bearer' + ' ' + localStorage['StudentId'],
                    },
                    error: function (xhr, status, _error) {
                        //console.log(error);
                        console.log(status);
                        console.log(xhr.status);
                        if (xhr.status >= 400) {
                            alert('خطا در ارسال اطلاعات!');
                        }

                    }

                }).done(function (returnedData) {
                    console.log(returnedData);
                    if (returnedData.Data.success == 1) {
                        if (localStorage['isFromAdmin']) {
                            alert(returnedData.Data.message);

                        } else {
                            alert(returnedData.Data.message + " لطفا منتظر تایید آن توسط مدیر بمانید تا به لیست کارهایتان افزوده شود!"); 
                        }
                        
                        window.location.reload();

                    }
                });

            //} else {
            //    alert('لطفا توضیح کار جدید کابر را بنویسید! ');

            //}
        } else {
            alert('پیش‌بینی تاریخ پایان را وارد نمایید!');
        }
    } else {
        alert('عنوان کار را انتخاب نمایید!');
        }
    } else {
        alert('پروژه را انتخاب نمایید!');
    }
            

}


function deleteWorkTitle(workId) {
    document.getElementById("WorkTitlePopUp").style.display = "none";

    var myAlert = window.confirm('آیا از حذف این کار مطمئن هستید؟');
    if (myAlert) {
        var url2 = '/TimeSheetApi/deleteWorkTitle';
        $.ajax({
            url: url2,
            type: 'POST',
            data: {

                workId: workId,


            },
            headers: {
                'Authorization': 'bearer' + ' ' + localStorage['StudentId'],
            },
            error: function (xhr, status, _error) {
                //console.log(error);
                console.log(status);
                console.log(xhr.status);
                if (xhr.status >= 400) {
                    alert('خطا در ارسال اطلاعات!');
                }

            }

        }).done(function (returnedData) {
            console.log(returnedData);
            document.getElementById("WorkTitlePopUp").style.display = "none";
            if (returnedData.Data.success == 1) {

                alert(returnedData.Data.message);
                window.location.reload();

            }
        });
    }





}
function closeNewWorkForm() {
    document.getElementById("insertNewWorkPopUp").style.display = "none";
    document.getElementById("startNewWorkPopUp").style.display = "none";
    document.getElementById("finishWorkPopUp").style.display = "none";
    document.getElementById("WorkTitlePopUp").style.display = "none";
    document.getElementById("mWorkComment").style.display = "none";
}

function back(val) {
    if (val == 1) {
        if (localStorage['isFromAdmin']) {
            window.location.href = "adminReport?id=1";
        } else {
            window.location.href = "main?id=1";
        }
       
    } else if (val == 2) {
        openUserTime();
    }


};