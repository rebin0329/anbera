ANBERA — MASTER PRODUCT SPECIFICATION

STATUS:
This document is the permanent source of truth for the ANBERA product.

Use this context before making product, UX, architecture, business, AI, security, or design decisions.

IMPORTANT:
This is not a task prompt.
This is the permanent ANBERA product context.

Do not silently contradict this specification.

If a new task conflicts with this specification, stop and explain the conflict before implementing it.

==================================================
01. PRODUCT IDENTITY
==================================================

Name:
ANBERA

Category:
AI BUSINESS GROWTH SYSTEM

Tagline:
YOUR BUSINESS. ELEVATED.

ANBERA is a PRODUCT.

ANBERA is NOT a traditional agency.
ANBERA is NOT an “AI agency.”
ANBERA is NOT simply a chatbot.
ANBERA is NOT an AI wrapper.

Core positioning:

“ANBERA is an AI-powered business growth system that continuously analyzes a business, identifies its highest-value opportunities, and turns them into actionable next moves.”

Core promise:

Help businesses understand:
- where they stand
- what matters most
- what opportunities exist
- what should happen next
- how to turn insight into action
- how to build repeatable systems
- how to grow with greater clarity

Core philosophy:

AI PROPOSES.
YOU DECIDE.

The customer remains in control.

==================================================
02. PRODUCT VISION
==================================================

Long-term vision:

ANBERA becomes an end-to-end business growth operating system.

Conceptual journey:

IDEA
→ VALIDATE
→ BUSINESS DNA
→ BRAND
→ POSITIONING
→ WEBSITE
→ CONTENT
→ CUSTOMERS
→ SALES
→ MARKETING
→ AUTOMATION
→ ANALYTICS
→ OPTIMIZATION
→ GROWTH

Alternative internal framing:

IDEA
→ VALIDATE
→ DESIGN
→ BUILD
→ LAUNCH
→ OPERATE
→ GROW

ANBERA should eventually help a founder move from business idea to operating and growing the business through one connected system.

The long-term product should feel like:

“Your business. Your command.”

==================================================
03. CORE PRODUCT SYSTEM
==================================================

ANBERA consists of three major product layers:

1. ANBERA Intelligence
2. ANBERA Command
3. ANBERA Studio

------------------------------------------
ANBERA INTELLIGENCE
------------------------------------------

Core intelligence layer.

Purpose:
Understand the business.
Detect signals.
Identify opportunities.
Prioritize what matters.

Core experience:

DISCOVER
→ DIAGNOSE
→ PRIORITIZE
→ BUILD
→ AUTOMATE
→ GROW

ANBERA Intelligence should answer:

What is happening?
Why does it matter?
What is the opportunity?
What should happen next?
What is the expected impact?
How confident is the recommendation?

------------------------------------------
ANBERA COMMAND
------------------------------------------

Future SaaS command center.

Purpose:
Give the business owner one place to understand and control the business.

Core areas:

BUILD
ATTRACT
CONVERT
AUTOMATE
GROW

Possible command metrics:

Power Score
Growth Potential
Momentum
Today's Intelligence
Opportunities
Actions
Campaigns
System Health

------------------------------------------
ANBERA STUDIO
------------------------------------------

Optional implementation/execution layer.

Principle:

“ANBERA identifies what should happen.
ANBERA Studio helps make it happen.”

Potential capabilities:

Brand
Site
Content
Ads
Sales
Automate
Grow

Studio is secondary to the product.

Product first.
Service second.

==================================================
04. ANBERA SCORE
==================================================

ANBERA Score is the first public product feature.

Purpose:

Lead-generation and business-discovery tool.

Public user should be able to try it without logging in.

Initial inputs:

- Business name
- Industry
- Website
- Goal

Potential future inputs:

- Location
- Target customer
- Business model
- Business stage
- Constraints

Core output:

Business Power Score

Example:

74/100

Categories:

Brand & Positioning
Visibility
Customer Experience
Conversion
Automation
Growth Readiness

Example:

