import { upload } from './extension-upload'
import { headSwitch, getLoginState } from '../utils/common'
headSwitch()
getLoginState(window.location.hostname)
upload()
console.log('extension')