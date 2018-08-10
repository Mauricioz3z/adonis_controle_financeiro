demo = {
  initPickColor: function () {
    $('.pick-class-label').click(function () {
      var new_class = $(this).attr('new-class');
      var old_class = $('#display-buttons').attr('data-class');
      var display_div = $('#display-buttons');
      if (display_div.length) {
        var display_buttons = display_div.find('.btn');
        display_buttons.removeClass(old_class);
        display_buttons.addClass(new_class);
        display_div.attr('data-class', new_class);
      }
    });
  },

  initDocChart: function () {
    
  },



  initDashboardPageCharts: function (data) {


    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: true,
      scales: {
        yAxes: [{
          gridLines: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };

    var ctx = document.getElementById('bigDashboardChart').getContext("2d");

    var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, chartColor);

    var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.24)");





    var labels = []
    var valor = []
    data.forEach(element => {
      console.log(element.Months)
      switch (element.Months) {


        case 'January': labels.push('Janeiro')
          break;
        case 'February': labels.push('Fevereiro')
          break;
        case 'March': labels.push('Março')
          break;
        case 'April': labels.push('Abril')
          break;
        case 'May': labels.push('Maio')
          break;
        case 'June': labels.push('Junho')
          break;
        case 'July': labels.push('Julho')
          break;
        case 'August': labels.push('Agosto')
          break;
        case 'September': labels.push('Setembro')
          break;
        case 'October': labels.push('Outubro')
          break;
        case 'November': labels.push('Novembro')
          break;
        case 'December': labels.push('Dezembro')
          break;
        default: ''
          break;
      }
      valor.push(element.valor)

    });
    var myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: "Despesa",

          borderColor: chartColor,
          pointBorderColor: chartColor,
          pointBackgroundColor: "#1e3d60",
          pointHoverBackgroundColor: "#1e3d60",
          pointHoverBorderColor: chartColor,
          pointBorderWidth: 1,
          pointHoverRadius: 7,
          pointHoverBorderWidth: 2,
          pointRadius: 5,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: valor
        }]
      },
      options: {
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 0
          }
        },
        maintainAspectRatio: false,
        tooltips: {
          backgroundColor: '#fff',
          titleFontColor: '#333',
          bodyFontColor: '#666',
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          callbacks: {
            label: function (tooltipItem, data) {
              var label = data.datasets[tooltipItem.datasetIndex].label || '';

              if (label) {
                label += ' R$ ';
              }
              label += Math.round(tooltipItem.yLabel * 100) / 100;
              return label;
            }
          }
        },
        legend: {
          position: "bottom",
          fillStyle: "#FFF",
          display: false
        },
        scales: {
          yAxes: [{
            ticks: {
              callback: function (label) { return 'R$ ' + label.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); },
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold",
              beginAtZero: true,
              maxTicksLimit: 10,
              padding: 10,
              position: 'right',
            },
            gridLines: {
              drawTicks: true,
              drawBorder: false,
              display: true,
              color: "rgba(255,255,255,0.1)",
              zeroLineColor: "transparent"
            }

          }],
          xAxes: [{
            gridLines: {
              zeroLineColor: "transparent",
              display: false,

            },
            ticks: {
              padding: 10,
              fontColor: "rgba(255,255,255,0.4)",
              fontStyle: "bold"
            }
          }]
        }
      }
    });







    // var viewsChart = new Chart(e, a);
  },
  initBarchart:function () {
    var ctx = document.getElementById('barChartSimpleGradientsNumbers').getContext("2d");

    var e = document.getElementById("barChartSimpleGradientsNumbers").getContext("2d");

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, hexToRGB('#2CA8FF', 0.6));

    var a = {
      type: "bar",
      data: {
        labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        datasets: [{
          label: "Active Countries",
          backgroundColor: gradientFill,
          borderColor: "#2CA8FF",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#2CA8FF",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          borderWidth: 1,
          data: [80, 99, 86, 96, 123, 85, 100, 75, 88, 90, 123, 155]
        }]
      },
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10
        },
        responsive: 1,
        scales: {
          yAxes: [{
            gridLines: 0,
            gridLines: {
              zeroLineColor: "transparent",
              drawBorder: false
            }
          }],
          xAxes: [{
            display: 0,
            gridLines: 0,
            ticks: {
              display: false
            },
            gridLines: {
              zeroLineColor: "transparent",
              drawTicks: false,
              display: false,
              drawBorder: false
            }
          }]
        },
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 15,
            bottom: 15
          }
        }
      }
    };
   var viewsChart = new Chart(e, a);
    },
  initReceitaCharts: function (data) {


    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfigurationWithNumbersAndGrid = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10,
        callbacks: {
          label: function (tooltipItem, data) {
            var label = data.datasets[tooltipItem.datasetIndex].label || '';

            if (label) {
              label += ' R$ ';
            }
            label += Math.round(tooltipItem.yLabel * 100) / 100;
            return label;
          }
        }
      },
      responsive: true,
      scales: {
        yAxes: [{
          
          gridLines: 0,
          gridLines: {
            zeroLineColor: "transparent",
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };






    var labels = []
    var valor = []
    data.forEach(element => {
      console.log(element.Months)
      switch (element.Months) {
        case 'January': labels.push('Janeiro')
          break;
        case 'February': labels.push('Fevereiro')
          break;
        case 'March': labels.push('Março')
          break;
        case 'April': labels.push('Abril')
          break;
        case 'May': labels.push('Maio')
          break;
        case 'June': labels.push('Junho')
          break;
        case 'July': labels.push('Julho')
          break;
        case 'August': labels.push('Agosto')
          break;
        case 'September': labels.push('Setembro')
          break;
        case 'October': labels.push('Outubro')
          break;
        case 'November': labels.push('Novembro')
          break;
        case 'December': labels.push('Dezembro')
          break;
        default: ''
          break;
      }
      valor.push(element.valor)

    });

    ctx = document.getElementById('lineChartExampleWithNumbersAndGrid').getContext("2d");

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#18ce0f');
    gradientStroke.addColorStop(1, chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, hexToRGB('#18ce0f', 0.4));

    myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: labels,
        datasets: [{
          label: "Email Stats",
          borderColor: "#18ce0f",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#18ce0f",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: valor
        }]
      },
      options: gradientChartOptionsConfigurationWithNumbersAndGrid
    });

    




    // var cardStatsMiniLineColor = "#fff",
    //   cardStatsMiniDotColor = "#fff";

    // ctx = document.getElementById('lineChartExample').getContext("2d");

    // gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    // gradientStroke.addColorStop(0, '#80b6f4');
    // gradientStroke.addColorStop(1, chartColor);

    // gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    // gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    // gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");


    // myChart = new Chart(ctx, {
    //   type: 'line',
    //   responsive: true,
    //   data: {
    //     labels: labels,
    //     datasets: [{
    //       label: "Despesas",
    //       borderColor: "#f96332",
    //       pointBorderColor: "#FFF",
    //       pointBackgroundColor: "#f96332",
    //       pointBorderWidth: 2,
    //       pointHoverRadius: 4,
    //       pointHoverBorderWidth: 1,
    //       pointRadius: 4,
    //       fill: true,
    //       backgroundColor: gradientFill,
    //       borderWidth: 2,
    //       data:valor
    //     }]
    //   },
    //   options: gradientChartOptionsConfiguration
    // });




    // var viewsChart = new Chart(e, a);
  },

  initDespesaCharts: function (data) {


    chartColor = "#FFFFFF";

    // General configuration for the charts with Line gradientStroke
    gradientChartOptionsConfiguration = {
      maintainAspectRatio: false,
      legend: {
        display: false
      },
      tooltips: {
        bodySpacing: 4,
        mode: "nearest",
        intersect: 0,
        position: "nearest",
        xPadding: 10,
        yPadding: 10,
        caretPadding: 10
      },
      responsive: 1,
      scales: {
        yAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }],
        xAxes: [{
          display: 0,
          gridLines: 0,
          ticks: {
            display: false
          },
          gridLines: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false
          }
        }]
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 15,
          bottom: 15
        }
      }
    };






    var labels = []
    var valor = []
    data.forEach(element => {
      console.log(element.Months)
      switch (element.Months) {
        case 'January': labels.push('Janeiro')
          break;
        case 'February': labels.push('Fevereiro')
          break;
        case 'March': labels.push('Março')
          break;
        case 'April': labels.push('Abril')
          break;
        case 'May': labels.push('Maio')
          break;
        case 'June': labels.push('Junho')
          break;
        case 'July': labels.push('Julho')
          break;
        case 'August': labels.push('Agosto')
          break;
        case 'September': labels.push('Setembro')
          break;
        case 'October': labels.push('Outubro')
          break;
        case 'November': labels.push('Novembro')
          break;
        case 'December': labels.push('Dezembro')
          break;
        default: ''
          break;
      }
      valor.push(element.valor)

    });



    var cardStatsMiniLineColor = "#fff",
      cardStatsMiniDotColor = "#fff";

    ctx = document.getElementById('lineChartExample').getContext("2d");

    gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
    gradientStroke.addColorStop(0, '#80b6f4');
    gradientStroke.addColorStop(1, chartColor);

    gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
    gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
    gradientFill.addColorStop(1, "rgba(249, 99, 59, 0.40)");


    myChart = new Chart(ctx, {
      type: 'line',
      responsive: true,
      data: {
        labels: labels,
        datasets: [{
          label: "Despesas",
          borderColor: "#f96332",
          pointBorderColor: "#FFF",
          pointBackgroundColor: "#f96332",
          pointBorderWidth: 2,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 1,
          pointRadius: 4,
          fill: true,
          backgroundColor: gradientFill,
          borderWidth: 2,
          data: valor
        }]
      },
      options: gradientChartOptionsConfiguration
    });




    // var viewsChart = new Chart(e, a);
  },


  showNotification: function (from, align) {
    color = 'primary';

    $.notify({
      icon: "now-ui-icons ui-1_bell-53",
      message: "Welcome to <b>Now Ui Dashboard</b> - a beautiful freebie for every web developer."

    }, {
        type: color,
        timer: 8000,
        placement: {
          from: from,
          align: align
        }
      });
  }

};




