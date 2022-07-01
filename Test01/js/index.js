// 左柱状图(累计确诊Top10) 立即执行函数
(function () {
    // 实例化对象
    var myChart = echarts.init(document.querySelector(".bar .chart"))
    $.get('data/Top10Data.json').done(function (data) {
        // 填入数据
        myChart.setOption({
            xAxis: {
                data: data.area
            },
            series: [
                {
                    // 根据名字对应到相应的系列
                    name: '新增',
                    data: data.confirm
                }
            ]
        });
    });
    // 配置数据项
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '0%',
            right: '0%',
            top: "10px",
            bottom: '4%',
            containLabel: true
        },
        dataset: {
        },
        xAxis: [
            {
                type: 'category',
                data: [],
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel: {
                    color: "rgba(255, 255, 255, 0.6)",
                    interval: 0,
                    rotate: 330,
                    fontSize: "12"
                },
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "12"
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.1)",
                        width: 2
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.1)"
                    }
                }
            }
        ],
        series: [
            {
                name: '新增',
                type: 'bar',
                barWidth: '35%',
                data: [],
                itemStyle: {
                    normal: {
                        color: function (params) {
                            var colorList = ['#d92121', '#ea774d', '#eb7b4f', '#f1995e', '#f5ac68', '#f6af6a', '#f7b56d', '#f9bf72', '#f9c173', '#fac575'];
                            return colorList[params.dataIndex]
                        },
                        barBorderRadius: 5
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    // 监听浏览器缩放，图表自适应
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();
// 右柱形图（治愈率Top5）
(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".bar2 .chart"));
    var data = [
        91,
        32,
        93,
        92,
        0,
    ];
    var titlename = [
        "德国",
        "中国",
        "澳大利亚",
        "意大利",
        "韩国"
    ];
    var valdata = [
        23206000,
        279577,
        5834675,
        15471992,
        0,
    ];
    var myColor = ["#1089E7", "#F57474", "#56D0E3", "#F8B448", "#8B78F6"];
    var option = {
        //图标位置
        grid: {
            top: "10%",
            left: "15%",
            right: "15%",
            bottom: "10%"
        },
        xAxis: {
            show: false
        },
        yAxis: [
            {
                show: true,
                data: titlename,
                inverse: true,
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    color: "#fff",

                    rich: {
                        lg: {
                            backgroundColor: "#339911",
                            color: "#fff",
                            borderRadius: 15,
                            // padding: 5,
                            align: "center",
                            width: 15,
                            height: 15
                        }
                    }
                }
            },
            {
                show: true,
                inverse: true,
                data: valdata,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    textStyle: {
                        fontSize: 12,
                        color: "#fff"
                    }
                }
            }
        ],
        series: [
            {
                name: "治愈人数",
                type: "bar",
                yAxisIndex: 0,
                data: data,
                barCategoryGap: 50,
                barWidth: 10,
                itemStyle: {
                    normal: {
                        barBorderRadius: 20,
                        color: function (params) {
                            var num = myColor.length;
                            return myColor[params.dataIndex % num];
                        }
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: "inside",
                        formatter: "{c}%"
                    }
                }
            },
            {
                name: "",
                type: "bar",
                yAxisIndex: 1,
                barCategoryGap: 50,
                data: [100, 100, 100, 100, 100],
                barWidth: 15,
                itemStyle: {
                    normal: {
                        color: "none",
                        borderColor: "#00c1de",
                        borderWidth: 3,
                        barBorderRadius: 15
                    }
                }
            }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 左线型图（境外输入感染人数）
(function () {
    var myChart = echarts.init(document.querySelector(".line .chart"));
    $.get('data/inputData.json').done(function (data) {
        // 填入数据
        myChart.setOption({
            xAxis: {
                data: data.showTime
            },
            series: [
                {
                    // 根据名字对应到相应的系列
                    name: "境外输入感染总人数",
                    data: data.confirm
                },
                {
                    // 根据名字对应到相应的系列
                    name: "境外日增",
                    data: data.today
                }
            ]
        });
    });
    var option = {
        color: "#e83132",
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            top: "0%",
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        grid: {
            top: '20%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            show: true,
            borderColor: '#012f4a',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: [],
            axisTick: {
                show: false
            },
            axisLabel: {
                color: 'rgba(255,255,255,.7)'
            },
            axisLine: {
                show: false
            },
            bounderyGap: false
        },
        yAxis: {
            type: 'value',
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#4c9bfd'
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: '#012f4a'
                }
            }
        },
        series: [

            {
                name: "境外输入感染总人数",
                data: [],
                showSymbol: false,
                type: 'line',
                smooth: true
            },
            {
                name: "境外日增",
                data: [],
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: "#fe9688",
                        width: 2
                    }
                },
                type: 'line',
                smooth: true
            },
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();
// 右线型图（累计与现有人数）
(function () {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.querySelector(".line2 .chart"));
    $.get('data/chinaData.json').done(function (data) {
        // 填入数据
        myChart.setOption({
            xAxis: {
                data: data.date
            },
            series: [
                {
                    // 根据名字对应到相应的系列
                    name: "累计确诊人数",
                    data: data.confirm
                },
                {
                    // 根据名字对应到相应的系列
                    name: "现有确诊人数",
                    data: data.today
                }
            ]
        });
    });
    var option = {
        color: ["#ec9217", "#fe9688", "#e83132"],
        tooltip: {
            trigger: "axis",
            axisPointer: {
                lineStyle: {
                    color: "#dddc6b"
                }
            }
        },
        legend: {
            top: "0%",
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        grid: {
            left: "10",
            top: "30",
            right: "13",
            bottom: "10",
            containLabel: true
        },

        xAxis: [
            {
                type: "category",
                boundaryGap: false,

                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.2)"
                    }
                },

                data: []
            },
            {
                axisPointer: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                position: "bottom",
                offset: 20
            }
        ],

        yAxis: [
            {
                type: "value",
                axisTick: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                },
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)"
                    }
                }
            }
        ],
        series: [
            {
                name: "累计确诊人数",
                type: "line",
                smooth: true,
                symbol: "circle",
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: "#e83132",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(0, 216, 135, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(0, 216, 135, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#e83132",
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    }
                },
                data: []
            },
            {
                name: "现有确诊人数",
                type: "line",
                smooth: true,
                symbol: "circle",
                symbolSize: 5,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        color: "#fe9688",
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0,
                            0,
                            0,
                            1,
                            [
                                {
                                    offset: 0,
                                    color: "rgba(1, 132, 213, 0.4)"
                                },
                                {
                                    offset: 0.8,
                                    color: "rgba(1, 132, 213, 0.1)"
                                }
                            ],
                            false
                        ),
                        shadowColor: "rgba(0, 0, 0, 0.1)"
                    }
                },
                itemStyle: {
                    normal: {
                        color: "#fe9688",
                        borderColor: "rgba(221, 220, 107, .1)",
                        borderWidth: 12
                    }
                },
                data: []
            },
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        myChart.resize();
    });
})();
// 图5
(function () {
    // 1. 实例化对象
    var myChart = echarts.init(document.querySelector(".pie  .chart"));
    // 2. 指定配置项和数据
    $.get('data/provinceData.json').done(function (data) {
        // 填入数据
        var top10 = data.sort(function (a, b) { return a.value < b.value ? 1 : -1; })
            .slice(0, 10);
        myChart.setOption({
            series: [
                {
                    name: "现存病例",
                    data: top10
                }
            ]
        });
    });
    var option = {
        legend: {
            top: "90%",
            itemWidth: 10,
            itemHeight: 10,
            textStyle: {
                color: "rgba(255,255,255,.5)",
                fontSize: "12"
            }
        },
        tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        // 注意颜色写的位置
        color: [
            "#006cff",
            "#60cda0",
            "#ed8884",
            "#ff9f7f",
            "#0096ff",
            "#9fe6b8",
            "#32c5e9",
            "#1d9dff"
        ],
        series: [
            {
                name: "现存病例",
                type: "pie",
                // 如果radius是百分比则必须加引号
                radius: ["10%", "70%"],
                center: ["50%", "42%"],
                roseType: "radius",
                data: [],
                // 修饰饼形图文字相关的样式 label对象
                label: {
                    fontSize: 10
                },
                // 修饰引导线样式
                labelLine: {
                    // 连接到图形的线长度
                    length: 10,
                    // 连接到文字的线长度
                    length2: 10
                }
            }
        ]
    };

    // 3. 配置项和数据给我们的实例化对象
    myChart.setOption(option);
    // 4. 当我们浏览器缩放的时候，图表也等比例缩放
    window.addEventListener("resize", function () {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();
// 图6（各国感染人数）
(function () {
    // 实例化对象
    var myChart = echarts.init(document.querySelector(".pie2 .chart"))
    $.get('data/allWordData.json').done(function (data) {
        // 填入数据
        myChart.setOption({
            xAxis: {
                data: data.area
            },
            series: [
                {
                    // 根据名字对应到相应的系列
                    name: '累计感染人数',
                    data: data.confirm
                }
            ]
        });
    });

    // 配置数据项
    var option = {

        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            top: "10%",
            left: "20%",

        },
        dataZoom: [
            {
                type: 'inside'
            },
            {
                type: 'slider'
            }
        ],
        xAxis: {
            data: [],
            silent: false,
            splitLine: {
                show: false
            },
            splitArea: {
                show: false
            }
        },
        yAxis: [
            {
                type: 'value',
                axisLabel: {
                    color: "rgba(255, 255, 255, 0.6)",
                    fontSize: "12"
                },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255, 255, 255, 0.1)",
                        width: 2
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                type: 'bar',
                data: [],
                large: true
            }
        ]
    };
    myChart.setOption(option);
    // 监听浏览器缩放，图表自适应
    window.addEventListener('resize', function () {
        myChart.resize();
    });
})();
// 中国地图
(function () {
    var myChart = echarts.init(document.querySelector(".map .chart"));
    $.get('data/provinceData.json').done(function (data) {
        // 填入数据
        myChart.setOption({
            series: [
                {
                    // 根据名字对应到相应的系列
                    name: "现存确诊",
                    data: data
                }
            ]
        });
    });
    var option = {
        tooltip: {
            triggerOn: "click",
        },

        visualMap: {
            min: 0,
            max: 100000,
            left: 26,
            bottom: 40,
            showLabel: !0,
            text: ["高", "低"],
            textStyle: { color: "#ffffff" },
            pieces: [{
                gt: 10000,
                label: "> 10000人",
                color: "#7f1100"
            }, {
                gte: 1000,
                lte: 10000,
                label: "1000 - 10000人",
                color: "#ff5428"
            }, {
                gte: 100,
                lt: 1000,
                label: "100 - 1000人",
                color: "#ff8c71"
            }, {
                gt: 10,
                lt: 100,
                label: "10 - 100人",
                color: "#ffd768"
            }, {
                gt: -1,
                lt: 10,
                label: "0 - 10人",
                color: "#ffffff"
            }],
            show: !0
        },
        geo: {
            map: "china",
            roam: 1,
            scaleLimit: {
                min: 1,
                max: 2
            },
            roam: true,
            zoom: 1.23,
            top: 120,
            label: {
                normal: {
                    show: !0,
                    fontSize: "14",
                    color: "rgba(0,0,0,0.7)"
                }
            },
            itemStyle: {
                normal: {
                    //shadowBlur: 50,
                    //shadowColor: 'rgba(0, 0, 0, 0.2)',
                    borderColor: "rgba(0, 0, 0, 0.2)"
                },
                emphasis: {
                    areaColor: "#f2d5ad",
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    borderWidth: 0
                }
            }
        },
        series: [{
            name: "现存确诊",
            type: "map",
            geoIndex: 0,
            data: []
        }]
    };
    myChart.setOption(option);
    window.addEventListener("resize", function () {
        // 让我们的图表调用 resize这个方法
        myChart.resize();
    });
})();
