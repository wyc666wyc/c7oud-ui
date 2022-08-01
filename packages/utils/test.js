define(function(require, exports, module) {
  var VuePage = require("../../../common/basePage/vuePage.js");
  var appSettings = require("../../../../common/appSettings.js");
  require("../../../styles/common/common.css");
  var commonUtils = require("../../../modules/commonUtils/commonUtils.js");
  const moment = require("./moment-2.17.1.js");
  var fw = VuePage.fw;
  var ObjectUtils = fw.core.util.ObjectUtils;
  var ResultStatusEnum = VuePage.ResultStatusEnum;
  var lodash = fw.core.Utils.lodash;
  require("./warningStatistics.css");
  
  
  // 继承基类
  class Page extends VuePage {
  
      constructor() {
          super();
      };
  
      onCreate() {
          this.setDefine(require, exports, module);
          var me = this;
          me.vars = {};
  
          var template = require("./warningStatistics.html");
          var vueConfig = {
              template: template,
              data: function () {
                  const render2 = (h, params) => {
                      return h('div', {
                          style: {
                              color: params.column.key !== 'canton' ? 'rgb(16, 141, 233)' : ''
                          },
                          on: {
                              click: () => {
  
                              }
                          }
                      }, params.row[params.column.key])
                  }
                  return {
                      tagList: [],
                      searchParams: {
                          keywords: ""
                      },
                      applyOpen: false,
                      value2: [],
                      msgType: [],
                      msgTypeCompare: [],
                      areaBool: false,
                      streetBool: false,
                      companyBool: false,
                      colums: [{
                              title: "行政区",
                              key: "cantonName",
                              align: "center",
                              headerAlign: 'center',
                              width: 150,
                              fixed: 'left',
                          },
                          {
                              title: "操作",
                              key: "operation",
                              align: "center",
                              headerAlign: 'center',
                              fixed: "right",
                              width: 150,
                              render: (h, params) => {
                                  return h('div', {
                                      style: {
                                          color: 'rgb(16, 141, 233)',
                                          cursor: 'pointer'
                                      },
                                      on: {
                                          click: () => {
                                              this.openInfoWindow(params);
                                          }
                                      }
                                  }, params.row.LEVEL == 4 ? '预警详情' : params.row.cantonIx == 1 ? '预警详情' : params.row.LEVEL == 3 ? '街道详情' : params.row.LEVEL==6?"":"区县详情")
                              }
                          },
                      ],
                      data: [],
                      typeList: [],
                      queryParams: {
                          msgType: "",
                          btCode: "",
                          endTime: "",
                          startTime: "",
                          level: "",
                          cantonCode: "",
                      },
                      loading: true,
                      originLevel: null,
                      originCantonCode: null,
                      dataList: [],
                      data2: [],
                      data3: [],
                      companyList: [],
                      exceptKey: {},
                      columsArea: [{
                              title: "行政区",
                              key: "cantonName",
                              align: "center",
                              headerAlign: 'center',
                              width: 150,
                              fixed: 'left',
                          },
                          {
                              title: "操作",
                              key: "operation",
                              align: "center",
                              headerAlign: 'center',
                              fixed: "right",
                              width: 150,
                              render: (h, params) => {
                                  return h('div', {
                                      style: {
                                          color: 'rgb(16, 141, 233)',
                                          cursor: 'pointer'
                                      },
                                      on: {
                                          click: () => {
                                              this.openInfoWindow(params);
                                          }
                                      }
                                  }, params.row.LEVEL == 4 ? '预警详情' : params.row.cantonIx == 1 ? '预警详情' : params.row.LEVEL == 3 ? '街道详情' : params.row.LEVEL==6?"":"区县详情")
                              }
                          },
                      ],
                      columsStreet: [{
                              title: "行政区",
                              key: "cantonName",
                              align: "center",
                              headerAlign: 'center',
                              width: 150,
                              fixed: 'left',
                          },
                          {
                              title: "操作",
                              key: "operation",
                              align: "center",
                              headerAlign: 'center',
                              fixed: "right",
                              width: 150,
                              render: (h, params) => {
                                  return h('div', {
                                      style: {
                                          color: 'rgb(16, 141, 233)',
                                          cursor: 'pointer'
                                      },
                                      on: {
                                          click: () => {
                                              this.openInfoWindow(params);
                                          }
                                      }
                                  }, params.row.LEVEL == 4 ? '预警详情' : params.row.cantonIx == 1 ? '预警详情' : params.row.LEVEL == 3 ? '街道详情' : params.row.LEVEL==6?"":"区县详情")
                              }
                          },
                      ],
                      nowcantonIx: null,
                      loading2: true,
                      loading3: true,
                      cantonLevel: {}
                  }
              },
              created() {
                  this.urlParams = this.getParams() || {};
                  this.queryParams.endTime = moment().format("YYYY-MM-DD");
                  this.queryParams.startTime = moment(this.queryParams.endTime).subtract(7, "days").format("YYYY-MM-DD");
                  this.tagList.push({
                      key: '统计时间',
                      value: `${this.queryParams.startTime}~${this.queryParams.endTime}`,
                      type: 'time'
                  })
                  this.initPage();
              },
              mounted() {
                  let vm = this;
              },
              filters: {
  
              },
              methods: {
                  // 数据点击事件
                  openCompanyPage(params) {
                      if (params.row.cantonName === '合计') {
                          return
                      }
                      let clickType = null;
                      let clickBtCode = null;
                      let label = null;
                      if (params.column.title !== "企业数") {
                          clickBtCode = params.column.key.split("_")[1];
                          label = this.typeList.filter(item => item.code === clickBtCode)[0]['label']
                          clickType = params.column.key;
                      } else {
  
                      }
                      const {
                          msgType,
                          btCode,
                          endTime,
                          startTime,
                          level,
                          cantonCode
                      } = this.queryParams;
                      const newQuery = {
                          msgType,
                          btCode,
                          endTime,
                          startTime,
                          level,
                          cantonIx: params.row.cantonIx,
                          cantonCode: params.row.cantonCode,
                          signStatus: "",
                          itemStatus: "",
                          fdTypeCode: "",
                          warningStatus: ""
                      };
                      if (params.column.title === "已签收" || params.column.title === "未签收") {
                          if (params.column.title === "已签收") {
                              newQuery.signStatus = "2";
                          } else if (params.column.title === "未签收") {
                              newQuery.signStatus = "1";
                          }
                      } else if (params.column.title === "已反馈" || params.column.title === "未反馈") {
                          if (params.column.title === "已反馈") {
                              newQuery.itemStatus = "2";
                          } else if (params.column.title === "未反馈") {
                              newQuery.itemStatus = "1";
                          }
                      } else if (params.column.title === "预警数") {
                          newQuery.warningStatus = "1";
                      } else if (!this.exceptKey[params.column.key]) {
                          newQuery.fdTypeCode = params.column.key.split('_')[0];
                      }
                      commonUtils.openPage({
                          url: "/web/sps/views/spsEdit/warningStatisticsCompany/warningStatisticsCompany.js",
                          title: "预警详情",
                          width: "80%",
                          zIndex: 1001,
                          params: {
                              ticket: this.urlParams.ticket,
                              queryParams: newQuery,
                              msgTypeList: params.column.title === "企业数" ? this.msgType : label ? [label] : [],
                              cantonName: params.row.cantonName,
                              clickType
                          },
                          callBack: function () {
  
                          }
                      });
                  },
                  renders(h, params) {
                      return h('div', {
                          style: {
                              color: params.column.key !== 'canton' ? 'rgb(16, 141, 233)' : '',
                              cursor: "pointer"
                          },
                          on: {
                              click: () => {
                                  this.openCompanyPage(params)
                              }
                          }
                      }, params.row[params.column.key])
                  },
                  async initPage() {
                      Promise.all([this.getBusinessTypeList(), this.getUserIm()]).then(res => {
                          Promise.all(this.loopGetDataFirstPage()()).then(res => {
                              // 处理数据
                              const {
                                  columns,
                                  data
                              } = this.breakdownCanton(res, this.colums, this.data);
                              this.colums = columns;
  
                              this.data = data;
                              this.loading = false;
                          })
                      })
                  },
                  // 循环调用
                  loopGetData() {
                      return () => {
                          const arr = []
                          this.msgType.forEach(item => {
                              const list = this.typeList.filter(items => items.label === item);
                              arr.push(this.queryWarningStatisticsNewSecond(list[0]))
                          })
                          return arr
                      }
                  },
                  // 无法判断第一次进来的行政区级别 抽离方法做第一次行政区级别运算
                  loopGetDataFirstPage() {
                      return () => {
                          const arr = []
                          this.msgType.forEach(item => {
                              const list = this.typeList.filter(items => items.label === item);
                              arr.push(this.queryWarningStatisticsNew(list[0]))
                          })
                          return arr
                      }
                  },
                  removeTag() {},
                  clearAll() {
                      this.applyOpen = false;
                      this.queryParams.startTime = "";
                      this.queryParams.endTime = "";
                      this.queryParams.cantonCode = this.originCantonCode;
                      this.queryParams.level = this.originLevel;
                      this.loading = true;
                      Promise.all(this.loopGetDataFirstPage()()).then(res => {
                          // 处理数据
                          const {
                              columns,
                              data
                          } = this.breakdownCanton(res, this.colums, this.data);
                          this.colums = columns;
                          this.data = data;
  
                          this.loading = false;
                      })
                      this.tagList = [];
                  },
                  onSearch() {},
                  changedApplyData(item) {
                      this.applyOpen = false;
                      this.queryParams.startTime = item[0];
                      this.queryParams.endTime = item[1];
                      this.queryParams.cantonCode = this.originCantonCode;
                      this.queryParams.level = this.originLevel;
                      this.loading = true;
                      Promise.all(this.loopGetDataFirstPage()()).then(res => {
                          // 处理数据
                          const {
                              columns,
                              data
                          } = this.breakdownCanton(res, this.colums, this.data);
                          this.colums = columns;
  
                          this.data = data;
                          this.loading = false;
                      })
                      const dataLabel = `${this.queryParams.startTime}~${this.queryParams.endTime}`
                      this.tagList.some(item => item.type === 'time' && (item.value = dataLabel)) || this.tagList.push({
                          key: '统计时间',
                          value: `${this.queryParams.startTime}~${this.queryParams.endTime}`,
                          type: 'time'
                      });
                  },
                  handleClick() {},
                  // 区县详情弹窗(一级)
                  openInfoWindow(params) {
                      if (params.row.LEVEL == 4 || params.row.cantonIx == 1) {
                          const {
                              msgType,
                              btCode,
                              endTime,
                              startTime,
                              level,
                          } = this.queryParams;
                          const queryObj = {
                              msgType,
                              btCode,
                              endTime,
                              startTime,
                              level,
                              cantonCode: params.row.cantonCode,
                              cantonIx: params.row.cantonIx,
                              signStatus: "",
                              itemStatus: "",
                              fdTypeCode: "",
                              warningStatus: ""
                          }
                          commonUtils.openPage({
                              url: "/web/sps/views/spsEdit/warningStatisticsCompany/warningStatisticsCompany.js",
                              title: "预警详情",
                              width: "80%",
                              zIndex: 1001,
                              params: {
                                  ticket: this.urlParams.ticket,
                                  queryParams: queryObj,
                                  msgTypeList: this.msgType,
                                  cantonName: params.row.cantonName,
                                  clickType: undefined
                              },
                              callBack: function () {
  
                              }
                          });
                          return
                      }
                      const {
                          LEVEL,
                          cantonCode
                      } = params.row;
                      switch (LEVEL) {
                          case 2:
                              this.loading2 = true;
                              break;
                          case 3:
                              this.loading3 = true;
                              break;
                          case 4:
                              this.loading4 = true;
                              break
                      }
                      this.queryParams.cantonCode = params.row.cantonCode;
                      this.queryParams.level = LEVEL;
                      this.nowcantonIx = LEVEL;
                      // 第四级为企业
                      if (LEVEL < 4) {
                          this.cantonLevel[LEVEL] = params.row.cantonCode;
                          Promise.all(this.loopGetData()()).then(res => {
                              // 处理数据
                              this.handleData(res);
                          })
                      }
                  },
                  closeIndexTab() {
                      this.nowcantonIx = Number(this.nowcantonIx) - 1;
                  },
                  // 列数据的处理
                  handleData(arr) {
                      if (this.nowcantonIx == 2) {
                          const {
                              columns,
                              data
                          } = this.breakdownCanton(arr, this.columsArea, this.data2);
                          this.columsArea = columns;
                          this.data2 = data;
                          this.loading2 = false;
                          this.areaBool = true;
  
                      } else if (this.nowcantonIx == 3) {
                          const {
                              columns,
                              data
                          } = this.breakdownCanton(arr, this.columsStreet, this.data3);
                          this.columsStreet = columns;
                          this.data3 = data;
                          this.streetBool = true;
                      }
                  },
                  // 根据行政区级别进行列和数据运算
                  breakdownCanton(arr, nextColumn, nextData) {
                      const columStart = nextColumn.shift();
                      const columEnd = nextColumn.pop();
                      this.exceptKey = {};
                      nextColumn = [];
                      nextColumn.push(columStart);
                      arr.forEach((item, index) => {
                          const newOneColumn = {
                              title: this.msgType[index],
                              align: "center",
                              children: []
                          };
                          item.column.forEach(items => {
                              const {
                                  key,
                                  title
                              } = items;
                              newOneColumn.children.push({
                                  title,
                                  key,
                                  minWidth: title.length > 6 ? 130 : title.length > 7 ? 150 : 80,
                                  className: "cut-name",
                                  align: "center",
                                  render: (h, params) => {
                                      return this.renders(h, params)
                                  }
                              })
                          })
                          nextColumn.push(newOneColumn);
                          if (index >= 1) {
                              nextData.forEach((data, index) => {
                                  data = Object.assign(data, item.datas[index]);
                              })
                          } else {
                              nextData = item.datas;
                          }
  
                          item.staticColumn.forEach(item => {
                              if (ObjectUtils.hasValue(!this.exceptKey[item])) {
                                  this.exceptKey[item] = true;
                              }
                          })
                      })
                      nextColumn.push(columEnd);
                      return {
                          columns: nextColumn,
                          data: nextData
                      }
                  },
                  // 获取业务类型
                  getBusinessTypeList() {
                      return new Promise((resolve, reject) => {
                          this.ajax({
                              serviceSiteRootUrl: appSettings.ptl.serviceSiteRootUrl,
                              serviceType: "crossDomainCall",
                              serviceName: "ptl/main/warningStatistics",
                              methodName: "getBusinessTypeList",
                              data: {
                                  ticket: this.urlParams.ticket,
                              },
                              success: (resultData) => {
                                  if (resultData.data.length > 0) {
                                      const {
                                          msgType,
                                          label,
                                          code
                                      } = resultData.data[0];
                                      this.queryParams.msgType = msgType;
                                      this.queryParams.btCode = code;
                                      this.typeList = resultData.data;
                                      this.msgType.push(label);
                                      this.msgTypeCompare.push(label)
                                      resolve();
                                  } else {
                                      this.$Message.warning("预警类型为空");
                                  }
                              },
                              complete: function () {}
                          });
                      })
                  },
  
                  // 获取用户管辖行政区编码
                  getUserIm() {
                      return new Promise((resolve, reject) => {
                          this.ajax({
                              serviceType: "crossDomainCall",
                              serviceName: "spsarchive/newbieTask",
                              methodName: "getUserIm",
                              data: {
                                  ticket: this.urlParams.ticket,
                              },
                              success: (resultData) => {
                                  if (resultData.data.length > 0) {
                                      this.nowcantonIx = resultData.data[0];
                                      this.cantonLevel[this.nowcantonIx] = resultData.data[1]
                                      this.originLevel = resultData.data[0];
                                      this.originCantonCode = resultData.data[1];
                                      this.queryParams.level = resultData.data[0];
                                      this.nowcantonIx = resultData.data[0];
                                      this.queryParams.cantonCode = resultData.data[1];
                                      resolve();
                                  } else {
                                      this.$Message.warning("预警类型为空");
                                  }
                              },
                              complete: function () {}
                          });
                      })
                  },
  
                  // 预警统计（区域）
                  queryWarningStatisticsNew(item) {
                      const {
                          endTime,
                          startTime,
                          level,
                          cantonCode
                      } = this.queryParams;
                      const newQuery = {
                          msgType: item ?.msgType || this.queryParams.msgType,
                          btCode: item ?.code || this.queryParams.btCode,
                          endTime,
                          startTime,
                          level,
                          cantonCode
                      }
                      return new Promise((resolve, reject) => {
                          this.ajax({
                              serviceSiteRootUrl: appSettings.ptl.serviceSiteRootUrl,
                              serviceType: "crossDomainCall",
                              serviceName: "ptl/main/warningStatistics",
                              methodName: "queryWarningStatisticsNew",
                              data: {
                                  ticket: this.urlParams.ticket,
                                  queryParams: newQuery
                              },
                              success: (resultData) => {
                                  if (ObjectUtils.hasValue(resultData.data)) {
                                      resolve(resultData.data);
                                  } else {
                                      reject();
                                  }
                              },
                              complete: function () {}
                          });
                      })
                  },
  
                  // 切换预警类型
                  changeCheckType(item) {
                      this.loading = true;
                      if (this.msgTypeCompare.length > item.length) {
                          if (item.length == 0) {
                              item = this.msgTypeCompare;
                              this.$Message.warning("请至少选择一种预警类型;");
                              this.loading = false;
                              setTimeout(() => {
                                  this.msgType = this.msgTypeCompare;
                              })
                              return
                          }
                          let deleteLabel = "";
                          for (let i = 0; i < this.msgTypeCompare.length; i++) {
                              if (this.msgTypeCompare[i] !== item[i]) {
                                  deleteLabel = this.msgTypeCompare[i];
                                  break;
                              }
                          }
                          this.colums = this.colums.filter(item => item.title !== deleteLabel);
                          this.loading = false;
                      } else {
  
                          const keyList = this.typeList.filter(items => items.label === item[item.length - 1]);
                          const {
                              msgType,
                              code
                          } = keyList[0];
                          this.queryParams.msgType = msgType;
                          this.queryParams.btCode = code;
                          this.queryParams.level = this.originLevel;
                          this.queryParams.cantonCode = this.originCantonCode;
                          Promise.all(this.loopGetDataFirstPage()()).then(res => {
                              // 处理数据
                              const {
                                  columns,
                                  data
                              } = this.breakdownCanton(res, this.colums, this.data);
  
                              this.colums = columns;
                              this.data = data;
                              this.loading = false;
                          })
                      }
                      this.msgTypeCompare = item;
                  },
  
                  // 循环机制的预警统计
                  queryWarningStatisticsNewSecond(item) {
                      const {
                          endTime,
                          startTime,
                          level,
                          cantonCode
                      } = this.queryParams;
                      const newQuery = {
                          msgType: item.msgType,
                          btCode: item.code,
                          endTime,
                          startTime,
                          level,
                          cantonCode
                      }
                      return new Promise((resolve, reject) => {
                          this.ajax({
                              serviceSiteRootUrl: appSettings.ptl.serviceSiteRootUrl,
                              serviceType: "crossDomainCall",
                              serviceName: "ptl/main/warningStatistics",
                              methodName: "queryWarningStatisticsNew",
                              data: {
                                  ticket: this.urlParams.ticket,
                                  queryParams: newQuery
                              },
                              success: (resultData) => {
                                  if (ObjectUtils.hasValue(resultData.data)) {
                                      resolve(resultData.data)
                                  } else {
                                      reject();
                                  }
                              },
                              complete: function () {}
                          });
                      })
                  },
                  // 导出接口
                  exportData(item) {
                      const vm = this;
                      const {
                          cantonCode,
                          level,
                          startTime,
                          endTime,
                          msgType
                      } = this.queryParams;
                      const queryObj = {
                          cantonCode: this.cantonLevel[this.nowcantonIx],
                          level: this.nowcantonIx,
                          startTime,
                          endTime,
                          msgType,
                          dictModel: []
                      }
                      let arr = [];
                      this.msgType.forEach(items => {
                          queryObj.dictModel.push(this.typeList.filter(item => item.label === items)[0])
                      })
                      var urlStr = (
                          appSettings.ptl.serviceSiteRootUrl +
                          "/service/ptl/main/warningStatistics/createAreaDetailExcelV2?ticket=" + vm.urlParams.ticket + "&queryParams=" + encodeURI(JSON.stringify(queryObj)));
                      var xhr = new XMLHttpRequest();
                      xhr.open('GET', urlStr);
                      xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                      xhr.responseType = "blob";
                      xhr.onload = function (oEvent) {
                          if (xhr.readyState === 4 && xhr.status === 200) {
                              let blob = new Blob([xhr.response], {
                                  type: `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8`
                              });
                              var csvUrl = URL.createObjectURL(blob);
                              var link = document.createElement('a');
                              link.href = csvUrl;
                              link.download = '预警统计报表.xls';
                              link.click();
                          }
                      }
                      xhr.send();
                  },
                  changeColor(item, index) {
                      if(this.nowcantonIx==this.originLevel){
                          if(index ===this.data.length-1){
                              return "color-black"
                          }
                      }else if(this.nowcantonIx == (Number(this.originLevel)+1)){
                          if(index === this.data2.length-1){
                              return "color-black"
                          }
                      }else if(this.nowcantonIx == (Number(this.originLevel)+2)){
                          if(index === this.data3.length-1){
                              return "color-black"
                          }
                      }
                      return
                  }
              }
          };
  
          me.createVue(vueConfig);
      }
  }
  
  module.exports = Page;
  })//# sourceURL=http://218.94.78.91:18181/spsarchive-webapp/web/sps/views/spsEdit/warningStatistics/warningStatistics.js?_=2218178200172281225