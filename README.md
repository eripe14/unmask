## Tech Stack

*   **Framework**: [Next.js](https://nextjs.org/) (with React Compiler)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Authentication**: [Clerk](https://clerk.com/)
*   **Database**: [Supabase](https://supabase.io/)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
*   **Animations**: [Framer Motion](https://www.framer.com/motion/)

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v20 or later recommended)
*   npm, yarn, or pnpm

### Installation & Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/eripe14/unmask.git
    cd unmask
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add the following environment variables. You will need to obtain these keys from your own Clerk and Supabase project dashboards.

    ```env
    # Clerk Keys
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

    # Supabase Keys
    NEXT_PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
    SUPABASE_SERVICE_ROLE_KEY=<your-supabase-service-role-key>
    ```

4.  **Run the development server:**
    The application will be available at `http://localhost:3003`.
    ```bash
    npm run dev
    ```
