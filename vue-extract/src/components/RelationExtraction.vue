<template>
  <div class="container">
    <div class="top-bar">
      <h2 class="search_left">实体关系抽取系统</h2>
      <div class="links">
        <el-link icon="el-icon-arrow-left" @click="$router.push('/')">← 返回首页</el-link>
        <el-button type="primary" @click="uploadFile">上传TXT文件</el-button>
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
        <el-button type="primary" @click="submitForm">提取关系实体三元组</el-button>
      </el-form-item>
    </el-form>
    <div v-if="fileContent" class="file-content">
        <h3>文件内容:</h3>
        <pre>{{ fileContent }}</pre>
      </div>
    <div v-if="triples.length">
      <el-table :data="triples" style="width: 100%">
        <el-table-column prop="0" label="头实体"></el-table-column>
        <el-table-column prop="1" label="关系">
            <template v-slot="scope">
            <span :class="`relation-${scope.row[1]}`" class="relation">{{ scope.row[1] }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="2" label="尾实体"></el-table-column>
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
      triples: [],
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
      axios.post('/api/relation_extraction', formData).then((res) => {
        console.log(res.data)
        this.triples = res.data.triples;
        this.$message.success('关系提取成功');
      }).catch(error => {
        console.log(error);
        this.$message.error('关系提取失败');
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

/* 为每种关系类型定义不同的背景颜色 */
.relation-ADE_Drug { background-color: #ffadad; }
.relation-Amount_Drug { background-color: #ffd6a5; }
.relation-Anatomy_Disease { background-color: #fdffb6; }
.relation-Class_Disease { background-color: #bdb2ff; }
.relation-Drug_Disease { background-color: #caffbf; }
.relation-Duration_Drug { background-color: #9bf6ff; }
.relation-Frequency_Drug { background-color: #fdffb6; }
.relation-Method_Drug { background-color: #a0c4ff; }
.relation-Operation_Disease { background-color: #caffbf; }
.relation-Pathogenesis_Disease { background-color: #9bf6ff; }
.relation-Reason_Disease { background-color: #fdffb6; }
.relation-Symptom_Disease { background-color: #a0c4ff; }
.relation-Test_Disease { background-color: #9bf6ff; }
.relation-Test_items_Disease { background-color: #fdffb6; }
.relation-Treatment_Disease { background-color: #a0c4ff; }

.relation {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 10px;
  margin: 2px;
}

.el-table-column {
  text-align: center;
}
</style>
