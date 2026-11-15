# Salesque

Real-time sales call assistant

## The idea

Set up the context around what you sell — your sales process, FAQ, product info — and Salesque helps your reps run better calls. During a live call, audio is transcribed in real time and Salesque suggests questions to ask, surfaces answers when the customer asks something, points out which part of the sales process to push on next, and gives visual feedback on how the call is progressing.

## Who it's for

Sales teams — especially Heads of Revenue Operations and sales enablement leads — who want to onboard new reps faster, keep answers consistent, and get more value out of every call.

## How it works

- The call is transcribed live.
- An LLM analyses the transcript against the sales process you've defined and tracks which steps have been covered (e.g. after every X transcribed sentences).
- For each customer question, the AI runs a semantic search (RAG) across your FAQ and context and suggests answers, with a confidence score.
- The rep sees, in real time:
  - Visual feedback on how the sales process is progressing.
  - Suggested next steps in the process.
  - Suggested answers each time the customer asks a question.

## User story

Your company sells a SaaS service that automatically tunes the music volume and vibe in restaurants and venues based on factors like ambient noise, time of day, number of guests, holidays, and customer feedback.

As Head of Revenue Operations, you use Salesque to help new reps get into the sales process faster, give accurate answers when questions come up, and maximise the value of every call.

You set up your sales process as:

1. Identify whether you're talking to someone relevant to purchasing (manager, owner, bar lead). If it's e.g. a new server, ask if you can speak to someone in a more relevant role.
2. Identify what kind of restaurant it is.
3. Identify whether controlling music volume is a problem for the customer. Check common drivers:
   - Need for different vibes and volume at breakfast, lunch, and evening.
   - Staff don't have the time or knowledge to manage music.
   - They want to maximise the atmosphere.
4. If relevant, mention a success story from a larger, similar customer.
5. On interest: offer the customer a trial period.
6. On interest: send the customer a getting-started guide.

In your FAQ you add answers to common questions, e.g.:

- **Q:** How long does a demo period last?\
  **A:** A demo period lasts … and can be activated by visiting … or contacting …
- **Q:** What's the difference between business-tier and pro-tier?\
  **A:** The difference between business-tier and pro-tier is …
- **Q:** …\
  **A:** …

In the rest of the context you add a link to your website, where more information can be found.

When a rep is on a call using Salesque, the call is transcribed and the rep gets:

- Visual feedback on how the sales process is progressing.
- Suggested next steps in the sales process.
- Suggested answers every time the customer asks a question.

## Services solving the same problem

- [Garba.ai](https://garba.ai/)
- [Clari Copilot (formerly Wingman)](https://www.clari.com/products/copilot/) — The closest match: real-time transcription during sales calls, with live battle cards, objection-handling cues, and monologue alerts surfaced on the rep's screen as keywords come up. Overlaps almost entirely with Salesque's "suggest answers, prompt next step" loop; differs in that the sales process is structured around battle cards rather than an explicit, sequential pipeline tracker.
- [Gong](https://www.gong.io/) — The category leader for conversation intelligence: every call is recorded, transcribed, and analyzed for deal risk, talk ratios, and trending objections. Solves the same underlying need (extract value from sales calls, onboard reps faster) but is heavier on post-call analytics and deal forecasting than on real-time, in-call assistance.

There is a wide range of sales-call AI tools (Chorus by ZoomInfo, Avoma, Fireflies, Salesloft Conversations, Outreach Kaia) — most are biased toward post-call summaries and CRM auto-fill, so Salesque's edge would be the explicit, user-defined sales-process tracker plus live FAQ retrieval.
