import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopMenu from './components/navbar/navbar';


import AppRouter from './components/router/router';


function App() {
  return (
    <div className="App" >      
        <TopMenu />
        <AppRouter />      
    </div>
  );
}

export default App;
