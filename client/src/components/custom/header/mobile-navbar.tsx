"use client";

import { Menu, X } from "lucide-react";
import { ReactNode, useState } from "react";

import { useLockBody } from "@/lib/hooks/use-lock-body";

function MobileMenu({
  onClose,
  children,
}: Readonly<{ onClose: () => void; children: ReactNode }>) {
  useLockBody();

  return (
    <button
      className="fixed inset-0 top-[60px] z-50 size-full overflow-auto bg-black/40 animate-in slide-in-from-top-24 md:hidden"
      onClick={onClose}
    >
      {children}
    </button>
  );
}

export function MobileNavbar({ children }: { readonly children: ReactNode }) {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <>
      <button
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <X /> : <Menu />}
      </button>
      {showMobileMenu && (
        <MobileMenu onClose={() => setShowMobileMenu(false)}>
          {children}
        </MobileMenu>
      )}
    </>
  );
}
