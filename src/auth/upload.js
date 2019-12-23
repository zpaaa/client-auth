
import './upload.scss'
  // import '../style/form.scss'
  ; (function () {
    $('#userType').on('click', 'label', function (e) {
      console.log('切换userType')
      if ($(e.target).is("input")) {
        return
      }
      $(this).find('.radio').addClass('is-checked')
      $(this).siblings().find('.is-checked').removeClass('is-checked')
    })


    var vrertifyRules = {
      isNonEmpty(value, errorMsg) {
        return value === '' ?
          errorMsg : void 0
      },
      minLength(value, length, errorMsg) {
        return value.length < length ?
          errorMsg : void 0
      },
      maxLength(value, length, errorMsg) {
        return value.length < length ?
          errorMsg : void 0
      },
      isMoblie(value, errorMsg) {
        return !/^1(3|5|7|8|9)[0-9]{9}$/.test(value) ?
          errorMsg : void 0
      },
      isEmail(value, errorMsg) {
        return !/^\w+([+-.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value) ?
          errorMsg : void 0
      }
    }
    class Validator {
      constructor() {
        this.cache = {}
      }
      add(key, rules) {
        this.cache[key] || (this.cache[key] = [])
        for (let rule of rules) {
          let verifyArr = rule.verify.split(':')
          let errMsg = rule.errMsg
          this.cache[key].push(() => {
            let verify = verifyArr.shift()
            verifyArr.unshift(dom.value)
            verifyArr.push(errMsg)
            return vrertifyRules[verify].apply(dom, verifyArr)
          })
        }
        return this
      }
      start() {
        let errMsg = {}
        for (let key in this.cache) {
          const verifyFnArr = this.cache[key]
          for (var i = 0; i < verifyFnArr.length; i++) {
            let err = verifyFnArr[i]()
            if (err) {
              errMsg = err
              break;
            }
          }
        }
        return errMsg
      }
    }


    var validatorFunc = function(){
      let validator = new Validator()
      validator.add('companyName',[
        {verify:'isNonEmpty',errMsg:'公司名称不能为空'},
        {verify:'maxLength:50',errMsg:'长度不能超过50'}
      ]).add('companyContactPerson',[
        {verify:'isNonEmpty',errMsg:'名称不能为空'},
        {verify:'maxLength:10',errMsg:'长度不能超过10'},
      ]).add('companyPersonalPhone',[
        {verify:'isNonEmpty',errMsg:'不能为空'},
        {verify:'maxLength:10',errMsg:'长度不能超过100'},
      ])
      let msg = validator.start()
      return msg
    }
    

    function getFromData(){
      var data = {}
      console.log($('#userType .is-required input'))
      data.userType = $('#userType .is-checked input').val()
      data.companyName = $('#companyName input').val()
      data.companyContactPerson = $('#companyContactPerson').val()
      data.companyPersonalPhone = $('#companyPersonalPhone input').val()
      console.log(data,'表单的value')
    }
    getFromData()















  })()



// class Validator {
//   constructor() {
//     this.cache = []
//   }
//   add(dom, rules) {
//     for (let rule of rules) {
//       let strategyArr = rule.strategy.split(':')  ////例如['minLength',6]
//       let errMsg = rule.errorMsg      ////'用户名不能为空'
//       this.cache.push(() => {
//         let strategy = strategyArr.shift()  ////用户挑选的strategy
//         strategyArr.unshift(dom.value)      //把input的value添加进去 此处是原生的写法 现在直接改为验证的key就可以
//         strategyArr.push(errMsg)    ////把errorMsg添加进参数列表，[dom.value,6,errorMsg]
//         return strategies[strategy].apply(dom, strategyArr)
//       })
//     }
//   }
//   start() {
//     for (let validatorFunc of this.cache) {
//       let errMsg = validatorFunc()
//       if (errMsg) {
//         return errMsg
//       }
//     }
//   }
// }







