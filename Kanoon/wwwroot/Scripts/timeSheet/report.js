var userId = localStorage['userId'];
var FirstName = localStorage['FirstName'];
var LastName = localStorage['LastName'];
var Mobile = localStorage['Mobile'];
var Credit = localStorage['Credit'];
var GroupName = localStorage['GroupName'];
var NationalCode = localStorage['NationalCode'];

var allClockSum = 0;
var userClockSum = 0;

window.onload = function () {
	var isloggedin = localStorage['isUserLoggedIn'];
	if (isloggedin == 'T') {


	} else {
		window.location.href = "login?id=1";
	};

};

$(document).ready(function () {
    getDates();
});

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

        $.each(returnedData.Data.days, function (key, value) {

            $("#day1").append('<option value=' + Math.floor(value.PersianDate % 100) + '>' + Math.floor(value.PersianDate % 100) + '</option>');
            $("#day2").append('<option value=' + Math.floor(value.PersianDate % 100) + '>' + Math.floor(value.PersianDate % 100) + '</option>');

        });

        $.each(returnedData.Data.mounts, function (key, value) {

            $("#mount1").append('<option value=' + Math.floor(value.PersianDate % 10000 / 100) * 100 + '>' + Math.floor(value.PersianDate % 10000 / 100) + '</option>');
            $("#mount2").append('<option value=' + Math.floor(value.PersianDate % 10000 / 100) * 100 + '>' + Math.floor(value.PersianDate % 10000 / 100) + '</option>');

        });

        $.each(returnedData.Data.years, function (key, value) {

            $("#year1").append('<option value=' + Math.floor(value.PersianDate / 10000) * 10000 + '>' + Math.floor(value.PersianDate / 10000) + '</option>');
            $("#year2").append('<option value=' + Math.floor(value.PersianDate / 10000) * 10000 + '>' + Math.floor(value.PersianDate / 10000) + '</option>');

        });


        if (returnedData.Data.days.length == 1) {

            document.getElementById("day1").selectedIndex = String(0);
            document.getElementById("day2").selectedIndex = String(0);
            document.getElementById("mount1").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 10000 / 100));
            document.getElementById("mount2").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 10000 / 100));
            document.getElementById("year2").selectedIndex = String(0);
            document.getElementById("year2").selectedIndex = String(0);

        } else {

            console.log(returnedData.Data.TodayPersianDate);
            console.log(Math.floor(returnedData.Data.TodayPersianDate % 10000 / 100))
            document.getElementById("day1").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 100) - 1);
            document.getElementById("day2").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 100) - 1);
            document.getElementById("mount1").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 10000 / 100)-1);
            document.getElementById("mount2").selectedIndex = String(Math.floor(returnedData.Data.TodayPersianDate % 10000 / 100)-1);
            document.getElementById("year1").selectedIndex = String(0);
            document.getElementById("year2").selectedIndex = String(0);

        }
        openUserTime();

    });
}

function openUserTime() {

    var url2 = '/timeSheetApi/getUserDayTimes';
    $.ajax({
        url: url2,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
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
        
        document.getElementById('mainTitle').innerHTML = localStorage['Name'];
        console.log(returnedData);
        $("#userList").empty();
        userClockSum = 0;
        $("#userList").append('<li class="UItem" >' + '<div class="listItems" style="text-align:right" >' + "تاریخ" + '</div><div class="listItems"> ' + "ساعت" + '</div>' + '</li>');

        $.each(returnedData.Data.userDates, function (key, value) {
            var totMinutes = value.TotalMinutes - (Math.floor(value.TotalMinutes / 60) * 60);

            $("#userList").append('<li class="UItem" onclick="openUserTimeofDay('+ value.PersianDate +')">' + '<div class="listItems" style="text-align:right" >' + Math.floor(value.PersianDate / 10000) + "/" + Math.floor(value.PersianDate % 10000 / 100) + "/" + Math.floor(value.PersianDate % 100) + '</div><div class="listItems"> ' + Math.floor(value.TotalMinutes / 60) + ':' + totMinutes + '</div>' + '</li>');
            //onclick="openUserTimeofDay(\'' + id + '\',\'' + value + '\',\'' + name + '\',\'' + family + '\')"
            // j++;
            userClockSum = userClockSum + value.TotalMinutes;

        });
        var AllMinutes = userClockSum - (Math.floor(userClockSum / 60) * 60);

        $("#userList").append('<li class="UItem" style="background-color: aquamarine; font-weight: 700;"><div  style="text-align:center">' + "مجموع ساعات: " + Math.floor(userClockSum / 60) + ':' + AllMinutes + '</div></li>');

        document.getElementById('backButton').setAttribute("onclick", 'back(' + 1 + ')');
        //document.getElementById('backButton').style.display = "block";

    });

}

function openUserTimeofDay( persianDate) {
    var url2 = '/timeSheetApi/getUserTimesofDay';
    $.ajax({
        url: url2,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
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
        document.getElementById('mainTitle').innerHTML = localStorage['Name'] + ' تاریخ:' + Math.floor(persianDate / 10000) + "/" + Math.floor(persianDate % 10000 / 100) + "/" + Math.floor(persianDate % 100);
        console.log(returnedData);
        $("#userList").empty();
        $.each(returnedData.Data.times, function (key, value) {
            var totMinutes = value.totalMinuetsWorked - (Math.floor(value.totalMinuetsWorked / 60) * 60);

            $("#userList").append('<li class="UItem" ><div> ' + "مدت زمان کار: " + Math.floor(value.totalMinuetsWorked / 60) + ':' + totMinutes + " ساعت" + '</div> <div> ' + "توضیحات: " + value.StartWorkDescription + " و " + value.EndWorkDescription + '</div></li>');

            // j++;
        });
        document.getElementById('backButton').setAttribute("onclick", 'back(' + 2  + ')');
        //document.getElementById('backButton').style.display = "block";
    });
}

function back(val) {
    if (val == 1) {
        window.location.href = "main?id=1";
    } else if (val == 2) {
        openUserTime();
    }


};