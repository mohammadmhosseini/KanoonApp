var userId = localStorage['userId'];


var selectedWorkForStart = 0;
var selectedWorkForFinish = 0;
var editProjectTitleId = 0;
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
        
        for (var m = 0; m < a.length; m++) {
            a[m].style.width = "12vw";
            a[m].style.minWidth = "12vw";
            a[m].style.fontSize = "1.5vw";
        }
        var a0 = document.getElementsByClassName('listItems0');

        for (var m = 0; m < a0.length; m++) {
            a0[m].style.width = "45vw";
            a0[m].style.minWidth = "45vw";
            a0[m].style.fontSize = "1.5vw";
        }


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
     //   document.getElementById('userList').style.width = "65vw";
 


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
    getProjectsList()
   /* localStorage.setItem('isFromWorkTitle',0);*/
 
            document.getElementById('menoIcon').style.display = "block";
          
   
    
});


function getProjectsList() {
    //document.getElementById('dateContainer').style.display = "none";
    document.getElementById('menoIcon').style.display = "none";

    var url1 = "/timeSheetApi/getProjectList";
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            HeadRoleId: 1,

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
        $("#userList").append('<li class="UItem">' + '<div class="workListItems" >' + "عنوان پروژه‌" + '</div>' + '<div class="workListItems" >' + "ویرایش‌" + '</div>' + '<div class="workListItems" >' + "وضعیت‌" + '</div>'  + '</li>');

        $.each(returnedData.Data.projectList, function (key, value) {
            if (value.IsActive == true) {
                $("#userList").append('<li class="ActiveItem" >' + '<div class="workListItems"  style="color:black">' + value.ProjectTitle + '</div>' + '<div class="workListItems" onclick="openEditProjectTitleForm(' + value.Id + ')">' + 'ویرایش عنوان پروژه' + '</div>' + '<div class="workListItems" onclick="ActiveDeactiveProject(' + value.Id + ')" >' + 'فعال' + '</div>'  + '</li>');

            } else {
                $("#userList").append('<li class="DeactiveItem" >' + '<div class="workListItems"  style="color:black">' + value.ProjectTitle + '</div>' + '<div class="workListItems" onclick="openEditProjectTitleForm(' + value.Id + ')">' + 'ویرایش عنوان پروژه' + '</div>' + '<div class="workListItems" onclick="ActiveDeactiveProject(' + value.Id + ')" >' + 'غیر فعال' + '</div>' + '</li>');

            }
        });
        document.getElementById('mainTitle').innerHTML = 'لیست پروژه‌ها';


        //$("#userList").append('<li class="UItem"  style="background-color: aquamarine; font-weight: 700;"><div  style="text-align:center">' + "مجموع ساعات: " + Math.floor(allClockSum / 60) + ':' + AllMinutes + '</div></li>');

        // document.getElementById('backButton').style.display = "block";
        //document.getElementById('users').style.display = "block";

        //document.getElementById('backButton').style.display = "block";
        redirect();
    });


}

function ActiveDeactiveProject(projectId) {
    var r = confirm("آیا میخواهید وضعیت پروژه را تغییر دهید؟");
    if (r == true) {
        var url1 = "/timeSheetApi/ActiveDeactiveProject";
        $.ajax({
            url: url1,
            type: 'POST',
            data: {
                projectId: projectId,

            },

            error: function (xhr, _status, _error) {

                if (xhr.status >= 400) {
                    alert('خطا در دریافت اطلاعات');
                }

            }

        }).done(function (returnedData) {
            alert(returnedData.Data.Message);
            window.location.reload();
        });
    } else {
        txt = "You pressed Cancel!";
    }

}

function openEditProjectTitleForm(id) {

    document.getElementById('setEditProjectLabel').innerHTML = "ویرایش عنوان پروژه";


    document.getElementById("EditProjectTitlePopUp").style.display = "block";
    editProjectTitleId = id;
}

function EditProjectTitle() {
    var url1 = "/timeSheetApi/EditProjectTitle";
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            projectId: editProjectTitleId,
            projectTitle: document.getElementById('EditProjectTitle').value,

        },

        error: function (xhr, _status, _error) {

            if (xhr.status >= 400) {
                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {
        alert(returnedData.Data.Message);
        window.location.reload();
    });
}

function closeEditProjectTitle() {
    document.getElementById("EditProjectTitlePopUp").style.display = "none";

}

function openInsertNewWorkForm() {

    document.getElementById('setNewWorkLabel').innerHTML = "ثبت پروژه جدید";


    document.getElementById("insertNewWorkPopUp").style.display = "block";

}

function insertNewproject() {

    if ($("#newWorkTitle").val() != '') {

        var url2 = '/TimeSheetApi/insertNewProject';
        $.ajax({
            url: url2,
            type: 'POST',
            data: {
                HeadRoleId: 1,
                NewProjectTitle: $("#newWorkTitle").val(),
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

    } else {
        alert('لطفا عنوان پروژه جدید را بنویسید! ');

    }


}

function closeNewWorkForm() {
    document.getElementById("insertNewWorkPopUp").style.display = "none";
    document.getElementById("startNewWorkPopUp").style.display = "none";
    document.getElementById("finishWorkPopUp").style.display = "none";
    document.getElementById("WorkTitlePopUp").style.display = "none";
    document.getElementById("mWorkComment").style.display = "none";
}

function back() {
  
            window.location.href = "adminReport?id=1";


};