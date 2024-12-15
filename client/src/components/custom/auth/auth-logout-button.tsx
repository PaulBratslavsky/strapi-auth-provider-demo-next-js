import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LogOut } from "lucide-react";    

const config = {
  maxAge: 60 * 60 * 24 * 7, // 1 week
  path: "/",
  domain: process.env.HOST ?? "localhost",
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
};

async function logoutAction() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.set("jwt", "", { ...config, maxAge: 0 });
  redirect("/");
}

export function AuthLogoutButton() {
  return (
    <form action={logoutAction}>
      <button
        type="submit"
        className="flex items-center gap-2"
      >
        <LogOut className="w-6 h-6" />
      </button>
    </form>
  );
}
