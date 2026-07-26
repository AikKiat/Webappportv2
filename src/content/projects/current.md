> 1. Learning more about key technologies for **distributed systems.** Building a **Redis clone** using **Java.**

Current work: GET, SET, PING, INCR, MULTI commands.

Per-client buffers set up to parse RESP and RESP2 data, as well as command queue using ArrayDeque to manage queued commands after MULTI.

Key expiry through additional PX argument that arrives with SET.

> 2. Building my own custom C-Compiler (C++)

After chancing upon this book: **Writing a C Compiler by Sandler Nora**, I have been inspired to learn more about computer systems by writing my own C-Compiler for fun. Currently at te AST phase of token parsing, and being able to pretty-print the AST. Compiler handles very basic code for now. Definitely plan on expanding the grammar and lexicon to support more compelex code.
