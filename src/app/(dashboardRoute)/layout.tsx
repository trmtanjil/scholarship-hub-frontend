

export default function DashboardLayout({
    // children,
    admin,
    moderator,
    user
}: Readonly<{
    children: React.ReactNode;
    admin: React.ReactNode;
    moderator: React.ReactNode;
    user: React.ReactNode;
}>) {
    const role = "moderator";
    return (

        <div  >
            {role === "moderator" && moderator}

        </div>
    );
}
