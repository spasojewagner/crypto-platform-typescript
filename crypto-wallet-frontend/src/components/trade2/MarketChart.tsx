
import ReactApexChart from 'react-apexcharts'
import { ApexOptions } from 'apexcharts'
import { COLORS } from '../../utils/constants'
import moment from 'moment'
import { customChartTooltip } from '../../utils/helpers'

type Props = {
  series: number[][]
}
const options: ApexOptions = {
  chart: {
    toolbar: {
      show: false,
    },
    type: 'line',
    zoom: {
      enabled: false,
    },
  },
  stroke: {
    curve: 'smooth',
    width: 3,
    lineCap: 'round',
    colors: [COLORS.primary],
  },
  grid: {
    show: false,
  },
  yaxis: {
    labels: {
      offsetX: -10,
      style: { colors: '#777' },
      formatter: (value) => '$' + value.toLocaleString(),
    },
  },
  tooltip: {
    custom: ({ seriesIndex, dataPointIndex, w }) => {
      let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
      return customChartTooltip(data[1], 4)
    },
  },
  xaxis: {
    type: 'numeric',
    axisTicks: { color: '#777' },
    axisBorder: { color: '#777' },
    labels: {
      style: { colors: '#777' },
      formatter: (value) => moment(value).format('YYYY/MM/DD h:mm'),
    },
  },
}

function MarketChart({ series }: Props) {
  return (
    <ReactApexChart
      height={450}
      options={options}
      series={[
        {
          data: series,
        },
      ]}
    />
  )
}

export default MarketChart

// import ReactApexChart from 'react-apexcharts'
// import { ApexOptions } from 'apexcharts'
// import { COLORS } from '../../utils/constants'
// import moment from 'moment'
// import { customChartTooltip } from '../../utils/helpers'

// type Props = {
//   series: number[][]
// }

// function MarketChart({ series }: Props) {
//   // Cast the options to avoid TypeScript errors
//   const options: ApexOptions = {
//     chart: {
//       toolbar: {
//         show: false,
//       },
//       type: 'line',
//       zoom: {
//         enabled: false,
//       },
//       animations: {
//         enabled: true,
//         dynamicAnimation: {
//           speed: 500, // Brzina animacije za real-time podatke
//         },
//       },
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 3,
//       lineCap: 'round',
//       colors: [COLORS.primary],
//     },
//     grid: {
//       show: false,
//     },
//     yaxis: {
//       labels: {
//         offsetX: -10,
//         style: { colors: '#777' },
//         formatter: (value) => '$' + value.toLocaleString(),
//       },
//     },
//     tooltip: {
//       custom: ({ seriesIndex, dataPointIndex, w }) => {
//         let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex]
//         return customChartTooltip(data[1], 4)
//       },
//     },
//     xaxis: {
//       type: 'numeric',
//       axisTicks: { color: '#777' },
//       axisBorder: { color: '#777' },
//       labels: {
//         style: { colors: '#777' },
//         formatter: (value) => moment(value).format('HH:mm:ss'),
//       },
//     },
//   }

//   const chartOptions = options as any;
//   chartOptions.chart.animations.easing = 'linear';

//   return (
//     <ReactApexChart
//       height={450}
//       options={chartOptions}
//       series={[
//         {
//           data: series,
//         },
//       ]}
//     />
//   )
// }

// export default MarketChart

// import { ApexOptions } from 'apexcharts';
// import { COLORS } from '../../utils/constants';
// import moment from 'moment';
// import { customChartTooltip } from '../../utils/helpers';

// type Props = {
//   series: number[][];
// };

// function MarketChart({ series }: Props) {
//   const options: ApexOptions = {
//     chart: {
//       toolbar: {
//         show: false,
//       },
//       type: 'line',
//       zoom: {
//         enabled: false,
//       },
//       animations: {
//         enabled: true,
//         easing: 'linear',
//         dynamicAnimation: {
//           speed: 500, // Brzina animacije za real-time podatke
//         },
//       },
//     },
//     stroke: {
//       curve: 'smooth',
//       width: 3,
//       lineCap: 'round',
//       colors: [COLORS.primary],
//     },
//     grid: {
//       show: false,
//     },
//     yaxis: {
//       labels: {
//         offsetX: -10,
//         style: { colors: '#777' },
//         formatter: (value) => '$' + value.toLocaleString(),
//       },
//     },
//     tooltip: {
//       custom: ({ seriesIndex, dataPointIndex, w }) => {
//         let data = w.globals.initialSeries[seriesIndex].data[dataPointIndex];
//         return customChartTooltip(data[1], 4);
//       },
//     },
//     xaxis: {
//       type: 'numeric',
//       axisTicks: { color: '#777' },
//       axisBorder: { color: '#777' },
//       labels: {
//         style: { colors: '#777' },
//         formatter: (value) => moment(value).format('YYYY/MM/DD HH:mm'),
//       },
//     },
//   };

//   return (
//     <ReactApexChart
//       height={450}
//       options={options}
//       series={[
//         {
//           data: series,
//         },
//       ]}
//     />
//   );
// }

// export default MarketChart;