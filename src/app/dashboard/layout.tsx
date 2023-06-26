import UserNavigation from "@/components/user-navigation";
import Link from "next/link";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <header>
        <div>
          <Link href="/">Logo</Link>

          <UserNavigation />
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
