A **fullstack** **file** **scanning** web application built as a **take-home** **assignment,** where uploaded files are **offloaded** to the open-source **VirusTotal** service for scanning across **70+** **antivirus** **engines,** and the raw verdicts are then **distilled** by **Generative AI** into something a **lay** **user** can actually **read.**

I treated this as a chance to learn **security by design**. I focused on the **10 Principles** **of** **Secure** **by** **Design**, focusing on **Least** **Privilege,** **Defense** **in** **Depth,** **Separation** **of** **Duties,** **Minimised** **Attack** **Surface** and **Secure** **by** **Default**.

The backend is **Python** **3.11** on **FastAPI,** organised into the same layers I have used extensively in my other projects - `routes` for the API surface, `services` for business logic, `repository` for data access, `domain` to encapsulate the business model, and `vt_api_mappers` as a **translation** **layer** holding **Pydantic** models that map exactly onto VirusTotal's response schemas (for api sanitisation).

That mapper layer exists because of a **Zero** **Trust** assumption I liked working through: if the external service were ever **spoofed,** its responses become an **attack** **vector** into my own server. So we make sure to prevent attacks not just from the client-side through our user facing frontend, but also server side in querying potentially outdated APIs which can be a nest for typosquatting.

I used Nginx as the reverse-proxy as an additional layer of security and for future TLS implementation, also controlling the **file** **size** **limit** through `client_max_body_size`.

Two **upload** **workflows** are supported. A **quick** **scan** computes the file's **SHA-256** locally and queries VirusTotal's existing database. 

A **full** **scan** will upload the file into VirusTotal for a realtime scan. However, a full realtime scan means sending the file to VirusTotal's database, exposing its contents to the open source repository. Since this is usually not really made known especially to the layman, I felt that it was better to flesh-out these 2 contrasting upload paths which have vastly different user journey workflows.

For persistence I chose **Redis** over both process memory and a relational database. My inspiration was a website called **remove.bg** where people could simply upload an image, have its background removed and download it. From this we can see that there is little inkling of persistent storage beyond the browser's session. This offers some advantages:
- 1: No need for long term storage which brings issues of resource allocation, cost, and even potential breach of personal data (since queries into **how** we store such precious information will arise).
- 2: A much simpler architecture overall that can deliver on the main use cases. 

**Why I chose Redis:**
- Process Memory means we **lose** everything on restart and **cannot** be shared across horizontally scaled instances.

- Then, full relational schema like Postgresql, as aforementioned, felt like an**overkill**. 

- Redis on the other hand --> **low** **latency,** and **persistent, shareable storage** since data is separated to another layer.

- So for these few reasons, and due to Redis's quick in-memory data retrieval patterns as a highly dynamic datastore, I felt that it was a good choice for this assignment project - *also because it would be a good opportunity to learn Redis aside from using it at NCS* 



For added security, I thought of how at this current state we could see the details of data being sent from the frontend to the backend server. Notably, to fetch the AI summary, we needed a way to indexing what file scan result was referenced.

Therefore, send the filename over? Send a number which is the index? In the end I decided upon marking every upload with a **UUID**, that forms the subject of communication. The **UUID** from the outset symbolises no real semantic meaning. What can we see from it? Im not sure but yeah, a set of digits and letters.

Hence, this was one more security feature I thought of myself - carry **no** **semantic** **meaning** to anyone sniffing traffic in our conversations between the client-side and backend services. The UUID is derived from the filename concatenated with `quick` or `full`, so the **same** file scanned **two** **ways** yields **two** **distinct** entries.




**AI Summariser**

The **AI** **summariser** lives **inside** the backend as a **modular** component rather than a separate service. Splitting it out would have bought **independent** **scalability** at the cost of **more** **exposed** **endpoints**, and because I strove for simpliciy here I opted to make it as a clearly separated component within this modular monolithic backend. 




**Container Filesystem Security**

On the **container** side, uploaded files land in a **dedicated** **tmpfs** **directory** mounted `noexec,nosuid`, owned by a **non-root** `appuser` with mode **600,** and are **deleted** immediately after being read into memory. This is very important as the nature of our scanner was to incorporate the potentially malicious file for scanning (If user's chose the second workflow of uploading to VirusTotal for a full scan). Therefore, I hoped that even a **genuinely** **malicious** upload cannot be executed in this jail.




**Some more key features and things I learnt to incorporate:**

Deployment runs on **AWS** **EC2** via **Docker** **Compose,** with only port **80** (**Nginx**) exposed to the host - backend and Redis are reachable **only** on the internal Docker network.

Migrated secrets from **gitignored** `.env` files to **AWS** **Secrets** **Manager.** I took this time to learn AWS IAM, so the secrets are read at deploy time by an **IAM** **instance** **role** scoped by **ARN** to this **one** **secret.** We dont store the secrets and credentials on the EC2 instance itself, and with the Secrets Manager we can easily rotate our secrets, decoupling this responsibility. 