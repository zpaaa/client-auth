import { upload } from './skin-upload'
import { headSwitch, getLoginState } from '../common'
headSwitch()
getLoginState(window.location.host)
upload(1, 1)