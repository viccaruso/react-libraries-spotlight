import './App.css';
import { Grid } from 'gridjs-react';
import { VictoryBar, VictoryChart, VictoryLine, VictoryPie, VictoryAxis } from 'victory';
import data from './data';

function App() {
  const graph1 = countShirtSizes(data);
  const graph2 = shirtSizeOfFordOwners(data);
  const graph3 = averageAgeInPurchaseYear(data);

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
          <h3>Total of Each Shirt Size</h3>
          <VictoryChart
            domainPadding={20}>
            <VictoryBar
              data={graph1}
              x='size'
              y='count' />
          </VictoryChart>
        </div>
        <div className='chart'>
          <h3>Shirt Sizes of Ford Owners</h3>
          <VictoryPie
            data={graph2} />
        </div>
        <div className='chart linegraph'>
          <h3>Average Age of Car Buyers From 1990 - 2021</h3>
          <VictoryChart
            domainPadding={20}>
            <VictoryAxis
              style={{
                tickLabels: { fontSize: 10, angle: 90, verticalAnchor: 'bottom' }
              }}
            />
            <VictoryAxis
              dependentAxis
            />
            <VictoryLine
              data={graph3} />
          </VictoryChart>
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

function averageAgeInPurchaseYear(data) {

  // Create an object to hold kv pairs of { year: [age, age, age...], year: [age, age, age...], ... }
  const yearsWithAges = {};
  data.map((item) => {
    // If a key already exists for the purchase_year of item
    if (yearsWithAges[item.purchase_year]) {
      // Push the current item.age into the array 
      yearsWithAges[item.purchase_year].push(item.age);
    } else {
      // Otherwise create a key from the item.purchase_year and set it's value an array containing item.age
      yearsWithAges[item.purchase_year] = [item.age];
    }
  });

  // Now convert the data to a format compatible with the VictoryLine component
  // ex... [
  //        { x: 1995, y: 25 },
  //        { x: 1996, y: 65 }, ... etc
  //       ]

  const victoryArr = [];
  const years = Object.keys(yearsWithAges);
  years.map((year) => {
    const average = yearsWithAges[year].reduce((sum, curr) => { return sum += curr; }, 0) / yearsWithAges[year].length;
    victoryArr.push({
      x: year,
      y: average
    });
  });

  return victoryArr;
}
export default App;
