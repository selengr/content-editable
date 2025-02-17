import Image from "next/image"
import { Button } from "@mui/material";

export default function HomePage() {

    return (
        <div className="min-h-screen bg-white text-right" dir="rtl">

      <div className="mx-auto px-4 pt-6 flex justify-center">
        <Image
          src="/logo/logo.svg"
          alt="Logo"
          width={120}
          height={40}
          className="mb-8 md:hidden"
        />
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 text-center md:text-right">
        <h1 className="text-3xl font-bold mb-2 text-[#4A4A4A]">دستیار هوشمند شناخت</h1>
        <div className="h-[2px] w-10 rounded-full bg-[#2CDFC9] mx-auto md:mx-0 my-3"></div>
        <h2 className="text-[22px] font-semibold text-[#FA4D56] mb-2">چه کاری انجام می‌دهیم!</h2>
        <p className="text-[14px] text-[#4A4A4A] mx-auto md:mx-0 leading-relaxed mb-4 px-[60px]">
          سایا سکویی برای ساخت، اجرا و تحلیل آزمون‌های روان‌شناختی است. این سکو با رابط کاربری ساده و یکپارچه، امکان ایجاد
          فرم‌های برخط و گزارش‌های شخصی‌سازی شده را فراهم می‌کند.
        </p>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 bg-banner-d-bg1 bg-cover bg-center bg-no-repeat -top-7 h-[310px] max-h-[310px] max-w-96 z-50 relative">
          <div className="absolute top-0 left-0 w-24 h-24 bg-blue-600 rounded-full opacity-20 blur-lg"></div>
          <div className="absolute bottom-0 right-0 w-16 h-16 bg-purple-600 rounded-full opacity-20 blur-lg"></div>
          <div className="absolute top-1/2 right-1/4 w-12 h-12 bg-pink-500 rounded-full opacity-20 blur-lg"></div>
        <div className="flex flex-row gap-8 justify-center items-center h-full">
          {/* Decorative Elements */}

          {/* Public Forms Card */}
          <div className="bg-white rounded-[45px] shadow-lg p-2 w-[131px] h-[159px]">
            <h3 className="text-md font-bold text-blue-600 mb-4">فرم‌های عمومی</h3>
            <p className="text-gray-600 mb-6 text-xs">مجموعه‌ای از فرم‌های منتشر شده عمومی در سامانه امرسالت</p>
            <Button className="w-full justify-center">
              مشاهده
            </Button>
          </div>

          
        </div>
      </div>

      {/* Video Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <h3 className="text-2xl font-bold mb-8">به آموزش بیشتری نیاز دارید؟</h3>
        <button className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto hover:bg-blue-700 transition-colors">
          {/* <Play className="w-10 h-10 text-white" /> */}
        </button>
      </div>
    </div>
    )
}