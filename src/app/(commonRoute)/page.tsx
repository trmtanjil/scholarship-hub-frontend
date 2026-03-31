import Banner from "./_component/page/home/HeroBanner"
import ScholarshipList from "./allschollerships/page"
import HowItWork from "./houtowork/howtowork"
 import UserSay from "./usersay/usersay"
 




function page() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Banner />
            <ScholarshipList></ScholarshipList>
            <div className="py-12 px-4 max-w-7xl mx-auto">
                 <div><HowItWork></HowItWork></div>
            <div><UserSay></UserSay></div>
             </div>
        </div>
    )
}

export default page