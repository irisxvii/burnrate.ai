## 1. The Hardest Problem I Hit This Week

The hardest issue I hit was around the AI summary generation for the audit results page.

The flow was supposed to be simple: generate audit recommendations, send them to Gemini, get back a short optimization summary, and render it on the results screen.

What made it annoying was that it failed inconsistently. Sometimes the summary generated correctly, and other times the app would quietly fall back to the backup summary logic I had added earlier.

Because the fallback worked, the rest of the system still looked healthy, so the actual issue stayed hidden for a while.

I added logging around the API route and started testing payloads manually to narrow it down.

Eventually I found that the issue wasn’t really in my app logic at all. The Gemini API key had burned through its free quota for `gemini-2.0-flash`, which caused repeated 429 errors that were bubbling up as 503s in my API route.

The biggest improvement was replacing the original static fallback paragraph with a rule-based fallback summary generator.

So even if the AI request failed, the app could still generate summaries dynamically. That made the fallback feel a lot less fake and much closer to a real generated report.

## 2. A Decision I Reversed Mid-Week

Midway through the project, I switched the onboarding flow over to Zustand.

The main reason was honestly just simplicity. The flow needed shared access to things like selected tools,
pricing info,
team size,
use cases,
generated recommendations across multiple pages, and local state was starting to feel fragile. Zustand cleaned that up a lot.

## 3. What I Would Build In Week 2

If I had another week, I’d focus mainly on upgrading the public report experience with:

* charts and basic visuals
* benchmarking views
* PDF export
* better sharing/comments flow

A big focus would be fixing the Gemini reliability issue properly instead of leaning on fallbacks.

## 4. How I Used AI Tools

I used `ChatGPT` pretty heavily during the project for things like:

* debugging help
* thinking through architecture
* documentation drafts
* testing setup
* Open Graph image ideas and iterations

It helped speed up a lot of the non-core parts so I could focus more on the actual product logic. That said, I didn’t rely on it for anything critical.

I also used `Cursor` for some debugging and quick fixes while working inside the codebase.

## 5. Self-Rating

### Discipline -  9.3/10

I stayed pretty consistent throughout the project and kept shipping even when debugging started slowing things down.


### Code Quality - 7.8/10

The codebase got cleaner as the project evolved through refactoring and component extraction. There are still areas I’d improve with more time.


### Design Sense - 9/10

I put a lot of focus into making the product feel visually appealing, especially the audit reports, onboarding flow, and Open Graph previews.


### Problem Solving - 8/10

Most of the harder parts of the project came from debugging unexpected issues. I think I handled that process well overall.


### Entrepreneurial Thinking - 7.5/10

I tried approaching the assignment like an actual product, and making the reports feel something people would actually want to send around. But there’s still a lot I’d want to explore further if this was a real long-term product.
