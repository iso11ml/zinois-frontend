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
import { POST, PATCH } from "../services/contact-service";
import { Contact } from "@/interfaces/contac-interfaces";


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

interface Props {
    handleContact: () => void;
    contact?: Contact
}

const FormContact = ({ handleContact, contact }: Props) => {
    const { user, token } = useAuth();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: contact?.name ?  contact?.name : "",
            lastName: contact?.lastName ? contact?.lastName :  "",
            phone: contact?.phone ? contact?.phone :  "",
            address: contact?.address ? contact?.address : ""
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        const userId = user?.id

        const data = {
            userId,
            ...values,
        };

        try {
            await (contact?.id
                ? PATCH(data, handleContact, token, contact.id)
                : POST(data, handleContact, token)
            );
        } catch (error) {
            toast.error('Error al enviar el formulario');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col w-full bg-white p-4 rounded-md">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <FormFieldInput
                            nameField={"name"}
                            formControl={form.control}
                            title={"Nombre"}
                        />

                        <FormFieldInput
                            nameField={"lastName"}
                            formControl={form.control}
                            title={"Apellido"}
                            placeHolder={""}
                        />

                        <FormFieldInput
                            nameField={"phone"}
                            formControl={form.control}
                            title={"Teléfono"}
                            placeHolder={""}
                        />

                        <FormFieldInput
                            nameField={"address"}
                            formControl={form.control}
                            title={"Dirección"}
                        />

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
