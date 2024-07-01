import axios from 'axios';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../snackbar/Snackbar';

interface PaperDetailFormProps {
    onSubmit: (formData: FormData[]) => void;
}

interface FormData {
    year: Date | number | null;
    url: string;
    paperName: string;
}

const PaperDetailForm: React.FC<PaperDetailFormProps> = ({ onSubmit }) => {
    const subjects = ['General Studies', 'General English', 'Indian Economics', 'General Economics Paper 1', 'General Economics Paper 2', 'General Economics Paper 3', 'Statistics Paper 1', 'Statistics Paper 2', 'Statistics Paper 3', 'Statistics Paper 4'];
    const [formData, setFormData] = useState<{ year: Date | null; papers: { paperName: string; url: string }[] }>({
        year: null,
        papers: subjects.map(subject => ({ paperName: subject, url: '' }))
    });
    const [formVisible, setFormVisible] = useState(true);
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [successOrError, setSuccessOrError] = useState<'success' | 'error' | ''>('');
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, index: number) => {
        const { value } = e.target;
        const newPapers = [...formData.papers];
        newPapers[index].url = value;
        setFormData({ ...formData, papers: newPapers });
    };

    const handleDateChange = (date: Date | null) => {
        setFormData({ ...formData, year: date });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const submitPayload = formData.papers.map(obj => ({
            year: formData.year!.getFullYear(),
            url: obj.url,
            paperName: obj.paperName
        }));
        try {
            await axios.post('http://localhost:3001/api/paper-details/submit', submitPayload);
            onSubmit(submitPayload);
            resetForm();
            setShowSnackbar(true);
            setSuccessOrError('success');
            setSnackbarMessage('Paper details submitted successfully!');
        } catch (error: any) {
            console.error('Error submitting paper details:', error);
            setShowSnackbar(true);
            setSuccessOrError('error');
            setSnackbarMessage(error.response?.data?.error || 'Failed to submit paper details.');
        }
        setFormVisible(true);
    };

    const handleBackButtonClick = () => {
        navigate('/');
    };

    const resetForm = () => {
        setFormData({
            year: null,
            papers: subjects.map(subject => ({ paperName: subject, url: '' }))
        });
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
    };

    return (
        <div className='paper-detail-form-container'>
            <br />
            <div className="button-group">
                <button onClick={handleBackButtonClick} className="back-button global-btn">Back</button>
                <button onClick={resetForm} className="cancel-button global-btn">Cancel</button>
            </div>
            <h3>Add Paper(s)</h3>
            {formVisible && (
                <form onSubmit={handleSubmit} className="paper-form">
                    <div className="paper-form-container">
                        <div className="paper-form-group">
                            <label htmlFor="year">Year</label>
                            <DatePicker
                                selected={formData.year}
                                onChange={handleDateChange}
                                dateFormat="yyyy"
                                showYearPicker
                                name="year"
                                required
                                className="paper-form-control"
                                placeholderText='Please select year'
                            />
                        </div>
                    </div>
                    {formData.year && (
                        <div className="url-fields-container">
                            {formData.papers.map((obj, index) => (
                                <div key={index} className="url-field-group">
                                    <label htmlFor={`url-${index}`}>URL for {obj.paperName}</label>
                                    <input
                                        type="text"
                                        id={`url-${index}`}
                                        name={`url-${index}`}
                                        placeholder={`Please specify pdf link for ${obj.paperName}`}
                                        value={obj.url}
                                        onChange={e => handleChange(e, index)}
                                        required
                                        className="paper-form-control"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                    <button type="submit" className="submit-button global-btn">Submit</button>
                </form>
            )}
            {showSnackbar && <Snackbar message={snackbarMessage} onClose={handleCloseSnackbar} type={successOrError} />}
        </div>
    );
};

export default PaperDetailForm;
