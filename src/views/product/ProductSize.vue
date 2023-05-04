<template>
  <div>
    管理库存
    <el-row :gutter="20" class="m-mobile-show">
      <el-col :span="12">
        <el-card class="productSize">
          <div class="productImage">
            <img style="width: 100%;height: 100%;" src="http://43.138.9.213/image/product/12/6.webp" />
            <div >
              <div class="productName">DunkDunkDunkDunkDunkDunkDunkDu1545 nk</div>
              <div class="productInfo"></div>
              <div>Dunk</div>
            </div>
          </div>
        </el-card>
    <el-card class="productSize">
      <img style="width: 100%;height: 100%;" src="http://43.138.9.213/image/product/12/6.webp" />
    </el-card>
      </el-col>
      <el-col :span="12">
        <el-card class="productSize">
          <img style="width: 100%;height: 100%;" src="http://43.138.9.213/image/product/12/6.webp" />
    </el-card>
    <el-card class="productSize">
      <img style="width: 100%;height: 100%;" src="http://43.138.9.213/image/product/12/6.webp" />
    </el-card>
      </el-col>
    </el-row>

    <el-row class="m-mobile-hide">
      <el-col >
        <el-card class="productSize">
          <div class="productImage">
            <img style="width: 100%;height: 100%;" src="http://43.138.9.213/image/product/12/6.webp" />
            <div >
              <div class="productName">DunkDunkDunkDunkDunkDunkDunkDu1545 nk</div>
              <div class="productInfo"></div>
              <div>Dunk</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    
  </div>
</template>

<script>
export default {
    name: 'ProductPrice',
    data() {
        return {
    
        }
    },
    created() {
    
    },
    methods: {
    
    }
}
</script>

<style scoped>
.productSize{
  height: 300px;
  width: 100%;
  margin-bottom: 10px;
}
.productImage{
  height: 105px;
  width: 185px;
  display: flex;  
}
.content-list .hentry:hover {
    box-shadow: 0 0 15.8px rgba(50,50,50,0.15);
}


.productName{
  font-size: 14px;
  margin-left: 10px;
  color: #333;
  font-weight: bold;
  width: 150px;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.productInfo{
  font-size: 12px;
  margin-left: 10px;
  color: #999;
}



</style>