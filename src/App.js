import './App.css';
import { Grid } from 'gridjs-react';
import data from './data';

function App() {
  return (
    <div className="App">
      <Grid
        data={data}
        search={true}
        pagination={{
          enabled: true,
          limit: 20,
        }}
      />
    </div>
  );
}

export default App;
