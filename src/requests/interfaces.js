import {put_code,post_code,get_code,del_code} from "./common_servers";
const interface_url='interfaces/imp/';


//更新接口
export const update_interface = function (interface_id,name,desp,parent) {
  return put_code(interface_url+interface_id,{"name":name,"description":desp,"parent":parent})
};
//创建接口
export const create_interface= function(){
  return post_code(interface_url,{"name":name,"description":desp,"parent":parent})
};

export const get_interfaces = function(){
  return get_code(interface_url)

};
export const del_interface = function(interface_id){
  return del_code(interface_url+interface_id)

};
export const get_interface=function (interface_id) {
  return get_code(interface_url+interface_id)

}
