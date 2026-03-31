import Link from "next/link";
import { MoveLeft, Home } from "lucide-react"; // আইকন ব্যবহারের জন্য

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        {/* বড় এরর কোড */}
        <p className="text-6xl font-black text-amber-500 animate-bounce">404</p>
        
        {/* প্রধান মেসেজ */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page Not Found
        </h1>
        
        {/* বর্ণনা */}
        <p className="mt-6 text-base leading-7 text-gray-600 max-w-md mx-auto">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>

        {/* অ্যাকশন বাটনসমূহ */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            <Home size={18} />
            Return Home
          </Link>
          
          <Link
            href="/shop"
            className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50 transition-all"
          >
            <MoveLeft size={18} />
            Go to Shop
          </Link>
        </div>

        {/* সাপোর্ট কন্টাক্ট (ঐচ্ছিক) */}
        <div className="mt-12">
          <p className="text-sm font-medium text-gray-500">
            Need help? <Link href="/contact" className="text-amber-600 hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  );
}