import Link from 'next/link'
import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'

export function Navbar() {
  return (
    <header className="border-border bg-background border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Conveo
        </Link>
        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-muted-foreground hover:text-foreground cursor-pointer text-sm font-medium">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className="bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer rounded-md px-3.5 py-2 text-sm font-semibold shadow-xs">
                Sign Up
              </button>
            </SignUpButton>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>
        </div>
      </div>
    </header>
  )
}
