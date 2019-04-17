<template>
  <div  class="interface-main-body">
    <h3 class="interface-title">{{title}}</h3>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" class="demo-rule_form">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="名称"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input type="textarea" v-model="form.description" placeholder="描述"></el-input>
      </el-form-item>
      <el-form-item label="域名" prop="host">
        <el-input v-model="form.host" placeholder="域名"></el-input>
      </el-form-item>
      <el-form-item label="URL" prop="url">
        <el-input v-model="form.url" placeholder="url"></el-input>
      </el-form-item>
      <el-form-item label="方法">
        <el-select v-model="form.method" placeholder="请选择方法">
          <el-option label="GET" value="GET"></el-option>
          <el-option label="POST" value="POST"></el-option>
          <el-option label="DELETE" value="DELETE"></el-option>
          <el-option label="PUT" value="PUT"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="头部" prop="header">
        <editor v-model="header" @init="editor_init"
                lang="json" theme="chrome" width="100%" height="150"></editor>
      </el-form-item>

      <el-form-item label="参数" prop="parameter">
        <el-radio-group v-model="form.parameter_type">
          <el-radio label="json"></el-radio>
          <el-radio label="form"></el-radio>
        </el-radio-group>
        <editor v-if="'json' === form.parameter_type" v-model="json_parameter" @init="editor_init"
                lang="json" theme="chrome" width="100%" height="200"></editor>

        <div v-else>
          <el-button size="small" type="primary" @click="add_form_parameter">添加参数</el-button>
          <div class="parameter-form-body" v-for="(value, index) in form_parameter" :key="index">
            <div class="padding-common">
              <el-input v-model="value.key" placeholder="变量"></el-input>
            </div>
            <div class="padding-common">
              <el-input v-model="value.value" placeholder="值"></el-input>
            </div>
            <div class="padding-common">
              <el-select v-model="value.type" placeholder="请选择">
                <el-option label="整型" value="int"></el-option>
                <el-option label="浮点型" value="float"></el-option>
                <el-option label="字符串型" value="string"></el-option>
                <el-option label="布尔型" value="bool"></el-option>
              </el-select>
            </div>
            <div class="delete-bt">
              <i class="el-icon-delete" @click="delete_form_parameter(index)"></i>
            </div>
          </div>
        </div>

      </el-form-item>
      <el-form-item label="响应" prop="response">
        <el-radio-group v-model="form.response_type">
          <el-radio label="json"></el-radio>
          <el-radio label="text"></el-radio>
        </el-radio-group>
        <editor v-if="'json' === form.response_type" v-model="json_response" @init="editor_init"
                lang="json" theme="chrome" width="100%" height="200"></editor>

        <el-input v-else type="textarea" v-model="text_response" rows="5"></el-input>
      </el-form-item>
      <el-form-item label="断言" prop="assertion">

        <el-button type="primary" size="small" @click="add_json_assertion">增加json断言</el-button>
        <div class="parameter-form-body" v-for="(value, index) in json_assertion" :key="index">
          <div class="padding-common">
            <el-input v-model="value.key" placeholder="关键字"></el-input>
          </div>
          <div class="padding-common">
            <el-input v-model="value.value" placeholder="内容"></el-input>
          </div>
          <div class="padding-common">
            <el-select v-model="value.type" placeholder="请选择">
              <el-option label="整型" value="int"></el-option>
              <el-option label="浮点型" value="float"></el-option>
              <el-option label="字符串型" value="string"></el-option>
              <el-option label="布尔型" value="bool"></el-option>
            </el-select>
          </div>
          <div class="padding-common">
            <el-select v-model="value.include" placeholder="请选择">
              <el-option label="包含" value="yes"></el-option>
              <el-option label="不包含" value="no"></el-option>
            </el-select>
          </div>
          <div class="delete-bt">
            <i class="el-icon-delete" @click="delete_json_assertion(index)"></i>
          </div>
        </div>

        <div>
          <el-button type="primary" size="small" @click="add_text_assertion">增加文本断言</el-button>
        </div>

        <div class="parameter-form-body" v-for="(value, index) in text_assertion" :key="index + 100000">
          <div class="padding-common">
            <el-input v-model="value.key" placeholder="内容"></el-input>
          </div>
          <div class="padding-common">
            <el-select v-model="value.include" placeholder="请选择">
              <el-option label="包含" value="yes"></el-option>
              <el-option label="不包含" value="no"></el-option>
            </el-select>
          </div>
          <div class="delete-bt">
            <i class="el-icon-delete" @click="delete_text_assertion(index)"></i>
          </div>
        </div>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit_form('rule_form')">{{-1 !== form.interface_id ? '更新':'创建'}}</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
    <script>
      export default {
        name:"edit_interface",
        components:{
          editor:require('vue2-ace-editor'),
        },
        data() {
          return {
            form: {
              name: '',
              description: '',
              method: 'GET',

              host: '',
              url: '',
              header: {},

              parameter_type: 'json',
              parameter: {},

              form_parameter: [],
              json_parameter: '{}',

              response_type: 'json',
              response: '{}',
              interface_id: -1,
              service_id: -1,
              assertion: [],
            },
            rules: {
              name: [
                {required: true, message: '请输入名称', trigger: 'blur'},
              ],
              method: [
                {required: true, message: '请选择请求方法', trigger: 'change'}
              ],
              description: [
                {required: false,}
              ],
              host: [
                {required: false}
              ],
              url: [
                {required: true, message: '请输入url', trigger: 'blur'}
              ],
              header: [
                {required: false}
              ]
            },
            title: "创建接口",
            header: '{}',
            json_parameter: '{}',

            text_response: '',
            json_response: '',

            json_assertion: [],
            text_assertion: [],
          }
        },
        methods: {
          onSubmit() {
            console.log('submit!');
          },
          editor_init(){
            require('brace/ext/language_tools'); //language extension prerequsite...
            require('brace/mode/json');
            require('brace/theme/chrome');
            require('brace/snippets/javascript') //snippet
          },
          add_form_parameter(){
            this.form_parameter.push({
                'key':'',
                'value':'',
                'type':'string'
            })
          }

        }
      }
    </script>

<style scoped>
  .page-style {
    text-align: right;
  }
</style>
