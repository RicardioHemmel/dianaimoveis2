import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();
  return (
    <div>
      <div className="bg-[image:var(--gradient-primary)] rounded-2xl p-8 text-white shadow-premium">
        <h1 className="text-3xl font-bold mb-2">
          Bem-vinda de volta, {session?.user.name}!
        </h1>
        <p className="text-white/80">Lorem Ipsum</p>
      </div>
    </div>
  );
}
