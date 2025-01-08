import { auth, signOut, signIn } from "@/auth";
import { CirclePlus, LogOut } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="bg-white px-5 py-3 shadow-sm">
      <nav className="flex items-center justify-between">
        <Link
          href={"/"}
          className="flex items-center justify-center gap-2"
          aria-label="Startsup-home"
        >
          <Image src={"/logo.svg"} alt="logo" width={40} height={40} />
          <h2 className="font-bold text-xl">
            Starts<span className="text-primary">Up</span>
          </h2>
        </Link>

        <div className="flex items-center gap-5 text-black">
          {session && session?.user ? (
            <>
              <Link href={"/startup/create"} aria-label="Create startup">
                <span className="max-sm:hidden">Create</span>
                <CirclePlus className="size-6 sm:hidden" />
              </Link>
              <form
                action={async () => {
                  "use server";
                  await signOut({ redirectTo: "/" });
                }}
                className="flex items-center justify-center"
              >
                <button type="submit">
                  <span className="max-sm:hidden">Logout</span>
                  <LogOut className="size-5 sm:hidden" />
                </button>
              </form>
              <Link href={`/user/${session?.id}`} aria-label="User profile">
                <Image
                  src={session?.user.image || ""}
                  alt={session?.user.name || ""}
                  width={40}
                  height={40}
                  className="size-10 rounded-full"
                />
                {/* <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user.image || ""}
                    alt={session?.user.name || ""}
                    width={40}
                    height={40}
                  />
                  <AvatarFallback>P</AvatarFallback>
                </Avatar> */}
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <button type="submit">
                <span>Sign in</span>
              </button>
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
