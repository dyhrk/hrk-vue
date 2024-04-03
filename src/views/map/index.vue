<template>
  <div class="app-container layout-padding w100">
    <el-card class="table_bord" style="position: relative;">
      <div id="container"></div>
      <div style="position: absolute;top: 20px;left: 20px;height: 91px;">
        <el-card>
          <el-form :model="form" ref="queryForm" size="large" :inline="true" label-width="80px">
            <el-form-item style="margin-bottom: 0;" label="位置查询" prop="deptName">
              <el-select v-model="form.positionName" clearable style="width: 400px;" filterable remote reserve-keyword
                placeholder="请输入关键词" :remote-method="remoteMethod" :loading="loading" @change="getFileName">
                <el-option v-for="item in poiList" :key="item.name" :label="item.name" :value="item.name">
                  <div class="flex items-center" style="align-items: center;width: 360px;">
                    <SvgIcon name="ele-Location" style="margin-right: 10px;" :size="20" />
                    <span>{{ item.name }}</span>
                    <span class="address">
                      {{ item.address }}
                    </span>
                  </div>
                </el-option>
              </el-select>

            </el-form-item>

          </el-form>

        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup name="Map">
import AMapLoader from '@amap/amap-jsapi-loader'; //引入
window._AMapSecurityConfig = {
  securityJsCode: '',//你的秘钥
}

const form = ref({})
const position = ref([])
const map = ref(null)
const aMap = ref(null)

const geolocation = ref(null)
const placeSearchComponent = ref(null)
const loading = ref(false)
const poiList = ref([])

function initMap() {

  AMapLoader.load({
    key: "", //此处填入我们注册账号后获取的Key
    version: "2.0", //指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: [
      'AMap.ToolBar',
      'AMap.Scale',
      'AMap.Geolocation',
      'AMap.PlaceSearch',
      'AMap.AutoComplete',
      'AMap.Geocoder',
      'AMap.CitySearch',
      'AMap.MouseTool'
    ],
    resizeEnable: true,
  }).then((AMap) => {

    aMap.value = AMap
    map.value = new AMap.Map("container", {  //设置地图容器id
      viewMode: "3D",    //是否为3D地图模式
      zoom: 15,          //初始化地图级别
      WebGLParams: {
        preserveDrawingBuffer: true
      }
    });

    map.value.addControl(new AMap.Scale())  // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
    map.value.addControl(new AMap.ToolBar())  //在图面添加鹰眼控件，在地图右下角显示地图的缩略图

    geolocation.value = new AMap.Geolocation({
      enableHighAccuracy: true, // 是否使用高精度定位，默认:true
      showCircle: false,        //定位成功后用圆圈表示定位精度范围，默认：true
      // timeout: 10000           // 超过10秒后停止定位，默认：5s
    });

    let citySearch = new AMap.CitySearch()

    citySearch.getLocalCity(function (status, result) {
      if (status === 'complete' && result.info === 'OK') {
        // 查询成功，result即为当前所在城市信息
        placeSearchComponent.value = new AMap.PlaceSearch({
          // city 指定搜索所在城市，支持传入格式有：城市名、citycode和adcode
          city: result.adcode
        })

      }
    })


    map.value.addControl(geolocation.value);
    // 监听定位事件
    geolocation.value.getCurrentPosition((status, result) => {
      if (status == 'complete') {
        onComplete(result);
      } else {
        onError(result.message);
      }
    });
  }).catch(e => {
    console.log(e);
  })

}

// 定位成功的回调函数
function onComplete(data) {
  // data是一个对象，包含经纬度信息和地址信息
  console.log('经度：' + data.position.getLng());
  console.log('纬度：' + data.position.getLat());
  position.value = [data.position.getLng(), data.position.getLat()]
  // 可以在这里执行其他逻辑，比如显示位置信息等
}

// 定位失败的回调函数
function onError(message) {
  console.log('定位失败：' + message);
}

function getFileName(val) {
  poiList.value.map(res => {
    if (res.name === val) {
      map.value.setCenter(res.location,true);
      console.log("res.location", res.location);
      map.value.setZoom(15);
    }
  })
}

function remoteMethod(query) {


  if (query !== '') {
    loading.value = true;
    if (position.value.length > 0) {
      placeSearchComponent.value.searchNearBy(query, position.value, 50000, function (status, result) {
        if (status === 'complete' && result.info === "OK") {
          loading.value = false
          poiList.value = result.poiList.pois
        } else {
          loading.value = false
          poiList.value = []
          // that.$message({
          //   message: "没有查到结果",
          //   type: "warning",
          // });
        }
      })
    } else {
      placeSearchComponent.value.search(query, function (status, result) {
        if (status === 'complete' && result.info === "OK") {
          loading.value = false
          poiList.value = result.poiList.pois
        } else {
          loading.value = false
          poiList.value = []
          // that.$message({
          //   message: "没有查到结果",
          //   type: "warning",
          // });
        }
      })
    }

  } else {
    poiList.value = []
    loading.value = false
  }


}

onMounted(() => {
  initMap()
})

</script>
<style scoped>
#container {
  width: 100%;
  height: 100%;
}

.address {
  color: #999;
  margin-left: 10px;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>