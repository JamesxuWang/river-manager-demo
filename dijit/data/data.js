/**
 * Created by jamesxuWang on 2018/01/24.
 */
define([], function() {
    var data = {};
    // 上报总数、完成处理
    data.obj1 = {
        title: {
            text: '上报总数',
            subtext: '',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            },
            left: 10,
            top: 10
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            top: 40,
            left: 'center',
            data: ['处理中', '未处理', '结案数']
        },
        backgroundColor: '#fff',
        series: [{
            name: '事件类型',
            type: 'pie',
            radius: '55%',
            center: ['50%', '65%'],
            data: [
                { name: "处理中", value: 20, itemStyle: { normal: { color: '#6665E5' } } },
                { name: "未处理", value: 5, itemStyle: { normal: { color: '#3CD2D0' } } },
                { name: "结案数", value: 15, itemStyle: { normal: { color: '#F7BF1F' } } }
            ],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outer',
                        formatter: "{d}%"
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    // 完成处理
    data.obj2 = {
        title: {
            text: '处理满意度',
            subtext: '',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            },
            left: 10,
            top: 10
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            top: 40,
            left: 'center',
            data: ['很好', '一般', '差']
        },
        backgroundColor: '#fff',
        series: [{
            name: '满意度',
            type: 'pie',
            radius: '55%',
            center: ['50%', '65%'],
            data: [
                { name: "很好", value: 20, itemStyle: { normal: { color: '#6665E5' } } },
                { name: "一般", value: 5, itemStyle: { normal: { color: '#3CD2D0' } } },
                { name: "差", value: 15, itemStyle: { normal: { color: '#F7BF1F' } } }
            ],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outer',
                        formatter: "{d}%"
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    // 任务总数、任务分类
    data.obj3 = {
        title: {
            text: '任务分类',
            subtext: '',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            },
            left: 10,
            top: 10
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            top: 40,
            left: 'center',
            data: ['水资源保护', '岸线管理', '水污染防治', '水环境治理', '水生态修复']
        },
        backgroundColor: '#fff',
        series: [{
            name: '任务类型',
            type: 'pie',
            radius: '55%',
            center: ['50%', '65%'],
            data: [
                { name: "水资源保护", value: 20, itemStyle: { normal: { color: '#6665E5' } } },
                { name: "岸线管理", value: 5, itemStyle: { normal: { color: '#3CD2D0' } } },
                { name: "水污染防治", value: 15, itemStyle: { normal: { color: '#F7BF1F' } } },
                { name: "水环境治理", value: 15, itemStyle: { normal: { color: '#8bc34a' } } },
                { name: "水生态修复", value: 15, itemStyle: { normal: { color: '#FF5722' } } }
            ],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outer',
                        formatter: "{d}%"
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };

    // 河湖概要
    data.obj4 = {
        title: {
            text: '河湖概要',
            subtext: '',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            },
            left: 10,
            top: 10
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            top: 40,
            left: 'center',
            data: ['水质良好', '轻度污染', '中度污染', '水质恶劣']
        },
        backgroundColor: '#fff',
        series: [{
                name: '水质情况',
                type: 'pie',
                radius: [0, '30%'],
                center: ['50%', '65%'],
                data: [
                    { name: "水质良好", value: 20, itemStyle: { normal: { color: '#6665E5' } } },
                    { name: "轻度污染", value: 15, itemStyle: { normal: { color: '#3CD2D0' } } },
                    { name: "中度污染", value: 5, itemStyle: { normal: { color: '#F7BF1F' } } },
                    { name: "水质恶劣", value: 3, itemStyle: { normal: { color: '#8bc34a' } } }
                ],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'inner',
                            formatter: "{b}"
                        },
                        labelLine: {
                            show: false
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            },
            {
                name: '水质情况',
                type: 'pie',
                radius: ['40%', '55%'],
                center: ['50%', '65%'],
                data: [
                    { name: "水质良好", value: 20, itemStyle: { normal: { color: '#ca8622' } } },

                    { name: "略有异味", value: 10, itemStyle: { normal: { color: '#bda29a' } } },
                    { name: "少许漂浮物", value: 5, itemStyle: { normal: { color: '#6e7074' } } },

                    { name: "较多漂浮物", value: 3, itemStyle: { normal: { color: '#546570' } } },
                    { name: "异味较重", value: 2, itemStyle: { normal: { color: '#c23531' } } },

                    { name: "水质浑浊", value: 1, itemStyle: { normal: { color: '#d48265' } } },
                    { name: "散发恶臭", value: 2, itemStyle: { normal: { color: '#91c7ae' } } }
                ],
                itemStyle: {
                    normal: {
                        label: {
                            show: true,
                            position: 'outer',
                            formatter: "{b}"
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    // 河湖常见问题
    data.obj5 = {
        title: {
            text: '河道问题',
            subtext: '',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            },
            left: 10,
            top: 10
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            top: 40,
            left: 'center',
            data: ['排水(污)口未标识', '水体异样', '污水直排', '污泥堆积', '违章设置', '杂物漂浮', '护岸坍塌', '其他']
        },
        backgroundColor: '#fff',
        series: [{
            name: '事件类型',
            type: 'pie',
            radius: '55%',
            center: ['50%', '65%'],
            data: [
                { name: "排水(污)口未标识", value: 20, itemStyle: { normal: { color: '#6665E5' } } },
                { name: "水体异样", value: 5, itemStyle: { normal: { color: '#3CD2D0' } } },
                { name: "污水直排", value: 20, itemStyle: { normal: { color: '#F7BF1F' } } },
                { name: "污泥堆积", value: 5, itemStyle: { normal: { color: '#546570' } } },
                { name: "违章设置", value: 20, itemStyle: { normal: { color: '#c23531' } } },
                { name: "杂物漂浮", value: 5, itemStyle: { normal: { color: '#d48265' } } },
                { name: "护岸坍塌", value: 5, itemStyle: { normal: { color: '#91c7ae' } } },
                { name: "其他", value: 15, itemStyle: { normal: { color: '#9c27b0' } } }
            ],
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        position: 'outer',
                        formatter: "{d}%"
                    }
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    data.obj6 = {
        title : {
            text: '降雨情况统计',
            subtext: '',
            textStyle: {
                fontSize: 16,
                fontWeight: 'bold'
            },
            left: 10,
            top: 10
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            top: 40,
            left: 'center',
            data: ['小雨','中雨','大雨','暴雨','大暴雨','特大暴雨']
        },
        backgroundColor: '#fff',
        series : [
            {
                name: '雨量等级',
                type: 'pie',
                radius : '55%',
                center: ['50%', '65%'],
                data: [
                    {name: "小雨", value: 20, itemStyle: {normal: {color: '#6665E5'}}},
                    {name: "中雨", value: 5, itemStyle: {normal: {color: '#3CD2D0'}}},
                    {name: "大雨", value: 20, itemStyle: {normal: {color: '#F7BF1F'}}},
                    {name: "暴雨", value: 5, itemStyle: {normal: {color: '#546570'}}},
                    {name: "大暴雨", value: 20, itemStyle: {normal: {color: '#c23531'}}},
                    {name: "特大暴雨", value: 5, itemStyle: {normal: {color: '#d48265'}}}
                ],
                itemStyle: {
                    normal: {
                        label:{
                            show: true,
                            position:'outer',
                            formatter: "{d}%"
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    data.table = [
        {'id':'1', "area": "白云区", "river": "石井河", "reach": "河源", "date": "2016/06/01-2016/01/11", "location": "石马涌", "department": "白云区河长委员会", "office": "河段长","check":"阮倚天", "person": "何天心", "phone": "18632332762", "state": "完成", "operation": "巡检轨迹" },
        {'id':'2', "area": "白云区", "river": "石井河", "reach": "上游", "date": "2016/06/01-2016/01/11", "location": "新市街道均和", "department": "白云区河长委员会", "office": "河段长","check":"阮倚天", "person": "李长城", "phone": "18632433773", "state": "完成", "operation": "巡检轨迹" },
        {'id':'3', "area": "白云区", "river": "石井河", "reach": "中游", "date": "2016/06/01-2016/01/11", "location": "鹤边涌经石井", "department": "白云区河长委员会", "office": "河段长","check":"阮倚天", "person": "辛婉秀", "phone": "18632534784", "state": "完成", "operation": "巡检轨迹" },
        {'id':'4', "area": "白云区", "river": "石井河", "reach": "下游", "date": "2016/06/01-2016/01/11", "location": "新市涌", "department": "白云区河长委员会", "office": "河段长","check":"阮倚天", "person": "白景同", "phone": "18632635795", "state": "完成", "operation": "巡检轨迹" },
        {'id':'5', "area": "白云区", "river": "石井河", "reach": "河口", "date": "2016/06/01-2016/01/11", "location": "珠江西航道", "department": "白云区河长委员会", "office": "河段长","check":"阮倚天", "person": "钟俊茂", "phone": "18632736806", "state": "完成", "operation": "巡检轨迹" },

        {'id':'6', "area": "荔湾区", "river": "增埗河", "reach": "河源", "date": "2016/05/13-2016/05/30", "location": "增埗", "department": "县河长委员会", "office": "河段长","check":"阮倚天", "person": "李薇薇", "phone": "18632837817", "state": "完成", "operation": "巡检轨迹" },
        {'id':'7', "area": "荔湾区", "river": "增埗河", "reach": "上游", "date": "2016/05/13-2016/05/30", "location": "石井", "department": "县河长委员会", "office": "河段长","check":"阮倚天", "person": "张晓霞", "phone": "18632938828", "state": "未完成", "operation": "巡检轨迹" },
        {'id':'8', "area": "荔湾区", "river": "增埗河", "reach": "中游", "date": "2016/05/13-2016/05/30", "location": "沙贝河", "department": "县河长委员会", "office": "河段长","check":"阮倚天", "person": "表珊珊", "phone": "18633039839", "state": "完成", "operation": "巡检轨迹" },
        {'id':'9', "area": "荔湾区", "river": "增埗河", "reach": "下游", "date": "2016/05/13-2016/05/30", "location": "西村", "department": "县河长委员会", "office": "河段长","check":"阮倚天", "person": "闭绮玉", "phone": "18643140840", "state": "完成", "operation": "巡检轨迹" },
        {'id':'10', "area": "荔湾区", "river": "增埗河", "reach": "河口", "date": "2016/05/13-2016/05/30", "location": "螺涌围", "department": "县河长委员会", "office": "河段长","check":"阮倚天", "person": "商子帆", "phone": "18643241851", "state": "完成", "operation": "巡检轨迹" },

        {'id':'110', "area": "番禺区", "river": "西航道支线", "reach": "中游", "date": "2016/06/22-2016/07/06", "location": "大蚝砂", "department": "县河长委员会", "office": "河段长","check":"阮倚天", "person": "弘怜双", "phone": "18643342862", "state": "完成", "operation": "巡检轨迹" },
        {'id':'121', "area": "南沙区", "river": "西航道支线", "reach": "中游", "date": "2016/06/22-2016/07/06", "location": "长尾围", "department": "县河长委员会", "office": "河段长","check":"古屠龙", "person": "扬雪枫", "phone": "18643443873", "state": "完成", "operation": "巡检轨迹" },
        {'id':'132', "area": "黄埔区", "river": "西航道支线", "reach": "中游", "date": "2016/06/22-2016/07/06", "location": "海心沙", "department": "县河长委员会", "office": "河段长","check":"古屠龙", "person": "车晓灵", "phone": "18643544884", "state": "完成", "operation": "巡检轨迹" },
        {'id':'143', "area": "海珠区", "river": "西航道支线", "reach": "中游", "date": "2016/06/22-2016/07/06", "location": "沙头咀", "department": "县河长委员会", "office": "河段长","check":"古屠龙", "person": "应文德", "phone": "18643645895", "state": "未完成", "operation": "巡检轨迹" },
        {'id':'154', "area": "荔湾区", "river": "西航道支线", "reach": "中游", "date": "2016/06/22-2016/07/06", "location": "大坦尾", "department": "县河长委员会", "office": "河段长","check":"古屠龙", "person": "戴绣文", "phone": "18643746906", "state": "完成", "operation": "巡检轨迹" },

        {'id':'165', "area": "荔湾区", "river": "荔湾湖", "reach": "中上游", "date": "2017/09/11-2017/10/01", "location": "龙津西路", "department": "县河长委员会", "office": "河段长","check":"古屠龙", "person": "鲁梦之", "phone": "18643847917", "state": "完成", "operation": "巡检轨迹" },
        {'id':'176', "area": "荔湾区", "river": "荔湾湖", "reach": "中上游", "date": "2017/09/11-2017/10/01", "location": "西关上支涌", "department": "县河长委员会", "office": "河段长","check":"古屠龙", "person": "纪静慧", "phone": "18643948928", "state": "完成", "operation": "巡检轨迹" },
        {'id':'187', "area": "荔湾区", "river": "荔湾湖", "reach": "中上游", "date": "2017/09/11-2017/10/01", "location": "黄沙大道", "department": "县河长委员会", "office": "河段长","check":"古屠龙", "person": "陆听枫", "phone": "18644049939", "state": "完成", "operation": "巡检轨迹" },
        {'id':'198', "area": "荔湾区", "river": "荔湾湖", "reach": "中上游", "date": "2017/09/11-2017/10/01", "location": "中山八路", "department": "县河长委员会", "office": "河段长","check":"古屠龙", "person": "司念文", "phone": "18654150940", "state": "完成", "operation": "巡检轨迹" },
        {'id':'209', "area": "荔湾区", "river": "荔湾湖", "reach": "中上游", "date": "2017/09/11-2017/10/01", "location": "泮塘", "department": "县河长委员会", "office": "河段长","check":"古屠龙", "person": "夏惜梦", "phone": "18654251951", "state": "完成", "operation": "巡检轨迹" },

        {'id':'210', "area": "荔湾区", "river": "流花湖", "reach": "中上游", "date": "2018/01/03-2018/01/31", "location": "流花路", "department": "县河长委员会", "office": "河段长","check":"何三丰", "person": "威溥心", "phone": "18654352962", "state": "完成", "operation": "巡检轨迹" },
        {'id':'221', "area": "荔湾区", "river": "流花湖", "reach": "中上游", "date": "2018/01/03-2018/01/31", "location": "东风西路", "department": "县河长委员会", "office": "河段长","check":"何三丰", "person": "秦嘉颖", "phone": "18654453973", "state": "完成", "operation": "巡检轨迹" },
        {'id':'232', "area": "荔湾区", "river": "流花湖", "reach": "中上游", "date": "2018/01/03-2018/01/31", "location": "人民北路", "department": "县河长委员会", "office": "河段长","check":"何三丰", "person": "毛元化", "phone": "18654554984", "state": "完成", "operation": "巡检轨迹" },
        {'id':'243', "area": "荔湾区", "river": "流花湖", "reach": "中上游", "date": "2018/01/03-2018/01/31", "location": "西侯津", "department": "县河长委员会", "office": "河段长","check":"何三丰", "person": "肖柔惠", "phone": "18654655995", "state": "完成", "operation": "巡检轨迹" },
        {'id':'254', "area": "荔湾区", "river": "流花湖", "reach": "中上游", "date": "2018/01/03-2018/01/31", "location": "驷马涌", "department": "县河长委员会", "office": "河段长","check":"何三丰", "person": "于华翰", "phone": "18654756106", "state": "完成", "operation": "巡检轨迹" }
    ];
    return data;
});