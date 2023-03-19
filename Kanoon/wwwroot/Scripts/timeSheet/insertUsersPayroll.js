
var Mobile = '';
var SMScode = '';
var userId = '';
$(document).ready(function () {

    getUsers();
        var form = $('#login-form');
        form.submit(function (event) {
            var amount = $('#userAmount').val();
            var userId = $('#users').val()
            if ($.trim(amount) != '') {
                $.post('/timeSheetApi/insertUserPayroll'
                    , {
                        userId: userId,
                        amount: amount,
                            }, function (data) {

                                	console.log(data);

                             
                        alert(data.Data.message);
                        window.location.reload();
                                    
                                
                            });
                    }
                
            
            event.preventDefault();

        });
    


	
});



function getUsers() {
    var url1 = "/timeSheetApi/getUsersOfPayroll";
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

        $("#users").empty();

        var j = 0;
        $("#users").append('<li class="UItem" style="background-color: aquamarine; font-weight: 700;">' + '<div class="listItems" style="text-align:center;  width:100%; font-size:3vw; ">' + "گروه" + '</div>' + '</li>');

        $.each(returnedData.Data.notInsertedUsers, function (key, value) {

            $("#users").append('<option value=' + value.Id + '>' + value.Name + ' ' + value.Family + '</option>');

           
        });

       

    });
}




function back() {
    window.location.href = "adminReport?id=10";
}


