const files = require.context('./projects', true, /\.js$/);

const projectsConfig = [];

files.keys().forEach(key => {
  // 获取导出默认值
  const project = files(key).default || files(key);
  if (!project.hidden) {
    projectsConfig.push(project);
  }
});

// pride 越大越靠前；步长 1024（2^10），插入时 (上+下)>>1。见 scripts/pride-sort.js
projectsConfig.sort((a, b) => {
  const prideA = a.pride || 0;
  const prideB = b.pride || 0;
  return prideB - prideA;
});

export default projectsConfig;
