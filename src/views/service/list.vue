<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.info" placeholder="服务名称/服务描述" style="width: 200px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        Search
      </el-button>
      <router-link :to="'/service/service_create_http/'">
        <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
          添加HTTP服务
        </el-button>
      </router-link>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="id" prop="singer_id" align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.singer_id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手名称" min-width="110px">
        <template slot-scope="{row}">
          <span>{{ row.singer_name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="歌手图片" min-width="120px">
        <template slot-scope="{row}">
          <span>{{ row.singer_img }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <router-link :to="'/service/service_stat/'+row.singer_id">
            <el-button type="primary" size="mini">
              发布
            </el-button>
          </router-link>
          <router-link :to="'/service/service_edit_http/'+row.singer_id">
            <el-button type="primary" size="mini">
              修改
            </el-button>
          </router-link>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { serviceList, serviceDelete } from '@/api/service'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'ServiceList',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      tableKey: 0,
      singers: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        page_size: 20,
        info: ''
      },
      temp: {
        singer_id: undefined
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      serviceList(this.listQuery).then(response => {
        this.list = response.data.singers
        // this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page_no = 1
      this.getList()
    },
    handleDelete(row, index) {
      this.$confirm('此操作将删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const deleteQuery = {
          'id': row.singer_id
        }
        serviceDelete(deleteQuery).then(response => {
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
      }).catch(() => {
        this.$notify({
          title: 'Success',
          message: '已取消删除',
          type: 'info',
          duration: 2000
        })
      })
    }
  }
}
</script>
