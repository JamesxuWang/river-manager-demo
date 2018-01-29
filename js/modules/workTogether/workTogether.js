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
        EventBus
    ) {
        return declare('workTogether', null, {
            eventUnit: [],
            constructor: function(map, config) {
                this.map = map;
                this.config = config;
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
                    $('.work-together').html(data);
                    self.initTree();

                }); 
            }, 
            initTree: function(dataobj) {
                var self = this;

                var data = [{ //节点数据
                    name: '石井河'
                    ,spread:true
                    ,children: [
                    {name: '督察员a',alias: 'aa',id: '1'}
                    ,{name: '巡查员a',alias: 'bb',id: '2'}
                    ,{name: '保洁员a',alias: 'cc',id: '3'}
                    ]
                  }, {
                    name: '增埗河'
                    ,children: [
                    {name: '督察员a',alias: 'aa',id: '1'}
                    ,{name: '巡查员a',alias: 'bb',id: '2'}
                    ,{name: '保洁员a',alias: 'cc',id: '3'}
                    ]
                  }, {
                    name: '西航道支线'
                    ,children: [
                    {name: '督察员a',alias: 'aa',id: '1'}
                    ,{name: '巡查员a',alias: 'bb',id: '2'}
                    ,{name: '保洁员a',alias: 'cc',id: '3'}
                    ]
                  }] 

                // $.get(self.config.findList, function(data) { 
                  // console.log(data);              
                   layui.tree({
                      elem: '#workTree'
                      ,skin: 'shihuang'
                      ,nodes: data
                      ,click: function(node){
                             // console.log(node)
                         self.centerAtOrPlayer(node)
                      } 
                   });

                   // 一级菜单
                   $('#workTree>li').append('<span class="tree-icon-ls" title="工作进度与人员添加"><em class="layui-icon">&#xe63c;</em> </span>');
                  // 二级菜单
                   $('#workTree>li>ul>li').append('<span class="tree-icon-sp" title="巡查路线管理"><em class="layui-icon">&#xe609;</em> </span>');                  
                   $('#workTree').on('click','.tree-icon-sp',function(){
                        $(this).siblings('a').find('cite').click();
                   });
                   $('#workTree').on('click','.tree-icon-ls',function(){
                        $(this).siblings('a').find('cite').click();
                   })
                // },'json');   
                //添加视频    
            },
            centerAtOrPlayer: function(node){
                var playerList = {};
                playerList.list = [];                
                playerList.name = node.name;               
                if(node.alias){
                    playerList.list.push(node.id);
                    this.workContent(playerList)
                }else{
                    var list = node.children;
                    for (var i = 0; i < list.length; i++) {
                        playerList.list.push(list[i].id)
                    }
                    this.workProcess(playerList);
                }
                console.log(playerList);
            },
            // 巡查进度
            workProcess: function(playerList){
                var self = this
                ,mapHeight = $('.container').height()
                 ,mapWidth = $('.container').width()-340           
                ,layer = layui.layer

                if(self.addWorkProcess !== -1){
                   // $('.river-content-name').html(name);
                   console.log('sss')     
                }else{
                    //本表单通过ajax加载 --以模板的形式，当然你也可以直接写在页面上读取
                    $.get('./js/modules/workTogether/workTogetherProcs.html', null, function(divcont) {
                        self.addWorkProcess = layer.open({
                            type: 1,
                            title: '工作进度与人员添加',
                            content: divcont,
                            btn: [],
                            fixed:true,
                            shade: false,
                            offset: 'r',
                            area: '400px',
                            id:'workProcess',
                            zIndex: 1995,
                            maxmin: false,
                            success: function(layero, index) {                          
                                //图表
                                var form = layui.form;
                                form.render();

                                var element = layui.element;
                                element.progress('demo', '90%');
                                element.progress('demo1', '40%');  
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
                            },
                            cancel: function(index, layero){ 
                                console.log(layero);
                            },  
                            end: function() {
                                self.addWorkProcess = -1;
                                self.close();
                            }
                        });
                    });
                } 
            },
            // 巡查编辑
            workContent: function(playerList) {
                var self = this
                ,mapHeight = $('.container').height()
                 ,mapWidth = $('.container').width()-340           
                ,layer = layui.layer

                if(self.addBoxIndex !== -1) return;
                self.addBoxIndex = layer.open({
                    type: 1,
                    title: playerList.name+'信息管理',
                    content: '<div></div>',
                    btn: [],
                    fixed:true,
                    shade: false,
                    offset: ['60px','340px'],
                    area: ['400px', mapHeight + 'px'],
                    zIndex: 100,
                    id: 'workV',
                    anim: 2,
                    move: false,
                    maxmin: false,
                    success: function(layero, index) {                       
                        self.initVideo(playerList);
                    },
                    cancel: function(index, layero){ 
                        console.log(layero);
                    },  
                    end: function() {
                        self.addBoxIndex = -1;
                    }
                });
            },
            initVideo: function(playerList){                
               
            },         
            bindEvent: function() {
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
                    $('#workV').parent().remove();
                    this.addBoxIndex = -1
                }               
                $('.work-together').empty();
            }
        });
    }
);
