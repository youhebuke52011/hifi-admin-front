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
      <el-table-column label="id" prop="singer_id" align="center" width="50">
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
    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
  import { serviceList } from '@/api/service'
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
      }
    }
  }
</script>
