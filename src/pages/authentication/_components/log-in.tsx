"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormFieldInput from "@/components/fields/form-field-input";
import { useAuth } from "@/providers/auth-provider";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";



const formSchema = z.object({

    password: z.string().min(1, {
        message: "Escribe tu contraseña"
    }),
    email: z.string().min(1, {
        message: "Escribe tu correo electrónico"
    }),
});

const Login = () => {

    const { signIn, user } = useAuth();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            password: "",
            email: "",

        },
    })

    const navigate = useNavigate();

    useEffect(() => {
        if (user?.email) {
            navigate('/');
        }
    }, [user, navigate])


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const { email, password } = values;
        const LoginTypeUser = {
            email,
            password
        }
        signIn(LoginTypeUser)
            .then(() => {
                toast.success('Sesión iniciada con éxito');
                navigate("/");

            })
            .catch((error) => {
                toast.error('Error al iniciar sesión: ' + error.message);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };


    return (
        <Form {...form}>
            <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>

                <FormFieldInput
                    nameField={'email'}
                    formControl={form.control}
                    title={'Email'}
                    placeHolder={"Ejemplo: test@gmail.com"}
                />

                <FormFieldInput
                    nameField={'password'}
                    formControl={form.control}
                    title={'Contraseña'}
                    placeHolder={""}
                    isPassword={true}
                />

                <div>
                    <Button disabled={isLoading} className="w-full bg-green-600 hover:bg-green-700" type="submit">
                        Iniciar Sesión
                    </Button>
                </div>

            </form>
        </Form>
    )
}

export default Login;