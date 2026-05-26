# SYSTEM DIAGRAM

```mermaid
flowchart TB
  subgraph Client["Browser - React client components"]
    Home["/"]
    S1["/audit <br/>- select AI tools"]
    S2["/audit/details <br/>- plan, spend, seats"]
    S3["/audit/team <br/>- team size & use case"]

    Store[("Zustand store")]

    Data["Static pricing + tool data"]

    Results["/audit/results"]

    Engine["runAudit()<br/>client-side rules engine"]

    Home --> S1 --> S2 --> S3 --> Results

    S1 & S2 & S3 --> Store

    Store --> Engine

    Data --> Engine

    Engine --> Results
  end

  subgraph Next["Next.js App Router - server"]
    APIsum["POST /api/summary"]

    APIlead["POST /api/leads"]

    Report["GET /report/[slug]"]

    OG["Dynamic Open Graph image"]

    Fetch["getPublicAudit(slug)"]

    Report --> Fetch

    OG --> Fetch
  end

  subgraph External["External services"]
    Gemini["Google Gemini API"]

    Resend["Resend Email API"]

    DB[("Supabase Postgres")]
  end

  Results --> APIsum

  APIsum --> Gemini

  Gemini --> APIsum

  Results --> APIlead

  APIlead --> Resend

  APIlead --> DB

  APIlead -->|public snapshot| Report

  Report -.-> OG

  Fetch --> DB