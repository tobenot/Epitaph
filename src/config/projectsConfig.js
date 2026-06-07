const files = require.context('./projects', false, /\.js$/);

const projectsConfig = [];

files.keys().forEach(key => {
  // 获取导出默认值
  const project = files(key).default || files(key);
  projectsConfig.push(project);
});

// 按自豪度 (pride) 降序排序，pride 越大越靠前
projectsConfig.sort((a, b) => {
  const prideA = a.pride || 0;
  const prideB = b.pride || 0;
  return prideB - prideA;
});

export default projectsConfig;
