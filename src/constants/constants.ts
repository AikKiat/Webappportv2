


interface introtext{
    heading : string,
    specialisations : string[],
    bodyParagraph : string,
    github : string,
    resume : string,
    linkedin : string,
    githubIcon : string,
    linkedinIcon : string
}

export const introTexts : introtext ={
    heading : "Hello! I am Thng Aik Kiat",
    bodyParagraph : `**Hello**! 
                    **I** **am** **Thng** **Aik** **Kiat**, **a** **Fullstack** **Developer**. I enjoy **architecting solutions **modular**, **scalable** and lean.
                    Throughout my experiences in **translating** **business** **concepts** to **software** **systems**, I have enjoyed creating digital creations purposeful and seen.
                    In today's age of AI and agentic development, coding moves faster than ever anticipated.
                    However, I believe that writing **robust**, **secure** and **impactful** solutions, belong to those that **code** with their **hearts**, and **guide** **the** **uninitiated**.
                    
                    Having done **Digital Art**, I revel learning to create **original**, **expandable UI**, with **CSS & frontend frameworks like **React**.
                    On top of that, exploring **Generative** **AI** **applications** to **supercharge** my projects is also a core interest of mine.
                    Aside from work, I spend my time **building **model kits**, **Warhammer 40000**, and exercising.
                    `,
    specialisations : ["Fullstack Developer", "Computer Science@SUTD", "Minor in AI"],
    github : "https://github.com/AikKiat",
    resume: "https://drive.google.com/file/d/14zcGeDbXejAPY9gLe7d6CdP0JOwujquh/view",
    // resume : "https://drive.google.com/file/d/1kcRX-xT-qelUz_M5fJlimTzZIjQmIgnl/view",
    linkedin : "https://www.linkedin.com/in/thng-aik-kiat-535a2732a/",
    githubIcon : "/icons/github.png",
    linkedinIcon : "/icons/linkedin.png"
}

export interface project{
    name : string,
    timeFrame : string,
    imageSource : string,
    theme: string,
    videoSource : string | null,
    imageCollage : string[] | null,
    videoCollage : string[] | null,
    longerDescription : string,
    uniqueIdName : string,
    techstack : string[] | null,
    githubLink : string | null,
    checkItOutLinks : string[] | null,
    checkItOutMsgs : string[] | null,
    titleDesc : string,
    titleThumbnail : string | null
}

