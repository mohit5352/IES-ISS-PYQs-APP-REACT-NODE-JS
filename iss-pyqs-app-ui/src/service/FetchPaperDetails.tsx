// fetchPaperUrls.ts
export interface Paper {
    year: number;
    subject: string;
    downloadLink: string;
}

export interface PaperDetailsResponse {
    paperDetails: PaperDetail[];
}

export interface PaperDetail {
    url: string;
    year: number;
    paperName: string;
}

export function fetchPapers(): Promise<Paper[]> {
    return fetchPapersData()
        .then((data: PaperDetail[]) => {
            const allPapersDetails = data.map(item => ({
                year: item.year,
                downloadLink: item.url,
                subject: item.paperName
            }))
            return allPapersDetails;
        })
        .catch((error) => {
            console.error('Error fetching papers:', error);
            return [];
        });
}

export const fetchPapersData = async (): Promise<PaperDetail[]> => {
    try {
        const response = await fetch('http://localhost:3001/api/paper-details');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: PaperDetailsResponse = await response.json();
        return data.paperDetails;
    } catch (error) {
        console.error('Error fetching paper details:', error);
        return [];
    }
};

export const fetchPaperDataByYearAndName = async (year: number, paperName: string): Promise<PaperDetail | {}> => {
    try {
        const response = await fetch(`http://localhost:3001/api/paper-detail/year=${year}&name=${paperName}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data: PaperDetail = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching paper details:', error);
        return {};
    }
};

export function fetchPaper(year: number, paperName: string): Promise<PaperDetail | {}> {
    return fetchPaperDataByYearAndName(year, paperName)
        .then((data: PaperDetail | {}) => {
            return data;
        })
        .catch((error) => {
            console.error('Error fetching papers:', error);
            return {};
        });
}

