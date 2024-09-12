import { useAuth } from "@/context/AuthContext";
import { Sidebar } from "./sidebar";
import { Navigate } from 'react-router-dom';

export default function PrivateLayout({ children }) {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;

    if (!user) return <Navigate to="/" />;

    return (
        <div className="flex h-screen bg-background">
            <Sidebar />
            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>
        </div>
    )
}