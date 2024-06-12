<template>
  <div class="container">
    <div class="top-bar">
      <h2 class="search_left">实体抽取系统</h2>
      <div class="links">
        <el-link icon="el-icon-arrow-left" @click="$router.push('/')">← 返回首页</el-link>
      </div>
    </div>
    <el-form :model="form" @submit.prevent="submitForm">
      <el-form-item>
        <el-input
          type="textarea"
          v-model="text"
          placeholder="请输入文本"
          rows="4"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提取实体</el-button>
      </el-form-item>
    </el-form>
    <div v-if="entities.length">
      <el-table :data="entities" style="width: 100%">
        <el-table-column prop="1" label="实体"></el-table-column>
        <el-table-column prop="0" label="类型">
            <template v-slot="scope">
            <span :class="`entity-${scope.row[0]}`" class="entity">{{ scope.row[0] }}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      text: '',
      entities: []
    }
  },
  methods: {
    submitForm() {
      console.log(this.text);
      var formData = new FormData()
      formData.append('text', this.text)
      axios.post('/api/entity_extraction', formData).then((res) => {
        console.log(res.data)
        this.entities = res.data.entities;
        this.$message.success('实体提取成功');
      }).catch(error => {
        console.log(error);
        this.$message.error('实体提取失败');
      });
    }
  }
}
</script>

<style scoped>
.container {
  height: 100vh;
}

.top-bar {
  height: 10%;
  border-bottom: 2px solid gray;
  border-top: 2px solid gray;
  display: flex;
  flex-direction: row;
}

.search_left {
  width: 300px;
}

.links {
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 为每种实体类型定义不同的背景颜色 */
.entity-Disease { background-color: #ffadad; }
.entity-Symptom { background-color: #ffd6a5; }
.entity-SideEff { background-color: #fdffb6; }
.entity-Drug { background-color: #bdb2ff; }
.entity-Reason { background-color: #caffbf; }
.entity-Duration { background-color: #9bf6ff; }
.entity-Anatomy { background-color: #a0c4ff; }
.entity-Test_Value { background-color: #ffc6ff; }
.entity-Method { background-color: #ffb6b9; }
.entity-Level { background-color: #c5c6ff; }
.entity-Treatment { background-color: #ffebc6; }
.entity-Operation { background-color: #c6ffd5; }
.entity-Amount { background-color: #ffd5e1; }
.entity-Frequency { background-color: #e5ffcc; }
.entity-Test { background-color: #ccf5ff; }

.entity {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  margin: 2px;
}

.el-table-column {
  text-align: center;
}
</style>
