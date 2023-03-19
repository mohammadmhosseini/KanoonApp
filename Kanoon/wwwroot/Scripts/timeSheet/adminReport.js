var counter = localStorage['Counter'];
var userId = localStorage['userId'];
var FirstName = localStorage['FirstName'];
var LastName = localStorage['LastName'];
var Mobile = localStorage['Mobile'];
var Credit = localStorage['Credit'];
var GroupName = localStorage['GroupName'];
var NationalCode = localStorage['NationalCode'];
var rId = localStorage['rId'];
var wbCount = 0;
var burl = '';
var purl = '';
var factorId = 0;
var TK= localStorage['Token'];
var RTK = localStorage['RefreshToken'];
var frameFlag = 0;
var isFinished = true;
var lastDuration = 0;
var lastStartTime = 0;
var nowTime = 0;

var allClockSum = 0;
var userClockSum = 0;

var userRid = 0
var userOfficeCode=0

var WorkType = 0;
var selectedWorkTitleUserName = '';
var selectedWorkTitleUserId = '';




window.onload = function () {
    var sh = screen.height;
    var sw = screen.width;

    if (sh < 950 && sw < 550) {
        window.setTimeout("redirect()", 3000)
    } else {

        redirect()
    }
}

function redirect() {
    var sh = screen.height;
    var sw = screen.width;

    if ((sh < 950 && sw < 550) || (sh <= 1100 && sw <= 800)) {


    } else {
        var x = document.getElementsByClassName('dateSelect');

        var i;

        for (i = 0; i < x.length; i++) {
            x[i].style.width = "4vw";
            x[i].style.height = "3vw";
            x[i].style.minWidth = "4vw";
            x[i].style.fontSize = "1vw";
            x[i].style.borderRadius  = "1vw";
        }

        //var y = document.getElementsByClassName('form-wrapper');
        //var j;
        //for (j = 0; j < y.length; j++) {
        //    y[j].style.maxWidth = "60vw";
        //}

        
        var z = document.getElementsByClassName('UItem');
        var k;
        for (k = 0; k < z.length; k++) {
            z[k].style.minHeight = "4vw";
            z[k].style.fontSize = "1.5vw"; 
            z[k].style.padding = "1vw";
            z[k].style.margin = "0.4vw";
        }
        
        var a = document.getElementsByClassName('listItems');
        var m;
        for (m = 0; m < a.length; m++) {
           /* a[m].style.width = "12vw";*/
            //a[m].style.minWidth = "12vw";
            a[m].style.fontSize = "1.5vw";
        }

        var b = document.getElementsByClassName('dateTitle');
        var n;
        for (n = 0; n < b.length; n++) {
            b[n].style.width = "12vw";
            b[n].style.minWidth = "12vw";
            b[n].style.fontSize = "1.5vw";
        }

        var c = document.getElementById('dateContainer');

        c.style.maxWidth = "60vw";
        c.style.margin = "auto";

        var d = document.getElementsByClassName('menuList');
        var t;
        for (t = 0; t < d.length; t++) {
            d[t].style.fontSize = "1.5vw";
            d[t].style.fontSize = "1.5vw";
        }

        var e = document.getElementsByClassName('menuli');

        var r;
        for (r = 0; r < e.length; r++) {
            e[r].style.padding = "0.5vw";

        }

        document.getElementById('navbar').style.padding = "0.1vw 1vw";
        document.getElementById('mainTitle').style.fontSize = "1.7vw";
        document.getElementsByClassName('menuIcon')[0].style.width = "2vw";
        document.getElementsByClassName('menuIcon')[0].style.height = "2vw";
        document.getElementsByClassName('rightSlidebar')[0].style.width = "22vw";
        document.getElementsByClassName('overlay')[0].style.top = "4vw";
        document.getElementsByClassName('menuUserPic')[0].style.width = "5vw";
        document.getElementsByClassName('menuUserPic')[0].style.height = "5vw";
        document.getElementsByClassName('userName')[0].style.fontSize = "1.5vw";
        document.getElementsByClassName('userName')[0].style.margin = "1.5vw";
        document.getElementsByClassName('userData')[0].style.padding = "1vw";
        document.getElementById('backButton').style.fontSize = "2vw";
        //document.getElementById('allWorks').style.fontSize = "1vw";
        
    }
    return
}



