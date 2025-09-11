import Link from "next/link";
import { NewUser } from "@/components/form/newUser";
import Footer from "@/components/footer";
import { Container } from "@/components/container";
import { SlArrowLeft } from "react-icons/sl";

export default function CreateUser() {
  return (
    <Container>
      <main
        className="w-full flex flex-col items-center justify-center"
        style={{ height: "calc(100vh - 8.5rem)" }}
      >
        <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow-lg shadow-gray-300/40 backdrop-blur-sm p-6">
          <div className="w-full flex items-center mb-5">
            <Link href="/login">
              <SlArrowLeft  className="hover:cursor-pointer text-defaultGreen" />
            </Link>
            
            <div  className=" block w-fit mx-auto">
              <h1 className="text-3xl font-bold text-defaultGreen text-center">
                Fisio<span className="text-defaultBlack">Admin</span>
              </h1>
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-semibold mb-5 text-center text-gray-800">
            Cadastre-se gratuitamente
          </h2>

          <NewUser />
        </div>
        <Footer />
      </main>
    </Container >
  );
}