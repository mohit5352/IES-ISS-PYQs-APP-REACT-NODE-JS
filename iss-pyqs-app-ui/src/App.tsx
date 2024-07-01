import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import RepoApp from './components/RepoApp';
import PaperDetailForm from './components/PaperDetailForm';
import Header from './components/Header';

function App() {

  // return (
  //   <>
  //     <div>
  //       <RepoApp />
  //     </div>

  //   </>
  // )

  return (
    <Router>
      <div>
      <Header />
        <Routes>
          <Route path="/" element={<RepoApp />} />
          <Route path="/add" element={<PaperDetailForm onSubmit={() => { }} />} />
        </Routes>
      </div>
    </Router>
  );

}

export default App
