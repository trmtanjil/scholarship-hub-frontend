import { Toaster } from "sonner";
import Footer from "./_component/shared/Footer/Footer";
import { Navbar } from "@/components copy/Sheared/navbar1";
import HowToWork from "./howtowork/howtowork";
import UserSay from "./usersay/usersay";
 

export default function CommonLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (

        <div  >
            <div><Navbar /></div>
            {children}
            <div><HowToWork></HowToWork></div>
            <div><UserSay></UserSay></div>
            <div><Footer /></div>

             <Toaster richColors position="top-right" closeButton />
        </div>
    );
}
