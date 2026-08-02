A **fullstack** **file** **scanning** web application built as a **take-home** **assignment,** where uploaded files are **offloaded** to the open-source **VirusTotal** service for scanning across **70+** **antivirus** **engines,** and the raw verdicts are then **distilled** by **Generative AI** into something a **lay** **user** can actually **read.**

I treated this as a chance to design **security-first** from the very first diagram rather than bolting it on at the end. Before writing any code I mapped every boundary where data **enters** or **leaves** the system — client to backend, backend to VirusTotal, backend to the **LLM** **provider,** backend to storage — and worked through the **10 Principles** **of** **Secure** **by** **Design** at each one, settling on **Least** **Privilege,** **Defense** **in** **Depth,** **Separation** **of** **Duties,** **Minimised** **Attack** **Surface** and **Secure** **by** **Default** as the ones that mattered most at this scale.

The backend is **Python** **3.11** on **FastAPI,** organised into **cleanly** **layered** packages — `routes` for the API surface, `services` for orchestration, `repository` for data access, `domain` for the core business model, and `vt_api_mappers` as a **translation** **layer** holding **Pydantic** models that map exactly onto VirusTotal's response schemas.

That mapper layer exists because of a **Zero** **Trust** assumption I liked working through: if the external service were ever **spoofed,** its responses become an **attack** **vector** into my own server. So validation happens at **three** **boundaries** — at the API edge, at the external service edge, and again on retrieval from storage.

The **file** **size** **limit** is enforced the same way, in **three** **independent** **places** — **Nginx** `client_max_body_size`, the FastAPI **route** **handler,** and again in the **service** **layer** against the actual byte count. Each layer deliberately **does** **not** **trust** the one before it, so a single misconfiguration cannot open the door.

Two **upload** **workflows** are supported. A **quick** **scan** computes the file's **SHA-256** locally and queries VirusTotal's existing database — instant results for **known** **samples** without ever transmitting the file. A **full** **scan** genuinely uploads it, branching between the **direct** endpoint for files under **32MB** and the **pre-signed** **upload** **URL** flow for anything up to **650MB.**

For persistence I chose **Redis** over both process memory and a relational database. Process memory **loses** everything on restart and **cannot** be shared across horizontally scaled instances; a full relational schema felt like **overkill** for a service that deliberately requires **no** **login.** Redis sat in the middle — **low** **latency,** **persistent,** and **shareable.**

One detail I am fond of: files are keyed by **UUID** rather than filename, so **repeated** **requests** carry **no** **semantic** **meaning** to anyone sniffing traffic. The UUID is derived from the filename concatenated with `quick` or `full`, so the **same** file scanned **two** **ways** yields **two** **distinct** entries.

The **AI** **summariser** lives **inside** the backend as a **modular** component rather than a separate service. Splitting it out would have bought **independent** **scalability** at the cost of **more** **exposed** **endpoints** — a trade that did not pay for itself here. It is wrapped behind a **singleton** **interface** so the underlying provider can be **swapped** without touching any calling code, and summaries are **streamed** **chunk** **by** **chunk** so the user can **navigate** **away** while the **LLM** is still generating.

On the **container** side, uploaded files land in a **dedicated** **tmpfs** **directory** mounted `noexec,nosuid`, owned by a **non-root** `appuser` with mode **700,** and are **deleted** immediately after being read into memory. Even a **genuinely** **malicious** upload cannot be executed from where it lands.

Deployment runs on **AWS** **EC2** via **Docker** **Compose,** with only port **80** (**Nginx**) exposed to the host — the backend and Redis are reachable **only** on the internal Docker network, mirrored by the **Security** **Group** rules.

Secrets migrated from **gitignored** `.env` files to **AWS** **Secrets** **Manager,** read at deploy time by an **IAM** **instance** **role** scoped by **ARN** to this **one** **secret.** No credentials ever touch disk, and **rotating** a **compromised** key becomes **update** **the** **secret,** **re-run** **the** **deploy** **script** — which was exactly the **lifecycle** question I wanted an answer to before I started.

A **GitHub** **Actions** pipeline builds and containerises both services on every push, so broken commits surface **immediately** rather than at deploy time.

Overall, a genuinely **enlightening** project — and a reminder that the **foundational** **concepts** are what keep you starting off on the **right** **foot.**
