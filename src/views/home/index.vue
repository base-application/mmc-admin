<template>
  <div class="flex justify-between px-10">
    <n-statistic label="Total users" :value="statistics.userCount">
      <template #prefix>
        <n-icon>
          <PersonCircleSharp />
        </n-icon>
      </template>
    </n-statistic>
    <n-statistic label="Total events" :value="statistics.eventCount">
      <template #prefix>
        <n-icon>
          <CalendarNumberSharp />
        </n-icon>
      </template>
    </n-statistic>
    <n-statistic label="Total refer" :value="statistics.referCount">
      <template #prefix>
        <n-icon>
          <PaperPlane />
        </n-icon>
      </template>
    </n-statistic>
    <n-statistic label="Total support(MYR)" :value="statistics.supportCount">
      <template #prefix>
        <n-icon>
          <BarChartSharp />
        </n-icon>
      </template>
    </n-statistic>
  </div>
  <div id="echartMap" class="flex-1" style="height: calc(100vh - 120px);"></div>
  <div class="flex justify-between flex-grow-1" style="height: 100vh;">
    <div id="echartBar" class="flex-1" style="height: 100%"></div>
    <div id="echartPie" class="flex-1" style="height: 100%"></div>
  </div>
 
</template>

<script lang="ts">
import { netUserInfoStatistics } from '@/api/userInfo'
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
import { IUserStatistics } from "@/types/userInfo"
import { PersonCircleSharp, CalendarNumberSharp, PaperPlane, BarChartSharp } from "@vicons/ionicons5"
interface IState {
  statistics: Partial<IUserStatistics>
}
export default defineComponent({
  components: { PersonCircleSharp, CalendarNumberSharp, PaperPlane, BarChartSharp },
  setup() {
    const state = reactive<IState>({
      statistics: {}
    })
    const renderMap = (originData: IUserStatistics['map']) => {
      const mapDom = document.getElementById('echartMap') as HTMLElement
      const mapChart = window.echarts.init(mapDom)
      const data = originData.map(v => {
        return {
          name: v.name,
          value: [v.longitude, v.latitude, v.total]
        }
      })
      const option = {
        tooltip: {
          trigger: 'item'
        },
        bmap: {
          center: [101.976764,5.162705],
          zoom: 4,
          roam: true,
          mapStyle: {
            styleJson: [
              {
                featureType: 'water',
                elementType: 'all',
                stylers: {
                  color: '#044161'
                }
              },
              {
                featureType: 'land',
                elementType: 'all',
                stylers: {
                  color: '#004981'
                }
              },
              {
                featureType: 'boundary',
                elementType: 'geometry',
                stylers: {
                  color: '#064f85'
                }
              },
              {
                featureType: 'railway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'highway',
                elementType: 'geometry',
                stylers: {
                  color: '#004981'
                }
              },
              {
                featureType: 'highway',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#005b96',
                  lightness: 1
                }
              },
              {
                featureType: 'highway',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry',
                stylers: {
                  color: '#004981'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#00508b'
                }
              },
              {
                featureType: 'poi',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'green',
                elementType: 'all',
                stylers: {
                  color: '#056197',
                  visibility: 'off'
                }
              },
              {
                featureType: 'subway',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'manmade',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'local',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'arterial',
                elementType: 'labels',
                stylers: {
                  visibility: 'off'
                }
              },
              {
                featureType: 'boundary',
                elementType: 'geometry.fill',
                stylers: {
                  color: '#029fd4'
                }
              },
              {
                featureType: 'building',
                elementType: 'all',
                stylers: {
                  color: '#1a5787'
                }
              },
              {
                featureType: 'label',
                elementType: 'all',
                stylers: {
                  visibility: 'off'
                }
              }
            ]
          }
        },
        series: [
          {
            name: 'User',
            type: 'effectScatter',
            coordinateSystem: 'bmap',
            data,
            encode: {
              value: 2
            },
            symbolSize: function (val) {
              return val[2] * 10
            },
            showEffectOn: 'emphasis',
            rippleEffect: {
              brushType: 'stroke'
            },
            hoverAnimation: true,
            label: {
              formatter: '{b}',
              position: 'right',
              show: true
            },
            itemStyle: {
              color: '#f4e925',
              shadowBlur: 10,
              shadowColor: '#333'
            },
            zlevel: 1
          }
        ]
      }
      mapChart.setOption(option)
    }
    const renderBar = (originData: IUserStatistics['groupRank']) => {
      const barChartDom = document.getElementById('echartBar') as HTMLElement
      const barChart = window.echarts.init(barChartDom)
      const yAxisData = originData.map(v => v.groupName)
      const referData = originData.map(v => v.refer)
      const supportData = originData.map(v => v.support)
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // Use axis to trigger tooltip
            type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'category',
          data: yAxisData
        },
        series: [
          {
            name: 'refer',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: referData
          },
          {
            name: 'support',
            type: 'bar',
            stack: 'total',
            label: {
              show: true
            },
            emphasis: {
              focus: 'series'
            },
            data: supportData
          }
        ]
      }
      barChart.setOption(option)
    }
    const renderPie = (originData: IUserStatistics['userGroupGrade']) => {
      const pieDom = document.getElementById('echartPie') as HTMLElement
      const pieChart = window.echarts.init(pieDom)
      const data = originData.map(v => {
        return {
          value: v.total,
          name: v.gradeName
        }
      })
      const option = {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: '5%',
          left: 'center'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
            data
          }
        ]
      }
      pieChart.setOption(option)
    }
    onMounted(() => {
      netUserInfoStatistics()
        .then(res => {
          console.log(res)
          state.statistics = res.data as IState['statistics']
          renderMap(res.data.map)
          renderBar(res.data.groupRank)
          renderPie(res.data.userGroupGrade)
        })
    })

    return {
      ...toRefs(state)
    }
  }
})
</script>

<style scoped>
</style>