export const projects : project[] = [
    {
        name : "Current Ongoing Projects",
        timeFrame : "Current Ongoing",
        imageSource : "",
        theme: "",
        videoSource : "",
        imageCollage : null,
        videoCollage : null,
        longerDescription : "",
        uniqueIdName : "current",
        techstack : ["/icons/java.png", "icons/cpp.png"],
        githubLink : null,
        titleDesc : "Current Ongoing Projects",
        checkItOutLinks : ["https://github.com/AikKiat/codecrafters-redis-java", "https://github.com/AikKiat/c_compiler_test"],
        checkItOutMsgs : [" (Github Repo) Mock Redis", "C-Compiler, Test"],
        titleThumbnail : ""
    },
    {
        name : "Energy Market Game Simulator",
        timeFrame : "Aug 26",
        theme: "Realtime Energy Market Sim, 3D",
        imageSource : "/images/energymarket_1.webp",
        videoSource : null,
        imageCollage : ["/images/energy_market_3.png","/images/energymarket_1.webp", "/images/energymarket_2.webp"],
        videoCollage : null,
        longerDescription : "An interactive wholesale electricity market simulator built on an event-driven Spring Boot + Kafka backend, with a declarative React lesson engine and a three.js stage. Part simulator, part learning journal.",
        uniqueIdName : "energymarket",
        techstack : ["/icons/java.png", "/icons/spring.png", "/icons/psql.png", "/icons/ts.png", "/icons/react.png", "/icons/docker.png", "/icons/aws.png"],
        githubLink : "https://github.com/AikKiat/SimpleEnergyMarketSimulator-European-",
        checkItOutLinks : ["https://simple-energy-market-simulator-euro-one.vercel.app/"],
        checkItOutMsgs : ["Check out the live hosted application here!"],
        titleDesc : "Interactive Wholesale Electricity Market Simulator, Driven by a Live Merit-Order Auction",
        titleThumbnail : null
    },
    {
        name : "VirusTotal File Scanner (CloudsineAI Take-Home)",
        timeFrame : "Jan 26",
        theme: "File Scanner, GenAI",
        imageSource : "",
        videoSource : null,
        imageCollage : ["/images/virus_total.jpg"],
        videoCollage : null,
        longerDescription : "A secure-by-design fullstack file scanner on AWS EC2. Files are offloaded to VirusTotal for scanning across 70+ antivirus engines, then distilled by a streaming LLM summariser into something a lay user can actually read.",
        uniqueIdName : "vtscanner",
        techstack : ["/icons/python.png", "/icons/ts.png", "/icons/react.png", "/icons/redis.png", "/icons/docker.png", "/icons/aws.png", "/icons/langchain.png", "/icons/langgraph.png"],
        githubLink : "https://github.com/AikKiat/protocyber128_Take_Home_Assignment",
        checkItOutLinks : null,
        checkItOutMsgs : null,
        titleDesc : "Secure-by-Design VirusTotal File Scanner with a Streaming AI Summariser, on AWS",
        titleThumbnail : null
    },
    {
        name : "AI-Driven Resource Monitor Project (Internship @NCS NEXT)",
        timeFrame : "Sep-Dec 25",
        theme: "Realtime Agentic Platform",
        imageSource : "/images/aidrm.webp",
        videoSource : null,
        imageCollage : null,
        videoCollage :null,
        longerDescription : "Longer DESC HERE",
        uniqueIdName : "aidrm",
        techstack : ["/icons/redis.png", "/icons/docker.png", "/icons/python.png", "/icons/ts.png", "/icons/react.png","/icons/psql.png", "/icons/tigerdata.png", "/icons/prometheus.png", "/icons/grafana.png", "/icons/langchain.png", "/icons/langgraph.png"],
        githubLink : null,
        checkItOutLinks : ["https://github.com/AikKiat/learning/blob/main/learning/designing_chat_system.md"],
        checkItOutMsgs : ["(Github Repo) More info about how I designed some parts of the system, open source design concepts."],
        titleDesc : "AI-Driven Agentic Fullstack App for Smarter Robotics Baggage Handling at Airports",
        titleThumbnail : null
    },
    {
        name : "T.A.L.L",
        timeFrame : "Aug-Sep 25",
        imageSource : "/images/tall.webp",
        theme: "Fullstack, LLM",
        videoSource : "",
        imageCollage : ["/images/tall.webp", "/images/dell_inno_1.webp", "/images/dell_inno_2.webp"],
        videoCollage : null,
        longerDescription : " Made using Kotlin, running on a modular monolithic Node.js backend server connected to a PostgreSQL database, with an-inbuilt Python Webscraper and using an AI LLM to generate unique profile images tailored towards the details of user's personal entries, constructing and visualising the unique lifestory they can build.",
        uniqueIdName : "tall",
        techstack : ["/icons/js.png", "/icons/python.png", "/icons/kt.png", "/icons/openshift.png", "/icons/androidstudio.png"],
        githubLink : "https://github.com/AikKiat/Dell_InnovateFest-2025",
        titleDesc : "Dell InnovateFest 2025: AI-Powered Mental Wellness App for Teenagers",
        checkItOutLinks : null,
        checkItOutMsgs : null,
        titleThumbnail : "images/tall.webp"
    },
    {
        name : "TikTok Tech Jam 2025: Secure Multi-Model LLM Chat Messaging Platform",
        timeFrame : "Aug 25",
        theme: "LLM Security",
        imageSource : "/images/suttd_gaurds.webp",
        videoSource : null,
        imageCollage : ["/images/suttd_gaurds.webp"],
        videoCollage :null,
        longerDescription : "Longer DESC HERE",
        uniqueIdName : "sutdg",
        techstack : ["/icons/python.png", "/icons/ts.png", "/icons/react.png","/icons/psql.png","icons/redis.png","/icons/docker.png","/icons/prisma.png","/icons/zod.png","/icons/presidio.png"],
        githubLink : null,
        checkItOutLinks : ["https://github.com/AikKiat/SUTTD_Guards_BackendServer","https://github.com/AikKiat/SUTTDGuards_De-Identification"],
        checkItOutMsgs : ["(Github Repo) Backend Server", "(Github Repo) PII De-Identification Service"],
        titleDesc : "TikTok Tech Jam 2025: Secure Multi-Model LLM Chat Messaging Platform",
        titleThumbnail : "/images/suttd_gaurds.webp"
    },
    {
        name : "Come Fly with Me",
        timeFrame : "Mar-May 25",
        theme: "Fullstack Hotel Booking App",
        imageSource : "/images/ascenda_5.webp",
        videoSource : "",
        imageCollage : ["/images/ascenda_5.webp"],
        videoCollage : null,
        longerDescription : "",
        uniqueIdName : "hotelapp",
        techstack : ["/icons/docker.png", "/icons/js.png", "/icons/react.png", "/icons/mysql.png", "/icons/cypress.png"],
        githubLink : "https://github.com/AndrewLJY/ESCWebApp",
        titleDesc : "Fullstack (MERN -Mysql) Hotel Booking System for Ascenda",
        checkItOutLinks : null,
        checkItOutMsgs : null,
        titleThumbnail : "/images/ascenda_5.webp"
    },
    {
        name : "End-End ML Pipeline for Customer Loyalty Prediction",
        timeFrame : "May 25",
        theme: "Data Science (EDA,ML)",
        imageSource : "",
        videoSource : "",
        imageCollage : ["/images/pipeline_graph.webp", "/images/results.webp"],
        videoCollage : null,
        longerDescription : "",
        uniqueIdName : "mlpipeline",
        techstack : ["/icons/scikitlearn.png", "/icons/python.png", "/icons/SQLite.png"],
        githubLink : "https://github.com/AikKiat/End-End-ML-Pipeline-for-Customer-Loyalty-Prediction/",
        titleDesc : "End-End EDA and ML Pipeline for Customer Loyal Prediction",
        checkItOutLinks : null,
        checkItOutMsgs : null,
        titleThumbnail : "/images/pipeline_graph.webp"
    },
    {
        name : "SmartHealth",
        timeFrame : "Feb-Apr 25",
        theme: "Fullstack, LLM",
        imageSource : "/images/smarthealth_2d_poster.webp",
        videoSource : "",
        imageCollage : ["/images/smarthealth_2d_poster.webp", "/images/smarthealth_award.webp", "/images/smarthealth_physicalposter.webp"],
        videoCollage : ["https://www.youtube.com/embed/L9Ba1HxGkM4?si=afmOv2GFCXTzzZPx"],
        longerDescription : "Android App created as Part of 50.001 Informations Systems and Programming Course. Created using Java in Android Studio, and used Java Spring as the backend framework. User data stored in a PostGreSQL database, hosted on AWS. REST APIs for standardised clear communication standard between the client and backend, and RESTful APIs include Google Places, Routes API, Open AI GPT4.0 Api. We also hosted this backend on a free server space platform called Render, allowing the backend service of our app to be running 24/7. A step towards increased efficacy in deployment, and allowing our backend service to scale to larger platforms in the future.",
        uniqueIdName : "smarthealth",
        techstack : ["/icons/java.png", "/icons/spring.png", "/icons/aws.png"],
        githubLink : "https://github.com/ItsMeOX/SmartHealth",
        titleDesc : "AI-Powered Healthtech App for the Elderly with Image Detection for Calorie Management",
        checkItOutLinks : null,
        checkItOutMsgs : null,
        titleThumbnail : "images/smarthealth_0.webp"
    },
    {
        name : "Portfolio V1",
        timeFrame : "Mar 25",
        theme: "Static HTML, perfect purity",
        imageSource : "",
        videoSource : "",
        imageCollage : ["/images/portfoliov1_1.webp", "/images/portfoliov1_2.webp","/images/portfoliov1_3.webp" ],
        videoCollage : null,
        longerDescription : "My first web portfolio, and also my first project using HTML, CSS and Javascript. Made in Feb 2025. View it here, together with my **older_projects from **2023-_2024**.",
        uniqueIdName : "pv1",
        techstack : ["/icons/html.png", "/icons/css.png", "/icons/js.png" ],
        githubLink : "https://github.com/AikKiat/webappport",
        titleDesc : "My First Web Portfolio",
        checkItOutLinks : ["https://aikkiat.github.io/webappport/"],
        checkItOutMsgs : ["(Github Repo) Check it out here!"],
        titleThumbnail : "images/portfoliov1_1.webp"
    },
]


