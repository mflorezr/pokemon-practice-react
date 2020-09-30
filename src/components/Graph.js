import React, { useRef, useEffect} from 'react'
import { connect } from 'react-redux'
import Chart from 'chart.js';
import '../styles/main.css'
import '../styles/modal.css';

const Graph = (props) => {
  const graphRef = useRef()

  useEffect(() => {
    let stats = 0
    const ctx = graphRef.current.getContext('2d');
    if (props.comparison.length === 2) {
      stats = props.comparison.map(pokemon => (
        pokemon.stats
      ))
      createGraph(ctx, stats)
    } else {
      if (props.currentPokemon !== 0) {
        stats = [props.currentPokemon.stats]
        createGraph(ctx, stats)
      }
    }
  }, [props.currentPokemon, props.comparison]);

  const createGraph = (ctx, stats) => {
    if (stats.length === 1) {
      Chart.helpers.each(Chart.instances, function (instance) {
        if (instance.chart.canvas.id === 'chart-mixed') {
          instance.chart.destroy()
        }
      })
    }
    const labels = stats[0].map((stat) => (
      stat.stat.name
    ))
    const colors = ['#167a69', '#26b19c'];
    const colorsLength = colors.length;
    const datasets = stats.map((stat, index) => ({
      data: stat.map(stat => (
        stat.base_stat
      )),
      backgroundColor: colors[index % colorsLength]
    }))
    new Chart(ctx, {
      type: 'bar',
      responsive: true,
      data: {
        datasets: datasets,
        labels: labels
      },
      options: {
        legend: {
          display: false
        },
        title: {
          display: true,
          text: 'Stats',
          fontSize: 17
        },
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: 25,
              padding: 5,
            },
            gridLines: {
              display: true,
              drawOnChartArea: false,
              color: 'rgb(0, 0, 0)',
              tickMarkLength: 3
            },
          }],
          xAxes: [{
            ticks: {
              padding: 5
            },
            gridLines: {
              display: true,
              drawOnChartArea: false,
              color: 'rgb(0, 0, 0)',
              offsetGridLines: false,
              tickMarkLength: 5
            },
          }]
        }
      }
    })
  }

  return(
    <div className='modal-chart-mixed' >
      <canvas id='chart-mixed' ref={graphRef} ></canvas>
    </div>
    )
}

export default connect((state) => {
  return state
})(Graph)