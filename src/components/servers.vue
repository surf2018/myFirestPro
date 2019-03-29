<template>
<div class="services-main">
  <div class="services-tree">
    <el-button type="primary" size="small" @click="create_root_server">创建根服务</el-button>
    <el-tree
      class="tree-padding"
      :data="services_tree"
      :props="default_props"
      node-key="id"
      default-expand-all
      :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item icon="el-icon-plus" :command="{'ops':'add','data':data}">创建</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus" :command="{'ops':'edit','data':data}">编辑</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline" :command="{'ops':'del','data':data}">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </span>
    </el-tree>
  </div>

  <div class="interface-tree">
    context
  </div>

  <el-dialog
    :title="this.add_service.title"
    :visible.sync="this.add_service.dialogVisible"
    width="30%">
    <el-form ref="add_service" :model="add_service" label-width="80px" :rules="add_service_rules" >
      <el-form-item label="父节点" prop="parent" v-if="add_service.parent!==0">
          {{ add_service.parent_name}}
      </el-form-item>
      <el-form-item label="服务名">
        <el-input v-model="add_service.name" prop="name"></el-input>
      </el-form-item>
      <el-form-item label="服务描述">
        <el-input type="textarea" v-model="add_service.desc" prop="desc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="cancel_dialog">取 消</el-button>
    <el-button type="primary" @click="submit_service">创建</el-button>
  </span>
  </el-dialog>
</div>
</template>
    <script>
      import {create_service,update_service,get_service,del_service} from "@/requests/servers";

      export default {
        data() {
          return {
            services_tree: [],
            default_props: {
              children: 'children',
              label: 'name'
            },
            add_service: {
              title:"创建根服务",
              dialogVisible:false,
              name:"",
              desc:"",
              parent:0,
              mod:'add',
              id:-1,
              parent_name:''

            },
            add_service_rules:{
              name: [
                { required: true, message: '输入服务名', trigger: 'blur' },
                { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
              ],
              desc: [
                { required: true, message: '请输入描述', trigger: 'blur' }
              ],
            }
          }
        },
        created(){
          this.get_services_fun();
        },
        methods: {
          get_services_fun(){
            get_service().then(data => {
              if(data.success=== 'true'){
                this.services_tree=data.data
              }
              else{
                this.$message.error(data.message)
              }
            })
          },
          handleNodeClick(data) {
            console.log(data);
          },
          cancel_dialog() {
              this.add_service.dialogVisible=false
          },
          handleCommand(command) {
            // this.$message('click on item ' + command);
            let ops=command.ops
            let data=command.data;
            if(ops=="add"){
              console.log("增加child server")
              this.create_child_server(data)

            }
            else if(ops=="edit"){
              console.log("编辑service")

            }
            else{
              console.log("删除servvice")
            }


          },
          create_root_server() {
              this.add_service.title = "创建服务",
              this.add_service.dialogVisible=true,
              this.add_service.name="",
              this.add_service.desc="",
              this.add_service.parent=0,
              this.add_service.id=-1
              this.add_service.parent_name=""
          },
          create_child_server(data){
              this.add_service.title = "创建子服务",
              this.add_service.dialogVisible=true,
              this.add_service.name="",
              this.add_service.desc="",
              this.add_service.parent=data.id,
              this.add_service.id=-1
              this.add_service.parent_name=""
          },

          submit_service(){
            this.$refs.add_service.validate((valid) =>{
              if(valid) {
                if (this.add_service.mod === 'add') {
                  this.add_service_fun()
                  this.add_service.dialogVisible=false
                } else {
                  this.edit_service()
                }
              }
              else{
                  console.log("submit error")
                  return false
                }
            })
          },
          add_service_fun(){
            create_service(this.add_service.name,this.add_service.desc, this.add_service.parent).then(data =>{
              console.log(data.success)
              if(data.success === 'true'){
                console.log("显示sevice tree")
                  this.get_services_fun()
                }
                else{
                  this.$message.error(data.message)
                  return false
                }
            })
          },
          edit_service(){
            update_service(this.add_service.id,this.add_service.name,this.add_service.desc,this.add_service.parent).then(data=>{
                if(data.success===true){

                }
            })
          }

        }
      };
    </script>
    <!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .services-main {
    display: flex;
  }
  .services-tree {
    width: 25%;
    border-right: solid 1px #e6e6e6;
    padding: 10px 10px 0 5px;
    min-height: 500px;
    margin-top:-150px;
  }
  .tree-padding {
    padding-top: 20px;
  }
  .interface-tree {
    width: 75%;
    padding: 10px 5px 0 10px;
  }
</style>
