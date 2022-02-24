import './App.css';
import { Grid } from 'gridjs-react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryPie } from 'victory';
import data from './data';

function App() {
  const graph1 = countShirtSizes(data);
  const graph2 = shirtSizeOfFordOwners(data);
  console.log(graph2);
  return (
    <div className="App">
      <h1>Data Table</h1>
      <div className='data-table'>
        <Grid
          data={data}
          search={true}
          pagination={{
            enabled: true,
            limit: 20,
          }}
        />
      </div>
      <h1>Fancy Graphs</h1>
      <div className='fancy-charts'>

        <div className='chart'>
          <h3>Shirt Size Counts</h3>
          <VictoryChart
            domainPadding={20}>
            <VictoryBar
              data={graph1}
              x='size'
              y='count' />
          </VictoryChart>
        </div>
        <div className='chart'>
          <VictoryPie
            data={graph2} />
        </div>
        <div className='chart'>
          <VictoryBar />
        </div>
        <div className='chart'>
          <VictoryBar />
        </div>
        <div className='chart'>
          <VictoryBar />
        </div>
        <div className='chart'>
          <VictoryBar />
        </div>
      </div>
    </div>
  );
}

function countShirtSizes(data) {
  // Count all the shirt sizes
  const shirtSizeCount = data.reduce((sizes, curr) => {
    sizes[curr.shirt_size] ? sizes[curr.shirt_size]++ : sizes[curr.shirt_size] = 1;
    return sizes;
  }, {});
  // Convert shirt size count into VictoryBar format of 
  // [ { size: 'M', count: 10 },
  //   { size: 'XL', count: 5 }, ...]
  const arr = [];
  const keys = Object.keys(shirtSizeCount);
  keys.map(key => {
    arr.push({ size: key, count: shirtSizeCount[key] });
  });
  return arr;
}

function shirtSizeOfFordOwners(data) {
  // Count all shirt sizes of Ford owners
  const fordSizes = data.reduce((sizes, curr) => {
    if (curr.car_make === 'Ford') {
      sizes[curr.shirt_size] ? sizes[curr.shirt_size]++ : sizes[curr.shirt_size] = 1;
    }
    return sizes;
  }, {});
  // Convert shirt size count into VictoryPie format of
  // [ { x: "S", y: 35 },
  //   { x: "M", y: 40 },
  //   { x: "L", y: 55 } ]
  const arr = [];
  const keys = Object.keys(fordSizes);
  keys.map(key => {
    arr.push({ x: key, y: fordSizes[key] });
  });
  return arr;
}

export default App;
