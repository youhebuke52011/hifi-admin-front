<template>
  <div class="mixin-components-container">
    <el-row>
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span v-if="isEdit===false">创建HTTP服务</span>
          <span v-if="isEdit===true">修改HTTP服务</span>
        </div>
        <div style="margin-bottom:50px;">
          <el-form ref="form" :model="form" label-width="140px">
            <el-form-item label="歌手id" class="is-required">
              <el-input v-model="form.singer_id" placeholder="数字" :disabled="isEdit===true" />
            </el-form-item>
            <el-form-item label="歌手名称" class="is-required">
              <el-input v-model="form.singer_name" placeholder="最多255字符，必填" />
            </el-form-item>
            <el-form-item label="歌手图片" class="is-required">
              <el-input v-model="form.singer_img" placeholder="最多255字符，必填" />
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script>
import { serviceAddHttp, serviceDetail, serviceUpdateHttp } from '@/api/service'
export default {
  name: 'ServiceCreateHttp',
  data() {
    return {
      isEdit: false,
      submitButDisabled: false,
      form: {
        singer_id: 0,
        singer_name: '',
        singer_img: ''
      }
    }
  },
  created() {
    const id = this.$route.params && this.$route.params.id
    if (id > 0) {
      this.isEdit = true
      this.fetchData(id)
    }
  },
  methods: {
    fetchData(id) {
      const query = { 'id': id }
      serviceDetail(query).then(response => {
        this.form.singer_id = response.data.info.singer_id
        this.form.singer_name = response.data.info.singer_name
        this.form.singer_img = response.data.info.singer_img
      }).catch(() => {
      })
    },
    handleSubmit() {
      this.submitButDisabled = true
      const query = Object.assign({}, this.form)
      console.log(query)
      query.singer_id = Number(query.singer_id)
      query.singer_name = query.singer_name.replace(/\n/g, ',')
      query.singer_img = query.singer_img.replace(/\n/g, ',')
      if (this.isEdit) {
        serviceUpdateHttp(query).then(response => {
          this.submitButDisabled = false
          this.$notify({
            title: 'Success',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.submitButDisabled = false
        })
      } else {
        serviceAddHttp(query).then(response => {
          this.submitButDisabled = false
          this.$notify({
            title: 'Success',
            message: '添加成功',
            type: 'success',
            duration: 2000
          })
        }).catch(() => {
          this.submitButDisabled = false
        })
      }
    }
  }
}
</script>

<style scoped>
  .mixin-components-container {
    background-color: #f0f2f5;
    padding: 30px;
    min-height: calc(100vh - 84px);
  }
  .component-item{
    min-height: 100px;
  }
</style>
