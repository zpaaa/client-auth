
import './upload.scss'
(function () {
  var fileList = []


  var formData = {
    initEvent: function () {
      /* 切换用户单选框 */
      $('#userType').on('click', 'label', function (e) {
        console.log('切换userType')
        if ($(e.target).is("input")) {
          return
        }
        $(this).find('.radio').addClass('is-checked')
        $(this).siblings().find('.is-checked').removeClass('is-checked')
      })
      /* 统一的勾选统一按钮 */
      $('#agree').on('click', '.checkbox-input', function (e) {
        if ($(e.target).is("input")) {
          return
        }
        var oCheckbox = $(this).parent('.checkbox')
        oCheckbox.hasClass('is-checked') ? oCheckbox.removeClass('is-checked') : oCheckbox.addClass('is-checked'); $('#agree .error-msg').html('')
      })
      /* 点击上传文件 */
      $('#companyPictureList').on('click', '[type="button"]', function () {
        console.log('上传文件')
        $('#companyPictureList [type="file"]').click()
      })
      /* 多次选择图片 */
      $('#companyPictureList').on('click', '[ type="file"]', function () {
        // console.log('上传文件')
        // $('#companyPictureList [type="file"]').click()
        fileList.concat(Array.prototype.slice.call( $('#companyPictureList [type="file"]')[0].files))

      })
      /* 点击上传按钮 */
      $('#submit').on('click', function () {
        var agree = $('#agree .checkbox').hasClass('is-checked')
        var msg = validatorFunc()
        console.log(msg)
        if (JSON.stringify(msg) !== '{}') {
          for (var id in msg) {
            $('#' + id).addClass('is-error')
            $('#' + id + ' ' + '.error-msg').html(msg[id])
          }
        }
        if (agree) {

        } else {
          $('#agree .error-msg').html('请先勾选作者协议')
        }
      });
    },
    getData: function () {
      var data = {}
      var fileList = []
      data.userType = $('#userType .is-checked input').val()
      data.companyName = $('#companyName input').val()
      data.companyContactPerson = $('#companyContactPerson input').val()
      data.companyPersonalPhone = $('#companyPersonalPhone input').val()
      data.email = $('#email input').val()
      data.phone = $('#phone input').val()
      data.companyIntroduction = $('#companyIntroduction textarea').val()
      // data.companyPictureList = $('#companyPictureList [type="file"]')[0].files
      data.companyPictureList = fileList
      // data.companyPictureList = fileList.concat(Array.prototype.slice.call(data.companyPictureList))
      console.log(window.a = data.companyPictureList)
      return data
    }

  }








  var vrertifyRules = {
    isNonEmpty: function (value, errorMsg) {
      return value === '' ?
        errorMsg : void 0
    },
    minLength: function (value, length, errorMsg) {
      return value.length < length ?
        errorMsg : void 0
    },
    maxLength: function (value, length, errorMsg) {
      return value.length > length ?
        errorMsg : void 0
    },
    isMoblie: function (value, errorMsg) {
      return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ?
        errorMsg : void 0
    },
    isEmail: function (value, errorMsg) {
      return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
        errorMsg : void 0
    }
  }
  class Validator {
    constructor() {
      this.cache = {}
    }
    add(key, value, rules) {
      this.cache[key] || (this.cache[key] = [])
      for (let rule of rules) {
        let verifyArr = rule.verify.split(':')
        let errMsg = rule.errMsg
        this.cache[key].push(() => {
          let verify = verifyArr.shift()
          verifyArr.unshift(value)
          verifyArr.push(errMsg)
          return vrertifyRules[verify].apply(key, verifyArr)
        })
      }
      return this
    }
    keyValidator(key) {
      var verifyFnArr = this.cache[key]
      for (var i = 0; i < verifyFnArr.length; i++) {
        let err = verifyFnArr[i]()
        if (err) {
          return err
        }
      }
    }
    start() {
      var errMsg = {}
      for (let key in this.cache) {
        var verifyFnArr = this.cache[key]
        for (var i = 0; i < verifyFnArr.length; i++) {
          let err = verifyFnArr[i]()
          if (err) {
            errMsg[key] = err
            break;
          }
        }
      }
      return errMsg
    }
  }

  var validatorFunc = function () {
    const data = getFromData()
    let validator = new Validator()
    validator
      .add('companyName', data.companyName, [
        { verify: 'isNonEmpty', errMsg: '公司名称不能为空' },
        { verify: 'maxLength:50', errMsg: '长度不能超过50' }
      ])
      .add('companyContactPerson', data.companyContactPerson, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'maxLength:10', errMsg: '长度不能超过10' },
      ])
      .add('companyPersonalPhone', data.companyPersonalPhone, [
        { verify: 'isNonEmpty', errMsg: '不能为空' },
        { verify: 'maxLength:10', errMsg: '长度不能超过100' },
      ])
      .add('companyPictureList', data.companyPictureList, [
        { verify: 'minLength:1', errMsg: '请选择公司资质照片' }
      ])
    let msg = validator.start()
    return msg
  }
























})();









