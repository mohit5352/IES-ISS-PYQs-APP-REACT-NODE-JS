// RepoApp.tsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import PaperList from './PaperList';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import LoadingSpinner from './LoadingSpinner';
import { Paper, fetchPapers } from '../service/FetchPaperDetails';
import PdfViewer from './PdfViewer';
import { Link } from 'react-router-dom';

const RepoApp: React.FC = () => {
    const [papers, setPapers] = useState([] as Paper[]);
    const [filteredPapers, setFilteredPapers] = useState([] as Paper[]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState(""); // Add state for search query
    const [selectedYear, setSelectedYear] = useState<number | null>(null); // Add state for selected year
    const [selectedPaper, setSelectedPaper] = useState<Paper | null>(null); // State to track the selected paper
    const [downloaded, setDownloaded] = useState(false);

    useEffect(() => {
        setFilteredPapers(papers); // Update filtered papers whenever papers change
    }, [papers]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const fetchedPapers = await fetchPapers();
                setPapers(fetchedPapers);
                setFilteredPapers(fetchedPapers);
            } catch (error) {
                setError('Error fetching papers. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleSearchAndFilter = (query: string, selectedYear: number | null) => {
        setLoading(true);
        setError(null);

        let filteredResults = papers;

        // Apply search filter
        if (query) {
            filteredResults = filteredResults.filter((paper) => {
                return (
                    paper.year.toString().includes(query) ||
                    paper.subject.toLowerCase().includes(query.toLowerCase())
                );
            });
        }

        // Apply year filter
        if (selectedYear !== null && selectedYear !== 0) {
            filteredResults = filteredResults.filter((paper) => paper.year === selectedYear);
        }

        setFilteredPapers(filteredResults);
        setLoading(false);
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query); // Update search query state
        handleSearchAndFilter(query, selectedYear); // Pass the selectedYear from state
    };

    const handleFilter = (year: number | null) => {
        setSelectedYear(year); // Update selected year state
        handleSearchAndFilter(searchQuery, year); // Pass the searchQuery from state
    };

    const handlePaperClick = (paper: any) => {
        setSelectedPaper(paper); // Set the selected paper when clicked
        setDownloaded(false);
    };

    const handleBackButtonClick = () => {
        setSelectedPaper(null);
    };

    return (
        <div className="app">
            {!selectedPaper && (
                <div className="right-align-container">
                    <Link to="/add">
                        <button className="add-paper-button global-btn">Add New Paper(s)</button>
                    </Link>
                </div>
            )}
            <div className="content">
                {!selectedPaper && (
                    <>
                        <div className="sidebar">
                            <SearchBar onSearch={handleSearch} />
                            <FilterOptions papers={papers} onFilter={handleFilter} />
                        </div>
                    </>

                )}

                {selectedPaper && (
                    <>
                        <br />
                        <div className="sidebar">
                            <button className="back-button global-btn" onClick={handleBackButtonClick}>Back</button>
                            <Link to="/add">
                                <button className="add-paper-button global-btn">Add New Paper</button>
                            </Link>
                        </div>
                    </>
                )}
                <div className="main">
                    {loading && <LoadingSpinner />}
                    {!loading && !error && (
                        <>
                            {selectedPaper ? (
                                <PdfViewer pdfUrl={selectedPaper?.downloadLink} downloaded={downloaded} setDownloaded={setDownloaded} paperName={selectedPaper?.subject} />
                            ) : (
                                <>
                                    <span className='paper-search-results-text'>{filteredPapers.length} Paper Results</span>
                                    <PaperList papers={filteredPapers} onPaperClick={handlePaperClick} />
                                </>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RepoApp;
