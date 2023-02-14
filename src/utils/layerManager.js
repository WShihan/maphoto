import { Tile, Vector as VectorLayer } from "ol/layer";
import { XYZ, Vector as VectorSource, Cluster, TileArcGISRest as ArcgisSource } from "ol/source";
import { getPhotos } from "@/apis";
import { Style, Stroke, Text, Icon, Fill } from "ol/style";
import { GeoJSON } from "ol/format";

export class MapEnum {
  static get Street() {
    return "street";
  }
  static get Mix() {
    return "mix";
  }
  static get Satellite() {
    return "satellite";
  }
}

//   创建样式
function genStyle(
  text = "",
  iconPath = "https://md-1301600412.cos.ap-nanjing.myqcloud.com/temp/%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87%E7%BC%96%E8%BE%91_20230131221642.jpg"
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
      scale: 0.015,
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
      offsetY: 10,
      placement: "point",
      //基准线
      textBaseline: "middle",
      //文字样式
      font: "normal 12px 微软雅黑",
      //文本填充样式（即文字颜色）
      fill: new Fill({ color: "#fff" }),
      stroke: new Stroke({ color: "#ffffff", width: 0 }),
    }),
    stroke: new Stroke({ color: "white", width: 2, lineCap: "round" }),
  });
}
const photoBaseUrl = "https://md-1301600412.cos.ap-nanjing.myqcloud.com/maphoto/thumb/";

const tk = "bdbf8bbd2d00a2731397dca87a489db0";
export function layerAdd(name) {
  switch (name) {
    case "satellite":
      return new Tile({
        source: new ArcgisSource({
          url: "https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
        }),
      });
    case "street":
      return new Tile({
        name: "street",
        zIndex: 0,
        source: new XYZ({
          url: "https://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
        }),
      });
      break;
    case "label":
      return new Tile({
        zIndex: 98,
        name: "label",
        source: new XYZ({
          url: "http://t0.tianditu.com/DataServer?T=cva_w&x={x}&y={y}&l={z}&tk=" + tk,
        }),
      });
    default:
      break;
  }
}
export function layerAddPhoto() {
  return new Promise((resolve, reject) => {
    getPhotos().then((data) => {
      // 创建矢量数据源
      let vecSource = new VectorSource({
        features: new GeoJSON().readFeatures(data),
        wrapX: false,
      });
      //   创建聚合数据源
      let clusterSource = new Cluster({
        distance: 80,
        source: vecSource,
      });
      //   创建图层
      let clusterLyr = new VectorLayer({
        name: "maphoto",
        zIndex: 99,
        source: clusterSource,
        style: (feature, resolution) => {
          var size = feature.get("features").length;
          const src = feature.get("features")[0].get("icon");
          return genStyle(size, photoBaseUrl + src);
        },
      });
      resolve({
        layer: clusterLyr,
        extent: vecSource.getExtent(),
      });
    });
  });
}

/**
 * @description
 * @export
 * @param {Array} names
 * @param {boolean} [reverse=false]
 */
export function layerRemove(names, reverse = false) {
  let map = window.map;
  const layers = map.getAllLayers();
  layers.forEach((lyr) => {
    if (names.find((item) => item === lyr.getProperties().name)) {
      if (!reverse) map.removeLayer(lyr);
    } else {
      if (reverse) map.removeLayer(lyr);
    }
  });
}

export function layerChange(type) {
  let map = window.map;
  switch (type) {
    case MapEnum.Street:
      layerRemove(["maphoto"], true);
      map.addLayer(layerAdd(type));
      break;
    case MapEnum.Mix:
      layerRemove(["street", "satellite"]);
      map.addLayer(layerAdd("label"));
      map.addLayer(layerAdd("satellite"));
      break;

    case MapEnum.Satellite:
      layerRemove(["maphoto"], true);
      map.addLayer(layerAdd(type));
      break;
  }
}
