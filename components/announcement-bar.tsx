import Link from 'next/link'

export function AnnouncementBar() {
  return (
    <div className="border-b bg-primary px-4 py-2 text-center text-xs text-primary-foreground">

      <Link
        href="/combo/pick-any-2"
        className="inline-flex items-center gap-2 uppercase tracking-wide"
      >
        ✨ Pick Any 2 Pouches for ₹399
        <span className="underline">
          Shop Combo →
        </span>
      </Link>

    </div>
  )
}