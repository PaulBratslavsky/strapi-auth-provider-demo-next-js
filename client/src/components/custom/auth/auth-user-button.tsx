import type { StrapiUserMeProps } from "@/types";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { AuthLogoutButton } from "./auth-logout-button";

export function AuthUserNavButton({ user }: Readonly<StrapiUserMeProps>) {
  return (
    <div className="hidden items-center gap-2 md:flex">
      {user?.username}
    <Button asChild className="w-8 h-8 rounded-full">
      <Link href="/" className="cursor-pointer">
        {user?.username[0].toLocaleUpperCase()}
      </Link>
    </Button>
    <AuthLogoutButton />
  </div>
  )
}
