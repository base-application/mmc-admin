import { useUserStore } from '@/store/modules/user'
import request from '@/utils/request'


export function netUpload(data) {
  const userStore = useUserStore()
  return request({
    url: 'img/upload',
    headers: {
      "Content-Type": 'multipart/form-data',
      "Authorization": 'Bearer ' + userStore.getToken
    },
    method: 'POST',
    data
  })
}