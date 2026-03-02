import type { Company, Customer, TimelineEvent } from "./types";

export const companies: Company[] = [
  { id: "comp-1", name: "Meridian Legal Group" },
  { id: "comp-2", name: "Northwave Solutions" },
  { id: "comp-3", name: "Brisk Construction" },
  { id: "comp-4", name: "Elevate HR Partners" },
  { id: "comp-5", name: "Apex Financial Services" },
];

const customerNamesByCompany: string[][] = [
  [
    "Sarah Chen",
    "David Park",
    "Emma Rodriguez",
    "James O'Brien",
    "Lisa Nakamura",
    "Michael Torres",
    "Rachel Kim",
    "Tom Anderson",
    "Priya Patel",
    "Alex Henriksson",
  ],
  [
    "Nina Kowalski",
    "Ryan Adebayo",
    "Sophie Martin",
    "Carlos Ruiz",
    "Hannah Lee",
    "Oliver Grant",
    "Fatima Al-Rashid",
    "Jack Morrison",
    "Yuki Tanaka",
    "Megan Walsh",
  ],
  [
    "Ben Harper",
    "Ava Gonzalez",
    "Ethan Brooks",
    "Zara Okonkwo",
    "Liam Foster",
    "Julia Petrov",
    "Marcus Webb",
    "Chloe Dupont",
    "Daniel Singh",
    "Nadia Bergman",
  ],
  [
    "Chris Evans",
    "Maya Lin",
    "Patrick O'Sullivan",
    "Leila Hoffman",
    "Andre Williams",
    "Samantha Cruz",
    "Tyler Johansson",
    "Anika Sharma",
    "Owen Mitchell",
    "Rosa Fernandez",
  ],
  [
    "Jason Clarke",
    "Emily Zhao",
    "Robert Nkomo",
    "Ingrid Larsen",
    "Ahmad Hassan",
    "Vanessa Boyd",
    "Peter Magnusson",
    "Diana Volkov",
    "Sean Gallagher",
    "Mei-Ling Wu",
  ],
];

export const customers: Customer[] = companies.flatMap((company, ci) =>
  customerNamesByCompany[ci].map((name, i) => ({
    id: `cust-${ci + 1}-${i + 1}`,
    name,
    companyId: company.id,
  })),
);

