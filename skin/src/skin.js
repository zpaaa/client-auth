import { upload } from './skin-upload'
import { headSwitch, getLoginState } from '../utils/common'
headSwitch()
getLoginState(window.location.host)
upload(1, 1)