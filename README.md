# Jaasiel Foundation - Next.js Website

A modern, responsive Next.js website for Jaasiel Foundation, a registered voluntary organisation working with underprivileged children and communities.

## Features

- **Modern Next.js 14+** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **NextAuth.js** for authentication
- **Responsive Design** - Mobile-first approach
- **SEO Optimized** with metadata and Open Graph tags
- **Form Validation** with React Hook Form and Zod
- **Image Optimization** with Next.js Image component

## Pages

- Home page with hero slider, features, causes preview, and mission section
- About/Foundation page
- Causes pages (list and individual cause details)
- Team page
- Gallery with lightbox
- Events pages (list and detail)
- Blog pages (grid, sidebar, and detail)
- FAQ page with search and filtering
- Feedback page with testimonials
- Contact page with form
- Authentication pages (Login, Signup, Password Recovery)
- Donate page
- Volunteer page

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Create a `.env.local` file in the root directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
newsite/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main pages
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/           # Layout components
│   ├── home/             # Home page components
│   └── shared/           # Shared components
├── data/                  # Mock data files
├── lib/                   # Utility functions
├── public/                # Static assets
├── types/                 # TypeScript types
└── package.json
```

## Authentication

The authentication system uses NextAuth.js with credentials provider. Currently, it uses a mock user system. In production, you should:

1. Connect to a real database (PostgreSQL, MongoDB, etc.)
2. Hash passwords using bcrypt
3. Implement proper user management
4. Add email verification
5. Add password reset functionality

## API Routes

- `/api/contact` - Contact form submission
- `/api/feedback` - Feedback form submission
- `/api/newsletter` - Newsletter subscription
- `/api/auth/signup` - User registration
- `/api/auth/recover-password` - Password recovery
- `/api/auth/[...nextauth]` - NextAuth.js handler

## Donation Integration

The donation form is currently a placeholder. To integrate payment processing:

1. Choose a payment gateway (Stripe, Razorpay, PayPal, etc.)
2. Set up API keys in environment variables
3. Update the `DonationForm` component to handle payments
4. Add webhook handlers for payment confirmation

## Building for Production

```bash
npm run build
npm start
```

## Technologies Used

- **Next.js 14+** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **NextAuth.js** - Authentication
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Lucide React** - Icons
- **Framer Motion** - Animations (optional)

## Notes

- All images are optimized using Next.js Image component
- Forms include client-side validation
- The site is fully responsive
- SEO metadata is included on all pages
- Mock data is used for demonstration purposes

## License

This project is for Jaasiel Foundation.

