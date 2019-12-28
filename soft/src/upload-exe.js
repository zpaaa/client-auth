

import '../style/upload-exe.scss';
import { Validator } from '../utils/utils';

import { uploadWorks, checkLogin } from '../utils/api'
import { Agree} from '../utils/agree';



(function () {
  var softScreenshotList = []
  var softIdentityList = []
  var logoList = []
  function initEvent() {
    $('#radioChange').on('click', '.radio', function (e) {
      if ($(e.target).is("input")) {
        return
      }
      $(this).addClass('is-checked')
      $(this).parent().siblings().find('.is-checked').removeClass('is-checked')
    })
    $('#radioChange').on('click', '.checkbox', function (e) {
      if ($(e.target).is("input")) {
        return
      }
      $(this).hasClass('is-checked') ? $(this).removeClass('is-checked') : $(this).addClass('is-checked')
    })
    $('#file [type="button"]').on('click', function () {
      $('#file [type="file"]').click()
    })
    $('#softScreenshotList [type="button"]').on('click', function () {
      $('#softScreenshotList [type="file"]').click()
    })
    $('#softLogo [type="button"]').on('click', function () {
      $('#softLogo [type="file"]').click()
    })
    $('#softIdentityList [type="button"]').on('click', function () {
      $('#softIdentityList [type="file"]').click()
    })
    $('#softLogo [type="file"]').on('change', function () {
      logoList = Array.prototype.slice.call($(this)[0].files)
      render(logoList, 'logoList')
    })
    $('#softScreenshotList [type="file"]').on('change', function () {
      softScreenshotList = softScreenshotList.concat(Array.prototype.slice.call($(this)[0].files))
      render(softScreenshotList, 'softScreenshot')
    })
    $('#softIdentityList [type="file"]').on('change', function () {
      softIdentityList = softIdentityList.concat(Array.prototype.slice.call($(this)[0].files))
      render(softIdentityList, 'softIdentity')
    })
    $('#softScreenshotList').on('click', 'i', function () {
      var index = $(this).attr('data-index')
      softScreenshotList.splice(index, 1)
      /* 不管删除的谁  都清空input的value */
      $('#softScreenshotList [type="file"]')[0].value = ''
      render(softScreenshotList, 'softScreenshot')
    })
    $('#softIdentityList').on('click', 'i', function () {
      var index = $(this).attr('data-index')
      softIdentityList.splice(index, 1)
      /* 不管删除的谁  都清空input的value */
      $('#softIdentityList [type="file"]')[0].value = ''
      render(softIdentityList, 'softIdentity')
    })
    /* 统一的勾选统一按钮 */
    $('#agree').on('click', '.checkbox-input', function (e) {
      if ($(e.target).is("input")) {
        return
      }
      var oCheckbox = $(this).parent('.checkbox')
      oCheckbox.hasClass('is-checked') ? oCheckbox.removeClass('is-checked') : oCheckbox.addClass('is-checked'); $('#agree .error-msg').html('')
    })
    /* 需要监听的change事件 */
    onchangeValidator($('#displayName input'), 'displayName')
    onchangeValidator($('#softVersion input'), 'softVersion')
    onchangeValidator($('#description input'), 'description')
    onchangeValidator($('#softLogo input'), 'softLogo')
    onchangeValidator($('#softScreenshotList input'), 'softScreenshotList')
    onchangeValidator($('#softIdentityList input'), 'softIdentityList')

  }

  function onchangeValidator(el, key) {
    el.on('change', function () {
      var validator = valida()
      var msg = validator.keyValidator(key)
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      } else {
        $(this).parents('.form-item').removeClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html('')
      }
    })
  }


  initEvent()


  function getData() {
    var data = {}
    data.displayName = $('#displayName input').val()
    data.softVersion = $('#softVersion input').val()
    data.softComment = $('#softComment input').val()
    data.downloadUrl = $('#downloadUrl input').val()
    data.softCategory = $('#select .inner').attr('value')
    /* 文件 file */
    data.file = $('#file [type="file"]')[0].files[0]
    data.softLanguage = $('#softLanguage .is-checked input').val()

    data.softAuthorization = $('#softAuthorization .is-checked input').val()

    /* 软件授权 */
    var value = $('#softAuthorization .is-checked input').val()
    if (value === '3') {
      data.softAuthorization = `试用${$('#try-time').val() ? $('#try-time').val() : 0}天`
    } else {
      data.softAuthorization = $('#softAuthorization .is-checked .radio-label').html().trim()
    }

    /* 系统环境 */
    var arr = []
    $('#osVersionList .checkbox').each(function () {
      if ($(this).hasClass('is-checked')) {
        arr.push($(this).find('input').val())
      }
    })

    data.osBit = $('#osBit .is-checked input').val()
    data.osVersionList = arr
    data.description = $('#description .textarea').val()
    data.updateLog = $('#description .textarea').val()
    data.softLogo = logoList[0]
    // data.softScreenshotList = $('#softScreenshotList [type="file"]')[0].files[0]
    data.softScreenshotList = softScreenshotList
    data.softIdentityList = softIdentityList
    return data
  }
  function render(data, id) {
    var str = ''
    $.each(data, function (index, item) {
      str += `<span class="file-box" >
                <span class="file-name" title="${item.name}" >${item.name.split('.')[0]}</span><b>.${item.name.split('.')[1]}</b>
                <i data-index="${index}"></i>
              </span>`
    })
    $(`#${id}`).html(str)
  }

  function valida() {
    var validator = new Validator()
    var data = getData()
    validator
      .add('displayName', data.displayName, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'maxLength:50', errMsg: '长度不能超过50' }
      ])
      .add('softVersion', data.softVersion, [
        { verify: 'isNonEmpty', errMsg: '版本不能为空' },
      ])
      .add('description', data.description, [
        { verify: 'isNonEmpty', errMsg: '软件介绍不能为空' },
        { verify: 'maxLength:300', errMsg: '最长不能超过300字' },
      ])
      .add('downloadUrl', [data.downloadUrl, data.file], [
        { verify: 'allEmpty', errMsg: '文件和downURL必须选择一项' },
      ])
      .add('file', [data.downloadUrl, data.file], [
        { verify: 'allEmpty', errMsg: '文件和downURL必须选择一项' },
      ])
      .add('osVersionList', data.osVersionList, [
        { verify: 'minLength:1', errMsg: '至少选择一个' }
      ])
      .add('softLogo', data.softLogo, [
        { verify: 'minLength:1', errMsg: '请上传软件logo' },
        { verify: 'fileSize:100', errMsg: '不能超过100M' },
      ])
      .add('softScreenshotList', data.softScreenshotList, [
        { verify: 'minLength:1', errMsg: '请上传软件截图' },
        { verify: 'fileSize:100', errMsg: '图片总大小不能超过100M' },
        { verify: 'maxLength:10', errMsg: '图片总数不能超过10张' },
        { verify: 'fileType:["png","jpg"]', errMsg: '图片类型只能是png、jpg' },
      ])
      .add('softIdentityList', data.softScreenshotList, [
        { verify: 'minLength:1', errMsg: '请上传软件资质' },
        { verify: 'fileSize:100', errMsg: '图片总大小不能超过100M' },
        { verify: 'maxLength:10', errMsg: '图片总数不能超过10张' },
        { verify: 'fileType:["png","jpg"]', errMsg: '图片类型只能是png、jpg' },
      ])
    return validator
  }

  $('#submit').on('click', function () {
    console.log(getData())
    var agree = $('#agree .checkbox').hasClass('is-checked')
    if (agree) {
      var validator = valida()
      var errObj = validator.start()
      console.log(errObj)
      if (JSON.stringify(errObj) !== '{}') {
        $('.is-error .error-msg').html('')
        $('.is-error').removeClass('is-error')
        for (var id in errObj) {
          $('#' + id).addClass('is-error')
          $('#' + id + ' ' + '.error-msg').html(errObj[id])
        }
      } else {
        console.log(getData())
        uploadWorks(getData()).then(function (res) {
          if(res.response.code===2000){
            location.href = './user.html'
          }
        }).catch(function () {

        })
      }
    } else {
      $('#agree .error-msg').html('请先勾选作者协议')
    }
  })

  function Select(options) {
    var list = options.list || []
    var defaultValue = options.defaultValue || { value: '', label: '' }
    var id = options.id
    this.list = list
    this.defaultValue = defaultValue
    this.id = id
    this.init()
    this.initEvent()
  }
  Select.prototype.init = function () {
    var str = '';
    $.each(this.list, function (index, item) {
      str += `<li class="options-item" value="${item.value}" label="${item.label}">
          ${item.label}
        </li>`
    })
    str = `<ul class="options-list">${str}</ul>`
    str = `<div class="inner" value="${this.defaultValue.value}" label="${this.defaultValue.label}">
                ${this.defaultValue.label}
              </div>` + str
    $(this.id).html(str)
  }
  Select.prototype.initEvent = function () {
    var that = this
    $(this.id).on('click', function (e) {
      var target = $(e.target)
      if (target.hasClass('inner')) {
        var options = $(that.id).find('.options-list')
        options.css('display') === 'block' ? options.css({ 'display': 'none' }) : options.css({ 'display': 'block' })
      } else {
        var value = target.attr('value')
        var label = target.attr('label')
        $(that.id).find('.inner').attr({ value: value, label: label })
        $(that.id).find('.inner').html(label)
        $(that.id).find('.options-list').css({ 'display': 'none' })
      }

    })
    $(this.id).on('mouseleave', function () {
      $(that.id).find('.options-list').css({ 'display': 'none' })
    })
  }
  const options = {
    id: '#select',
    list: [
      { value: 1, label: '视频软件' },
      { value: 2, label: '聊天工具' },
      { value: 3, label: '浏览器' },
      { value: 4, label: '游戏娱乐' },
      { value: 5, label: '音乐软件' },
      { value: 6, label: '安全杀毒' },
      { value: 7, label: '系统工具' },
      { value: 8, label: '下载工具' },
      { value: 9, label: '办公软件' },
      { value: 10, label: '手机数码' },
      { value: 11, label: '输入法' },
      { value: 12, label: '图形图像' },
      { value: 13, label: '股票网银' },
      { value: 14, label: '阅读翻译' },
      { value: 15, label: '网络应用' },
      { value: 16, label: '主题壁纸' },
      { value: 17, label: '教育学习' },
      { value: 18, label: '压缩刻录' },
      { value: 19, label: '编程开发' },
      { value: 20, label: '行业软件' },
      { value: 21, label: '其他软件' }
    ],
    defaultValue: {
      value: 1,
      label: '视频软件'
    }
  }
  new Select(options)


  checkLogin().then(function (res) {
    var code = res.response.code
    var userName = res.userName;
    if (code === 2000) {
      var str = ` <span class="name"><a href="./user.html">${userName}</a></span>|
      <span>退出</span>`
    } else {
      var str = `<span class="login">
                    <a href="//passport.2345.com/login?forward=${location.href}">
                      账号登录
                    </a>
                  </span>`
    }
    $('#userInfo').html(str)
  }).catch(function (err) {
    console.log(err)
  })

  $('#agree').on('click','b',function(){
    var agress = new Agree()
  })





})();







