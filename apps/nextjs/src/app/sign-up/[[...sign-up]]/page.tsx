import { SignUp } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <>
      <SignUp
        appearance={{
          layout: {
            logoImageUrl:
              "https://raw.githubusercontent.com/t3-oss/create-t3-app/99286f37324330ecdf75132fae1f246440a88035/www/public/images/t3-light.svg",
            socialButtonsPlacement: "top",
          },
        }}
      />
    </>
  );
}