//The three projects surfaced in the FEATURED strip below the drawer. Order here is
//the order they appear in, so the pick is a one-line edit rather than a layout change.
export const featuredProjectIds : string[] = ["energymarket", "vtscanner", "smarthealth"];

export const featuredProjects : project[] = featuredProjectIds
    .map((id) => projects.find((project) => project.uniqueIdName === id))
    .filter((project) : project is project => project !== undefined);


export interface skill {
    logo : string
    name : string
    color : string
}

export const skills : skill[] = [
    {
        logo: "/icons/react_black.png",
        name: "React",
        color: "#2eb6ffff",
    },
    {
        logo: "/icons/ts_black.png",
        name: "TypeScript",
        color: "#3090fdff",
    },
    {
        logo: "/icons/js_black.png",
        name: "JavaScript",
        // color: "#fff75bff",
        color:"#c49206"
    },
    {
        logo: "/icons/python_black.png",
        name: "Python",
        color: "#ACBA68",
    },
    {
        logo: "/icons/java_black.png",
        name: "Java",
        color:"#ff9a48ff",
    },
    {
        logo: "/icons/cpp_black.png",
        name: "C++",
        color:"#0467fcff",
    },
    {
        logo: "/icons/c_black.png",
        name: "C",
        color:"#0467fcff",
    },
    {
        logo: "/icons/kt_black.png",
        name: "Kotlin",
        color:"#c130ffff",
    },
    {
        logo: "/icons/html5_black.png",
        name: "HTML5",
        color:"#ff5622ff",
    },
    {
        logo: "/icons/html5_black.png",
        name: "CSS",
        color: "#3654ffff",
    },
    {
        logo: "/icons/spring_black.png",
        name: "Spring Boot",
        color:"#00b561ff",
    },
    {
        logo: "/icons/docker_black.png",
        name: "Docker",
        color:"#488bffff",
    },
    {
        logo: "/icons/k8s_black.png",
        name: "Kubernetes",
        color:"#488bffff",
    },
    {
        logo: "/icons/psql_black.png",
        name: "PostgreSQL",
        color: "#0195ffff",
    },
    {
        logo: "/icons/mysql_black.png",
        name: "MySQL",
        color:"#0080ffff",
    },
    {
        logo: "/icons/sqlite_black.png",
        name: "SQLite",
        color:"#0080ffff",
    },
    {
        logo: "/icons/mongodb_black.png",
        name: "MongoDB",
        color:"#26bb70ff",
    },
    {
        logo: "/icons/redis_black.png",
        name: "Redis",
        color:"#ff1616ff",
    },
    {
        logo: "/icons/tigerdata_black.png",
        name: "TigerData",
        color:"#ffb71dff",
    },
    {
        logo: "/icons/openshift_black.png",
        name: "Openshift",
        color:"#ff1d34ff",
    },
    {
        logo: "/icons/aws_black.png",
        name: "AWS (S3)",
        color:"#ffae0dff",
    },
    {
        logo: "/icons/prometheus_black.png",
        name: "Prometheus",
        color:"#ff450dff",
    },
    {
        logo: "/icons/grafana_black.png",
        name: "Grafana",
        color:"#ff9900ff",
    },
    {
        logo: "/icons/langchain_black.png",
        name: "LangChain",
        color:"#009b17ff",
    },
    {
        logo: "/icons/langgraph_black.png",
        name: "LangGraph",
        color: "#009b17ff",
    },
    {
        logo: "/icons/pandas_black.png",
        name: "Pandas",
        color: "#131afeff",
    },
    {
        logo: "/icons/scikitlearn_black.png",
        name : "Scikit Learn",
        color : "#fbcf5f"
    },
    {
        logo : "/icons/tensorflow_black.png",
        name : "Tensorflow",
        color : "#ff7f1d"
    }

]


