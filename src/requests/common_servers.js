import VueCookies from 'vue-cookies'
export const host = 'http://127.0.0.1:8000/';


export const post_code=function(url,params) {
  let data = JSON.stringify(params);
  let header={'token':VueCookies.get('token')}
  return fetch(host + url, {
    method: 'POST',
    body: data,
    headers:header,
    credentials:"include"
  }).then(response => {
    return response.json()
  })
};

export const put_code=function(url,params) {
  let data = JSON.stringify(params);
  let header={'token':VueCookies.get('token')}
  return fetch(host + url, {
    method: 'PUT',
    body: data,
    headers:header,
    credentials:"include"
  }).then(response => {
    return response.json()
  })
};

export const get_code=function (url) {
  let header={'token':VueCookies.get('token')}
  return fetch(host+url,{
    method:'GET',
    headers:header,
    credentials:"include"
  }).then(response => {
      return response.json()
  })

};

export const del_code=function (url) {
  let header={'token':VueCookies.get('token')}
  return fetch(host+url,{
    method:'GET',
    headers:header,
    credentials:"include"
  }).then(response => {
    return response.json()
  })

};


