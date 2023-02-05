import { reactive, toRefs } from "vue";
import { Map, View } from "ol";
import { Tile, Vector as VectorLayer } from "ol/layer";
import { XYZ, Vector as VectorSource, Cluster } from "ol/source";
import { fromLonLat } from "ol/proj";
import { layerAdd } from "@/utils/layerManager";
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

  /** @type {VectorLayer} */
  let clusterLyr;
  const photoBaseUrl = "https://md-1301600412.cos.ap-nanjing.myqcloud.com/maphoto/thumb/";
  const icons = [
    "https://md-1301600412.cos.ap-nanjing.myqcloud.com/GIS/img/%E6%99%AF%E7%82%B9%E6%99%AF%E5%8C%BA%20red.svg",
    "https://md-1301600412.cos.ap-nanjing.myqcloud.com/GIS/img/%E6%99%AF%E7%82%B9%E6%99%AF%E5%8C%BAblue.svg",
  ];
  //   创建地图及图层
  function createMap() {
    map = new Map({
      target: "map-container",
      layers: [layerAdd("street")],
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
    iconPath = "https://md-1301600412.cos.ap-nanjing.myqcloud.com/maphoto/thumb/IMG_20210815_151704.jpg"
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
        scale: 0.01,
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
        name: "maphoto",
        zIndex: 99,
        source: clusterSource,
        style: (feature, resolution) => {
          var clusterFeats = feature.get("features");
          const size = clusterFeats.length;
          var style = styleCache[size];
          if (!style) {
            style = genStyle(size);
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
      state.popup.srcs.length = 0;
      clusterLyr
        .getFeatures(event.pixel)
        .then((clusterFeat) => {
          if (clusterFeat.length > 0) {
            state.popup.open = true;
            const features = clusterFeat[0].get("features");
            if (features.length > 0) {
              features.forEach((feat) => {
                state.popup.srcs.push(photoBaseUrl + feat.get("icon"));
                const srcs = feat.get("srcs");
                if (srcs) {
                  srcs.split("/").forEach((src) => {
                    state.popup.srcs.push(photoBaseUrl + src);
                  });
                }
              });
            }
          } else {
            state.popup.open = false;
          }
        })
        .catch((error) => {
          alert("错误:" + error);
        });
    });
  }

  return {
    createMap,
    loadPhoto,
    ...toRefs(state),
  };
}

/*
export function initialMap() {
  // 初始化参数
  let state = reactive({
    popup: {
      open: false,
      srcs: [],
    },
  });
  let map;
  let clusterLyr;
  const photoBaseUrl = "https://md-1301600412.cos.ap-nanjing.myqcloud.com/maphoto/thumb/";
  //   创建地图及图层
  function createMap() {
    map = new Map({
      target: "map-container",
      layers: [layerAdd("street")],
      view: new View({
        center: fromLonLat([118, 39]),
        zoom: 6,
      }),
      controls: [],
    });
    window.map = map;
    bindClickEvt();
  }

  //   加载点资源
  function loadPhoto() {
    layerAddPhoto().then((res) => {
      clusterLyr = res.layer;
      //   添加图层
      map.addLayer(clusterLyr);
      //   定位图层
      map.getView().fit(res.extent, map.getSize());
    });
  }

  //   绑定点击事件
  function bindClickEvt() {
    map.on("click", (event) => {
      state.popup.srcs.length = 0;
      clusterLyr.getFeatures(event.pixel).then((clusterFeat) => {
        if (clusterFeat.length > 0) {
          state.popup.open = true;
          const features = clusterFeat[0].get("features");
          if (features.length > 0) {
            features.forEach((feat) => {
              state.popup.srcs.push(photoBaseUrl + feat.get("icon"));
              const srcs = feat.get("srcs");
              if (srcs) {
                srcs.split("/").forEach((src) => {
                  state.popup.srcs.push(photoBaseUrl + src);
                });
              }
            });
          }
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
*/
export default initialMap;
