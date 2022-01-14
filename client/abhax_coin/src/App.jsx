import { NavBar , Welcome, Footer ,Services, Transactions } from './components';

const App = () => {
  return (
  <div className="min-h-screen">
    <div className="gradient-bg-welcome">
      <NavBar />
      <Welcome />
    </div>    
  </div>
  );
}

export default App