$(document).ready(function () {

demo.initBarchart()

  // $.get('http://localhost:3333/get-grafico', function(data, status){ 
  //   demo.initDashboardPageCharts(data);
  //        console.log(data)
  //       });

  $.get('/get-grafico-receitas', function (data, status) {
    demo.initReceitaCharts(data);
    console.log(data)
  });

  $.get('/get-grafico', function (data, status) {
    demo.initDespesaCharts(data);
    console.log(data)
  });




  // $("#valor").maskMoney({
  //   prefix: "R$:",
  //   decimal: ",",
  //   thousands: "."
  // });

  var maxLength = '-0.000.000,00'.length;

  $("#valor").maskMoney({
    allowNegative: true,
    thousands: '.',
    decimal: ',',
    affixesStay: false
  }).attr('maxlength', maxLength).trigger('mask.maskMoney');

  // $('#valor').val(500000).trigger('mask.maskMoney');

  // fix
  //   var originalVal = $.fn.val;

  // $.fn.val = function(value) {
  //     if (typeof value == 'undefined') {
  //         return originalVal.call(this);
  //     } else {
  //         setTimeout(function() {
  //             this.trigger('mask.maskMoney');
  //         }.bind(this), 100);
  //         return originalVal.call(this, value);
  //     }
  // };


  // $('input').maskMoney();

  // $('input').on('click mousedown mouseup focus blur keydown change input', function(event) {
  //     console.log('This Happened:'+ event.type);
  // });


  // $('input').val(5);



});