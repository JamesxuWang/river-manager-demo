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
        return declare('mediaShow', null, {
            eventUnit: [],
            constructor: function(map, config) {
                this.map = map;
                this.config = config;
                this.addBoxIndex = null;
                this.init();
            },
            init: function() {
                EventBus.on("mediaShow", this.startup, this);
                EventBus.on("All_WIDGETS_CLOSE", this.close, this);
                // this.landModuleInit();
            },
            landModuleInit: function() {
                //
            },
            startup: function() {    
                this.addBoxIndex = -1;      
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
                        
                $.get('./js/modules/mediaShow/mediaShowTree.html', function(data) {
                    $('.media-video').html(data);
                    self.initTree();

                }); 
            }, 
            initTree: function(dataobj) {
                var self = this;

                var data = [{ //节点数据
                    name: '石井河'
                    ,spread:true
                    ,children: [
                    {name: '视频点a',alias: 'aa',id: '1'}
                    ,{name: '视频点b',alias: 'bb',id: '2'}
                    ,{name: '视频点c',alias: 'cc',id: '3'}
                    ]
                  }, {
                    name: '增埗河'
                    ,children: [
                    {name: '视频点a',alias: 'aa',id: '1'}
                    ,{name: '视频点b',alias: 'bb',id: '2'}
                    ,{name: '视频点c',alias: 'cc',id: '3'}
                    ]
                  }, {
                    name: '西航道支线'
                    ,children: [
                    {name: '视频点a',alias: 'aa',id: '1'}
                    ,{name: '视频点b',alias: 'bb',id: '2'}
                    ,{name: '视频点c',alias: 'cc',id: '3'}
                    ]
                  }] 

                // $.get(self.config.findList, function(data) { 
                  // console.log(data);              
                   layui.tree({
                      elem: '#mediaTree'
                      ,skin: 'shihuang'
                      ,nodes: data
                      ,click: function(node){
                             // console.log(node)
                         self.centerAtOrPlayer(node)
                      } 
                    });
                   $('#mediaTree').find('li').append('<span class="tree-icon-sp"><em class="layui-icon">&#xe652;</em> </span>');
                   $('#mediaTree').off('click').on('click','.tree-icon-sp',function(){
                        $(this).siblings('a').find('cite').click();
                   })
                // },'json');   
                //添加视频    
            },
            centerAtOrPlayer: function(node){
                var playerList = {};
                playerList.list = [];                
                if(node.alias){
                    playerList.list.push(node.id);
                }else{
                    var list = node.children;
                    for (var i = 0; i < list.length; i++) {
                        playerList.list.push(list[i].id)
                    }
                }
                playerList.name = node.name;
                this.player(playerList)
            },
            player: function(playerList) {
                var self = this
                ,mapHeight = $('.container').height()
                 ,mapWidth = $('.container').width()-340           
                ,layer = layui.layer

                if(self.addBoxIndex !== -1) return;
                self.addBoxIndex = layer.open({
                    type: 1,
                    title: playerList.name+'监测情况',
                    content: '<div></div>',
                    btn: [],
                    fixed:true,
                    shade: false,
                    offset: ['60px','340px'],
                    area: [mapWidth + 'px', mapHeight + 'px'],
                    zIndex: 100,
                    id: 'playerV',
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
                // src="movie.ogg"
                var self = this;
                $('#playerV').empty(); 
                var  url= '',ls = playerList.list.length; 
                if(ls == '1'){
                    url= self.config.filePath + playerList.list[0]+'.gif';
                    // $('#playerV').append('<video src="'+url+'"  height="100%" width="100%" controls autoplay muted></video>')
                    $('#playerV').append(
                    `<div class="layui-row" style = "width:100%;height:100%;">
                        <div class="layui-col-xs12 layui-col-md12">
                          <div class="grid-demo grid-demo-bg1">
                               <img src="${url}" alt=""  width="100%" height="100%"/>
                          </div>
                        </div>
                    </div>`
                    )
                }else if(ls>=2 && ls <= 4){
                    $('#playerV').append(
                    `<div class="layui-row" style = "width:100%;height:50%;">
                        <div class="layui-col-xs6 layui-col-md6">
                          <div class="grid-demo grid-demo-bg1"><img width="100%" height="100%" src="./dijit/video/1.gif" alt="" /></div>
                        </div>
                        <div class="layui-col-xs6 layui-col-md6">
                          <div class="grid-demo"><img width="100%" height="100%" src="./dijit/video/2.gif" alt="" /></div>
                        </div>
                    </div>
                    <div class="layui-row" style = "width:100%;height:50%;">
                        <div class="layui-col-xs6 layui-col-md6">
                          <div class="grid-demo"><img width="100%" height="100%" src="./dijit/video/3.gif" alt="" /></div>
                        </div>
                        <div class="layui-col-xs6 layui-col-md6">
                          <div class="grid-demo grid-demo-bg1"><img width="100%" height="100%" src="./dijit/video/4.gif" alt="" /></div>
                        </div>
                    </div>`
                    );
                }else if(ls>=5 && ls <= 9){
                    $('#playerV').append(
                    `<div class="layui-row" style = "width:33%;height:33%;">
                        <div class="layui-col-xs4 layui-col-md4">
                          <div class="grid-demo">6/12</div>
                        </div>
                        <div class="layui-col-xs4 layui-col-md4">
                          <div class="grid-demo grid-demo-bg1">6/12</div>
                        </div>
                        <div class="layui-col-xs4 layui-col-md4">
                          <div class="grid-demo">6/12</div>
                        </div>
                    </div>
                    <div class="layui-row" style = "width:33%;height:33%;">
                        <div class="layui-col-xs4 layui-col-md4">
                          <div class="grid-demo">6/12</div>
                        </div>
                        <div class="layui-col-xs4 layui-col-md4">
                          <div class="grid-demo grid-demo-bg1">6/12</div>
                        </div>
                        <div class="layui-col-xs4 layui-col-md4">
                          <div class="grid-demo">6/12</div>
                        </div>
                    </div>
                    <div class="layui-row" style = "width:33%;height:33%;">
                        <div class="layui-col-xs4 layui-col-md4">
                          <div class="grid-demo">6/12</div>
                        </div>
                        <div class="layui-col-xs4 layui-col-md4">
                          <div class="grid-demo grid-demo-bg1">6/12</div>
                        </div>
                        <div class="layui-col-xs4 layui-col-md4">
                          <div class="grid-demo">6/12</div>
                        </div>
                    </div>`);
                } 
                // var  url= self.config.filePath + name;
                // $('#playerV').append('<video src="'+url+'"  height="100%" width="100%" controls autoplay muted></video>')
                // $('#playerV').find('video').attr('src', ); 
                $('.layui-row>div').append('<button class="layui-btn layui-btn-theme">预警上报</button>')
                   
                $('#playerV').append(
                `<form class="layui-form">
                  <div class="layui-form-item">
                    <label class="layui-form-label">预警上报名称:</label>
                    <div class="layui-input-block">
                      <input type="text" name="YHDMC"  placeholder="请输入" autocomplete="off" class="layui-input">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">预警上报时间:</label>
                    <div class="layui-input-block">
                      <input type="text" name="YHDWZ" placeholder="请输入" autocomplete="off" class="layui-input">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">预警所属河段:</label>
                    <div class="layui-input-block">
                      <input type="checkbox" name="DZNTYPE" title="现存点" checked>
                      <input type="checkbox" name="DZHTYPE" title="历史点">
                    </div>
                  </div>
                  <div class="layui-form-item">
                    <label class="layui-form-label">预警内容:</label>
                    <div class="layui-input-block">
                        <select name="QX" lay-verify="required" lay-filter="QX">
                            <option value=""></option>
                            <option value="0">天心区</option>
                            <option value="1">天心区</option>
                        </select>                
                    </div>
                  </div>
                  <div class="layui-form-item" style="text-align: center;margin-top: 20px;">
                      <button class="layui-btn layui-btn-primary" type="reset">取消</button>
                      <button class="layui-btn lay-submit layui-btn-danger" lay-submit="" lay-filter="disaster-search-bt">提交</button> 
                  </div>
                </form>`
                )
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
                    $('#playerV').parent().remove();
                    this.addBoxIndex = -1
                }               
                $('.media-video').empty();
            }
        });
    }
);