function back(val, userId, name, family) {
    if (val == 1) {
        document.getElementById('backButton').style.display = "none";
        window.location.reload();
    } else if (val == 2) {
        openUserTime(userId, name, family);
    } else if (val == 3) {
        document.getElementById('backButton').style.display = "none";
        window.location.reload();
    } else if (val == 4) {
        document.getElementById('workTitleTop').style.display = "none";
        document.getElementById('dateContainer').style.display = "none";
        getWorkTitleUsers();
    }
	

};

function exit() {
   
    localStorage.clear();
    localStorage.setItem('setHomeScreen', 'set');
    localStorage.setItem('isUserLoggedIn', 'F');
    localStorage.setItem('IsV', 'true');
    window.location.href = "login?id=6";

};



$(document).ready(function () {
    window.onresize = redirect;
   // window.addEventListener('resize', redirect);
    if (localStorage['isUserLoggedIn'] != 'T') {
        window.location.href = "login?id=4";

    }else {

    document.getElementById('name').innerHTML = localStorage['Name'];
    $('.menuIcon').on('click', function (_event) {

        $('.overlay').toggleClass('show');
    });
      
    $('.overlay').on('click', function (_event) {

        $('.overlay').toggleClass('show');
    });
         

        if ((localStorage['rId'] == 1 || localStorage['rId'] == 111 || localStorage['rId'] == 99) && localStorage['isFromWorkTitle'] != 1) {
            document.getElementById('dateContainer').style.display = "block";
            document.getElementById('DateButton1').style.display = "block";
            getDates();
        } else if (localStorage['rId'] == 31) {
            document.getElementById('dateContainer').style.display = "none";
            document.getElementById('DateButton2').style.display = "block";
            getCategoryList();
        } else if ((localStorage['rId'] == 1 || localStorage['rId'] == 111 || localStorage['rId'] == 99) && localStorage['isFromWorkTitle'] == 1) {
            
            document.getElementById('workTitleTop').style.display = "none";
            document.getElementById('dateContainer').style.display = "none";
            localStorage.setItem('isFromWorkTitle', 0);
            getWorkTitleUsers();
        }

    }

});

