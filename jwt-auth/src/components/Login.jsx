import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(credentials);
        } catch (err) {
            setError(err.response?.data?.error || 'Error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Iniciar sesión</h2>
                
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="email"
                            value={credentials.email}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                email: e.target.value
                            })}
                            placeholder="Email"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={credentials.password}
                            onChange={(e) => setCredentials({
                                ...credentials,
                                password: e.target.value
                            })}
                            placeholder="Contraseña"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <p className="text-center mt-4">
                    ¿No tienes cuenta?{' '}
                    <Link to="/register" className="text-blue-500 hover:text-blue-600">
                        Regístrate
                    </Link>
                </p>
            </div>
        </div>
    );
};
