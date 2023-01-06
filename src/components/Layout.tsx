import { Footer } from "./Footer";
import Header from "./Header";


interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {

    return (
        <div className="  min-h-screen flex flex-col justify-between">
            <div className="h-full flex flex-col grow">
                <div className="relative z-10">

                    <Header />

                </div>
                <main className="relative -z-0 flex w-full  justify-center grow bg-red-200 "> {children}</main>
                {/* <Footer /> */}
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