Brand & Positioning: 81
Visibility: 63
Customer Experience: 72
Conversion: 57
Automation: 41
Growth Readiness: 89

Show:

3 NEXT MOVES DETECTED.

Core messaging:

SEE WHAT ANBERA SEES.

“You don't need to do everything.
You need to do the right things first.”

“Your next move starts with clarity.”

IMPORTANT:

Initial Score uses deterministic DemoProvider logic.

Clearly label demo analysis:

ANBERA DEMO INTELLIGENCE

Never represent mock analysis as live intelligence.

==================================================
05. SCORING METHODOLOGY
==================================================

Initial Power Score categories and weights:

Brand & Positioning — 15%
Visibility — 20%
Customer Experience — 15%
Conversion — 20%
Automation — 10%
Growth Readiness — 20%

Total:
100%

The scoring framework must eventually be:

- modular
- versioned
- explainable
- testable
- configurable

Do not permanently hardcode the scoring architecture.

Store analytical context such as:

- score
- category
- raw_inputs
- weight
- confidence
- timestamp
- model_version
- data_sources

Future analysis should allow comparison:

Current Score
Previous Score
Score Change
Trend
Category Changes

==================================================
06. INTELLIGENCE PIPELINE
==================================================

Core pipeline:

BUSINESS INPUT
→ DATA COLLECTION
→ DATA VALIDATION
→ SIGNAL EXTRACTION
→ SCORING
→ OPPORTUNITY DETECTION
→ AI RECOMMENDATION
→ PRIORITIZATION
→ USER APPROVAL
→ ACTION
→ OUTCOME
→ FEEDBACK
→ FUTURE ANALYSIS

Core principle:

Signal
→ Meaning
→ Priority
→ Action

ANBERA should not overwhelm users with information.

The product should convert complexity into decisions.

==================================================
07. OPPORTUNITY ENGINE
==================================================

ANBERA should identify high-value business opportunities.

Potential opportunity areas:

Visibility
Conversion
Automation
Brand
Customer Experience
Growth
Content
Sales
Marketing
Operations

Every opportunity should eventually contain:

- title
- category
- explanation
- business impact
- priority
- confidence
- recommended action
- status
- outcome

Priority should be based on business value, not arbitrary visual ranking.

==================================================
08. AI TEAM
==================================================

Future AI team:

Strategist
Scout
Creative
Copy
Growth
Automation
Guardian

Roles:

Strategist:
Business direction and prioritization.

Scout:
Find signals, opportunities, and relevant information.

Creative:
Creative concepts and brand/content ideas.

Copy:
Messaging, copywriting, communication.

Growth:
Growth opportunities, acquisition, conversion, retention.

Automation:
Workflow and process automation recommendations.

Guardian:
Security, reliability, validation, anomaly detection, system health.

IMPORTANT:

AI agents recommend.
Humans approve important actions.

Principle:

AI PROPOSES.
YOU DECIDE.

==================================================
09. BUSINESS DNA
==================================================

Business DNA is the persistent business context layer.

Potential data:

- business model
- industry
- target customer
- positioning
- goals
- stage
- constraints
- strengths
- weaknesses
- opportunities
- priorities
- historical recommendations
- previous actions
- outcomes

Purpose:

ANBERA should become increasingly useful because it understands the specific business over time.

Do not repeatedly treat an existing customer as a blank slate.

==================================================
10. LEARNING / FEEDBACK LOOP
==================================================

Recommendation lifecycle:

recommended
→ viewed
→ accepted/rejected
→ completed
→ outcome
→ business_metric_change

Future system should learn from observed outcomes.

Potential ranking improvement:

More businesses
→ more business signals
→ more recommendations
→ more actions
→ more outcomes
→ more learning
→ better prioritization
→ better product
→ more businesses

IMPORTANT:

Do not claim machine-learning improvement before real outcome data exists.

==================================================
11. FOUNDER SYSTEM
==================================================

Founder access must use the same secure authentication infrastructure.

Do NOT create a disconnected authentication system.

