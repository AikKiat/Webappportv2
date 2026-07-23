An AI-driven full-stack web application built on a modular monolithic **FastAPI** (Python) backend with a **React** + **TypeScript** frontend client.

The system interfaces via MQTT Pub/Sub with a **simulation** environment that models **robotic** entities, **movement** routes, **operational** constraints, and **baggage** transfer conditions.

Agentic capabilities are implemented through an AI-driven decision layer actively monitoring the simulation state changes, and either **generates** optimization recommendations and documents via the frotnend chatbot or **autonomously** **updates** the simulation environment with the entire **improved** **scenario.**

These changes in the external simulation environment are thus reflected back as data into the system through the same MQTT Pub/Sub topics, serving as a means for further evaluation to fine-tune the AI's decisions in future.

Both the **real-time** simulated environment data and the AI-recommended version are stored in **separate** **Redis** **hash** **keyspaces** for **low-latency** access. Thus, I created update logic for the hash objects whenever new data arrived on the simulation, prompting the AI come up with a new optimal resource allocation scenario.

For clear and intuitive presentation, I took inspiration from card games like Hearthstone, Solitaire to visualise the reallocation of resources, representing the two state scenarios mentioned.To achieve this, I used **ReactFlow,** creating **interactive** **cards** symbolising each **simulation** **entity.** This allowed the UI to scale, and support ever **larger** **amounts** of simulation actors that could be **positioned** **freely** by the user - without constant calculations to resize DOM elements to fit screen width.

Secondly, regarding **backend** **performance:**

I further created application-level singleton classes to **collate** **metrics,** track system-wide KPIs such as **cache** **hit** **rates,** **LLM token** **usage,** and **API response** **times.** These metrics were exposed via **Prometheus scraping** and visualized through **Grafana dashboards,** enabling real-time observability and performance analysis.

Using these insights, I identified bottlenecks, **optimizing** the **chatbot message** **storage layer** by introducing **Redis** as a **cache-first** **data store** ahead of the primary database via **write-through** caching, enabling rapid retrieval of the **most recent** **N messages** per conversation.

This reduced overhead from having to repeatedly fetch chat data from the database (only doing so on cache-miss) and improved worst-case API latency from **422** ms to **22** ms.

Rounding things off, I **containerised** both the **simulation system** and my own **resource monitor** into their separate **Docker Compose** projects. Regarding the **initial setup** of the simulation environment on the **local machine,** I liased substantially with the team's overseas Chinese Software Developers for the different configuration settings that needed to be applied, and eventually **presented** my entire solution to them.

Overall, it was a truly meaningful, fruitful and enlightening experience, and I learnt the importance of **designing systems** that are **modular,** have **clear boundaries** between components, and can be **expanded** in future to **champion** **larger scale** **workloads.**
