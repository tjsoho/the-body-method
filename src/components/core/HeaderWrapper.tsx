/* ************************************************************
   Server component wrapper for the TBM Header.

   Fetches the admin-managed navigation tree. The BOOK button is a fixed
   Momence booking link so it is NOT driven by nav items — it sits in
   its own slot on the right of the bar.
************************************************************ */
import { getNavigation } from "@/server-actions/navigation";
import Header from "./Header";

/** TODO Toby/Sarah: swap for the real Momence URL when it is confirmed. */
const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL || "/book";

export default async function HeaderWrapper() {
    const navItems = await getNavigation();

    return <Header navItems={navItems} bookingUrl={BOOKING_URL} />;
}
