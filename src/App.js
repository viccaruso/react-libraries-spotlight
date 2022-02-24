import './App.css';
import { Grid } from 'gridjs-react';
import data from './data';

function App() {
  return (
    <div className="App">
      <div className='data-table'>
        <h1>Data Table</h1>
        <Grid
          data={data}
          search={true}
          pagination={{
            enabled: true,
            limit: 20,
          }}
        />
      </div>
      <div className='fancy-graphs'>
        <h1>Fancy Graphs</h1>
      </div>
    </div>
  );
}

export default App;
