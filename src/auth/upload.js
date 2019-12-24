
import './upload.scss'
(function () {
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
    rightLength: function (value, length, errorMsg) {
      return value.length = length ?
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
      var verifyFnArr = this.cache[key] || []
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


  var fileList = []

  function conpanyVali() {
    var conpanyValidator = new Validator()
    var data = company.getData()
    conpanyValidator
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
    return conpanyValidator
  }

  var company = {
    initEvent: function () {
      /* 切换用户单选框 */
      $('#userType').on('click', 'label', function (e) {
        if ($(e.target).is("input")) {
          return
        }
        console.log('切换userType')
        $(this).find('.radio').addClass('is-checked')
        $(this).siblings().find('.is-checked').removeClass('is-checked')
        var userType = $('#userType .is-checked input').val()
        console.log(userType)
        if (userType === '1') {
          $('#person').css({ display: 'block' })
          $('#company').css({ display: 'none' })
        } else {
          $('#person').css({ display: 'none' })
          $('#company').css({ display: 'block' })
        }
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
        fileList.concat(Array.prototype.slice.call($('#companyPictureList [type="file"]')[0].files))

      })
      /* 点击图片的删除 */
      $('#uploadList').on('click', 'i', function () {
        var index = $(this).attr('data-index')
        fileList.splice(index, 1)
        company.renderFilelist()
      })

    },
    initChangeEvent: function () {
      $('#companyPictureList [type="file"]').on('change', function () {
        fileList = fileList.concat(Array.prototype.slice.call($(this)[0].files))
        company.renderFilelist()
      })
      $('#companyName input').on('change', function () {
        var conpanyValidator = conpanyVali()
        var msg = conpanyValidator.keyValidator('companyName')
        if (msg) {
          $(this).parents('.form-item').addClass('is-error')
          $(this).parents('.form-item').find('.error-msg').html(msg)
        }
      })
      $('#companyContactPerson input').on('change', function () {
        var conpanyValidator = conpanyVali()
        var msg = conpanyValidator.keyValidator('companyContactPerson')
        if (msg) {
          $(this).parents('.form-item').addClass('is-error')
          $(this).parents('.form-item').find('.error-msg').html(msg)
        }
      })
      $('#companyPersonalPhone input').on('change', function () {
        var conpanyValidator = conpanyVali()
        var msg = conpanyValidator.keyValidator('companyPersonalPhone')
        if (msg) {
          $(this).parents('.form-item').addClass('is-error')
          $(this).parents('.form-item').find('.error-msg').html(msg)
        }
      })
      $('#companyPictureList input').on('change', function () {
        var conpanyValidator = conpanyVali()
        var msg = conpanyValidator.keyValidator('companyPictureList')
        if (msg) {
          $(this).parents('.form-item').addClass('is-error')
          $(this).parents('.form-item').find('.error-msg').html(msg)
        }
      })
    },
    renderFilelist: function () {
      var str = '';
      $.each(fileList, function (index, item) {
        str += `<span class="file-box" >
                  <span class="file-name" title="${item.name}" >${item.name.split('.')[0]}</span><b>.${item.name.split('.')[1]}</b>
                  <i data-index="${index}"></i>
                </span>`
      })
      $('#uploadList')[0].innerHTML = str
    },
    getData: function () {
      var data = {}
      // var fileList = []
      data.userType = $('#userType .is-checked input').val()
      data.companyName = $('#companyName input').val()
      data.companyContactPerson = $('#companyContactPerson input').val()
      data.companyPersonalPhone = $('#companyPersonalPhone input').val()
      data.email = $('#email input').val()
      data.phone = $('#phone input').val()
      data.companyIntroduction = $('#companyIntroduction textarea').val()
      data.companyPictureList = fileList
      return data
    }
  }
  /* 公司  */
  company.initEvent()
  company.initChangeEvent()






  function personVali() {
    var conpanyValidator = new Validator()
    var data = person.getData()
    conpanyValidator
      .add('userName', data.userName, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'maxLength:50', errMsg: '长度不能超过50' }
      ])
      .add('idNumber', data.idNumber, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'rightLength:18', errMsg: '身份证必须为18位' },
      ])
      .add('idCardHandHeld', data.idCardHandHeld, [
        { verify: 'minLength:1', errMsg: '必须上传手持身份证照片' },
      ])
      .add('idCardFront', data.idCardFront, [
        { verify: 'minLength:2', errMsg: '必须上传手持身份证正反面' }
      ])
    return conpanyValidator
  }




  var idCardHandHeldList = []
  var idCardFrontList = []

  /* 个人 */
  var person = {
    initEvent: function () {
      $('#idCardHandHeld [type="button"]').on('click', function () {
        console.log('上传身份证信息')
        $('#idCardHandHeld [type="file"]').click()
      })
      $('#idCardFront [type="button"]').on('click', function () {
        $('#idCardFront [type="file"]').click()
      })
      /* 点击图片的删除 */
      $('#idCardHandHeldUploadList').on('click', 'i', function () {
        var index = $(this).attr('data-index')
        idCardHandHeldList.splice(index, 1)
        person.render(idCardHandHeldList, 'idCardHandHeldUploadList')
      })
      $('#idCardFrontUploadList').on('click', 'i', function () {
        var index = $(this).attr('data-index')
        idCardFrontUploadList.splice(index, 1)
        person.render(idCardHandHeldList, 'idCardFrontUploadList')
      })
    },
    inintChangeEvent: function () {
      $('#idCardHandHeld [type="file"]').on('change', function () {
        idCardHandHeldList = idCardHandHeldList.concat(Array.prototype.slice.call($(this)[0].files))
        person.render(idCardHandHeldList, 'idCardHandHeldUploadList')
      })
      $('#idCardFront [type="file"]').on('change', function () {
        idCardFrontList = idCardFrontList.concat(Array.prototype.slice.call($(this)[0].files))
        console.log(idCardFrontList, 'sssssssssssssss')
        person.render(idCardHandHeldList, 'idCardFrontUploadList')
      })

      $('#userName input').on('change', function () {
        var conpanyValidator = personVali()
        var msg = conpanyValidator.keyValidator('userName')
        if (msg) {
          $(this).parents('.form-item').addClass('is-error')
          $(this).parents('.form-item').find('.error-msg').html(msg)
        }
      })
      $('#idNumber input').on('change', function () {
        var conpanyValidator = personVali()
        var msg = conpanyValidator.keyValidator('idNumber')
        if (msg) {
          $(this).parents('.form-item').addClass('is-error')
          $(this).parents('.form-item').find('.error-msg').html(msg)
        }
      })
      $('#idCardHandHeld input').on('change', function () {
        var conpanyValidator = personVali()
        var msg = conpanyValidator.keyValidator('idCardHandHeld')
        if (msg) {
          $(this).parents('.form-item').addClass('is-error')
          $(this).parents('.form-item').find('.error-msg').html(msg)
        }
      })
      $('#idCardFront input').on('change', function () {
        var conpanyValidator = personVali()
        var msg = conpanyValidator.keyValidator('idCardFront')
        if (msg) {
          $(this).parents('.form-item').addClass('is-error')
          $(this).parents('.form-item').find('.error-msg').html(msg)
        }
      })

    },
    render: function (data, id) {
      var str = ''
      $.each(data, function (index, item) {
        str += `<span class="file-box" >
                  <span class="file-name" title="${item.name}" >${item.name.split('.')[0]}</span><b>.${item.name.split('.')[1]}</b>
                  <i data-index="${index}"></i>
                </span>`
      })
      // console.log(`#${id}`,str)
      $(`#${id}`).html(str)
    },
    getData: function () {
      var data = {}
      data.userType = $('#userType .is-checked input').val()
      data.userName = $('#userName input').val()
      data.idNumber = $('#idNumber input').val()
      data.idCardHandHeld = idCardHandHeldList
      data.idCardFront = idCardFrontList
      data.phone = $('#PersonPhone input').val()
      data.email = $('#personEmail input').val()
      return data
    }
  }


  person.initEvent()
  person.inintChangeEvent()



  /* 点击上传按钮 */
  $('#submit').on('click', function () {
    var agree = $('#agree .checkbox').hasClass('is-checked')
    if (agree) {
      const userType = $('#userType .is-checked input').val()
      var conpanyValidator;
      var errObj;
      if (userType === '1') {
        conpanyValidator = personVali()
        errObj = conpanyValidator.start()
      } else {
        conpanyValidator = conpanyVali()
        errObj = conpanyValidator.start()
      }
      if (JSON.stringify(errObj) !== '{}') {
        for (var id in errObj) {
          if (id === 'phone' && userType === '1') {
            id = 'PersonPhone'
          }
          if (id === 'email' && userType === '1') {
            id = 'personEmail'
          }
          $('#' + id).addClass('is-error')
          $('#' + id + ' ' + '.error-msg').html(errObj[id])
        }
      }



    } else {
      $('#agree .error-msg').html('请先勾选作者协议')
    }
  });
































})();









