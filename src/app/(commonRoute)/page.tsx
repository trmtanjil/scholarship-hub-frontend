import Banner from "./_component/page/home/HeroBanner"





function page() {
    return (
        <div className="min-h-screen bg-gray-50/50">
            <Banner />
            <div className="py-12 px-4 max-w-7xl mx-auto">
                {/* Other home page content can go here */}
            </div>
        </div>
    )
}

export default page