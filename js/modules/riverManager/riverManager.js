define([
    "dojo/_base/declare",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",
    "esri/Color",
    "esri/tasks/QueryTask",
    "esri/tasks/query",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/geometry/geometryEngine",
    "esri/layers/WMSLayer",
    "esri/geometry/Extent",
    "esri/layers/WMSLayerInfo",
    "esri/layers/GraphicsLayer",
    "echo/utils/EventBus",
    "esri/toolbars/draw",
    "esri/geometry/Polygon",
    "esri/geometry/Polyline",
    "esri/geometry/Point",
    "dojo/on",
    "esri/graphic",
    "data/demo",
    "dojo/NodeList-dom",
    "dojo/NodeList-manipulate"
], function(
    declare,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    Color,
    QueryTask,
    Query,
    ArcGISDynamicMapServiceLayer,
    geometryEngine,
    WMSLayer,
    Extent,
    WMSLayerInfo,
    GraphicsLayer,
    EventBus,
    Draw,
    Polygon,
    Polyline,
    Point,
    on,
    Graphic,
    demoData
    ) {
    return declare("riverManager", null, {
        constructor: function(map, config) {
            this.map = map;
            this.config = config;
            this.demoData = demoData;           
            this.init();     
        },
        init: function() {
            EventBus.on("riverManager", this.startup, this);
            EventBus.on("All_WIDGETS_CLOSE", this.close, this);
            this.addBoxIndex = -1;
            this.pageSize =5;         
            this.featuresVideoArr = null;        
            this.drawTool = new Draw(this.map);

            this.lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                new Color([255, 0, 0]), 6);
            this.markersymbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 18,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0, 0.1]), 1),
                    new Color([40, 136, 215, 1]));
            this.opcitySymbol = new SimpleFillSymbol(
                    SimpleFillSymbol.STYLE_SOLID,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0]), 2),
                    new Color([102, 195, 233, 0.2])
                );
            this.bindEvent();
           
        },
        startup: function() {
            this.featuresVideoArr = [];
            this.featuresDirtyArr = [];
            this.featuresShowArr = [];

            this.addBoxIndex = -1;      
            this.prevGraphic = null;


            this.mapLayer = new GraphicsLayer();
            this.map.addLayer(this.mapLayer);

            this.riverManagerLayer = new GraphicsLayer();
            this.map.addLayer(this.riverManagerLayer);

            this.initHtml();
        },
        bindEvent: function() {            
            var self = this;
            $('.river-manager').on('click', '.river-manager-draw', function(event) {
                event.preventDefault();
                self.symbolDraw(event);
            });
            $('.river-manager').on('click', '.river-add-bt', function(event) {
                event.preventDefault();
                $('.river-manager .wrap').addClass('hide');
                $('.river-manager .river-add').removeClass('hide');
                $('.river-manager button[type=reset]').click();                  
            });
            $('.river-manager').on('click', '.river-add-back', function(event) {
                event.preventDefault();
                $('.river-manager .wrap').removeClass('hide');
                $('.river-manager .river-add').addClass('hide');   
                $('.river-manager button[type=reset]').click();                                                        
            });
            
            $('.river-manager').on('click', '.river-draw-cancle', function(event) {
                event.preventDefault();
                if (self.riverManagerLayer) {
                    self.riverManagerLayer.clear();
                }
                if(self.drawComplete){
                    self.drawComplete.remove();
                }
                $('.river-manager-draw').removeClass('layui-this');               
                self._graphic = null;
                self.drawComplete = null;
                self.draw.deactivate();
            });
        },
        initHtml: function() { 
            var self = this;
            $.get('./js/modules/riverManager/riverManager.html', function(data) {
                $('.river-manager').html(data);
                // var html = '<option value="">全部</option>';
                // $.each(self.config.xingzhengqu,function(index, el) {
                //     html += '<option value="'+self.config.xingzhengqu[index] +'">'+self.config.xingzhengqu[index] +'</option>'                    
                // });
                // $('.river-manager').find('select[name=QX]').html(html);
                layui.use('form', function() {
                    var form = layui.form;                        
                    form.render();    
                    //监听提交
                    form.on('submit(rivermanager-search-bt)', function(data) {
                        // console.log(data);
                        setTimeout(function(){
                           self.dataDemo(data); 
                        }, 0);      
                        // self.dataForm(data);
                        return false;
                    });
                    form.on('submit(rivermanager-add-bt)', function(data) {                            
                        setTimeout(function(){
                            $('.rivermanager-add-back').click();
                        }, 0); 
                        return false;
                    });
                });
                self.runPager();

            });  
        },         
        runPager:function(){
            var self = this;            
            self.featuresArr = self.demoData.river;
            var ls = self.featuresArr.length;
            // self.pageSize = 3//
            layui.use('laypage', function() {
                var laypage = layui.laypage;
                laypage.render({
                  elem: 'layui-river-page'
                  ,count: ls //数据总数，从服务端得到
                  ,limit:self.pageSize
                  ,groups: 3
                  ,jump: function(obj, first){
                    self.showData(obj.curr-1);
                    //首次不执行
                    if(!first){
                      //do something
                    }
                  }
                });
            })    
        },
        showData: function(currPage){
            var self = this;
            self.riverManagerLayer.clear();
            this.map.infoWindow.hide();                             
            // if()
            $('.river-side-scroll ul').empty();
            var page = currPage,pageSize = self.pageSize,fsetData =self.featuresArr;
            var minPage = page*pageSize;
            var maxPage = (page+1)*pageSize < fsetData.length ? (page+1)*pageSize : fsetData.length;
            var num=0,isMain = '';        
            for(var i=minPage,j=maxPage;i<j;i++){
              var listHtml = '';
              num++;
              var feat = fsetData[i].attributes;
              listHtml +=  `<li class="layui-side-li">
                    <div class="panel panel-default panel-active">
                        <div class="panel-heading layui-row" num="${i}" name="${feat['name']}">
                            <span class="layui-col-md7 layui-elip"><span class="layui-badge layui-circle">${num}</span>${feat['name']}</span>
                            <div class="layui-col-md5">
                                <button class="layui-btn layui-btn-xs"><em class="layui-icon">&#xe642;</em></button>
                                <button class="layui-btn layui-btn-xs"><em class="layui-icon">&#xe640;</em></button>
                            </div>
                        </div>
                        <div class="panel-body">
                            上呗河流 ：松花江上
                            <hr>
                            河流长度 ：1041KM
                        </div>
                    </div>
                </li>`    
                        
              $('.river-side-scroll ul').append(listHtml);                    
              //     offIndexStyle集成       
              // fsetData[i].setSymbol(self.markersymbol);
              // self.riverManagerLayer.add(fsetData[i]);
              fsetData[i].attributes.indexNum = i;   
              if(fsetData[i].attributes.type == 'river'){
                var _graphic =  new Graphic(new Polyline(fsetData[i].geometry),self.lineSymbol);
              }else{
                var _graphic =  new Graphic(new Polygon(fsetData[i].geometry),self.opcitySymbol);
              }

              _graphic.attributes = fsetData[i].attributes;
              self.riverManagerLayer.add(_graphic);
            }
            //列表数据与地图数据关联
            $('.river-manager-results .panel-heading').unbind('click').bind('click',function(evt){
              $('.river-side-scroll .panel-active').removeClass('panel-active').addClass('panel-default');          
              var numAttr = $(this).attr('num');
              var _parent = $(this).parent();
              var index = Number($(this).find('.layui-badge').html())-1;
              var name = $(this).attr('name');;

              // if(!attrToolCheck){
              //   $('.attr-result .panel-body').slideUp(100);
              //   _parent.find('.panel-body').slideDown(100);            
              // }else{
                _parent.addClass('panel-active').removeClass('panel-default');             
                // var numScroll = $(this).find('.layui-badge').html();
                var a = _parent.offset().top;
                var b = _parent.parent().offset().top;
                var c = _parent.parent().scrollTop();
                $(".river-side-scroll").scrollTop(a-b+c);
                     
              var featThis = self.riverManagerLayer.graphics[index] || fsetData[numAttr];
              self.infoWindowShow(featThis);
              self.contentInit(featThis.attributes);
            });
            $('.river-manager-results .panel-heading').eq(0).click();
        },

        contentInit: function(attributes) {
            var self = this               
            ,mapHeight = $('.container').height()       
            ,tableLimit = Math.floor((mapHeight-350-80)/40); 
            layui.use(['layer','form'],function() {
                var form = layui.form
                ,layer = layui.layer;
                if(self.addBoxIndex !== -1){
                     self.initContentForm(attributes);     
                }else{
                    //本表单通过ajax加载 --以模板的形式，当然你也可以直接写在页面上读取
                    $.get('./js/modules/riverManager/riveContent.html', null, function(divCont) {
                        self.addBoxIndex = layer.open({
                            type: 1,
                            title: '河流属性档案',
                            content: divCont,
                            btn: [],
                            fixed:true,
                            shade: false,
                            offset: ['60px','340px'],
                            area: ['400px',mapHeight+'px'],
                            id:'riverContentS',
                            zIndex: 1995,
                            maxmin: true,
                            success: function(layero, index) {                          
                                //图表
                                form.render();
                                self.initRiverPoint();
                                self.initTable(tableLimit);
                                self.initContentForm(attributes);     
                            },
                            cancel: function(index, layero){ 
                                console.log(layero);
                            },  
                            end: function() {
                                self.addBoxIndex = -1;
                                self.close();
                            }
                        });
                    });
                }
             })       
            // this.showLayer();    
        },
        initContentForm: function(attributes){
            var self = this,
            data = attributes;    
            $.each(data,function(index, el) {
                $('.river-content-div').find('.layui-input-block[data-name='+index+']').html(el);
            });
        },
        initRiverPoint: function(){
            var self = this;
            if(self.mapLayer){
                self.mapLayer.clear();
            }
            // var _road = self.demoData.road;
            var _video = self.demoData.video;
            var _dirtySource = self.demoData.dirtySource;
            var _showApa = self.demoData.showApa;
            var num = 0;
            self.featuresVideoArr = [];
            self.featuresDirtyArr = [];
            self.featuresShowArr = [];
            var markersymbolV = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 18,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0, 0.1]), 1),
                    new Color([40, 136, 0, 1]));
            $.each(_video,function(index, el) {
                var _videoT = new Graphic(new Point(el.geometry),markersymbolV);
                 el.attributes.num = num;                
                _videoT.attributes = el.attributes;
                self.mapLayer.add(_videoT);
                self.featuresVideoArr.push(el.attributes);
                num++; 
            });

            var markersymbolD= new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 18,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0, 0.1]), 1),
                    new Color([40, 136, 125, 1]));
            $.each(_dirtySource,function(index, el) {
                var _dirtySourceT = new Graphic(new Point(el.geometry),markersymbolD);
                 el.attributes.num = num;                
                _dirtySourceT.attributes = el.attributes;                 
                self.mapLayer.add(_dirtySourceT);
                self.featuresDirtyArr.push(el.attributes);
                num++; 
            });

            var markersymbolS = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 18,
                    new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
                        new Color([255, 0, 0, 0.1]), 1),
                    new Color([125, 136, 255, 1]));
            $.each(_showApa,function(index, el) {
                var _showApaT = new Graphic(new Point(el.geometry),markersymbolS);
                 el.attributes.num = num;                
                _showApaT.attributes = el.attributes;                            
                self.mapLayer.add(_showApaT);
                self.featuresShowArr.push(el.attributes);
                num++; 
            });
            console.log(self.featuresVideoArr);
            self.mapLayer.on('click',function(evt){
                self.infoWindowShow(evt.graphic);
            })
        },
        initTable: function(tableLimit){
            var self = this;
            layui.use('table',function() {

                var layTable = layui.table; 
                var VideoData =  self.featuresVideoArr;
                var DirtyData =  self.featuresDirtyArr;
                var ShowData =  self.featuresShowArr;
                //表格1
                layTable.render({
                  elem: '#river-dirty-table'
                  ,cols: [[ //标题栏index
                    {field: 'name',title: '污染源名称' ,align:'left',width:'50%', event: 'setPosition',  style:'cursor: pointer;'}
                    ,{field: 'OBJECTID', title: '其他参数',width:'49%',event:"centerAt"}               
                  ]]
                  ,data:DirtyData.concat(DirtyData).concat(DirtyData).concat(DirtyData).concat(DirtyData) ,limit:tableLimit ,even: false ,unresize:true
                  ,page: {
                      layout: ['count', 'prev', 'page', 'next'] ,groups: 1 ,first: false ,last: false 
                    }
                });
                //表格2
                layTable.render({
                  elem: '#river-show-table'
                  ,cols: [[ //标题栏index
                    {field: 'name',title: '公示牌名称' ,align:'left',width:'50%', event: 'setPosition',  style:'cursor: pointer;'}
                    ,{field: 'OBJECTID', title: '其他参数',width:'49%',event:"centerAt"}               
                  ]]
                  ,data:ShowData ,limit:tableLimit ,even: false ,unresize:true
                  ,page: {
                      layout: ['count', 'prev', 'page', 'next'] ,groups: 1 ,first: false ,last: false 
                    }
                });
                //表格3
                layTable.render({
                  elem: '#river-video-table'
                  ,cols: [[ //标题栏index
                    {field: 'name',title: '视频监控点名称' ,align:'left',width:'50%', event: 'setPosition',  style:'cursor: pointer;'}
                    ,{field: 'OBJECTID', title: '其他参数',width:'49%',event:"centerAt"}               
                  ]]
                  ,data:VideoData ,limit:tableLimit ,even: false ,unresize:true
                  ,page: {
                      layout: ['count', 'prev', 'page', 'next'] ,groups: 1 ,first: false ,last: false 
                    }
                });
                 //监听工具条
                layTable.on('tool(table*)', function(obj){ 
                    self.infoWindowShow( self.mapLayer.graphics[obj.data.num])
                });
            })    
        }, 
        //画图    
        symbolDraw: function(event) {
            this.drawComplete = null;
            $('.river-manager-draw').removeClass('layui-this');               
            $(event.currentTarget).addClass('layui-this')
            if (this.riverManagerLayer) {
                this.riverManagerLayer.clear();
            }
            this.map.infoWindow.hide();               
            this._graphic = null;
            var type = $(event.currentTarget).attr('type');
            this.draw.activate(Draw[type]);
            this.drawComplete = this.draw.on("draw-complete", (function(evt) {
                this.draw.deactivate();
                //判断是圈是点
                if(evt.geometry.type=='point'){
                   this._graphic = new Graphic(evt.geometry, this.markersymbol);
                }else{
                   this._graphic = new Graphic(evt.geometry, this.symbol);  
                }  
                this.riverManagerLayer.add(this._graphic);
                this.map.infoWindow.hide();
                this.drawComplete.remove();
            }).bind(this));
                
        },
        // 信息框展示
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
            this.map.infoWindow.hide();
            if (this.riverManagerLayer) {
                this.riverManagerLayer.clear();
                this.map.removeLayer(this.riverManagerLayer);
                this.riverManagerLayer = null;
            }
            if (this.mapLayer) {
                this.mapLayer.clear();
                this.map.removeLayer(this.mapLayer);
                this.mapLayer = null;
            }
            if (this.draw) {
                this.draw.deactivate();
                this.draw = null;
            }
            if(this.addBoxIndex!==-1){
                $('#riverContentS').parent().remove();
                this.addBoxIndex = -1
            }    
            $('.river-manager').empty(); 
        }
    });
});
