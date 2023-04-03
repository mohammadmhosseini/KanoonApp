/// <reference path="index.js" />


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

var HeadRoleId =0
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

    if (sh < 950 && sw < 550) {
       

    } else {
        document.getElementById('clock').style.width = "30vw";
        document.getElementById('clock').style.height = "30vw";
        document.getElementById('clock').style.padding = "5vw";
        document.getElementById('clockButton').style.width = "20vw";
        document.getElementById('clockButton').style.height = "20vw";
        document.getElementById('clockButton').style.fontSize = "5vw";

        document.getElementById('description').style.height = "15vw";
        document.getElementById('newWorkTitle').style.height = "15vw";


        document.getElementById('form-cont').style.width = "40vw";
        document.getElementById('form-cont').style.padding = "2vw";

        document.getElementById('formButton').style.fontSize = "2vw";
        document.getElementById('formButton').style.padding = "1vw";
        document.getElementById('formButtonC').style.fontSize = "2vw";
        document.getElementById('formButtonC').style.padding = "1vw";

        document.getElementById('setLabel').style.margin = "0 0 1vw 0";
        document.getElementById('setLabel').style.fontSize = "2vw";

        document.getElementById('setNewWorkLabel').style.margin = "0 0 1vw 0";
        document.getElementById('setNewWorkLabel').style.fontSize = "2vw";

        //document.getElementsByClassName('btn').style.height = "40vw";

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
        //document.getElementById('mainTitle').style.fontSize = "1.7vw";
        document.getElementsByClassName('menuIcon')[0].style.width = "2vw";
        document.getElementsByClassName('menuIcon')[0].style.height = "2vw";
        document.getElementsByClassName('rightSlidebar')[0].style.width = "22vw";
        document.getElementsByClassName('overlay')[0].style.top = "4vw";
        document.getElementsByClassName('menuUserPic')[0].style.width = "5vw";
        document.getElementsByClassName('menuUserPic')[0].style.height = "5vw";
        document.getElementsByClassName('userName')[0].style.fontSize = "1.5vw";
        document.getElementsByClassName('userName')[0].style.margin = "1.5vw";
        document.getElementsByClassName('userData')[0].style.padding = "1vw";
        //document.getElementById('backButton').style.fontSize = "2vw";


    }
    return
}


function back() {
	localStorage.clear();
	localStorage.setItem('setHomeScreen', 'set');
	localStorage.setItem('isUserLoggedIn', 'F');
	localStorage.setItem('IsV', 'true');
	window.location.href = "login?id=6";

};



$(document).ready(function () {
    
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

        document.getElementById('loading').style.display = "block";
    var url1 = "/timeSheetApi/getTime";
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
        },
       

        error: function (xhr, _status, _error) {

            if (xhr.status >= 400) {
                document.getElementById('loading').style.display = "none";
                alert('خطا در دریافت اطلاعات');
            }
           
        }

    }).done(function (returnedData) {
        console.log(returnedData);
        document.getElementById('loading').style.display = "none";
        HeadRoleId = returnedData.data.headRoleId;
        console.log(HeadRoleId);
     
       
        if (returnedData.data.success == 1) {
            isFinished = false;
            console.log(returnedData.data.startWorkDate);
            lastStartTime = returnedData.data.startWorkDate;
            nowTime = returnedData.data.nowTime;
            lastDuration = returnedData.data.lastDuration;
            //startTime();
          

            //document.getElementById('duration').style.display = "block";

            document.getElementById('clock').style.backgroundColor = "#ea7584";
            document.getElementById('clockButton').style.backgroundColor = "#e54a5d"
            document.getElementById('clockButton').innerHTML = "پایان";
           



        } else {
            document.getElementById('loading').style.display = "none";
            isFinished = true;
            document.getElementById('duration').style.display = "none";
            document.getElementById('clock').style.backgroundColor = "#daf3c2";
            document.getElementById('clockButton').style.backgroundColor = "lawngreen";
            document.getElementById('clockButton').innerHTML = "شروع";

            if (returnedData.Data.HeadRoleId == 1) {
                getUserWorksList();
            }
        }

    });

  

    }
});
function getUserWorksList() {
    console.log(localStorage['userId']);
    var url1 = "/timeSheetApi/getWorkListForUser";
    document.getElementById('loading').style.display = "block"
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
            ProjectId: 0,
            DefinedWorkId:0
        },

        error: function (xhr, _status, _error) {
            document.getElementById('loading').style.display = "none"

            if (xhr.status >= 400) {

                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {
        document.getElementById('loading').style.display = "none"

        console.log(returnedData);
        $("#selectProject").empty();
        $("#selectDefinedWork").empty();
        $("#selectWork").empty();
        var option = document.createElement("option");
        $("#selectProject").append('<option value=' + 0 + '>انتخاب پروژه</option>');
        $("#selectDefinedWork").append('<option value=' + 0 + '>انتخاب کار اصلی</option>');
        $("#selectWork").append('<option value=' + 0 + '>انتخاب کار فرعی</option>');
      
        
        $.each(returnedData.data.projectList, function (key, value) {
          
              
                $("#selectProject").append('<option value=' + value.a.ProjectId + '>' + value.ProjectTitle + '</option>');
               
        });
 
       
        if ($("#selectProject option").length > 1) {
            document.getElementById('selectProject').style.display = 'block';
        }
        

    });


}

