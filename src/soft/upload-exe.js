

import './upload-exe.scss';

(function () {

  function initRadioEvent() {
    $('#radioChange').on('click', 'label', function (e) {
      if ($(e.target).is("input")) {
        return
      }
      $(this).find('.radio').addClass('is-checked')
      $(this).siblings().find('.is-checked').removeClass('is-checked')
    })
  }

  initRadioEvent()







})();







