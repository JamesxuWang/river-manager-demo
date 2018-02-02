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
        return declare('dailyManage', null, {
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
                EventBus.on("dailyManage", this.startup, this);
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
                this.player();
            },
            player: function() {
                var self = this,
                    mapHeight = $('.container').height(),
                    mapWidth = $('.container').width();
                layui.use(['form','laypage', 'laydate'], function() {
                    var layer = layui.layer
                    var laypage = layui.laypage;
                    var form = layui.form;
                    if (self.addBoxIndex !== -1) {
                        //reflesh
                    } else {
                        //本表单通过ajax加载 --以模板的形式，当然你也可以直接写在页面上读取
                        $.get('./js/modules/dailyManage/dailyManage.html', null, function(divcont) {
                            self.addBoxIndex = layer.open({
                                type: 1,
                                title: '日常信息管理',
                                content: divcont,
                                btn: [],
                                fixed: true,
                                shade: false,
                                offset: 'b',
                                area: [mapWidth + 'px', mapHeight + 'px'],
                                zIndex: 100,
                                id: 'dailyManageC',
                                anim: 2,
                                move: false,
                                maxmin: false,
                                success: function(layero, index) {
                                    form.render();
                                    laypage.render({
                                        elem: 'daily-pager-div' //注意，这里的 test1 是 ID，不用加 # 号
                                        ,count: 50 //数据总数，从服务端得到
                                        ,theme:'#120d58'
                                    });
                                    self.initData();
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
            initData: function(){
                var data = [
                  {'msg':'广州市供水水质情况', 'date':'2018-01-23'},
                  {'msg':'广州市人民政府关于开展白坭河和新街河堆场综合整治行动的通告', 'date':'2017-10-31'},
                  {'msg':'广州市人民政府关于清理整顿重点河涌流域“散乱污”场所的通告', 'date':'2017-12-17'},
                  {'msg':'广州市水务局关于公布重点河涌、流溪河流域范围以及东江北干流、珠江广州河段河道管理范围的通知', 'date':'2017-10-26'},
                  {'msg':'广州市住建部重点挂牌督办黑臭水体信息公开', 'date':'2017-05-19'},
                  {'msg':'2017年度省主要河道（广州辖区内）和广州市管采砂河道河砂禁采区公告征求公众意见', 'date':'2016-12-27'},
                  {'msg':'广州市2015年度中心城区污水管网及其附属设施管理责任名录', 'date':'2015-05-25'},
                  {'msg':'广州市2015年度河道管理责任人名单和投诉电话', 'date':'2015-05-22'},
                  {'msg':'广州市流溪河流域综合规划环境影响评价公众参与信息公示', 'date':'2014-05-27'},
                  {'msg':'关于积极开展水利普法依法治理知识问答活动的通知', 'date':'2014-05-27'}
                ];
                var html = '';
                $.each(data,function(index, el) {
                    html += 
                     `<div class="layui-inline">
                          <label class="layui-form-label"><span class="layui-badge-dot layui-bg-theme"></span>${el.msg}</label>
                          <div class="layui-input-inline">${el.date}</div>
                     </div>`;  
                });
                $('#dailyManageC').find('.daily-content').html(html);
            },
            bindEvent: function() {},
            close: function() {
                if (this.addBoxIndex !== -1) {
                    this.addBoxIndex = -1
                    $('#dailyManageC').parent().remove();
                }
                $('.daily-manage').empty();
            }
        });
    }
);
