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
