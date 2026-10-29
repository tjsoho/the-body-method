/* ************************************************************
   /contact — Contact + Locations.

   Hero + two studio cards side by side (Tugun Beach, Cornerstone),
   each with a 3:2 map placeholder slot and all the practical info,
   then a general enquiries form on sand background.

   NOTE: the Google Maps iframes are TODO placeholders — real
   embeds go in once addresses are finalised with the client.
   The form POSTs to "#" for now; wire to a real endpoint when
   submission storage is confirmed.
************************************************************ */

import type { Metadata } from "next";
import Reveal from "@/components/motion/Reveal";

export const metadata: Metadata = {
    title: "Contact + Locations | The Body Method",
    description:
        "Get in touch with The Body Method and find our Tugun Beach and Cornerstone studios on the Gold Coast.",
};

export default function ContactPage() {
    return (
        <>
            {/* ============ HERO ============ */}
            <section
                style={{
                    position: "relative",
                    minHeight: 760,
                    marginTop: -85,
                    paddingTop: 85,
                    color: "#f4f2ed",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                }}
            >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src="/images/tbm-placeholders/landscape-life-walk.jpg"
                    alt="Women walking along the water at sunrise on a wide quiet beach"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        objectPosition: "center 55%",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(90deg, rgba(0,0,0,.62) 0%, rgba(0,0,0,.34) 45%, rgba(0,0,0,0) 78%), linear-gradient(180deg, rgba(0,0,0,.32) 0%, rgba(0,0,0,.08) 30%, rgba(0,0,0,.5) 62%, rgba(0,0,0,.85) 100%)",
                    }}
                />
                <div
                    className="tbm-wrap tbm-g12"
                    style={{
                        position: "relative",
                        marginTop: "auto",
                        paddingBottom: 75,
                    }}
                >
                    <div
                        className="tbm-c-l7"
                        style={{ display: "flex", flexDirection: "column", gap: 24 }}
                    >
                        <Reveal amount={0.3}>
                            <h1
                                style={{
                                    textShadow: "0 1px 24px rgba(0,0,0,.25)",
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(42px, 5.4vw, 80px)",
                                    lineHeight: 1.04,
                                    letterSpacing: "-.015em",
                                    textWrap: "balance",
                                }}
                            >
                                Contact + Locations
                            </h1>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ============ STUDIO CARDS ============ */}
            <section
                style={{
                    paddingTop: 75,
                    paddingBottom: 75,
                    background: "var(--tbm-cream)",
                    color: "var(--tbm-ink)",
                    fontFamily: "var(--font-lora)",
                }}
            >
                <div
                    className="tbm-wrap tbm-g12"
                    style={{ rowGap: 64, alignItems: "start" }}
                >
                    {/* --- TUGUN BEACH --- */}
                    <article
                        className="tbm-c-l"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                            paddingRight: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <Reveal amount={0.2}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/tbm-placeholders/studio-tugun-reformer.jpg"
                                alt="Feet pressing the footbar of a timber Reformer"
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                    objectPosition: "center 45%",
                                }}
                            />
                        </Reveal>
                        <Reveal amount={0.3} delay={0.05}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(36px, 4vw, 56px)",
                                    lineHeight: 1.1,
                                    letterSpacing: "-.01em",
                                    marginTop: 8,
                                }}
                            >
                                TUGUN BEACH
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.11}>
                            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.45, fontWeight: 500 }}>
                                3/5 Toolona Street, Tugun QLD 4224
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                Our Reformer Pilates studio, just moments from the beach.
                            </p>
                        </Reveal>

                        {/* Map slot — styled empty placeholder, retains the 3:2 ratio
                           and still links to Google Maps. */}
                        <a
                            href="https://maps.app.goo.gl/XCPQRxX47xJREu1P8"
                            aria-label="Open 3/5 Toolona Street, Tugun in Google Maps"
                            style={{
                                position: "relative",
                                display: "block",
                                border: "1px solid var(--tbm-rule)",
                                color: "var(--tbm-forest)",
                                width: "100%",
                                aspectRatio: "3 / 2",
                                background: "#1b2518",
                            }}
                        >
                            {/* TODO: embed real Google Maps iframe once addresses confirmed */}
                        </a>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                borderTop: "1px solid var(--tbm-rule)",
                                paddingTop: 20,
                            }}
                        >
                            <h3
                                className="tbm-lbl"
                                style={{ margin: 0, color: "var(--tbm-bronze-label)" }}
                            >
                                Getting here
                            </h3>
                            <a
                                className="tbm-btn"
                                href="https://maps.app.goo.gl/XCPQRxX47xJREu1P8"
                                style={{
                                    color: "var(--tbm-ink)",
                                    border: "1px solid var(--tbm-ink)",
                                }}
                            >
                                GET DIRECTIONS
                            </a>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                borderTop: "1px solid var(--tbm-rule)",
                                paddingTop: 20,
                            }}
                        >
                            <h3
                                className="tbm-lbl"
                                style={{ margin: 0, color: "var(--tbm-bronze-label)" }}
                            >
                                Parking
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                There is street parking all along the front of the studio, there is also a beach parking area at the end of the street. Please make sure you allow 10-15 minutes for parking at peak periods on weekends etc.
                            </p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                borderTop: "1px solid var(--tbm-rule)",
                                paddingTop: 20,
                            }}
                        >
                            <h3
                                className="tbm-lbl"
                                style={{ margin: 0, color: "var(--tbm-bronze-label)" }}
                            >
                                Opening + bookings
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                Classes run throughout the week. As class times vary, check the live timetable and book your spot before you arrive. If it&rsquo;s your first visit, we recommend arriving 10-15 minutes early so we can show you around and get you settled.
                            </p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                borderTop: "1px solid var(--tbm-rule)",
                                paddingTop: 20,
                            }}
                        >
                            <h3
                                className="tbm-lbl"
                                style={{ margin: 0, color: "var(--tbm-bronze-label)" }}
                            >
                                Contact:
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                <a href="tel:0410899580" style={{ color: "var(--tbm-forest)" }}>
                                    0410 899 580
                                </a>{" "}
                                - 9am&ndash;5pm
                                <br />
                                <a
                                    href="mailto:hello@thebodymethod.com.au"
                                    style={{ color: "var(--tbm-forest)" }}
                                >
                                    hello@thebodymethod.com.au
                                </a>
                            </p>
                        </div>
                    </article>

                    {/* --- CORNERSTONE --- */}
                    <article
                        className="tbm-c-r card-div"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 24,
                            boxShadow: "inset 1px 0 0 var(--tbm-rule)",
                            paddingLeft: "clamp(0px, 2vw, 24px)",
                        }}
                    >
                        <Reveal amount={0.2}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/images/tbm-placeholders/studio-cornerstone-meditation.jpg"
                                alt="Seated meditation facing windows full of trees"
                                style={{
                                    width: "100%",
                                    aspectRatio: "3 / 2",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                        </Reveal>
                        <Reveal amount={0.3} delay={0.05}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(36px, 4vw, 56px)",
                                    lineHeight: 1.1,
                                    letterSpacing: "-.01em",
                                    marginTop: 8,
                                }}
                            >
                                CORNERSTONE
                            </h2>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.11}>
                            <p style={{ margin: 0, fontSize: 20, lineHeight: 1.45, fontWeight: 500 }}>
                                Upstairs, Level 1, Cornerstone Stores, Shop 8, 570 Gold Coast Highway, Tugun QLD 4224
                            </p>
                        </Reveal>
                        <Reveal amount={0.3} delay={0.16}>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 18,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-body)",
                                }}
                            >
                                Our light-filled home for Mat Pilates, Barre, Yoga, Yin, Meditation and more.
                            </p>
                        </Reveal>

                        {/* Map slot — styled empty placeholder. */}
                        <a
                            href="https://maps.app.goo.gl/QuJycWP9bWruvas76"
                            aria-label="Open 570 Gold Coast Highway, Tugun in Google Maps"
                            style={{
                                position: "relative",
                                display: "block",
                                border: "1px solid var(--tbm-rule)",
                                color: "var(--tbm-forest)",
                                width: "100%",
                                aspectRatio: "3 / 2",
                                background: "#1b2518",
                            }}
                        >
                            {/* TODO: embed real Google Maps iframe once addresses confirmed */}
                        </a>

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                borderTop: "1px solid var(--tbm-rule)",
                                paddingTop: 20,
                            }}
                        >
                            <h3
                                className="tbm-lbl"
                                style={{ margin: 0, color: "var(--tbm-bronze-label)" }}
                            >
                                Getting here
                            </h3>
                            <a
                                className="tbm-btn"
                                href="https://maps.app.goo.gl/QuJycWP9bWruvas76"
                                style={{
                                    color: "var(--tbm-ink)",
                                    border: "1px solid var(--tbm-ink)",
                                }}
                            >
                                GET DIRECTIONS
                            </a>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                borderTop: "1px solid var(--tbm-rule)",
                                paddingTop: 20,
                            }}
                        >
                            <h3
                                className="tbm-lbl"
                                style={{ margin: 0, color: "var(--tbm-bronze-label)" }}
                            >
                                Parking
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                There is street parking along the Gold Coast highway and surrounding streets and also limited parking in the Cornerstone carpark. Please make sure you allow 10-15 minutes for parking times during peak periods on weekends etc.
                            </p>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                borderTop: "1px solid var(--tbm-rule)",
                                paddingTop: 20,
                            }}
                        >
                            <h3
                                className="tbm-lbl"
                                style={{ margin: 0, color: "var(--tbm-bronze-label)" }}
                            >
                                Opening + bookings
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                Classes run throughout the week. Check the live timetable and book your spot before you arrive. If it&rsquo;s your first visit, come 10 minutes early so you have plenty of time to settle in before class.
                            </p>
                            <div style={{ paddingTop: 8 }}>
                                <a
                                    className="tbm-btn"
                                    href="#momence-timetable-cornerstone"
                                    style={{ background: "var(--tbm-ink)", color: "var(--tbm-cream)" }}
                                >
                                    VIEW CORNERSTONE TIMETABLE
                                </a>
                            </div>
                        </div>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 8,
                                borderTop: "1px solid var(--tbm-rule)",
                                paddingTop: 20,
                            }}
                        >
                            <h3
                                className="tbm-lbl"
                                style={{ margin: 0, color: "var(--tbm-bronze-label)" }}
                            >
                                Contact
                            </h3>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    color: "var(--tbm-text-muted)",
                                }}
                            >
                                <a href="tel:0410899580" style={{ color: "var(--tbm-forest)" }}>
                                    0410 899 580
                                </a>{" "}
                                - 9am&ndash;5pm
                                <br />
                                <a
                                    href="mailto:hello@thebodymethod.com.au"
                                    style={{ color: "var(--tbm-forest)" }}
                                >
                                    hello@thebodymethod.com.au
                                </a>
                            </p>
                        </div>
                    </article>
                </div>
            </section>

            {/* ============ GENERAL ENQUIRIES FORM ============
               Real fields filled in once the client confirms them;
               for now this submits to `#` and should be wired to the
               real endpoint before launch. */}
            <section
                style={{
                    background: "var(--tbm-sand)",
                    paddingTop: 75,
                    paddingBottom: 75,
                    color: "var(--tbm-ink)",
                    fontFamily: "var(--font-lora)",
                }}
            >
                <div className="tbm-wrap tbm-g12">
                    <div className="tbm-c-all">
                        <Reveal amount={0.3}>
                            <h2
                                style={{
                                    margin: 0,
                                    fontWeight: 400,
                                    fontSize: "clamp(32px, 3.4vw, 48px)",
                                    lineHeight: 1.1,
                                    letterSpacing: "-.01em",
                                    marginBottom: 32,
                                }}
                            >
                                General enquiries
                            </h2>
                        </Reveal>
                        <Reveal amount={0.2} delay={0.08}>
                            {/* TODO: wire up to the real submit endpoint once the
                                client confirms where enquiries should land. */}
                            <form
                                action="#"
                                method="post"
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: 20,
                                    maxWidth: 640,
                                }}
                            >
                                <label
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                    }}
                                >
                                    <span
                                        className="tbm-lbl"
                                        style={{ color: "var(--tbm-bronze-label)" }}
                                    >
                                        Name
                                    </span>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        autoComplete="name"
                                        style={{
                                            fontFamily: "var(--font-lora)",
                                            fontSize: 17,
                                            lineHeight: 1.4,
                                            padding: "14px 16px",
                                            border: "1px solid var(--tbm-rule)",
                                            background: "var(--tbm-cream)",
                                            color: "var(--tbm-ink)",
                                            borderRadius: 0,
                                            minHeight: 48,
                                        }}
                                    />
                                </label>
                                <label
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                    }}
                                >
                                    <span
                                        className="tbm-lbl"
                                        style={{ color: "var(--tbm-bronze-label)" }}
                                    >
                                        Email
                                    </span>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        autoComplete="email"
                                        style={{
                                            fontFamily: "var(--font-lora)",
                                            fontSize: 17,
                                            lineHeight: 1.4,
                                            padding: "14px 16px",
                                            border: "1px solid var(--tbm-rule)",
                                            background: "var(--tbm-cream)",
                                            color: "var(--tbm-ink)",
                                            borderRadius: 0,
                                            minHeight: 48,
                                        }}
                                    />
                                </label>
                                <label
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 8,
                                    }}
                                >
                                    <span
                                        className="tbm-lbl"
                                        style={{ color: "var(--tbm-bronze-label)" }}
                                    >
                                        Message
                                    </span>
                                    <textarea
                                        name="message"
                                        required
                                        rows={6}
                                        style={{
                                            fontFamily: "var(--font-lora)",
                                            fontSize: 17,
                                            lineHeight: 1.5,
                                            padding: "14px 16px",
                                            border: "1px solid var(--tbm-rule)",
                                            background: "var(--tbm-cream)",
                                            color: "var(--tbm-ink)",
                                            borderRadius: 0,
                                            resize: "vertical",
                                        }}
                                    />
                                </label>
                                <div>
                                    <button
                                        type="submit"
                                        className="tbm-btn"
                                        style={{
                                            background: "var(--tbm-ink)",
                                            color: "var(--tbm-cream)",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        SEND MESSAGE
                                    </button>
                                </div>
                            </form>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
