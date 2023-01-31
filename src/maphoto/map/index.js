import { reactive, toRefs } from "vue";
import { Map, View } from "ol";
import { Tile, Vector as VectorLayer } from "ol/layer";
import { XYZ, Vector as VectorSource, Cluster } from "ol/source";
import { fromLonLat } from "ol/proj";
import { getPhotos } from "@/api/index";
import { Style, Stroke, Text, Icon, Fill } from "ol/style";
import { GeoJSON } from "ol/format";

export function initialMap() {
  // 初始化参数
  let state = reactive({
    popup: {
      open: false,
      srcs: [],
    },
  });
  const tk = "bdbf8bbd2d00a2731397dca87a489db0";
  let map;
  let clusterLyr;
  const icons = [
    "https://md-1301600412.cos.ap-nanjing.myqcloud.com/GIS/img/%E6%99%AF%E7%82%B9%E6%99%AF%E5%8C%BA%20red.svg",
    "https://md-1301600412.cos.ap-nanjing.myqcloud.com/GIS/img/%E6%99%AF%E7%82%B9%E6%99%AF%E5%8C%BAblue.svg",
  ];
  //   创建地图及图层
  function createMap() {
    map = new Map({
      target: "map-container",
      layers: [
        new Tile({
          title: "高德影像地图",
          source: new XYZ({
            url: "http://webst0{1-4}.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}",
          }),
        }),
        new Tile({
          title: "天地图矢量注记图层",
          source: new XYZ({
            url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=" + tk,
          }),
        }),
      ],
      view: new View({
        center: fromLonLat([118, 39]),
        zoom: 6,
      }),
      controls: [],
    });
    window.map = map;
    bindClickEvt();
  }

  //   创建样式
  function genStyle(
    text = "",
    iconPath = "https://md-1301600412.cos.ap-nanjing.myqcloud.com/icons/vue.png"
  ) {
    return new Style({
      image: new Icon({
        anchor: [0.5, 60],
        anchorOrigin: "top-right",
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        offsetOrigin: "top-right",
        // offset:[0,10],
        //图标缩放比例
        scale: 0.2,
        //透明度
        opacity: 0.75,
        //图标的url
        src: iconPath,
        // width: 40,
      }),
      text: new Text({
        //文本内容
        text: text + "",
        //位置
        textAlign: "center",
        justify: "center",
        offsetX: 20,
        offsetY: -10,
        placement: "point",
        //基准线
        textBaseline: "middle",
        //文字样式
        font: "normal 12px 微软雅黑",
        //文本填充样式（即文字颜色）
        fill: new Fill({ color: "#fff" }),
        stroke: new Stroke({ color: "#ffffff", width: 0 }),
        backgroundFill: new Fill({ color: "blue" }),
      }),
    });
  }

  //   加载点资源
  function loadPhoto() {
    var styleCache = {};
    getPhotos().then((data) => {
      // 创建矢量数据源
      let vecSource = new VectorSource({
        title: "poi",
        features: new GeoJSON().readFeatures(data),
        wrapX: false,
      });
      //   创建聚合数据源
      let clusterSource = new Cluster({
        distance: 80,
        source: vecSource,
      });
      //   创建图层
      clusterLyr = new VectorLayer({
        source: clusterSource,
        style: (feature, resolution) => {
          var size = feature.get("features").length;
          var style = styleCache[size];
          if (!style) {
            if (feature.get("features")[0].get("中类").search("铁") >= 0) style = genStyle(size);
            else style = genStyle(size, icons[0]);
            styleCache[size] = style;
          }
          return style;
        },
      });
      //   添加图层
      map.addLayer(clusterLyr);
      //   定位图层
      map.getView().fit(vecSource.getExtent(), map.getSize());
    });
  }

  function genSelectedStyle(feature) {
    const color = "#fff";
    return genStyle().getText().getFill().setColor(color);
  }

  //   绑定点击事件
  function bindClickEvt() {
    map.on("click", (event) => {
      clusterLyr.getFeatures(event.pixel).then((features) => {
        if (features.length > 0) {
          state.popup.open = true;
          console.log(features[0].get("features"));
        } else {
          state.popup.open = false;
        }
      });
    });
  }

  return {
    createMap,
    loadPhoto,
    ...toRefs(state),
  };
}

export default initialMap;
