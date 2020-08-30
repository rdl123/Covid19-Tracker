var sourceBingMaps = new ol.source.BingMaps({
  key: "AiSdEQh9Jn_bD1rjLSHxoNWa5yrvUKYHZwNFcSVjs6Jzza3xGIbWBTACWtApkQCK",
  imagerySet: "Road",
  culture: "fr-FR",
  crossOrigin: 'anonymous',
});
var source = new ol.source.Vector();
var vector = new ol.layer.Vector({
  source: source,
  style: new ol.style.Style({
    fill: new ol.style.Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new ol.style.Stroke({
      color: '#ffcc33',
      width: 4
    }),
    image: new ol.style.Circle({
      radius: 7,
      fill: new ol.style.Fill({
        color: '#ffcc33'
      })
    })
  })
});
var bingMapsRoad = new ol.layer.Tile({
  preload: Infinity,
  source: sourceBingMaps,
  crossOrigin: 'anonymous',
});

var bingMapsAerial = new ol.layer.Tile({
  preload: Infinity,
  source: new ol.source.BingMaps({
    key: "AiSdEQh9Jn_bD1rjLSHxoNWa5yrvUKYHZwNFcSVjs6Jzza3xGIbWBTACWtApkQCK",
    imagerySet: "Aerial",
    crossOrigin: 'anonymous',
  }),
});

var streetLayer1 = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url:
      "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=" +
      "Pce0LleVUzJV6BiCPbAi",
    tileSize: 512,
    maxZoom: 22,
    crossOrigin: 'anonymous',
  }),
});

var streetLayer2 = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url:
      "https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=" +
      "Pce0LleVUzJV6BiCPbAi",
      crossOrigin: 'anonymous',
  }),
  
});
var Regions_large=new ol.layer.Tile({
  source:new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/ehtp/wms',
    params :{
      'LAYERS':'Regions',
      'TRANSPARENT':'true',
      'WIDTH':640,
      'HEIGHT':480,
      
    },
    crossOrigin: 'anonymous',
  })
})

var region_source=new ol.source.TileWMS({
  url: 'http://localhost:8080/geoserver/ehtp/wms',
  params :{
    'LAYERS':'regions2014',
    'TRANSPARENT':'true',
    'WIDTH':640,
    'HEIGHT':480,
  },
  crossOrigin: 'anonymous',
})
var provinces_sources=new ol.source.TileWMS({
  url: 'http://localhost:8080/geoserver/ehtp/wms',
  params :{
    'LAYERS':'Provinces_wgs',
    'TRANSPARENT':'true',
    'WIDTH':640,
    'HEIGHT':480,
  },
  crossOrigin: 'anonymous',
})

var Region2014=new ol.layer.Tile({
  source: region_source,
})
var provinces=new ol.layer.Tile({
  source: provinces_sources,
})
var view = new ol.View({
  center: ol.proj.transform([-7.63, 33.56], "EPSG:4326", "EPSG:3857"), //transformation utm(open streetmap) to wgs(maroc) et [-7.63,33.56] c'est le centre du maroc  pour effectuer le zoom
  zoom: 4.5,
});
/////////////////////////////////////////////
//!initialisation des maps
///////////////////////////////////////////
var map1 = new ol.Map({
  target: "map1",
  layers: [streetLayer1,Region2014],
  view: view,
  controls: ol.control.defaults().extend([
    new ol.control.FullScreen(),
    new ol.control.ScaleLine(),
    new ol.control.OverviewMap(), 
]),
});

var map2 = new ol.Map({
  target: "map2",
  layers: [streetLayer2,provinces],
  view: view,
  controls: ol.control.defaults().extend([
    new ol.control.FullScreen(),
    new ol.control.ScaleLine(),
    new ol.control.OverviewMap(),  
    
]),
});

var map = new ol.Map({
  layers: [bingMapsRoad,bingMapsAerial,Regions_large,vector],
  target: "large_map",
  view: new ol.View({
    center: ol.proj.transform([-7.63, 33.56], "EPSG:4326", "EPSG:3857"),
    zoom: 5,
  }),
  controls: ol.control.defaults().extend([
    new ol.control.FullScreen(),
    new ol.control.ScaleLine(),
    new ol.control.OverviewMap(),  
]),
});



///////////////////////////
//!chart layer
//////////////////////////////


