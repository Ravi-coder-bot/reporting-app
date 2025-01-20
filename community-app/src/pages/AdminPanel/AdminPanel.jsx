import { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminPanel.css';

function AdminPanel() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/reports/all');
                setReports(response.data);
            } catch (err) {
                alert('Failed to fetch reports');
            }
        };

        fetchReports();
    }, []);

    const updateStatus = async (id, status) => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/api/admin/update-status/${id}`, { status });
            alert(`Report ${status}`);
            setReports(reports.map((report) => (report._id === id ? { ...report, status } : report)));
        } catch (err) {
            alert('Failed to update status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-container">
            <h2 className="admin-title">Admin Panel</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Image</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reports.map((report) => (
                        <tr key={report._id}>
                            <td>{report.description}</td>
                            <td>
                                <img
                                    src={`http://localhost:5000/uploads/${report.image}`}
                                    alt="Report"
                                    className="report-image"
                                />
                            </td>
                            <td>
                                {report.location.latitude.toFixed(2)}, {report.location.longitude.toFixed(2)}
                            </td>
                            <td>{report.status || 'Pending'}</td>
                            <td>
                                {loading ? (
                                    <span>Loading...</span>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => updateStatus(report._id, 'approved')}
                                            className="btn-approve"
                                        >
                                            Approve
                                        </button>
                                        <button
                                            onClick={() => updateStatus(report._id, 'rejected')}
                                            className="btn-reject"
                                        >
                                            Reject
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPanel;
