import request from '@/utils/request'

// 国家列表
export function netCountries() {
  return request({
    url: 'countries',
    method: 'GET'
  })
}
// 国家新增
export function netCountrySave(data) {
  return request({
    url: 'country/save',
    data,
    method: 'PUT'
  })
}

// 省份列表
export function netStates() {
  return request({
    url: 'states',
    method: 'GET'
  })
}
// 省份新增
export function netStateSave(data) {
  return request({
    url: 'state/save',
    data,
    method: 'PUT'
  })
}

// 城市列表
export function netCities() {
  return request({
    url: 'cities',
    method: 'GET'
  })
}
// 城市新增
export function netCitySave(data) {
  return request({
    url: 'city/save',
    data,
    method: 'PUT'
  })
}

// 区列表
export function netDistrict() {
  return request({
    url: 'district',
    method: 'GET'
  })
}
// 区新增
export function netDistrictSave(data) {
  return request({
    url: 'district/save',
    data,
    method: 'PUT'
  })
}