import { upload } from './skin-upload'
import { headSwitch, getLoginState } from '../utils/common'
headSwitch()
getLoginState(window.location.hostname)
upload()
console.log('skin')