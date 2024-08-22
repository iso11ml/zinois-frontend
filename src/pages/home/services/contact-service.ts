const NEST_SERVER = import.meta.env.VITE_NEST_SERVER;

import { CreateContact } from '@/interfaces/contac-interfaces';
import toast from 'react-hot-toast';


export const POST = async (data: CreateContact, onContactCreated: () => void, token: string) => {

    const values = { ...data };

    try {
        const response = await fetch(`${NEST_SERVER}/contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) toast.error('Error al crear un contacto');

        toast.success('Contacto creado');

        onContactCreated();

    } catch (error: any) {
        toast.error(error.message || 'An error has occurred');
    }
};

export const PATCH = async (data: CreateContact, onContactCreated: () => void, token: string, contactId: string) => {

    const values = { ...data };

    console.log(`${NEST_SERVER}/contacts/${contactId}`)

    try {
        const response = await fetch(`${NEST_SERVER}/contacts/${contactId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(values),
        });


        if (!response.ok) return toast.error('Error al actulizar el contacto');

        toast.success('Contacto actualizado');

        onContactCreated();

    } catch (error: any) {
        toast.error(error.message || 'An error has occurred');
    }
};

export const DELETE = async (token: string, contactId: string) => {

    try {
        const response = await fetch(`${NEST_SERVER}/contacts/${contactId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) return toast.error('Error al eliminar el contacto');

        toast.success('Contacto eliminado');

    } catch (error: any) {
        toast.error(error.message || 'An error has occurred');
    }
};
