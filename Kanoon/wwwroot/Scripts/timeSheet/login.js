
var Mobile = '';
var SMScode = '';
var userId = '';
$(document).ready(function () {

    if ((localStorage['isUserLoggedIn'] == 'T' && localStorage['rId'] >= 2 && localStorage['rId'] < 31) || localStorage['rId'] == 999) {
        window.location.href = "main?id=3";
    } else if (localStorage['isUserLoggedIn'] == 'T' && (localStorage['rId'] == 1 || localStorage['rId'] == 31 || localStorage['rId'] == 99 || localStorage['rId'] == 111)) {
        window.location.href = "adminReport?id=4";
    } else {
        var form = $('#login-form');
        form.submit(function (event) {
            var natCode = $('#NationalCode').val();
            if ($.trim(natCode) != '') {
                        $.post('/timeSheetApi/login'
                            , {
                                nationalCode: natCode,
                            }, function (data) {

                                	console.log(data);

                                if (data.Data.success == 0) {
                                    alert(data.Data.msg);
                                }else if (data.Data.success == 1) {

                                    localStorage.setItem('userId', data.Data.userId);
                                    localStorage.setItem('Name', data.Data.Name);
                                    localStorage.setItem('Mobile', data.Data.Mobile);
                                    localStorage.setItem('rId', data.Data.RoleId);
                                    localStorage.setItem('isUserLoggedIn', 'T');
                                    if (data.Data.RoleId == 1 || data.Data.RoleId == 31 || data.Data.RoleId == 111 || localStorage['rId'] == 99) {
                                        window.location.href = "adminReport";

                                    } else if ((data.Data.RoleId >= 2 && data.Data.RoleId < 31) || data.Data.RoleId==999) {
                                        window.location.href = "main";
                                    }
                                    
                                }
                            });
                    }
                
            
            event.preventDefault();

        });
    }


	
});











