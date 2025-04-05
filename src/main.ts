import './style.css'
import * as d3 from 'd3';

const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 },
  { name: 'C', value: 30 },
  { name: 'D', value: 40 },
  { name: 'E', value: 25 }
];

// Set up chart dimensions
const width = 600;
const height = 400;
const margin = { top: 20, right: 20, bottom: 30, left: 40 };

// Create SVG container
const svg = d3.select('#app')
  .append('svg')
  .attr('width', width)
  .attr('height', height);

// Create scales
const x = d3.scaleBand()
  .domain(data.map(d => d.name))
  .range([margin.left, width - margin.right])
  .padding(0.1);

const y = d3.scaleLinear()
  .domain([0, d3.max(data, d => d.value) || 0])
  .nice()
  .range([height - margin.bottom, margin.top]);

// Add bars
svg.selectAll('rect')
  .data(data)
  .join('rect')
  .attr('x', d => x(d.name) || 0)
  .attr('y', d => y(d.value))
  .attr('width', x.bandwidth())
  .attr('height', d => y(0) - y(d.value))
  .attr('fill', 'steelblue');

// Add axes
svg.append('g')
  .attr('transform', `translate(0,${height - margin.bottom})`)
  .call(d3.axisBottom(x));

svg.append('g')
  .attr('transform', `translate(${margin.left},0)`)
  .call(d3.axisLeft(y));
