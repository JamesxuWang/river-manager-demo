require([
    "esri/map",
    "esri/geometry/Point",
    "dojo/on",
    "dojo/dom",
    "dojo/query",
    "esri/layers/TiledMapServiceLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/dijit/Scalebar",
    "config/config",
    "config/mapconfig",
    "modules/mapUnit/BaseMap",
    "modules/mapUnit/BaseMapSwitch",
    "modules/mapUnit/area",
    "modules/mapUnit/distance",
    "modules/mapUnit/tagging",
    "modules/mapUnit/yingyan",
    "modules/mapUnit/zoom",
    "modules/mapUnit/Copyright",
    "echo/utils/EventBus",
    "echo/viewer/mapmanager",
    "dojo/i18n!esri/nls/jsapi",
    "modules/layInit/layInit",
    "modules/riverManager/riverManager",
    "modules/mediaShow/mediaShow",
    "modules/workTogether/workTogether",
    "modules/supervAssess/supervAssess",
    "dojo/NodeList-traverse",
    "dojo/domReady!"
  ],
  function(
    Map,
    Point,
    on,
    dom,
    query,
    TiledMapServiceLayer,
    ArcGISTiledMapServiceLayer,
    ArcGISDynamicMapServiceLayer,
    Scalebar,
    config,
    mapconfig,
    BaseMap,
    BaseMapSwitch,
    area,
    distance,
    tagging,
    yingyan,
    zoom,
    Copyright,
    EventBus,
    mapmanager,
    bundle,
    layInit,
    riverManager,
    mediaShow,
    workTogether
  ) {

    esriConfig.defaults.io.proxyUrl = config.proxyUrl;
    esriConfig.defaults.io.alwaysUseProxy = false;

    var mapmanager = new mapmanager('mapDiv', mapconfig);
    var map = mapmanager.getMap();

    new BaseMapSwitch(map, "switchBaseMap");

    new zoom(map); /*放大缩小*/
    new area(map); /*测面模块*/
    new distance(map); /*测距模块*/
    // var tagging = new tagging(map); /*标注*/
    new yingyan(map); /*鹰眼模块*/
    new Copyright(map, config.Copyright);/*版权控件*/

    // //菜单控制
    new layInit(map,config.layui);    /*layui初始化*/
    new riverManager(map,config.riverManager);
    new mediaShow(map,config.mediaShow);
    new workTogether(map,config.workTogether);

    new supervAssess(map,config.supervAssess);


    EventBus.emit('mediaShow'); 

    /*添加比例尺控件*/
    bundle.widgets.scalebar.mi = "英里";
    bundle.widgets.scalebar.m = "米";
    bundle.widgets.scalebar.km = "公里";
    bundle.widgets.scalebar.ft = "英尺";

    new Scalebar({map: map, scalebarUnit: "dual"});


    EventBus.emit('YINGYAN_STARTUP'); /*打开鹰眼模块*/

    /*版权控件*/
    var copyright = new Copyright(map, config.Copyright);
    copyright.startup();

    layui.use('element', function(){
      var element = layui.element;
    });

  });
