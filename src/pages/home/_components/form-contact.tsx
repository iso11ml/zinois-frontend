import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import toast from "react-hot-toast";

import { Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormFieldInput from "@/components/fields/form-field-input";
import { useAuth } from "@/providers/auth-provider";

const NEST_SERVER = import.meta.env.VITE_NEST_SERVER;

const formSchema = z.object({
    name: z.string().min(1, {
        message: "Este campo es requerido"
    }),
    lastName: z.string().min(1, {
        message: "Este campo es requerido"
    }),
    phone: z.string().min(1, {
        message: "Este campo es requerido"
    }),
    address: z.string().min(1, {
        message: "Este campo es requerido"
    }),
});

interface FormContactProps {
    onContactCreated: () => void; // Agrega esta prop
}

const FormContact = ({ onContactCreated }: FormContactProps) => {
    const { user, token } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            lastName: "",
            phone: "",
            address: ""
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);
        const userId = user?.id;
        const updatedValues = {
            userId,
            ...values,
        };

        try {
            const response = await fetch(`${NEST_SERVER}/contacts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedValues),
            });

            if (response.ok) {
                toast.success('Contacto creado');
                onContactCreated(); // Llama a la función para actualizar la lista
            } else {
                throw new Error(`${response.statusText}`);
            }
        } catch (error: any) {
            toast.error(error.message || 'An error has occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full bg-white p-4 rounded-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <FormFieldInput nameField={"name"} formControl={form.control} title={"Nombre"} />
                        <FormFieldInput nameField={"lastName"} formControl={form.control} title={"Apellido"} placeHolder={""} />
                        <FormFieldInput nameField={"phone"} formControl={form.control} title={"Teléfono"} placeHolder={""} />
                        <FormFieldInput nameField={"address"} formControl={form.control} title={"Dirección"} />
                    </div>

                    <div className="flex justify-end">
                        <Button
                            disabled={isLoading}
                            className={`bg-purple-800 hover:bg-purple-900 text-white ${isLoading ? 'opacity-50' : ''}`}
                            size="default"
                            type="submit"
                        >
                            {isLoading ? (
                                <div className="flex gap-2">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    <p>Please wait</p>
                                </div>
                            ) : (
                                <p>Crear</p>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default FormContact;
