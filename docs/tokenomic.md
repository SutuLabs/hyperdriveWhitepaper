# 代币经济学

<script setup>
import { allocation } from './data/token.ts'
import { ref, toRaw } from 'vue';
import { useData } from 'vitepress'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

import {
//   Chart as ChartJS,
  Title,
//   Tooltip,
//   Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const CHART_COLORS = {
  red: 'rgb(255, 99, 132)',
  orange: 'rgb(255, 159, 64)',
  yellow: 'rgb(255, 205, 86)',
  green: 'rgb(75, 192, 192)',
  blue: 'rgb(54, 162, 235)',
  purple: 'rgb(153, 102, 255)',
  grey: 'rgb(201, 203, 207)'
};
ChartJS.register(ArcElement, Tooltip, Legend)

const { site, frontmatter } = useData();
const allo =allocation;
const curallo= ref(allo);
// const total= ref(data.data.total);

const day =ref(0);

const totalYear=20;
const barData = {
  labels: [... Array(totalYear*12).keys()],
  datasets: allo.map((_,i)=>({
      label: _.name,
      backgroundColor: Object.values(CHART_COLORS)[i],
      data:[... Array(totalYear*12).keys()].map(m=>_.getValue(m*30)) 
  })) 
}

// console.log(allo.map(_=>_.getValue(0)))
const piedata = ref({
                labels: [],
                datasets: [ ]
            })

const options = {
  responsive: false,
  maintainAspectRatio: true,
  aspectRatio: 1,
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  events:['mousemove'],
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true
      }
    }
}

const plugins= [{
    id: 'myEventCatcher',
    beforeEvent(chart, args, pluginOptions) {
      const event = args.event;
      if (event.type === 'mousemove') {
        // process the event
        // console.log("mousemove", chart, args, pluginOptions)
        // const canvasPosition = Chart.helpers.getRelativePosition(event, chart);
        const canvasPosition= args.event;

        // Substitute the appropriate scale IDs
        const dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
        if (dataX>0 && dataX<=totalYear*12)
        {
            const all = allo.map(_=>_.getValue(dataX*30));
            const prevall = allo.map(_=>_.getValue(dataX*30) -_.getValue((dataX-1)*30));
            const total = all.reduce((pv,cv)=>pv +cv,0);
            const prevtotal = prevall.reduce((pv,cv)=>pv +cv,0);
            // console.log(all, total)

            curallo.value = allo.map((_,i)=>({
                name:_.name,
                note:_.note,
                increase:prevall[i], 
                increasePercent:(prevall[i]*100/prevtotal).toFixed(1)+" %",
                totalPercent:(prevall[i]*100/total).toFixed(1)+" %",
                value:all[i], 
                percent:(all[i]*100/total).toFixed(1)+" %"}));
                // percent:i.toFixed(2)+" %"}));

// console.log(all)
            piedata.value = {
                labels: allo.map(_=>_.name),
                datasets: [
                    {
                        backgroundColor: Object.values(CHART_COLORS),
                        data: all,
                    }
                ]
            }
        }

        // const dataY = chart.scales.y.getValueForPixel(canvasPosition.y);
        // console.log(dataX,dataY, canvasPosition)
      }
    }
  }]
</script>

  <Bar :data="barData" :options="barOptions" :plugins="plugins" />

<table>
<tr>
<th rowspan="2">分配</th>
<th colspan="2">累积</th>
<th colspan="3">较上月增幅</th>
<th rowspan="2">备注</th>
</tr>
<tr>
<th>份额</th>
<th>百分比</th>
<th>份额</th>
<th>本月<br/>百分比</th>
<th>流通<br/>百分比</th>
</tr>
<tr v-for="p of curallo">
  <td>
    {{ p.name }}
  </td>
  <td>
    {{ p.value?.toFixed(0) }}
  </td>
  <td>
    {{ p.percent }}
  </td>
  <td>
    {{ p.increase?.toFixed(0) }}
  </td>
  <td>
    {{ p.increasePercent }}
  </td>
  <td>
    {{ p.totalPercent }}
  </td>
  <td>
    {{ p.note }}
  </td>
</tr>
<tr>
  <td>
    汇总
  </td>
  <td>
    {{ curallo.reduce((cv,pv)=>cv+pv.value??0,0).toFixed(0) }}
  </td>
  <td>
  </td>
  <td>
    {{ curallo.reduce((cv,pv)=>cv+pv.increase??0,0).toFixed(0) }}
  </td>
  <td>
  </td>
  <td>
  </td>
  <td>
  </td>
</tr>
</table>



  <Pie :data="piedata" :options="options" />