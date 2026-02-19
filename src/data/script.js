// ============================================================
// DUALTO ONBOARDING SIMULATOR — EXACT SCRIPT
// Follows the source document narrative word-for-word
// 39 screens total
// ============================================================

export const SCRIPT = [

  // ─────────────────────────────────────────────────────────
  // SCREEN 1 — INTRO / WELCOME
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_01",
    type: "intro",
    character: { side: "right", id: "sales" },
    heading: "Welcome!",
    body: [
      "You've received a hot lead for DUALTO in Apollo Hospital, Delhi.",
      "The hospital is interested.",
      "Your mission: onboard them onto Polyphonic Fleet without breaking the process!"
    ],
    ctaLabel: "Start Mission"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 2 — QUESTION: First step in onboarding journey
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_02",
    type: "question",
    character: null,
    question: "What is the first step in the onboarding journey?",
    multiSelect: false,
    options: [
      { id: "a", label: "Connectivity Readiness" },
      { id: "b", label: "Clinical Evaluation / Hospital IT Review" },
      { id: "c", label: "Activation & Go-Live" },
      { id: "d", label: "Device Installation" },
      { id: "e", label: "Polyphonic Preparation" }
    ],
    correctAnswer: ["b"],
    feedback: {
      correct: "Correct! Clinical Evaluation / Hospital IT Review is always the first step.",
      wrong: "Not quite. Think about what needs to happen before anything else."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 3 — STAGE 1 TRANSITION
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_03",
    type: "transition",
    stageNumber: 1,
    stageTitle: "Clinical Evaluation +\nHospital IT Review",
    preLabel: "It's time to start with",
    ctaLabel: "Let's Go"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 4 — INFO: HCP demos done + stakeholder list
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_04",
    type: "info",
    character: { side: "right", id: "sales" },
    body: [
      "You have successfully convinced all HCPs on DUALTO's features & benefits with multiple demonstrations across multiple departments.",
      "Now, you are stuck.",
      "What about connectivity & polyphonic – how do you start the discussion around it?",
      "Let's begin with identifying your key stakeholders for this step."
    ],
    stakeholders: [
      "Biomedical team",
      "IT Lead",
      "KOLs",
      "Purchase Head",
      "Scrub nurse"
    ],
    ctaLabel: "Continue"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 5 — QUESTION: Resources for BME & IT discussion
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_05",
    type: "question",
    character: { side: "left", id: "sales" },
    characterMood: "thinking",
    question: "Now you are planning to do a preliminary discussion around polyphonic fleet & connectivity with the BME & IT Team.\nWhat resources will you use for your discussion?",
    multiSelect: true,
    options: [
      { id: "a", label: "Technical Brochure" },
      { id: "b", label: "Service Brochure" },
      { id: "c", label: "Connectivity Welcome Packet" },
      { id: "d", label: "Cybersecurity Whitepaper" },
      { id: "e", label: "Privacy & Security Technical Brief" },
      { id: "f", label: "Installation Manual" },
      { id: "g", label: "Surgeon Training Guide" },
      { id: "h", label: "Audit Log Handbook" },
      { id: "i", label: "Marketing Product Poster" },
      { id: "j", label: "Sterilization Instructions" }
    ],
    correctAnswer: ["a", "c", "d", "e"],
    feedback: {
      correct: "Correct! The Technical Brochure, Connectivity Welcome Packet, Cybersecurity Whitepaper, and Privacy & Security Technical Brief are the right resources.",
      wrong: "Think carefully — you need documents relevant to technical and security concerns of a BME & IT team."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 6 — INFO: IT lead's encryption question
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_06",
    type: "info",
    character: { side: "right", id: "it" },
    body: [
      "The biomedical lead was quite convinced on the product offerings of Polyphonic.",
      "However, the IT lead still had a few unanswered questions.",
      "The hospital IT team has a very technical question for you!",
      "\"What kind of encryption mechanism does DUALTO use?\""
    ],
    ctaLabel: "Oh no..."
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 7 — INFO: You have no idea
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_07",
    type: "info",
    character: { side: "left", id: "sales" },
    characterMood: "confused",
    showQuestionMark: true,
    body: [
      "You have no idea how to answer the question."
    ],
    ctaLabel: "Find Help"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 8 — QUESTION: Who do you involve?
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_08",
    type: "question",
    character: null,
    question: "Alas, it's beyond your scope. Who do you involve now?",
    multiSelect: false,
    options: [
      { id: "a", label: "DUALTO Specialist" },
      { id: "b", label: "Marketing team (Call Bhanu, Jigmee, & Puneet)" },
      { id: "c", label: "APAC team" },
      { id: "d", label: "Biomed" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! The DUALTO Specialist is the right escalation point for technical questions.",
      wrong: "Think about who has the deepest technical knowledge of the DUALTO device itself."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 9 — QUESTION: Specialist needs support
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_09",
    type: "question",
    character: null,
    question: "The DUALTO specialist, is not 100% sure on how to answer the question.\nThe specialist needs additional support. Who will they reach out to?",
    multiSelect: false,
    options: [
      { id: "a", label: "Write an email to APAC Technical Team" },
      { id: "b", label: "Call the Local distributor" },
      { id: "c", label: "Meet with hospital IT team" },
      { id: "d", label: "Call Suraj / Santosh from Service Team" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Right! Writing an email to the APAC Technical Team is the correct escalation.",
      wrong: "When a technical question exceeds local expertise, there is a specific formal escalation process."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 10 — QUESTION: Email details
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_10",
    type: "question",
    character: null,
    question: "And what details must you include inside the email body?",
    multiSelect: true,
    options: [
      { id: "a", label: "Hospital name" },
      { id: "b", label: "Unique Hospital code" },
      { id: "c", label: "Contact name" },
      { id: "d", label: "Contact details" },
      { id: "e", label: "List of questions" },
      { id: "f", label: "Surgeon preferences" },
      { id: "g", label: "J&J WWID" },
      { id: "h", label: "Mahi's approval" }
    ],
    correctAnswer: ["a", "b", "c", "d", "e"],
    feedback: {
      correct: "Perfect! Hospital name, Unique Hospital code, Contact name, Contact details, and List of questions are the required details.",
      wrong: "Focus on the identification and query details needed for the APAC team to respond."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 11 — QUESTION: Which email inbox?
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_11",
    type: "question",
    character: null,
    question: "Great work! Now that we have the question, to which email inbox does it need to get sent to?",
    multiSelect: false,
    options: [
      { id: "a", label: "TechSupportAPAC@its.jnj.com" },
      { id: "b", label: "global.support@jnj.com" },
      { id: "c", label: "polyphonic@jnj.com" },
      { id: "d", label: "service@ethicon.com" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! TechSupportAPAC@its.jnj.com is the designated inbox for APAC technical support queries.",
      wrong: "There is a specific regional technical support inbox for the APAC team."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 12 — INFO: Email sent, IT assessment approved
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_12",
    type: "info",
    character: { side: "right", id: "it" },
    body: [
      "The email is complete!",
      "You send it.",
      "Now that the IT lead's question was successfully answered, the IT assessment is approved by the IT Team."
    ],
    ctaLabel: "Move to Stage 2"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 13 — STAGE 2 TRANSITION
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_13",
    type: "transition",
    stageNumber: 2,
    stageTitle: "Connectivity Readiness",
    preLabel: "Now, it's time to start with",
    ctaLabel: "Let's Go"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 14 — QUESTION: Tasks before PO
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_14",
    type: "question",
    character: null,
    question: "You are almost two weeks away from receiving the purchase order for Dualto. Since DUALTO is a connected device, what do you think are the tasks that you should accomplish before the PO is received?",
    multiSelect: true,
    options: [
      { id: "a", label: "Reserving a physical Ethernet port" },
      { id: "b", label: "Single Sign-On federation" },
      { id: "c", label: "Device shipment tracking" },
      { id: "d", label: "Machine assembly" }
    ],
    correctAnswer: ["a", "b"],
    feedback: {
      correct: "Correct! Reserving an Ethernet port and completing SSO federation must be done before the PO arrives.",
      wrong: "Think about what connectivity infrastructure needs to be in place before the device arrives."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 15 — QUESTION: Ethernet connection methods
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_15",
    type: "question",
    character: { side: "right", id: "it" },
    preText: "Since wi-fi capabilities are not yet activated in DUALTO, Ethernet connection is a must at the hospital.\n\nThe IT admin now has a question for you.\n\n\"How do I connect this to the Ethernet?\"\n\nYou explain to them that the 2 methods are:",
    question: "Select the 2 correct Ethernet connection methods:",
    multiSelect: true,
    options: [
      { id: "a", label: "Wired Ethernet connection via LAN" },
      { id: "b", label: "Tethered to a connected computer" },
      { id: "c", label: "Wi-Fi hotspot" },
      { id: "d", label: "Bluetooth" }
    ],
    correctAnswer: ["a", "b"],
    feedback: {
      correct: "Correct! Wired Ethernet via LAN and tethering to a connected computer are the two supported methods.",
      wrong: "Remember — Wi-Fi is not yet activated in DUALTO. Only wired methods are supported."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 16 — QUESTION: SSO benefit
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_16",
    type: "question",
    character: { side: "right", id: "it" },
    preText: "\"Great! Let me know once your device is available. I have reserved one ethernet port for dualto in my office.\n\nYou also mentioned that SSO is recommended prior to installing DUALTO. What benefit will this have for me & my team?\"\n\nYou tell them:",
    question: "What is the benefit of SSO?",
    multiSelect: false,
    options: [
      { id: "a", label: "Users log in using their hospital organization account" },
      { id: "b", label: "Remote surgery access" },
      { id: "c", label: "Firmware auto-updates" },
      { id: "d", label: "Surgeon profile sync" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! SSO allows users to log in using their hospital organisation credentials.",
      wrong: "Think about what SSO specifically enables in terms of the hospital's day-to-day login experience."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 17 — INFO: SSO prevents MFA
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_17",
    type: "info",
    character: { side: "right", id: "it" },
    body: [
      "\"Great, SSO is absolutely fantastic since it prevents multi-factor authentication during logging in.\""
    ],
    ctaLabel: "Continue"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 18 — QUESTION: Which form section for SSO Federation?
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_18",
    type: "question",
    character: null,
    question: "To enable SSO Federation, you sit with the Hospital IT Team, and fill which form section?",
    multiSelect: false,
    options: [
      { id: "a", label: "Federation section in Connectivity Welcome Packet" },
      { id: "b", label: "Purchase order form" },
      { id: "c", label: "MAC request form" },
      { id: "d", label: "Federation section in Service contract" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! The Federation section inside the Connectivity Welcome Packet is where SSO federation is enabled.",
      wrong: "Think about the connectivity-specific resource you discussed earlier with the IT team."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 19 — INFO: Connectivity packet visual
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_19",
    type: "info",
    character: null,
    showAsset: "connectivity-packet",
    body: [
      "The Connectivity Welcome Packet contains everything the IT team needs — including the Federation section for SSO setup and the list of URLs to whitelist."
    ],
    ctaLabel: "Continue"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 20 — TRANSITION: PO received + Stage 3
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_20",
    type: "transition",
    stageNumber: 3,
    stageTitle: "Polyphonic Preparation",
    preLabel: "Congratulations, the PO has been received!\nNow it is time to start with",
    ctaLabel: "Let's Go"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 21 — INFO: Purchase team dialogue
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_21",
    type: "info",
    character: { side: "right", id: "sales" },
    body: [
      "The purchase team says, \"Congratulations, here is the PO for DUALTO Energy system. We need the installation to begin asap.\""
    ],
    ctaLabel: "Continue"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 22 — INFO: Create Polyphonic Fleet account
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_22",
    type: "info",
    character: { side: "right", id: "sales" },
    body: [
      "It's time that you create the polyphonic fleet account for the hospital now, so that during installation, the hospital is able to link their DUALTO system with their polyphonic fleet account.",
      "You visit the biomed head again.",
      "\"Sir, I want some information from you in order to create your polyphonic fleet account via the APAC technical team.\""
    ],
    ctaLabel: "Continue"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 23 — INFO: Biomed response
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_23",
    type: "info",
    character: { side: "left", id: "biomed" },
    body: [
      "\"Sure, how can I help you?\""
    ],
    ctaLabel: "Continue"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 24 — QUESTION: Which form to fill?
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_24",
    type: "question",
    character: { side: "right", id: "sales" },
    question: "\"I need you to fill out the ____\"",
    multiSelect: false,
    options: [
      { id: "a", label: "Intake form" },
      { id: "b", label: "Polyphonic form" },
      { id: "c", label: "Activation form" },
      { id: "d", label: "Dualto blazer dimensions form" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! The Intake Form is what you ask the Biomed Head to fill out.",
      wrong: "There is a specific named form for collecting information to create the Polyphonic Fleet account."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 25 — INFO: Try out the form (with clickable link)
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_25",
    type: "info",
    character: null,
    body: [
      "Try out the form here!"
    ],
    externalLink: {
      label: "Open Intake Form \u2192",
      url: "https://forms.office.com/Pages/ResponsePage.aspx?id=M0vJOjWRIUiVAur9plkqNdoUYLrfakJFrSl0JL_ZuyxUNlZQOFhaRzhPSEhKN0RJNlhZUEs1VjM2Wi4u"
    },
    ctaLabel: "I've Reviewed It"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 26 — QUESTION: How many biomed admin users?
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_26",
    type: "question",
    character: null,
    question: "While filling the intake form, how many biomed admin users' credentials were asked?",
    multiSelect: false,
    options: [
      { id: "a", label: "1" },
      { id: "b", label: "2" },
      { id: "c", label: "3" },
      { id: "d", label: "4" }
    ],
    correctAnswer: ["b"],
    feedback: {
      correct: "Correct! The Intake Form asks for credentials of 2 biomed admin users.",
      wrong: "Go back to the form — check exactly how many admin user credentials are requested."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 27 — TRANSITION: Device shipped + Stage 4
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_27",
    type: "transition",
    stageNumber: 4,
    stageTitle: "Activation & Go-Live",
    preLabel: "Great work.\nYou just heard from the supply chain team that the DUALTO unit is shipped for India. You have the MAC addresses for the communications module.\nNext, we move onto",
    ctaLabel: "Let's Go"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 28 — QUESTION: Immediate next step with MAC address
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_28",
    type: "question",
    character: null,
    question: "Now, there is hardly any time left, & the installation timelines are coming closer.\nWhat is the immediate next step that you should follow?",
    multiSelect: false,
    options: [
      { id: "a", label: "Get the MAC address whitelisted" },
      { id: "b", label: "Get the MAC address verified" },
      { id: "c", label: "Get the MAC address authorized" },
      { id: "d", label: "Get the MAC address greenlisted" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! Whitelisting the MAC address with the hospital IT team is the critical next step.",
      wrong: "There is a specific term for allowing a MAC address through the hospital network firewall."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 29 — INFO: MAC address explainer
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_29",
    type: "info",
    character: null,
    showAsset: "mac-address-slide",
    body: [
      "Quick information: What are MAC addresses, & why do we need to whitelist them before installation?",
      "A MAC (Media Access Control) address is a unique hardware identifier assigned to the DUALTO communications module.",
      "Whitelisting ensures the hospital's network recognises and allows the DUALTO device to connect — without it, the device would be blocked."
    ],
    ctaLabel: "Got It"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 30 — QUESTION: Additional URLs to whitelist?
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_30",
    type: "question",
    character: { side: "right", id: "it" },
    preText: "The IT lead asks you, \"Is that all? Just an update; the Apollo internet network usually blocks a lot of web pages & websites. Are there any additional URLs (webpage addresses) that you want me to whitelist?\"\n\nWhat do you say?",
    question: "Are there additional URLs to whitelist?",
    multiSelect: false,
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! DUALTO requires specific URLs to be whitelisted to communicate with Polyphonic Fleet.",
      wrong: "DUALTO is a connected cloud device — it needs to reach specific web addresses to function."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 31 — INFO: URLs list/image
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_31",
    type: "info",
    character: null,
    showAsset: "urls-list",
    body: [
      "Share this list of URLs with the hospital IT team for whitelisting.",
      "They are all documented in the Connectivity Welcome Packet."
    ],
    ctaLabel: "Continue"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 32 — TRANSITION: Happy Install Day + Stage 5
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_32",
    type: "transition",
    stageNumber: 5,
    stageTitle: "Device Installation",
    preLabel: "Happy Install Day!\nThe Dualto has finally reached Apollo Hospital, Delhi.\nIt is time to start with",
    ctaLabel: "Open the Boxes!"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 33 — QUESTION: Assembly order
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_33",
    type: "question",
    character: null,
    question: "You open the boxes.\nIn what order do you assemble the DUALTO?",
    multiSelect: false,
    options: [
      { id: "a", label: "Energy Module \u2192 Communication Module \u2192 User Screen" },
      { id: "b", label: "Screen \u2192 Energy \u2192 Communication" },
      { id: "c", label: "Communication \u2192 Screen \u2192 Energy" },
      { id: "d", label: "It's a modular device, so order does not matter" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! Energy Module first, then Communication Module, then the User Screen.",
      wrong: "There is a specific required assembly sequence for DUALTO."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 34 — INFO: QR code / 8-digit login
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_34",
    type: "info",
    character: null,
    showAsset: "qr-code-screen",
    body: [
      "Now that the assembly is done, and the device is turned on, and connected to the internet, the device asks the hospital to log in to their Polyphonic fleet account via scanning the QR code or entering the 8 digit code at the below website URL.",
      "Once the biomed logs in to the polyphonic fleet account & authenticates, the device gets installed."
    ],
    ctaLabel: "Continue"
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 35 — QUESTION: Customisable settings
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_35",
    type: "question",
    character: null,
    question: "The DUALTO is set up. It is time to explain customization to the hospital team.\nYou tell them that, out of the following, the settings that can be customized are:",
    multiSelect: true,
    options: [
      { id: "a", label: "System colours" },
      { id: "b", label: "Display font size" },
      { id: "c", label: "Screen brightness" },
      { id: "d", label: "System volume" },
      { id: "e", label: "Default energy settings" },
      { id: "f", label: "Surgeon / procedure profiles" }
    ],
    correctAnswer: ["b", "c", "e", "f"],
    feedback: {
      correct: "Correct! Display font size, Screen brightness, Default energy settings, and Surgeon/procedure profiles are all customisable.",
      wrong: "Not all settings are customisable. Focus on the operational and user-preference settings."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 36 — QUESTION: Output verification equipment
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_36",
    type: "question",
    character: { side: "left", id: "biomed" },
    question: "Now, Biomed prepares for output verification. The biomed additionally wants to check the energy output of each DUALTO port.\nWhat equipment do they need?",
    multiSelect: false,
    options: [
      { id: "a", label: "ETHOVK output verification key + footswitch" },
      { id: "b", label: "USB tester" },
      { id: "c", label: "Sensor cable" },
      { id: "d", label: "Network adapter" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! The ETHOVK output verification key combined with the footswitch is the required equipment.",
      wrong: "There is a specific verification tool designed for DUALTO energy output testing."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 37 — QUESTION: Where to reach for future issues?
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_37",
    type: "question",
    character: null,
    question: "All done. You just need to guide the team on what to do in case of any issues in the future.\nWhere can they reach out?",
    multiSelect: false,
    options: [
      { id: "a", label: "TechSupportAPAC@its.jnj.com" },
      { id: "b", label: "Sales rep only" },
      { id: "c", label: "Distributor" },
      { id: "d", label: "Marketing Team" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! TechSupportAPAC@its.jnj.com is the dedicated support inbox for post-installation issues.",
      wrong: "The hospital should have a direct line to technical support — not through sales or marketing."
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 38 — QUESTION: Final — correct stage order
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_38",
    type: "question",
    character: { side: "right", id: "sales" },
    question: "The work is done. Time for a pat on the back!\nHowever, before leaving the hospital, mentally replay the journey.\nWhat was the correct order?",
    multiSelect: false,
    options: [
      {
        id: "a",
        label: "Clinical Evaluation \u2192 Connectivity Readiness \u2192 Polyphonic Preparation \u2192 Activation & Go-Live \u2192 Device Installation"
      },
      {
        id: "b",
        label: "Connectivity \u2192 Clinical Evaluation \u2192 Installation \u2192 Activation \u2192 Preparation"
      },
      {
        id: "c",
        label: "Activation \u2192 Preparation \u2192 Connectivity \u2192 Installation \u2192 Clinical Evaluation"
      }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Outstanding! You've mastered the complete DUALTO onboarding journey!",
      wrong: "Replay the journey — which stage logically has to come before the next?"
    }
  },

  // ─────────────────────────────────────────────────────────
  // SCREEN 39 — COMPLETION
  // ─────────────────────────────────────────────────────────
  {
    id: "screen_39",
    type: "completion",
    character: { side: "right", id: "sales" },
    heading: "Congratulations!",
    body: [
      "That was quite a lot, but you have successfully completed the simulation!",
      "Welcome to the team."
    ]
  }
];

// ============================================================
// CHARACTER DEFINITIONS
// ============================================================
export const CHARACTERS = {
  sales: {
    id: "sales",
    name: "Sales Rep",
    placeholderColor: "#CA001B"
  },
  biomed: {
    id: "biomed",
    name: "Biomedical Lead",
    placeholderColor: "#1B2B5E"
  },
  it: {
    id: "it",
    name: "IT Lead",
    placeholderColor: "#2D3748"
  }
};

// ============================================================
// STAGE METADATA
// ============================================================
export const STAGES = [
  { number: 1, title: "Clinical Evaluation + Hospital IT Review" },
  { number: 2, title: "Connectivity Readiness" },
  { number: 3, title: "Polyphonic Preparation" },
  { number: 4, title: "Activation & Go-Live" },
  { number: 5, title: "Device Installation" }
];

// ============================================================
// HELPER: Get current stage from screen id
// ============================================================
export function getCurrentStage(screenIndex) {
  const screen = SCRIPT[screenIndex];
  if (!screen) return null;
  if (screen.type === "transition" || screen.type === "completion") {
    return STAGES.find(s => s.number === screen.stageNumber) || null;
  }
  if (screenIndex <= 2) return STAGES[0];
  if (screenIndex <= 11) return STAGES[0];
  if (screenIndex <= 18) return STAGES[1];
  if (screenIndex <= 25) return STAGES[2];
  if (screenIndex <= 30) return STAGES[3];
  return STAGES[4];
}