function getDates() {
    document.getElementById('loading').style.display = "block";

    var url1 = "/timeSheetApi/getPersianDates";
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
        },


        error: function (xhr, _status, _error) {
            document.getElementById('loading').style.display = "none";

            if (xhr.status >= 400) {
                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {
        document.getElementById('loading').style.display = "none";

        console.log(returnedData);

        $("#day1").empty();
        $("#day2").empty();
        $("#year1").empty();
        $("#year2").empty();
        $("#mount1").empty();
        $("#mount2").empty();

        $.each(returnedData.Data.days, function (key, value) {
         
            $("#day1").append('<option value=' + Math.floor(value.PersianDate % 100) + '>' + Math.floor(value.PersianDate%100) + '</option>');
            $("#day2").append('<option value=' + Math.floor(value.PersianDate % 100) + '>' + Math.floor(value.PersianDate % 100) + '</option>');

        });
        
        $.each(returnedData.Data.mounts, function (key, value) {

            $("#mount1").append('<option value=' + Math.floor(value.PersianDate % 10000 / 100) * 100 + '>' + Math.floor(value.PersianDate % 10000 / 100) + '</option>');
            $("#mount2").append('<option value=' + Math.floor(value.PersianDate % 10000 / 100) * 100 + '>' + Math.floor(value.PersianDate % 10000 / 100) + '</option>');

        });

        $.each(returnedData.Data.years, function (key, value) {

            $("#year1").append('<option value=' + Math.floor(value.PersianDate / 10000)*10000 + '>' + Math.floor(value.PersianDate / 10000) + '</option>');
            $("#year2").append('<option value=' + Math.floor(value.PersianDate / 10000)*10000 + '>' + Math.floor(value.PersianDate / 10000) + '</option>');

        });
      
        if (returnedData.Data.days.length == 1) {

            document.getElementById("day1").selectedIndex = String(0);
            document.getElementById("day2").selectedIndex = String(0);
            document.getElementById("mount1").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 10000 / 100) - 1);
            document.getElementById("mount2").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 10000 / 100) - 1);
            document.getElementById("year1").selectedIndex = String(0);
            document.getElementById("year2").selectedIndex = String(0);

        } else {

            document.getElementById("day1").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 100) - 1);
            document.getElementById("day2").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 100) - 1);
            document.getElementById("mount1").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 10000 / 100) - 1);
            document.getElementById("mount2").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 10000 / 100) - 1);
            document.getElementById("year1").selectedIndex = String(0);
            document.getElementById("year2").selectedIndex = String(0);
        }
        getUsers1();

    });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function getUsers1() {
    document.getElementById('loading').style.display = "block";

    var url1 = "/timeSheetApi/getUsers";
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
            FromPDate: (Number($("#year1").val()) + Number($("#mount1").val()) + Number($("#day1").val())),
            ToPDate: (Number($("#year2").val()) + Number($("#mount2").val()) + Number($("#day2").val()))
        },


        error: function (xhr, _status, _error) {
            document.getElementById('loading').style.display = "none";

            if (xhr.status >= 400) {
                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {
        document.getElementById('loading').style.display = "none";

        console.log(returnedData);

        $("#userList").empty();
        allClockSum = 0
        var allAmount = 0;
        var lastAllAmount=0
        var j = 0;
        $("#userList").append('<li class="UItem">' +
            '<div class="listItems" style="width: 18.28%">' + "نام و نام خانوادگی" +
            '</div><div class="listItems" style="width: 26.28%">' + "عنوان کار فعلی‌" +
            '</div><div class="listItems" style="width: 10.28%">' + " تعداد روز" +
            '</div><div class="listItems" style="width: 12.28%">' + "ساعت کاری" +
            '</div><div class="listItems" style="width: 12.28%">' + "حق‌الزحمه" +
            '</div><div class="listItems" style="width: 10.28%">' + 'وضعیت' +
            '</div><div class="listItems" style="width: 10.28%">' + " محدودیت ‌" +
            '</div>' + '</li>');

        $.each(returnedData.Data.userList, function (key, value) {
            var isActiveText = '';
            var textColor = ''
            if (value.isActive == 1) {
                isActiveText = 'فعال';
                textColor = 'green';
            } else {
                isActiveText = 'غیرفعال';
                textColor = 'red';
            }
            console.log(value.TotalMinutes - (Math.floor(value.TotalMinutes / 60) * 60));
            var totMinutes = value.TotalMinutes - (Math.floor(value.TotalMinutes / 60) * 60);
            $("#userList").append('<li class="UItem" onclick="openUserTime(\'' + value.UserId + '\',\'' + value.Name + '\',\'' + value.Family + '\')" >' +
                '<div class="listItems" style="width: 18.28%" >' + value.Name + ' ' + value.Family +
                '</div><div class="listItems" style="width: 26.28%" >' + value.DefinedWorkTitle +
                '</div><div class="listItems" style="width: 10.28%" >' + value.DayCount +
                '</div><div class="listItems" style="width: 12.28%" >' + Math.floor(value.TotalMinutes / 60) + ':' + totMinutes +
                '</div><div class="listItems" style="width: 12.28%" >' + numberWithCommas(value.TotalAmount) +
                '</div><div class="listItems" style="width: 10.28%"><span id="state' + j + '" style="color:red">' + "آفلاین" + '</span>' +
                '</div><div class="listItems" style="width: 10.28%">' + '<button style="font-size: inherit; color:' + textColor + '" >' + isActiveText + '</button>' +
                '</div>' + '</li>');
            allClockSum = allClockSum + value.TotalMinutes;
            allAmount = allAmount + value.TotalAmount ;
            var i = 0;
            for (i = 0; i < returnedData.Data.onlineUsers.length; i++) {
                if (value.UserId == returnedData.Data.onlineUsers[i].Id) {
                    document.getElementById("state" + j).innerHTML = "آنلاین";
                    document.getElementById("state" + j).style.color = "green";
                }
            }

            j++;
        });

        var k = 0;
        for (k = 0; k < returnedData.Data.lastMountUserList.length; k++) {
            lastAllAmount = lastAllAmount + returnedData.Data.lastMountUserList[k].TotalAmount;
        }
        var AllMinutes = allClockSum - (Math.floor(allClockSum / 60) * 60);

        $("#userList").append('<li class="UItem"  style="background-color: aquamarine; font-weight: 700;"><div  style="text-align:center">' + "مجموع ساعات: " + Math.floor(allClockSum / 60) + ':' + AllMinutes + '</div><div  style="text-align:center">' + "مجموع حق‌الزحمه: " + numberWithCommas(allAmount) + '</div><div  style="text-align:center">' + "مجموع حق‌الزحمه ماه گذشته: " + numberWithCommas(lastAllAmount)+ '</div></li>');

        var sh = screen.height;
        var sw = screen.width;
        if ((sh < 900 && sw < 450) || (sh <= 1100 && sw <= 800)) {

        } else {
            redirect();
        }
    });
}




