Learning more about key technologies for **distributed systems.** Building a **Redis clone** using **Java.**

Current work: GET, SET, PING, INCR, MULTI commands.

Per-client buffers set up to parse RESP and RESP2 data, as well as command queue using ArrayDeque to manage queued commands after MULTI.

Key expiry through additional PX argument that arrives with SET.
