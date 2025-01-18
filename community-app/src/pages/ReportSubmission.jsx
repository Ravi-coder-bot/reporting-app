import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

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
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Submit a Report</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        rows="4"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Upload Image</label>
                    <div
                        {...getRootProps({
                            className:
                                'border-dashed border-2 border-gray-300 p-4 rounded text-center cursor-pointer',
                        })}
                    >
                        <input {...getInputProps()} />
                        {image ? (
                            <p>{image.name}</p>
                        ) : (
                            <p>Drag & drop an image, or click to select</p>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Select Location</label>
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
                    className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                >
                    Submit Report
                </button>
            </form>
        </div>
    );
}

export default ReportSubmission;
