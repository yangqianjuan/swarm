<template>
  <div>
    <head-top></head-top>
    <section class="data_section">
      <el-row :gutter="20" style="margin-bottom: 10px;">
        <el-col :span="4">
          <el-card class="box-card data_list node_num1">
            <div class>
              <span class="data_num head">节点数：</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="box-card data_list node_num2">
            <div class>
              <span class="data_num head">已兑换BZZ数量：</span>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card class="box-card data_list node_num3">
            <div class>
              <span class="data_num head">节点故障：</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </section>
    <!-- <div>| 全球节点分布</div>
    <tendency :sevenDate="sevenDate" :sevenDay="sevenDay"></tendency> -->
    <div class="table_container">
      <div>| 节点列表</div>
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" width="100"></el-table-column>
        <el-table-column property="name" label="节点名称" width="220"></el-table-column>
        <el-table-column property="ip" label="IP地址" width="220"></el-table-column>
        <el-table-column property="status" label="状态"></el-table-column>
         <el-table-column property="uncash" label="未提取支票数量" width="220"></el-table-column>
        <el-table-column property="ethereum" label="支票地址"></el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="20"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import tendency from "../components/tendency";
import dtime from "time-formater";
import {
  userCount,
  orderCount,
  getNodeList,
  getOrderCount,
  adminDayCount,
  adminCount
} from "@/api/getData";
export default {
  data() {
    return {
      userCount: null,
      orderCount: null,
      adminCount: null,
      allUserCount: null,
      allOrderCount: null,
      allAdminCount: null,
      sevenDay: [],
      sevenDate: [[], [], []],
      tableData: [
        {
          name: "王小虎",
          ip: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1
    };
  },
  components: {
    headTop,
    tendency
  },
  mounted() {
this.initData();
  },
  computed: {},
  methods: {
async initData(){
                try{
                    const countData = await getNodeList({page:1});
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
  handleSizeChange(){},
  handleCurrentChange(){},
    async getSevenData() {
      const apiArr = [[], [], []];
      this.sevenDay.forEach(item => {
        apiArr[0].push(userCount(item));
        apiArr[1].push(orderCount(item));
        apiArr[2].push(adminDayCount(item));
      });
      const promiseArr = [...apiArr[0], ...apiArr[1], ...apiArr[2]];
      Promise.all(promiseArr)
        .then(res => {
          const resArr = [[], [], []];
          res.forEach((item, index) => {
            if (item.status == 1) {
              resArr[Math.floor(index / 7)].push(item.count);
            }
          });
          this.sevenDate = resArr;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 16px;
    }
    .head {
      border-radius: 6px;
      font-size: 16px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .node_num1 {
    background: rgb(35, 211, 214);
  }
  .node_num2 {
    background: burlywood;
  }
  .node_num3 {
    background: rgb(74, 201, 89);
  }
}
.wan {
  .sc(16px, #333);
}
</style>
