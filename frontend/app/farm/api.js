import { get } from 'utils/request'
import { v1 } from 'api'


function farm(uri) {
  return v1(`/farm${uri}`)
}
