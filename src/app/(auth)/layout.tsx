import Link from "next/link";
import { Palette } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <Link href="/" className="mb-8 flex items-center gap-2 text-2xl font-bold">
        <Palette className="h-8 w-8" />
        <span>StageArt</span>
      </Link>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
