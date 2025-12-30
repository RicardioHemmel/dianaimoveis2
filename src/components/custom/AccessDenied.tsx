import { ShieldAlert, ArrowLeft, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "@/auth"

export default function AccessDenied() {
    return (
        <div className="flex min-h-[80vh] items-center justify-center p-4">
            <div className="w-full max-w-md text-center">
                <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-red-100 p-4 dark:bg-red-900/20">
                        <ShieldAlert className="h-12 w-12 text-red-600" />
                    </div>
                </div>

                <h1 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Acesso Restrito
                </h1>

                <p className="mb-8 text-gray-600 dark:text-gray-400">
                    Desculpe, você não tem as permissões necessárias para acessar a área administrativa da <strong>Diana Imóveis</strong>.
                    Se você acredita que isso é um erro, entre em contato com o suporte.
                </p>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <form action={async () => {
                        "use server";

                        await signOut();
                    }}>
                        <Button
                            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"

                        >
                            <ArrowLeft className="h-4 w-4" />
                            Voltar para Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}