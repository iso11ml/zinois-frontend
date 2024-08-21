"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import axios from "axios";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormFieldInput from "@/components/fields/form-field-input";

const formSchema = z.object({

    name: z.string().min(1, {
        message: "Es necesario que nos digas el nombre de tu empresa"
    }),
    password: z.string().min(1, {
        message: "Es necesario que crees una contraseña"
    }),
    email: z.string().min(1, {
        message: "Es necesario que crees registres email"
    }),
    firstName: z.string().min(1, {
        message: "Es necesario que escribas tu nombre"
    }),
    lastName: z.string().min(1, {
        message: "Es necesario que escribas tu apellido"
    }),
});


const SignIn= () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            firstName: "",
            lastName: "",
            password: "",
            email: "",

        },
    })

    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setIsLoading(true);

        axios.post(`${process.env.NEST_SERVER}/auth/register`, values)
            .then(() => {
                toast.success('Perfil creado');
            })
            .catch((error) => {
                const errorMessage = error.response?.data?.error || 'Algo ha ocurrido!';
                toast.error(errorMessage);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (

        <div className="flex flex-col gap-6">

            <Form {...form}>
                <form className="bg-white p-6 rounded-md" onSubmit={form.handleSubmit(onSubmit)}>

                    <div className="grid grid-cols-1 gap-6">
                        <FormFieldInput
                            nameField={'first_name'}
                            formControl={form.control}
                            title={'Nombre'}
                            placeHolder={""}
                        />
                        <FormFieldInput
                            nameField={'last_name'}
                            formControl={form.control}
                            title={'Apellido'}
                            placeHolder={""}
                            isPassword={false}
                        />
                        <FormFieldInput
                            nameField={'email'}
                            formControl={form.control}
                            title={'Email'}
                            placeHolder={""}
                            isPassword={false}
                        />
                        <FormFieldInput
                            nameField={'password'}
                            formControl={form.control}
                            title={'Contraseña'}
                            placeHolder={""}
                            isPassword={false}
                        />
                    </div>

                    <Button disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700 mt-4" type="submit">
                        Registrarte
                    </Button>

                </form>
            </Form>
        </div>
    );
};

export default SignIn;

