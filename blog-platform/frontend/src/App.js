import logo from './logo.svg';
import './App.css';
import PostList from './components/PostList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
        <PostList />
      </header>
    </div>
  );
}

export default App;