//azmoun group

function getCategoryList() {
    var url1 = "/timeSheetApi/getCategory";
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

        $("#userList").empty();

        var j = 0;
        $("#userList").append('<li class="UItem" style="background-color: aquamarine; font-weight: 700;">' + '<div class="listItems" style="text-align:center;  width:100%; font-size:3vw; ">' + "گروه" + '</div>' + '</li>');

        $.each(returnedData.Data.categoryList, function (key, value) {
            //console.log(value.TotalMinutes - (Math.floor(value.TotalMinutes / 60) * 60));
            //var totMinutes = value.TotalMinutes - (Math.floor(value.TotalMinutes / 60) * 60);
            $("#userList").append('<li class="UItem" onclick="getDates2(\'' + value.RoleId + '\',\'' + value.OfficeName + '\')">' + '<div class="listItems" style="text-align:center;  width:100%; font-size:3vw;">' + value.OfficeName + '</div></li>');

            //allClockSum = allClockSum + value.TotalMinutes;
            //var i = 0;
            //for (i = 0; i < returnedData.Data.onlineUsers.length; i++) {
            //    if (value.UserId == returnedData.Data.onlineUsers[i].Id) {
            //        document.getElementById("state" + j).innerHTML = "آنلاین";
            //        document.getElementById("state" + j).style.color = "green";
            //    }
            //}
            j++;
        });

        //var AllMinutes = allClockSum - (Math.floor(allClockSum / 60) * 60);

        //$("#userList").append('<li class="UItem"  style="background-color: aquamarine; font-weight: 700;"><div  style="text-align:center">' + "مجموع ساعات: " + Math.floor(allClockSum / 60) + ':' + AllMinutes + '</div></li>');

        // document.getElementById('backButton').style.display = "block";
        //document.getElementById('users').style.display = "block";
        redirect();
    });
}

