export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  heroImage: string;           // Main hero screenshot/mockup
  thumbnailImage: string;      // Grid thumbnail on /work page
  hasImages?: boolean;         // true once real screenshots exist in /public; false = render gradient placeholder
  year: string;
  client: {
    name: string;
    industry: string;
    location?: string;
    website?: string;          // Live site URL if public
  };
  brief: string;               // 1-2 sentences: what they came to you for
  challenge: string[];          // Pain points / what wasn't working
  approach: string[];           // How you tackled it
  features: string[];           // Key things you built
  testimonial?: {
    quote: string;
    name: string;
    role: string;
  };
  results?: {                   // Optional metrics
    stats: { value: string; label: string }[];
  };
  gallery: string[];            // Additional screenshots (desktop, mobile, details)
  graphics?: string[];          // Optional social/graphic deliverables (IG carousel covers, ads, etc.)
  graphicsTitle?: [string, string]; // Optional heading for the graphics section (default ["Weekly","graphics."])
  graphicsSubtitle?: string;    // Optional subtitle for the graphics section
  documents?: string[];         // Optional document page images (rendered welcome pack / PDF pages)
  documentsTitle?: [string, string]; // Optional heading for the documents section (default ["The welcome","pack."])
  documentsSubtitle?: string;   // Optional subtitle for the documents section
  pages?: string[];             // Optional LANDSCAPE stills of further pages on the live site
  pagesTitle?: [string, string];     // Optional heading (default ["Every page","earns its place."])
  pagesSubtitle?: string;       // Optional subtitle for the pages section
  showcase?: string[];          // Optional LANDSCAPE stills (admin/CMS screens, wide brand assets)
  showcaseTitle?: [string, string];  // Optional heading (default ["Behind the","scenes."])
  showcaseSubtitle?: string;    // Optional subtitle for the showcase section
  relatedProjects: string[];    // Slugs of related projects
}

// ============================================================================
// WEB DESIGN & BUILD + AI-POWERED WEBSITES
// ============================================================================

