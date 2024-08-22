const NEST_SERVER = import.meta.env.VITE_NEST_SERVER;

import Modal from "@/components/modal";
import { useAuth } from "@/providers/auth-provider";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import FormContact from "./_components/form-contact";
import PresentationCard from "@/components/presentation-card";
import ContactCard from "./_components/contact-card";

interface DataType {
    id: string;
    name: string;
    lastName: string;
    phone: string;
    address: string;
}

const HomePage = () => {
    const { user, token } = useAuth();

    if (!user) return <Navigate to="/authentication" />;

    const [data, setData] = useState<DataType[] | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch(`${NEST_SERVER}/contacts`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Bad Request');
            }
            const result: DataType[] = await response.json();
            setData(result);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleContactCreated = () => {
        fetchData();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="container h-full">
            <section className="w-full h-full flex flex-col gap-6 p-6">
                <div className="flex justify-end items-center">
                    <Modal dialogTitle={"Nuevo contacto"} dialogDescription={""} dialogTrigger={"Crear contacto"}>
                        <FormContact onContactCreated={handleContactCreated} />
                    </Modal>
                </div>
                <div className="flex flex-col px-6 h-full sm:px-0 w-full">
                    {data?.length === 0 || data === null ? (
                        <div className="flex justify-center w-full mt-6">
                            <PresentationCard />
                        </div>
                    ) : (
                        <div className="grid grid-cols-3 gap-6">
                            {data.map((contact) => (
                                <ContactCard key={contact.id} contact={contact} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default HomePage;
