import { reactive, toRefs, watch, onBeforeUnmount } from 'vue';
import { Map, View } from 'ol';
import { ZoomSlider, Zoom } from 'ol/control';
import { Vector as VectorSource, Cluster } from 'ol/source';
import { fromLonLat } from 'ol/proj';
import { layerAdd } from '@/utils/layerManager';
import { Style, Stroke, Text, Fill } from 'ol/style';
import { GeoJSON } from 'ol/format';
import { Notify } from '@/utils/notify';
import Photo from 'ol-ext/style/Photo';
import AnimatedCluster from 'ol-ext/layer/AnimatedCluster';

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
      title: 'maphoto',
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
  function genStyle(size, src) {
    if (size <= 1) {
      return new Style({
        image: new Photo({
          src: src,
          radius: 20,
          crop: true,
          kind: 'square',
          shadow: true,
          stroke: new Stroke({
            width: 3,
            color: '#fff',
          }),
        }),
      });
    } else {
      return new Style({
        image: new Photo({
          src: src,
          radius: 20,
          crop: true,
          kind: 'folio',
          shadow: true,
          stroke: new Stroke({
            width: 3,
            color: '#fff',
          }),
        }),
        text: new Text({
          text: `${size}`,
          font: 'bold 12px helvetica,sans-serif',
          offsetX: 20,
          offsetY: -20,
          fill: new Fill({
            color: '#000',
          }),
        }),
      });
    }
  }

  //   创建地图及图层
  function createMap() {
    map = new Map({
      target: 'map-container',
      layers: [layerAdd('street')],
      view: new View({
        center: fromLonLat([110, 39]),
        zoom: 12,
        maxZoom: state.mapConfig.maxZoom,
        minZoom: state.mapConfig.minZoom,
      }),
      controls: [new ZoomSlider(), new Zoom()],
    });
    map.on('loadstart', loadStartEvtHandler);
    map.on('rendercomplete', loadCompleteEvtHandler);
    window.map = map;
    bindClickEvt();
  }

  function loadCompleteEvtHandler(evt) {
    state.loading = false;
  }
  function loadStartEvtHandler(evt) {
    state.loading = true;
  }
  onBeforeUnmount(() => {
    // 解除监听
    map.un('rendercomplete', loadCompleteEvtHandler);
    map.un('loadstart', loadCompleteEvtHandler);
    map.un('click');
  });

  //   加载点资源
  function loadPhoto(data) {
    console.log(state.mapConfig.autoCenter);
    try {
      // 创建矢量数据源
      let vecSource = new VectorSource({
        title: 'poi',
        features: new GeoJSON().readFeatures(data),
        wrapX: false,
      });
      var newClusterSource = new Cluster({
        distance: state.mapConfig.tolerance,
        source: vecSource,
      });
      clusterLyr = new AnimatedCluster({
        name: 'maphoto',
        source: newClusterSource,
        // maxResolution: 40,
        style: (feature, resolution) => {
          var clusterFeats = feature.get('features');
          const size = clusterFeats.length;
          const icon = clusterFeats[0].get('icon');
          // console.log('icon:' + icon);
          return genStyle(size, thumbUrl + icon);
        },
      });

      map.addLayer(clusterLyr);
      //   定位图层
      if (state.mapConfig.autoCenter) {
        map.getView().fit(vecSource.getExtent(), map.getSize());
      } else {
        let vw = map.getView();
        vw.setCenter(fromLonLat([state.mapConfig.lon, state.mapConfig.lat]));
        vw.setZoom(state.mapConfig.maxZoom);
      }
    } catch (err) {
      Notify.warning('无照片:' + err);
    }
  }

  //   绑定点击事件
  function bindClickEvt() {
    map.on('click', event => {
      state.popup.srcs.length = 0;
      clusterLyr
        .getFeatures(event.pixel)
        .then(clusterFeat => {
          if (clusterFeat.length > 0) {
            state.popup.open = true;
            const features = clusterFeat[0].get('features');
            if (features.length > 0) {
              features.forEach(feat => {
                const srcs = feat.get('srcs');
                const date = feat.get('date').slice(0, 10);
                if (srcs) {
                  srcs.split('/').forEach(src => {
                    state.popup.srcs.push({ date, src: photoUrl + src });
                  });
                }
              });
            }
          } else {
            state.popup.open = false;
          }
        })
        .catch(error => {
          alert('错误:' + error);
        });
    });
  }
  watch(
    () => state.mapConfig,
    val => {
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
