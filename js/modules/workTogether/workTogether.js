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
        "esri/geometry/Polyline",
        "esri/geometry/Point",
        "esri/geometry/Extent",
        "dojo/_base/array",
        "dojo/_base/event",
        "echo/utils/EventBus",
        "data/demo",
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
        Polyline,
        Point,
        Extent,
        arrayUtils,
        Event,
        EventBus,
        demoData
    ) {
        return declare('workTogether', null, {
            eventUnit: [],
            constructor: function(map, config) {
                this.map = map;
                this.config = config;
                this.demoData = demoData;
                this.addBoxIndex = null;
                this.init();
            },
            init: function() {
                EventBus.on("workTogether", this.startup, this);
                EventBus.on("All_WIDGETS_CLOSE", this.close, this);
                // this.landModuleInit();
            },
            landModuleInit: function() {
                //
            },
            startup: function() {
                this.addBoxIndex = -1;
                this.addWorkProcess = -1;

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
                var self = this

                $.get('./js/modules/workTogether/workTogetherTree.html', function(data) {
                    $('.work-together').html(data).removeClass('hide');
                    self.initTree();

                });
            },
            initTree: function(dataobj) {
                var self = this;

                var data = [{ //节点数据
                    name: '泗纶河干流'
                    ,spread:true
                    ,children: [
                        {name: '总河长：黄天生',alias: 'aa',id: '1'},
                        {name: '泗纶河分段',alias: 'cc',spread:true,id: '10',type:'process',
                            children: [
                                {name: '区河长：陈桃',alias: '区河长',id: '2'},
                                {name: '巡查员：李世勋',alias: '巡查员',type:'road',phone:'18332335452'},
                                {
                                    name: '龙湾镇段',alias: 'bb',id: '5',spread:true,
                                    children: [
                                        {name: '镇河长：江世彰',phone:'18632837817',alias: '镇河长',id: '1',type:'road'},
                                        {name: '保洁员：何天心',alias: '保洁员',id: '1',type:'road',phone:'18632332762'}
                                    ]
                                },{
                                    name: '泗纶镇段',alias: 'bb',id: '5',spread:true,
                                    children: [
                                        {name: '镇河长：林盛',phone:'18632938828',alias: '镇河长',id: '1',type:'road'},
                                        {name: '保洁员：李长城',alias: '保洁员',id: '1',type:'road',phone:'18632433773'}
                                    ]
                                },{
                                    name: '连州镇段',alias: 'bb',id: '5',spread:true,
                                    children: [
                                        {name: '镇河长：刘彬',phone:'18633039839',alias: '镇河长',id: '1',type:'road'},
                                        {name: '保洁员：辛婉秀',alias: '保洁员',id: '1',type:'road',phone:'18632534784'}
                                    ]
                                },{
                                    name: '生江镇段',alias: 'bb',id: '5',spread:true,
                                    children: [
                                        {name: '镇河长：邓卓宜',phone:'18643140840',alias: '镇河长',id: '1',type:'road'},
                                        {name: '保洁员：白景同',alias: '保洁员',id: '1',type:'road',phone:'18632635795'}
                                    ]
                                },{
                                    name: '黎少镇段',alias: 'bb',id: '5',spread:true,
                                    children: [
                                        {name: '镇河长：欧小平',phone:'18643241851',alias: '镇河长',id: '1',type:'road'},
                                        {name: '保洁员：钟俊茂',alias: '保洁员',id: '1',type:'road',phone:'18632736806'}
                                    ]
                                }
                            ]
                        }            
                    ]
                  }, {
                    name: '泗纶河支流都门水'
                    ,children: [
                    {name: '总河长',alias: 'aa',id: '12'}
                    ,{name: '副总河长',alias: 'aa',id: '13'}
                    ,{name: '河长办公室',alias: 'aa',id: '14'}
                    ,{name: '督察员a',alias: 'aa',id: '15'}
                    ,{name: '巡查员a',alias: 'bb',id: '16'}
                    ,{name: '保洁员a',alias: 'cc',id: '17'}
                    ,{name: '河段长b',alias: 'cc',id: '18'}
                    ,{name: '河段长a',alias: 'cc',id: '19'}
                    ]
                  }, {
                    name: '泗纶河支流都门水和平支流'
                    ,children: [
                    {name: '总河长',alias: 'aa',id: '20'}
                    ,{name: '副总河长',alias: 'aa',id: '21'}
                    ,{name: '河长办公室',alias: 'aa',id: '22'}
                    ,{name: '督察员a',alias: 'aa',id: '23'}
                    ,{name: '巡查员a',alias: 'bb',id: '24'}
                    ,{name: '保洁员a',alias: 'cc',id: '25'}
                    ,{name: '河段长b',alias: 'cc',id: '26'}
                    ,{name: '河段长a',alias: 'cc',id: '27'}
                    ]
                }]

                layui.config({
                    base: './js/modules/layInit/'
                }).use('layTree', function() {
                    layui.layTree({
                      elem: '#workTree'
                      ,skin: 'shihuang'
                      ,nodes: data
                      ,click: function(node){
                         self.centerAtOrPlayer(node)
                      }
                   });
                })



                setTimeout(function(){
                   // 一级菜单
                   $('#workTree').find('li[data-type="process"]').append('<span class="tree-icon-ls" title="工作进度查看"><em class="layui-icon">&#xe63c;</em> </span>');
                  // 二级菜单
                   $('#workTree').find('li[data-type="road"]').append('<span class="tree-icon-sp" title="路线管理"><em class="layui-icon">&#xe609;</em> </span>');
                   $('#workTree').on('click','.tree-icon-sp',function(){
                        $(this).siblings('a').find('cite').click();
                   });
                   $('#workTree').on('click','.tree-icon-ls',function(){
                        $(this).siblings('a').find('cite').click();
                   })

                },1200);
            },
            centerAtOrPlayer: function(node){
                var playerList = {};
                playerList.list = [];
                playerList.name = node.name;
                if(node.type==="road"){
                    playerList.node = node;
                    this.workContent(playerList)
                }else if(node.type==="process"){
                    var list = node.children;
                    for (var i = 0; i < list.length; i++) {
                        playerList.list.push(list[i].id)
                    }
                    this.workProcess(playerList);
                }
                // console.log(playerList);
            },
            // 路线进度
            workProcess: function(playerList){
                var self = this
                ,mapHeight = $('.container').height()
                ,mapWidth = $('.container').width()-340;
                layui.use(['layer','form','element'], function(){
                    var layer = layui.layer;
                    var form = layui.form;
                    var element = layui.element;
                    if(self.addBoxIndex !== -1){
                       layer.close(self.addBoxIndex);
                    }
                    if(self.addWorkProcess !== -1){
                       $('#workP').parent().remove();
                       this.addWorkProcess = -1
                    }
                    $.get('./js/modules/workTogether/workTogetherProcs.html', null, function(divcont) {
                        self.addWorkProcess = layer.open({
                            type: 1,
                            title: playerList.name+'工作进度',
                            content: divcont,
                            btn: [],
                            fixed:true,
                            shade: false,
                            offset: ['60px','340px'],
                            area: '400px',
                            id:'workP',
                            zIndex: 1995,
                            maxmin: false,
                            success: function(layero, index) {
                                //图表
                                form.render();
                                element.render('progress');
                                $('#workP').next('.layui-layer-setwin').prepend('<span class="layui-icon layui-anim layui-anim-rotate layui-anim-loop">&#x1002;</span>')
                                $('.workp-wrap').on('click', '.workp-add-show', function(event) {
                                    event.preventDefault();
                                    $('.wrap-process').addClass('hide');
                                    $('.workp-add').removeClass('hide');
                                });
                                $('.workp-wrap').on('click', '.workp-add-back', function(event) {
                                    event.preventDefault();
                                    $('.wrap-process').removeClass('hide');
                                    $('.workp-add').addClass('hide');
                                });
                                setTimeout(function(){
                                   element.progress('demo3', '82%');
                                },2000)
                                //模拟loading
                                var n = 37,
                                timer = setInterval(function(){
                                    n = n + Math.random()*10|0;
                                    if(n>100){
                                      n = 100;
                                      clearInterval(timer);
                                    }
                                    element.progress('demo1', n+'%');
                                }, 300+Math.random()*20000);
                            },
                            cancel: function(index, layero){
                                console.log(layero);
                            },
                            end: function() {
                                self.addWorkProcess = -1;
                            }
                        });
                    });
                    
                })
            },
            // 路线编辑
            workContent: function(playerList) {
                var self = this
                ,mapHeight = $('.container').height()
                ,mapWidth = $('.container').width()-340;
                layui.use(['layer','form'], function(){
                    var layer = layui.layer;
                    var form = layui.form;
                    if(self.addWorkProcess !== -1){
                       layer.close(self.addWorkProcess);
                    }
                    if(self.addBoxIndex !== -1){
                       $('#workI').parent().remove();
                       this.addBoxIndex = -1
                    }
                    $.get('./js/modules/workTogether/workTogetherInfo.html', null, function(divcont) {
                        self.addBoxIndex = layer.open({
                            type: 1,
                            title: playerList.name+'信息详情',
                            content: divcont,
                            btn: [],
                            fixed:true,
                            shade: false,
                            offset: ['60px','340px'],
                            area: ['400px','560px'],
                            zIndex: 100,
                            id: 'workI',
                            anim: 2,
                            maxmin: false,
                            success: function(layero, index) {
                                form.render();
                                self.initContentForm(playerList.node)
                                self.initRiverPoint();
                            },
                            cancel: function(index, layero){
                                console.log(layero);
                            },
                            end: function() {
                                self.addBoxIndex = -1;
                            }
                        });
                    });
                });
            },
            initContentForm: function(attributes){
                var self = this,
                data = attributes;
                $.each(data,function(index, el) {
                    $('#workI .worki-info').find('.layui-input-block[data-name='+index+']').html(el);
                });
            },
            initRiverPoint: function(){
                var self = this;
                if(self.meaSpaceLayer){
                    self.meaSpaceLayer.clear();
                }
                // var _road = self.demoData.road;
                var _road = self.demoData.road;
                var num = 0;
                self.featuresLoadArr = [];
                var roadSimplei = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                                new Color([0, 150, 136]), 6);
                $.each(_road,function(index, el) {
                    var _roadT = new Graphic(new Polyline(el.geometry),roadSimplei);
                     el.attributes.num = num;
                    _roadT.attributes = el.attributes;
                    self.meaSpaceLayer.add(_roadT);
                    self.featuresLoadArr.push(el.attributes);
                    num++;
                });
                self.initTable();
                // console.log(self.featuresLoadArr);
                self.meaSpaceLayer.on('click',function(evt){
                    self.infoWindowShow(evt.graphic);
                })
            },
            initTable: function(){
                var self = this;
                layui.use('table', function(){
                    var layTable = layui.table;
                    var loadData =  self.featuresLoadArr;
                    //表格1
                    layTable.render({
                      elem: '#worki-load-table'
                      ,cols: [[ //标题栏index
                        {field: 'name',title: '工作路线编号',minWidth:'120', event: 'setPosition',  style:'cursor: pointer;'}
                        ,{field: 'timeBegan',minWidth:'120', title: '路线开始时间'}
                        ,{field: 'timeEnd',minWidth:'120', title: '路线结束时间'}
                        ,{field: 'length',minWidth:'120', title: '路线长度(KM)'}
                        ,{fixed: 'right',minWidth:'60', align:'center', toolbar: '#barDemo'}
                      ]]
                      ,data:loadData ,limit:3 ,even: false ,unresize:true
                      ,page: {
                          layout: ['count', 'prev', 'page', 'next'] ,groups: 1 ,first: false ,last: false
                        }
                    });
                     //监听工具条
                    layTable.on('tool(table*worki)', function(obj){
                        self.infoWindowShow(self.meaSpaceLayer.graphics[obj.data.num])
                    });
                });
            },
            bindEvent: function() {
            }, // 信息框展示
            infoWindowShow: function(featThis){
                $('.esriPopupWrapper>div:eq(0)').addClass('hide');
                var self = this;
                var centerAt = null;
                this.map.infoWindow.resize(200,40);
                this.map.infoWindow.setTitle('');
                if(featThis.geometry.type === "point"){
                    centerAt = [featThis.geometry.x,featThis.geometry.y];
                    this.map.centerAt(featThis.geometry).then(function(content) {
                      self.map.infoWindow.show(new Point(centerAt));
                    })
                }else if(featThis.geometry.type === "polyline"){
                    var index = Math.ceil(featThis.geometry.paths[0].length/2);
                    centerAt = featThis.geometry.paths[0][index];
                    self.map.setExtent(featThis.geometry.getExtent(),true).then(function(content) {
                      self.map.infoWindow.show(new Point(centerAt));
                    }) ;
                }else if(featThis.geometry.type === "polygon"){
                    var extent =featThis.geometry.getExtent();
                    centerAt = extent.getCenter();
                    self.map.setExtent(extent,true).then(function(content) {
                      self.map.infoWindow.show(new Point(centerAt));
                    });
                }

                this.map.infoWindow.setContent(featThis.attributes.name);
            },
            close: function() {
                if (this.meaSpaceLayer) {
                    this.map.removeLayer(this.meaSpaceLayer);
                    this.meaSpaceLayer = null;
                }
                if (this.draw) {
                    this.draw.deactivate();
                    this.draw = null;
                }
                if(this.addBoxIndex!==-1){
                    $('#workI').parent().remove();
                    this.addBoxIndex = -1
                }
                if(this.addWorkProcess!==-1){
                    $('#workP').parent().remove();
                    this.addWorkProcess = -1
                }
                $('.work-together').empty();
            }
        });

    }
);
