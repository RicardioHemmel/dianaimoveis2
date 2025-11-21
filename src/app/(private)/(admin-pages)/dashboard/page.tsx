import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/diana-corretora");
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Bem-Vindo - {session?.user?.name}</h1>
    </div>
  );
}
