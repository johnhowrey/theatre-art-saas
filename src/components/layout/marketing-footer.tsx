import Link from "next/link";
import { Palette } from "lucide-react";

export function MarketingFooter() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Palette className="h-5 w-5" />
              <span>StageArt</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Professional marketing artwork for theaters, community groups, and schools.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Product</h4>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-foreground">Features</Link></li>
              <li><Link href="/#pricing" className="hover:text-foreground">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <ul className="mt-2 space-y-2 text-sm text-muted-foreground">
              <li><Link href="/sign-up" className="hover:text-foreground">Get Started</Link></li>
              <li><Link href="/sign-in" className="hover:text-foreground">Sign In</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} StageArt. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
