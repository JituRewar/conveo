import { SignUp } from '@clerk/nextjs'
import { AuthCardContainer } from '@/features/auth/components/auth-card-container'
import { AuthHeader } from '@/features/auth/components/auth-header'

export default function SignUpPage() {
  return (
    <AuthCardContainer>
      <AuthHeader
        title="Create Account"
        subtitle="Join Conveo to organize & participate in events"
        badgeText="JOIN CONVEO"
        iconType="logo"
      />
      <div className="flex w-full justify-center">
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={{
            elements: {
              rootBox: 'w-full flex justify-center shadow-none',
              cardBox: 'w-full shadow-none bg-transparent',
              card: 'bg-transparent shadow-none p-0 w-full border-none',
              header: 'hidden',
              footer:
                'border-t border-outline-variant/20 pt-4 mt-4 text-xs text-on-surface-variant',
              footerActionText: 'text-on-surface-variant',
              footerActionLink:
                'text-primary hover:text-primary-container font-semibold transition-colors',
              formButtonPrimary:
                'bg-primary hover:bg-primary-container text-on-primary font-medium py-3 rounded-xl shadow-lg shadow-primary/25 transition-all duration-200 text-sm active:scale-[0.98]',
              formFieldInput:
                'bg-surface-container/70 border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/50 focus:border-primary focus:ring-1 focus:ring-primary rounded-xl h-11 transition-all',
              socialButtonsBlockButton:
                'border border-outline-variant/30 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl h-11 transition-all text-sm font-medium hover:scale-[1.01]',
              dividerLine: 'bg-outline-variant/30',
              dividerText:
                'text-on-surface-variant text-xs uppercase tracking-wider',
            },
          }}
        />
      </div>
    </AuthCardContainer>
  )
}
