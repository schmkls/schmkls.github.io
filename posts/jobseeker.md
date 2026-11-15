# JobSeeker

Weighted parameter job matching

## The idea

A job search platform where candidates define *what matters to them* and *how much it matters*, then get a ranked list of jobs scored against those criteria.

## Who it's for

Candidates who want more control than keyword filters allow — people who care about specific, sometimes unconventional things (founder background, company vision, team culture) and want each of them weighted into the match score.

## Core mechanic

Each parameter has three parts:

1. **Description** — a short explanation of what the parameter measures.
2. **Match criteria** — what the user is looking for (free text, structured, or chosen from defaults).
3. **Importance weight (1–10)** — how much this parameter influences the overall score.

Users start with a small set of default parameters (e.g. Location, Role, Salary) and can add their own. Some defaults are smart — e.g. Location offers "Remote" or a map picker.

The platform produces a ranked list of jobs with a composite score and a per-parameter breakdown.

## Example: parameters one candidate might add

The sections below illustrate parameters a single candidate might configure for themselves — not platform-provided defaults. They show the range from conventional filters (role, salary) to softer signals (founder background, team culture) that traditional job boards don't surface.

### Job basics

**Role Type**

- *Description:* Job title or function
- *Match against:* Software engineer, developer, product development
- *Importance:* 9

**Salary**

- *Description:* Monthly gross salary
- *Match against:* >40,000 SEK/month
- *Importance:* 5

**Employment Type**

- *Description:* Contract form
- *Match against:* Full-time permanent employment
- *Importance:* 7

**Location**

- *Description:* Where the job is based and commute constraints
- *Match against:* Within 40 min commute of KTH Royal Institute of Technology
- *Importance:* 6

**Company Type**

- *Description:* What the company does and what kind of product it sells
- *Match against:* SaaS product that clearly benefits society — solves real problems, creates opportunities, saves time or money. Automates processes, provides tools, simplifies communication, surfaces insights, or similar.
- *Importance:* 8

**Company Vision**

- *Description:* The vision the company communicates on its website, social media, or elsewhere
- *Match against:* Ambitious but realistic vision that goes beyond revenue — aims to meaningfully improve a process or part of society.
- *Importance:* 6

### Team experience & skills

**Founder Domain Expertise**

- *Description:* Does the founder have deep knowledge of the problem the product solves?
- *Match against:* Founder has direct, hands-on experience in the problem domain (not just adjacent industry experience).
- *Importance:* 7

**Founder Role**

- *Description:* The founder's involvement in the company
- *Match against:* Founder(s) are active in leadership roles within product development, sales, or similar.
- *Importance:* 7

**CTO / Technical Lead Background**

- *Description:* Track record of the technical leader
- *Match against:* CTO has prior experience building and shipping SaaS products, ideally through at least one full product lifecycle.
- *Importance:* 6

**Startup Experience in Team**

- *Description:* Whether anyone on the team has worked at an early-stage company before
- *Match against:* At least one team member has been part of a startup (seed to Series B stage).
- *Importance:* 5

**Engineering Team Depth**

- *Description:* Technical skill profile of the dev team
- *Match against:* Engineers have either deep expertise in a relevant technology stack or broad product development experience. At least one senior-level engineer on the team.
- *Importance:* 6

**Leadership Experience**

- *Description:* Whether people in management roles have led teams of comparable or greater size
- *Match against:* The person in a leadership role has managed a team at least as large as the current company, or has led within a larger organization.
- *Importance:* 5

### Team culture & personality

**Team Diversity**

- *Description:* Composition of the team
- *Match against:* Mixed gender and age representation across the team.
- *Importance:* 4

**Culture Signals**

- *Description:* Observable signs of company culture
- *Match against:* Visible signs that team members are driven and intellectually curious — e.g. side projects, writing, talks, humour in public communication, a non-corporate tone.
- *Importance:* 5

## Services solving the same problem

- [Welcome to the Jungle (formerly Otta)](https://www.welcometothejungle.com/) — A candidate-first job platform where users set preferences (target role, salary, company stage, culture, work style) and an ML engine ranks roles by fit. Closest in spirit to JobSeeker, but importance weights are implicit and the soft signals (founder background, CTO track record, team diversity) aren't first-class match parameters.
- [Teal](https://www.tealhq.com/) — A job-search and career-tracking tool that lets candidates score and prioritize roles against their own criteria via a "Match Score" against the job description. Overlaps on the idea of a per-job composite score, but the weighting is mostly skill/keyword-based rather than user-defined parameters with explicit 1–10 importance.

There is a wide range of AI matching tools (Phenom Fit Score, iSmartRecruit, Affinda, Recruiterflow), but most are built for employers ranking candidates rather than candidates ranking jobs by their own weighted criteria — which is where JobSeeker's angle differs.
