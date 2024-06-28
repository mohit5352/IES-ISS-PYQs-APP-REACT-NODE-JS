// RepoApp.tsx
import React, { useState, useEffect } from 'react';
import Header from './Header';
import PaperList from './PaperList';
import SearchBar from './SearchBar';
import FilterOptions from './FilterOptions';
import LoadingSpinner from './LoadingSpinner';
import ErrorDisplay from './ErrorDisplay';
import { Paper, fetchPapers } from '../service/FetchPaperDetails';
// import PaperViewer from './PaperViewer';
import PdfViewer from './PdfViewer';

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

    // Call handleSearchAndFilter instead of handleSearch and handleFilter
    // in your SearchBar and FilterOptions components.

    // In SearchBar component
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
        setSelectedPaper(null); // Reset selected paper to null
        // setDownloaded(false); 
    };

    return (
        <div className="app">
            <Header />
            <div className="content">
                <div className="sidebar">
                {!selectedPaper && (
                        <>
                            <SearchBar onSearch={handleSearch} />
                            <FilterOptions papers={papers} onFilter={handleFilter} />
                        </>
                )}
                
                {selectedPaper && (
                                <button onClick={handleBackButtonClick}>Back</button>
                            )}
                </div>
                <div className="main">
                    {loading && <LoadingSpinner />}
                    {error && <ErrorDisplay error={error} />}
                    {!loading && !error && (
                        <>
                            {selectedPaper ? (
                                // <PaperViewer pdfUrl={selectedPaper?.downloadLink} />
                                <PdfViewer pdfUrl={selectedPaper?.downloadLink} downloaded={downloaded} setDownloaded={setDownloaded} />
                            ) : (
                                <>
                                <span className='paper-search-results-text'>{filteredPapers.length} Paper(s) found...</span>
                                <PaperList papers={filteredPapers} onPaperClick={handlePaperClick} />
                                </>
                            )}
                        </>
                    )}
                    {/* {!loading && !error && <PaperList papers={filteredPapers} onPaperClick={handlePaperClick} />} */}
                </div>
            </div>
        </div>
    );
};

export default RepoApp;
