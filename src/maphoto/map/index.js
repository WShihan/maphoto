import { reactive, toRefs, watch, onBeforeUnmount } from "vue";
import { Map, View } from "ol";
import { Vector as VectorLayer } from "ol/layer";
import { ZoomSlider, Zoom } from "ol/control";
import { Vector as VectorSource, Cluster, TileArcGISRest as ArcgisTile } from "ol/source";
import { fromLonLat } from "ol/proj";
import { layerAdd } from "@/utils/layerManager";
import { Style, Stroke, Text, Icon, Fill } from "ol/style";
import { GeoJSON } from "ol/format";
import { Notify } from "@/utils/notify";

export function initialMap() {
  // 初始化参数
  let state = reactive({
    popup: {
      open: false,
      srcs: [],
    },
    mapConfig: {
      autoCenter: true,
      iconSize: null,
      lat: null,
      link: null,
      lon: null,
      maxZoom: 16,
      minZoom: 3,
      note: null,
      title: "maphoto",
      tolerance: 40.0,
    },
    loading: false,
  });

  /** @type {Map} */
  let map;

  /** @type {VectorLayer} */
  let clusterLyr;
  const thumbUrl = process.env.VUE_APP_THUMB_URL;
  const photoUrl = process.env.VUE_APP_MAPHOTO_URL;

  //   创建地图及图层
  function createMap() {
    map = new Map({
      target: "map-container",
      layers: [layerAdd("street")],
      view: new View({
        center: fromLonLat([110, 39]),
        zoom: 12,
        maxZoom: state.mapConfig.maxZoom,
        minZoom: state.mapConfig.minZoom,
      }),
      controls: [new ZoomSlider(), new Zoom()],
    });
    map.on("loadstart", loadStartEvtHandler);
    map.on("rendercomplete", loadCompleteEvtHandler);
    window.map = map;
    bindClickEvt();
  }

  //   创建样式
  function genStyle(text = "", iconPath = thumbUrl + "3c42f1c8befeeb7b.png") {
    return new Style({
      image: new Icon({
        anchor: [0.5, 60],
        anchorOrigin: "top-right",
        anchorXUnits: "fraction",
        anchorYUnits: "pixels",
        offsetOrigin: "top-right",
        // offset:[0,10],
        //图标缩放比例
        scale: 0.5,
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
        offsetX: 15,
        offsetY: -20,
        placement: "point",
        //基准线
        textBaseline: "middle",
        //文字样式
        font: "normal 12px 微软雅黑",
        //文本填充样式（即文字颜色）
        fill: new Fill({ color: "#fff" }),
        // stroke: new Stroke({ color: "#gray", width: 0 }),
        // backgroundFill: new Fill({ color: "#fff" }),
      }),
      fill: new Fill({ color: "blue" }),
    });
  }
  function loadCompleteEvtHandler(evt) {
    state.loading = false;
  }
  function loadStartEvtHandler(evt) {
    state.loading = true;
  }
  onBeforeUnmount(() => {
    // 解除监听
    map.un("rendercomplete", loadCompleteEvtHandler);
    map.un("loadstart", loadCompleteEvtHandler);
    map.un("click");
  });

  //   加载点资源
  function loadPhoto(data) {
    try {
      // 创建矢量数据源
      let vecSource = new VectorSource({
        title: "poi",
        features: new GeoJSON().readFeatures(data),
        wrapX: false,
      });
      //   创建聚合数据源
      let clusterSource = new Cluster({
        distance: state.mapConfig.tolerance,
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
          return genStyle(size, thumbUrl + clusterFeats[0].get("icon"));
        },
      });
      //   添加图层
      map.addLayer(clusterLyr);
      //   定位图层
      map.getView().fit(vecSource.getExtent(), map.getSize());
    } catch {
      Notify.warning("无照片");
    }
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
                const srcs = feat.get("srcs");
                if (srcs) {
                  srcs.split("/").forEach((src) => {
                    state.popup.srcs.push(photoUrl + src);
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
  watch(
    () => state.mapConfig,
    (val) => {
      console.log(val);
      if (!map) return;
      let view = map.getView();
      if (val.maxZoom) view.setMaxZoom(val.maxZoom);
      if (val.minZoom) view.setMinZoom(val.minZoom);
    },
    { deep: true, immediate: true }
  );

  return {
    createMap,
    loadPhoto,
    ...toRefs(state),
  };
}

export default initialMap;
