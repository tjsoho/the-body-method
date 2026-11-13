/* ************************************************************
                        NOTES
   Where booking happens.

   Every "book", "start your 21 days", "view the timetable" and
   "see pricing" button on the site ends up here: the studio's
   Momence page, which carries the class schedule, appointment
   booking and every membership and class pack.

   The page's tabs are JavaScript state rather than addresses,
   so there is no deeper link to the schedule or to appointments
   to send people to. One URL covers all of it.

   Buttons on editable pages take this as their default and can
   be pointed somewhere else per button in the admin panel, so
   the day a particular class or product gets its own Momence
   link, that button can have it without a code change.
************************************************************ */

export const BOOKING_URL = "https://momence.com/u/the-body-method-QJrwuU";
