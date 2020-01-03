import { checkLogin } from './utils'
export function headSwitch() {
  var hoverObj = $(".mIcon-bg");
	var pcmBgObj = $("#curr-pc-m");
	var pcIconObj = $(".pcIcon-bg");
	
	hoverObj.mouseenter(function()
	{
		pcmBgObj.stop(true,true).animate({"left":"105px"},300);
		pcIconObj.addClass("pcIcon-lost");
		$(this).addClass("mIcon-hover");
	}).mouseleave(function()
	{
		pcmBgObj.stop(true,true).animate({"left":"1px"},300);
		pcIconObj.removeClass("pcIcon-lost");
		$(this).removeClass("mIcon-hover");
	});
	
	hoverObj.bind("click",function()
	{
		pcIconObj.removeClass("pcIcon-lost");
		$(this).removeClass("mIcon-hover");
		pcmBgObj.stop(true,true).animate({"left":"1px"},100);
	});
}

export function getLoginState (url) {
  // console.log(url)
  checkLogin(url).then(res => {
    // console.log(res.userName)
    $('.user-info .log-info').find('.username').text(res.userName)
    $('.user-info .login-btn').hide().siblings().show()
  }).catch(() => {
    $('.user-info .login-btn').show().siblings().hide()
  })
  $('.user-info .login-btn').on('click',  function() {
    window.location.href = `//passport.2345.com/login?forward=${location.href}`
  })
  $('.user-info .logout').on('click', function () {
    window.location.href = `http://passport.2345.com/login?action=logout&forward=${location.href}`
  })
}