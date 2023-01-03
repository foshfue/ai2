import { Footer } from "./Footer";
import Header from "./Header";


interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {

    return (
        <div className="  min-h-screen ">
            <div className="relative z-10">

                <Header />

            </div>
            <main className="relative -z-0 flex w-full  justify-center mt-20"> {children}</main>
            {/* <Footer /> */}
            <Footer />
        </div>
    );
};

export default Layout;
