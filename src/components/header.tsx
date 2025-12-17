import SignInButton from "./auth/sign-in-btn";
import Logo from "./logo";

function Header() {
  return (
    <header className="container mx-auto mt-8 px-4">
      <nav className="bg-background/50 relative z-50 container mx-auto mt-8 flex items-center justify-between gap-1 rounded-xl border-t-2 border-b-2 border-l-2 px-[5vw] py-8 shadow-md backdrop-blur-md">
        <Logo />
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <SignInButton />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
