<template>
  <div class="home-container">
    <div class="top-bar">
      <h2 class="search_left">首页</h2>
      <div class="links">
        <el-link href="/entity_extraction">实体抽取系统</el-link>
        <el-link href="/relation_extraction" class="relation-link">关系抽取系统</el-link>
      </div>
    </div>
    <div class="content">
      <h1>欢迎使用知识抽取系统</h1>
      <img src="@/assets/home.png" alt="Home Image" class="home-image">
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent'
};
</script>

<style scoped>
.home-container {
  height: 100vh;
}

.top-bar {
  height: 10%;
    border-bottom: 2px solid gray;
    border-top: 2px solid gray;
    display: flex;
    flex-direction: row;
}

.search_left{
    width: 300px;
}


.links {
   /* height: 100px; */
   display: flex;
  /*实现垂直居中*/
  align-items: center;
  /*实现水平居中*/
  justify-content: center;
}
.relation-link {
  margin-left: 20px; /* 设置两个链接之间的间距 */
}


.home-image {
  max-width: 60%;
  max-height: 60%;
  height: auto;
  margin-bottom: 20px; /* 图片和标题之间的间距 */
}

.content {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  padding: 20px;
  box-sizing: border-box; /* 确保内边距和边框包含在高度计算内 */
}
</style>
