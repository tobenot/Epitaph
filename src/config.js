// 导入各个模块配置
import siteConfig from './config/siteConfig';
import projectsConfig from './config/projectsConfig';
import galleriesConfig from './config/galleriesConfig';
import soundsConfig from './config/soundsConfig';
import aboutConfig from './config/aboutConfig';
import seriesConfig from './config/seriesConfig';
import celebrationsConfig from './config/celebrationsConfig';

// 合并并导出所有配置
export default {
  ...siteConfig,
  projects: projectsConfig,
  series: seriesConfig,
  celebrations: celebrationsConfig,
  galleries: galleriesConfig,
  sounds: soundsConfig,
  about: aboutConfig
}
