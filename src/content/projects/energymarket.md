An **interactive,** **reflective** **learning** **tool** that teaches how a **wholesale** **electricity** **market** actually works — from a single power plant's **run/don't-run** decision all the way up to **negative** **prices** — by letting you **drive** **the** **market** **yourself** with sliders and watch the consequences **clear** in **real** **time.**

This began as my **entrypoint** into understanding the **European** **Energy** **Market,** and my **first** **step** toward understanding **finance** as a **software** **engineer.** Rather than just **reading** about **merit** **order** and **spark** **spreads,** I **built** the **market,** wired each concept to a control I could **move,** and wrote up what I understood at each step. The result is **part** **simulator,** **part** **learning** **journal.**

Something as **seemingly** **simple** and **ubiquitous** as **energy** turns out to be the product of a **long,** **painstaking** and **storied** journey, made possible by the key **drivers** of our **global** **infrastructure** and **economy.**

The learning is split into **eight** **chapters,** each adding a **single** **new** **idea** on top of the **same** **underlying** **auction** — the **spark** **spread,** **efficiency** and **economic** **viability,** the **merit** **order** and the **Merit** **Order** **Effect,** **marginal** **pricing** in a **day-ahead** **auction,** **market** **power** and **strategic** **bidding,** **hedging** through **forwards,** **futures** and **Contracts** **for** **Difference,** **carbon** **pricing** under the **EU** **ETS,** and finally **negative** **prices.**

At the heart of all eight sits a **single** **clearing** **routine.** Each plant computes its **marginal** **cost** as `(fuel price ÷ efficiency) + (tonnes CO₂/MWh × carbon price)`, turns that into an **offer,** and offers are **sorted** **cheapest-first** and **stacked** until they **meet** **demand.** The **last** **plant** **needed** — the **marginal** **plant** — sets the **uniform** **clearing** **price** paid to **everyone** who cleared.

Each lesson exposes a few of those inputs as **sliders** and defines **triggers** that detect **meaningful** **states** — *the inefficient plant just dropped out*, *coal just switched to gas*, *the market cleared negative* — and surfaces them as **events** as they **happen,** rather than **front-loading** the explanation.

The backend is **Java** **26** on **Spring** **Boot** **4.1,** deliberately built as an **event-driven** **ETL** rather than a request-response CRUD app. A **scheduled** **poller** pulls live **generation** **mix** and **carbon** **intensity** data, **publishes** it to **Kafka,** and a **projector** folds the stream into an **in-memory** **snapshot** served over a single lightweight endpoint.

Splitting **ingestion** from **projection** across a **topic** meant the **poller** knows nothing about **who** consumes it, and a **second** consumer group could be attached later without touching the first — the same **modular** **boundary** thinking I have come to value in every system I build.

The frontend is **React** **19** with **TypeScript,** where each lesson is expressed **declaratively** **as** **data** — its **plants,** its **controls,** and its **triggers** — so adding a chapter means describing a **scenario,** not writing **new** **UI.** The visualisation runs on **three.js** through **React** **Three** **Fiber,** with a **toon-shaded** stage of plants, smoke and bidding that turns the clearing price into a proper **little** **game.**

An optional **AI** **analyst,** built on the **official** **Anthropic** **Java** **SDK,** explains **why** a **detected** **event** occurred — using **structured** **outputs,** **prompt** **caching,** **session-scoped** **memory,** and **graceful** **degradation** when no API key is present. It is **switched** **off** in the live deployment but **fully** **implemented,** behind four clearly marked toggles.

Deployment splits the two halves: the **React** app on **Vercel,** the backend on a **single** **EC2** box behind **Cloudflare.** **Nginx** terminates **TLS** with a **Cloudflare** **Origin** **Certificate** under **Full** **(strict)** mode, and the security group admits **443** from **Cloudflare's** **IP** **ranges** **only** — which is what stops anyone **bypassing** the **edge** by hitting the origin IP directly.

**Kafka** publishes **no** **ports** at all in the production compose file, reachable **only** from within the compose network, and the **Anthropic** key is designed to arrive from **SSM** **Parameter** **Store** at container start — **never** in an env file, and **never** **baked** **into** **the** **image.**

Sizing was measured rather than guessed: **t3.micro's** **1GB** is not enough once Kafka is capped at a **512MB** heap and the **JVM** idles around **243MB,** before the OS and Docker get their share.

A **graphical** **three.js** front-end showing plants, bidding and clearing price as a **proper** **little** **game** is still **in** **progress,** alongside **deeper** **realtime** **sync** with more **live** **data** **sources.**