export interface personal{
    uniqueName : string,
    index : number,
    title : string,
    description : string,
    imageSource : string | null,
    multiDescription : certInfo[] | null,
    longerDescription : string | null
}

export interface certInfo{
    title : string,
    credentialLink : string,
    imageSource : string
}

const leadership : personal[] = [
    {
        index : 0,
        title : "President, Unreal Enthusiasts Interest Group",
        description : "**Led workshops on **3D **Digital_Art, **VR and **Animation. **Created and **hosted **projects during key events such as **Open_House, **XR_Day involving big players such as **Meta.",
        imageSource : "/images/ue.webp",
        multiDescription : null,
        uniqueName : "ueig",
        longerDescription : "**President of the **Unreal **Enthusiasts Interest Group for **2_years, and conducted **~10 **learning_workshops focused on **Blender and **Unreal_Engine for the **SUTD_community. Eventually I and my Exco also created a **Souls-like **third_person **sandbox **boss-fight and **VR_immersion **environment depicting **tourist_destinations, showcasing these projects both intra-school and in external events."
    },
    {
        index : 1,
        title : "University Ambassador",
        description: "Conducted **>20 **School_tours for students, parents, overseas professors, consultant for candidates' **enquiries during **SUTD **Admissions_Interviews, and welcomed potential students during for Offer Receptions.",
        imageSource : "/images/sutd_logo.webp",
        multiDescription : null,
        uniqueName : "ua",
        longerDescription : "**SUTD **University_Ambassador from **2023 until **August_2025. During my time as an ambassador, I involved myself in **more_than **20_events for **prospective_students, **parents, and **overseas_professors. I not only learnt how to present various aspects of **SUTD's **Design and **Innovation **philosophy to various **demographics, but also **value **this **institution more in terms of the **learning_opportunities it has given me, to take on my aspiration of being a **Computer_Science student **imbued with the **dynamic, **humanistic_nature that SUTD **requires of its **builders."

    },
    {
        index : 2,
        title : "Teaching Assistant, at SUTD-SST Big D Camp 2025",
        description : "Created technical **lesson **manuals, **mentored a team of 4 secondary school students from **School **of **Science and **Technology, building an **Arduino **robot controllable via **Bluetooth.",
        imageSource : "/images/sutd_bigd.webp",
        multiDescription : null,
        uniqueName : "sutdbigd",
        longerDescription : "I **mentored a team of 4 secondary school students from **School **of **Science **and **Technology, to build an **Arduino_rover **robot to compete in a **mass **object_retrieval **sandbox, **populated with various items **simulating_debris needed to be cleared after a disaster. The robot was **controllable **via **bluetooth. Helped various teams **diagnose **errors and also **produced **lesson_content for setting up the **HC05 **Bluetooth **module. Personally mentored team won **Best **Team **Spirit **Award."
    }
]