const webProjects: ProjectData[] = [
  {
    slug: "apex-gym-glasgow",
    title: "Apex Gym Glasgow",
    category: "AI-Powered",
    tags: [
      "Website",
      "AI-Accelerated",
      "Bespoke Design",
      "Custom Build",
      "Hosting",
      "SSL",
      "Coaching",
      "Glasgow, UK",
    ],
    heroImage: "/images/projects/apex-gym-glasgow/hero.jpg",
    thumbnailImage: "/images/projects/apex-gym-glasgow/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Apex Gym Glasgow",
      industry: "Small Group Personal Training",
      location: "Southside, Glasgow",
      website: "https://apexgymglasgow.com/",
    },
    brief:
      "Sean runs small group personal training in the Southside of Glasgow. He had no website. The brand, the coaching, the members and the community all existed, they just lived on Instagram, and the only link anywhere was a raw Google Form. He filled in our brief form asking for enquiries, credibility and to be found on Google. Seven days later the site was live on his own domain.",
    challenge: [
      "There was no website at all. Someone would watch a reel, decide they were interested, tap the link and land on a bare Google Form with no gym behind it. No prices, no timetable, no faces, nothing to say what they were actually signing up for.",
      "The brand already existed and was genuinely good. Black, white type, wide-tracked APEX, photography stripped back to near mono, the same lettering that is painted on his gym wall. It just had nowhere to live except a grid of posts that scroll away.",
      "Everything Apex sells runs on a cap of six people a session. That is the whole proposition, and it is the thing a stranger cannot tell from the outside. The conditioning classes are a different thing entirely and run twenty to thirty plus, so the site had to hold both without muddling them.",
      "The thing stopping people joining was never the design. It was five sentences he hears every week. I do not have time. I will join once I am in better shape. What if I am not fit enough. What if I cannot keep up. What if I do not know anyone.",
      "He owned apexgymglasgow.com and it went nowhere. The domain had been sitting on a 404 while every enquiry took the long way round through a form.",
    ],
    approach: [
      "We did not invent a look for him. He had already built one and posts it a slide at a time. So the site is his own system scaled up rather than a new coat of paint, which is why it landed first time.",
      "The hero is his footage. A locked off wide of the real gym, the real APEX wall, a coach working with a member. We tried four other heroes that made the typography the event and every one of them was wrong. The gym is more interesting than any type treatment we could put over it.",
      "The copy is his. Nearly every line on the page is lifted straight out of his own captions, because he had already written the website without realising it. The questions section is his objection reels word for word, so the page answers people in the same voice they already follow.",
      "One page, because joining a gym is one decision. Who you are, how it works, when it runs, who else is there, what people say, what you are worried about, and then the form. In that order, in a single scroll.",
      "His members do the selling. Real stories under real names, a continuous river of photographs from meetups and sports day and hill walks, and clips of members on camera with no script. Every gym in the country claims community. He can prove it, so we let the photographs do it.",
      "He can change it himself. Text and images are editable on the live site, so a timetable change or a new set of photos does not need to come back to us.",
    ],
    features: [
      "Single page site, custom built, no template",
      "Hero video cut from the gym's own footage",
      "Weekly timetable with the sessions and open gym hours",
      "Member stories under real names",
      "Continuous community photo river",
      "Member video clips, straight from the gym",
      "Questions section built from the objections he hears weekly",
      "Enquiry form landing in the gym inbox",
      "Client-editable text and images",
      "Hosting, SSL and the domain pointed at it",
      "Search and social titles, descriptions and share cards",
    ],
    testimonial: {
      quote: "Looks class bro, really happy with it to be honest.",
      name: "Sean",
      role: "Founder, Apex Gym Glasgow",
    },
    results: {
      stats: [
        {
          value: "7 days",
          label: "From filling in the brief form to a live site on his own domain",
        },
        {
          value: "A Google Form",
          label:
            "The entire online front door before this. No website, nothing on the domain he already owned",
        },
        {
          value: "One page",
          label:
            "Everything someone needs to decide, in one scroll, with the trial enquiry at the end of it",
        },
        {
          value: "Groups of 6",
          label:
            "The cap the whole model runs on, and the number the site had to make impossible to miss",
        },
      ],
    },
    gallery: [
      "/images/projects/apex-gym-glasgow/desktop.jpg",
      "/images/projects/apex-gym-glasgow/mobile.jpg",
    ],
    pages: [
      "/images/projects/apex-gym-glasgow/pages/who-we-are.jpg",
      "/images/projects/apex-gym-glasgow/pages/timetable.jpg",
      "/images/projects/apex-gym-glasgow/pages/members.jpg",
      "/images/projects/apex-gym-glasgow/pages/community.jpg",
      "/images/projects/apex-gym-glasgow/pages/on-camera.jpg",
      "/images/projects/apex-gym-glasgow/pages/trial.jpg",
    ],
    pagesTitle: ["One page.", "Every question answered."],
    pagesSubtitle:
      "Joining a gym is one decision, so we did not spread it over six pages and hope people kept clicking. Who they are, how it runs, when it runs, who else trains there, what members say on camera, and the five things people talk themselves out of it with. Then the form.",
    relatedProjects: ["onyx-lagree", "physique-method"],
  },
  {
    slug: "dr-shabri",
    title: "Dr Shabri",
    category: "Web Design & Build",
    tags: [
      "WordPress",
      "Elementor",
      "Website Build",
      "Local SEO",
      "Dental & Aesthetics",
      "Ongoing Support",
    ],
    heroImage: "/images/projects/dr-shabri/hero.jpg",
    thumbnailImage: "/images/projects/dr-shabri/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Dr Shabri Chandarana",
      industry: "Cosmetic Dentistry & Facial Aesthetics",
      location: "Marylebone, London",
      website: "https://drshabri.com/",
    },
    brief:
      "A Marylebone practice that treats dentistry, facial aesthetics and regenerative health as one discipline rather than three departments. The website had to carry that idea across more than sixty pages without ever feeling like a treatment menu, book patients into three different clinical systems without dumping them in the wrong one, and be found by people searching for a treatment rather than for her name.",
    challenge: [
      "Sixty six pages, most of them treatments. On a site that size the danger is not the design, it is drift. Wording, buttons, headings and page furniture pull apart page by page until the twentieth treatment page reads like a different practice from the first.",
      "Booking runs through separate clinical systems for dentistry, aesthetics and skincare. Every enquiry button had to land a patient in the right one, and the site was routing them through popups that added a step and lost people.",
      "The practice writes in the first person, but large parts of the site said we and our, which reads as a clinic full of people when the whole proposition is that one clinician plans the treatment.",
      "Patients search for the treatment, not the practice. Someone typing composite bonding or tear trough filler into Google has never heard of Dr Shabri, so every treatment page had to be able to win that search on its own.",
      "Dental practices are regulated. GDC-required information has to be published and correct, and the practice address has to be right everywhere it appears, which on a site like this is more places than anyone expects.",
    ],
    approach: [
      "One design system, applied everywhere rather than page by page. Where a change touched dozens of pages we scripted it against the page data instead of opening each one, so the fortieth treatment page came out identical to the first.",
      "Booking popups replaced with buttons that go straight to the right portal. Sixty seven of them across forty four pages, split three ways so a dental patient, an aesthetics patient and a skincare patient each land where they should.",
      "Every page given its own hand-written title, description and target search term. Not generated, not templated. All sixty six were then read back off the live page to prove what we wrote is what Google sees.",
      "The practice published in a form search engines and AI assistants can read: the clinic as a named dental practice with its address, map position, opening hours and phone number, rather than leaving that buried in the footer as ordinary text.",
      "Alt text written for ninety six images from where each image actually sits on the page, taking its meaning from the section it illustrates rather than from a filename.",
      "The footer rebuilt into two columns and locked to the same width as the band above it, measured across five screen widths rather than eyeballed, so the edges line up on every machine.",
      "The address verified against the postcode database before it was allowed anywhere near the site's structured data. On this site that mattered more than usual, because the regulatory page also carries the GDC's own address, and mixing the two up would have put the wrong practice on the map.",
    ],
    features: [
      "Sixty six pages on one consistent design system",
      "Treatment pages built to win their own search",
      "Booking routed to three separate clinical portals",
      "Direct-to-portal buttons, no popup in the way",
      "Named dental practice markup with address and hours",
      "Hand-written titles and descriptions on every page",
      "Alt text taken from context, not filenames",
      "GDC regulatory information published properly",
      "Two-column footer with a working enquiry form",
      "New treatment pages added inside the same system",
      "Cached delivery for a fast repeat visit",
      "Ongoing changes handled as the practice grows",
    ],
    results: {
      stats: [
        {
          value: "66 pages",
          label:
            "Each with its own hand-written title, description and target search term, every one verified on the live page",
        },
        {
          value: "67 popups",
          label:
            "Replaced with buttons that take a patient straight to the right booking system, across 44 pages",
        },
        {
          value: "230ms",
          label:
            "Warm page load on a sixty six page Elementor site",
        },
        {
          value: "5 new pages",
          label:
            "Built and published inside the existing design system, including the regulatory page the practice must show",
        },
      ],
    },
    gallery: [
      "/images/projects/dr-shabri/desktop.jpg",
      "/images/projects/dr-shabri/mobile.jpg",
      "/images/projects/dr-shabri/desktop-full.jpg",
    ],
    pages: [
      "/images/projects/dr-shabri/pages/home-disciplines.jpg",
      "/images/projects/dr-shabri/pages/about.jpg",
      "/images/projects/dr-shabri/pages/philosophy.jpg",
      "/images/projects/dr-shabri/pages/treatment-harmonisation.jpg",
      "/images/projects/dr-shabri/pages/treatment-full-face.jpg",
      "/images/projects/dr-shabri/pages/treatment-invisalign.jpg",
      "/images/projects/dr-shabri/pages/treatment-skinboosters.jpg",
      "/images/projects/dr-shabri/pages/contact.jpg",
      "/images/projects/dr-shabri/pages/gdc-regulations.jpg",
      "/images/projects/dr-shabri/pages/home-footer.jpg",
    ],
    pagesTitle: ["Sixty six pages that", "read as one practice."],
    pagesSubtitle:
      "The work on a site this size is consistency. Every treatment page carries the same structure, the same tone and the same route to an enquiry, so a patient who arrives on skin boosters from a Google search gets the same practice as one who arrives on the homepage. The regulatory page is held to the same standard as the rest, because a dental site is judged on that too.",
    relatedProjects: ["complete-dentist-academy", "blood-clinic", "kensington-scott"],
  },

  {
    slug: "onyx-lagree",
    title: "Onyx Lagree and Co",
    category: "AI-Powered",
    tags: [
      "AI-Accelerated",
      "Custom CMS",
      "Website Build",
      "Local SEO",
      "Booking Integration",
      "Fitness Studio",
    ],
    heroImage: "/images/projects/onyx-lagree/hero.jpg",
    thumbnailImage: "/images/projects/onyx-lagree/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Paige & Kacey / Onyx Lagree and Co",
      industry: "Lagree & Hot Mat Pilates Studio",
      location: "Auckley, Doncaster",
      website: "https://onyxlagreeandco.com/",
    },
    brief:
      "Two sisters opened the north of England's only Lagree studio. They had the space, the machines and a following watching the fit-out go up. What they did not have was anywhere to send them. No website, no booking link, not even a link in the Instagram bio, because there was nothing to put in it. We built the site, and then we built them a way to run it themselves without ever ringing us.",
    challenge: [
      "The whole business lived in a feed. Every enquiry arrived as a direct message, which meant somebody had to be holding a phone for the studio to take a booking, and anyone who scrolled past at eleven at night was gone.",
      "Nobody in Doncaster was searching for the studio by name, because nobody knew it existed. They were searching for Lagree and for reformer Pilates, and the studio had to be the answer to those searches or the launch would be carried entirely by the feed.",
      "Neither founder wanted to learn a website. Their words, not ours. A normal dashboard, a page builder and a login they use twice a year is how a site quietly goes out of date and starts lying to customers about prices.",
      "Half the facts did not exist yet when we started building. No confirmed prices, no timetable, no headshots. A site plastered in TBC reads as not open yet, which is the opposite of what a studio needs in its first month.",
      "Classes are run in TeamUp, which the studio manages itself. Typing the timetable onto the website as well would have meant two places to keep right, and one of them would have been wrong within a fortnight.",
    ],
    approach: [
      "The design was built first and the software second, so nothing got flattened to fit a template. Then we hand-built the site around it in PHP with its own database, which means every word and every price is real text on the page that Google can read, not something hidden inside an embed.",
      "Editing is the site itself. They open their own website, turn editing on, click the words and type. Click a photo and pick a different one. There is no dashboard to learn, no preview, no publish button to be frightened of. It saves as they go.",
      "Anything that grows, they grow themselves. Adding a membership, retiring a class, writing a new question and answer, putting a new instructor up with her photo. All of it is add and remove, not a phone call to us.",
      "Nothing they have not answered ever appears. A contact detail with no answer removes its own row rather than showing a placeholder, and the pricing section stays hidden until a real price exists. In editing mode they see every empty slot with a prompt in it, so the gaps are visible to them and invisible to customers.",
      "Local search was designed in, not bolted on. Every page opens with a plain answer to the question it is named after, the studio's details are published in a form Google and the AI assistants can read, and the address was validated against the Royal Mail database before it went anywhere near the page.",
      "The timetable is pulled live out of TeamUp, so what a customer sees is whatever the studio set this morning. If they ever want the hand-built version back, clearing one field in settings brings it back with no developer involved.",
      "AI accelerated the build. A bespoke site with its own content system, on a studio's opening budget, is not something a business this size normally gets offered.",
    ],
    features: [
      "Click-to-edit on the live page, no dashboard",
      "Photo swapping with a media library of past uploads",
      "Add and remove FAQs, classes, memberships and staff",
      "Live TeamUp timetable, managed in one place",
      "Enquiry inbox with spam traps, built in",
      "Page titles and descriptions the studio edits itself",
      "Local business and FAQ markup for Google and AI search",
      "Validated address, phone and hours in one place",
      "Cookie consent with analytics off by default",
      "Analytics and Search Console as paste-in fields",
      "Deploys that back up, verify and roll themselves back",
      "No plugins, no page builder, no monthly licences",
    ],
    results: {
      stats: [
        {
          value: "250+",
          label:
            "Pieces of the site the studio changes itself, by clicking them on the live page",
        },
        {
          value: "6 pages",
          label:
            "Live on opening week, with nothing marked TBC on any of them",
        },
        {
          value: "No plugins",
          label:
            "Nothing to license, renew or pay for monthly. The site is theirs outright",
        },
        {
          value: "One timetable",
          label:
            "Pulled live from the booking software they already run, so it is never typed twice",
        },
      ],
    },
    gallery: [
      "/images/projects/onyx-lagree/desktop.jpg",
      "/images/projects/onyx-lagree/mobile.jpg",
      "/images/projects/onyx-lagree/desktop-full.jpg",
    ],
    pages: [
      "/images/projects/onyx-lagree/pages/lagree-hero.jpg",
      "/images/projects/onyx-lagree/pages/lagree-compare.jpg",
      "/images/projects/onyx-lagree/pages/lagree-classes.jpg",
      "/images/projects/onyx-lagree/pages/method-grid.jpg",
      "/images/projects/onyx-lagree/pages/timetable-widget.jpg",
      "/images/projects/onyx-lagree/pages/timetable-pricing.jpg",
      "/images/projects/onyx-lagree/pages/contact-form.jpg",
    ],
    pagesTitle: ["The questions people ask", "before they book."],
    pagesSubtitle:
      "Most people arriving at a Lagree studio have never heard of Lagree. So the site answers that first, in plain words, before it asks anyone for anything. What the workout is, how it differs from Pilates, which of the two classes to start with, what it costs, and when the next one runs. The timetable is the studio's real schedule, live out of their booking software.",
    showcase: [
      "/images/projects/onyx-lagree/admin/edit-bar.jpg",
      "/images/projects/onyx-lagree/admin/edit-media-library.jpg",
      "/images/projects/onyx-lagree/admin/admin-staff.jpg",
      "/images/projects/onyx-lagree/admin/admin-seo.jpg",
      "/images/projects/onyx-lagree/admin/admin-settings.jpg",
    ],
    showcaseTitle: ["The bit they", "actually use."],
    showcaseSubtitle:
      "Neither founder wanted to learn a website, so there is nothing to learn. They open their own site, turn editing on, and the page tells them what to do: click any text to change it, click a photo to swap it. Photos come from a library of everything they have uploaded before. Instructors, prices, classes and questions all add and remove themselves. Even the titles Google shows in search results are theirs to write. Shown on the studio's own back office.",
    relatedProjects: ["blood-clinic", "body-lab", "warrior-movement"],
  },

  {
    slug: "blood-clinic",
    title: "The Blood Clinic UK",
    category: "AI-Powered",
    tags: [
      "AI-Accelerated",
      "Custom Platform",
      "Patient Portal",
      "Booking Engine",
      "WooCommerce",
      "Lab API",
    ],
    heroImage: "/images/projects/blood-clinic/hero.jpg",
    thumbnailImage: "/images/projects/blood-clinic/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Rich / The Blood Clinic UK",
      industry: "Private Blood Testing Clinic",
      location: "Sheffield, Retford & 65 clinics nationwide",
      website: "https://thebloodclinic.uk/",
    },
    brief:
      "A private blood testing clinic running on three outsourced plugins and around seven thousand lines of code nobody could safely touch. Bookings hung, results were hard to read, and a medical PDF could be downloaded by anyone who guessed the link. We rebuilt the whole thing: the booking engine, the patient portal, the reporting, the lab connection and the back office the owner runs it from.",
    challenge: [
      "The booking diary called the lab while the page was still loading, with no timeout set and nothing cached, on top of WooCommerce Bookings working out availability at the same time. Customers watched a spinner before they could pick a date, and some of them left.",
      "Patients got a plain lab PDF and a list of numbers. No context, no reference ranges they could read at a glance, no way to see whether a marker had moved since last time.",
      "Results PDFs sat on a public endpoint that never checked who was asking, and the results webhook accepted every caller, created accounts and wrote patient details into the error log.",
      "Orders were handed to the lab on the thank-you page with no queue and no retry. When it failed, nobody found out, which is exactly why nationwide bookings sometimes went quiet.",
      "When a booking could not be placed, the code deleted the order. A paid order, gone.",
      "Missing clinical fields were filled with hardcoded defaults, so a sample could reach the lab dated 31 December 2000 and marked male.",
      "There was no data model. Patients, registrations and results all lived in scattered WordPress meta, and nine paid plugins were propping the rest up.",
    ],
    approach: [
      "One plugin instead of three, with its own database tables for patients, registrations, results, appointments and a visible sync log. Every job that talks to the lab goes through a proper queue that retries, and every failure is something you can look at rather than guess at.",
      "The booking diary rebuilt around when work actually happens. The page paints straight away, both clinic calendars are fetched quietly in the background while the customer is still choosing a location, and the times for a single day are pulled only when that day is tapped. By the time anyone picks a clinic the month is already there.",
      "A patient portal that answers the question people actually have. A health snapshot at the top, anything outside its healthy range brought to the front, then a system-by-system view, then every marker with its reference range drawn as a gauge and its history behind a tap.",
      "The clinic's own branded PDF, built from the stored results rather than passing on the lab's template, carrying the doctor's letter, the gauges and the out-of-range flags. It is never emailed as an attachment: health data does not belong in an inbox, so the email links to a download that checks who is asking.",
      "A back office the owner runs without us. His clinic hours, closures, slot length, capacity, buffer and lead time, a colour-coded calendar of who is coming in, walk-in entry, the emails his customers receive, and reporting on revenue, locations, busiest days and test popularity.",
      "AI accelerated the build. A rebuild of this size, on a live clinic taking real orders, is not something a business this size gets offered otherwise.",
    ],
    features: [
      "Patient results portal with reference-range gauges",
      "Out-of-range markers surfaced first, with trends",
      "Plain-English guide to every marker tested",
      "Branded PDF report, behind a permission check",
      "Booking in three modes: clinic, nationwide, home kit",
      "Postcode and town finder across 65 clinics",
      "Owner-controlled diary, hours, closures and capacity",
      "Colour-coded admin calendar, synced to Google",
      "Walk-in entry with an other-lab safeguard",
      "Editable customer emails, separate from WooCommerce",
      "Revenue, location and test-popularity reporting",
      "Queued lab sync with retries and a visible log",
    ],
    results: {
      stats: [
        {
          value: "199,131",
          label: "Historic results migrated into the new portal, for 2,206 patients",
        },
        {
          value: "1,704",
          label: "Existing bookings moved into the new diary so no slot could be sold twice",
        },
        {
          value: "9 plugins",
          label: "Paid plugins retired, including WooCommerce Bookings",
        },
        {
          value: "No waiting",
          label: "A month of real availability is in hand before a customer picks a clinic",
        },
      ],
    },
    gallery: [
      "/images/projects/blood-clinic/desktop.jpg",
      "/images/projects/blood-clinic/mobile.jpg",
    ],
    pages: [
      "/images/projects/blood-clinic/portal/booking-1-method-crop.jpg",
      "/images/projects/blood-clinic/portal/booking-2-clinic-crop.jpg",
      "/images/projects/blood-clinic/portal/booking-3-calendar-crop.jpg",
      "/images/projects/blood-clinic/portal/booking-4-slots-crop.jpg",
    ],
    pagesTitle: ["Booking that does not", "keep you waiting."],
    pagesSubtitle:
      "Four taps from a test to a time. How you want to be tested, where, which day, which slot. The old diary made you wait on the lab before the page had even finished loading. This one loads first and does the waiting itself, in the background, while you are still reading.",
    showcase: [
      "/images/projects/blood-clinic/portal/portal-2-attention.jpg",
      "/images/projects/blood-clinic/portal/portal-3-systems.jpg",
      "/images/projects/blood-clinic/portal/portal-4-test.jpg",
      "/images/projects/blood-clinic/portal/portal-6-allmarkers.jpg",
      "/images/projects/blood-clinic/portal/portal-7-trend.jpg",
      "/images/projects/blood-clinic/portal/portal-9-guide.jpg",
    ],
    showcaseTitle: ["Your results, in", "a language you speak."],
    showcaseSubtitle:
      "Anything outside its healthy range comes first. Then a system-by-system read, then every marker against the range it should sit in, with its history behind a tap and a plain-English explanation of what it measures. Shown on a test account with demonstration results, not a patient's record.",
    relatedProjects: ["dixons-dispatch", "calibre-coaching"],
  },

  {
    slug: "dixons-dispatch",
    title: "Dixons Dispatch",
    category: "AI-Powered",
    tags: ["AI-Accelerated", "Website", "Custom Platform", "Operations CRM", "Driver App"],
    heroImage: "/images/projects/dixons-dispatch/hero.jpg",
    thumbnailImage: "/images/projects/dixons-dispatch/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Benn Dixon / Dixons Dispatch",
      industry: "ADR Class 7 & NHS Courier",
      location: "Stevenage, Hertfordshire",
      website: "https://dixonsdispatch.co.uk/",
    },
    brief:
      "A family courier firm that has carried radioactive and medical consignments for the NHS for over 40 years, being sold short by a dated listing site and run out of a 32-bit database with no future. We rebuilt both ends: a website that wins the specialist work, and a bespoke operations platform that runs the business behind it.",
    challenge: [
      "Their old site read like a general courier. The ADR Class 7 licensing, the radioactive work and four decades with the NHS were all buried, so they were being priced against firms who could not legally take the job.",
      "The office ran on a 32-bit Microsoft Access system being phased out at the end of 2026. Jobs, invoices and driver pay all lived somewhere with no support and no way forward.",
      "Quoting, invoicing and pay were manual. Prices worked out by hand off a spreadsheet, invoices raised one job at a time, month end done in Excel, vehicle checks on paper in a folder.",
      "Nothing joined up. A website enquiry did not become a job, and a delivered job did not become an invoice, so the same details were typed out three or four times.",
    ],
    approach: [
      "A website built around the work only they can take. A page per specialism, a page per area they cover, full schema and an FAQ written for AI search, so the search that matters finds the specialist rather than the nearest van.",
      "The quote form on the contact page is not a contact form. It saves the enquiry the moment someone types their name, asks for postcodes, weight, dimensions and ADR details, warns when a load will not fit the van, and lands straight on the job board as a live enquiry.",
      "A bespoke operations platform to replace the Access system, written in plain PHP so it runs on the hosting they already pay for. One database, three doors: the office, the drivers, and their customers.",
      "Pricing built from their own rate card. Two postcodes give the real driving miles for the round trip from base, their rate is applied, waiting time and extra drops are added, and the Congestion Charge, ULEZ, Dart Charge or M6 toll on that route is flagged before anyone is out of pocket.",
      "Month end down to a few clicks. Every job carries its price, the system groups them by account, raises one branded invoice per customer per month and one pay statement per driver, and emails them out with the PDF attached.",
      "AI accelerated the build. That is the only reason a firm this size gets a bespoke website and a platform of this scope at all, instead of another five years on the Access database.",
    ],
    features: [
      "Bespoke website built for AI and local search",
      "Quoting enquiry form straight to the job board",
      "Live job pipeline the office drags through stages",
      "Automatic round-trip mileage, tolls and ULEZ",
      "Monthly invoicing and driver pay, PDFs emailed out",
      "Paper vehicle checks digitised, with a defect board",
      "Installable driver app with photo proof of delivery",
      "Customer portal with one-click repeat bookings",
    ],
    results: {
      stats: [
        {
          value: "Replaces Access",
          label: "The 32-bit back office being phased out at the end of 2026",
        },
        {
          value: "One record",
          label: "Office, drivers and customers on the same live job",
        },
      ],
    },
    gallery: [
      "/images/projects/dixons-dispatch/desktop.jpg",
      "/images/projects/dixons-dispatch/mobile.jpg",
    ],
    pages: [
      "/images/projects/dixons-dispatch/service-adr.jpg",
      "/images/projects/dixons-dispatch/service-medical.jpg",
      "/images/projects/dixons-dispatch/areas.jpg",
      "/images/projects/dixons-dispatch/contact-form.jpg",
    ],
    pagesTitle: ["The work only they", "can take."],
    pagesSubtitle:
      "A page for each specialism and each area they cover, so the enquiry that is worth having lands on the right one. The quote form on the contact page is the front door of the platform, not a contact form.",
    showcase: [
      "/images/projects/dixons-dispatch/crm/crm-1-pipeline.jpg",
      "/images/projects/dixons-dispatch/crm/crm-2-quote.jpg",
      "/images/projects/dixons-dispatch/crm/crm-5-routes.jpg",
      "/images/projects/dixons-dispatch/crm/crm-3-invoices.jpg",
      "/images/projects/dixons-dispatch/crm/crm-4-checklists.jpg",
      "/images/projects/dixons-dispatch/crm/crm-6-reports.jpg",
    ],
    showcaseTitle: ["The system", "underneath."],
    showcaseSubtitle:
      "The half nobody sees, and the half that replaces the old database. The board the office works off, pricing a job while the customer is still on the phone, their rate card, month end, the paper vehicle checks made digital, and the numbers out the back. Names, registrations and figures shown here are demonstration data, not their live jobs.",
    relatedProjects: ["calibre-coaching", "physique-method"],
  },

  {
    slug: "calibre-coaching",
    title: "Calibre Coaching",
    category: "AI-Powered",
    tags: ["AI-Accelerated", "Website", "Custom CMS", "Built-in CRM", "Rebrand"],
    heroImage: "/images/projects/calibre-coaching/hero.jpg",
    thumbnailImage: "/images/projects/calibre-coaching/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Morgan Cox / Calibre Coaching",
      industry: "Online Transformation Coaching",
      location: "UK",
      website: "https://calibre-coaching.com/",
    },
    brief:
      "Calibre is a coaching team, not a one-man band, and the brand needed to look like it. We rebranded them, built the website to carry it, then put a proper content system and a client database underneath so the team can launch a new page or chase a new enquiry without waiting on us.",
    challenge: [
      "A team of coaches selling one standard. The old presence made them look like several separate people, so the standard never came across.",
      "Every new coach, offer or campaign meant another page. Paying an agency each time is slow and expensive, and slow kills a launch.",
      "Enquiries were arriving in scattered places. Anything that sits unanswered for a day is usually gone.",
    ],
    approach: [
      "Custom rebrand first, then a fully bespoke website built around it. No template, no theme, so the crimson design stays exact and they own the lot outright.",
      "A visual page builder where the team edits the real page, not a form. They click a headline and type on it, drag sections around, and build a whole new lead generation page from a styled starting point. The colours and type stay locked to the brand, so it cannot drift off-brand by accident.",
      "A CRM built into the same system. Every enquiry is stored first, then pushed onward, so a lead is never lost if an outside tool is down. Google Analytics is reported inside the admin in plain English, alongside coach call pages with live booking calendars.",
      "AI accelerated the build, which is why a custom platform came in at a fraction of the usual development cost. The design is ours, the craft is ours, and the saving went to the client.",
    ],
    features: [
      "Custom rebrand + bespoke website",
      "Visual on-page editor, no code",
      "Built-in CRM and lead inbox",
      "Lead generation page builder",
      "Coach call pages with live booking",
      "Analytics in plain English",
    ],
    gallery: [
      "/images/projects/calibre-coaching/desktop.jpg",
      "/images/projects/calibre-coaching/mobile.jpg",
      "/images/projects/calibre-coaching/desktop-full.jpg",
    ],
    showcase: [
      "/images/projects/calibre-coaching/admin/admin-1.jpg",
      "/images/projects/calibre-coaching/admin/admin-2.jpg",
      "/images/projects/calibre-coaching/admin/admin-3.jpg",
    ],
    showcaseTitle: ["The system", "behind it."],
    showcaseSubtitle:
      "The part clients never see and the team uses every week. Enquiries, pages, images and traffic in one place, with no monthly platform fee and nobody to ask for permission. Enquiry details are blurred here for privacy.",
    graphics: [
      "/images/projects/calibre-coaching/graphics/graphic-1.jpg",
      "/images/projects/calibre-coaching/graphics/graphic-2.jpg",
      "/images/projects/calibre-coaching/graphics/graphic-3.jpg",
      "/images/projects/calibre-coaching/graphics/graphic-4.jpg",
      "/images/projects/calibre-coaching/graphics/graphic-5.jpg",
      "/images/projects/calibre-coaching/graphics/graphic-6.jpg",
    ],
    graphicsTitle: ["The social", "side."],
    graphicsSubtitle:
      "The rebrand rolled out across social. Pinned grids, profile assets and highlight covers, one coach at a time, so a follower recognises Calibre wherever they land.",
    relatedProjects: ["physique-method", "sp26-bodybuilding"],
  },

  {
    slug: "physique-method",
    title: "Physique Method",
    category: "AI-Powered",
    tags: ["AI-Accelerated", "Website", "Custom CMS", "Lead Capture"],
    heroImage: "/images/projects/physique-method/hero.jpg",
    thumbnailImage: "/images/projects/physique-method/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Ashley Lewis / Physique Method",
      industry: "Elite Physique Coaching",
      location: "UK",
      website: "https://physiquemethod.co.uk/",
    },
    brief:
      "Ash is an IFBB Pro coaching competitors and high performers. His coaching is measured, precise and evidence-led, and the page had to feel like that before anyone reads a word. We built it, then handed him the keys so he can change any part of it himself.",
    challenge: [
      "Elite coaching sells on credibility. A generic template would have undersold a coach operating at pro level.",
      "The page needed to keep working after launch. Ash changes his stats, transformations and testimonials constantly, and paying for every edit would have meant the page slowly went stale instead.",
      "Enquiries had to arrive somewhere he would actually see them, on his phone, in seconds.",
    ],
    approach: [
      "A science and data visual language built from scratch: instrument panels, live readouts, a transformations gallery and a six-stage protocol. Bespoke design, nothing off the shelf.",
      "A custom back end where nearly every part of the page is editable. Headline, stats, transformations, coach bio, testimonials, FAQ, video, even the SEO. Ash and his partner both have their own logins, and changes go live the moment they save.",
      "Enquiries land in a built-in inbox with one-tap call and WhatsApp, and push straight into his CRM. Google Analytics is reported inside the admin in plain English rather than a dashboard he would never open.",
      "AI accelerated the build, which is how a bespoke site with its own content system landed at a fraction of the usual development cost. Ash owns it outright, with no monthly platform fee.",
    ],
    features: [
      "Bespoke design + custom build",
      "Full self-edit content system",
      "Enquiry inbox with call + WhatsApp",
      "CRM push on every enquiry",
      "Analytics in plain English",
      "Owned outright, no monthly fees",
    ],
    gallery: [
      "/images/projects/physique-method/desktop.jpg",
      "/images/projects/physique-method/mobile.jpg",
      "/images/projects/physique-method/desktop-full.jpg",
    ],
    showcase: [
      "/images/projects/physique-method/admin/admin-1.jpg",
      "/images/projects/physique-method/admin/admin-2.jpg",
      "/images/projects/physique-method/admin/admin-4.jpg",
      "/images/projects/physique-method/admin/admin-3.jpg",
    ],
    showcaseTitle: ["The back end,", "built for Ash."],
    showcaseSubtitle:
      "Every section of the page is a screen in here. No developer, no ticket, no waiting. He edits it, saves it, and it is live.",
    graphics: [
      "/images/projects/physique-method/graphics/graphic-1.jpg",
      "/images/projects/physique-method/graphics/graphic-2.jpg",
      "/images/projects/physique-method/graphics/graphic-3.jpg",
      "/images/projects/physique-method/graphics/graphic-4.jpg",
      "/images/projects/physique-method/graphics/graphic-5.jpg",
      "/images/projects/physique-method/graphics/graphic-6.jpg",
    ],
    graphicsTitle: ["The content", "engine."],
    graphicsSubtitle:
      "An ongoing carousel system in the same visual language as the site. Education-led, evidence-led, and instantly recognisable as Physique Method in a crowded feed.",
    relatedProjects: ["calibre-coaching", "sp26-bodybuilding"],
  },

  {
    slug: "spotlight-dance",
    title: "Spotlight School of Dance",
    category: "Web Design & Build",
    tags: ["Website", "WordPress", "Local SEO", "Hosting"],
    heroImage: "/images/projects/spotlight-dance/hero.jpg",
    thumbnailImage: "/images/projects/spotlight-dance/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Spotlight School of Dance",
      industry: "Dance School",
      location: "Sheffield, UK",
      website: "https://www.spotlight-schoolofdance.co.uk/",
    },
    brief:
      "Forty years of teaching Sheffield to dance, and a website that told none of it. Parents searching for a class locally were meeting a dated page instead of one of the few schools in the city set up for every child, whatever their needs.",
    challenge: [
      "Four decades of history and an award-winning inclusion programme, none of it visible. The site was actively underselling the school.",
      "Parents decide fast and on a phone. Class, age, day, place, price. If those answers are buried, they book somewhere else.",
      "Local search is where this is won. If you do not come up for dance classes in Sheffield, the rest of it does not matter.",
    ],
    approach: [
      "A warm, confident rebuild that leads with the two things nobody else can claim: over 40 years of teaching, and classes genuinely open to every age and every ability.",
      "Structure built around how a parent actually chooses. Classes by style and age, a clear timetable, and a free trial as the obvious next step from every page.",
      "Full on-page SEO across every live page, targeting the real local searches, plus hosting, SSL and security handled so the school never has to think about it.",
    ],
    features: [
      "Full website rebuild",
      "Free trial booking as the primary CTA",
      "Classes + timetable structure",
      "Inclusion programmes given their own home",
      "On-page SEO across every page",
      "Hosting, SSL + security",
    ],
    gallery: [
      "/images/projects/spotlight-dance/desktop.jpg",
      "/images/projects/spotlight-dance/mobile.jpg",
      "/images/projects/spotlight-dance/desktop-full.jpg",
    ],
    relatedProjects: ["sensory-emergency", "body-lab"],
  },

  {
    slug: "sp26-bodybuilding",
    title: "SP26 Bodybuilding",
    category: "Web Design & Build",
    tags: ["Website", "Custom Build", "Booking Platform", "Claude Code", "WordPress"],
    heroImage: "/images/projects/sp26-bodybuilding/hero.jpg",
    thumbnailImage: "/images/projects/sp26-bodybuilding/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "SP26 Bodybuilding",
      industry: "Private Gym",
      location: "Shirebrook, UK",
      website: "https://sp26bodybuilding.com/",
    },
    brief:
      "Most new gyms open with an Instagram page and a booking link. SP26 opened with this: a custom designed and built website shaped around how the gym actually sells, with their own booking platform built directly into it.",
    challenge: [
      "Launching new is the hardest position to sell from, because nobody knows you yet. The website does the introducing, and if it looks thrown together, so do you.",
      "The gym sells in five different ways: private hire, PT sessions, shoots, seminars and day passes. A template wouldn't carry that.",
      "A proper booking platform is the part most new businesses get priced out of. Renting an off-brand booking app forever wasn't the answer.",
    ],
    approach: [
      "Custom design and build, no template, shaped around how the gym actually sells.",
      "Their own booking platform, built directly into the site. Customers pick a session, pick a date and time, and the team confirms with one click. No DM back-and-forth.",
      "Custom booking software normally means serious development money. We built theirs with Claude Code as their own WordPress plugin, in a fraction of the usual development time, and that saving went straight to the client. They own it outright, no monthly fees, built exactly how they work. The design is ours, the craft is ours. AI comes in where it cuts the cost of custom work, not the quality of it.",
    ],
    features: [
      "Custom design + WordPress build",
      "Own booking platform, built in",
      "One-click booking confirmations",
      "Built with Claude Code",
      "Owned outright, no monthly fees",
      "Mobile-first responsive",
    ],
    testimonial: {
      quote:
        "Alex and the team came as a recommendation and they definitely lived up to expectations and beyond. Patience, attention to detail, prompt turnaround. Literally, craftsmen in their field. I'd recommend AW Media's service to anyone and everyone looking for a team that are truly dialled into their line of work.",
      name: "SP26 Bodybuilding",
      role: "Private Gym, Shirebrook",
    },
    gallery: [
      "/images/projects/sp26-bodybuilding/desktop.jpg",
      "/images/projects/sp26-bodybuilding/mobile.jpg",
      "/images/projects/sp26-bodybuilding/desktop-full.jpg",
    ],
    graphics: [
      "/images/projects/sp26-bodybuilding/booking/booking-1.jpg",
      "/images/projects/sp26-bodybuilding/booking/booking-2.jpg",
      "/images/projects/sp26-bodybuilding/booking/booking-3.jpg",
    ],
    graphicsTitle: ["The booking", "platform."],
    graphicsSubtitle:
      "Customers pick a session, pick a date and time, and the team confirms with one click. Built with Claude Code as SP26's own WordPress plugin. They own it outright, no monthly fees, built exactly how they work.",
    relatedProjects: ["body-lab", "drug-free-bodybuilding"],
  },

  {
    slug: "mind-muscle-movement",
    title: "The Mind and Muscle Movement",
    category: "Web Design & Build",
    tags: ["Website", "Landing Page", "Custom Build", "Hosting", "SSL"],
    heroImage: "/images/projects/mind-muscle-movement/hero.jpg",
    thumbnailImage: "/images/projects/mind-muscle-movement/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Darren Cusack / The Mind and Muscle Movement",
      industry: "1:1 Online Coaching",
      location: "UK",
      website: "https://themindandmusclemovement.com/",
    },
    brief:
      "Darren's coaching is premium, but his online presence wasn't telling that story, so good-fit clients were landing and leaving without enquiring. We gave him a site that finally matches the level he delivers and gives people the confidence to get in touch. Custom designed and built around his brand, not a template.",
    challenge: [
      "Darren needed an online presence that matched the standard of his coaching, not a templated stopgap.",
      "The page had to build instant trust and move visitors to enquire.",
      "It needed room to grow with the business, without a rebuild every time it took a step forward.",
    ],
    approach: [
      "Custom designed and built around his brand, so it looks like him and nobody else.",
      "Full hosting, SSL and security handled end to end.",
      "Built so he can update and scale the site as the business develops.",
    ],
    features: [
      "Custom design + development",
      "Conversion-focused landing page",
      "Hosting, SSL + security",
      "Built to update + scale",
      "Mobile-first responsive",
      "Fast, considered build",
    ],
    testimonial: {
      quote:
        "Alex and Paul have been phenomenal to work with. Their attention to detail, quick turnaround times, and expert level knowledge made what could have been a stressful process genuinely enjoyable. They went above and beyond at every stage, and the finished product speaks for itself. Clean, professional, and exactly what I had in mind, only better. Cannot recommend them highly enough. If you're looking for a team that actually cares about getting it right, look no further.",
      name: "Darren Cusack",
      role: "The Mind and Muscle Movement",
    },
    gallery: [
      "/images/projects/mind-muscle-movement/desktop.jpg",
      "/images/projects/mind-muscle-movement/mobile.jpg",
      "/images/projects/mind-muscle-movement/desktop-full.jpg",
    ],
    relatedProjects: ["lifefit-physique", "wlwt-coaching"],
  },

  {
    slug: "lifefit-physique",
    title: "LifeFit Physique",
    category: "Web Design & Build",
    tags: ["Website", "Custom Build", "WordPress", "SEO", "Hosting"],
    heroImage: "/images/projects/lifefit-physique/hero.jpg",
    thumbnailImage: "/images/projects/lifefit-physique/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "George Mead / LifeFit Physique",
      industry: "Online Coaching",
      location: "UK",
      website: "https://lifefitphysique.co.uk/",
    },
    brief:
      "George's coaching deserved an online home that worked as hard as he does. We built him a site that turns visitors into enquiries and matches the level he delivers, so clients feel confident getting in touch. A proper custom build, not a half-finished side project.",
    challenge: [
      "George needed a website that worked as hard as he does, turning visitors into enquiries rather than letting them leave.",
      "It had to be found, which meant proper Google and SEO setup, not just a pretty page.",
      "Every page needed one job: move people from landing to getting in touch.",
    ],
    approach: [
      "Custom design and custom WordPress build from scratch.",
      "Full website security, reliable hosting, and Google setup with SEO so he can actually be found.",
      "Every page designed to convert. No fluff, no filler.",
    ],
    features: [
      "Custom design + WordPress build",
      "Conversion-focused pages",
      "Google + SEO setup",
      "Website security",
      "Reliable, fast hosting",
      "Mobile-first responsive",
    ],
    testimonial: {
      quote:
        "Just had my brand brought to life by Alex and the team and I couldn't be happier with how it's turned out and how professional it all looks. Really does stand out to what we're all about and offer. Any updates and changes was no issue to get it how I wanted and I'm coming back for more graphics design.",
      name: "George Mead",
      role: "LifeFit Physique",
    },
    gallery: [
      "/images/projects/lifefit-physique/desktop.jpg",
      "/images/projects/lifefit-physique/mobile.jpg",
      "/images/projects/lifefit-physique/desktop-full.jpg",
    ],
    relatedProjects: ["mind-muscle-movement", "dr-rio"],
  },

  {
    slug: "dr-rio",
    title: "Dr Rio",
    category: "Web Design & Build",
    tags: ["Website", "Landing Page", "Logo", "SEO", "Hosting"],
    heroImage: "/images/projects/dr-rio/hero.jpg",
    thumbnailImage: "/images/projects/dr-rio/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Dr Rio Harrison",
      industry: "Doctor-Led Aesthetics",
      location: "Sheffield, UK",
      website: "https://drrio.co.uk/",
    },
    brief:
      "Dr Rio specialises in doctor-led aesthetic treatments that enhance natural beauty. She needed a professional online presence that reflected the quality of her work and converted visitors into bookings.",
    challenge: [
      "Aesthetics is a trust-led purchase. The site had to communicate professionalism and medical credibility from the first scroll.",
      "It needed to convert visitors into actual bookings, not just look good.",
      "Local discovery mattered, so it had to be found by the right people nearby.",
    ],
    approach: [
      "Custom website design and development with a clean, modern, premium feel.",
      "Logo design plus hosting, SSL and security handled end to end.",
      "SEO setup for local search visibility so she ranks where it counts.",
    ],
    features: [
      "Custom design + development",
      "Logo design",
      "Conversion-focused landing page",
      "Local SEO setup",
      "Hosting, SSL + security",
      "Mobile-first responsive",
    ],
    testimonial: {
      quote:
        "I was genuinely so impressed with the service from AW Media. From our very first Zoom meeting, the team really took the time to understand exactly what I wanted for my website and logo, as well as the time frame I was working with. The whole process was seamless, professional, friendly, and efficient from start to finish. They gave me constructive feedback and worked collaboratively with me to bring my vision to life, capturing exactly what I had in mind and more. Nothing was ever too much trouble, and communication was always clear and prompt. I'm absolutely over the moon with the final website and logo. They look fantastic and perfectly reflect my brand. I can't recommend AW Media highly enough and will definitely be using them again for future projects.",
      name: "Dr Rio Harrison",
      role: "Dr Rio Aesthetics",
    },
    gallery: [
      "/images/projects/dr-rio/desktop.jpg",
      "/images/projects/dr-rio/mobile.jpg",
      "/images/projects/dr-rio/desktop-full.jpg",
    ],
    relatedProjects: ["lifefit-physique", "kensington-scott"],
  },

  {
    slug: "b3x-graphics",
    title: "B3x Graphics",
    category: "Web Design & Build",
    tags: ["Website", "E-Commerce", "Design + Dev", "Custom Build"],
    heroImage: "/images/projects/b3x-graphics/hero.jpg",
    thumbnailImage: "/images/projects/b3x-graphics/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "B3x Graphics",
      industry: "Graphic Design & Art Direction",
      location: "UK",
      website: "https://b3xgraphics.com/",
    },
    brief:
      "B3x Graphics is a freelance art director and designer with a serious body of work for big-name brands. He needed a site that did the work justice: part portfolio, part shop, all built to win new projects.",
    challenge: [
      "A designer's own site has to clear a high bar. The work is the product, so the site had to look as sharp as the portfolio it carries.",
      "It needed to sell, not just show, with an e-commerce layer alongside the portfolio.",
      "Fast, smooth and bold, with the design-led feel a creative's clients expect.",
    ],
    approach: [
      "Full custom design and development, built around the work and the brand's electric-blue identity.",
      "E-commerce baked in so products and services can be sold directly from the site.",
      "Hosting, security and SSL handled, with a build that's quick to update as the portfolio grows.",
    ],
    features: [
      "Custom design + development",
      "E-commerce store",
      "Portfolio-led layout",
      "Bold, design-forward UI",
      "Hosting, SSL + security",
      "Mobile-first responsive",
    ],
    gallery: [
      "/images/projects/b3x-graphics/desktop.jpg",
      "/images/projects/b3x-graphics/mobile.jpg",
      "/images/projects/b3x-graphics/desktop-full.jpg",
    ],
    relatedProjects: ["wlwt-coaching", "sensory-emergency"],
  },

  {
    slug: "wlwt-coaching",
    title: "Weight Loss With Tarn",
    category: "Web Design & Build",
    tags: ["Website", "Custom Build", "Hosting", "SSL"],
    heroImage: "/images/projects/wlwt-coaching/hero.jpg",
    thumbnailImage: "/images/projects/wlwt-coaching/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Tarn Kaur / Weight Loss With Tarn",
      industry: "Online Weight Loss Coaching",
      location: "UK",
      website: "https://wlwtcoaching.com/",
    },
    brief:
      "Tarn Kaur went from corporate lawyer to fat-loss coach: 127k followers, 1,500+ transformations, helping busy women lose 10-40kg and keep it off. She came to us for a landing page, but the business was scaling fast and one page was never going to be enough.",
    challenge: [
      "A single landing page wouldn't keep up with a business growing this quickly. It needed room to scale.",
      "High-profile coach with a huge audience: the site had to convert enquiries while matching the brand's energy.",
      "Foundations had to be built properly so future pages could be added without a rebuild.",
    ],
    approach: [
      "Started with the landing page, but architected it as the first page of a full multi-page website from day one.",
      "Custom designed and custom built: bold, on-brand, conversion-focused, with hosting, SSL and security all sorted.",
      "Because the foundation was right, scaling from one page to a full site was straightforward. No starting over, no rebuild, just building on what was already there.",
    ],
    features: [
      "Custom multi-page website",
      "Conversion-focused landing page",
      "Bespoke design + build",
      "Hosting, SSL + security",
      "Built to scale with the business",
      "Mobile-first responsive",
    ],
    testimonial: {
      quote:
        "Just wanted to say a huge thank you to you and the whole AW Media team for absolutely smashing the design and development of my website. Honestly from start to finish you've all been incredible to work with. Professional, patient, creative and genuinely invested in bringing my vision to life properly. It never felt like “just another project” and that really shows in the final result. The attention to detail, communication, speed and overall experience has been unreal. Nothing was ever too much and you made the whole process feel easy, even when I had a million ideas and changes flying around. I'm genuinely so happy with how everything has come together. Couldn't recommend AW Media enough!",
      name: "Tarn Kaur",
      role: "Weight Loss With Tarn",
    },
    gallery: [
      "/images/projects/wlwt-coaching/desktop.jpg",
      "/images/projects/wlwt-coaching/mobile.jpg",
      "/images/projects/wlwt-coaching/desktop-full.jpg",
    ],
    relatedProjects: ["sensory-emergency", "thecoachconsultant"],
  },

  {
    slug: "sensory-emergency",
    title: "Sensory Emergency",
    category: "Web Design & Build",
    tags: ["Website", "Custom Build", "Hosting", "Good Cause"],
    heroImage: "/images/projects/sensory-emergency/hero.jpg",
    thumbnailImage: "/images/projects/sensory-emergency/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Wade / Sensory Emergency",
      industry: "Mobile Sensory Support (SEND)",
      location: "Sheffield, UK",
      website: "https://sensoryemergency.co.uk/",
    },
    brief:
      "Wade runs Sensory Emergency, a mobile sensory support service bringing calm to Sheffield's SEND children at events, parties and big days out. The Sensory Ambulance is a converted medical vehicle turned into a safe, controlled space where children can re-centre when the world gets overwhelming.",
    challenge: [
      "A genuinely good cause that needed a website to grow the business and reach more families who need it.",
      "The site had to communicate a sensitive, specialist service with warmth and clarity.",
      "Bookings needed to be easy to find and act on, with room to scale as demand grows.",
    ],
    approach: [
      "Custom website design and build, shaped around the mission and the families it serves.",
      "Hosting, security and SSL all handled, plus support on how to use bookings effectively.",
      "A site built for growth, reaching more families and growing the service sustainably.",
    ],
    features: [
      "Custom website design + build",
      "Hosting, security + SSL",
      "Booking-focused structure",
      "Built for growth",
      "Mobile-first responsive",
      "Cause-led design",
    ],
    testimonial: {
      quote:
        "Alex and his team are absolutely wizards of the game. Not only do they bring the vision to life through your website, they are really supportive, honest and reliable. They are happy to discuss your ideas and give advice from their experience and expertise to make sure you don't spend unnecessarily and get the best from your site. Alex and Paul who helped me with mine also did so off their own back to help us in our mission to help children with additional needs. I can't thank them enough or give the praise they truly deserve. I will always send people this way. Here's to a long working relationship.",
      name: "Wade",
      role: "Sensory Emergency",
    },
    gallery: [
      "/images/projects/sensory-emergency/desktop.jpg",
      "/images/projects/sensory-emergency/mobile.jpg",
      "/images/projects/sensory-emergency/desktop-full.jpg",
    ],
    relatedProjects: ["wlwt-coaching", "thecoachconsultant"],
  },

  {
    slug: "team-procoach",
    title: "Team Procoach",
    category: "Web Design & Build",
    tags: ["Website", "Landing Pages", "Social Graphics", "Ongoing"],
    heroImage: "/images/projects/team-procoach/hero.jpg",
    thumbnailImage: "/images/projects/team-procoach/thumb.jpg",
    hasImages: true,
    year: "2025 / Ongoing",
    client: {
      name: "Team Procoach",
      industry: "Comp Prep & Physique Coaching",
      location: "UK",
      website: "https://teamprocoach.com/",
    },
    brief:
      "Team Procoach is the UK's leading comp prep and physique coaching team. We rebuilt their website from the ground up, layered in dedicated lead generation pages, and run a weekly social graphics pack that keeps the brand sharp across every launch and content drop.",
    challenge: [
      "Their previous site looked like every other coaching brand in the space. For a team carrying 8 IFBB Pro Cards, 430+ first-place finishes, and Olympia qualifications, it didn't reflect the level.",
      "Comp prep and physique coaching are two very different services with two very different buyers. They needed clear, separate paths into each offer without splitting the brand in half.",
      "Content output is constant: new launches, athlete wins, education resources, social posts. Without a system, every week was a scramble and the visuals drifted off-brand.",
    ],
    approach: [
      "We started with positioning. Team Procoach isn't a coach, it's a roster. Champions, pros, and prep specialists under one banner. We built the site around that idea: bold, dark, IFBB-grade, with the trophy count up top so visitors get the credibility hit in the first three seconds.",
      "The homepage gives a single clear message and two CTAs: Comp Prep Enquiry and Physique Enquiry. Each one drops into a dedicated lead generation landing page tailored to that specific buyer, with the right proof, the right copy, and the right next step.",
      "On the content side we run an ongoing graphics retainer: launches, athlete features, education carousels, and weekly social posts. Every asset is on-brand, properly designed, and shipped fast enough to keep up with the team's output.",
    ],
    features: [
      "Full website rebuild on a custom on-brand design system",
      "Dedicated Comp Prep + Physique lead generation landing pages",
      "Trophy strip + credibility-first hero (430 x 1st, 758 x top 3, 102 x overalls)",
      "Athlete roster, coach intros, eBook funnel, YouTube integration",
      "Weekly social graphics pack (launches, education, athlete features)",
      "Ongoing creative direction across web + social",
    ],
    testimonial: {
      quote:
        "Working with AW Media has allowed us to effectively build brand awareness, presenting our latest launches, education resources and social posts in the best possible way. He brings creative input throughout. We will forever be a long term client. The delivery is exceptional.",
      name: "Team Procoach",
      role: "Comp Prep + Physique Coaching, UK",
    },
    gallery: [
      "/images/projects/team-procoach/desktop.jpg",
      "/images/projects/team-procoach/mobile.jpg",
      "/images/projects/team-procoach/desktop-full.jpg",
    ],
    graphics: [
      "/images/projects/team-procoach/graphics/post-1-slide-01.jpg",
      "/images/projects/team-procoach/graphics/post-2-slide-01.jpg",
      "/images/projects/team-procoach/graphics/post-3-slide-01.jpg",
      "/images/projects/team-procoach/graphics/post-1-slide-03.jpg",
      "/images/projects/team-procoach/graphics/post-2-slide-04.jpg",
      "/images/projects/team-procoach/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["thecoachconsultant", "strength-in-us"],
  },

  {
    slug: "thecoachconsultant",
    title: "The Coach Consultant",
    category: "Web Design & Build",
    tags: ["Website", "Bespoke Design", "Hosting", "SSL"],
    heroImage: "/images/projects/thecoachconsultant/hero.jpg",
    thumbnailImage: "/images/projects/thecoachconsultant/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "The Coach Consultant",
      industry: "Coaching Consultancy",
      location: "UK",
      website: "https://thecoachconsultant.uk/",
    },
    testimonial: {
      quote: "I've worked with Alex for 10 years now. Why would I work with the same guy for 10 years? You run it on performance, reliability, deliverability. Websites, funnels, graphic designs, socials - never missed. He does not care about you going back 25 times as long as it's done right. You'll have the same type of reliability, consistency, and performance that I've had for the last decade of my career and the next decade to come.",
      name: "The Coach Consultant",
      role: "Client of 10 years",
    },
    brief:
      "A brand-new consultancy needs to look established from day one. We gave them a site that makes them credible the moment someone lands and sets the visual tone for the whole business. Full design, hosting, SSL and ongoing support handled together, so they manage none of it.",
    challenge: [
      "No existing brand assets to work from. The site had to define the visual identity and set the tone for the whole business.",
      "The launch was tied to a wider campaign, so the build had to stay tight to schedule without cutting corners on design.",
      "Needed full hosting, SSL, and ongoing support baked in. They didn't want to manage tech stacks across multiple providers.",
    ],
    approach: [
      "We ran a focused discovery, locked the design direction early, and built a fully bespoke site around their brand, designed from scratch to feel like them.",
      "We handled hosting, SSL, and domain setup as part of the package. One bill, one point of contact, zero friction.",
      "The result: a considered, premium site that makes a brand-new consultancy look established and credible from day one.",
    ],
    features: [
      "Fully bespoke, custom design",
      "Brand-defining visual direction",
      "Hosting and SSL included",
      "Conversion-focused structure",
      "Mobile-first responsive build",
      "Ongoing support baked in",
    ],
    gallery: [
      "/images/projects/thecoachconsultant/desktop.jpg",
      "/images/projects/thecoachconsultant/mobile.jpg",
      "/images/projects/thecoachconsultant/desktop-full.jpg",
    ],
    relatedProjects: ["titanom", "kensington-scott"],
  },

  {
    slug: "hotchen-construction",
    title: "Hotchen Construction",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Hosting Transfer"],
    heroImage: "/images/projects/hotchen-construction/hero.jpg",
    thumbnailImage: "/images/projects/hotchen-construction/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Hotchen Construction",
      industry: "Construction",
      location: "UK",
      website: "https://hotchenconstruction.com/",
    },
    brief:
      "Hotchen's builds are high quality; their old site didn't say so. We rebuilt it to read like a portfolio of that build quality, so it earns trust from bigger-job enquiries, and moved their email and hosting across with zero downtime.",
    challenge: [
      "Existing site was hosted elsewhere with email tied to it. Any rebuild had to handle a clean transfer with zero downtime on mail.",
      "Construction marketing tends to fall into two camps: generic stock photos, or DIY photos that look amateur. They needed something better.",
      "Needed a CMS the team could actually use to update content themselves after launch.",
    ],
    approach: [
      "We migrated email and hosting cleanly across to a managed setup, then rebuilt the site bespoke in WordPress with a custom design system tailored to the brand.",
      "Big, confident photography of real work, clear service breakdowns, and trust signals throughout. The site reads like a portfolio of the build quality.",
      "WordPress gives them full control post-launch. Add a new project, swap out a hero image, post a testimonial. No developer needed.",
    ],
    features: [
      "Bespoke design + WordPress build",
      "Email and hosting transfer with zero downtime",
      "Project portfolio CMS",
      "Service breakdown pages",
      "Local SEO optimisation",
      "Self-service editing for the team",
    ],
    gallery: [
      "/images/projects/hotchen-construction/desktop.jpg",
      "/images/projects/hotchen-construction/mobile.jpg",
      "/images/projects/hotchen-construction/desktop-full.jpg",
    ],
    relatedProjects: ["nick-firth-tiles", "crown-labels"],
  },

  {
    slug: "nick-firth-tiles",
    title: "Nick Firth Tiles",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "E-commerce Roadmap"],
    heroImage: "/images/projects/nick-firth-tiles/hero.jpg",
    thumbnailImage: "/images/projects/nick-firth-tiles/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Nick Firth Tiles",
      industry: "Tiles & Stone",
      location: "UK",
      website: "https://nickfirthtiles.com/",
    },
    brief:
      "Nick Firth's tiles are a beautiful product a weak old site wasn't doing justice. We gave them a gallery-led site that shows the range off properly and is ready to grow into a full online store when they are. It started generating sales in its first week live.",
    challenge: [
      "Highly visual product, weak existing presentation. The tiles deserved a site that could do them justice.",
      "Customers shop for tiles by colour, finish, and use case. The architecture had to support discovery, not bury products in menus.",
      "Long-term plan is full e-commerce. The site needed to launch as a brochure but scale cleanly into a shop.",
    ],
    approach: [
      "We designed a clean, gallery-led brochure site that puts product photography front and centre. Colour stories, room mockups, and category browsing all built in.",
      "WooCommerce-ready structure under the hood, so the upgrade to online sales is a switch-on, not a rebuild.",
      "Clear enquiry funnels for trade and retail buyers, with separate journeys mapped for each.",
    ],
    features: [
      "Bespoke design + WordPress build",
      "Gallery-led product showcase",
      "Trade + retail enquiry routing",
      "E-commerce architecture under the hood",
      "Mobile-first responsive layouts",
      "Scalable category structure",
    ],
    testimonial: {
      quote: "A website to be proud of. Alex really understood the brief and delivered a fantastic website. At Nick Firth Tiles we're all really proud of our new website. It's been up for one week and we've had some great feedback, it has already started to generate sales. Communication was good throughout the process. I would highly recommend.",
      name: "Scott",
      role: "Nick Firth Tiles",
    },
    gallery: [
      "/images/projects/nick-firth-tiles/desktop.jpg",
      "/images/projects/nick-firth-tiles/mobile.jpg",
      "/images/projects/nick-firth-tiles/desktop-full.jpg",
    ],
    relatedProjects: ["hotchen-construction", "crown-labels"],
  },

  {
    slug: "crown-labels",
    title: "Crown Labels",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Hosting Transfer"],
    heroImage: "/images/projects/crown-labels/hero.jpg",
    thumbnailImage: "/images/projects/crown-labels/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Crown Labels",
      industry: "Print & Labels",
      location: "UK",
      website: "https://crownlabels.co.uk/",
    },
    brief:
      "Crown Labels' work is sharp, but a slow, dated site was undercutting it in front of procurement buyers. We gave them a fast, modern B2B presence that sells their capability before the sales call, and moved them onto hosting that actually keeps up.",
    challenge: [
      "Old site was hosted with a provider that couldn't keep up. Slow load, frequent issues, no flexibility.",
      "Industrial B2B sites often look dated by default. They wanted something modern that still felt credible to procurement buyers.",
      "Wide product range across labels, packaging, and print services. The structure had to make finding the right product fast.",
    ],
    approach: [
      "Migrated hosting to a managed setup with better performance and uptime. Then built the site bespoke in WordPress with a clean, modern industrial aesthetic.",
      "Product taxonomy designed around how buyers actually search: by material, application, and finish. Not by internal departments.",
      "Strong proof throughout: case studies, certifications, and machinery on display. The site sells the capability before the sales call.",
    ],
    features: [
      "Hosting migration + bespoke WordPress build",
      "Industrial-modern visual language",
      "Buyer-led product taxonomy",
      "Capability showcase + machinery gallery",
      "Quote request system",
      "Optimised for procurement buyer journeys",
    ],
    gallery: [
      "/images/projects/crown-labels/desktop.jpg",
      "/images/projects/crown-labels/mobile.jpg",
      "/images/projects/crown-labels/desktop-full.jpg",
    ],
    relatedProjects: ["hotchen-construction", "nick-firth-tiles"],
  },

  {
    slug: "body-lab",
    title: "The Body Lab",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Hosting Transfer"],
    heroImage: "/images/projects/body-lab/hero.jpg",
    thumbnailImage: "/images/projects/body-lab/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "The Body Lab",
      industry: "Personal Training Studio",
      location: "Wiltshire, UK",
      website: "https://thebodylabwiltshire.co.uk/",
    },
    brief:
      "In a crowded Wiltshire fitness market where every gym site looks the same, The Body Lab needed to instantly read 'this one's different'. We gave them a premium site that matches the experience inside the studio and turns local searches into booked sessions.",
    challenge: [
      "Existing setup was on hosting that didn't scale. They needed reliability and speed before any redesign would land properly.",
      "Local fitness market is crowded. Most gym sites look the same. Theirs had to instantly read 'this is different'.",
      "Multiple offers (1:1 PT, group classes, body composition) that all needed clear paths without bloating the site.",
    ],
    approach: [
      "Hosting transferred clean. Then we rebuilt the site bespoke in WordPress with a confident, premium aesthetic that matches the experience inside the studio.",
      "Each service has its own dedicated section with proof, pricing, and a clear booking next step. No buried offers, no ambiguity.",
      "Local SEO baked in from day one. Schema, Google Business Profile integration, and proper structured data for Wiltshire searches.",
    ],
    features: [
      "Hosting transfer + bespoke WordPress build",
      "Premium studio-led visual design",
      "Multiple service paths (PT, classes, body comp)",
      "Booking + enquiry integrations",
      "Local SEO + schema markup",
      "Mobile-first responsive",
    ],
    testimonial: {
      quote: "Absolutely amazing. Alex and Paul were really patient and understanding when I was trying to figure out exactly what I wanted, nothing felt like it was too much trouble. They really care about making sure you feel happy with the end result. I love the new website, it's far exceeded my expectations. I can't recommend AW Media highly enough.",
      name: "The Body Lab",
      role: "Personal Training Studio, Wiltshire",
    },
    gallery: [
      "/images/projects/body-lab/desktop.jpg",
      "/images/projects/body-lab/mobile.jpg",
      "/images/projects/body-lab/desktop-full.jpg",
    ],
    relatedProjects: ["team-procoach", "drug-free-bodybuilding"],
  },

  {
    slug: "quickfit-ev",
    title: "QuickFit EV",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Booking"],
    heroImage: "/images/projects/quickfit-ev/hero.jpg",
    thumbnailImage: "/images/projects/quickfit-ev/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "QuickFit EV",
      industry: "EV Charger Installation",
      location: "UK",
      website: "https://quickfitev.co.uk/",
    },
    testimonial: {
      quote: "I've worked with Alex and AW Media on a few different businesses and can't recommend them enough. Nothing's too much trouble and everything gets sorted. This project was an online shop to make the EV charger journey as simple as possible and Alex and the team have gone above and beyond.",
      name: "Ollie",
      role: "QuickFit EV",
    },
    brief:
      "EV charging is booming, and half the competition still looks stuck in 2018. We gave QuickFit EV a modern site that pre-qualifies enquiries before they hit the inbox, so they spend less time chasing tyre-kickers and more time installing.",
    challenge: [
      "EV charging is exploding. Half the competition still has 2018-era websites. They needed to look like the modern operator they are.",
      "Lead quality matters more than volume. The site had to qualify enquiries upfront: domestic vs. commercial, charger type, install location.",
      "Trust matters. EV install is a £1k+ purchase. Visitors needed clear proof of certifications, warranties, and recent work.",
    ],
    approach: [
      "Clean, modern, tech-forward design language. Strong photography of installs, real engineers, real homes and businesses.",
      "Built a smart enquiry flow that pre-qualifies leads before they land in the inbox. Less time chasing tyre-kickers, more time converting real buyers.",
      "Trust signals layered throughout: OZEV approval, electrician certifications, manufacturer partnerships, recent install gallery.",
    ],
    features: [
      "Bespoke design + WordPress build",
      "Smart lead qualification form",
      "Domestic + commercial install paths",
      "Certification + trust signal layout",
      "Install gallery CMS",
      "Mobile-first responsive",
    ],
    gallery: [
      "/images/projects/quickfit-ev/desktop.jpg",
      "/images/projects/quickfit-ev/mobile.jpg",
      "/images/projects/quickfit-ev/desktop-full.jpg",
    ],
    relatedProjects: ["hotchen-construction", "crown-labels"],
  },

  {
    slug: "drug-free-bodybuilding",
    title: "Drug Free Bodybuilding",
    category: "Web Design & Build",
    tags: ["WordPress", "WooCommerce", "E-commerce", "Bespoke Design"],
    heroImage: "/images/projects/drug-free-bodybuilding/hero.jpg",
    thumbnailImage: "/images/projects/drug-free-bodybuilding/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Drug Free Bodybuilding",
      industry: "Federation / Events / Merch",
      location: "UK",
      website: "https://drugfreebodybuilding.co.uk/",
    },
    brief:
      "The federation was running events, memberships and merch across three separate platforms, three logins, no single source of truth. We pulled the lot into one site so they sell tickets, memberships and merch through a single checkout, and look championship-grade doing it.",
    challenge: [
      "Old site was hard to update, slow, and split across multiple platforms for events, memberships, and the shop. Three separate logins, three sources of truth.",
      "Visual identity needed a step up. For a federation building serious credibility against PED-tested rivals, the site had to look the part.",
      "E-commerce had to handle events, memberships, AND physical merch in one consistent checkout.",
    ],
    approach: [
      "Bespoke design rebuild with a strong, confident visual identity. Black, gold, and championship-grade typography.",
      "WordPress + WooCommerce unified the entire stack: event ticketing, athlete memberships, and merchandise all run through one cart and one customer database.",
      "Athlete profile system so competitors can register, build a public profile, and track event history. The federation's data lives in one place now.",
    ],
    features: [
      "Bespoke design + WordPress build",
      "WooCommerce unified for events + memberships + merch",
      "Athlete profile and registration system",
      "Event ticketing and management",
      "Merch storefront with size variants",
      "Member-only content gating",
    ],
    testimonial: {
      quote: "Absolutely outstanding work from Alex on the UKDFBA website. The design is clean, modern and professional, while perfectly capturing the brand and vision of the federation. Communication was excellent throughout, changes were handled quickly, and the final result exceeded expectations. Highly recommend him to anyone looking for a top-level, high-performance website. Looking forward to continuing working alongside Alex going forwards.",
      name: "Christian James",
      role: "UKDFBA",
    },
    gallery: [
      "/images/projects/drug-free-bodybuilding/desktop.jpg",
      "/images/projects/drug-free-bodybuilding/mobile.jpg",
      "/images/projects/drug-free-bodybuilding/desktop-full.jpg",
    ],
    relatedProjects: ["team-procoach", "body-lab"],
  },

  {
    slug: "complete-dentist-academy",
    title: "Complete Dentist Academy",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Education"],
    heroImage: "/images/projects/complete-dentist-academy/hero.jpg",
    thumbnailImage: "/images/projects/complete-dentist-academy/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Complete Dentist Academy",
      industry: "Dental Education",
      location: "UK",
      website: "https://completedentistacademy.com/",
    },
    brief:
      "In high-trust, high-ticket dental education, the website has to signal authority before anyone enrols. We gave the academy a polished, editorial-led site that makes each course easy to choose and backs up every credibility claim.",
    challenge: [
      "Dental education is a high-trust, high-ticket space. The site had to communicate authority instantly.",
      "Multiple course tiers and CPD paths that needed clear structure without overwhelming the visitor.",
      "Mixed buyer audience: independent dentists, practice owners, and corporates with different motivations.",
    ],
    approach: [
      "Refined, editorial-led design language. Plenty of breathing room, premium typography, considered photography.",
      "Built each course as its own landing experience with clear outcomes, credentials, and enrolment paths.",
      "Faculty profiles, alumni features, and case studies layered throughout to back up the authority claim.",
    ],
    features: [
      "Bespoke design + WordPress build",
      "Modular course landing pages",
      "Faculty + alumni showcase",
      "CPD path structuring",
      "Enrolment + waitlist forms",
      "Editorial blog layout",
    ],
    gallery: [
      "/images/projects/complete-dentist-academy/desktop.jpg",
      "/images/projects/complete-dentist-academy/mobile.jpg",
      "/images/projects/complete-dentist-academy/desktop-full.jpg",
    ],
    relatedProjects: ["br-accountancy", "thecoachconsultant"],
  },

  {
    slug: "br-accountancy",
    title: "BR Accountancy",
    category: "Web Design & Build",
    tags: ["Logo Design", "WordPress", "Bespoke Design"],
    heroImage: "/images/projects/br-accountancy/hero.jpg",
    thumbnailImage: "/images/projects/br-accountancy/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "BR Accountancy",
      industry: "Accountancy",
      location: "UK",
      website: "https://braccountancy.co.uk/",
    },
    testimonial: {
      quote: "I used AW for a new logo and brand pack a couple of years ago and was really happy with it. My website was due a refresh, so I went back to them for their same service and style recently, and they didn't disappoint. My new site went live today and I love it! The team have been really helpful from start to finish, really clear on the timelines, and provided easy to use google docs for me to upload everything they need. I basically told them my vision and they made it happen. Thank you!",
      name: "BR Accountancy",
      role: "Sheffield Accountants",
    },
    brief:
      "Accountancy is a trust business, and this firm was starting with no logo, no brand and no site. We built the whole identity from scratch, then the website to carry it, so visitors feel reassured before they ever pick up the phone.",
    challenge: [
      "Starting from scratch. No logo, no brand assets, no website. The brand needed to be designed before the site could even start.",
      "Accountancy is a trust business. Visitors need to feel reassured before they pick up the phone. The visual language had to do heavy lifting.",
      "Mixed client base (sole traders, SMEs, limited companies) with different needs and expectations.",
    ],
    approach: [
      "Logo design phase first. Clean, professional, instantly readable. The kind of mark that sits well on a letterhead, business card, and digital alike.",
      "Then the site: bespoke WordPress build with a confident, trustworthy aesthetic. Service breakdowns clearly mapped to client types.",
      "Onboarding made simple: clear next steps, transparent pricing where appropriate, and quick-contact options for every page.",
    ],
    features: [
      "Logo design + brand identity",
      "Bespoke WordPress website build",
      "Service-by-client-type structuring",
      "Resource hub + tax calendar",
      "Quote request + onboarding flow",
      "Trust + accreditation signal layout",
    ],
    gallery: [
      "/images/projects/br-accountancy/desktop.jpg",
      "/images/projects/br-accountancy/mobile.jpg",
      "/images/projects/br-accountancy/desktop-full.jpg",
    ],
    relatedProjects: ["complete-dentist-academy", "crown-labels"],
  },

  {
    slug: "strength-in-us",
    title: "Strength In Us",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Weekly Graphics", "Ongoing"],
    heroImage: "/images/projects/strength-in-us/hero.jpg",
    thumbnailImage: "/images/projects/strength-in-us/thumb.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Strength In Us",
      industry: "Coaching App",
      location: "USA",
      website: "https://joinstrengthinus.com/",
    },
    testimonial: {
      quote: "To begin Alex is nothing short of a legend - he may not advertise it but he drops everything to fix, create and build my last minute ideas that come to mind! His content is professional but his own - it never looks like anyone else's which is what makes me feel like my content is above and at the top due to it being so unique. Couldn't recommend Alex enough for all he's done for StrengthinUs and his works of art!",
      name: "Strength In Us",
      role: "Coaching",
    },
    brief:
      "A growing coaching app needs to look like one brand everywhere, app, web and social, while never missing a week of content. We built the site to mirror the app, then took weekly graphics off their plate entirely so growth never stalls for want of content.",
    challenge: [
      "Brand had to translate from app UI into web and social without losing identity. Three different surfaces, one consistent feel.",
      "High content velocity. Weekly social output is non-negotiable for app growth, and quality couldn't slip with the cadence.",
      "Multi-audience: prospective users, existing app subscribers, and community. Each needed a different message.",
    ],
    approach: [
      "Designed and built a bespoke WordPress site that mirrors the app's visual system. Teal + cream + bold typography across the whole brand.",
      "Set up an ongoing weekly graphics retainer. New carousels, story templates, and feed assets shipped every week, all on-brand and ready to publish.",
      "Built the system to scale: as the app grows, the visual library grows with it.",
    ],
    features: [
      "Bespoke WordPress website build",
      "Unified brand system across web + app + social",
      "Ongoing weekly graphics retainer",
      "Carousel + story + feed templates",
      "Multi-audience landing structure",
      "Editorial blog layout",
    ],
    gallery: [
      "/images/projects/strength-in-us/desktop.jpg",
      "/images/projects/strength-in-us/mobile.jpg",
      "/images/projects/strength-in-us/desktop-full.jpg",
    ],
    graphics: [
      "/images/projects/strengthinus-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/strengthinus-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/strengthinus-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/strengthinus-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/strengthinus-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/strengthinus-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["team-procoach", "mrf-socials"],
  },

  {
    slug: "newgen-coaching",
    title: "Newgen Coaching",
    category: "Web Design & Build",
    tags: ["Logo Design", "WordPress", "Bespoke Design"],
    heroImage: "/images/projects/newgen-coaching/hero.jpg",
    thumbnailImage: "/images/projects/newgen-coaching/thumb.jpg",
    hasImages: true,
    year: "2024 + 2026",
    client: {
      name: "Newgen Coaching",
      industry: "Online Fitness Coaching",
      location: "UK",
      website: "https://newgencoaching.uk/",
    },
    brief:
      "Newgen's Instagram and their old website looked like two different brands, and it was costing them conversions. Having built their logo back in 2024, they came back so we could finally bring that brand to life on the site, with clear programmes and booking built in.",
    challenge: [
      "First engagement was logo only. They came back because the brand work landed and the website was the next bottleneck.",
      "Existing site didn't reflect the brand we'd built. Visual whiplash between Instagram and the website hurt conversion.",
      "Coaching offer had matured. New programmes, new pricing, new audience. The site had to grow up with the business.",
    ],
    approach: [
      "Phase 1 (2024): logo design and brand foundations. Clean, modern, built to flex across formats.",
      "Phase 2 (2026): full bespoke WordPress site that finally brings the visual system to life on the main customer touchpoint.",
      "Clear programme breakdowns, integrated booking, and a content engine ready to support ongoing growth.",
    ],
    features: [
      "Logo design (2024)",
      "Bespoke WordPress website build (2026)",
      "Programme + pricing structure",
      "Integrated booking + enquiry flow",
      "Client transformation gallery",
      "Content engine + blog",
    ],
    gallery: [
      "/images/projects/newgen-coaching/desktop.jpg",
      "/images/projects/newgen-coaching/mobile.jpg",
      "/images/projects/newgen-coaching/desktop-full.jpg",
    ],
    relatedProjects: ["team-procoach", "body-lab"],
  },

  {
    slug: "jic",
    title: "JIC Refractory",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Industrial"],
    heroImage: "/images/projects/jic/hero.jpg",
    thumbnailImage: "/images/projects/jic/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "JIC Refractory",
      industry: "Industrial Refractory Services",
      location: "UK",
      website: "https://jicrpl.co.uk/",
    },
    brief:
      "Specialist industrial firms rarely get a site that matches their competence, and most rivals still look like 2010. We gave JIC a fast, modern site that proves capability to procurement and engineering buyers in seconds, without the dated industrial look.",
    challenge: [
      "Specialist industrial services don't get the design treatment they deserve. The site had to compete in a sector where most sites look like 2010.",
      "Decision makers are procurement and engineering buyers. Pretty isn't enough. The site had to load fast, communicate fast, and prove competence fast.",
      "Wide range of services across linings, installations, and maintenance. Structure had to give buyers an answer within seconds.",
    ],
    approach: [
      "Modern industrial aesthetic. Bold typography, strong imagery of real work, structured layouts that prioritise readability and speed.",
      "Each service category gets clear scope, sectors served, and the kind of detail engineering buyers want before they enquire.",
      "Case studies and capability proof front-loaded throughout. The site reads like a credible operator before any sales contact.",
    ],
    features: [
      "Bespoke design + custom WordPress build",
      "Modern industrial aesthetic",
      "Service capability breakdown",
      "Case study + project showcase",
      "Sector-by-sector targeting",
      "Engineer-buyer-led structure",
    ],
    testimonial: {
      quote:
        "AW Media designed a fantastic new website for my company. From start to finish, communication was excellent, and they went above and beyond to deliver a top-class result. The quality of the design exceeded our expectations… highly recommend",
      name: "JIC Refractory",
      role: "Industrial Refractory Services, UK",
    },
    gallery: [
      "/images/projects/jic/desktop.jpg",
      "/images/projects/jic/mobile.jpg",
      "/images/projects/jic/desktop-full.jpg",
    ],
    relatedProjects: ["hotchen-construction", "crown-labels"],
  },

  {
    slug: "steel-city-car-keys",
    title: "Steel City Car Keys",
    category: "Web Design & Build",
    tags: ["WordPress", "Bespoke Design", "Local SEO"],
    heroImage: "/images/projects/steel-city-car-keys/hero.jpg",
    thumbnailImage: "/images/projects/steel-city-car-keys/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Steel City Car Keys",
      industry: "Automotive Locksmith",
      location: "Sheffield, UK",
      website: "https://steelcitycarkeys.co.uk/",
    },
    brief:
      "Most auto locksmiths only show up buried in directories. We gave Steel City Car Keys a fast, phone-first site that owns the Sheffield local search and turns someone standing next to a locked car into a callout in seconds.",
    challenge: [
      "Most auto locksmiths show up only in directories with weak websites. They needed to own the local space directly.",
      "Emergency service buyers don't read. They scan, decide, and call. Site had to communicate trust and capability in under five seconds.",
      "Wide service range (car keys, fobs, programming, broken keys, lost keys) that all needed clear, scan-friendly structure.",
    ],
    approach: [
      "Confident, no-nonsense design. Phone number front and centre, services clearly listed, trust signals layered in.",
      "Local SEO baked in: Sheffield-targeted pages, schema markup, Google Business Profile integration, and structured data for emergency services.",
      "Built to load fast on 4G. Most enquiries come from someone standing next to a locked car. The site had to perform there first, desktop second.",
    ],
    features: [
      "Bespoke WordPress build",
      "Phone-first conversion design",
      "Service-by-service breakdown",
      "Local SEO + schema markup",
      "4G performance optimisation",
      "Trust + review signal layout",
    ],
    gallery: [
      "/images/projects/steel-city-car-keys/desktop.jpg",
      "/images/projects/steel-city-car-keys/mobile.jpg",
      "/images/projects/steel-city-car-keys/desktop-full.jpg",
    ],
    relatedProjects: ["body-lab", "br-accountancy"],
  },
];