Use:

FOUNDER role
+
protected `/founder`
+
server-side authorization
+
MFA
+
database RLS

Role hierarchy:

FOUNDER
SUPER_ADMIN
ADMIN
ANALYST
STUDIO_MEMBER
SUPPORT
CUSTOMER

Founder portal should eventually contain:

Overview
Intelligence
Businesses
Users
AI Operations
Analytics
Revenue
Automations
System Health
Security
Errors
Audit Logs
Experiments
Feature Flags
Integrations
Settings

Founder dashboard should eventually use real database-driven metrics.

Potential metrics:

Businesses
Active Users
Analyses Today
AI Recommendations
Automation Runs
MRR
Conversion
Retention
System Health
Security Status

Founder should eventually see:

- business intelligence
- historical scores
- AI agent usage
- recommendation acceptance
- automation runs
- user activity
- revenue
- security events
- errors
- system health

Sensitive founder actions require:

- confirmation
- server-side authorization
- audit logging

Examples:

Delete user
Delete business
Change permissions
Change billing
Change AI configuration
Change production settings

==================================================
12. GUARDIAN
==================================================

ANBERA GUARDIAN is the reliability and security subsystem.

Monitor:

- broken links
- failed API calls
- JavaScript errors
- database errors
- authentication failures
- invalid inputs
- performance degradation
- dependency vulnerabilities
- failed deployments
- AI output anomalies
- automation failures
- payment failures
- unexpected behavior

System statuses:

OPERATIONAL
WARNING
DEGRADED
CRITICAL

Development lifecycle:

BUILD
→ TEST
→ DETECT
→ FIX
→ VERIFY
→ DEPLOY

User-facing states should include:

Loading
Success
Empty
Error
Retry

Never expose raw stack traces to customers.

==================================================
13. AI SAFETY
==================================================

AI output must be:

- validated
- auditable
- reviewable
- explainable where appropriate

Important or irreversible actions require explicit user approval.

Automation lifecycle:

READ
→ ANALYZE
→ RECOMMEND
→ APPROVE
→ EXECUTE

Never silently execute dangerous or irreversible actions.

No hidden autonomous control over critical business operations.

==================================================
14. ANALYTICS
==================================================

Product analytics:

Users
Businesses
Activation
Retention
Churn
Conversion

Intelligence analytics:

Analyses
Recommendations
Acceptance
Completion
Confidence
Outcomes

AI analytics:

Runs
Latency
Failures
Usage
Provider status

Automation analytics:

Runs
Success/failure
Retries
Approval
Execution time

Revenue analytics:

MRR
ARR
Churn
Average revenue
Payment failures

System analytics:

Uptime
Latency
Errors
Database health
API health

Analytics must eventually come from real data.

Never fabricate analytics.

==================================================
15. SECURITY ARCHITECTURE
==================================================

Core future stack:

GitHub
Supabase
Vercel
Sentry
Playwright
TypeScript
ESLint
Stripe
n8n

Security principles:

- secrets server-side
- environment variables
- no API keys in frontend
- authentication
- authorization
- database RLS
- audit logs
- input validation
- output validation
- least privilege
- protected founder routes
- secure payment webhooks
- error monitoring
- dependency monitoring

Do not weaken security for convenience.

Do not allow AI coding tools to silently modify:

- RLS
- authorization
- authentication
- permissions
- payment logic
- secrets

Explain security-sensitive changes before implementation.

==================================================
16. DATABASE
==================================================

Initial V1 tables ONLY:

businesses
analyses
scores
score_categories
opportunities

Enable RLS from day one.

Do not create a 30-table database before the product requires it.

Database should evolve incrementally.

==================================================
17. AI PROVIDER ARCHITECTURE
==================================================

First provider:

DemoProvider

Initial DemoProvider:
- deterministic
- local
- predictable
- testable
- no paid API required

Future abstraction:

AIProvider

Implementations:

DemoProvider
OpenAIProvider
GeminiProvider

The frontend must never contain secret API keys.

