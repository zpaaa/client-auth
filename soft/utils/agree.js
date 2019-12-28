




export function Agree() {
  this.render()
}
Agree.prototype.render = function () {
  var that = this
  var str = ` <div class="agree-pop" >
  <div class="modal"></div>
  <div class="pop-wrap">
    <div class="agree-title">《软件管家发放平台作者协议》</div>
    <div class="pop-container">
      <div class="agree-text">
        <h3>“2345安全卫士”(以下简称“软件”)是由上海二三四五移动科技有限公司（以下简称2345.cc）提供的客户端软件。用户在安装本“软件”前应仔细阅读本服务《协议》（以下简称
          “《协议》”），只要用户安装、复制、下载、访问或以其它方式使用本“软件”，即表明用户已经完整准确地了解了本《协议》所有约定，注意到了本《协议》所提示的所有内容，并同意接受本《协议》的全部条款的约束。如果您不同意本《协议》中的条款，请不要安装、复制或使用本软件。
        </h3>
        <h3>本《协议》构成用户与2345.cc之间的合同法律关系</h3>
        <h3>一、知识产权声明</h3>
        <p>1.
          本“软件”是由2345.cc开发。“软件”的一切版权等知识产权，以及与“软件”相关的所有信息内容，包括但不限于：文字表述及其组合、图标、图饰、图表、色彩、界面设计、版面框架、有关数据、印刷材料、或电子文档等均受著作权法和国际著作权条约以及其他知识产权法律法规的保护。
        </p>
        <p>2. 未经2345.cc书面同意，用户不得为任何营利性或非营利性的目的自行实施、利用、转让或许可任何第三方实施、利用、转让上述知识产权，2345.cc保留追究上述未经许可行为的权利。</p>
      </div>
    </div>
    <div class="agree-close">关闭</div>
  </div>
</div>`
  $(document.body).append(str)
  $(document.body).css({ 'overflow': 'hidden' })
  $('.agree-pop .agree-close').on('click',function(){
    that.hide()
  })
}
Agree.prototype.hide = function () {
  $('.agree-pop').css({ 'display': 'none' })
  $(document.body).css({ 'overflow': 'inherit' })
}







