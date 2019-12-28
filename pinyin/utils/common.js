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
  checkLogin(url).then(res => {
    $('.user-info .login-info').find('.username').text(res.response.username)
    $('.user-info .login-btn').hide().siblings().show()
  }).catch(() => {
    $('.user-info .login-btn').show().siblings().hide()
  })
}