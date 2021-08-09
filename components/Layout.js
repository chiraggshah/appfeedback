import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0";
import Container from "../components/ui/Container";
import Logo from "../components/ui/Logo";

const Layout = ({ children }) => {
  const { user, error, isLoading } = useUser();

  return (
    <div>
      <NavBar user={user} />
      <main className="relative bg-gray-100 px-20 py-20">{children}</main>
      <footer className="flex items-center justify-center w-full h-24 border-t">
        Footer Links
      </footer>
    </div>
  );
};

const NavBar = ({ user }) => (
  <div className="sticky top-0 bg-white z-40 transition-all duration-150 border-b">
    <Container>
      <div className="relative flex flex-row justify-between py-4 align-center px-20">
        <div className="flex items-center flex-1">
          <Link href="/">
            <a className="cursor-pointer focus:border-none" aria-label="Logo">
              <Logo />
            </a>
          </Link>

          <nav className="ml-20 space-x-4 block">
            <Link href="/">
              <a className="inline-flex items-center text-primary leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-accents-6">
                Feedback
              </a>
            </Link>
            <Link href="/roadmap">
              <a className="inline-flex items-center text-primary leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-accents-6">
                Roadmap
              </a>
            </Link>
            <Link href="/changelog">
              <a className="inline-flex items-center text-primary leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-accents-6">
                Changelog
              </a>
            </Link>
            <Link href="/bugs">
              <a className="inline-flex items-center text-primary leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-accents-6">
                Bugs
              </a>
            </Link>
          </nav>
        </div>
        {user ? (
          <Link href="/api/auth/logout">
            <a className="inline-flex items-center text-primary leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-accents-6">
              Logout
            </a>
          </Link>
        ) : (
          <Link href="/api/auth/login">
            <a className="inline-flex items-center text-primary leading-6 font-medium transition ease-in-out duration-75 cursor-pointer text-accents-6">
              Login
            </a>
          </Link>
        )}
      </div>
    </Container>
  </div>
);

export default Layout;
