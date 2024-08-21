import Card from "@/components/card";
import { useAuth } from "@/providers/auth-provider";
import { Navigate } from "react-router-dom";


const HomePage = () => {
    const { user } = useAuth();

    if (!user) return <Navigate to="/authentication" />;
    
    return (
        <section className=" w-full h-full flex flex-col sm:flex-row bg-gray-100">
            <div className="my-auto flex flex-col justify-center items-center space-y-4 px-6 h-full sm:px-0 w-full">
                <Card />
            </div>
        </section>
    )
} 
export default HomePage;