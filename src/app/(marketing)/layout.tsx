import Link from "next/link";

interface MarketingLayoutProps {
  children?: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <>
      <header>
        <div>
          <Link href="/">Logo</Link>

          <ul>
            <li>
              <Link href="/login">Login</Link>
            </li>
          </ul>
        </div>
      </header>

      <main>{children}</main>
    </>
  );
}
