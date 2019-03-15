import {put_code,post_code,get_code,del_code} from "./common_servers";
const server_url='servers/service'

export const update_service = function (name,desp) {
  return put_code('servers/service/',{"servername":name,"serverdesp":desp})
};

export const create_service = function(name,desp,parent){
  return post_code(server_url,{"name":name,"description":desp,"parent":parent})
};

export const get_service = function(){
  return get_code(server_url)

};
export const del_service = function(sid){
  return del_code('servers/service/')

};
