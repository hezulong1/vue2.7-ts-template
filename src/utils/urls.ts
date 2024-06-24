// url的接口名
export const UrlInterface: any = {
  // 基础接口
  Tile: '/Tile', // 瓦片图
  Info: '/Info', // 切片基本信息 get
  Capture: '/Capture', // 截图（获取列表get、保存post、删除delete）
  ExportImage: '/ExportImage', // 导出切片 get
  SplitScreenIDs: '/SplitScreenIDs', // 分屏浏览加密id生成 get
  Infos: '/Infos', // 分屏浏览-切片基本信息（数组）get
  TransToFile: '/TransToFile', // 启动下载 get
  TransQpStatus: '/TransQpStatus', // 获取切片下载状态(是否取回) get
  TransProgressBar: '/TransProgressBar', // 下载进度 get
  // 平台接口-通用
  CaseInfo: '/CaseInfo', // 病例基本信息 get
  Mark: '/Mark', // 标注接口（获取列表get、保存post、删除delete）
  MarkExport: '/ExportMark', // 导出标注 get
  ImportExport: '/ImportMark', // 导入标注 post
  RelevantListQp: '/RelevantList', // 相关切片列表 get
  QpHabit: '/Settings', // 用户设置 post
  // 平台接口-定制（ai细胞学） type 1.0 - 2.0 -通用
  OriginalCytological: '/OriginalCytological', // 异常细胞列表 get
  GetResult: '/Result/', // 获取诊断结果（地址传参）get
  GetCellNum: '/CellNum/', // 获取细胞数量（地址传参）get
  ReportTemplate: '/ReportTemplate', // 获取报告结果 get
  SelectTemplate: '/SelectTemplate', // 获取报告选中 get
  SaveReport: '/SaveReport', // 保存报告修改 post

  GetQualityAssess: '/QualityAssess', // 获取评估结果 get  1.0
  QualityAssess: '/QualityAssess', // 确认评估结果 post 1.0

  ListQpPatch: '/ListQpPatch', // 切片列表 2.0
  InfoQpDiagnosisArtificial: '/InfoQpDiagnosisArtificial', // 获取人工诊断结果 2.0
  InfoQpAIDiagnosis: '/InfoQpAIDiagnosis', // 获取ai诊断结果 + 细胞列表 2.0
  InfoQpDiagnosisArtificia: '/InfoQpDiagnosisArtificia', // 获取人工诊断结果 2.0
  AicOptions: '/Options', // 获取后台字典 2.0
  ListQpBigPatch: '/ListQpBigPatch', // 获取大图列表 2.0
  InfoPickImageSubmit: '/InfoPickImageSubmit', // 提交采图 2.0
  InfoQpDiagnosisArtificialSubmit: '/InfoQpDiagnosisArtificialSubmit', // 提交人工诊断 2.0
  InfoRemovePickImage: '/InfoRemovePickImage', // 删除采图 2.0
  // 平台接口-定制（ai前列腺）
  OptionsHeader: '/OptionsHeader', // 获取人工诊断模板阳性 get
  CoordInfo: '/CoordInfo', // 获取色粒图数据 get
  QpDiagnosisArtificial: '/QpDiagnosisArtificial', // 获取人工诊断结果 get  提交人工诊断 post
  QpDiagnosisAI: '/QpDiagnosisAI', // 获取诊断结果富文本 get
  CenterInfo: '/CoordRectangleCenterInfo', // 获取roi色粒图定位信息
  // 平台接口-定制(lake)
  ListSlidePatch: '/ListSlidePatch', // 获取批量标注数据 get
  // 标注阅片
  // 未名湖
  LakeOptions: '/Options', // 字典get
  LakeQpDiagnosis: '/WeiMingQpDiagnosis', // 阅片诊断结果 get  阅片诊断保存 post
  LakeQpDiagnosisMark: '/WeiMingQpDiagnosisMark', // 标注详情列表 get
  // 千岛湖
  lakeQianDaoQpDiagnosis: '/QianDaoQpDiagnosis', // 获取诊断结果 get  提交诊断结果 post
  // 洞庭湖
  DongTingQpDiagnosis: '/DongTingQpDiagnosis', // 获取诊断 get  提交诊断 post
  MarkCutImg: '/Capture/MarkCutImg', // 基础接口 提供给洞庭湖使用 标注+截图
  redirect: { // 通用接口重定向
    lakeDT: { // lake洞庭湖
      Mark: '/DongTingMark', // 标注接口（获取列表get、保存post、删除delete）
      MarkExport: '/DongTingExportMark', // 导出标注 get
      ImportExport: '/DongTingImportMark', // 导入标注 post
    },
  },

};

export default UrlInterface;