// ============================================================================
// LANDING PAGES
// ============================================================================

const landingProjects: ProjectData[] = [
  {
    slug: "titanom",
    title: "Titanom.AI",
    category: "AI-Powered",
    tags: ["AI-Accelerated", "Rebrand", "Logo", "Landing Page", "Social Pack"],
    heroImage: "/images/projects/titanom/hero.jpg",
    thumbnailImage: "/images/projects/titanom/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Ben Hawksworth / Titanom.AI",
      industry: "AI Consultancy",
      location: "UK",
      website: "https://titanom.ai/predictable-growth/",
    },
    brief:
      "Ben came to us as The Coach Consultant and left as Titanom.AI. A complete change of identity: new name, new logo, new brand, and the pages and funnels that carry it. One business, a bigger idea of itself, and nothing left looking like the old one.",
    challenge: [
      "A rebrand is the moment a business is most likely to lose the trust it already built. The new identity had to feel like a step up rather than a stranger.",
      "The product is abstract. Selling an intelligence layer for a business is much harder than selling a thing people can picture, so the page had to make it concrete fast.",
      "The page carries real spend. Anything slow or unclear is money leaving on every click.",
    ],
    approach: [
      "Bespoke logo and full brand identity first. Ink black, teal, and a second accent reserved strictly for outcomes and client results, so the eye learns what matters.",
      "An AI-Accelerated long-form landing page that does the explaining: a signature knowledge-graph visual, custom charts built as code rather than flat images, and a single clear next step.",
      "A performance pass on the live pages afterwards, with no design taken out. We measured everything before and after rather than guessing at it.",
      "Then the whole social and brand asset pack on top: profile pictures, YouTube, LinkedIn, Facebook covers and email signatures, all built from the real brand vector so nothing is ever redrawn slightly wrong.",
    ],
    features: [
      "Bespoke logo + brand identity",
      "AI-accelerated long-form landing page",
      "Custom data visuals, no stock charts",
      "Lead capture wired to their CRM",
      "Full social + brand asset pack",
      "Measured performance pass",
    ],
    results: {
      stats: [
        { value: "7.2s to 2.0s", label: "First paint, measured on throttled mobile" },
        { value: "2410KB to 273KB", label: "Page weight, with no design removed" },
      ],
    },
    gallery: [
      "/images/projects/titanom/desktop.jpg",
      "/images/projects/titanom/mobile.jpg",
      "/images/projects/titanom/desktop-full.jpg",
    ],
    showcase: [
      "/images/projects/titanom/showcase/showcase-1.jpg",
      "/images/projects/titanom/showcase/showcase-2.jpg",
      "/images/projects/titanom/showcase/showcase-3.jpg",
      "/images/projects/titanom/showcase/showcase-4.jpg",
      "/images/projects/titanom/showcase/showcase-5.jpg",
      "/images/projects/titanom/showcase/showcase-6.jpg",
    ],
    showcaseTitle: ["The brand,", "everywhere else."],
    showcaseSubtitle:
      "A rebrand only lands if it lands in every place people meet you. YouTube, LinkedIn, Facebook and the profile assets, all drawn from the real brand files.",
    relatedProjects: ["thecoachconsultant", "kensington-scott"],
  },

  {
    slug: "dan-reeve",
    title: "Reeve Conditioning Institute",
    category: "AI-Powered",
    tags: ["AI-Accelerated", "Landing Page", "Coaching"],
    heroImage: "/images/projects/dan-reeve/hero.jpg",
    thumbnailImage: "/images/projects/dan-reeve/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Dan Reeve",
      industry: "Conditioning Coach",
      location: "UK",
      website: "https://reeveconditioninginstitute.com/",
    },
    brief:
      "AI-focused landing page for a high-performance conditioning coach. Speed-to-launch met design quality that punches well above its ticket price.",
    challenge: [
      "Needed to launch fast, ahead of a wider content campaign. Couldn't wait six weeks for a traditional build.",
      "Conditioning coaching is technical. The landing page had to communicate expertise without losing the buyer in jargon.",
      "Single-purpose page: book a call. Anything else would dilute the conversion.",
    ],
    approach: [
      "AI-Accelerated landing page lane. Custom designed (no template), AI-led exploration, shipped in days.",
      "Clear narrative arc: who it's for, what it solves, how it works, who's behind it, and the single CTA.",
      "Built to optimise. Pixel installed, analytics wired, A/B-ready hero variations.",
    ],
    features: [
      "AI-accelerated custom design",
      "Single-CTA conversion structure",
      "Pixel + analytics setup",
      "A/B-ready hero variations",
      "Mobile-first responsive",
      "Fast turnaround (days)",
    ],
    gallery: [
      "/images/projects/dan-reeve/desktop.jpg",
      "/images/projects/dan-reeve/mobile.jpg",
      "/images/projects/dan-reeve/desktop-full.jpg",
    ],
    relatedProjects: ["kensington-scott", "thecoachconsultant"],
  },

  {
    slug: "redefining-shakti",
    title: "Redefining Shakti",
    category: "Landing Pages",
    tags: ["Logo Design", "Landing Page", "Wellness"],
    heroImage: "/images/projects/redefining-shakti/hero.jpg",
    thumbnailImage: "/images/projects/redefining-shakti/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Redefining Shakti",
      industry: "Women's Wellness",
      location: "UK",
      website: "https://redefiningshakti.com/",
    },
    brief:
      "Logo design plus a bespoke landing page for a women's wellness brand. Soft, considered, and confidently feminine without leaning generic.",
    challenge: [
      "Wellness space is saturated with the same visual cues: soft pinks, hand-lettered scripts, generic mandalas. They wanted to feel different.",
      "Brand needed to read sophisticated and ceremonial without becoming inaccessible.",
      "Single offer, single page. The full story had to land in one scroll.",
    ],
    approach: [
      "Logo first: a refined mark that respects the Shakti reference without resorting to cliché.",
      "Landing page built around the logo's visual language. Considered typography, warm palette, generous spacing.",
      "Narrative copy structure: invitation, philosophy, what's inside, who it's for, how to join.",
    ],
    features: [
      "Logo + brand mark design",
      "Bespoke landing page build",
      "Considered typography + palette",
      "Single-offer narrative structure",
      "Mobile-first responsive",
      "Booking + enquiry integration",
    ],
    testimonial: {
      quote: "The absolute best experience from start to finish. Could not be happier with the outcome of working with Alex and Paul. From the first initial call, Alex has taken the vision of the brand I wanted to build and helped bring it to life. Alongside the logo design, the AW Media team have built my website and helped out with my socials. Super professional, reliable and easy to work with, will never work with another designer again. It turned out even better than I could've imagined.",
      name: "Redefining Shakti",
      role: "Women's Wellness",
    },
    gallery: [
      "/images/projects/redefining-shakti/desktop.jpg",
      "/images/projects/redefining-shakti/mobile.jpg",
      "/images/projects/redefining-shakti/desktop-full.jpg",
    ],
    relatedProjects: ["weather-fix", "altitude"],
  },

  {
    slug: "kensington-scott",
    title: "Kensington Scott",
    category: "AI-Powered",
    tags: ["AI-Accelerated", "Landing Page", "Bespoke Kitchens"],
    heroImage: "/images/projects/kensington-scott/hero.jpg",
    thumbnailImage: "/images/projects/kensington-scott/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Kensington Scott",
      industry: "Bespoke Kitchen Maker",
      location: "Kent, UK",
      website: "https://bespoke.kensingtonscott.co.uk/",
    },
    brief:
      "AI-designed, custom-built landing page for a Kent-based bespoke kitchen specialist. Premium presentation at AI-Accelerated speed.",
    challenge: [
      "Bespoke kitchens is a high-ticket considered purchase. The landing page had to feel premium from the first scroll.",
      "Wide style range (Shaker, In-Frame, Modern, Handleless) that buyers self-select. Page had to help them find themselves quickly.",
      "Lead quality is everything. Couldn't afford tyre-kicker enquiries diluting the sales pipeline.",
    ],
    approach: [
      "AI-Accelerated design lane. Custom photography-led layout, premium typography, considered colour palette.",
      "Style-led routing: Shaker, In-Frame, Modern, Handleless each get visual treatment so visitors self-qualify into the right path.",
      "Enquiry form pre-qualifies on budget, location, and timeline. Sales team gets a lead they can actually convert.",
    ],
    features: [
      "AI-accelerated custom design",
      "Style category routing",
      "Photography-led layout",
      "Pre-qualifying enquiry form",
      "Mobile-first responsive",
      "Fast turnaround at premium quality",
    ],
    results: {
      stats: [
        { value: "8 leads", label: "In the first 48 hours of going live" },
        { value: "Pre-qualified", label: "On budget, location + timeline" },
      ],
    },
    gallery: [
      "/images/projects/kensington-scott/desktop.jpg",
      "/images/projects/kensington-scott/mobile.jpg",
      "/images/projects/kensington-scott/desktop-full.jpg",
    ],
    relatedProjects: ["dan-reeve", "thecoachconsultant"],
  },

  {
    slug: "altitude",
    title: "Altitude",
    category: "Landing Pages",
    tags: ["Branding", "Landing Page", "Coaching", "Digital PDF"],
    heroImage: "/images/projects/altitude/hero.jpg",
    thumbnailImage: "/images/projects/altitude/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Altitude (Scott Macdonald)",
      industry: "Performance Coaching",
      location: "UK",
      website: "https://altitude-project.com/",
    },
    brief:
      "Full brand identity, long-form landing page, and accompanying AI digital PDF for Altitude. A multi-surface system delivered as one coherent piece.",
    challenge: [
      "Brand starting from zero. Identity, language, and visual system all needed building before any of the marketing surfaces could land.",
      "Long-form landing page had to carry the full pitch: positioning, philosophy, programme, proof, CTA. Many shorter alternatives would have failed to convert.",
      "Companion digital PDF for the offer pack. Had to feel like the same brand, not a separate document.",
    ],
    approach: [
      "Brand identity first: dark, considered, gold accents, performance-driven typography. The look matches the level Scott wants the brand to operate at.",
      "Landing page built long, dense, and confidently structured. Every section earns its place.",
      "Digital PDF pack built in parallel with the same visual language. Cross-surface consistency is the point.",
    ],
    features: [
      "Full brand identity design",
      "Long-form landing page",
      "AI-powered digital PDF pack",
      "Cross-surface consistency",
      "Elementor-ready handoff",
      "Mobile-first responsive",
    ],
    gallery: [
      "/images/projects/altitude/desktop.jpg",
      "/images/projects/altitude/mobile.jpg",
      "/images/projects/altitude/desktop-full.jpg",
    ],
    relatedProjects: ["dan-reeve", "kensington-scott"],
  },

  {
    slug: "weather-fix",
    title: "Weather Fix FRS",
    category: "Landing Pages",
    tags: ["Landing Page", "Services", "Bespoke Design"],
    heroImage: "/images/projects/weather-fix/hero.jpg",
    thumbnailImage: "/images/projects/weather-fix/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Weather Fix FRS",
      industry: "Weather Services",
      location: "UK",
      website: "https://weatherfixfrs.co.uk/",
    },
    brief:
      "Bespoke landing page for a specialist weather services provider. Clear positioning, clear next step, no wasted real estate.",
    challenge: [
      "Niche service that buyers don't know they need until they need it urgently. Page had to educate quickly without sounding salesy.",
      "Mixed audience: trade buyers vs end-customer enquiries with different needs.",
      "Service-area driven business. Geographic specifics had to be clear and verifiable.",
    ],
    approach: [
      "Education-led structure: what the service is, when you need it, what the outcome looks like.",
      "Clear trade vs retail routing without splitting the page in half.",
      "Service-area visuals and structured-data so search engines and visitors both know exactly where it operates.",
    ],
    features: [
      "Bespoke landing page design",
      "Education-led narrative structure",
      "Trade + retail routing",
      "Service-area markup",
      "Mobile-first responsive",
      "Schema + local SEO",
    ],
    gallery: [
      "/images/projects/weather-fix/desktop.jpg",
      "/images/projects/weather-fix/mobile.jpg",
      "/images/projects/weather-fix/desktop-full.jpg",
    ],
    relatedProjects: ["dr-rio", "quickfit-ev"],
  },

  {
    slug: "fortis",
    title: "Fortis Transformations",
    category: "Landing Pages",
    tags: ["Branding", "Logo", "Landing Page", "Bespoke Design"],
    heroImage: "/images/projects/fortis/hero.jpg",
    thumbnailImage: "/images/projects/fortis/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Fortis Transformations",
      industry: "Online Coaching",
      location: "UK",
      website: "https://fortistransformations.com/",
    },
    brief:
      "Full brand build and bespoke website for Fortis Transformations. Logo, identity, and website delivered as one coherent system.",
    challenge: [
      "New brand, new everything. The visual system had to be designed before the website could meaningfully start.",
      "Online coaching space is saturated. Brand needed an identity strong enough to stand out from the algorithmic noise.",
      "Conversion-focused: the site has to turn visitors into discovery calls, full stop.",
    ],
    approach: [
      "Logo design and brand identity locked first. Bold, confident, transformation-led visual cues.",
      "Bespoke website built around the identity: hero shots, before-and-afters, social proof front-loaded.",
      "Funnel structure: hero gets the click, deeper sections build belief, single CTA closes.",
    ],
    features: [
      "Logo + full brand identity",
      "Bespoke website build",
      "Transformation gallery system",
      "Conversion-focused funnel structure",
      "Social proof + testimonial layout",
      "Mobile-first responsive",
    ],
    gallery: [
      "/images/projects/fortis/desktop.jpg",
      "/images/projects/fortis/mobile.jpg",
      "/images/projects/fortis/desktop-full.jpg",
      "/images/projects/fortis/logo.jpg",
    ],
    relatedProjects: ["newgen-coaching", "br-accountancy"],
  },

  {
    slug: "noura",
    title: "Noura",
    category: "Branding / Logo Design",
    tags: ["Full Brand", "GHL Landing Page", "Coaching"],
    heroImage: "/images/projects/noura/hero.jpg",
    thumbnailImage: "/images/projects/noura/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Noura",
      industry: "Coaching App",
      location: "UK",
      website: "https://go.noura-app.com/",
    },
    brief:
      "Full brand set-up plus a GoHighLevel landing page for Noura. From identity through to live registration funnel, delivered end to end.",
    challenge: [
      "Brand starting from scratch. Naming, visual identity, palette, type, the lot.",
      "GoHighLevel funnel had to match the brand exactly. Most GHL builds end up looking like GHL builds.",
      "Multiple variants needed (orange, white-hero, YouTube, TikTok) for ad traffic testing.",
    ],
    approach: [
      "Brand identity first. Warm, modern, food-conscious aesthetic that translates across surfaces.",
      "GHL landing page built bespoke inside the platform. Looks custom-built, not templated.",
      "Four traffic variants shipped so ads can test what converts hardest, without rebuilding the page each time.",
    ],
    features: [
      "Full brand identity",
      "GoHighLevel landing page",
      "4 traffic-variant builds",
      "Ad-pixel + tracking setup",
      "Mobile-first responsive",
      "Tested across ad surfaces",
    ],
    gallery: [
      "/images/projects/noura/desktop.jpg",
      "/images/projects/noura/mobile.jpg",
      "/images/projects/noura/desktop-full.jpg",
      "/images/projects/noura/pdf-mockup.jpg",
    ],
    relatedProjects: ["vanguard-brand", "primecore-brand"],
  },

  {
    slug: "warrior-movement",
    title: "The Warrior Movement",
    category: "Landing Pages",
    tags: ["Logo Design", "Landing Page", "Custom Build"],
    heroImage: "/images/projects/warrior-movement/hero.jpg",
    thumbnailImage: "/images/projects/warrior-movement/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "The Warrior Movement",
      industry: "Coaching / Movement",
      location: "UK",
      website: "https://thewarriormovemement.co.uk/",
    },
    brief:
      "Logo design followed by a custom-built landing page for The Warrior Movement. Brand and build delivered as one coherent piece.",
    challenge: [
      "No existing brand assets. Logo + landing page had to be designed and shipped together as a single coherent system.",
      "Editorial-led aesthetic with strong photography. The landing page had to do justice to the visual direction.",
      "Single CTA. Get the visitor to enquire. Everything else had to be in service of that.",
    ],
    approach: [
      "Logo design first. Bold sans + cyan script combination that reads strong on dark backdrops.",
      "Landing page built around that visual system: full-bleed editorial photography, confident typography, generous spacing.",
      "Single-CTA funnel: hero hits hard, body builds belief, CTA closes.",
    ],
    features: [
      "Custom logo design",
      "Bespoke landing page build",
      "Editorial photography-led layout",
      "Single-CTA conversion structure",
      "Mobile-first responsive",
      "Enquiry form integration",
    ],
    gallery: [
      "/images/projects/warrior-movement/desktop.jpg",
      "/images/projects/warrior-movement/mobile.jpg",
      "/images/projects/warrior-movement/desktop-full.jpg",
    ],
    relatedProjects: ["fortis", "redefining-shakti"],
  },
];

