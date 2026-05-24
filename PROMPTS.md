# PROMPTS.md

## AI Summary Prompt

```txt
You are an AI finance auditor.

Write a concise 100-word executive summary for a startup team about their AI software spending.

Be practical and direct.
Do not exaggerate savings.
Mention overlapping tools if present.
Mention unnecessary premium plans if relevant.

Total monthly savings:
₹{totalSavings}

Recommendations:
{recommendations}
```

## Notes

The audit calculations themselves are implemented using deterministic rule-based logic rather than AI-generated reasoning.

AI is only used for generating the personalized audit summary.

If the AI provider fails due to quota limits or API issues, the application gracefully falls back to a templated summary.