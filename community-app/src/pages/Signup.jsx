import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/users/signup', {
                name,
                email,
                password,
            });
            alert(response.data.message);
            navigate('/');
        } catch (err) {
            alert(err.response?.data?.error || 'Something went wrong!');
        }
    };

    return (
        <div className="w-full max-w-md bg-white p-6 rounded shadow">
            <h2 className="text-2xl font-bold mb-6">Sign Up</h2>
            <form onSubmit={handleSignup}>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Sign Up
                </button>
                <p className="text-sm text-center mt-4">
                    Already have an account?{' '}
                    <span
                        onClick={() => navigate('/')}
                        className="text-blue-500 cursor-pointer"
                    >
                        Login
                    </span>
                </p>
            </form>
        </div>
    );
}

export default Signup;