Real AI providers are added only when the relevant budget and architecture are ready.

==================================================
18. CURRENT PRODUCT DEVELOPMENT PRINCIPLE
==================================================

Build incrementally.

Do not build the entire future platform at once.

Each development step should have:

- clear scope
- explicit non-scope
- verification
- small Git commit

Avoid premature complexity.

Do not implement future features simply because they are described in this document.

The Master Spec describes the destination.

The current task determines what gets built today.

==================================================
19. WEBSITE
==================================================

Current public website:

https://anbera.vercel.app/

Do not modify the live website unless the current task explicitly requires it.

Homepage structure may evolve toward:

NAVBAR
→ HERO
→ INTELLIGENCE VISUALIZATION
→ ONE SYSTEM. EVERY NEXT MOVE.
→ ANBERA SCORE
→ YOUR NEXT MOVES
→ COMMAND CENTER
→ AI TEAM
→ ECOSYSTEM
→ STUDIO
→ PROCESS
→ PHILOSOPHY
→ PRICING
→ FAQ
→ CTA
→ FOOTER

However:

The current development task always controls which sections are actually implemented.

==================================================
20. HOMEPAGE BRAND COPY
==================================================

Primary eyebrow:

AI BUSINESS GROWTH SYSTEM

Primary headline:

YOUR BUSINESS HAS MORE POTENTIAL.

Primary tagline:

YOUR BUSINESS. ELEVATED.

Core supporting message:

ANBERA helps businesses understand where they stand, discover their highest-value opportunities, and turn them into their next move.

Primary CTA:

DISCOVER YOUR BUSINESS

Secondary CTA:

SEE HOW IT WORKS

Potential brand statements:

Your business deserves a better system.

Your business has more potential. Let’s unlock it.

Know exactly where you stand.

See what others don’t.

Turn insight into action.

Your next move starts here.

Build without the chaos.

Less guessing. More intelligence.

Your business. Your command.

Don’t work harder. Build smarter.

The next level isn’t luck. It’s systems.

You can’t improve what you can’t see.

Clarity creates power.

Every business has a next move.

Let systems carry the weight.

You lead. ANBERA handles the complexity.

Your growth is the mission.

You built the business.
Now build the machine behind it.

Use selectively.
Do not fill the interface with slogans.

==================================================
21. DESIGN SYSTEM
==================================================

Visual identity:

Premium technology
+
private intelligence firm
+
modern command center

Desired feel:

- premium
- minimal
- dark
- intelligent
- global
- precise
- sophisticated
- high whitespace
- typography-led
- data-driven
- calm
- powerful

Design philosophy:

Apple-level simplicity
+
Linear-level product clarity
+
Palantir-style intelligence aesthetic
+
Vercel-level technical precision

Inspiration only.

Never copy layouts, branding, or proprietary design.

==================================================
22. COLORS
==================================================

Primary:

Deep Black:
#080808

Charcoal:
#111111

Off White:
#F5F5F5

Neutral Grey:
#8A8A8A

Accent Blue:
#3682F6

Use accent blue sparingly.

Avoid neon AI aesthetics.

==================================================
23. TYPOGRAPHY
==================================================

Headings:

Manrope

Body/UI:

Inter

Optional technical/data typography:

JetBrains Mono

Use large typography and generous whitespace.

Homepage hero headline should dominate.

==================================================
24. VISUAL RULES
==================================================

Use:

- large typography
- generous whitespace
- precise spacing
- subtle borders
- 1px borders
- restrained accent color
- minimal cards
- elegant data visualization
- subtle gradients only when useful
- clean dashboards
- clear hierarchy

Avoid:

- cyberpunk
- excessive neon
- robots
- cheesy AI imagery
- excessive gradients
- excessive glassmorphism
- excessive blur
- gaming aesthetics
- excessive stock imagery
- visual clutter
- decorative effects without purpose

Core principle:

VALUE IS CLARITY, NOT VISUAL EFFECTS.

==================================================
25. UX PHILOSOPHY
==================================================

