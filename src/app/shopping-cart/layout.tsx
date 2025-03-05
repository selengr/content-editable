

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <div className="p-4 bg-slate-300 h-screen">
        {children}
    </div>
  );
}