const experiences : personal[] = [
    {
        index : 0,
        title : "Fullstack AI Security Engineering Intern, Cloudsine Pte Ltd",
        description : "Developed proprietary Guardrails for client AI products ranging from PII detection services, keyword and vector-based cosine similarity comparisons to detect prompt injection. Integrated products with LiteLLM to support prompt injection from user inputs as well as compromised responses from backend LLMs.",
        imageSource : "/images/ncs.webp",
        multiDescription : null,
        uniqueName : "cloudsine",
        longerDescription: "My latest internship under Cloudsine Pte Ltd, a mature cybersecurity startup specialising in developing propreitary AI security products. I worked as a Fullstack Engineer primarily involved in backend development, notably improving the end-end response times of various services such as the PII detection service by reducing the workload given to the compute-heavy Microsoft Presidio and writing my own custom PII detection service in Go that supports Regex and NER organic entity classification for Singapore-based data. To further improve performance, I took leverage of Bloom Filters and constructed a custom Bloom filter guard using Go's libraries to process only textual chunks that were probabilisitically likely to contain NER content, thus reducing overhead to the slow NER detection. Overall, all these cut response times by 5x from 31 seconds to ~6 seconds. Apart from that, I also worked on securing enterprise code through SCA, SAST and IaC configurations scans, rewriting Dockerfile build stages to use multi-stage builds, distroless images that cut down on > 100 CVEs. Finally, I created scalable, more streamlined SIEM monitoring by onboarding Elastic Agent sidecars within the Helmchart IaC for log collection, subscribed under a global Elastic Fleet hosting on-prem. Overall, across the 4 months I made good long lasting friendships and greatly honed my skills. I am ever grateful to CloudsineAI for giving me so much exposure to the world of AI security and software developement.",
    },
    {
        index : 1,
        title : "Fullstack Software Engineering Intern, Next Open Innovation (NCS)",
        description : "Created a **fullstack **AI-Driven **Resource_Monitoring **System to **Streamline **Baggage **Handling at **Airports via **Robotics **Autonomous_Systems. **Designed backend system and **improved **scalability with **measured **performance **metrics.",
        imageSource : "/images/ncs.webp",
        multiDescription : null,
        uniqueName : "ncs",
        longerDescription: "During my 4 months at NCS as a Fullstack Software Engineering intern, I built a **fullstack **AI-Driven **Resource **Monitoring **System that **integrates with an existing **simulation_evironment, to showcase how **AI could be implemented to **streamline the **coordination and **selection of **robotics_systems to handle **baggages. From first **defining the **problem and later on **creating the actual fullstack system with a **modular, **cleanly **layered **software_architecture, I indeed **learnt a great deal about the entire **product_development process alongside **developing **software **systems. More in the **Projects_Section",
    },
    {
        index : 2,
        title : "DellInnovateFest 2025",
        description: "A **memorable **1-month long **hackathon hosted by **Dell_Technologies, representing SUTD ans building an **AI-powered **software_product to **address **teenage **mental **well-being in Singapore.",
        imageSource : "/images/dell_inno_1.webp",
        multiDescription : null,
        uniqueName : "dellhackathon",
        longerDescription : "A memorable 1-month long hackathon hosted by Dell Technologies, **representing_SUTD as a **finalist_team, and built a software solution after weeks of heartfelt solutioning, to **alleviate the **mental_health situation amongst **teenagers in **Singapore. Worked with **Singapore **Association **for **Mental **Health **(SAMH) for **problem_definition & **emotional_journey of teenagers. Truly fruitful in building software products for the **good **of **society, through **meticulous, **heartfelt_solutioning. More in the **Projects_Section."
    }
]


const education : personal[] = [
    {
        index : 0,
        title : "Year 3 Computer Science @SUTD",
        description : "Currently pursuing **Computer_Science, **Singapore **University **of **Technology **and **Design. Taking on a **minor in **AI, and also currently taking more courses in **Security **(Network and **System Security) to further **expand **my **knowledge.",
        imageSource : "/images/sutd_logo.webp",
        multiDescription : null,
        uniqueName : "cssutd",
        longerDescription: null
    },
]


export const personalQualities = {
    leadership : leadership,
    experiences : experiences,
    education : education,
}