function addDays(base: Date, days: number): string {
  const d = new Date(base);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function emailDomain(companyName: string): string {
  return companyName.toLowerCase().replace(/\s+/g, "") + ".com";
}

function createTimeline(
  customer: Customer,
  companyName: string,
  base: Date,
): TimelineEvent[] {
  const eid = (suffix: string) => `${customer.id}-${suffix}`;
  const d = (days: number) => addDays(base, days);
  const firstName = customer.name.split(" ")[0].toLowerCase();
  const domain = emailDomain(companyName);
  const day25 = d(25);
  const day60 = d(60);

  return [
    {
      id: eid("1"),
      type: "mail",
      date: d(0),
      title: "Introduction to ContractFlow",
      summary: `Outreach email introducing ContractFlow's contract management platform to ${customer.name} at ${companyName}. Highlighted key benefits around workflow automation and compliance tracking.`,
      mailThread: [
        {
          sender: "info@contractflow.com",
          subject: "Streamline your contracts with ContractFlow",
          body: `Hi ${customer.name},\n\nI came across ${companyName} and thought ContractFlow could be a great fit for streamlining your contract workflows. We help teams automate contract creation, approval routing, and compliance tracking.\n\nWould you be open to a quick intro call this week?\n\nBest,\nAnna Eriksson\nContractFlow`,
        },
        {
          sender: `${firstName}@${domain}`,
          subject: "Re: Streamline your contracts with ContractFlow",
          body: `Hi Anna,\n\nThanks for reaching out. We've been looking for something like this — our current process is mostly manual and it's becoming a bottleneck.\n\nHappy to set up a call. How does Thursday look?\n\nBest,\n${customer.name}`,
        },
      ],
    },
    {
      id: eid("2"),
      type: "platform-created",
      date: d(3),
      title: `Account created for ${companyName}`,
      summary: `${companyName} workspace provisioned with admin access for ${customer.name}. Default templates and sample contracts loaded.`,
    },
    {
      id: eid("3"),
      type: "trial-started",
      date: d(3),
      title: "14-day trial activated",
      summary: `Free trial started for ${customer.name} at ${companyName}. Full feature access enabled including e-signatures and template builder.`,
    },
    {
      id: eid("4"),
      type: "first-login",
      date: d(5),
      title: `First login by ${customer.name}`,
      summary: `${customer.name} logged in for the first time and completed the onboarding wizard. Imported 3 existing contract templates from their local drive.`,
    },
    {
      id: eid("5"),
      type: "usage-stats",
      date: d(12),
      title: "Week 1 usage report",
      summary: `First week of activity for ${customer.name}. Moderate engagement with the platform, mainly exploring template features and creating initial contracts.`,
      detail:
        "Weekly visits: 12 · Weekly contracts created: 3 · Templates customized: 2 · Team members invited: 0",
      links: [
        {
          label: "View in Posthog",
          url: `https://posthog.example.com/project/1/person/${customer.id}`,
        },
      ],
    },
    {
      id: eid("6"),
      type: "support-mail",
      date: d(14),
      title: "Question about template customization",
      summary: `${customer.name} asked about customizing approval workflows for ${companyName}'s multi-step review process. Support provided a step-by-step guide.`,
      mailThread: [
        {
          sender: `${firstName}@${domain}`,
          subject: "How to set up multi-step approvals?",
          body: `Hi,\n\nWe have a 3-step approval process for contracts over $10k — legal review, finance sign-off, then exec approval. How can I set this up in ContractFlow?\n\nThanks,\n${customer.name}`,
        },
        {
          sender: "support@contractflow.com",
          subject: "Re: How to set up multi-step approvals?",
          body: `Hi ${customer.name},\n\nGreat question! You can set up multi-step approvals under Settings → Workflows → Approval Chains. Here's a quick guide:\n\n1. Create a new approval chain\n2. Add three stages: Legal, Finance, Executive\n3. Assign reviewers to each stage\n4. Set the threshold trigger to $10,000\n\nLet me know if you need any help setting this up!\n\nBest,\nContractFlow Support`,
        },
        {
          sender: `${firstName}@${domain}`,
          subject: "Re: Re: How to set up multi-step approvals?",
          body: `That worked perfectly, thank you!\n\n${customer.name}`,
        },
      ],
    },
    {
      id: eid("7"),
      type: "usage-stats",
      date: d(21),
      title: "Week 3 usage report",
      summary: `Strong adoption growth for ${customer.name} at ${companyName}. Contract creation velocity has nearly quadrupled compared to week 1.`,
      detail:
        "Weekly visits: 28 · Weekly contracts created: 11 · Templates customized: 5 · Team members invited: 3",
      links: [
        {
          label: "View in Posthog",
          url: `https://posthog.example.com/project/1/person/${customer.id}`,
        },
      ],
    },
    {
      id: eid("8"),
      type: "became-customer",
      date: day25,
      title: `${companyName} signed annual contract`,
      summary: `${companyName} converted from trial to annual plan. Contract signed by ${customer.name}. 10-seat license with e-signature add-on included.`,
    },
    {
      id: eid("9"),
      type: "interview",
      date: d(35),
      title: "Onboarding feedback interview",
      summary: `${customer.name} shared positive feedback on the onboarding experience. Key highlights: intuitive template builder, fast support response. Suggested improvement: bulk import for existing contracts.`,
      transcript: [
        {
          question: "How has the onboarding experience been so far?",
          answer: `Really smooth overall. The onboarding wizard helped us get started quickly, and I was able to import our existing templates without too much hassle. The whole team at ${companyName} was up and running within a day.`,
        },
        {
          question: "Which features have been most valuable for your team?",
          answer:
            "The template builder is a game-changer for us. We used to spend hours formatting contracts manually. The approval workflow automation has also saved us a lot of back-and-forth emails.",
        },
        {
          question:
            "Have you encountered any pain points or areas for improvement?",
          answer:
            "The only thing I'd flag is bulk import. We have about 200 historical contracts and importing them one by one is tedious. A bulk upload feature would be really helpful.",
        },
        {
          question: "How does ContractFlow compare to your previous process?",
          answer:
            "Night and day. Before, we were tracking everything in spreadsheets and shared drives. Now everything is centralized, searchable, and we have actual audit trails. Our legal team loves it.",
        },
      ],
    },
    {
      id: eid("10"),
      type: "meeting-notes",
      date: day60,
      title: "Quarterly review meeting",
      summary: `Reviewed ${companyName}'s usage metrics and expansion plans with ${customer.name}. Discussed adding 5 more seats and enabling the API integration module.`,
      detail: `Attendees: ${customer.name} (${companyName}), Anna Eriksson (ContractFlow)\n\nAgenda:\n1. Review Q1 usage metrics\n2. Discuss team expansion\n3. API integration requirements\n\nKey takeaways:\n- ${companyName} has processed 47 contracts through ContractFlow this quarter\n- Team adoption is strong — all 10 licensed users are active weekly\n- ${customer.name} requested 5 additional seats for the finance department\n- Interest in API integration to connect ContractFlow with their existing CRM\n- Follow-up: send pricing proposal for additional seats and API module by end of week`,
      links: [
        {
          label: `Open in Drive: Notes meeting ${customer.name} ${day60}`,
          url: "https://docs.google.com/document/d/mock-doc-id/edit",
        },
      ],
    },
  ];
}

const companyBaseDates = [
  new Date(2024, 0, 8),
  new Date(2024, 1, 5),
  new Date(2024, 2, 11),
  new Date(2024, 3, 2),
  new Date(2024, 4, 14),
];

export const events: TimelineEvent[] = customers.flatMap((customer) => {
  const companyIndex = companies.findIndex((c) => c.id === customer.companyId);
  const company = companies[companyIndex];
  const customerIndex = customerNamesByCompany[companyIndex].indexOf(
    customer.name,
  );
  const base = new Date(companyBaseDates[companyIndex]);
  base.setDate(base.getDate() + customerIndex * 5);
  return createTimeline(customer, company.name, base);
});
