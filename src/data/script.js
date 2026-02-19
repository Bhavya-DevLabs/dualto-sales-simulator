// ============================================================
// DUALTO ONBOARDING SIMULATOR — FINAL CORRECTED SCRIPT
// ============================================================

export const SCRIPT = [
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
      wrong: "Not quite — think about what must happen before any technical work begins."
    }
  },
  {
    id: "screen_03",
    type: "transition",
    stageNumber: 1,
    stageTitle: "Clinical Evaluation +\nHospital IT Review",
    preLabel: "It's time to start with",
    ctaLabel: "Let's Go"
  },
  {
    id: "screen_04",
    type: "question",
    character: { side: "right", id: "sales" },
    preText: "You have successfully convinced all HCPs on DUALTO's features & benefits with multiple demonstrations across multiple departments.\n\nNow, you are stuck.\n\nWhat about connectivity & polyphonic – how do you start the discussion around it?\n\nLet's begin with identifying your key stakeholders for this step.",
    question: "Who are the key stakeholders for the connectivity & Polyphonic Fleet discussion? (Select all that apply)",
    multiSelect: true,
    options: [
      { id: "a", label: "Biomedical team" },
      { id: "b", label: "IT Lead" },
      { id: "c", label: "KOLs" },
      { id: "d", label: "Purchase Head" },
      { id: "e", label: "Scrub nurse" }
    ],
    correctAnswer: ["a", "b"],
    feedback: {
      correct: "Correct! The Biomedical team and IT Lead are your primary stakeholders for connectivity discussions.",
      wrong: "Think about who would be most directly involved in a technical connectivity discussion."
    }
  },
  {
    id: "screen_05",
    type: "question",
    character: { side: "left", id: "sales" },
    characterMood: "thinking",
    question: "Now you are planning to do a preliminary discussion around Polyphonic Fleet & connectivity with the BME & IT Team.\nWhat resources will you use for your discussion? (Select all that apply)",
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
      wrong: "Think about what a BME & IT team needs — technical and security documents, not clinical or surgical ones."
    }
  },
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
      correct: "Correct! The DUALTO Specialist is the right first escalation point for technical product questions.",
      wrong: "Think about who has the deepest technical knowledge of the DUALTO device itself."
    }
  },
  {
    id: "screen_09",
    type: "question",
    character: null,
    question: "The DUALTO specialist is not 100% sure how to answer the question.\nThe specialist needs additional support. Who will they reach out to?",
    multiSelect: false,
    options: [
      { id: "a", label: "Write an email to APAC Technical Team" },
      { id: "b", label: "Call the Local distributor" },
      { id: "c", label: "Meet with hospital IT team" },
      { id: "d", label: "Call Suraj / Santosh from Service Team" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! Writing an email to the APAC Technical Team is the proper escalation channel.",
      wrong: "There is a specific formal escalation process for technical queries beyond local expertise."
    }
  },
  {
    id: "screen_10",
    type: "question",
    character: null,
    question: "And what details must you include inside the email body? (Select all that apply)",
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
      correct: "Perfect! Hospital name, Unique Hospital code, Contact name, Contact details, and List of questions are all required.",
      wrong: "Focus on what the APAC team needs to identify the hospital and understand the query."
    }
  },
  {
    id: "screen_11",
    type: "question",
    character: null,
    question: "Great work! Now that we have all the details — to which email inbox does it need to be sent?",
    multiSelect: false,
    options: [
      { id: "a", label: "TechSupportAPAC@its.jnj.com" },
      { id: "b", label: "global.support@jnj.com" },
      { id: "c", label: "polyphonic@jnj.com" },
      { id: "d", label: "service@ethicon.com" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! TechSupportAPAC@its.jnj.com is the dedicated APAC technical support inbox.",
      wrong: "There is a specific regional technical support inbox for the APAC team — look carefully."
    }
  },
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
  {
    id: "screen_13",
    type: "transition",
    stageNumber: 2,
    stageTitle: "Connectivity Readiness",
    preLabel: "Now, it's time to start with",
    ctaLabel: "Let's Go"
  },
  {
    id: "screen_14",
    type: "question",
    character: null,
    question: "You are almost two weeks away from receiving the purchase order for DUALTO. Since it is a connected device, what tasks should you accomplish before the PO is received? (Select all that apply)",
    multiSelect: true,
    options: [
      { id: "a", label: "Reserving a physical Ethernet port" },
      { id: "b", label: "Single Sign-On federation" },
      { id: "c", label: "Device shipment tracking" },
      { id: "d", label: "Machine assembly" }
    ],
    correctAnswer: ["a", "b"],
    feedback: {
      correct: "Correct! Reserving an Ethernet port and completing SSO federation must be done before the device arrives.",
      wrong: "Think about connectivity infrastructure that needs to be ready before the device even reaches the hospital."
    }
  },
  {
    id: "screen_15",
    type: "question",
    character: { side: "right", id: "it" },
    preText: "Since Wi-Fi capabilities are not yet activated in DUALTO, Ethernet connection is a must at the hospital.\n\nThe IT admin asks:\n\"How do I connect this to the Ethernet?\"\n\nYou explain that the 2 methods are:",
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
      wrong: "Remember — Wi-Fi is not yet activated in DUALTO. Only wired connection methods are supported."
    }
  },
  {
    id: "screen_16",
    type: "question",
    character: { side: "right", id: "it" },
    preText: "\"Great! Let me know once your device is available. I have reserved one Ethernet port for DUALTO in my office.\n\nYou also mentioned that SSO is recommended prior to installing DUALTO. What benefit will this have for me & my team?\"\n\nYou tell them:",
    question: "What is the key benefit of SSO?",
    multiSelect: false,
    options: [
      { id: "a", label: "Users log in using their hospital organization account" },
      { id: "b", label: "Remote surgery access" },
      { id: "c", label: "Firmware auto-updates" },
      { id: "d", label: "Surgeon profile sync" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! SSO allows users to log in using their existing hospital organisation credentials.",
      wrong: "Think specifically about what SSO changes for the hospital's daily login experience."
    }
  },
  {
    id: "screen_17",
    type: "info",
    character: { side: "right", id: "it" },
    body: [
      "\"Great, SSO is absolutely fantastic since it prevents multi-factor authentication during logging in.\""
    ],
    ctaLabel: "Continue"
  },
  {
    id: "screen_18",
    type: "question",
    character: null,
    question: "To enable SSO Federation, you sit with the Hospital IT Team and fill which form section?",
    multiSelect: false,
    options: [
      { id: "a", label: "Federation section in Connectivity Welcome Packet" },
      { id: "b", label: "Purchase order form" },
      { id: "c", label: "MAC request form" },
      { id: "d", label: "Federation section in Service contract" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! The Federation section inside the Connectivity Welcome Packet is where SSO is enabled.",
      wrong: "Think about the connectivity-specific resource you discussed earlier with the IT team."
    }
  },
  {
    id: "screen_19",
    type: "info",
    character: null,
    body: [
      "The Connectivity Welcome Packet contains everything the IT team needs.",
      "Including the Federation section for SSO setup and the full list of URLs to whitelist."
    ],
    ctaLabel: "Continue"
  },
  {
    id: "screen_20",
    type: "transition",
    stageNumber: 3,
    stageTitle: "Polyphonic Preparation",
    preLabel: "Congratulations, the PO has been received!\nNow it's time to start with",
    ctaLabel: "Let's Go"
  },
  {
    id: "screen_21",
    type: "info",
    character: { side: "right", id: "sales" },
    body: [
      "The purchase team says:",
      "\"Congratulations, here is the PO for DUALTO Energy system. We need the installation to begin asap.\""
    ],
    ctaLabel: "Continue"
  },
  {
    id: "screen_22",
    type: "info",
    character: { side: "right", id: "sales" },
    body: [
      "It's time to create the Polyphonic Fleet account for the hospital.",
      "So that during installation, they can link their DUALTO system to their account.",
      "You visit the biomed head again.",
      "\"Sir, I want some information from you in order to create your Polyphonic Fleet account via the APAC technical team.\""
    ],
    ctaLabel: "Continue"
  },
  {
    id: "screen_23",
    type: "info",
    character: { side: "left", id: "biomed" },
    body: [
      "\"Sure, how can I help you?\""
    ],
    ctaLabel: "Continue"
  },
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
      correct: "Correct! The Intake Form is what the Biomed Head needs to fill to create the Polyphonic Fleet account.",
      wrong: "There is a specific named form for collecting information to set up the Polyphonic Fleet account."
    }
  },
  {
    id: "screen_25",
    type: "info",
    character: null,
    body: [
      "The Intake Form collects all the details the APAC team needs to set up the hospital's Polyphonic Fleet account.",
      "Try out the form here!"
    ],
    externalLink: {
      label: "Open Intake Form →",
      url: "https://forms.office.com/Pages/ResponsePage.aspx?id=M0vJOjWRIUiVAur9plkqNdoUYLrfakJFrSl0JL_ZuyxUNlZQOFhaRzhPSEhKN0RJNlhZUEs1VjM2Wi4u"
    },
    ctaLabel: "I've Reviewed It"
  },
  {
    id: "screen_26",
    type: "question",
    character: null,
    question: "While filling the intake form, how many biomed admin users' credentials were asked for?",
    multiSelect: false,
    options: [
      { id: "a", label: "1" },
      { id: "b", label: "2" },
      { id: "c", label: "3" },
      { id: "d", label: "4" }
    ],
    correctAnswer: ["b"],
    feedback: {
      correct: "Correct! The Intake Form requests credentials for 2 biomed admin users.",
      wrong: "Try opening the actual form and check how many admin user fields are present."
    }
  },
  {
    id: "screen_27",
    type: "transition",
    stageNumber: 4,
    stageTitle: "Activation & Go-Live",
    preLabel: "Great work.\nYou just heard from the supply chain team that the DUALTO unit is shipped for India. You have the MAC addresses for the communications module.\nNext, we move onto",
    ctaLabel: "Let's Go"
  },
  {
    id: "screen_28",
    type: "question",
    character: null,
    question: "Now, there is hardly any time left & the installation timelines are coming closer.\nWhat is the immediate next step that you should follow?",
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
      wrong: "There is a specific term for allowing a device's hardware address through a network firewall."
    }
  },
  {
    id: "screen_29",
    type: "info",
    character: null,
    body: [
      "Quick information: What are MAC addresses & why do we need to whitelist them?",
      "A MAC (Media Access Control) address is a unique hardware identifier assigned to the DUALTO communications module.",
      "Whitelisting tells the hospital's network to recognise and allow DUALTO to connect — without it, the device would be blocked."
    ],
    ctaLabel: "Got It"
  },
  {
    id: "screen_30",
    type: "question",
    character: { side: "right", id: "it" },
    preText: "The IT lead asks:\n\"Is that all? Just an update — the Apollo internet network usually blocks a lot of web pages & websites. Are there any additional URLs (webpage addresses) that you want me to whitelist?\"\n\nWhat do you say?",
    question: "Are there additional URLs to whitelist?",
    multiSelect: false,
    options: [
      { id: "a", label: "Yes" },
      { id: "b", label: "No" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! DUALTO requires specific URLs to be whitelisted to communicate with Polyphonic Fleet.",
      wrong: "DUALTO is a cloud-connected device — it must be able to reach specific web addresses to function."
    }
  },
  {
    id: "screen_31",
    type: "info",
    character: null,
    body: [
      "Share this list of required URLs with the hospital IT team for whitelisting.",
      "All URLs are documented in the Connectivity Welcome Packet."
    ],
    ctaLabel: "Continue"
  },
  {
    id: "screen_32",
    type: "transition",
    stageNumber: 5,
    stageTitle: "Device Installation",
    preLabel: "Happy Install Day!\nThe DUALTO has finally reached Apollo Hospital, Delhi.\nIt is time to start with",
    ctaLabel: "Open the Boxes!"
  },
  {
    id: "screen_33",
    type: "question",
    character: null,
    question: "You open the boxes.\nIn what order do you assemble the DUALTO?",
    multiSelect: false,
    options: [
      { id: "a", label: "Energy Module → Communication Module → User Screen" },
      { id: "b", label: "Screen → Energy → Communication" },
      { id: "c", label: "Communication → Screen → Energy" },
      { id: "d", label: "It's a modular device, so order does not matter" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Correct! Energy Module first, then Communication Module, then the User Screen.",
      wrong: "There is a specific required assembly sequence. Refer to the installation documentation."
    }
  },
  {
    id: "screen_34",
    type: "info",
    character: null,
    body: [
      "Now that the assembly is done and the device is connected to the internet...",
      "The device asks the hospital to log in to their Polyphonic Fleet account — either by scanning the QR code or entering the 8-digit code at the website URL.",
      "Once the biomed logs in and authenticates, the device gets installed."
    ],
    ctaLabel: "Continue"
  },
  {
    id: "screen_35",
    type: "question",
    character: null,
    question: "The DUALTO is set up. It is time to explain customization to the hospital team.\nOut of the following, which settings can be customized? (Select all that apply)",
    multiSelect: true,
    options: [
      { id: "a", label: "System colours" },
      { id: "b", label: "Display font size" },
      { id: "c", label: "Screen brightness" },
      { id: "d", label: "System volume" },
      { id: "e", label: "Default energy settings" },
      { id: "f", label: "Surgeon / procedure profiles" }
    ],
    correctAnswer: ["c", "d", "e", "f"],
    feedback: {
      correct: "Correct! Screen brightness, System volume, Default energy settings, and Surgeon/procedure profiles are all customisable.",
      wrong: "Not all settings are customisable on DUALTO. Focus on operational and clinical preference settings."
    }
  },
  {
    id: "screen_36",
    type: "question",
    character: { side: "left", id: "biomed" },
    question: "Now, Biomed prepares for output verification. The biomed wants to check the energy output of each DUALTO port.\nWhat equipment do they need?",
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
      correct: "Correct! TechSupportAPAC@its.jnj.com is the dedicated support inbox for all post-installation issues.",
      wrong: "The hospital needs a direct technical support line — not a route through sales or marketing."
    }
  },
  {
    id: "screen_38",
    type: "question",
    character: { side: "right", id: "sales" },
    question: "The work is done. Time for a pat on the back!\nBefore leaving the hospital, mentally replay the journey.\nWhat was the correct order?",
    multiSelect: false,
    options: [
      { id: "a", label: "Clinical Evaluation → Connectivity Readiness → Polyphonic Preparation → Activation & Go-Live → Device Installation" },
      { id: "b", label: "Connectivity → Clinical Evaluation → Installation → Activation → Preparation" },
      { id: "c", label: "Activation → Preparation → Connectivity → Installation → Clinical Evaluation" }
    ],
    correctAnswer: ["a"],
    feedback: {
      correct: "Outstanding! You've mastered the complete DUALTO onboarding journey from start to finish!",
      wrong: "Replay the journey — each stage logically must come before the next."
    }
  },
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

export const CHARACTERS = {
  sales: { id: "sales", name: "Sales Rep", placeholderColor: "#CA001B" },
  biomed: { id: "biomed", name: "Biomedical Lead", placeholderColor: "#1B2B5E" },
  it: { id: "it", name: "IT Lead", placeholderColor: "#2D3748" }
};

export const STAGES = [
  { number: 1, title: "Clinical Evaluation + Hospital IT Review" },
  { number: 2, title: "Connectivity Readiness" },
  { number: 3, title: "Polyphonic Preparation" },
  { number: 4, title: "Activation & Go-Live" },
  { number: 5, title: "Device Installation" }
];

export function getCurrentStage(screenIndex) {
  if (screenIndex <= 2) return null;
  if (screenIndex <= 11) return STAGES[0];
  if (screenIndex <= 18) return STAGES[1];
  if (screenIndex <= 25) return STAGES[2];
  if (screenIndex <= 30) return STAGES[3];
  return STAGES[4];
}
