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
        EventBus,
        dataDemo
    ) {
        return declare('supervAssess', null, {
            eventUnit: [],
            constructor: function(map, config) {
                this.map = map;
                this.config = config;
                this.demoData = dataDemo;
                this.addBoxIndex = null;
                this.init();
            },
            init: function() {
                EventBus.on("supervAssess", this.startup, this);
                EventBus.on("All_WIDGETS_CLOSE", this.close, this);
            },
            startup: function() {
                this.addBoxIndex = -1;
                this.tableType = null;
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
                $.get('./js/modules/supervAssess/supervAssessTab.html', function(data) {
                    $('.superv-assess').html(data).removeClass('hide');
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
                        self.tableType = $(elem).attr('table-data');
                        if(self.tableType){
                            self.centerAtOrPlayer(elem.text());
                        }
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
                        $('#supervAssessC').prev('.layui-layer-title').html(nodeName);
                        self.initForm();
                    } else {
                        //本表单通过ajax加载 --以模板的形式，当然你也可以直接写在页面上读取
                        $.get('./js/modules/supervAssess/supervAssessContent.html', null, function(divcont) {
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
                                id: 'supervAssessC',
                                anim: 2,
                                move: false,
                                maxmin: false,
                                success: function(layero, index) {
                                    self.initForm();
                                    form.render();
                                    //日期
                                    laydate.render({
                                        elem: '#dateBegin'
                                    });
                                    laydate.render({
                                        elem: '#dateEnd'
                                    });
                                },
                                cancel: function(index, layero) {
                                    // console.log(layero);
                                },
                                end: function() {
                                    self.addBoxIndex = -1;
                                }
                            });
                        });
                    }
                })

            },
            initForm: function() {
                var self = this
                ,mapHeight = $('.container').height()
                ,tableLimit = Math.floor((mapHeight-205-80)/40)
                ,cols = null;
                $('#supervAssessC').find('.layui-form').addClass('hide');
                if(self.tableType==='2'){
                     //colspan即横跨的单元格数，这种情况下不用设置field和width
                    cols = [[
                        {align: 'center', title: '序号', rowspan:2,field:'id'}
                        ,{align: 'center', title: '姓名', rowspan:2,field:'name'}
                        ,{align: 'center', title: '公众评价', colspan:2} 
                        ,{align: 'center', title: '微信事件上报', colspan:2}
                        ,{align: 'center', title: '急速响应事件', colspan:2}
                        ,{align: 'center', title: '定时作业签到数', colspan:2}
                        ,{align: 'center', title: '仪容仪表', colspan:2}
                        ,{align: 'center', title: '轨迹上传', colspan:2}
                        ,{align: 'center', title: '总计', rowspan:2,field:'GG',sort:true}
                      ], [
                        {field: 'A1', title: '合格', width: 80}
                        ,{field: 'A2', title: '不合格', width: 80}
                        ,{field: 'B1', title: '合格', width: 80}
                        ,{field: 'B2', title: '不合格', width: 80}
                        ,{field: 'C1', title: '合格', width: 80}
                        ,{field: 'C2', title: '不合格', width: 80}
                        ,{field: 'D1', title: '合格', width: 80}
                        ,{field: 'D2', title: '不合格', width: 80}
                        ,{field: 'E1', title: '合格', width: 80}
                        ,{field: 'E2', title: '不合格', width: 80}
                        ,{field: 'F1', title: '合格', width: 80}
                        ,{field: 'F2', title: '不合格', width: 80}
                    ]]
                }else if(self.tableType==='1'){
                     $('#supervAssessC').find('.layui-form').removeClass('hide');
                    cols =  [[ //标题栏
                        { field: 'id', title: '序号', sort: true},
                        { field: 'area', title: '区县'},
                        { field: 'reach', title: '河段' },
                        { field: 'date', title: '巡检时间', width:'210'  },
                        { field: 'location', title: '巡检地点' },
                        { field: 'department', title: '所在部门', width:'150'  },
                        { field: 'office', title: '河长等级' },
                        { field: 'person', title: '河长' },
                        { field: 'check', title: '考核人员' },
                        { field: 'phone', title: '联系方式' },
                        { field: 'state', title: '状态' },
                        { field: 'river', title: '河湖名称', sort: true, fixed: 'right'},
                        { fixed: 'right', align: 'center', toolbar: '#supervAFormbar' }
                    ]]
                }
                layui.use('table', function() {
                    var table = layui.table;
                    table.render({
                        elem: '#supervATable'
                        ,cols: cols
                        ,cellMinWidth: '140'
                        ,data: self.demoData['table'+self.tableType]
                        ,unresize: true
                        ,page: {
                            theme: '#3cacff'
                        }
                        ,limit:tableLimit
                        ,id: 'supervATableReload'
                    });
                })
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
                    $('#supervAssessC').parent().remove();
                }
                $('.superv-assess').empty();
            }
        });
    }
);