function getDates2(roleId, officeName) {
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

        $.each(returnedData.Data.days, function (key, value) {

            $("#day1").append('<option value=' + Math.floor(value.PersianDate % 100) + '>' + Math.floor(value.PersianDate % 100) + '</option>');
            $("#day2").append('<option value=' + Math.floor(value.PersianDate % 100) + '>' + Math.floor(value.PersianDate % 100) + '</option>');

        });
        document.getElementById("day1").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 100) - 1);
        document.getElementById("day2").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 100) - 1);

        $.each(returnedData.Data.mounts, function (key, value) {

            $("#mount1").append('<option value=' + Math.floor(value.PersianDate % 10000 / 100) * 100 + '>' + Math.floor(value.PersianDate % 10000 / 100) + '</option>');
            $("#mount2").append('<option value=' + Math.floor(value.PersianDate % 10000 / 100) * 100 + '>' + Math.floor(value.PersianDate % 10000 / 100) + '</option>');

        });

        $.each(returnedData.Data.years, function (key, value) {

            $("#year1").append('<option value=' + Math.floor(value.PersianDate / 10000) * 10000 + '>' + Math.floor(value.PersianDate / 10000) + '</option>');
            $("#year2").append('<option value=' + Math.floor(value.PersianDate / 10000) * 10000 + '>' + Math.floor(value.PersianDate / 10000) + '</option>');

        });

        document.getElementById('dateContainer').style.display = "block";

        userRid = roleId;
        userOfficeCode = officeName;
        getUsers2();

    });
}

function getUsers2() {




    var url1 = "/timeSheetApi/getUsers2";
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
            userRoleId: userRid,
            FromPDate: (Number($("#year1").val()) + Number($("#mount1").val()) + Number($("#day1").val())),
            ToPDate: (Number($("#year2").val()) + Number($("#mount2").val()) + Number($("#day2").val()))
        },


        error: function (xhr, _status, _error) {

            if (xhr.status >= 400) {
                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {

        console.log(returnedData);
        document.getElementById('mainTitle').innerHTML = userOfficeCode;
        document.getElementById('users').style.maxWidth = "85vw";
        $("#userList").empty();
        allClockSum=0
        var j = 0;
        $("#userList").append('<li class="UItem">' + '<div class="listItems" style="text-align:right">' + "نام و نام خانوادگی" + '</div><div class="listItems" >' + "سمت" + '</div> <div class="listItems" >' + " تعداد روز" + '</div><div class="listItems">' + "ساعت کاری" + '</div><div style="float:left">' + 'وضعیت' + '</div>' + '</li>');

        $.each(returnedData.Data.userList, function (key, value) {
            console.log(value.TotalMinutes - (Math.floor(value.TotalMinutes / 60) * 60));
            var totMinutes = value.TotalMinutes - (Math.floor(value.TotalMinutes / 60) * 60);
            $("#userList").append('<li class="UItem" onclick="openUserTime(\'' + value.UserId + '\',\'' + value.Name + '\',\'' + value.Family + '\')">' + '<div class="listItems" style="text-align:right">' + value.Name + ' ' + value.Family + '</div><div class="listItems" style="height:6vw; font-size: 1.85vw;">' + value.GroupName + '</div><div class="listItems" >' + value.DayCount + '</div><div class="listItems">' + Math.floor(value.TotalMinutes / 60) + ':' + totMinutes + '</div><div style="float:left"><span id="state' + j + '" style="color:red">' + "آفلاین" + '</span>' + '</div>' + '</li>');

            allClockSum = allClockSum + value.TotalMinutes;
            var i = 0;
            for (i = 0; i < returnedData.Data.onlineUsers.length; i++) {
                if (value.UserId == returnedData.Data.onlineUsers[i].Id) {
                    document.getElementById("state" + j).innerHTML = "آنلاین";
                    document.getElementById("state" + j).style.color = "green";
                }
            }
            j++;
        });

        var AllMinutes = allClockSum - (Math.floor(allClockSum / 60) * 60);

        $("#userList").append('<li class="UItem"  style="background-color: aquamarine; font-weight: 700;"><div  style="text-align:center">' + "مجموع ساعات: " + Math.floor(allClockSum / 60) + ':' + AllMinutes + '</div></li>');


        document.getElementById('backButton').setAttribute("onclick", 'back(\'' + 3 + '\',\'' + 0 + '\',\'' + 0 + '\',\'' + 0 + '\')');
        document.getElementById('backButton').style.display = "block";
        // document.getElementById('backButton').style.display = "block";
        //document.getElementById('users').style.display = "block";
        redirect();
    });
}