$(document).ready(function () {
  $.getJSON("/data_regions", function (json) {
    console.log(json)
    var echartslayer = new EChartsLayer({
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        left: "right",
        data: ["cas confirmé", "décé"]
      },
      series: [
        {
          name: "Casablanca",
          type: "pie",
          radius: "10",
          coordinates: [-7.69, 33.136],
          data: [
            { value:json[4].cas_confirmes, name: "cas confirmé" },
            { value: json[4].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "MARRAKECH-SAFI",
          type: "pie",
          radius: "10",
          coordinates: [-8.44, 31.85],
          data: [
            { value:json[3].cas_confirmes, name: "cas confirmé" },
            { value: json[3].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "BENI MELLAL-KHENIFRA",
          type: "pie",
          radius: "10",
          coordinates: [-6.33, 32.60],
          data: [
            { value:json[2].cas_confirmes, name: "cas confirmé" },
            { value: json[2].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "EDDAKHLA-OUED EDDAHAB",
          type: "pie",
          radius: "10",
          coordinates: [-14.78, 22.76],
          data: [
            { value:json[9].cas_confirmes, name: "cas confirmé" },
            { value: json[9].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },

        {
          name: "LAAYOUNE-SAKIA EL HAMRA",
          type: "pie",
          radius: "10",
          coordinates: [-12.39, 26.40],
          data: [
            { value:json[9].cas_confirmes, name: "cas confirmé" },
            { value: json[9].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "GUELMIM-OUED NOUN",
          type: "pie",
          radius: "10",
          coordinates: [-10.05, 28.45],
          data: [
            { value:json[10].cas_confirmes, name: "cas confirmé" },
            { value: json[10].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "SOUS-MASSA",
          type: "pie",
          radius: "10",
          coordinates: [-8.35, 29.90],
          data: [
            { value:json[10].cas_confirmes, name: "cas confirmé" },
            { value: json[10].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "SOUS-MASSA",
          type: "pie",
          radius: "10",
          coordinates: [-8.35, 29.90],
          data: [
            { value:json[7].cas_confirmes, name: "cas confirmé" },
            { value: json[7].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "DRAA-TAFILALET",
          type: "pie",
          radius: "10",
          coordinates: [-5.26, 31.03],
          data: [
            { value:json[7].cas_confirmes, name: "cas confirmé" },
            { value: json[7].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "ORIENTAL",
          type: "pie",
          radius: "10",
          coordinates: [-2.33, 33.58],
          data: [
            { value:json[1].cas_confirmes, name: "cas confirmé" },
            { value: json[1].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "FES-MEKNES",
          type: "pie",
          radius: "10",
          coordinates: [-4.67, 33.80],
          data: [
            { value:json[5].cas_confirmes, name: "cas confirmé" },
            { value: json[5].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "RABAT-SALE-KENITRA",
          type: "pie",
          radius: "10",
          coordinates: [-6.27, 34.15],
          data: [
            { value:json[0].cas_confirmes, name: "cas confirmé" },
            { value: json[0].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },
        {
          name: "TANGER-TETOUAN-AL HOCEIMA",
          type: "pie",
          radius: "10",
          coordinates: [-5.55, 35.40],
          data: [
            { value:json[7].cas_confirmes, name: "cas confirmé" },
            { value: json[7].cas_deces, name: "décé" },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)"
            }
          }
        },

      
      ]
    });
    echartslayer.appendTo(map);

  })

})

//!.................................POPOUP..........................................

map1.on('singleclick', function(evt) {
document.getElementById('info').innerHTML = '';
  var viewResolution = (view.getResolution());
  var url =region_source.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {'INFO_FORMAT': 'application/json'});
  $(document).ready(function () {
    $.getJSON(url, function (json) {
      const reg=json.features[0].properties;
      document.getElementById('info').innerHTML='<p style="color:black;border:1px solid black;width:90%;font-size:12px;background-color:white;text-align:center;font-weight:Bold;padding:10px">Nom Region:  '+ reg.nom_reg +' </br> Cas confirmes: '+reg.cas_confirmes+'</br>Cas deces: '+reg.cas_deces+'</br>Taux Deces:'+reg.taux_deces+'</br></p>';
    })})
    
   /*
    document.getElementById('info').innerHTML = '';
  var viewResolution = /** @type {number} * (view.getResolution());
  var url = region_source.getFeatureInfoUrl(
    evt.coordinate, viewResolution, 'EPSG:3857',
    {'INFO_FORMAT': 'text/html'});
    if (url) {
      fetch(url)
        .then(function (response) { return response.text(); })
        .then(function (html) {
          document.getElementById('info').innerHTML = html;
        });
    }*/

});
map2.on('singleclick', function(evt) {
  document.getElementById('info1').innerHTML = '';
    var viewResolution = (view.getResolution());
    var url =provinces_sources.getFeatureInfoUrl(evt.coordinate, viewResolution, 'EPSG:3857', {'INFO_FORMAT': 'application/json'});
    console.log(url);
    $(document).ready(function () {
      $.getJSON(url, function (json) {
        const prov=json.features[0].properties;
        document.getElementById('info1').innerHTML='<p style="color:black;border:1px solid black;width:90%;font-size:11px;background-color:white;text-align:center;font-weight:Bold;padding:10px">Nom Provinces:  '+ prov.nomprefpro +' </br> Cas confirmes: '+prov.cas_confirmes+'</br></p>';
      })})
    });
//!charts.....................................................

$(document).ready(function () {
  $.getJSON("/data_provinces", function (json) {
    const nom_provinces=[];
    const cas_confirmes=[];
    const cas_deces=[];
    for (let i = 0; i < json.length; i++) {
           nom_provinces[i]=json[i].nomprefpro.toString();
            cas_confirmes[i]=json[i].cas_confirmes;
    }
    Highcharts.chart('chartcontainer1', {
      chart: {
          width:370,
          height:250,
          type: 'line'
      },
      title: {
          text: 'Cas confirmes par provinces'
      },
      subtitle: {
          text: 'Source: covid19.com'
      },
      xAxis: {
          categories:nom_provinces,
      },
      yAxis: {
          title: {
              text: ''
          }
      },
      plotOptions: {
          line: {
              dataLabels: {
                  enabled:false
              },
              enableMouseTracking: false
          }
      },
      series: [{
          name: 'cas_confirmes',
          data:cas_confirmes
      }, ]
  });
  })})


$(document).ready(function () {
  $.getJSON("/data_regions", function (json) {
    const nom_regions=[];
    const cas_deces=[];
    for (let i = 0; i < json.length; i++) {
      nom_regions[i]=json[i].nom_reg.toString();
      cas_deces[i]=json[i].cas_deces;
   }
   Highcharts.chart('chartContainer2', {
    chart: {
      width:370,
      height:250,
        type: 'column'
    },
    title: {
        text: 'Cas deces par regions'
    },
  
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: ''
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: true,
                format: '{point.y:.1f}%'
            }
        }
    },

    tooltip: {
        headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
        pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
    },

    series: [
      {
          name: "Regions",
          colorByPoint: true,
          data: [{
            name: json[0].nom_reg,
            y:json[0].cas_deces,
          
        }, 
        {
            name:  json[1].nom_reg,
            y:json[1].cas_deces,
        },
        {
          name:  json[2].nom_reg,
          y:json[2].cas_deces,
        },
      {
        name:  json[3].nom_reg,
        y:json[3].cas_deces,
       },
       {
        name:  json[4].nom_reg,
        y:json[4].cas_deces,
       },
       {
        name:  json[5].nom_reg,
        y:json[5].cas_deces,
       },
       {
        name:  json[6].nom_reg,
        y:json[6].cas_deces,
       },
       {
        name:  json[7].nom_reg,
        y:json[7].cas_deces,
       },
       {
        name:  json[8].nom_reg,
        y:json[8].cas_deces,
       },
       {
        name:  json[9].nom_reg,
        y:json[9].cas_deces,
       },
       {
        name:  json[10].nom_reg,
        y:json[10].cas_deces,
       },
       {
        name:  json[11].nom_reg,
        y:json[11].cas_deces,
       },
      
      ]
      }
  ],

});
  })})


$(document).ready(function () {
  $.getJSON("/data_regions", function (json) {
    Highcharts.chart('chartContainer3', {
      chart: {
         height:230,
         width:360,
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
      },
      title: {
          text: 'Cas confirmes par Regions'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
          point: {
              valueSuffix: '%'
          }
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false,
                  format: '<b>{point.name}</b>: {point.percentage:.1f} %',
              },
              showInLegend: false,

          }
      },
      series: [{
          name: 'Brands',
          colorByPoint: true,
          data: [{
              name: json[0].nom_reg,
              y:json[0].cas_confirmes,
            
          }, 
          {
              name:  json[1].nom_reg,
              y:json[1].cas_confirmes,
          },
          {
            name:  json[2].nom_reg,
            y:json[2].cas_confirmes,
          },
        {
          name:  json[3].nom_reg,
          y:json[3].cas_confirmes,
         },
         {
          name:  json[4].nom_reg,
          y:json[4].cas_confirmes,
         },
         {
          name:  json[5].nom_reg,
          y:json[5].cas_confirmes,
         },
         {
          name:  json[6].nom_reg,
          y:json[6].cas_confirmes,
         },
         {
          name:  json[7].nom_reg,
          y:json[7].cas_confirmes,
         },
         {
          name:  json[8].nom_reg,
          y:json[8].cas_confirmes,
         },
         {
          name:  json[9].nom_reg,
          y:json[9].cas_confirmes,
         },
         {
          name:  json[10].nom_reg,
          y:json[10].cas_confirmes,
         },
         {
          name:  json[11].nom_reg,
          y:json[11].cas_confirmes,
         },
        
        ]
      }]
  });
     
  })})

$(document).ready(function () {
    $.getJSON("/data_regions", function (json) {

      const pop_rurale=[];
      const pop_urbaine=[];
      const nom_regions=[];
      for (let i = 0; i < json.length; i++) {
        pop_rurale[i]=json[i].pop_rurale;
        pop_urbaine[i]=json[i].pop_urbain;
        nom_regions[i]=json[i].nom_reg.toString();
      
     }
     Highcharts.chart('chartcontainer4', {
      chart: {
        width:370,
          height:250,
        type: 'bar'
      },
      title: {
        text: 'Population by Region'
      },
    
      xAxis: {
        categories: nom_regions,
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Population ',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' millions'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -250,
        y:175,
        floating: true,
        borderWidth: 1,
        backgroundColor:
          Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Pop urbaine',
        data: pop_urbaine,
      }, {
        name: 'Pop_rurale',
        data: pop_rurale,
      }, ]
    });






    })


  })


//!!!!!!covid data///////////////

$(document).ready(function () {
  $.getJSON("/datacovid", function (json) {
    document.getElementById('confirme').innerHTML=json[0].confirmes;
    document.getElementById('exclus').innerHTML=json[0].Exclus;
    document.getElementById('deces').innerHTML=json[0].decedes;
    document.getElementById('Gueris').innerHTML=json[0].Gueris;
    document.getElementById('Masculin').innerHTML=json[0].Masculin+"%";
    document.getElementById('Feminin').innerHTML=json[0].Feminin+"%";
    document.getElementById('Moyen_age').innerHTML=json[0].MoyenAge+"ans";


    
  })

})
document.getElementById('legende1').style.display='none';
document.getElementById('legende2').style.display='none';
document.getElementById('button_legende1').style.display='none';
document.getElementById('button_legende2').style.display='none';

//!exporting map as Png

document.getElementById('export-png').addEventListener('click', function() {
  map.once('rendercomplete', function() {
    var mapCanvas = document.createElement('canvas');
    var size = map.getSize();
    mapCanvas.width = size[0];
    mapCanvas.height = size[1];
    var mapContext = mapCanvas.getContext('2d');
    Array.prototype.forEach.call(document.querySelectorAll('.ol-layer canvas'), function(canvas) {
      if (canvas.width > 0) {
        var opacity = canvas.parentNode.style.opacity;
        mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
        var transform = canvas.style.transform;
        // Get the transform parameters from the style's transform matrix
        var matrix = transform.match(/^matrix\(([^\(]*)\)$/)[1].split(',').map(Number);
        // Apply the transform to the export map context
        CanvasRenderingContext2D.prototype.setTransform.apply(mapContext, matrix);
        mapContext.drawImage(canvas, 0, 0);
      }
    });
    if (navigator.msSaveBlob) {
      // link download attribuute does not work on MS browsers
      navigator.msSaveBlob(mapCanvas.msToBlob(), 'map.png');
    } else {
      var link = document.getElementById('image-download');
      link.href = mapCanvas.toDataURL();
      link.click();
    }
  });
  map.renderSync();
});

//////////////////////////////////////////////////////////
//!!!!!!!Measurement//////////////////////////////////
var sketch;
var helpTooltipElement;
var helpTooltip;
var measureTooltipElement;
var measureTooltip;
var continuePolygonMsg = 'Click to continue drawing the polygon';
var continueLineMsg = 'Click to continue drawing the line';
var pointerMoveHandler = function(evt) {
  if (evt.dragging) {
    return;
  }
  /** @type {string} */
  var helpMsg = 'Click to start drawing';

  if (sketch) {
    var geom = sketch.getGeometry();
    if (geom instanceof ol.geom.Polygon) {
      helpMsg = continuePolygonMsg;
    } else if (geom instanceof ol.geom.LineString) {
      helpMsg = continueLineMsg;
    }
  }

  helpTooltipElement.innerHTML = helpMsg;
  helpTooltip.setPosition(evt.coordinate);

  helpTooltipElement.classList.remove('hidden');
};

map.on('pointermove', pointerMoveHandler);

map.getViewport().addEventListener('mouseout', function() {
  helpTooltipElement.classList.add('hidden');
});

var typeSelect = document.getElementById('type');

var draw;
var formatLength = function(line) {
  var length = ol.sphere.getLength(line);
  var output;
  if (length > 100) {
    output = (Math.round(length / 1000 * 100) / 100) +
        ' ' + 'km';
  } else {
    output = (Math.round(length * 100) / 100) +
        ' ' + 'm';
  }
  return output;
};
var formatArea = function(polygon) {
  var area = ol.sphere.getArea(polygon);
  var output;
  if (area > 10000) {
    output = (Math.round(area / 1000000 * 100) / 100) +
        ' ' + 'km<sup>2</sup>';
  } else {
    output = (Math.round(area * 100) / 100) +
        ' ' + 'm<sup>2</sup>';
  }
  return output;
};
function addInteraction() {
  var type = (typeSelect.value == 'area' ? 'Polygon' : 'LineString');
  draw = new ol.interaction.Draw({
    source: source,
    type: type,
    style: new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'rgba(255, 255, 255, 0.2)'
      }),
      stroke: new ol.style.Stroke({
        color: 'rgba(0, 0, 0, 0.5)',
        lineDash: [10, 10],
        width: 2
      }),
      image: new ol.style.Circle({
        radius: 5,
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 0, 0.7)'
        }),
        fill: new ol.style.Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        })
      })
    })
  });
  map.addInteraction(draw);
  createMeasureTooltip();
  createHelpTooltip();

  var listener;
  draw.on('drawstart',
  function(evt) {
    // set sketch
    sketch = evt.feature;

    /** @type {import("../src/ol/coordinate.js").Coordinate|undefined} */
    var tooltipCoord = evt.coordinate;

    listener = sketch.getGeometry().on('change', function(evt) {
      var geom = evt.target;
      var output;
      if (geom instanceof ol.geom.Polygon) {
        output = formatArea(geom);
        tooltipCoord = geom.getInteriorPoint().getCoordinates();
      } else if (geom instanceof ol.geom.LineString) {
        output = formatLength(geom);
        tooltipCoord = geom.getLastCoordinate();
      }
      measureTooltipElement.innerHTML = output;
      measureTooltip.setPosition(tooltipCoord);
    });
  });
  draw.on('drawend',
  function() {
    measureTooltipElement.className = 'ol-tooltip ol-tooltip-static';
    measureTooltip.setOffset([0, -7]);
    // unset sketch
    sketch = null;
    // unset tooltip so that a new one can be created
    measureTooltipElement = null;
    createMeasureTooltip();
    ol.Observable.unByKey(listener);
  });
}
function createHelpTooltip() {
  if (helpTooltipElement) {
    helpTooltipElement.parentNode.removeChild(helpTooltipElement);
  }
  helpTooltipElement = document.createElement('div');
  helpTooltipElement.className = 'ol-tooltip hidden';
  helpTooltip = new ol.Overlay({
    element: helpTooltipElement,
    offset: [15, 0],
    positioning: 'center-left'
  });
  map.addOverlay(helpTooltip);
}
function createMeasureTooltip() {
  if (measureTooltipElement) {
    measureTooltipElement.parentNode.removeChild(measureTooltipElement);
  }
  measureTooltipElement = document.createElement('div');
  measureTooltipElement.className = 'ol-tooltip ol-tooltip-measure';
  measureTooltip = new ol.Overlay({
    element: measureTooltipElement,
    offset: [0, -15],
    positioning: 'bottom-center'
  });
  map.addOverlay(measureTooltip);
}
typeSelect.onchange = function() {
  map.removeInteraction(draw);
  addInteraction();
};

addInteraction();