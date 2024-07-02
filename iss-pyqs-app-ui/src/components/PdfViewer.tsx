import React, { useState } from 'react';

interface Props {
    pdfUrl: string;
    downloaded: boolean; // Add downloaded prop
    setDownloaded: (downloaded: boolean) => void; // Correct setDownloaded prop type
    paperName: string;
}

const PdfViewer: React.FC<Props> = ({ pdfUrl, downloaded, setDownloaded, paperName }) => {
    const [pdfUrlA, setPdfUrl] = useState<string | null>(pdfUrl);

    const downloadPdf = async () => {
        try {
            const response = await fetch(pdfUrl);
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
            console.log(url, downloaded)
            setDownloaded(true); // Update downloaded state
        } catch (error) {
            console.error('Error downloading PDF:', error);
            setDownloaded(false); // Update downloaded state
        }
    };

    const closePdf = () => {
        setDownloaded(false);
    }

    return (
        <div className="pdf-viewer">
            {!downloaded && <button className='view-pdf-button' onClick={downloadPdf}>View Paper PDF</button>}
            {downloaded && (
                <>
                    <div className='button-group'>
                        <h4>Scroll down to view {paperName.includes('Paper') ? paperName : `${paperName} paper`}
                        </h4>
                        <button className='close-pdf-button global-btn' onClick={closePdf}>Close PDF</button>
                    </div>
                </>
            )}
            {pdfUrlA && downloaded && (
                <embed
                    src={pdfUrlA}
                    type="application/pdf"
                    width="100%"
                    height="600px"
                />
            )}
        </div>
    );
};

export default PdfViewer;
