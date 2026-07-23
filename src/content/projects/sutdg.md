A secure **multi-modal** **LLM** **chat messaging** platform developed with a team of five for **TikTok's** **Tech Jam** **2025 hackathon.**

The **backend server** was built using **Express.js** **(TypeScript)** and **PostgreSQL** **(Prisma** ORM) with **multi-LLM** **provider support** (OpenAI, Anthropic, and Google).

We also developed an **intermediate service,** deployed as a **separate container,** providing **PII masking** and **redaction** via exposed REST API endpoints using **Microsoft Presidio,** supporting both **text** and **image de-identification.**

For the main backend service, **Prisma ORM** was used to provide type-safe database access and abstraction over relational data models, with schema versioning and controlled evolution managed through **Prisma migrations.**

Zod was also used alonside as a validation libraty to enforce schema-based validation at the application layer. This ensured that incoming request payloads were correctly structured, type-safe before reaching into business logic, database writes.

It was truly an **enlightening experience** in terms of understanding the **security risks** associated with GenerativeAI, especially regarding exposure of key private data.

With Generative AI being used **ubiquitously** everyday, this topic was indeed a **topic** of **today,** and the **future.**

A **serious,** **necessary** and **important** topic that I and my team are **glad** to have **tackled** with our **solution.**

Thus, although we did not make it to the finals, **TikTok** **Tech** **Jam** **2025** was indeed a **fruitful** and **substantial** learning experience, giving us the opportunity for developing our skills not just **outwards,** but **outwards** in the **right direction** as **responsible technologists** in the age of **AI.**
