import Image from "next/image";
import { SignInButton } from "@clerk/nextjs";

export default function Login() {
  const urlPrefix =
    process.env.NODE_ENV === "production"
      ? "https://compas-app.vercel.app/"
      : "http://localhost:3000/";

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-white">
        <body class="h-full">
        ```
      */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image
            className="mx-auto"
            src="/logo.png"
            width={200}
            height={200}
            alt="Compas"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Ingresa a tu cuenta
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <SignInButton
            afterSignInUrl="/experiences"
            afterSignUpUrl="/signup"
            mode="redirect"
          >
            <button className="mt-3 flex w-full justify-center rounded-full border border-pink-500 bg-pink-500 py-1.5 pt-3 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500">
              Regístrate
            </button>
          </SignInButton>

          <div>
            <p className="mt-6 text-center text-sm text-gray-500">
              ¿Ya tienes cuenta?
            </p>
            <SignInButton
              afterSignInUrl="/experiences"
              afterSignUpUrl="/signup"
            >
              <button className="mt-3 flex w-full justify-center rounded-full border border-pink-500 px-3 py-1.5 text-sm font-semibold leading-6 text-pink-500 shadow-sm hover:bg-pink-500 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500">
                Iniciar sesión
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </>
  );
}