// ============================================================================
// BRANDING / LOGO DESIGN
// ============================================================================

const brandingProjects: ProjectData[] = [
  {
    slug: "dan-james",
    title: "Daniel James Coaching",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Social Set Up", "Welcome Pack"],
    heroImage: "/images/projects/dan-james/hero.jpg",
    thumbnailImage: "/images/projects/dan-james/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Dan Owens / Daniel James Coaching",
      industry: "Online Coaching",
      location: "UK",
      website: "https://www.instagram.com/danjamesfit/",
    },
    brief:
      "Most coaches rebrand three years in, once the mismatch between the work and the look gets embarrassing. Dan skipped that. He came to us with a placeholder logo and a serious plan, and launched with a brand that already looked established.",
    challenge: [
      "The plan runs in two directions at once. Dan competes in bodybuilding and wants to coach competitors, but his everyday clients hear that word and assume it is not for them.",
      "One identity had to serve both without splitting into two brands or watering either one down.",
      "It had to hold up everywhere from day one, because a new business gets judged on the first thing anyone sees.",
    ],
    approach: [
      "One shield mark that flexes. Light and warm for lifestyle clients, dark and high contrast with the orange running through it for the competing side. Same coach, same brand, and nobody lands on his page thinking this is not for them.",
      "The full identity underneath it: logo suite, colour system, typography and brand guidelines, so it stays right whoever touches it next.",
      "Then everything he needs to actually use it. Profile pictures, pinned posts, highlight covers and editable Canva templates, so he stays on brand without needing a designer for every post.",
      "A branded client welcome pack to finish it, so a new sign-up gets the professional treatment from day one rather than a plain PDF.",
    ],
    features: [
      "Custom logo + brand identity",
      "One mark, two treatments",
      "Colour system + typography",
      "Full social media asset pack",
      "Editable Canva templates",
      "Branded client welcome pack",
    ],
    testimonial: {
      quote:
        "Service is absolutely unreal. Alex and his team are true masters of their craft, taking sometimes the most surface level ideas and building something amazing out of them. He goes above and beyond for you and your brand.",
      name: "Dan Owens",
      role: "Daniel James Coaching",
    },
    gallery: [],
    graphics: [
      "/images/projects/dan-james/mockup-1.jpg",
      "/images/projects/dan-james/mockup-2.jpg",
      "/images/projects/dan-james/mockup-3.jpg",
      "/images/projects/dan-james/mockup-4.jpg",
      "/images/projects/dan-james/mockup-5.jpg",
    ],
    graphicsTitle: ["Brand", "showcase."],
    graphicsSubtitle:
      "One mark that flexes across both sides of the business, rolled out from profile picture to welcome pack. Fifteen minutes of his time and a few messages, start to finish.",
    relatedProjects: ["trident-coaching", "casey-lifestyle"],
  },

  {
    slug: "trident-coaching",
    title: "Trident Coaching",
    category: "Branding / Logo Design",
    tags: ["Rebrand", "Logo", "Social Set Up", "Brand Guidelines"],
    heroImage: "/images/projects/trident-coaching/hero.jpg",
    thumbnailImage: "/images/projects/trident-coaching/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Josh Miller-Hall / Trident Coaching",
      industry: "Online Coaching",
      location: "UK",
      website: "https://www.instagram.com/joshmillerhall/",
    },
    brief:
      "Josh has been coaching since he was 18. His logo was made online, for free, back in 2019. The coaching grew, the results grew, the reputation grew, and the brand stayed frozen at day one. We brought it back up to level.",
    challenge: [
      "Starting young means your first brand is a placeholder, and placeholders quietly stay. Years of real credibility was sitting behind a free logo.",
      "He works with competitive and lifestyle clients, so the mark had to read serious to one group without going cold on the other.",
      "Josh grew up surfing and is big into art. None of that personality was visible, and that personality is a reason people pick him.",
    ],
    approach: [
      "Three black and white logo concepts, refined until the trident mark felt like him. Sharp enough for competitive clients, artistic enough to actually feel personal.",
      "A proper brand system around it: jet black, slate, chrome silver and a teal accent, with guidelines so it stays right.",
      "Then the socials built on top. Profile pictures, story templates, pinned posts and editable post templates, because a logo on its own only lives in one place.",
      "The result is that a follower recognises Trident whether they land on his grid, his stories or his DMs. One man's coaching business that reads like a serious operation.",
    ],
    features: [
      "Full rebrand from a DIY logo",
      "Three concepts, refined to one mark",
      "Brand guidelines + colour system",
      "Profile, story + pinned post assets",
      "Editable post templates",
      "Consistent across grid, stories + DMs",
    ],
    testimonial: {
      quote:
        "You have outdone yourself mate. This is perfect. Exactly as I envisioned.",
      name: "Josh Miller-Hall",
      role: "Trident Coaching",
    },
    gallery: [],
    graphics: [
      "/images/projects/trident-coaching/mockup-1.jpg",
      "/images/projects/trident-coaching/mockup-2.jpg",
      "/images/projects/trident-coaching/mockup-3.jpg",
      "/images/projects/trident-coaching/mockup-4.jpg",
      "/images/projects/trident-coaching/mockup-5.jpg",
    ],
    graphicsTitle: ["Brand", "showcase."],
    graphicsSubtitle:
      "The free 2019 logo against the mark that replaced it, then the whole system rolled out across everywhere his audience actually meets him.",
    relatedProjects: ["dan-james", "alexis-gosset"],
  },

  {
    slug: "casey-lifestyle",
    title: "Casey Lifestyle Coaching",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Social Set Up"],
    heroImage: "/images/projects/casey-lifestyle/hero.jpg",
    thumbnailImage: "/images/projects/casey-lifestyle/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Casey / Lifestyle Coaching",
      industry: "Lifestyle Coaching",
      location: "UK",
      website: "https://www.instagram.com/casey_lifestyle/",
    },
    brief:
      "Casey came to us launching his lifestyle coaching business and wanted to look the part from day one. Not next month. Not after a few clients. Day one. So we built the brand to match.",
    challenge: [
      "Great coaching with a bad brand is just a well kept secret. Casey had the coaching but no visual identity to back it.",
      "The mark had to communicate reach, direction and purpose without saying a word.",
      "He needed to create on-brand content himself going forward, without relying on anyone else.",
    ],
    approach: [
      "Custom logo designed around a globe and four-point star. Bold, modern, and built to work across every format.",
      "Rolled out across his full social presence: pinned posts, profile picture, and highlight covers.",
      "Delivered fully editable Canva templates so Casey can keep everything consistent and on brand.",
    ],
    features: [
      "Custom logo + brand mark",
      "Full social media asset pack",
      "Pinned posts + profile setup",
      "Editable Canva templates",
      "Consistent brand system",
      "Built for self-serve content",
    ],
    testimonial: {
      quote:
        "Fantastic service start to finish from Alex. Great communication and delivered exactly what I was looking for.",
      name: "Casey",
      role: "Lifestyle Coaching",
    },
    gallery: [],
    graphics: [
      "/images/projects/casey-lifestyle/mockup-2.jpg",
      "/images/projects/casey-lifestyle/mockup-3.jpg",
      "/images/projects/casey-lifestyle/mockup-4.jpg",
      "/images/projects/casey-lifestyle/mockup-5.jpg",
    ],
    graphicsTitle: ["Brand", "showcase."],
    graphicsSubtitle: "The full identity, rolled out across his social presence with editable templates to keep every post on brand.",
    relatedProjects: ["alexis-gosset", "sculpt-society"],
  },

  {
    slug: "alexis-gosset",
    title: "Alexis Gosset",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Welcome Pack"],
    heroImage: "/images/projects/alexis-gosset/hero.jpg",
    thumbnailImage: "/images/projects/alexis-gosset/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Alexis Gosset",
      industry: "Online Coaching",
      location: "France",
      website: "https://www.instagram.com/alexis.g.coach/",
    },
    brief:
      "Professional. Premium. Simple and strong. That was the brief from Alexis, building his online coaching business from scratch and wanting the brand to match from day one. Not a Canva logo and mismatched graphics. A proper identity that tells people what level he operates at before they read a word.",
    challenge: [
      "Alexis knew the image he wanted to project, but knowing what you want and having the brand to match are two different things.",
      "Every touchpoint had to look like one system. Clean, consistent, professional.",
      "New clients needed that premium feel from the moment they signed up.",
    ],
    approach: [
      "Custom logo and a full social media asset pack: pinned posts, profile picture, and Canva templates.",
      "A branded PDF welcome pack so every new client gets the premium experience from day one.",
      "Built to work as one system, one look across every touchpoint.",
    ],
    features: [
      "Custom logo + identity",
      "Full social media asset pack",
      "Editable Canva templates",
      "Branded PDF welcome pack",
      "Pinned posts + profile setup",
      "One consistent brand system",
    ],
    testimonial: {
      quote:
        "Great experience working with AW Media and Marketing. He really took the time to understand what I wanted for my personal branding, my visual identity and the image I wanted to give through my coaching business. The communication was easy, the work was clean, and the final result looks exactly like what I had in mind: professional, premium, simple and strong. I'm really happy with the result and I would definitely recommend him to anyone who wants to build a serious and high quality brand image.",
      name: "Alexis Gosset",
      role: "Online Coach",
    },
    gallery: [],
    graphics: [
      "/images/projects/alexis-gosset/mockup-2.jpg",
      "/images/projects/alexis-gosset/mockup-3.jpg",
      "/images/projects/alexis-gosset/mockup-4.jpg",
      "/images/projects/alexis-gosset/mockup-5.jpg",
    ],
    graphicsTitle: ["Brand", "showcase."],
    graphicsSubtitle: "One identity across every touchpoint. Clean, consistent, professional, from profile to content templates.",
    documents: [
      "/images/projects/alexis-gosset/doc-1.jpg",
      "/images/projects/alexis-gosset/doc-2.jpg",
      "/images/projects/alexis-gosset/doc-3.jpg",
      "/images/projects/alexis-gosset/doc-4.jpg",
      "/images/projects/alexis-gosset/doc-5.jpg",
      "/images/projects/alexis-gosset/doc-6.jpg",
    ],
    documentsTitle: ["The welcome", "pack."],
    documentsSubtitle: "A branded PDF welcome pack so every new client gets the premium experience from the moment they sign up.",
    relatedProjects: ["casey-lifestyle", "sculpt-society"],
  },

  {
    slug: "sculpt-society",
    title: "The Sculpt Society",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Social Set Up"],
    heroImage: "/images/projects/sculpt-society/hero.jpg",
    thumbnailImage: "/images/projects/sculpt-society/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Lauren / The Sculpt Society",
      industry: "Online Fitness Coaching",
      location: "UK",
      website: "https://www.instagram.com/thesculptsociety/",
    },
    brief:
      "New business, new brand, nailed in one. Lauren came to us at the start of her journey as an online fitness coach. She had a vision, a colour palette and a name, but couldn't quite put the rest into words. That's the brief we work best with.",
    challenge: [
      "Lauren was launching from scratch with a clear feel in mind but no identity to express it.",
      "She needed a brand that launched the business with clarity and confidence from day one.",
      "It had to be something she could run with herself for ongoing content.",
    ],
    approach: [
      "Built a full brand identity from the ground up: custom logo with all file formats.",
      "Editable Canva templates, pinned posts and highlight covers for ongoing content.",
      "Social carousel templates ready to go, so the brand stays cohesive as she posts.",
    ],
    features: [
      "Full brand identity",
      "Custom logo, all formats",
      "Editable Canva templates",
      "Pinned posts + highlight covers",
      "Social carousel templates",
      "Cohesive, launch-ready system",
    ],
    testimonial: {
      quote:
        "Absolute best! I came to Alex with very little ideas but a vision, told him the colours and just the name and let him run with any ideas he wanted from my very little information. First thing he sent over to me was nailed. Couldn't be happier with my logos and the branding of my page. Exactly what I wanted even when I didn't fully know myself, he just took what I thought and created my vision.",
      name: "Lauren",
      role: "The Sculpt Society",
    },
    gallery: [],
    graphics: [
      "/images/projects/sculpt-society/mockup-2.jpg",
      "/images/projects/sculpt-society/mockup-3.jpg",
      "/images/projects/sculpt-society/mockup-4.jpg",
      "/images/projects/sculpt-society/mockup-5.jpg",
    ],
    graphicsTitle: ["Brand", "showcase."],
    graphicsSubtitle: "A full identity from the ground up, with editable templates and carousel sets ready to launch with.",
    relatedProjects: ["casey-lifestyle", "alexis-gosset"],
  },

  {
    slug: "vanguard-brand",
    title: "Vanguard",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Identity"],
    heroImage: "/images/projects/vanguard-brand/hero.jpg",
    thumbnailImage: "/images/projects/vanguard-brand/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Vanguard",
      industry: "Performance / Coaching",
      location: "UK",
    },
    brief:
      "Full brand set-up for Vanguard. Identity, logo system, palette, typography, and applications across digital and print.",
    challenge: [
      "Brand needed to feel established from launch. Premium positioning required a visual system that punches above the launch budget.",
      "Wide application range: social, print, swag, future website. The system had to flex without fragmenting.",
      "Distinctive naming meant the mark had to be ownable and immediately recognisable.",
    ],
    approach: [
      "Identity exploration locked the visual direction in two rounds. Bold, confident, performance-led.",
      "Built a full system: primary logo, marks, variants, colour, typography, and application guides.",
      "Delivered ready-to-use templates for social, comms, and document design so the brand stays consistent post-handoff.",
    ],
    features: [
      "Logo system + variants",
      "Colour + typography system",
      "Brand guidelines document",
      "Social + print application templates",
      "Stationery design",
      "Future-proofed for digital expansion",
    ],
    testimonial: {
      quote: "It's been great working with AW Media. Marketing today to me is very daunting and technical but AW Media inspired me to focus on the basics, my social branding, the paint work I call it. What represents me and stands out. So I decided to have a consultation and spoke of what inspires me in terms of logo ideas and movie theme concepts I like. AW is very fast for the ideas I gave him and cooked something magical for the first initial stages and followed with something greater, I nearly passed out. AW is a true artist bringing out the artist in the customer and is very passionate about bringing your branding to life.",
      name: "Vanguard",
      role: "The Armed Forces Coach",
    },
    gallery: [
      "/images/projects/vanguard-brand/mockup-1.jpg",
      "/images/projects/vanguard-brand/mockup-2.jpg",
      "/images/projects/vanguard-brand/mockup-3.jpg",
      "/images/projects/vanguard-brand/mockup-4.jpg",
    ],
    relatedProjects: ["primecore-brand", "noura"],
  },

  {
    slug: "primecore-brand",
    title: "PrimeCore",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Identity"],
    heroImage: "/images/projects/primecore-brand/hero.jpg",
    thumbnailImage: "/images/projects/primecore-brand/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "PrimeCore",
      industry: "Coaching / Performance",
      location: "UK",
    },
    testimonial: {
      quote: "AW doesn't just “design” he actually understands you. Who you are. What you stand for. The tone you carry. The standard you operate at. When I explained the new brand name, why I was pivoting, and the direction I wanted to build towards, he nailed it in one attempt. The entire process was completely painless. Quick turnaround, and any minor amendments were handled immediately, not just changed, but understood. He gets the rationale behind decisions, which means you never feel like you're compromising on your vision just to get something finished. When you're working with a graphic designer, trust is everything. They're shaping the first impression people have of your brand, and that matters. That's exactly why I won't go anywhere else.",
      name: "Pete",
      role: "PrimeCore",
    },
    brief:
      "Full brand set-up for PrimeCore. Identity built to scale across digital, content, and merchandise from day one.",
    challenge: [
      "Naming was strong but visual direction was wide open. Could have gone in five different directions.",
      "Brand needed to feel modern and technical without leaning generic-tech.",
      "Multi-product future. Identity system had to hold up as the offer grows.",
    ],
    approach: [
      "Locked direction in a focused identity sprint. Modern, technical, confident.",
      "Full system delivered: primary logo, marks, palette, typography, applications.",
      "Built with future product lines and sub-brands in mind. The system flexes.",
    ],
    features: [
      "Logo system + variants",
      "Colour + typography system",
      "Brand guidelines",
      "Social + content templates",
      "Sub-brand-ready architecture",
      "Print + digital application pack",
    ],
    gallery: [],
    graphics: [
      "/images/projects/primecore-brand/mockup-2.jpg",
      "/images/projects/primecore-brand/mockup-3.jpg",
      "/images/projects/primecore-brand/mockup-4.jpg",
      "/images/projects/primecore-brand/mockup-5.jpg",
    ],
    graphicsTitle: ["Rebrand", "showcase."],
    graphicsSubtitle: "From Big Pete to PrimeCore. New logo, new identity, and a relaunch-ready social system.",
    relatedProjects: ["vanguard-brand", "noura"],
  },

  {
    slug: "hvme-brand",
    title: "HVME",
    category: "Branding / Logo Design",
    tags: ["Logo", "Social Set Up"],
    heroImage: "/images/projects/hvme-brand/hero.jpg",
    thumbnailImage: "/images/projects/hvme-brand/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "HVME",
      industry: "Lifestyle / Coaching",
      location: "UK",
    },
    brief:
      "Logo design plus social set-up for HVME. Launch-ready brand kit covering identity through to ready-to-publish social templates.",
    challenge: [
      "Brand needed to launch socially before anything else. Identity had to translate immediately into IG-ready assets.",
      "Strong naming had to be matched with an equally distinctive mark.",
      "Visual system had to support content-velocity from day one.",
    ],
    approach: [
      "Locked the mark with a tight identity sprint.",
      "Built out a social-first application pack: feed templates, story templates, reel covers, and bio assets.",
      "Delivered the full pack so the team can post on day one without bottlenecks.",
    ],
    features: [
      "Logo + brand mark",
      "Social feed templates",
      "Story + reel cover templates",
      "Bio + profile asset pack",
      "Colour + typography guides",
      "Ready-to-publish from launch",
    ],
    gallery: [
      "/images/projects/hvme-brand/mockup-1.jpg",
      "/images/projects/hvme-brand/mockup-2.jpg",
      "/images/projects/hvme-brand/mockup-3.jpg",
      "/images/projects/hvme-brand/mockup-4.jpg",
    ],
    relatedProjects: ["vanguard-brand", "primecore-brand"],
  },

  {
    slug: "wright-coaching-brand",
    title: "Wright Coaching",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Identity"],
    heroImage: "/images/projects/wright-coaching-brand/hero.jpg",
    thumbnailImage: "/images/projects/wright-coaching-brand/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Wright Coaching",
      industry: "Coaching",
      location: "UK",
    },
    brief:
      "Full brand set-up for Wright Coaching. Identity, applications, and a launch-ready system that gives the business a confident visual foundation.",
    challenge: [
      "Crowded coaching space. Visual identity needed to stand out without losing approachability.",
      "Mixed audience meant the brand had to flex tone across professional and consumer touchpoints.",
      "Future website + content. System had to scale.",
    ],
    approach: [
      "Identity that's confident but warm. Strong typography, restrained palette, considered marks.",
      "Built application pack across digital and print.",
      "System engineered for content-first growth.",
    ],
    features: [
      "Logo system + variants",
      "Colour + typography",
      "Application templates",
      "Brand guidelines",
      "Content-ready asset pack",
      "Digital + print application",
    ],
    gallery: [
      "/images/projects/wright-coaching-brand/mockup-1.jpg",
      "/images/projects/wright-coaching-brand/mockup-2.jpg",
      "/images/projects/wright-coaching-brand/mockup-3.jpg",
      "/images/projects/wright-coaching-brand/mockup-4.jpg",
    ],
    relatedProjects: ["primecore-brand", "vanguard-brand"],
  },

  {
    slug: "ac-visuals-logo",
    title: "AC Visuals",
    category: "Branding / Logo Design",
    tags: ["Logo Design"],
    heroImage: "/images/projects/ac-visuals-logo/hero.jpg",
    thumbnailImage: "/images/projects/ac-visuals-logo/thumb.jpg",
    hasImages: false,
    year: "2025",
    client: {
      name: "AC Visuals",
      industry: "Creative / Video",
      location: "UK",
    },
    brief:
      "Logo design for AC Visuals. A clean, confident mark for a creative video brand that needed to look as crafted as the work they produce.",
    challenge: [
      "Creative-industry clients are visual-first. The mark had to earn respect from the audience it serves.",
      "Initials-led brief that had to avoid the typical 'monogram-in-a-square' default.",
      "Brand had to flex across video bumpers, watermarks, and social.",
    ],
    approach: [
      "Custom letterform exploration. Built around the AC letters in a way that feels distinctive, not generic.",
      "Delivered with motion-ready variants so the mark animates cleanly into video work.",
      "Full file pack: vector, web, social, and watermark sizes.",
    ],
    features: [
      "Custom letterform logo",
      "Motion-ready variants",
      "Watermark + bumper-sized variants",
      "Vector + web file pack",
      "Colour + monochrome versions",
      "Application examples",
    ],
    gallery: [
      "/images/projects/ac-visuals-logo/logo.jpg",
      "/images/projects/ac-visuals-logo/mockup.jpg",
    ],
    relatedProjects: ["hvme-brand", "br-accountancy"],
  },

  {
    slug: "her-era-brand",
    title: "Her Era",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Brand Guidelines"],
    heroImage: "/images/projects/her-era-brand/hero.jpg",
    thumbnailImage: "/images/projects/her-era-brand/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Her Era",
      industry: "Women's Lifestyle / Wellness",
      location: "UK",
    },
    brief:
      "Full brand set-up for Her Era. Identity, logo, palette, typography, and a four-page A4 landscape brand guidelines deck delivered as one polished system.",
    challenge: [
      "Brand starting from scratch. Naming, identity, palette, type duo, applications, the lot.",
      "Tone is editorial-warm. Easy to default to generic-wellness aesthetics that would have killed the positioning.",
      "Visual system had to flex across digital and print without fragmenting.",
    ],
    approach: [
      "Locked direction with a warm oatmeal-taupe-espresso palette and a refined sans + script duo. Editorial, modern, distinctly Her Era.",
      "Delivered a four-page A4 landscape brand guidelines deck: cover, logo system, palette + typography, application examples.",
      "Built the system to scale into social, print, and future product without redesign.",
    ],
    features: [
      "Logo system + variants",
      "Warm editorial colour palette",
      "Sans + script type duo",
      "4-page brand guidelines deck",
      "Social + print applications",
      "Future-proofed visual system",
    ],
    gallery: [
      "/images/projects/her-era-brand/mockup-1.jpg",
      "/images/projects/her-era-brand/mockup-2.jpg",
      "/images/projects/her-era-brand/mockup-3.jpg",
      "/images/projects/her-era-brand/mockup-4.jpg",
    ],
    relatedProjects: ["redefining-shakti", "noura"],
  },

  {
    slug: "delta-brand",
    title: "Delta Project",
    category: "Branding / Logo Design",
    tags: ["Logo Design", "Social Templates", "Brand Icons"],
    heroImage: "/images/projects/delta-brand/hero.jpg",
    thumbnailImage: "/images/projects/delta-brand/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Delta Project",
      industry: "Online Fitness Coaching",
      location: "UK",
    },
    brief:
      "Full visual set-up for Delta Project, an online fitness coaching brand. Logo design, a custom icon set, and a complete social media template system built to keep the brand consistent across every post.",
    challenge: [
      "New coaching brand that needed to look established and premium from day one, in a saturated fitness market.",
      "Content output is high. The brand needed templates the coach could reuse without the look drifting post-handoff.",
      "Bold, energetic identity that still reads clean at small sizes on a phone feed.",
    ],
    approach: [
      "Built a strong, confident wordmark with a bronze accent block, distinctive in a sea of generic fitness logos.",
      "Designed a matching icon set and a full social media template system: posts, stories, and carousels on-brand out of the box.",
      "Delivered editable templates so Delta can produce consistent content at volume without a designer on every asset.",
    ],
    features: [
      "Primary logo + wordmark",
      "Custom brand icon set",
      "Social media template system",
      "Editable post / story / carousel layouts",
      "Colour + typography system",
      "Built for high-volume content",
    ],
    gallery: [],
    relatedProjects: ["vanguard-brand", "wright-coaching-brand"],
  },

  {
    slug: "mastery-method",
    title: "Mastery Method",
    category: "Branding / Logo Design",
    tags: ["Logo Design", "Landing Page", "Community Build"],
    heroImage: "/images/projects/mastery-method/hero.jpg",
    thumbnailImage: "/images/projects/mastery-method/thumb.jpg",
    hasImages: true,
    year: "2025",
    client: {
      name: "Mastery Method (ICM)",
      industry: "Coaching / Education",
      location: "UK",
    },
    brief:
      "End-to-end set-up for Mastery Method, part of ICM. Logo design, a conversion-focused website landing page, a Circle community build, and an ongoing weekly social media service: one connected brand across every touchpoint.",
    challenge: [
      "Sub-brand under ICM that needed its own identity while still feeling part of the wider ecosystem.",
      "Multiple surfaces (logo, landing page, community platform, weekly socials) all had to stay visually consistent.",
      "Landing page had to convert cold traffic into the programme, not just look the part.",
    ],
    approach: [
      "Designed a bold, confident 'M' mark and wordmark in electric blue: modern, premium, instantly recognisable.",
      "Built a conversion-focused landing page and set up the Circle community so members land in a fully branded space.",
      "Run the weekly social media so the brand stays active and consistent without the team lifting a finger.",
    ],
    features: [
      "Logo + brand mark",
      "Conversion landing page",
      "Circle community build",
      "Weekly social media service",
      "Consistent cross-platform identity",
      "Part of the ICM ecosystem",
    ],
    gallery: [],
    relatedProjects: ["delta-brand", "wright-coaching-brand"],
  },

  {
    slug: "vantage-brand",
    title: "Vantage Point",
    category: "Branding / Logo Design",
    tags: ["Full Brand Set Up", "Logo", "Welcome Pack"],
    heroImage: "/images/projects/vantage-brand/hero.jpg",
    thumbnailImage: "/images/projects/vantage-brand/thumb.jpg",
    hasImages: true,
    year: "2026",
    client: {
      name: "Vantage Point Health & Performance",
      industry: "Health & Performance Coaching",
      location: "USA",
    },
    testimonial: {
      quote: "A creative genius. Got everything I wanted and then some. Took the jumbled ideas in my head and put them into exactly what I wanted. Couldn't recommend him more.",
      name: "Justin Fordham",
      role: "Vantage Point Performance",
    },
    brief:
      "Full brand set-up for Vantage Point Health & Performance, a US fitness client. Logo design, editable social templates, pinned and profile assets, and a welcome pack PDF: a complete identity ready to launch.",
    challenge: [
      "US health and performance brand that needed a premium, ownable identity to stand out in a crowded coaching market.",
      "Wide application range: social, profile, pinned posts, and client onboarding documents all had to feel like one brand.",
      "Mark needed to carry meaning (performance, elevation, the 'vantage point') without being literal or generic.",
    ],
    approach: [
      "Built a navy-and-gold identity with a custom 'V' mountain-peak mark: premium, confident, and full of meaning.",
      "Designed editable social templates plus pinned and profile assets so the brand launches consistent across every channel.",
      "Delivered a branded welcome pack PDF for smooth, professional client onboarding from the first touchpoint.",
    ],
    features: [
      "Logo + custom peak mark",
      "Navy + gold colour system",
      "Editable social templates",
      "Pinned + profile assets",
      "Welcome pack PDF",
      "Full launch-ready brand kit",
    ],
    gallery: [],
    relatedProjects: ["vanguard-brand", "primecore-brand"],
  },
];

