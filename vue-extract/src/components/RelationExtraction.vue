<template>
  <div class="container">
    <div class="top-bar">
      <h2 class="search_left">实体关系抽取系统</h2>
      <div class="links">
        <el-link icon="el-icon-arrow-left" @click="$router.push('/')" class="home-link">← 返回首页</el-link>
        <el-button type="primary" @click="centerDialogVisible = true" class="upload-button">上传TXT文件</el-button>
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
    <el-dialog v-model="centerDialogVisible" title="上传TXT文件" width="500" center>
      <span>请选择一个TXT文件进行上传</span>
      <input type="file" ref="fileInput" @change="handleFileUpload" accept=".txt" />
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="centerDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmUpload">确定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      text: '',
      triples: [],
      fileContent: '',
      centerDialogVisible: false
    }
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file && file.type === 'text/plain') {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.fileContent = e.target.result;
          this.text = this.fileContent; // 将文件内容填充到输入框中
        };
        reader.readAsText(file);
      } else {
        alert('请选择一个TXT文件');
      }
    },
    confirmUpload() {
      if (this.fileContent.trim() !== '') {
        this.centerDialogVisible = false;
        alert('文件上传成功');
      } else {
        alert('请先选择文件');
      }
    },
    submitForm() {
      if (this.text.trim() === '') {
        this.$message.error('请输入文本');
        return;
      }

      console.log(this.text);
      var formData = new FormData()
      formData.append('text', this.text)
      axios.post('/api/relation_extraction', formData).then((res) => {
        console.log(res.data)
        this.triples = res.data.triples;
        this.$message.success('关系提取成功');

        // 构建文本文件内容
        let fileContent = '头实体 关系 尾实体\n';
        this.triples.forEach(triple => {
          fileContent += `${triple[0]}\t${triple[1]}\t${triple[2]}\n`;
        });

        // 创建 Blob 对象并生成下载链接
        const blob = new Blob([fileContent], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'relations.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

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

.home-link {
  margin-right: 20px;
}

.upload-button {
  margin-left: 20px;
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
</style>
