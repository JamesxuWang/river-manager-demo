define(["dojo/_base/declare",
        "dojo/query",
        "dojo/on",
        "esri/graphic",
        "esri/toolbars/draw",
        "esri/symbols/SimpleFillSymbol",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/Color",
        "esri/tasks/query",
        "esri/tasks/QueryTask",
        "esri/layers/GraphicsLayer",
        "esri/geometry/Polygon",
        "esri/geometry/Extent",
        "dojo/_base/array",
        "dojo/_base/event",
        "echarts/echarts",
        "echo/utils/EventBus",
        "data/data",
        "dojo/domReady!"
    ],
    function(
        declare,
        query,
        on,
        Graphic,
        Draw,
        SimpleFillSymbol,
        SimpleMarkerSymbol,
        SimpleLineSymbol,
        Color,
        Query,
        QueryTask,
        GraphicsLayer,
        Polygon,
        Extent,
        arrayUtils,
        Event,
        echarts,
        EventBus,
        dataDemo
    ) {
        return declare('analyzeSum', null, {
            eventUnit: [],
            constructor: function(map, config) {
                this.map = map;
                this.config = config;
                this.demoData = dataDemo; 
                this.addBoxIndex = null;
                this.myChart = null;
                this.chartType = null;
                this.init();
            },
            init: function() {
                EventBus.on("analyzeSum", this.startup, this);
                EventBus.on("All_WIDGETS_CLOSE", this.close, this);
            },
            startup: function() {
                this.addBoxIndex = -1;
                this.myChart = null;
                this.chartType = null;
                this.meaSpaceLayer = new GraphicsLayer();
                this.map.addLayer(this.meaSpaceLayer);
                this.symbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0]), 2),
                    new Color([102, 195, 233, 0.5])
                );
                // this.bindEvent();
                this.initHtml();
            },
            initHtml: function(dataObj) {
                var self = this;
                $.get('./js/modules/analyzeSum/analyzeSumTab.html', function(data) {
                    $('.analyze-sum').html(data);
                    self.initTab();
                });
            },
            initTab: function(dataobj) {
                var self = this;
                layui.use(['element', 'layer'], function() {
                    var elementd = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
                    elementd.init('nav', 'superv-wrap-nav')
                    var layer = layui.layer;
                    //监听导航点击
                    elementd.on('nav(superv-wrap-nav)', function(elem) {
                        self.chartType = $(elem).attr('echarts-moudle')
                        self.centerAtOrPlayer($(elem).text())
                    });
                });
            },
            centerAtOrPlayer: function(node) {
                //处理问题
                this.player(node);
            },
            player: function(nodeName) {
                var self = this,
                    mapHeight = $('.container').height(),
                    mapWidth = $('.container').width() - 340;
                layui.use(['form','layer', 'laydate'], function() {
                    var layer = layui.layer
                    var laydate = layui.laydate
                    var form = layui.form;
                    if (self.addBoxIndex !== -1) {
                        // $('.river-content-name').html(name);
                        $('#analyzeSumC').prev('.layui-layer-title').html(nodeName);
                        self.initChart();
                    } else {
                        //本表单通过ajax加载 --以模板的形式，当然你也可以直接写在页面上读取
                        $.get('./js/modules/analyzeSum/analyzeSumContent.html', null, function(divcont) {
                            self.addBoxIndex = layer.open({
                                type: 1,
                                title: nodeName + '报表',
                                content: divcont,
                                btn: [],
                                fixed: true,
                                shade: false,
                                offset: ['60px', '340px'],
                                area: [mapWidth + 'px', mapHeight + 'px'],
                                zIndex: 100,
                                id: 'analyzeSumC',
                                anim: 2,
                                move: false,
                                maxmin: false,
                                success: function(layero, index) {
                                    form.render();
                                    self.initChart();
                                },
                                cancel: function(index, layero) {
                                    console.log(layero);
                                },
                                end: function() {
                                    self.addBoxIndex = -1;
                                }
                            });
                        });
                    }
                })

            },
            initChart: function() {
                // 指定图表的配置项和数据
                var self = this;
                if (self.myChart != null && self.myChart != "" && self.myChart != undefined) {  
                    self.myChart.dispose();  
                }  
                self.myChart = echarts.init(document.getElementById('echartsCanvas'));
                var option = self.demoData[self.chartType];
                self.myChart.setOption(option);
            },
            bindEvent: function() {},
            close: function() {
                if (this.meaSpaceLayer) {
                    this.map.removeLayer(this.meaSpaceLayer);
                    this.meaSpaceLayer = null;
                }
                if (this.draw) {
                    this.draw.deactivate();
                    this.draw = null;
                }
                if (this.addBoxIndex !== -1) {
                    this.addBoxIndex = -1
                    $('#analyzeSumC').parent().remove();
                }
                $('.analyze-sum').empty();
            }
        });
    }
);