function getDefinedWork(projectId) {
    var url1 = "/timeSheetApi/getWorkListForUser";
    document.getElementById('loading').style.display = "block"
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
            ProjectId: projectId,
            DefinedWorkId:0,

        },

        error: function (xhr, _status, _error) {
            document.getElementById('loading').style.display = "none"

            if (xhr.status >= 400) {

                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {
        document.getElementById('loading').style.display = "none"

        console.log(returnedData);
      
        $("#selectDefinedWork").empty();
       
        var option = document.createElement("option");
        $("#selectDefinedWork").append('<option value=' + 0 + '>انتخاب کار اصلی</option>');
       
        $.each(returnedData.data.definedWorkList, function (key, value) {
            
                $("#selectDefinedWork").append('<option value=' + value.a.DefinedWorkId + '>' + value.DefinedWorkTitle + '</option>');

        });
        
        
        if ($("#selectDefinedWork option").length > 1) {
            document.getElementById('selectDefinedWork').style.display = 'block';
        }

    });

}

function getWork(definedWorkId) {
    console.log(localStorage['userId']);
    var url1 = "/timeSheetApi/getWorkListForUser";
    document.getElementById('loading').style.display = "block"
    $.ajax({
        url: url1,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
            ProjectId: $("#selectProject").val(),
            DefinedWorkId: definedWorkId,
        },

        error: function (xhr, _status, _error) {
            document.getElementById('loading').style.display = "none"

            if (xhr.status >= 400) {

                alert('خطا در دریافت اطلاعات');
            }

        }

    }).done(function (returnedData) {
        document.getElementById('loading').style.display = "none"

        console.log(returnedData);
        
        $("#selectWork").empty();
        var option = document.createElement("option");
        
        $("#selectWork").append('<option value=' + 0 + '>انتخاب کار فرعی</option>');

        $.each(returnedData.data.workList, function (key, value) {
            if (value.a.WorkTitle != '') {
                $("#selectWork").append('<option value=' + value.a.Id + '>' + value.a.WorkTitle + '</option>');

            } else {
                $("#selectWork").append('<option value=' + value.a.Id + '>بدون توضیح کار فرعی از طرف مدیر</option>');

            }

        });
        
        if ($("#selectWork option").length > 1) {
            document.getElementById('selectWork').style.display = 'block';
        }
       

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



function openReport() {
	window.location.href = "report?id=3"
}

function openInsertNewWorkForm() {
    
    document.getElementById('setNewWorkLabel').innerHTML = "ثبت کار جدید";
   

    document.getElementById("insertNewWorkPopUp").style.display = "block";

}

function insertNewWorkTitle() {
  
    if ($("#newWorkTitle").val() != '') {

            var url2 = '/TimeSheetApi/insertNewWork';
            $.ajax({
                url: url2,
                type: 'POST',
                data: {
                    userId: localStorage['userId'],
                    NewWorkTitle: $("#newWorkTitle").val(),

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
                if (returnedData.data.success == 1) {

                    alert(returnedData.data.message);
                    window.location.reload();

                }
            });

        } else {
            alert('لطفا عنوان کار جدیدتان را بنویسید! ');

        }
   
    
}

function closeNewWorkForm() {
    document.getElementById("insertNewWorkPopUp").style.display = "none";

}


function openWorkList() {
    window.location.href="userWorkList?id=1"
}
// end of menu functions	


// popup workbook functions

//wb for onlinetest corona

// end of wb for onlinetest corona




function openForm() {


    if (isFinished == true) {
        document.getElementById('setLabel').innerHTML = "شروع کار";
    } else {
        document.getElementById('selectProject').style.display = "none";
        document.getElementById('selectDefinedWork').style.display = "none";
        document.getElementById('selectWork').style.display = "none";

        document.getElementById('setLabel').innerHTML = "پایان کار";

    }
		
    document.getElementById("setTimePopUp").style.display = "block";
         
            
     

}

function setTime() {
    document.getElementById('loading').style.display = "block";
    if (isFinished == true) {
        if ($("#selectProject option").length > 1 || HeadRoleId != 1) {
        if ($("#selectProject").val() != 0 || HeadRoleId != 1) {
            if ($("#selectDefinedWork").val() != 0 || HeadRoleId != 1) {

                if ($("#selectWork").val() != 0 || HeadRoleId != 1) {
                   

                    
            if ($("#description").val() != '') {

            var url2 = '/TimeSheetApi/setStartTime';
            $.ajax({
                url: url2,
                type: 'POST',
                data: {
                    userId: localStorage['userId'],
                    startDesctiption: $("#description").val(),
                    workId: $("#selectWork").val(),
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
                        document.getElementById('loading').style.display = "none";
                    }

                }

            }).done(function (returnedData) {
                console.log(returnedData);
                if (returnedData.data.success == 1) {
                    document.getElementById('loading').style.display = "none";
                    alert(returnedData.data.Message);
                    document.getElementById('selectWork').style.display = "none";
                    window.location.reload();
                        
                }
            });
            
        } else {
            document.getElementById('loading').style.display = "none";

            alert('لطفا توضیحات شروع کارتان را بنویسید! ');

            }
        } else {
            document.getElementById('loading').style.display = "none";

            alert('لطفا کار فرعی را انتخاب نمایید! ');

            }
        } else {
            document.getElementById('loading').style.display = "none";

            alert('لطفا کار اصلی را انتخاب نمایید! ');

            }
        } else {
            document.getElementById('loading').style.display = "none";

            alert('لطفا پروژه را انتخاب نمایید! ');

            }
        } else {
            document.getElementById('loading').style.display = "none";

            alert('کاری برای شما تعریف نشده است!! ');

        }
    } else { 
        if ($("#description").val() != '') {

            var url2 = '/timeSheetApi/setEndTime';
            $.ajax({
                url: url2,
                type: 'POST',
                data: {
                    userId: localStorage['userId'],
                    EndDesctiption: $("#description").val(),
                },
                headers: {
                    'Authorization': 'bearer' + ' ' + localStorage['StudentId'],
                },
                error: function (xhr, status, _error) {
                    //console.log(error);
                    console.log(status);
                    console.log(xhr.status);
                    if (xhr.status >= 400) {
                        document.getElementById('loading').style.display = "none";
                        alert('خطا در ارسال اطلاعات!');
                    }

                }

            }).done(function (returnedData) {
                if (returnedData.data.success == 1) {
                    document.getElementById('loading').style.display = "none";
                    alert('زمان پایان به کار شما با موفقیت ثبت شد.');
                    window.location.reload();
                }
            });

        } else {
            document.getElementById('loading').style.display = "none";
            alert('لطفا توضیحات پایان کارتان را بنویسید! ');
        }
    }
}

function closeForm() {
    document.getElementById("setTimePopUp").style.display = "none";
    

}


//end of popup workbook functions		


function getGroupCode() {

   
    var url2 = '/kanoonihaWebApi/getUserGroupCode';
    $.ajax({
        url: url2,
        type: 'POST',
        data: {
            userId: localStorage['userId'],
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

       
       
    //   console.log(returnedData);
        localStorage.setItem('GroupCode', returnedData.data.groupCode);
        localStorage.setItem('AreaCode', returnedData.data.areaCode);
        localStorage.setItem('OfficeCode', returnedData.data.officeCode);
        localStorage.setItem('StateCode', returnedData.data.stateCode);
        localStorage.setItem('Sex', returnedData.data.sex);
     

        //if (returnedData.Data.groupCode >= 1 && returnedData.Data.groupCode <= 4 && returnedData.Data.sex == false && returnedData.Data.stateCode == 1 ) {
        //    document.getElementById('OHamayesh').style.display = "block";
        //    } else {
        //    document.getElementById('OHamayesh').style.display = "none";
        //}

 

        //if (returnedData.Data.groupCode >= 1 && returnedData.Data.groupCode <= 4 ) {
        //    document.getElementById('onlineReg').style.display = "block";
        //} else {
        //    document.getElementById('onlineReg').style.display = "none";
        //}

        

    });


}




//stopwatch



 






