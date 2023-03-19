
var setHomeScreen = localStorage['setHomeScreen'];

//window.onload = function () {

//		redirect()
//}

$(document).ready(function () {

    redirect();

});

function redirect() {
    document.getElementById('iFrameBlog').style.display = 'block';
    var iframe = document.getElementById('iFrameBlog');

    if ((localStorage['rId'] >= 2 && localStorage['rId'] < 31) || localStorage['rId']==999) {
        window.open('main?id=5', 'iFrameBlog');
        iframe.src = 'main?id=5';
        iframe.contentWindow.document.open();
        iframe.src = iframe.src;
        // window.frames['iFrameBlog'].location = "main?id=5";

    } else if (localStorage['rId'] == 1 || localStorage['rId'] == 31 || localStorage['rId'] == 111) {
        window.open('adminReport?id=6', 'iFrameBlog');
        iframe.src = 'adminReport?id=6';
        iframe.contentWindow.document.open();
        iframe.src = iframe.src;
        //.frames['iFrameBlog'].location = "adminReport?id=6";

    } 
   

	return
}

