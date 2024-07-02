import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from 'react-router-dom';

interface EditPaperDetailFormProps {
    paperData: FormData;
    onUpdate: (updatedPaper: { paperName: string, year: number, url: string }) => void;
}

export interface FormData {
    year: Date | null;
    url: string;
    paperName: string;
}

const EditPaperDetailForm: React.FC<EditPaperDetailFormProps> = ({ paperData, onUpdate }) => {
    const [formData, setFormData] = useState(paperData);
    const navigate = useNavigate();

    useEffect(() => {
        setFormData(paperData); // Initialize form data with initial values
    }, [paperData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleDateChange = (date: Date | null) => {
        setFormData({ ...formData, year: date });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const updatePayload = {
                paperName: formData.paperName,
                year: formData.year ? formData.year.getFullYear() : 0,  // Extract the year as a number
                url: formData.url
            };
            await axios.put(`http://localhost:3001/api/paper-detail/update/${paperData.year?.getFullYear()}/${encodeURIComponent(paperData.paperName)}`, updatePayload);
            onUpdate(updatePayload);
        } catch (error) {
            console.error('Error updating paper details:', error);
            // Handle error, show an error message to the user
        }
    };

    const handleBackButtonClick = () => {
        navigate('/');
    };

    const resetForm = () => {
        setFormData({ ...paperData });
    };

    return (
        <div className='paper-detail-form-container'>
            <br />
            <div className="button-group">
                <button onClick={handleBackButtonClick} className="back-button global-btn">Back</button>
                {/* <button onClick={resetForm} className="cancel-button global-btn">Cancel</button> */}
            </div>
            <h3>Edit Paper Details</h3>
            <form onSubmit={handleSubmit} className='paper-form'>
                <div className="paper-form-container">
                    <div className="paper-form-group">
                        <label htmlFor="paperName">Paper Name</label>
                        <input
                            type="text"
                            id="paperName"
                            name="paperName"
                            value={formData.paperName}
                            onChange={handleChange}
                            required
                            className="paper-form-control"
                        />
                    </div>
                    <div className="paper-form-group">
                        <label htmlFor="url">URL</label>
                        <input
                            type="text"
                            id="url"
                            name="url"
                            value={formData.url}
                            onChange={handleChange}
                            required
                            className="paper-form-control"

                        />
                    </div>
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
                        />
                    </div>
                </div>
                <div className="button-group">
                    <button type="button" className="cancel-button global-btn" onClick={resetForm}>Cancel</button>
                    <button type="submit" className="submit-button global-btn">Update</button>
                </div>
            </form>
        </div>
    );
};

export default EditPaperDetailForm;
