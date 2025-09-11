import { Container } from "@/components/container";
import { EditUser } from "@/components/form/editUser";
import Link from "next/link";
import { SlArrowLeft } from "react-icons/sl";

export default function UpdateUserPage() {
  return (
    <Container>
      <main
        className="w-full flex flex-col items-center justify-center mb-1 px-4 text-center"

      >

        {/* Logo estilizado */}
        <div className="w-full max-w-3xl flex items-center my-5">
          <Link href="/user/profile">
            <SlArrowLeft className="hover:cursor-pointer text-defaultGreen" />
          </Link>

          <div className=" block w-fit mx-auto">
            <h1 className="text-3xl font-bold text-defaultGreen text-center">
              Fisio<span className="text-defaultBlack">Admin</span>
            </h1>
          </div>
        </div>

        {/* Formulário */}
        <EditUser />
      </main>
    </Container>
  );
}