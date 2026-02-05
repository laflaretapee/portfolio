import './App.css';
import Resume from './components/resume';
import Login from './pages/Login';

function App() {
  const hash =
    typeof window !== 'undefined' ? window.location.hash || '' : '';

  if (hash.startsWith('#/login')) {
    return <Login />;
  }

  return (
    <div className="App">
      <Resume />
    </div>
  );
}

export default App;
