import { ImageAndNameUserWithNavLink } from "./components/logged";
import { LogoAndLoginButton } from "./components/unlogged";

export function Header() {

    return (
        <header className="w-full bg-defaultGreen py-1 print:hidden">
            <ImageAndNameUserWithNavLink />
            <LogoAndLoginButton />
        </header>
    )
}