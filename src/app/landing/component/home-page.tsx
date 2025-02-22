import { Button } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-right md:pt-20 md:pr-6 md:pl-12" dir="rtl">
      <header className="mx-auto px-4 pt-6 flex justify-center md:hidden">
        <Image src="/logo/logo.svg" alt="سایا لوگو" width={120} height={40} priority />
      </header>

      <div className="flex flex-col md:flex-row justify-start">
        <section className="px-4 text-center md:text-right">
          <h1 className="text-3xl font-bold mb-2 text-[#4A4A4A]">دستیار هوشمند شناخت</h1>
          <div className="flex flex-col justify-center md:flex-row items-center">
            <div
              className="h-[2px] w-10 md:w-9 rounded-full bg-[#2CDFC9] mx-auto my-3 md:mb-5 md:mx-2"
              aria-hidden="true"
            ></div>
            <h2 className="text-[22px] font-semibold text-[#FA4D56] mb-2">چه کاری انجام می‌دهیم!</h2>
          </div>
          <p className="text-[14px] text-[#4A4A4A] mx-auto md:mx-0 leading-relaxed mb-4 px-[20px] md:px-0 max-w-72">
            سایا سکویی برای ساخت، اجرا و تحلیل آزمون‌های روان‌شناختی است. این سکو با رابط کاربری ساده و یکپارچه، امکان
            ایجاد فرم‌های برخط و گزارش‌های شخصی‌سازی شده را فراهم می‌کند.
          </p>
        </section>

        <section className="px-4 bg-banner-m-bg1 md:bg-banner-d-bg1 bg-cover bg-center bg-no-repeat -top-7 md:right-[10%] md:-top-20 h-[310px] max-h-[310px] md:h-[510px] md:max-h-[550px] max-w-96 md:max-w-[40%] md:w-[50%] relative">
          <div
            className="absolute top-0 left-0 w-24 h-24 bg-blue-600 rounded-full opacity-20 blur-lg"
            aria-hidden="true"
          ></div>
          <div
            className="absolute bottom-0 right-0 w-16 h-16 bg-purple-600 rounded-full opacity-20 blur-lg"
            aria-hidden="true"
          ></div>
          <div
            className="absolute top-1/2 right-1/4 w-12 h-12 bg-pink-500 rounded-full opacity-20 blur-lg"
            aria-hidden="true"
          ></div>
          <div className="flex flex-row gap-8 justify-center items-center h-full">
            <FormBuilderCard />
            <PublicFormsCard />
          </div>
        </section>
      </div>

      <footer className="container flex flex-col items-center justify-center mx-auto px-4 py-12 text-center bg-banner-bg2 bg-cover bg-center bg-no-repeat -top-32 h-[380px] max-h-[380px] max-w-96 relative">
        <Image src="/logo/logo.svg" alt="سایا لوگو" width={120} height={40} className="mb-8 hidden md:block" />
        <span className="text-[14px] text-[#4A4A4A] mt-4">به آموزش بیشتری نیاز دارید؟</span>
      </footer>
    </main>
  )
}

function FormBuilderCard() {
  return (
    <div className="bg-[linear-gradient(233.47deg,_#2CDFC9_-51.3%,_#1758BA_86.56%)] text-white rounded-[45px] shadow-lg pt-8 pr-4 w-[131px] h-[159px] relative">
      <h3 className="text-md font-bold mb-4">فرم ساز</h3>
      <p className="mb-6 text-xs">ساخت حرفه‌ای فرم با قابلیت درگ اند دراپ</p>
      <Button className="w-full justify-center absolute bottom-5 right-9 text-[9px] text-white">
        <Link href="#">ورود به فرم ساز</Link>
      </Button>
    </div>
  )
}

function PublicFormsCard() {
  return (
    <div className="bg-white rounded-[45px] shadow-lg pt-8 w-[131px] h-[159px] relative">
      <h3 className="text-md font-bold text-[#1758BA] pr-4 mb-2">فرم‌های عمومی</h3>
      <p className="text-[#2A2A2A] mb-6 text-xs pr-3 pl-4">مجموعه‌ای از فرم‌های منتشر شده عمومی در سامانه امرسالت</p>
      <Button
        className="w-full justify-center absolute bottom-5 right-14 text-[9px] text-[#1758BA]"
      >
        <Link href="#">مشاهده</Link>
      </Button>
    </div>
  )
}

