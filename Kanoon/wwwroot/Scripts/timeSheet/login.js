
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

                                if (data.data.success == 0) {
                                    alert(data.data.msg);
                                }else if (data.data.success == 1) {

                                    localStorage.setItem('userId', data.data.userId);
                                    localStorage.setItem('Name', data.data.name);
                                    localStorage.setItem('Mobile', data.data.mobile);
                                    localStorage.setItem('rId', data.data.roleId);
                                    localStorage.setItem('isUserLoggedIn', 'T');
                                    if (data.data.roleId == 1 || data.data.roleId == 31 || data.data.roleId == 111 || localStorage['rId'] == 99) {
                                        window.location.href = "adminReport";

                                    } else if ((data.data.roleId >= 2 && data.data.roleId < 31) || data.data.roleId==999) {
                                        window.location.href = "main";
                                    }
                                    
                                }
                            });
                    }
                
            
            event.preventDefault();

        });
    }


	
});