Every important interface should answer:

What is happening?

Why does it matter?

What should I do?

What happens next?

Experience progression:

CLARITY
→ CONFIDENCE
→ CONTROL
→ MOMENTUM

The user should feel:

- understood
- informed
- confident
- powerful
- in control
- supported
- motivated

Do not manipulate the user psychologically through deceptive design.

==================================================
26. MOTION SYSTEM
==================================================

Motion should communicate:

- intelligence
- progress
- discovery
- confidence
- system state

Allowed:

- subtle magnetic buttons
- hover states
- hover spotlight
- interactive metrics
- subtle intelligence signals
- data visualization hover
- scroll reveals
- score counters
- chart animations
- page transitions
- dashboard state transitions
- micro-interactions

Analysis sequence may use:

CONNECTING
→ SCANNING
→ ANALYZING
→ IDENTIFYING
→ PRIORITIZING
→ COMPLETE

Avoid:

- permanent distracting cursor trails
- excessive parallax
- excessive animation
- motion without meaning

Disable cursor effects on touch devices.

Respect:

prefers-reduced-motion

==================================================
27. MULTILINGUAL
==================================================

ANBERA must eventually support multiple languages.

Initial launch languages:

English
Malayalam
Hindi
Tamil
Kannada
Telugu

Locale architecture:

/en
/ml
/hi
/ta
/kn
/te

Translate:

- homepage
- navigation
- dashboard
- forms
- AI recommendations
- notifications
- errors
- emails
- billing
- settings
- accessibility labels

AI output should respect selected language.

Allow:

“Show AI analysis in English.”

Architecture must support:

- Unicode
- locale-aware dates
- locale-aware numbers
- currency
- timezone
- future RTL support

Do not make ANBERA visually “India-only.”

Global product.
Indian accessibility.

==================================================
28. TECHNICAL STACK
==================================================

Current/core:

Next.js
React
TypeScript
Tailwind CSS
Lucide React
Git
GitHub
Vercel

Future:

Supabase
PostgreSQL
OpenAI
Gemini
Stripe
n8n
Sentry
Playwright

Use the minimum dependencies required.

Do not add dependencies without a reason.

==================================================
29. PROJECT ARCHITECTURE
==================================================

Suggested structure:

/app
  /page.tsx
  /intelligence
  /command
  /studio
  /pricing
  /about
  /discover
  /login
  /dashboard
  /founder

/components
  /ui
  /anbera
  /navigation
  /sections
  /dashboard
  /founder

/lib
  /ai
  /scoring
  /security
  /analytics
  /automation
  /i18n
  /demo

/types
/hooks
/public
/tests
/e2e

Keep architecture modular.

Do not create unnecessary abstractions.

==================================================
30. ACCESSIBILITY
==================================================

Required:

- semantic HTML
- heading hierarchy
- keyboard navigation
- visible focus states
- appropriate ARIA
- sufficient contrast
- accessible forms
- accessible buttons
- accessible charts/data visualization
- mobile touch targets
- reduced-motion support

Do not rely on color alone.

==================================================
31. PERFORMANCE
==================================================

Required:

- optimized images
- optimized fonts
- minimal dependencies
- lazy loading where appropriate
- no unnecessary client components
- CSS-based animation where practical
- no layout shifts
- efficient rendering

Prefer Server Components unless client behavior is required.

==================================================
32. SEO
==================================================

Title:

ANBERA — AI Business Growth System

Meta description:

ANBERA helps businesses understand where they stand, discover their highest-value opportunities, and turn them into their next move.

Future requirements:

- Open Graph metadata
- sitemap
- robots
- semantic URLs
- structured metadata
- favicon

==================================================
33. ZERO-BUDGET PRINCIPLE
==================================================

Initial product must be buildable with free tools.

Use:

Next.js
Tailwind
React
TypeScript
Lucide
local deterministic demo data
free fonts
GitHub
Vercel

No paid APIs required for initial product.

No paid templates required.

No paid animation libraries required.

No paid hosting required.

