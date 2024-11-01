import { useAuth } from '../contexts/AuthContext';

export const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <button
                        onClick={logout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </nav>
            
            <main className="max-w-7xl mx-auto px-4 py-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <h2 className="text-2xl font-bold mb-4">Bienvenido, {user.name}</h2>
                    <div className="space-y-2">
                        <p><strong>Email:</strong> {user.email}</p>
                        <p><strong>Miembro desde:</strong> {new Date(user.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            </main>
        </div>
    );
};