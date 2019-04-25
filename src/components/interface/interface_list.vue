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
          <el-button @click="del_interface(scope.row.id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-style">
      <el-pagination
        background
        v-if="page.total !== 0"
        :page-size="page.page_size"
        :current-page="page.current" @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="page.total">

      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {delete_interface} from "../../requests/interfaces";

  export default {
    props:['interfaces','service_id'],
    data() {
      return {
        page: {
          total:0,
          page_size:10,
          current:1,
        },
      }
    },
    created(){
      this.page.total=this.interfaces.length;
      this.page.current=1;
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
        let ret=[];
        for (let i=0;i<this.interfaces.length;i++){
          ret.push(this.interfaces[i])
        }
        return ret;
      }
    },
    watched:{
      interfaces:function () {
        this.page.total=this.interfaces.length
        this.page.current=1;
      }
    },
    methods:{
      create_interface(){
        console.log("创建接口");
        console.log(this.service_id);
        window.open('/add/interface?service='+this.service_id);
      },
      edit_interface(interface_id){
        console.log("编辑接口");
        console.log(interface_id);
        window.open('/edit/interface?service='+this.service_id+"&interface="+interface_id);
      },
      del_interface(interface_id) {
        this.$confirm('此操作将永久删除接口, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delete_interface(interface_id).then(data => {
            console.log("删除接口",interface_id)
            if (data.success === 'true') {
              this.$message.success("删除成功")
              this.$emit('update',{})
            } else {
              this.$message.error(data.message)
            }
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        })
      },
      handleCurrentChange(val){
        console.log(`当前页: ${val}`);
      }
    },
    watch:{
      interfaces:function () {
        this.page.total=this.interfaces.length;


      }
    }
  }
</script>
<style scoped>
  .page-style {
    text-align: right;
  }
</style>
