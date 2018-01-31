define(["dojo/_base/declare", "echo/utils/EventBus", "dojo/domReady!"], function(declare,EventBus) {
    return declare("layuiInit", null, {
        constructor: function(map, config) {
            this.map = map;
            this.config = config;
            this.slideStatus = true;
            this.init();

        },
        init: function() {            
            EventBus.on("All_WIDGETS_CLOSE", this.close, this);
            EventBus.on("logout", this.logout, this);
            this.initLayUi();
            this.bindEvent();
        },
        bindEvent: function() {
        },
        initLayUi: function() { 
            var self = this; 
            var device = layui.device('myapp');
            console.log(device);         
            layui.use('element', function(){
		        var element_nav = layui.element; 
                element_nav.on('nav(runMoudle)', function(elem){
                  // console.log(elem); //得到当前点击的DOM对象
                  var dataMoudle = $(elem).attr('data-moudle');
                  if(dataMoudle){               
                    self.runMoudle(dataMoudle);
                  }
                });
                element_nav.on('nav(loginInfo)', function(elem){
                  // console.log(elem); //得到当前点击的DOM对象
                  var dataMoudle = $(elem).attr('data-moudle');
                  if(dataMoudle){               
                    // window.location.href = self.config.logoutUrl
                    console.log('注销地址未获取')
                  }
                });
            })
        },           
        //打开模块通用方法
        runMoudle: function(modulesStartup) {   
            EventBus.emit('All_WIDGETS_CLOSE');          
            setTimeout(function(){
                EventBus.emit(modulesStartup)           
            },0 );            
        },                  
        close: function() {
        }    
    });
});
