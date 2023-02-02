import { reactive, toRefs } from "vue";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import { layerAdd, layerAddPhoto } from "@/utils/layerManager";

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
      layers: [layerAdd("street"), layerAdd("label")],
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

export default initialMap;
