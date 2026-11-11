/* ************************************************************
   /admin/login — the way in to the panel.
************************************************************ */

import type { Metadata } from "next";
import LoginForm from "@/components/admin/login-form";

export const metadata: Metadata = {
    title: "Sign in | The Body Method",
    // A sign-in screen has nothing worth ranking and should not
    // turn up in a search for the studio.
    robots: { index: false, follow: false },
};

export default function Login() {
    return <LoginForm />;
}
