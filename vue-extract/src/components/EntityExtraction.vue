<template>
  <div class="container">
    <div class="top-bar">
      <h2 class="search_left">实体抽取系统</h2>
      <div class="links">
        <el-link icon="el-icon-arrow-left" @click="$router.push('/')" class="home-link">← 返回首页</el-link>
        <el-button type="primary" @click="uploadFile" class="upload-button">上传TXT文件</el-button>
        <input type="file" ref="fileInput" @change="handleFileUpload" accept=".txt" style="display: none;" />
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
    <div v-if="fileContent" class="file-content">
        <h3>文件内容:</h3>
        <pre>{{ fileContent }}</pre>
      </div>
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
      entities: [],
      fileContent: ''
    }
  },
  methods: {
    uploadFile() {
      this.$refs.fileInput.click();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fileContent = e.target.result;
        };
        reader.readAsText(file);
      } else {
        alert('请选择一个TXT文件');
      }
    },
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
.home-link {
  margin-right: 20px; /* 设置返回首页链接与上传按钮之间的间距 */
}

.upload-button {
  margin-left: 20px; /* 设置上传按钮与前一个元素的间距 */
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
