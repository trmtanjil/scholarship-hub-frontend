import Footer from "./_component/shared/Footer/Footer";
import Navbar from "./_component/shared/Navbar/Navbar";


export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div  >
            <div><Navbar /></div>
            {children}
            <div><Footer /></div>
        </div>
    );
}
