<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="search-container">
      <el-row>
        <el-col :span="24">
          <el-input
            ref="nameSelect"
            placeholder="请输入主机名称"
            v-model="search.name"
            style="width:220px; height:28px;"
            @keyup.enter.native="searchQuery"
          ></el-input>
          <el-input
            ref="nameSelect"
            placeholder="请输入ip地址"
            v-model="search.ip"
            style="width:220px; height:28px;"
            @keyup.enter.native="searchQuery"
          ></el-input>
        </el-col>
      </el-row>
    </div>
    <div class="table_container">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="Chequename" label="节点名称" width="220"></el-table-column>
        <el-table-column prop="ip" label="ip地址" width="180"></el-table-column>
        <el-table-column prop="hash" label="交易hash"></el-table-column>
        <el-table-column prop="issued" label="发送方"></el-table-column>
        <el-table-column prop="received" label="接收方"></el-table-column>
        <el-table-column prop="depth" label="BZZ数量"></el-table-column>
        <el-table-column prop="timestamp" label="时间"></el-table-column>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">删除</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <pagination
          v-if="pageshow && page.total>0"
          :total="page.total"
          :page.sync="page.currentPage"
          :limit.sync="page.pageSize"
          @pagination="handlePageChange"
          :size="10"
        ></pagination>
      </div>
    </div>
    <el-dialog title="详细信息" :visible.sync="dialogFormVisible">
      <el-tabs v-model="activeName" @tab-click="handleClickTab">
        <el-tab-pane label="节点详情" name="detail">
          <el-row style="height: 100%;background:rgba(214,233,250,.5)">
            <el-col
              :span="12"
              v-for="(item,index) in detail"
              :key="index"
              style="border-bottom:0.5px solid rgba(151,125,125,.3)"
            >
              <el-row style="height:60px;line-height:60px;">
                <el-col :span="6" style="background:#abd5f2;text-align:center">{{item.name}}</el-col>
                <el-col :span="18" style="padding:0 5px">{{item.data}}</el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="连接数" name="num">连接数</el-tab-pane>
        <el-tab-pane label="日志" name="log">日志</el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import headTop from "../components/headTop";
import Pagination from "@/components/Pagination";
import { getChequeList, getChequeDetail } from "@/api/getData";
export default {
  data() {
    return {
      activeName: "detail",
      dialogFormVisible: false,
      tableData: [{ username: "111" }],
      search: {},
      pageshow: true,
      page: {
        pageSize: 10,
        total: 20,
        currentPage: 1
      },
      currentRow: null,
      offset: 0,
      limit: 20,
      count: 0,
      currentPage: 1,
      detail: [
        {
          name: "归属用户",
          data: "username"
        },
        {
          name: "IP地址",
          data: "ip"
        },
        {
          name: "所属大洲",
          data: "overlay"
        },
        {
          name: "版本号",
          data: "version"
        },
        {
          name: "总余额",
          data: "total_money"
        },
        {
          name: "发送总数",
          data: "issued_total"
        },
        {
          name: "支票地址",
          data: "ethereum"
        },
        {
          name: "钱包地址(dai)",
          data: "ethereum"
        },
        {
          name: "节点名称",
          data: "Cheque_name"
        },
        {
          name: "所属国家",
          data: "country"
        },
        {
          name: "交付时间",
          data: "timestamp"
        },
        {
          name: "实际可用余额",
          data: "money"
        },
        {
          name: "接收总数",
          data: "received_total"
        },
        {
          name: "未提取支票数量",
          data: "uncash"
        }
      ]
    };
  },
  components: {
    headTop,
    Pagination
  },
  created() {
    this.getCheque();
  },
  methods: {
    handleClick(row) {
      // this.selectTable = row;
      console.log(row);
      this.dialogFormVisible = true;
      this.getDetail({ ip: row.ip, ethereum: row.ethereum });
    },
    handleClickTab() {},
    handlePageChange(val) {
      this.getCheque();
    },
    async getCheque() {
      try {
        const res = await getChequeList({
          page: this.page.currentPage,
          size: this.page.pageSize,
          ip: this.search.ip,
          name: this.search.name
        });
        if (res.status == 1) {
          this.tableData = [];
          res.data.forEach(item => {
            const tableItem = {
              create_time: item.create_time,
              username: item.username,
              admin: item.admin,
              city: item.city
            };
            this.tableData.push(tableItem);
          });
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    async getDetail(query) {
      try {
        const res = await getChequeDetail({ ...query });
        if (res.status == 1) {
          this.detail = res.result;
        } else {
          throw new Error(res.message);
        }
      } catch (err) {
        console.log("获取数据失败", err);
      }
    }
  }
};
</script>

<style lang="less">
@import "../style/mixin";
.table_container {
  padding: 20px;
}
</style>


