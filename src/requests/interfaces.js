import {put_code,post_code,get_code,del_code} from "./common_servers";
const interface_url='interfaces/imp/';


//更新接口
export const update_interface = function (interface_id,data) {
  return put_code(interface_url+interface_id,data)
};
//创建接口
export const create_interface= function(data){
  return post_code(interface_url,data)
};
//获取接口
export const get_interfaces = function(){
  return get_code(interface_url)
};
//删除接口
export const del_interface = function(interface_id){
  return del_code(interface_url+interface_id)

};

