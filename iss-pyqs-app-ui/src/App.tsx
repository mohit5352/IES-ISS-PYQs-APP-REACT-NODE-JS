import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import RepoApp from './components/RepoApp';
import AddPapersDetailForm from './components/AddPapersDetailForm';
import Header from './components/Header';
import EditPaperDetailForm from './components/EditPaperDetailForm';
// import { Paper } from './service/FetchPaperDetails';
import { useState } from 'react';

function App() {
  const [selectedPaper, setSelectedPaper] = useState<any | null>(null);

  const handleEditButtonClick = (paper: any) => {
      setSelectedPaper(paper);
      console.log("edit--paper", paper)
  };

  return (
    <Router>
      <div>
      <Header />
        <Routes>
          <Route path="/" element={<RepoApp onEditButtonClick={handleEditButtonClick} />} />
          <Route path="/add" element={<AddPapersDetailForm onSubmit={() => { }} />} />
          <Route path="/edit" element={<EditPaperDetailForm paperData = {{paperName: selectedPaper?.subject, url: selectedPaper?.downloadLink, year: new Date(selectedPaper?.year, 0, 1)}} onUpdate={() => { }} />} />
          {/* <Route path="/edit" element={<AddPapersDetailForm addMode={false} paperData={{
                                        paperName: selectedPaper?.subject,
                                        year: selectedPaper?.year,
                                        url: selectedPaper?.downloadLink
                                    }} onUpdate={() => { }} onSubmit={() => { }} />} /> */}
        </Routes>
      </div>
    </Router>
  );

}

export default App
