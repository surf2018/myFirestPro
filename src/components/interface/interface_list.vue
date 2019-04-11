<template>
  <div>
    <el-button tyype="primary" @click="create_interface">创建接口</el-button>
    <el-table
      :data="page_data"
      style="width: 100%">
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        label="URL">
      </el-table-column>
      <el-table-column
        prop="method"
        label="方法">
      </el-table-column>
      <el-table-column
        prop="host"
        label="域名">
      </el-table-column>
      <el-table-column
        prop="ops"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="edit_interface(scope.row.id)" type="text" size="small">编辑</el-button>
          <el-button @click="edit_interface(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-style">
      <el-pagination
        background
        v-if="page.total!=0"
        :page-size="page.page_size"
        :current-page="page.current" @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="page.total">

      </el-pagination>
    </div>
    <el-dialog
      :title="this.add_interface.title"
      :visible.sync="this.add_service.dialogVisible"
      width="30%"
      @close="closeDialog">
      <el-form ref="add_service" :model="add_interface" label-width="80px" :rules="add_interface_rules" >
        <el-form-item label="父节点" prop="parent" v-if="add_service.parent!==0">
          {{ add_service.parent_name}}
        </el-form-item>
        <el-form-item label="接口名">
          <el-input v-model="add_service.name" prop="name"></el-input>
        </el-form-item>
        <el-form-item label="接口描述">
          <el-input type="textarea" v-model="add_service.desc" prop="desc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="cancel_dialog">取 消</el-button>
    <el-button type="primary" @click="submit_service">{{add_service.sub_name}}</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props:['interfaces','service_id'],
    data() {
      return {
        page: {
          total:0,
          page_size:10,
          current:1,
        },
        add_interface: {
          title: "创建根服务",
          dialogVisible: false,
          name: "",
          desc: "",
          parent: 0,
          mod: 'add',
          id: -1,
          parent_name: '',
          sub_name: '创建'

        },
        add_interface_rules: {
          name: [
            {required: true, message: '输入服务名', trigger: 'blur'},
            {min: 3, max: 200, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          desc: [
            {required: true, message: '请输入描述', trigger: 'blur'}
          ],
        },
      }
    },
    computed:{
      page_data: function () {
        let start=(this.page.current-1)*this.page.size;
        let end = this.page.total;
        if(this.page.total>this.page.current*this.page_size){
          end=this.page.current*this.page.page_size
        }else{
          end=this.page.total
        }



      }
    },
    methods:{
      create_interface(){
        console.log("创建接口")
      },
      handleCurrentChange(val){

      }
    }
  }
</script>
<style scoped>
  .page-style {
    text-align: right;
  }
</style>
