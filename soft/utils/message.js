



export function Message() {
}
Message.prototype.error = function (title) {
  title = title || '上传文件不能超过10M'
  var str = ` <div id="message" class="message">
  <div class="icon success">
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20px" height="20px">
      <path fill-rule="evenodd" fill="rgb(255, 185, 49)"
        d="M10.000,-0.000 C15.523,-0.000 20.000,4.477 20.000,10.000 C20.000,15.523 15.523,20.000 10.000,20.000 C4.477,20.000 -0.000,15.523 -0.000,10.000 C-0.000,4.477 4.477,-0.000 10.000,-0.000 Z" />
      <path fill-rule="evenodd" fill="rgb(255, 255, 255)"
        d="M9.000,15.000 L9.000,13.000 L11.000,13.000 L11.000,15.000 L9.000,15.000 ZM10.000,12.000 C9.448,12.000 9.000,11.552 9.000,11.000 L9.000,5.000 C9.000,4.448 9.448,4.000 10.000,4.000 C10.552,4.000 11.000,4.448 11.000,5.000 L11.000,11.000 C11.000,11.552 10.552,12.000 10.000,12.000 Z" />
    </svg>
  </div>
  <div class="message-title">
    ${title}
  </div>
</div>`
  $(document.body).append(str)
  setTimeout(function () {
    $('div').remove('#message')
  }, 2000)
}

Message.prototype.success = function (title) {
  title = title || '上传文件不能超过10M'
  var str = ` <div id="message" class="message">
  <div class="icon success">
  <svg 
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    width="20px" height="20px">
  <path fill-rule="evenodd"  fill="rgb(0, 208, 137)"
    d="M10.000,-0.000 C15.523,-0.000 20.000,4.477 20.000,10.000 C20.000,15.523 15.523,20.000 10.000,20.000 C4.477,20.000 -0.000,15.523 -0.000,10.000 C-0.000,4.477 4.477,-0.000 10.000,-0.000 Z"/>
  <path fill-rule="evenodd"  fill="rgb(255, 255, 255)"
    d="M15.995,7.336 L9.831,13.500 L9.995,13.664 L8.664,14.995 L8.500,14.831 L8.336,14.995 L7.005,13.664 L7.169,13.500 L4.005,10.336 L5.336,9.005 L8.500,12.169 L14.664,6.005 L15.995,7.336 Z"/>
 </svg>
  </div>
  <div class="message-title">
    ${title}
  </div>
</div>`
  $(document.body).append(str)
  setTimeout(function () {
    $('div').remove('#message')
  }, 2000)
}








