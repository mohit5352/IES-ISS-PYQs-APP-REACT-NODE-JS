// import React, { useState } from 'react';


// interface Props {
//     pdfUrl: string;
// }
// let downloaded: boolean;
// const PdfViewer: React.FC<Props> = ({pdfUrl}) => {
//     const [pdfUrlA, setPdfUrl] = useState<string | null>(pdfUrl);

//     const downloadPdf = async () => {
//         try {
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const url = URL.createObjectURL(blob);
//             setPdfUrl(url);
//             downloaded = true;
//         } catch (error) {
//             console.error('Error downloading PDF:', error);
//             downloaded = false;
//         }
//     };

//     return (
//         <div className="pdf-viewer">
//             {!downloaded && <button className='download-pdf-button' onClick={downloadPdf}>Download PDF</button>}
//             {pdfUrlA  && downloaded && (
//                 <embed
//                     src={pdfUrlA}
//                     type="application/pdf"
//                     width="100%"
//                     height="600px"
//                 />
//             )}
//         </div>
//     );
// };

// export default PdfViewer;


// import React, { useState } from 'react';

// interface Props {
//     pdfUrl: string;
//     downloaded: boolean; // Add downloaded prop
//     setDownloaded: (downloaded: boolean) => boolean; // Add setDownloaded prop
// }

// const PdfViewer: React.FC<Props> = ({ pdfUrl, downloaded, setDownloaded }) => {
//     const [pdfUrlA, setPdfUrl] = useState<string | null>(pdfUrl);

//     const downloadPdf = async () => {
//         try {
//             const response = await fetch(pdfUrl);
//             const blob = await response.blob();
//             const url = URL.createObjectURL(blob);
//             setPdfUrl(url);
//             console.log(url, downloaded)
//             setDownloaded(true); // Update downloaded state
//         } catch (error) {
//             console.error('Error downloading PDF:', error);
//             setDownloaded(false); // Update downloaded state
//         }
//     };

//     return (
//         <div className="pdf-viewer">
//             {downloaded| JSON}
//             {!downloaded && <button className='download-pdf-button' onClick={downloadPdf}>Download PDF</button>}
//             {pdfUrlA && downloaded && (
//                 <embed
//                     src={pdfUrlA}
//                     type="application/pdf"
//                     width="100%"
//                     height="600px"
//                 />
//             )}
//         </div>
//     );
// };

// export default PdfViewer;


import React, { useState } from 'react';

interface Props {
    pdfUrl: string;
    downloaded: boolean; // Add downloaded prop
    setDownloaded: (downloaded: boolean) => void; // Correct setDownloaded prop type
}

const PdfViewer: React.FC<Props> = ({ pdfUrl, downloaded, setDownloaded }) => {
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

    return (
        <div className="pdf-viewer">
            {!downloaded && <button className='view-pdf-button' onClick={downloadPdf}>View PDF</button>}
            {downloaded && <span>Scroll down to view paper</span>}
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
