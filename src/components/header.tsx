import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/providers/auth-provider";

const Header = () => {
    const { user, logOut, token } = useAuth();

    return (
        <header className="sticky top-0 bg-white z-20 border-b-2">

            <div className="py-5">
                <div className="container">
                    <div className="flex items-center justify-end">
                        <nav className="hidden md:flex gap-4 text-black/60 items-center">
                            <p>{user?.email}</p>
                            {/* <p>{token}</p> */}
                            <Button asChild type="button" variant={"outline"}>
                                <Link to="/">Home</Link>
                            </Button>
                            {
                                user === null ? (
                                    <Button asChild type="button" variant={"outline"}>
                                        <Link to="/authentication">Login</Link>
                                    </Button>

                                ) : (
                                    <Button type="button" variant={"outline"} onClick={logOut}>
                                        Salir
                                    </Button>
                                )
                            }
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;