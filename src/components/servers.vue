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
        <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item icon="el-icon-plus">创建</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus">编辑</el-dropdown-item>
          <el-dropdown-item icon="el-icon-circle-plus-outline">删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      </span>
    </el-tree>
  </div>

  <div class="interface-tree">
    context
  </div>

  <el-dialog
    :title="this.create_service.title"
    :visible.sync="this.create_service.dialogVisible"
    width="30%"
    :before-close="handleClose">
    <el-form ref="create_service" :model="create_service" label-width="80px" :rules="create_service_rules" >
      <el-form-item label="父节点" prop="parent" v-if="create_service.parent!==0">
          {{ create_service.parent}}
      </el-form-item>
      <el-form-item label="服务名">
        <el-input v-model="create_service.name" prop="name"></el-input>
      </el-form-item>
      <el-form-item label="服务描述">
        <el-input type="textarea" v-model="create_service.desc" prop="desc"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">创建</el-button>
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
              label: 'label'
            },
            create_service: {
              title:"创建服务",
              dialogVisible:false,
              name:"",
              desc:"",
              parent:0,

            },
            create_service_rules:{
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
        methods: {
          handleNodeClick(data) {
            console.log(data);
          },
          create_root_server() {
              this.create_service.title = "创建服务",
              this.create_service.dialogVisible=true,
              this.create_service.name="",
              this.create_service.desc="",
              this.create_service.parent=0
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
