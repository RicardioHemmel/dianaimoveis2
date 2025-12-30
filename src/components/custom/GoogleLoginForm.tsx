import { Button } from "@/components/ui/button";
import { loginGoogleAction } from "@/lib/server-actions/auth/login-google.action";

export default function GoogleLoginForm() {
  return (
    <>
      {/* GOOGLE LOGIN */}
      <form
        action={async () => {
          "use server";

          await loginGoogleAction();
        }}
      >
        <div className="my-6">
          <Button
            type="submit"
            variant="outline"
            className="w-full h-12 gap-3 border-gray-200 hover:bg-gray-50 text-gray-700 bg-transparent"
          >
            <img
              src="/icons/googleIcon.png"
              alt="Google Icone"
              className="w-5 h-auto"
            />
            Continuar com Google
          </Button>
        </div>
      </form>
    </>
  );
}
