export interface Article {
  id: string;
  title: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
}

export const articles: Record<string, Article> = {
  "how-we-raised-715k-ido": {
    id: "how-we-raised-715k-ido",
    title: "How we raised $715K in an IDO without relying on hype",
    date: "2024-01-15",
    author: "Francisco Lourenço",
    tags: ["Growth", "Polkamarkets", "Launch Judgement", "Founders", "Web3 Teams"],
    content: `
In early 2021, crypto launches were loud. A lot of noise. A lot of promises. A lot of shortcuts. At Polkamarkets, we did the opposite.

As CMO and Co-Founder, I led the go-to-market and launch execution of our IDO in February 2021, where we raised $715K, built a 100K+ community in two months, and kicked off a protocol that would later reach a 120x post-IDO ATH.

We did not rely on hype. We relied on clarity, speed, and systems. Here is how it happened.

## Quick context

- Company: Polkamarkets
- Role: CMO & Co-Founder (full-time, from day one)
- Market: decentralized prediction markets
- Ecosystem: Ethereum at launch, later Moonbeam, Moonriver, and Polygon
- Team: 6 people
- Funding before IDO: ~$625K from VCs and angels
- Reputation at launch: none

We were early. We were small. And we had to move fast.

## The biggest constraint: time

The hardest part was not money, team size, or even credibility. It was time.

Everything was moving at once:

- product development and testing
- investor expectations and onboarding
- community growth and engagement
- ecosystem narratives and partnerships
- market momentum and adoption

There was no room for slow decisions. So we made one call early that shaped everything else:

**Treat the IDO like a product launch, not a marketing stunt.**

## The narrative that unlocked attention

We did not invent a story. We aligned with one that already existed.

At the time, Vitalik Buterin was publicly pointing to prediction markets as a key primitive for the future of information and coordination.

That was not hype. That was signal, and our job was to:

- translate that idea into something concrete and actionable
- explain what was live now vs later in a way that was easy to understand and engage with
- show how Polkamarkets fit into that future in a way that was clear and compelling

**If you cannot explain your product in one calm paragraph, you are not ready to raise from the public.**

## What I owned end to end

As CMO and Co-Founder, my scope was broad and hands-on:

- go-to-market strategy
- launch positioning and messaging
- educational content
- KOL coordination
- partnerships (tech, ecosystem, marketing)
- community growth systems
- product and marketing alignment

There was no separation between "marketing" and "product". That separation kills early launches. You need to be able to move fast and iterate fast.

## Community was not a channel. It was the product.

Most Web3 communities are loud but shallow. We built ours with intention and purpose.

In less than two months, we grew:

- 100,000+ users and followers across Twitter and Telegram

Not by spamming. But by:

- clear onboarding and welcome process
- frequent, honest updates
- education over promotion
- treating questions as signals, not annoyances and gatekeeping

People did not feel sold to. They felt included.

## The IDO results

Here is what the launch delivered:

- $715K raised
  - $625K from VCs and angels
  - $90K from the community
- $80M+ in total open interest in the first week
- $73M market cap
- $6.3M 24h trading peak
- Top 10 protocol on Moonbeam & Moonriver
- 120x post-IDO ATH
- 10,000+ token holders
- $50K+ $POLK tokens bonded into the protocol

These were not vanity metrics. They were adoption signals.

## Why hype was not needed

Hype works when you want attention. We wanted conviction. So we focused on:

- explaining the product clearly with 101 education content
- making participation simple with a straightforward UI and process
- removing uncertainty with clear communication and transparency
- answering hard questions early and often

We never avoided questions like:

- Why does this need a token?
- What is live today?
- What are the risks?
- What happens after the IDO?

Serious people ask serious questions. You want those people to be part of your community.

## The hardest moment

Honestly?

Keeping track of everything.

The growth was intense. Things were breaking, scaling, and changing daily. There were moments where it felt like 24 hours was not enough.

What helped was structure:

- clear ownership and accountability
- simple processes and systems
- ruthless prioritization and executio
- clear communication and transparency

**Calm execution beats panic every time.**

## What I would do differently today

Looking back, a few improvements stand out:

- Invest even more in the main launch page. It becomes the center of gravity.
- Ship a short "IDO explained in 90 seconds" video earlier.
- Improve follow-up for users who showed intent but did not convert.

Launches are messy.

The goal is not perfection. The goal is control. The goal is to be able to move fast and iterate fast.

## The real lesson

This IDO worked because we treated it as a system:

- narrative alignment
- education and onboarding
- community growth and engagement
- distribution and execution
- clear communication and transparency

Not a moment. Not a trend. Not a campaign. A system.

That mindset has shaped how I approach product, growth, and launches ever since.

## Why this matters today

If you are building:

- a Web3 protocol
- a prediction markets product
- a complex product that needs trust before adoption

This kind of GTM and launch work is what I do.

**Calm strategy. Fast execution. Clear thinking under pressure.**

That is the work I enjoy. And that is the work I am open to collaborating on.
    `.trim(),
  },
  "how-i-decide-if-idea-is-worth-building": {
    id: "how-i-decide-if-idea-is-worth-building",
    title: "How I decide if an idea is worth building",
    date: "2025-01-16",
    author: "Francisco Lourenço",
    tags: ["Product", "Cross roles", "Judgment", "Builders"],
    content: `
I see a lot of smart people burn time on ideas that should have died early. Not because the ideas were stupid. But because nobody slowed down enough to ask the right questions.

After years working across product, growth, Web3 launches, prediction markets, and mentoring founders, I follow one simple rule:

Kill ideas fast, or commit hard.

THere is how I decide if an idea deserves two weeks of my life. Or zero.

It is the same process I use with founders, teams, and collaborators.

## The mindset that saves time

Most people start with features.

I start with reality.

Three things I assume to be true:

- Nobody owes you attention.
- Most problems are not painful enough to pay for.
- Even a "simple" MVP is expensive in time and energy.

So the bar is not "interesting idea". The bar is "this is worth building now, and I can ship it fast".

## My 10-minute filter

Before I get excited, an idea has to pass this quick check.

### 1) Who is the person?

Not "users".

A real person:

- a founder launching a token
- a trader who needs speed
- a product lead under pressure
- a team that must report or decide

If I cannot name the person, I stop.

### 2) What is the exact moment of pain?

Not "they want better tools".

A moment:

- "I have to decide today and I do not trust my data."
- "This task wastes two hours every week."
- "I lose money if I miss this signal."
- "I cannot prove impact when asked."

If there is no clear moment, it is usually a nice-to-have.

### 3) What do they do today instead?

This is where most ideas fail.

If the answer is:

- Excel
- Telegram
- Notion
- a manual workaround
- an existing tool they tolerate

Good. That means the job exists.

If the answer is "nothing", I get cautious. Sometimes that means no demand.

### 4) Why now?

There must be a trigger:

- market shift
- regulation
- ecosystem growth
- new tech lowering cost or friction
- a clear timing window

If there is no "why now", the idea will struggle.

## The scorecard I actually use

After the quick filter, I score the idea on four things. Each from 0 to 5.

If it does not reach at least 14, I pause or kill it.

### 1) Pain and urgency

Is it painful?

Is it frequent?

Does it block action?

Urgency matters more than market size early on.

### 2) Reach and distribution

Can I reach these people?

Do I already know where they hang out?

Can I get early users without paid ads?

A great idea with no distribution path is a side project.

### 3) Clear difference

Not "we are better".

Better how?

- faster
- simpler
- fewer steps
- more reliable
- less risky

If the difference is vague, it will be ignored or copied.

### 4) Ability to ship in 2 weeks

This one is personal and strict:

- Can I ship a v1 in two weeks max?
- Can it deliver real value on day one?
- Can it run without constant babysitting?

If the answer is no, I rethink scope.

## The one-sentence test

Before building anything, I write one sentence:

For [person], who needs [job], this helps them [outcome] by [how].

If that sentence feels forced or generic, the idea is not ready.

This also keeps messaging clean and honest. Good for users. Good for SEO.

## How I test demand without wasting months

I avoid long "validation phases". I prefer fast tests with real cost.

### Test 1. The 15-message test

I reach out to around 15 people who match the persona.

I ask:

- Are you dealing with this right now?
- How do you solve it today?
- What would make you switch?

If fewer than five feel strong pain, I pause.

### Test 2. Fake-door landing page

A simple page:

- clear promise
- three bullets
- one action: join waitlist or request access

I share it in targeted places. Not everywhere.

Weak conversion means weak message or weak demand.

### Test 3. Concierge MVP

No code. Real outcome.

I manually deliver the result to a few users. This shows:

- what they truly want
- what they ignore
- what they might pay for

If people will not commit time or effort here, they will not use the product later.

## Real ideas I killed early

Two examples:

- An AI meal planner
- An AI-powered ADHD planner

Both were interesting. Both had heavy competition. And honestly, I was exploring more than committing.

That was enough reason to stop.

Killing ideas early is a skill, not a failure.

## One idea I committed to (details withheld)

One project I fully committed to is still in stealth.

What mattered was not the idea itself. It was this:

- clear pain
- clear user
- clear distribution path
- ability to ship fast

That combination is rare. When it appears, I act.

## The switching cost question

This is the most important one:

Why would someone switch from what they use today?

"Better UX" is rarely enough.

Switching happens when you reduce:

- time
- effort
- risk
- uncertainty
- cost

If you cannot explain the switching trigger, building is premature.

## Red flags I respect

I have learned to listen to these signals:

- The idea needs perfect user behavior
- The value only exists in future features
- Nobody owns the problem internally
- Scope explodes immediately
- Every conversation adds more features

These are early warnings.

## When I say yes

I greenlight an idea when I can say yes to all of these:

- I can name the person and the painful moment.
- I can explain why now.
- I know how to reach users in the first 30 days.
- I can ship a v1 in two weeks.
- There is a clear reason to switch.
- Early users are willing to commit something real. Time, effort, or money.

If one is missing, I do not rush.

## How this reflects how I work

This is how I approach product and growth:

- fast, but not careless
- experimental, but structured
- focused on outcomes, not noise

I enjoy working with founders and teams who want to test ideas properly, ship quickly, and learn fast.

Prediction markets are a passion. But I am curious by nature and open to almost any digital experiment if the problem is real.
    `.trim(),
  },
  "when-web3-makes-sense-and-when-it-does-not": {
    id: "when-web3-makes-sense-and-when-it-does-not",
    title: "When Web3 makes sense, and when it does not",
    date: "2025-01-16",
    author: "Francisco Lourenço",
    tags: ["Web3", "Cross roles", "Strategic maturity", "General audience"],
    content: `
Web3 is not a silver bullet.
It is also not a scam by default.

It is a tool.

After years building and launching products in Web3, working with founders, investors, and teams, I have learned one thing the hard way:

Web3 only makes sense when it removes a problem that cannot be removed otherwise.

This article is my practical filter. No ideology. No hype. Just experience.

## Start with the problem, not the chain

Most teams get this wrong.

They start with:

- the chain
- the token
- the architecture

Then they go hunting for a problem.

That order almost always fails.

The order that works is:

- Real problem
- Real constraint
- System design
- Technology choice

Web3 should appear last. Not first.

If your pitch starts with "we are building on blockchain", you are already losing half the room.

## When Web3 clearly makes sense

There are cases where Web3 is not just useful, it is the right call.

### 1) When trust is low by default

Web3 shines when participants do not trust each other and cannot rely on a central referee.

This is exactly why it worked for prediction markets.

In systems like Polkamarkets:

- users do not know each other
- value is directly at stake
- rules must be enforced consistently
- outcomes must be verifiable

Removing the blockchain here breaks the system.

That is the signal you are looking for.

### 2) When incentives and ownership matter

Web3 works when users are not just consumers, but participants.

Protocols, networks, and marketplaces benefit from shared ownership because:

- participation creates value
- incentives are aligned
- governance is part of the system

At Polkamarkets, the token was not decoration. It was part of how the protocol functioned and scaled.

When ownership matters, Web3 can unlock growth that Web2 cannot.

### 3) When transparency is a feature, not a risk

Some systems need to be inspectable.

Not trusted. Inspectable.

Examples:

- settlement logic
- value flows
- market outcomes
- rule enforcement

In these cases, transparency reduces friction instead of adding it.

Web3 is useful when visibility builds confidence, not when it scares users away.

### 4) When composability is strategic

Web3 allows systems to plug into each other in ways that are hard to replicate in Web2.

This matters when:

- others can build on top of you
- integrations are core to growth
- ecosystems beat standalone apps

If your product benefits from being part of a broader system, Web3 can be a real advantage.

## When Web3 does not make sense

This part is just as important.

### 1) When it adds friction to simple workflows

If users want:

- speed
- simplicity
- zero setup

Web3 often makes things worse.

Wallets, gas fees, signatures, bridges. These are real costs.

If the upside is not obvious to the user, they will not tolerate the friction.

### 2) When the user does not care

Most users do not care about decentralization.

They care about outcomes.

If Web3 is the main thing users need to understand, adoption will be slow.

The best Web3 products hide the complexity. If you cannot do that yet, think twice.

### 3) When the industry is not ready

This is where experience matters.

At Coompass, we started with a blockchain-first approach in corporate volunteering and ESG.

On paper, it made sense:

- traceability
- proof of impact
- transparency

In reality, the industry was not ready.

The audience was:

- non-technical
- risk-averse
- unfamiliar with wallets or tokens

Web3 became a blocker, not an enabler.

So we made the right call and shifted to Web2.

That decision unlocked adoption.

Knowing when to remove Web3 is just as important as knowing when to use it.

### 4) When the token has no real job

A token needs a reason to exist.

Good reasons:

- security
- coordination
- governance
- access to scarce resources

Weak reasons:

- fundraising
- marketing
- copying other projects

If you cannot explain the token in one calm paragraph, it probably should not exist.

## The question I always ask

Before committing to Web3, I ask one question:

What breaks if we remove the blockchain?

If the answer is "not much", Web3 is likely unnecessary.

If the answer is "the system collapses", Web3 might be the right choice.

This single question has saved me months of wasted work.

## How I decide in practice

I lean toward Web3 when:

- trust is low
- coordination is hard
- ownership matters
- transparency is required
- ecosystems matter more than features

I avoid Web3 when:

- workflows must be fast and simple
- users are non-technical
- regulation dominates the product
- a database solves the problem just fine

This is not ideology. It is product judgment.

## What Web3 taught me beyond crypto

Even when Web3 is not the final solution, it teaches valuable lessons:

- design incentives, not just interfaces
- assume adversarial behavior
- think in systems, not features
- default to transparency where possible

I apply these lessons everywhere, even in Web2 products.

## Why this matters for founders and investors

If you work with me, this is what you get:

- no blind Web3 evangelism
- no knee-jerk rejection either
- honest tradeoff discussions
- product-first decisions

Polkamarkets worked because Web3 was essential.

Coompass improved when Web3 was removed.

Both decisions were correct.

## The short version

Web3 is not the goal.

Solving the right problem is.

When Web3 helps you do that better than anything else, use it.

When it does not, walk away.

That judgment is what I bring to the table.
    `.trim(),
  },
};

export function getArticleById(id: string): Article | undefined {
  return articles[id];
}

export function getArticleIdByTitle(title: string): string | undefined {
  const entry = Object.entries(articles).find(([_, article]) => article.title === title);
  return entry ? entry[0] : undefined;
}

/**
 * Get all article IDs (slugs)
 */
export function getAllArticleIds(): string[] {
  return Object.keys(articles);
}

/**
 * Get all articles
 */
export function getAllArticles(): Article[] {
  return Object.values(articles);
}
