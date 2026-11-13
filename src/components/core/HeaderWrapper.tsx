/* ************************************************************
   Server component wrapper for the TBM Header.

   Fetches the admin-managed navigation tree. The BOOK button goes
   straight to Momence rather than being driven by a nav item, so it
   keeps its own slot on the right of the bar.
************************************************************ */
import { getNavigation } from "@/server-actions/navigation";
import Header from "./Header";
import { BOOKING_URL } from "@/config/booking";

/* The Momence page, unless an environment override says otherwise. */
const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || BOOKING_URL;

export default async function HeaderWrapper() {
    const navItems = await getNavigation();

    return <Header navItems={navItems} bookingUrl={bookingUrl} />;
}
