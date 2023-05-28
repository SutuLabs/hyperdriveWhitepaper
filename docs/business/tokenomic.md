# 代币经济学

<script setup>
import { allocation } from '../data/token.ts'
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


<!-- Cria 区块链将发行名为 CRIA 的链上代币，CRIA 的总发行量为 100,000,000 个。其中： -->
- 20%（即 20,000,000 个）分配给基金会。Cria 基金会是独立的非营利的中心化组织，主要职责是通过管理和分配资金来支持和促进 Cria 生态系统的长期发展。基金会更偏向于投资有利于生态建设的高科研底层技术。基金会财务情况将始终保持高透明性。
- 10%（即 10,000,000 个）分配给社区。Cria 社区是所有参与 Cria 生态系统的人和组织的总和，由社区选举的自治委员会代为执行社区意志，社区资金用于奖励生态系统中的开发者或贡献者。
- 15%（即 15,000,000 个）分配给投资人。Cria 会分多次进行融资，并将代币总量的 15% 分配给投资人。
- 5%（即 5,000,000 个）分配给 Genesis 团队。Genesis 团队即 Cria 的原始创建成员。
- 10%（即 10,000,000 个）分配给公司。从链开发开始成立的公司，负责链的研究、开发和运营，并推动社区的早期建设。
<!-- - 40%（即 40,000,000 个）分配给矿工。矿工挖矿获得，初始每个区块奖励 4 个 CRIA，每三年奖励减少 1/4。 -->


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
