"use client";

/* ************************************************************
                        NOTES
   The admin sign-in form.

   Dressed in the site's own clothes rather than the template's:
   Lora for the copy, Hanken for the labels and the button, the
   forest and cream palette, square corners and thin rules. It is
   the first screen anyone sees on the panel, so it should feel
   like The Body Method and not like a dashboard someone bought.

   The photograph beside it is the hero still from the studios
   page, which already ships with the site.
************************************************************ */

import { useState } from "react";
import login from "@/server-actions/admin";

const FIELD_STYLE: React.CSSProperties = {
    fontFamily: "var(--font-lora)",
    fontSize: 17,
    lineHeight: 1.4,
    padding: "14px 16px",
    border: "1px solid var(--tbm-rule)",
    background: "var(--tbm-cream)",
    color: "var(--tbm-ink)",
    borderRadius: 0,
    minHeight: 52,
    width: "100%",
    outline: "none",
};

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (isLoading) return;

        setError(null);
        setIsLoading(true);

        const { error: loginError } = await login(email, password);

        if (loginError) {
            setError(loginError);
            setIsLoading(false);
            return;
        }

        // On success the server action redirects, so the spinner stays
        // put rather than flashing back to "Sign in" mid-navigation.
    };

    return (
        <main className="tbm-login">
            {/* Left: photograph and wordmark. Hidden on a phone, where
                the form should have the whole screen. */}
            <div className="tbm-login-art">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/tbm-placeholders/hero-studios.jpg"
                    alt=""
                    aria-hidden="true"
                />
                <div className="tbm-login-art-veil" aria-hidden="true" />
                <div className="tbm-login-art-copy">
                    <span
                        className="tbm-wordmark"
                        style={{
                            color: "#f4f2ed",
                            border: "1px solid rgba(244,242,237,.85)",
                            fontFamily: "var(--font-lora)",
                            whiteSpace: "nowrap",
                        }}
                    >
                        <em>the</em>.body.method
                    </span>
                    <p>
                        Everything on the website, in one place. Change the
                        words, swap the photographs, set the prices.
                    </p>
                </div>
            </div>

            {/* Right: the form. */}
            <div className="tbm-login-panel">
                <div className="tbm-login-form">
                    <span
                        className="tbm-lbl"
                        style={{ color: "var(--tbm-bronze-label)" }}
                    >
                        Studio admin
                    </span>
                    <h1>Sign in</h1>
                    <p className="tbm-login-lede">
                        This is where the website is edited. If you have not
                        been given a login, ask the studio.
                    </p>

                    {error && (
                        <p role="alert" className="tbm-login-error">
                            {error}
                        </p>
                    )}

                    <form onSubmit={handleSubmit} noValidate>
                        <label htmlFor="email">
                            <span
                                className="tbm-lbl"
                                style={{ color: "var(--tbm-bronze-label)" }}
                            >
                                Email
                            </span>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={FIELD_STYLE}
                            />
                        </label>

                        <label htmlFor="password">
                            <span
                                className="tbm-lbl"
                                style={{ color: "var(--tbm-bronze-label)" }}
                            >
                                Password
                            </span>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={FIELD_STYLE}
                            />
                        </label>

                        <button
                            type="submit"
                            className="tbm-btn"
                            disabled={isLoading}
                            style={{
                                background: "var(--tbm-forest)",
                                color: "var(--tbm-cream)",
                                border: "none",
                                width: "100%",
                                cursor: isLoading ? "default" : "pointer",
                                opacity: isLoading ? 0.7 : 1,
                            }}
                        >
                            {isLoading ? "Signing in" : "Sign in"}
                        </button>
                    </form>

                    <p className="tbm-login-foot">
                        Edits appear on the live site as soon as you save.
                    </p>
                </div>
            </div>
        </main>
    );
}