No paid database required for the earliest stage.

==================================================
34. TRUST RULES
==================================================

Never fabricate:

- testimonials
- clients
- logos
- awards
- reviews
- user counts
- revenue claims
- case studies
- business results
- live intelligence
- customer data
- statistics

If something is a demo:

Label it clearly.

If something is future:

Treat it as future.

If something is unavailable:

Do not pretend it exists.

Trust is part of the ANBERA product.

==================================================
35. FOUNDER PRINCIPLE
==================================================

The founder is the final decision-maker.

ANBERA should increase founder leverage.

AI handles complexity.

AI identifies patterns.

AI proposes actions.

AI does not silently take control.

Core principle:

AI PROPOSES.
YOU DECIDE.

==================================================
36. DEVELOPMENT RULES FOR ANTIGRAVITY
==================================================

Antigravity is an implementation assistant.

It is NOT the product owner.

It must:

- inspect the existing code first
- preserve working architecture
- use reusable components
- keep changes scoped
- explain significant architectural decisions
- avoid unnecessary dependencies
- run tests/checks
- report errors
- make small changes
- avoid speculative features

Do NOT blindly trust generated code.

Manually verify:

- authentication
- authorization
- RLS
- security
- payment logic
- webhooks
- secrets
- permissions
- destructive operations

Before changing security-sensitive architecture:

STOP.

Explain the proposed change.

Wait for approval.

==================================================
37. CURRENT TASK RULE
==================================================

This Master Spec is permanent context.

It does NOT mean every feature should be built now.

For every future task, use:

ANBERA MASTER SPEC
+
CURRENT DEVELOPMENT STAGE
+
CURRENT TASK
+
EXPLICIT SCOPE
+
EXPLICIT NON-SCOPE
+
VERIFICATION

Example:

ANBERA MASTER SPEC
→ Build ANBERA Score
→ Do not build Command
→ Do not build Founder Portal
→ Do not build real AI
→ Verify
→ Commit

Next task:

ANBERA MASTER SPEC
→ Build authentication
→ Do not rebuild Score
→ Do not build Stripe
→ Verify
→ Commit

Next task:

ANBERA MASTER SPEC
→ Build Command Center
→ etc.

Never implement the entire future roadmap because it appears in this document.

==================================================
38. IMPLEMENTATION SAFETY
==================================================

Before coding:

1. Inspect current repository.
2. Understand existing architecture.
3. Identify the exact requested scope.
4. Identify files affected.
5. Implement only required changes.
6. Test.
7. Review.
8. Report changes.

Never silently:

- replace frameworks
- replace authentication
- redesign database architecture
- change RLS
- change payment architecture
- expose secrets
- remove security controls
- add unnecessary dependencies
- create fake production data

==================================================
39. GIT / DEPLOYMENT
==================================================

GitHub repository:

rebin0329/anbera

Primary branch:

main

Production deployment:

Vercel

Current public website:

https://anbera.vercel.app/

Workflow:

LOCAL DEVELOPMENT
→ TEST
→ GIT COMMIT
→ GIT PUSH
→ VERCEL DEPLOY
→ VERIFY

Commit small and frequently.

Do not mix unrelated changes into one commit.

==================================================
40. FINAL PRODUCT PRINCIPLE
==================================================

ANBERA should not feel like:

“another AI tool.”

It should feel like:

“A serious intelligence system built around my business.”

The product should transform:

Complexity
→ Clarity

Information
→ Insight

Insight
→ Priority

Priority
→ Action

Action
→ Outcome

Outcome
→ Learning

Learning
→ Better decisions

Better decisions
→ Growth

Core identity:

YOUR BUSINESS.
YOUR COMMAND.

Core promise:

YOUR BUSINESS. ELEVATED.

Core principle:

AI PROPOSES.
YOU DECIDE.

Core experience:

CLARITY
→ CONFIDENCE
→ CONTROL
→ MOMENTUM

Core mission:

HELP BUSINESSES SEE THEIR NEXT MOVE.
