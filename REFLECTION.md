## 1. The Hardest Problem I Hit This Week

The hardest issue I hit was around the AI summary generation for the audit results page.

The flow was supposed to be simple: generate audit recommendations, send them to Gemini, get back a short optimization summary, and render it on the results screen.

What made it annoying was that it failed inconsistently. Sometimes the summary generated correctly, and other times the app would quietly fall back to the backup summary logic I had added earlier.

Because the fallback worked, the rest of the system still looked healthy, so the actual issue stayed hidden for a while.

I added logging around the API route and started testing payloads manually to narrow it down.

Eventually I found that the issue wasn’t really in my app logic at all. The Gemini API key had burned through its free quota for `gemini-2.0-flash`, which caused repeated 429 errors that were bubbling up as 503s in my API route.