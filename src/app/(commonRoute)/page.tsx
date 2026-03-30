import Banner from "./_component/page/home/HeroBanner"
import ScholarshipList from "./allschollerships/page"
import HowToWork from "./howtowork/howtowork"
import UserSay from "./usersay/usersay"
 




function page() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Banner />
            <ScholarshipList></ScholarshipList>
            <div className="py-12 px-4 max-w-7xl mx-auto">
                 <div><HowToWork></HowToWork></div>
            <div><UserSay></UserSay></div>
            </div>
        </div>
    )
}

export default page