//end of azmoun group

function openUserTime(id,name, family) {
    var url2 = '/timeSheetApi/getUserDayTimes';
    $.ajax({
        url: url2,
        type: 'POST',
        data: {
            userId: id,
            FromPDate: (Number($("#year1").val()) + Number($("#mount1").val()) + Number($("#day1").val())),
            ToPDate: (Number($("#year2").val()) + Number($("#mount2").val()) + Number($("#day2").val()))
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
        document.getElementById('mainTitle').innerHTML = name + ' ' + family;
        console.log(returnedData);
        $("#userList").empty();
        userClockSum = 0;
        $("#userList").append('<li class="UItem" >' + '<div class="listItems" style="text-align:right" >' + "تاریخ" + '</div><div class="listItems"> ' + "ساعت" + '</div>' + '</li>');

        $.each(returnedData.Data.userDates, function (key, value) {
            var totMinutes = value.TotalMinutes - (Math.floor(value.TotalMinutes / 60) * 60);

            $("#userList").append('<li class="UItem" onclick="openUserTimeofDay(\'' + id + '\',\'' + value.PersianDate + '\',\'' + name + '\',\'' + family + '\')">' + '<div class="listItems" style="text-align:right" >' + Math.floor(value.PersianDate / 10000) + "/" + Math.floor(value.PersianDate % 10000 / 100) + "/" + Math.floor(value.PersianDate % 100) + '</div><div class="listItems"> ' + Math.floor(value.TotalMinutes / 60) + ':' + totMinutes + '</div>' + '</li>');
            //onclick="openUserTimeofDay(\'' + id + '\',\'' + value + '\',\'' + name + '\',\'' + family + '\')"
            // j++;
            userClockSum = userClockSum + value.TotalMinutes;

        });
        var AllMinutes = userClockSum - (Math.floor(userClockSum / 60) * 60);

        $("#userList").append('<li class="UItem" style="background-color: aquamarine; font-weight: 700;"><div  style="text-align:center">' + "مجموع ساعات: " + Math.floor(userClockSum / 60) + ':' + AllMinutes + '</div></li>');

        document.getElementById('backButton').setAttribute("onclick", 'back(\'' + 1 + '\',\'' + id + '\',\'' + name + '\',\'' + family +'\')');
        document.getElementById('backButton').style.display = "block";
        redirect();
    });

}

function openUserTimeofDay(id, persianDate,name , family) {
    var url2 = '/timeSheetApi/getUserTimesofDay';
    $.ajax({
        url: url2,
        type: 'POST',
        data: {
            userId: id,
            persianDate: persianDate,
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
        document.getElementById('mainTitle').innerHTML = name + ' ' + family + ' تاریخ:' + Math.floor(persianDate / 10000) + "/" + Math.floor(persianDate % 10000 / 100) + "/" + Math.floor(persianDate % 100);
        console.log(returnedData);
        $("#userList").empty();
        $.each(returnedData.Data.times, function (key, value) {
            var totMinutes = value.totalMinuetsWorked - (Math.floor(value.totalMinuetsWorked / 60) * 60);

            $("#userList").append('<li class="UItem" ><div> ' + "مدت زمان کار: " + Math.floor(value.totalMinuetsWorked / 60) + ':' + totMinutes + " ساعت" + '</div> <div> ' + "توضیحات: " + value.StartWorkDescription + " و " + value.EndWorkDescription + '</div></li>');

            // j++;
        });
        document.getElementById('backButton').setAttribute("onclick", 'back(\'' + 2 + '\',\'' + id + '\',\'' + name + '\',\'' + family + '\')');
        document.getElementById('backButton').style.display = "block";
        redirect();
    });
}

function startTime() {
    var lastStart = new Date(lastStartTime);
    var today = new Date();
    //console.log(lastDuration)
    //console.log(lastStart);
    //console.log(today);
    var difference = today - lastStart;
    var diff_result = new Date(lastDuration);
    //console.log(diff_result);
    var h = diff_result.getHours() ;
    var m = diff_result.getMinutes();
    var s = diff_result.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('duration').innerHTML =
        h + ":" + m + ":" + s;
    var t = setTimeout(startTime, 500);
}

function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}

// menu functions


//dialog js	
function CustomAlert() {
	this.render = function (dialog) {
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
		var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
		dialogoverlay.style.height = winH + "px";
		dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
		dialogbox.style.top = "100px";
		dialogbox.style.display = "block";
		document.getElementById('dialogboxhead').innerHTML = "Acknowledge This Message";
		document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Alert.ok()">OK</button>';
	}
	this.ok = function () {
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var Alert = new CustomAlert();
function CustomConfirm() {
	this.render = function (dialog, op, id) {
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
		var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
		dialogoverlay.style.height = winH + "px";
		dialogbox.style.left = (winW / 2) - (550 * .5) + "px";
		dialogbox.style.top = "100px";
		dialogbox.style.display = "block";

		document.getElementById('dialogboxhead').innerHTML = "Confirm that action";
		document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxfoot').innerHTML = '<button onclick="Confirm.yes(\'' + op + '\',\'' + id + '\')">Yes</button> <button onclick="Confirm.no()">No</button>';
	}
	this.no = function () {
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.yes = function (op, id) {
		if (op == "delete_post") {
			deletePost(id);
		}
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var Confirm = new CustomConfirm();
function CustomPrompt1() {
	this.render = function (dialog, func) {
		var winW = window.innerWidth;
		var winH = window.innerHeight;
		var dialogoverlay = document.getElementById('dialogoverlay');
		var dialogbox = document.getElementById('dialogbox');
		dialogoverlay.style.display = "block";
		dialogoverlay.style.height = winH + "px";
		dialogoverlay.style.width = winW + "px";
		dialogbox.style.left = (winW / 2) - (750 * .5) + "px";
		dialogbox.style.top = "500px";
		dialogbox.style.display = "block";
		document.getElementById('dialogboxhead').innerHTML = "افزایش اعتبار (تومان):";
		document.getElementById('dialogboxbody').innerHTML = dialog;
		document.getElementById('dialogboxbody').innerHTML += '<br><input id="prompt_value1"  style="margin-top: 30px; width: 100%; height: 70px; font-size:30px;">';
		document.getElementById('dialogboxfoot').innerHTML = '<button style="padding:20px; margin-left:20px;" onclick="Prompt1.ok(\'' + func + '\')">تایید</button> <button onclick="Prompt1.cancel()">انصراف</button>';
	}
	this.cancel = function () {
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
	this.ok = function (func) {
		var prompt_value1 = document.getElementById('prompt_value1').value;
		window[func](prompt_value1);
		document.getElementById('dialogbox').style.display = "none";
		document.getElementById('dialogoverlay').style.display = "none";
	}
}
var Prompt1 = new CustomPrompt1();

//end of dialog js


// credit list
function openClist() {
	window.location.href = "creditList?id=3"
}

function openPayroll() {
    window.location.href = "insertUsersPayroll?id=1"
}

//end of menu functions	

//popup workbook functions

//wb for onlinetest corona

//end of wb for onlinetest corona

//end of popup workbook functions		

//work title list

function getWorkTitleUsers() {
    document.getElementById('dateContainer').style.display = "none";
    document.getElementById('menoIcon').style.display = "none";

    var url1 = "/timeSheetApi/getUsersOfWorkTitle";
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

        $("#userList").empty();
        allClockSum = 0
        var j = 0;
        var li = document.createElement("li");
        $("#userList").append('<li class="UItem">' + '<div class="workListItems" >' + "نام و نام خانوادگی" + '</div>' + '</li>');

        $.each(returnedData.Data.userList, function (key, value) {
            $("#userList").append('<li class="UItem"  onclick="setUserWorkTitles(\'' + value.Id + '\',\'' + value.Name + '\',\'' + value.Family + '\')">' + '<div class="workListItems" >' + value.Name + ' ' + value.Family + '</div>' + '</li>');

           
        });
        document.getElementById('mainTitle').innerHTML = 'لیست کارهای کاربران';


        //$("#userList").append('<li class="UItem"  style="background-color: aquamarine; font-weight: 700;"><div  style="text-align:center">' + "مجموع ساعات: " + Math.floor(allClockSum / 60) + ':' + AllMinutes + '</div></li>');
        
        // document.getElementById('backButton').style.display = "block";
        //document.getElementById('users').style.display = "block";

        document.getElementById('backButton').setAttribute("onclick", 'back(\'' + 3 + '\',\'' + 0 + '\',\'' + 0 + '\',\'' + 0 + '\')');
        document.getElementById('backButton').style.display = "block";
        redirect();
    });


}

function getAllUsersWorks() {
    document.getElementById('dateContainer').style.display = "none";
    document.getElementById('menoIcon').style.display = "none";

    var url1 = "/timeSheetApi/getUsersOfWorkTitle";
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            userId: 0,

        },


        error: function (xhr, _status, _error) {

            if (xhr.status >= 400) {
                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {

        console.log(returnedData);

        $("#userList").empty();
        allClockSum = 0
        var j = 0;
        var li = document.createElement("li");
        $("#userList").append('<li class="UItem">' + '<div class="workListItems" >' + "نام و نام خانوادگی" + '</div>' + '</li>');

        $.each(returnedData.Data.userList, function (key, value) {
            $("#userList").append('<li class="UItem"  onclick="setUserWorkTitles(\'' + value.Id + '\',\'' + value.Name + '\',\'' + value.Family + '\')">' + '<div class="workListItems" >' + value.Name + ' ' + value.Family + '</div>' + '</li>');


        });
        document.getElementById('mainTitle').innerHTML = 'لیست کارهای کاربران';


        //$("#userList").append('<li class="UItem"  style="background-color: aquamarine; font-weight: 700;"><div  style="text-align:center">' + "مجموع ساعات: " + Math.floor(allClockSum / 60) + ':' + AllMinutes + '</div></li>');

        // document.getElementById('backButton').style.display = "block";
        //document.getElementById('users').style.display = "block";

        document.getElementById('backButton').setAttribute("onclick", 'back(\'' + 3 + '\',\'' + 0 + '\',\'' + 0 + '\',\'' + 0 + '\')');
        document.getElementById('backButton').style.display = "block";
        redirect();
    });


}



function setUserWorkTitles(id, name, family) {
    selectedWorkTitleUserName = name + ' ' + family;
    selectedWorkTitleUserId = id;
    localStorage.setItem("selectedWorkTitleUserId", selectedWorkTitleUserId);
    localStorage.setItem("isFromAdmin", true);

    window.location.href = "userWorkList";
  
}

function setAllUsersWorkTitles() {
   
    localStorage.setItem("selectedWorkTitleUserId", 0);
    localStorage.setItem("isFromAdmin", true);
    
    window.location.href = "userWorkList";
 
}

//end of work title list

function getProjects() {
    window.location.href = "projectList?id=1";

}

function getDefinedWorks() {
    window.location.href = "definedWorkList?id=1";

}

function getUserVerifyWorks() {
    window.location.href = "usersVerifyWorksList?id=1";

}

//stopwatch



 






