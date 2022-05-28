function pieGrafAux(distritalAux, datos, posicion, titulo) {
    var myChart = echarts.init($("#" + distritalAux)[0]);
    option = {
        title: {
            text: titulo,
            left: 'center'
        },
        color: ['#FCCE10', '#C1232B', '#B5C334', '#E87C25', '#225600', '#6F0012', '#003D57', '#A63217', '#13247B', '#727400', '#420050', '#3F5C00'],
        tooltip: {
            trigger: 'item',
            formatter: "{b} : {c} ({d} % )"
        },
        series: [{
            type: 'pie',
            radius: '75%',
            center: ['49%', '50%'],
            selectedMode: 'single',
            data: datos,
            itemStyle: {
                normal: {
                    label: {
                        show: true,
                        fontSize: 11,
                        align: 'center',
                        position: posicion,
                        formatter: '{b} \n  {d}%'
                    }
                }
            },
        }]
    }
    myChart.setOption(option, true);
}

function barrasAux(distritalAux, datos, xdata, titulo) {
    console.log(distritalAux);
    var myChart = echarts.init($("#" + distritalAux)[0]);

    option = {
        title: {
            text: titulo,
        },
        grid: {
            left: '5%'
        },
        xAxis: {
            data: xdata,
            axisLabel: {
                textStyle: {
                    fontSize: 10
                }
            }
        },
        yAxis: {
            type: 'value',
            axisLabel: {
                margin: 5,
                rotate: 25,
                textStyle: {
                    fontSize: 8
                }
            }
        },
        series: [{
            data: datos,
            type: 'bar',
            barCategoryGap: '35%',
            itemStyle: {
                normal: {
                    color: function(params) {
                        var colorList = ['#FCCE10', '#C1232B', '#B5C334', '#E87C25', '#225600', '#6F0012', '#003D57', '#A63217', '#13247B', '#727400', '#420050', '#3F5C00'];
                        return colorList[params.dataIndex]
                    },
                    label: {
                        show: true,
                        position: 'inside',
                        fontSize: 12,
                        formatter: '{c}'
                    }
                }
            },
        }]
    };
    myChart.setOption(option, true);
}


function graficoMulti(distritalAux, datos, xdata, leyenda) {
    var myChart = echarts.init($("#" + distritalAux)[0]);
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {
            data: leyenda
        },
        toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center'
        },
        xAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            data: xdata
        }],
        yAxis: [{
            type: 'value'
        }],
        series: datos
    };

    myChart.setOption(option, true);

}