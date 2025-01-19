import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './ReportSubmission.css';

function ReportSubmission() {
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [location, setLocation] = useState({ lat: 28.7041, lng: 77.1025 }); // Default: Delhi

    // Dropzone for file uploads
    const { getRootProps, getInputProps } = useDropzone({
        accept: 'image/*',
        maxFiles: 1,
        onDrop: (acceptedFiles) => setImage(acceptedFiles[0]),
    });

    // Custom Map Click Handler
    const LocationMarker = () => {
        useMapEvents({
            click(e) {
                setLocation(e.latlng);
            },
        });

        return location ? <Marker position={location} /> : null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('description', description);
        formData.append('image', image);
        formData.append('latitude', location.lat);
        formData.append('longitude', location.lng);

        try {
            const response = await axios.post('http://localhost:5000/api/reports/submit', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert(response.data.message);
            setDescription('');
            setImage(null);
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to submit report');
        }
    };

    return (
        <div className="report-container">
            <h2 className="report-title">Submit a Report</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="form-input"
                        rows="4"
                        placeholder="Enter a brief description of the report..."
                        required
                    />
                </div>
                <div className="form-group">
                    <label className="form-label">Upload Image</label>
                    <div
                        {...getRootProps({
                            className: 'dropzone',
                        })}
                    >
                        <input {...getInputProps()} />
                        {image ? (
                            <p className="text">{image.name}</p>
                        ) : (
                            <p className="text">Drag & drop an image, or click to select</p>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label">Select Location</label>
                    <MapContainer
                        center={[location.lat, location.lng]}
                        zoom={13}
                        style={{ height: '300px', width: '100%' }}
                    >
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution="&copy; OpenStreetMap contributors"
                        />
                        <LocationMarker />
                    </MapContainer>
                </div>
                <button
                    type="submit"
                    className="submit-button"
                >
                    Submit Report
                </button>
            </form>
        </div>
    );
}

export default ReportSubmission;
