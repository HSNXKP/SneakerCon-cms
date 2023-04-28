<template>
    <div>
          <!--搜索-->
          <!-- <el-row>
              <el-col :span="8">
                  <el-input placeholder="请输入品牌" v-model="brandQueryInfo.name" :clearable="true" @clear="search" @keyup.native.enter="search" size="small" style="min-width: 500px">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                  </el-input>
              </el-col>
          </el-row> -->

          <el-form inline>
			<el-form-item >
                <el-input placeholder="请输入品牌" v-model="brandQueryInfo.name" :clearable="true" @clear="search" @keyup.native.enter="search" size="small" style="min-width: 400px">
                    <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                  </el-input>
			</el-form-item>
            <el-button  type="primary" icon="el-icon-plus" size="small" @click="openProductBrandVisble">添加品牌</el-button>
		</el-form>
  
          <el-table :data="brandList">
              <el-table-column label="序号" type="index" width="50"></el-table-column>
              <el-table-column label="id" prop="id" width="50"></el-table-column>
              <el-table-column label="品牌名称" prop="name"  show-overflow-tooltip></el-table-column>
              <el-table-column label="描述" prop="description" show-overflow-tooltip></el-table-column>
              <el-table-column label="图片地址" prop="image" show-overflow-tooltip></el-table-column>
              <el-table-column label="操作" width="200">
                  <template v-slot="scope">
                      <el-button type="primary" icon="el-icon-edit" size="mini" @click="goEditProductBrand(scope.row.id)">编辑</el-button>
                      <el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red" @onConfirm="deleteProductBrand(scope.row.id)">
                          <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
                      </el-popconfirm>
                  </template>
              </el-table-column>
          </el-table>
          <!--分页-->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="brandQueryInfo.pageNum"
                         :page-sizes="[10, 20, 30, 50]" :page-size="brandQueryInfo.pageSize" :total="total"
                         layout="total, sizes, prev, pager, next, jumper" background>
          </el-pagination>

          <!--添加标签对话框-->
		<el-dialog :title="this.visForm.id === '' ? '添加品牌' : '修改品牌信息'" width="50%" :visible.sync="dialogVisible" :close-on-click-modal="false" @close="cancelVisble">
			<!--内容主体-->
			<el-form :model="visForm"  :rules="formRules" ref="visFormRef" label-width="80px">
				<el-form-item label="品牌名称" prop="name">
					<el-input v-model="visForm.name"></el-input>
				</el-form-item>
                <el-form-item label="品牌描述" prop="description">
					<el-input v-model="visForm.description"></el-input>
				</el-form-item>
                <el-form-item label="品牌图址" prop="image">
					<el-input v-model="visForm.image"></el-input>
				</el-form-item>
			</el-form>
			<!--底部-->
			<span slot="footer">
				<el-button @click="cancelVisble">取 消</el-button>
				<el-button type="primary" @click="editProductBrand">确 定</el-button>
			</span>
		</el-dialog>
    </div>
  </template>
  
  <script>
  import Breadcrumb from "@/components/Breadcrumb";
      import {getAllProductBrand,updateProductBrand,deleteProductBrand,getProductBrand,addProductBrand} from '@/api/productBrand'
  
      export default {
          name: "ProductBrand",
          components: {Breadcrumb},
          data() {
              return {
                  brandList: [],
                  total: 0,
                  dialogVisible: false,
                  visForm: {
                        id: '',
                        name: '',
                        description: '',
                        image: '',
                        parentId:''
                  },
                  brandQueryInfo: {
                      parentId: '',
                      name: '',
                      pageNum: 1,
                      pageSize: 10
                  },
                  formRules: {
                      name: [
                          {required: true, message: '请输入品牌名称', trigger: 'blur'},
                          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
                      ],
                      description: [
                          {required: true, message: '请输入品牌描述', trigger: 'blur'},
                          {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
                      ],
                  }
              }
          },
          created() {
              this.getAllProductBrand()
          },
          methods: {
            getAllProductBrand() {
                  this.brandQueryInfo.parentId = -1
                  getAllProductBrand(this.brandQueryInfo).then(res => {
                      console.log(res.data)
                      this.brandList = res.data.list
                      this.total = res.data.total
                  })
              },
              search() {
                  this.brandQueryInfo.pageNum = 1
                  this.brandQueryInfo.pageSize = 10
                  this.getAllProductBrand()
              },
              //监听 pageSize 改变事件
              handleSizeChange(newSize) {
                  this.brandQueryInfo.pageSize = newSize
                  this.getAllProductBrand()
              },
              //监听页码改变的事件
              handleCurrentChange(newPage) {
                  this.brandQueryInfo.pageNum = newPage
                  this.getAllProductBrand()
              },
              goEditProductBrand(id) {
                getProductBrand(id).then(res => {
                    this.visForm = res.data
                    this.dialogVisible = true
                })
              },
              editProductBrand() {
                if(this.visForm.id === ''){
                    this.$refs.visFormRef.validate((valid) => {
                      if (valid) {
                        this.visForm.parentId = -1
                        addProductBrand(this.visForm).then(res => {
                              this.msgSuccess(res.msg)
                              this.cancelVisble()
                              this.getAllProductBrand()
                          })
                      } else {
                          this.msgError('表单验证失败')
                          return false
                      }
                  })
                }else{
                    this.$refs.visFormRef.validate((valid) => {
                      if (valid) {
                          updateProductBrand(this.visForm).then(res => {
                              this.msgSuccess(res.msg)
                              this.cancelVisble()
                              this.getAllProductBrand()
                          })
                      } else {
                          this.msgError('表单验证失败')
                          return false
                      }
                  })
                }
              },
              deleteProductBrand(id) {
                  this.$confirm('此操作将<strong style="color: red">永久删除该品牌</strong>，是否删除?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning',
                      dangerouslyUseHTMLString: true
                  }).then(() => {
                    deleteProductBrand(id).then(res => {
                          this.msgSuccess(res.msg)
                          this.getAllProductBrand()
                      })
                  }).catch(() => {
                      this.$message({
                          type: 'info',
                          message: '已取消删除'
                      })
                  })
              },
              openProductBrandVisble() {
                  this.resetForm()
                  this.dialogVisible = true
              },
              cancelVisble() {
                  this.dialogVisible = false
                  this.resetForm()
              },
              	// 清空表单
			 resetForm() {
				this.visForm = {
					id: '',
					name: '',
					description: '',
					image: '',
					parentId:''
				}
			},
          }
      }
  </script>
  
  <style scoped>
  .el-button + span {
          margin-left: 10px;
      }
  
      .el-form--inline .el-form-item {
		margin-bottom: 0;
	}
  </style>