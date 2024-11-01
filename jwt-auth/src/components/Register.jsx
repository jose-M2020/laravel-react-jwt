import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

export const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    });
    const [error, setError] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(userData);
        } catch (err) {
            setError(err.response?.data?.error || 'Error');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-6 bg-white rounded shadow-md">
                <h2 className="text-2xl font-bold text-center">Registro</h2>
                
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            value={userData.name}
                            onChange={(e) => setUserData({
                                ...userData,
                                name: e.target.value
                            })}
                            placeholder="Nombre"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            value={userData.email}
                            onChange={(e) => setUserData({
                                ...userData,
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
                            value={userData.password}
                            onChange={(e) => setUserData({
                                ...userData,
                                password: e.target.value
                            })}
                            placeholder="Contraseña"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={userData.password_confirmation}
                            onChange={(e) => setUserData({
                                ...userData,
                                password_confirmation: e.target.value
                            })}
                            placeholder="Confirmar contraseña"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    >
                        Registrarse
                    </button>
                </form>

                <p className="text-center mt-4">
                    ¿Ya tienes cuenta?{' '}
                    <Link to="/login" className="text-blue-500 hover:text-blue-600">
                        Inicia sesión
                    </Link>
                </p>
            </div>
        </div>
    );
};