// ============================================================================
// SOCIAL / GRAPHIC SUBSCRIPTIONS
// ============================================================================

const socialProjects: ProjectData[] = [
  {
    slug: "mattmc-socials",
    title: "Matt McCullough",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Social Graphics", "AI-Accelerated", "Ongoing"],
    heroImage: "/images/projects/mattmc-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/mattmc-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Matt McCullough / NXT LVL",
      industry: "IFBB Pro Coach / Physique Development",
      location: "UK",
      website: "https://www.instagram.com/mattmccullough_ifbbpro/",
    },
    testimonial: {
      quote:
        "These graphics are very good for traction. I'm bringing a lot of clients onboard because of these.",
      name: "Matt McCullough",
      role: "IFBB Pro / NXT LVL Physique Development",
    },
    brief:
      "Fortnightly IG carousel design for an IFBB Pro coach. Editorial fitness graphics, AI-accelerated and hand-finished, that turn his coaching knowledge into scroll-stopping posts.",
    challenge: [
      "Coaching content on IG is saturated. Matt needed graphics that read as pro-level authority, not generic gym posts.",
      "A fortnightly cadence demanded a system that ships fast without ever looking template-spammed.",
      "The output had to actually drive enquiries, not just look good.",
    ],
    approach: [
      "Built a NXT LVL carousel system: cover, hook, body and CTA on locked typography with the black, white and electric-yellow identity.",
      "AI-accelerated production keeps the fortnightly turnaround fast, with every pack hand-finished and bespoke within the system.",
      "Direct, technical tone in the copy, backed by sharp editorial design.",
    ],
    features: [
      "Custom IG carousel template system",
      "Recurring fortnightly packs",
      "Cover + body + CTA design",
      "AI-accelerated, hand-finished",
      "Locked brand identity in visuals",
      "Ongoing creative direction",
    ],
    results: {
      stats: [
        { value: "Fortnightly", label: "Delivery cadence" },
        { value: "New clients", label: "Onboarded off the back of the content" },
      ],
    },
    gallery: [],
    graphics: [
      "/images/projects/mattmc-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/mattmc-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/mattmc-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/mattmc-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/mattmc-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/mattmc-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["fox-socials", "icm-socials"],
  },

  {
    slug: "fox-socials",
    title: "Trained By Fox",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Bodybuilding", "Ongoing"],
    heroImage: "/images/projects/fox-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/fox-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Michael Fox / Trained By Fox",
      industry: "UK Bodybuilding Coach",
      location: "UK",
      website: "https://www.instagram.com/michael_trainedbyfox/",
    },
    testimonial: {
      quote: "I was very reluctant to initially enquire with Alex and his team. Having previously worked with graphic designers who I rated highly, it got to a point where the creativity across the industry just felt repetitive. Then I started seeing more and more of Alex's work and the coaches he was working with, and I could see a clear differentiation. My partner was actually the first person to work with Alex. The attention to detail he put into what he created for her Molly Rose Studios was great. That gave me the confidence to jump on a consultation call, and I immediately signed up for the fortnightly plan. Within the first three weeks, I upgraded straight to the weekly plan. Alex is not going to just design whatever you hand him. He will give honest feedback, and he will still do what you have asked, but he will tell you straight if he thinks something is not working. Overall, if you are a coach looking to level up your content, give this a try.",
      name: "Michael Fox",
      role: "Trained By Fox",
    },
    brief:
      "Ongoing IG carousel pack design for a UK bodybuilding coach. Editorial-grade graphics that match the seriousness of the coaching.",
    challenge: [
      "Bodybuilding content on IG is mostly noise. He needed graphics that read as authoritative, not algorithm bait.",
      "Recurring output cadence demanded a template system that flexes without going stale.",
      "Strong personal brand voice had to come through visually as well as in copy.",
    ],
    approach: [
      "Built a carousel system: cover, hook, body, CTA, with locked typography and visual cues.",
      "Recurring packs ship on a schedule, each one bespoke within the system.",
      "Tone is direct, technical, and confident. Graphics back that up.",
    ],
    features: [
      "Custom IG carousel template system",
      "Recurring monthly packs",
      "Cover + body + CTA design",
      "Locked brand voice in visuals",
      "Hand-finished, not auto-generated",
      "Ongoing creative direction",
    ],
    gallery: [],
    graphics: [
      "/images/projects/fox-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/fox-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/fox-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/fox-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/fox-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/fox-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["mrf-socials", "prepdad-socials"],
  },

  {
    slug: "icm-socials",
    title: "ICM Education",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Education", "Ongoing"],
    heroImage: "/images/projects/icm-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/icm-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "ICM Education",
      industry: "Education / Coaching",
      location: "UK",
      website: "https://www.instagram.com/theicmeducation/",
    },
    testimonial: {
      quote: "AW is the best to work with! He creates all our social media content, website, branding & lead magnets to a high standard every time. He's efficient and delivers all content on time consistently each week. His response times are excellent and the whole graphic process is smooth making it 10x easier to keep up with posting consistently on socials.",
      name: "ICM Education",
      role: "Online Coaching & Education",
    },
    brief:
      "Ongoing IG carousel design for a UK education brand. Editorial-style graphics that turn complex ideas into scrollable, shareable visuals.",
    challenge: [
      "Education-led content is dense by nature. Graphics had to make complex frameworks visually digestible.",
      "Repeating cadence meant the system had to flex without losing identity.",
      "Audience is sharp. Anything that read as cheap or generic would damage authority.",
    ],
    approach: [
      "Editorial visual system: clear hierarchy, generous space, considered typography.",
      "Recurring monthly packs designed around teaching moments.",
      "Locked brand voice through colour and typographic discipline.",
    ],
    features: [
      "Editorial carousel system",
      "Recurring monthly packs",
      "Framework-led visual storytelling",
      "Typography-led identity",
      "Hand-finished, not template-spammed",
      "Ongoing creative direction",
    ],
    gallery: [],
    graphics: [
      "/images/projects/icm-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/icm-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/icm-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/icm-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/icm-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/icm-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["fox-socials", "square-one-socials"],
  },

  {
    slug: "square-one-socials",
    title: "Square One Gym",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Gym", "Ongoing"],
    heroImage: "/images/projects/square-one-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/square-one-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Square One Gym",
      industry: "Gym / Fitness Brand",
      location: "UK",
      website: "https://www.instagram.com/squareonegym/",
    },
    brief:
      "Recurring IG carousel design for a UK gym brand. High-velocity output that holds a strong, consistent visual line week after week.",
    challenge: [
      "Gym brands publish constantly. The visual line couldn't drift across hundreds of posts.",
      "Mix of education, member features, and offer content all had to live in the same system.",
      "Audience is fitness-savvy. Generic gym graphics would have hurt trust.",
    ],
    approach: [
      "Locked visual system covering education, member features, and offers in one coherent style.",
      "High-velocity production without quality compromise.",
      "Recurring monthly packs ship on a schedule, ready to publish.",
    ],
    features: [
      "Cross-content-type visual system",
      "Recurring monthly packs",
      "High-velocity production",
      "Member feature + education + offer templates",
      "Locked brand discipline",
      "Ongoing creative direction",
    ],
    gallery: [],
    graphics: [
      "/images/projects/square-one-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/square-one-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/square-one-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/square-one-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/square-one-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/square-one-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["fox-socials", "mrf-socials"],
  },

  {
    slug: "myles-socials",
    title: "Mind Architect Myles",
    category: "AI-Powered",
    tags: ["AI-Accelerated", "Claude Code", "IG Carousels", "Ongoing"],
    heroImage: "/images/projects/myles-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/myles-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Mind Architect Myles",
      industry: "Mindset / Performance",
      location: "UK",
      website: "https://www.instagram.com/mindarchitectmyles/",
    },
    brief:
      "AI-led carousel system built in Claude Code for Mind Architect Myles. Recurring high-velocity output where the AI-Accelerated lane meets real production work.",
    challenge: [
      "Weekly cadence at a quality bar that traditional design couldn't hit profitably.",
      "Brand had to read distinctive every single post, not template-y.",
      "Output couldn't feel auto-generated. AI is the engine, craft is still the deliverable.",
    ],
    approach: [
      "Built a Claude Code production pipeline that handles the heavy lifting per pack.",
      "Locked visual system + human editorial oversight on every pack before publish.",
      "Recurring weekly delivery without dropping the quality line.",
    ],
    features: [
      "Claude Code production pipeline",
      "AI-led design at human-craft quality",
      "Weekly carousel packs",
      "Personal-brand narrative carousels",
      "Locked typography + visual discipline",
      "Ongoing creative direction",
    ],
    gallery: [],
    graphics: [
      "/images/projects/myles-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/myles-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/myles-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/myles-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/myles-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/myles-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["thecoachconsultant", "dan-reeve"],
  },

  {
    slug: "prepdad-socials",
    title: "The Prep Dad",
    category: "Graphic Subscriptions",
    tags: ["AI + Bespoke", "IG Carousels", "French", "Ongoing"],
    heroImage: "/images/projects/prepdad-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/prepdad-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Louis / The Prep Dad",
      industry: "Comp Prep Coaching (French market)",
      location: "France",
      website: "https://www.instagram.com/theprepdad/",
    },
    brief:
      "Recurring IG carousel design for a French-language comp prep brand. Mix of AI-accelerated production and bespoke hand-finishing.",
    challenge: [
      "French-language content with all the typographic gotchas (orphan punctuation, accents) that monolingual systems handle badly.",
      "Mixed AI + bespoke output meant the visual line had to survive across two different production paths.",
      "Topic variety: nutrition, training, mindset, comp prep. Templates had to flex without breaking.",
    ],
    approach: [
      "Built a French-typography-aware production pipeline that handles orphans, accents, and copy length cleanly.",
      "Mix of AI-generated decoration and hand-finished design within a locked visual system.",
      "Recurring packs delivered ready to publish in the French market.",
    ],
    features: [
      "French typography handling",
      "AI + bespoke hybrid production",
      "Recurring monthly packs",
      "Topic-flexible template system",
      "Hand-finished hero slides",
      "Ongoing creative direction",
    ],
    gallery: [],
    graphics: [
      "/images/projects/prepdad-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/prepdad-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/prepdad-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/prepdad-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/prepdad-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/prepdad-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["fox-socials", "mrf-socials"],
  },

  {
    slug: "mrf-socials",
    title: "Marsha Rose Fit",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Coaching", "Editorial", "Ongoing"],
    heroImage: "/images/projects/mrf-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/mrf-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Marsha Rose Fit",
      industry: "Fitness Coaching",
      location: "UK",
      website: "https://www.instagram.com/marsharosefit/",
    },
    brief:
      "Recurring weekly IG carousel packs for Marsha Rose Fit. Editorial-led, magazine-grade visuals with strong typography and considered photography treatment.",
    challenge: [
      "Brand voice is editorial and confident. Most fitness graphics design defaults to gym-bro aesthetics that would have killed the tone.",
      "Weekly cadence with three distinct pack types in rotation.",
      "Photography is central. Treatment had to feel intentional, not auto-filtered.",
    ],
    approach: [
      "Editorial visual system: DM Serif Display italic hero treatment, chunky stickers, polaroid photography treatment.",
      "Three-pack rotation system: hero-led, photo-led, content-led.",
      "Recurring weekly packs with visual QA before sign-off.",
    ],
    features: [
      "Editorial magazine-grade visual system",
      "Three-pack rotation",
      "Weekly publishing cadence",
      "Considered photography treatment",
      "Locked typography discipline",
      "Visual QA per pack",
    ],
    gallery: [],
    graphics: [
      "/images/projects/mrf-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/mrf-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/mrf-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/mrf-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/mrf-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/mrf-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["fox-socials", "square-one-socials"],
  },

  {
    slug: "proiq-socials",
    title: "ProIQ",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Ongoing"],
    heroImage: "/images/projects/proiq-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/proiq-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "ProIQ",
      industry: "Coaching",
      location: "UK",
    },
    brief:
      "Recurring weekly IG carousel design for ProIQ. Strong visual line, locked system, ready-to-publish packs delivered on a schedule.",
    challenge: [
      "Weekly cadence at a quality bar that doesn't drift across hundreds of posts.",
      "Visual identity had to read distinctive every single time, not template-y.",
      "Topic range had to be supported without breaking the brand line.",
    ],
    approach: [
      "Locked carousel visual system covering covers, body slides, and CTAs.",
      "Recurring weekly packs designed within the system.",
      "Hand-finished, on-brand, ready to publish.",
    ],
    features: [
      "Custom IG carousel system",
      "Recurring weekly packs",
      "Locked brand discipline",
      "Hand-finished quality",
      "Ongoing creative direction",
      "Visual QA before sign-off",
    ],
    gallery: [],
    graphics: [
      "/images/projects/proiq-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/proiq-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/proiq-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/proiq-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/proiq-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/proiq-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["mrf-socials", "fox-socials"],
  },

  {
    slug: "cammy-socials",
    title: "Cammy",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Weekly", "Ongoing"],
    heroImage: "/images/projects/cammy-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/cammy-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Cammy",
      industry: "Coaching",
      location: "UK",
    },
    brief:
      "Weekly IG carousel design for Cammy. Recurring packs shipped on a tight cadence with a locked visual system that scales with the content.",
    challenge: [
      "Weekly output without quality drift.",
      "Distinct brand line across every pack.",
      "Topic flexibility without fragmenting the visual system.",
    ],
    approach: [
      "Locked carousel template system with hero, body, and CTA slide patterns.",
      "Recurring weekly packs designed bespoke within the system.",
      "Hand-finished quality, not auto-spammed templates.",
    ],
    features: [
      "Custom IG carousel system",
      "Recurring weekly packs",
      "Locked brand discipline",
      "Hand-finished slides",
      "Ongoing creative direction",
      "Ready-to-publish delivery",
    ],
    gallery: [],
    graphics: [
      "/images/projects/cammy-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/cammy-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/cammy-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/cammy-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/cammy-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/cammy-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["proiq-socials", "fox-socials"],
  },

  {
    slug: "matt-cusano-socials",
    title: "Matt Cusano",
    category: "Graphic Subscriptions",
    tags: ["IG Carousels", "Fortnightly", "Ongoing"],
    heroImage: "/images/projects/matt-cusano-socials/graphics/post-1-slide-01.jpg",
    thumbnailImage: "/images/projects/matt-cusano-socials/graphics/post-1-slide-01.jpg",
    hasImages: true,
    year: "2026 / Ongoing",
    client: {
      name: "Matt Cusano",
      industry: "Coaching",
      location: "UK",
    },
    brief:
      "Fortnightly IG carousel pack design for Matt Cusano. A sustainable cadence that keeps the visual brand sharp without quality compromise.",
    challenge: [
      "Fortnightly cadence means every pack has to land harder than a typical weekly post.",
      "Visual line had to flex across multiple content angles.",
      "Brand voice + design discipline locked across every drop.",
    ],
    approach: [
      "Locked carousel visual system designed for the fortnightly cadence.",
      "Each pack hand-finished within the system, not template-spammed.",
      "Ongoing creative direction across the engagement.",
    ],
    features: [
      "Custom IG carousel system",
      "Fortnightly publishing cadence",
      "Hand-finished quality",
      "Locked brand discipline",
      "Ongoing creative direction",
      "Visual QA per pack",
    ],
    gallery: [],
    graphics: [
      "/images/projects/matt-cusano-socials/graphics/post-1-slide-01.jpg",
      "/images/projects/matt-cusano-socials/graphics/post-2-slide-01.jpg",
      "/images/projects/matt-cusano-socials/graphics/post-3-slide-01.jpg",
      "/images/projects/matt-cusano-socials/graphics/post-1-slide-03.jpg",
      "/images/projects/matt-cusano-socials/graphics/post-2-slide-03.jpg",
      "/images/projects/matt-cusano-socials/graphics/post-3-slide-03.jpg",
    ],
    relatedProjects: ["cammy-socials", "proiq-socials"],
  },
];

// ============================================================================
// EXPORT
// ============================================================================

export const projects: ProjectData[] = [
  ...webProjects,
  ...landingProjects,
  ...brandingProjects,
  ...socialProjects,
];

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return projects.find((p) => p.slug === slug);
}
