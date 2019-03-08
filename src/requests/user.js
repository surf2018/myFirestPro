import {put_code,post_code,get_code} from "./common";

export const login = function (name,password) {
  return put_code('user/usr/',{"username":name,"password":password})
};

export const register = function(name,passwd){
  return post_code('user/usr/',{"username":name,"password":passwd})
};

export const get_user = function(){
  return get_code('user/usr/')

};
