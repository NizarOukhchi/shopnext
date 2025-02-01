import Link from "next/link";

export function MarketingFooter() {
  return (
    <footer>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center">
          <p className="text-xs text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} ShopNext. All rights reserved.
          </p>
          <div className="flex gap-2 ml-auto items-center text-xs text-gray-600 dark:text-gray-400 ">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/terms">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
