import { Button } from "./ui/button";

const Header = () => {
    return (
        <header className="sticky top-0 bg-white z-20 border-b-2">
           
            <div className="py-5">
                <div className="container">
                    <div className="flex items-center justify-end">
                        <nav className="hidden md:flex gap-4 text-black/60 items-center">

                        <Button type="button" variant={"outline"}>
                            Login
                        </Button>

                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;