"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import FormFieldInput from "@/components/fields/form-field-input";


const formSchema = z.object({

    password: z.string().min(1, {
        message: "Escribe tu contraseña"
    }),
    email: z.string().min(1, {
        message: "Escribe tu correo electrónico"
    }),
});

const Login = () => {

    const [isLoading, setIsLoading] = useState(false); 

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

            password: "",
            email: "",

        },
    })

    // useEffect(() => {
    //     if (session?.status == 'authenticated') {
    //         router.push('/administrator');
    //     }
    // }, [session?.status, router]);


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        setIsLoading(false)

        // signIn('credentials', {
        //     ...values,
        //     redirect: false
        // })
        //     .then((callback) => {
        //         if (callback?.error) {
        //             toast.error('Credenciales inválidas');
        //         }

        //         if (callback?.ok && !callback?.error) {
        //             toast.success('Sesion iniciada');
        //             router.push('/')
        //         }
        //     })
        //     .finally(() => setIsLoading(false))
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