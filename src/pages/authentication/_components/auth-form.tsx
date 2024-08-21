import { useCallback, useState} from "react";
import Login from "./log-in";
import SignIn from "./sign-in";


type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {

    const [variant, setVariant] = useState<Variant>("LOGIN");
    // useEffect(() => {
    //     if (session?.status == 'authenticated') {

    //         router.push("/administrator/home")
    //     }
    // }, [session?.status, router]);

    const toggleVariant = useCallback(() => {
        if (variant == "LOGIN") {
            setVariant("REGISTER");
        } else {
            setVariant("LOGIN");
        }
    }, [variant]);


    const title = variant === 'LOGIN' ? 'Iniciar Sessión' : 'Registrarse'

    return (
        <div className="mt-8 w-full justify-center flex flex-col overflow-y-auto max-w-3xl">
            <h1 className="font-semibold text-2xl text-center">{title}</h1>
            <div
                className=" mt-8 p-6 shadow-md rounded-md py-8 bg-white">
                {
                    variant == "LOGIN" ? (
                        <Login />
                    ) : (

                        <SignIn />  
                    )
                }
                <div className="flex gap-2 justify-center text-sm mt-6 px-2 text-gray-500">
                    <div>
                        {variant == "LOGIN"
                            ? "¿No tienes cuenta?"
                            : "¿Ya tienes cuenta?"}
                    </div>

                    <div onClick={toggleVariant} className="underline cursor-pointer">
                        {variant === "LOGIN" ? "Registrate" : "Inicia sesión"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthForm;

