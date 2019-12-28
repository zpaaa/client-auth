import '../style/look-upload.scss';
import '../style/common/agree.scss';
console.log('pinyin');

import { Validator, renderLogin } from '../utils/utils';
import { uploadWorks } from '../utils/api'
import { Agree } from '../utils/agree';

(function () {

  const urlobj = {};
  location.search.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (obj[k] = v));


  if (urlobj.type == 1) {
    var str = ` <div class="title">皮肤</div>
    <div class="form-item" id="display-name">
      <div class="form-item-box align-top">
        <div class="form-item_title is-required">
          <span>皮肤名称 <b>（不超过20个汉字或字符）</b></span>
        </div>
        <div class="form-item_input">
          <input type="text" class="input">
        </div>
        <div class="error-msg">
        </div>
      </div>
    </div>

    <div class="form-item introduce-form-item" id="description">
      <div class="form-item-box align-top">
        <div class="form-item_title is-required">
          <span>皮肤描述<b>（不超过100个汉字或字符）</b></span>
        </div>
        <div class="form-item_input">
          <textarea cols="30" rows="10" class="textarea"></textarea>
        </div>
        <div class="error-msg">
        </div>
      </div>
    </div>

    <div class="form-item" id="upload-file">
      <div class="form-item-box align-top">
        <div class="form-item_title is-required">
          <span>文件 <b>（您的扩展包，只支持zip或ssf，不超过100M）</b></span>
        </div>
        <div class="form-item_input">
          <button type="button" class="button" id="upload-btn">上传文件</button>
          <input type="file" style="display: none;"  accept="application/zip">
          <span id="file" class="upload-pic-list"></span>
          <span id="uploadList" class="upload-pic-list">
          </span>
        </div>
        <div class="error-msg">
        </div>
      </div>
    </div>

    <div class="form-item agree" id="agree">
      <div class="form-item-box align-top">
        <label>
          <span class="checkbox">
            <span class="checkbox-input">
              <span class="checkbox-input_inner"></span>
              <input type="checkbox">
            </span>
            <span class="checkbox-label">
              我同意<b>《作者协议》</b>
            </span>
          </span>
        </label>
        <div class="error-msg">
        </div>
      </div>
    </div>

    <div class="form-item" id="submit">
      <button class="submit-btn button" id="submit" type="button">立即提交</button>
    </div>`
    $('#main').html(str)

  } else {
    var str = ` <div class="title">表情</div>
    <div class="form-item" id="display-name">
      <div class="form-item-box align-top">
        <div class="form-item_title is-required">
          <span>表情名称 <b>（不超过20个汉字或字符）</b></span>
        </div>
        <div class="form-item_input">
          <input type="text" class="input">
        </div>
        <div class="error-msg">
        </div>
      </div>
    </div>

    <div class="form-item introduce-form-item" id="description">
      <div class="form-item-box align-top">
        <div class="form-item_title is-required">
          <span>表情介绍<b>（不超过100个汉字或字符）</b></span>
        </div>
        <div class="form-item_input">
          <textarea cols="30" rows="10" class="textarea"></textarea>
        </div>
        <div class="error-msg">
        </div>
      </div>
    </div>

    <div class="form-item" id="upload-file">
      <div class="form-item-box align-top">
        <div class="form-item_title is-required">
          <span>文件 <b>（您的扩展包，只支持png、jgp、zip，不超过1M）</b></span>
        </div>
        <div class="form-item_input">
          <button type="button" class="button" id="upload-btn">上传文件</button>
          <input type="file" style="display: none;"  accept="application/zip">
          <span id="file" class="upload-pic-list"></span>
          <span id="uploadList" class="upload-pic-list">
          </span>
        </div>
        <div class="error-msg">
        </div>
      </div>
    </div>

    <div class="form-item agree" id="agree">
      <div class="form-item-box align-top">
        <label>
          <span class="checkbox">
            <span class="checkbox-input">
              <span class="checkbox-input_inner"></span>
              <input type="checkbox">
            </span>
            <span class="checkbox-label">
              我同意<b>《作者协议》</b>
            </span>
          </span>
        </label>
        <div class="error-msg">
        </div>
      </div>
    </div>

    <div class="form-item" id="submit">
      <button class="submit-btn button" id="submit" type="button">立即提交</button>
    </div>`
    $('#main').html(str)
  }
















  var fileList = []
  function uploadVali() {
    var uploadValidator = new Validator()
    var data = getData()
    uploadValidator
      .add('display-name', data.displayName, [
        { verify: 'isNonEmpty', errMsg: '名称不能为空' },
        { verify: 'maxLength:20', errMsg: '长度不能超过20个汉字或字符' }
      ])
      .add('description', data.description, [
        { verify: 'isNonEmpty', errMsg: '描述不能为空' },
        { verify: 'maxLength:100', errMsg: '长度不能超过100个汉字或字符' },
      ])
      .add('upload-file', data.file, [
        { verify: 'minLength:1', errMsg: '请上传文件' },
        { verify: 'fileSize:20', errMsg: '文件大小不能超过20M' },
        { verify: 'fileType:["zip","ssf"]', errMsg: '文件类型只能为Zip' },
      ])
    /* 1为皮肤 */
    if (urlobj.type == 1) {
      uploadValidator.add('upload-file', data.file, [
        { verify: 'minLength:1', errMsg: '请上传文件' },
        { verify: 'fileSize:1', errMsg: '文件大小不能超过1M' },
        { verify: 'fileType:["zip","ssf"]', errMsg: '文件类型只能为Zip' },
      ])
    } else {
      uploadValidator.add('upload-file', data.file, [
        { verify: 'minLength:1', errMsg: '请上传文件' },
        { verify: 'fileSize:20', errMsg: '文件大小不能超过20M' },
        { verify: 'fileType:["png","jgp"，"zip"]', errMsg: '文件类型只能为png、jgp、zip' },
      ])

    }

    return uploadValidator
  }

  function getData() {
    var data = {}
    data.type = $('#type .is-checked input').val()
    data.displayName = $('#display-name input').val()
    data.description = $('#description textarea').val()
    data.file = fileList[0]
    return data
  }

  function valiChangeEvent(el, key) {
    el.on('change', function () {
      var msg = uploadVali().keyValidator(key)
      if (msg) {
        $(this).parents('.form-item').addClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html(msg)
      } else {
        $(this).parents('.form-item').removeClass('is-error')
        $(this).parents('.form-item').find('.error-msg').html("")
      }
    })
  }
  function uploadEvent() {
    // 上传事件
    $('#upload-file [type="file"]').on('change', function () {
      fileList = Array.prototype.slice.call($(this)[0].files, 0)
      renderFileList($('#upload-file #uploadList'))
    })
    // 点击事件
    $('#upload-file [type="button"]').on('click', function () {
      $('#upload-file [type="file"]').click()
    })

    /* 点击图片的删除 */
    $('#upload-file #uploadList').on('click', 'i', function () {
      var index = $(this).attr('data-index')
      fileList = []
      $('#upload-file input').val('')
      renderFileList($('#upload-file #uploadList'))
    })
  }
  function renderFileList(el) {
    const item = fileList[0]
    let str
    !item ? str = '' : str = `<span class="file-box" >
                  <span class="file-name" title="${item.name}" >${item.name.split('.')[0]}</span><b>.${item.name.split('.')[1]}</b>
                  <i data-index="0"></i>
                </span>`
    el.html(str)
  }

  function checkboxEvent() {
    $('#type').on('click', '.radio', function (e) {
      if ($(e.target).is('input')) {
        return
      }
      $(this).addClass('is-checked').parent().siblings().find('.radio').removeClass('is-checked')

    })

  }

  function agreeEvent() {
    /* 统一的勾选统一按钮 */
    $('#agree').on('click', '.checkbox-input', function (e) {
      if ($(e.target).is("input")) {
        return
      }
      var oCheckbox = $(this).parent('.checkbox')
      oCheckbox.hasClass('is-checked') ? oCheckbox.removeClass('is-checked') : oCheckbox.addClass('is-checked'); $('#agree .error-msg').html('')
    })

    $('#agree').on('click', 'b', function () {
      new Agree()
    })

  }

  function submitEvent() {
    /* 点击上传按钮 */
    $('#submit').on('click', function () {
      var agree = $('#agree .checkbox').hasClass('is-checked')
      if (agree) {
        var uploadValidator;
        var errObj;
        uploadValidator = uploadVali()
        errObj = uploadValidator.start()
        console.log(errObj)
        if (JSON.stringify(errObj) !== '{}') {
          for (var id in errObj) {
            $('#' + id).addClass('is-error')
            $('#' + id + ' ' + '.error-msg').html(errObj[id])
          }

        } else {
          var data = getData()
          uploadWorks(data).then(function (res) {
            if (res.response.code === 2000) {
              location.href = './user.html'
            }
          }).catch(function (err) {
            console.log(err)
          })
        }
      } else {
        $('#agree .error-msg').html('请先勾选作者协议')
      }
    });
  }


  function init() {
    renderLogin($('#userInfo'))
    uploadEvent()
    agreeEvent()
    submitEvent()
    checkboxEvent()
    valiChangeEvent($('#display-name input'), 'display-name')
    valiChangeEvent($('#description textarea'), 'description')
    valiChangeEvent($('#upload-file input'), 'upload-file')
  }

  init();



}());

// import { headSwitch, getLoginState } from '../utils/common'
// export function upload (project, type) {
//   headSwitch()
//   getLoginState()
//   init()
//   var fileList = []








