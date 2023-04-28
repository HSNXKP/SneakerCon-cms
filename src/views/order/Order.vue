<template>
  <div>
    <!--搜索-->
    <el-form inline>
      <el-form-item label="选择订单时间">
        <DateTimeRangePicker :date="queryInfo.date" :setDate="setDate" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="el-icon-search" @click="search">搜索</el-button>
      </el-form-item>
    </el-form>
    <el-form inline>
			<el-form-item label="选择订单状态" size="small">
				<el-input  placeholder="请输入订单编号"  :clearable="true" @clear="searchCategory" @keyup.native.enter="searchCategory" size="small" style="min-width: 500px">
					<el-select  slot="prepend" placeholder="选择订单状态"  @change="searchBrand()"     style="width: 160px">
            <el-option>0</el-option>
            <el-option>1</el-option>
            <el-option>0</el-option>
            <el-option>1</el-option>
            <el-option>0</el-option>
            <el-option>1</el-option>
					</el-select>  
					<el-button slot="append" icon="el-icon-search" @click="searchCategory"></el-button>
				</el-input >
			</el-form-item>
		</el-form>

    <el-table :data="orderList "  row-key="id"  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column label="序号" type="index" width="50"></el-table-column>
      <el-table-column label="id" prop="id" width="50"></el-table-column>
      <el-table-column label="商品名称" prop="name" show-overflow-tooltip></el-table-column>
      <el-table-column label="图片地址">
        <template slot-scope="scope">
          <el-popover placement="right" width="360px" height="200px" trigger="hover" content="....">
            <div style="width: 380px;height: 200px;"><img style="width: 100%;height: 100%;"
                :src="scope.row.image" />
            </div>
            <div slot="reference" style="width: 65px;height: 36px;"><img style="width: 100%;height: 100%;"
                :src="scope.row.image" />
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column label="货号" prop="code" show-overflow-tooltip></el-table-column>
      <el-table-column label="尺码" prop="size" show-overflow-tooltip></el-table-column>
      <el-table-column label="单价" prop="price" show-overflow-tooltip></el-table-column>
      <el-table-column label="数量" prop="quantity" show-overflow-tooltip></el-table-column>
      <el-table-column label="总金额" prop="amount" show-overflow-tooltip></el-table-column>
      <el-table-column label="订单状态" prop="status" show-overflow-tooltip>
        <template slot-scope="scope">
         <el-tag  type="warning" v-if="scope.row.status == 0">待付款</el-tag>
         <el-tag  type="success" v-else-if="scope.row.status == 1">已支付</el-tag>
         <el-tag  type="info" v-else-if="scope.row.status == 2">已发货</el-tag>
         <el-tag  type="" v-else-if="scope.row.status == 3">已完成</el-tag>
         <el-tag  type="danger" v-else-if="scope.row.status == 4">已取消</el-tag>
      </template>
      </el-table-column>
      <el-table-column label="创建时间" width="180" prop="createTime" ></el-table-column> 
      <el-table-column label="订单编号" prop="orderNumber" show-overflow-tooltip></el-table-column>
      <!-- dateFormat('YYYY-MM-DD HH:mm:ss') -->
      <el-table-column label="操作" width="300">
        <template v-slot="scope">
          <el-button v-if="scope.row.status == 1"  type="success" icon="el-icon-truck" size="mini" @click="goEditOrder(scope.row.id)">发货</el-button>
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="goEditOrder(scope.row.id)">编辑</el-button>
          <el-popconfirm title="确定删除吗？" icon="el-icon-delete" iconColor="red"
            @onConfirm="deleteOrder(scope.row.id)">
            <el-button size="mini" type="danger" icon="el-icon-delete" slot="reference">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum"
      :page-sizes="[10, 20, 30, 50]" :page-size="queryInfo.pageSize" :total="total"
      layout="total, sizes, prev, pager, next, jumper" background>
    </el-pagination>

  </div>
</template>

<script>
import DateTimeRangePicker from "@/components/DateTimeRangePicker";
import Breadcrumb from "@/components/Breadcrumb";
import { getAllOrder,deleteOrder } from '@/api/order'

export default {
  name: 'Order',
  components: { DateTimeRangePicker, Breadcrumb },
  data() {
    return {
      queryInfo: {
        date: [],
        pageNum: 1,
        pageSize: 10
      },
      orderList: [],
      total: 0

    }
  },
  computed: {
  },
  created() {
    this.getAllOrder()
  },
  methods: {
    setDate(value) {
      this.queryInfo.date = value
    },
    search() {
      console.log('search')
    },
    getAllOrder() {
      getAllOrder(this.queryInfo).then(res => {
        this.orderList = res.data.list
        this.total = res.data.total
      })
    },
    goEditOrder(id) {
      this.$router.push({ path: '/order/edit', query: { id: id } })
    },
    deleteProductBrand(id) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteOrder(id).then(res => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.getAllOrder()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    //监听 pageSize 改变事件
    handleSizeChange(newSize) {
      this.queryInfo.pageSize = newSize
      this.getAllOrder()
    },
    //监听页码改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pageNum = newPage
      this.getAllOrder()
    },
  }
}
</script>

<style scoped>
.el-button+span {
  margin-left: 10px;
}
.el-form--inline .el-form-item {
		margin-bottom: 0;
	}
</style>