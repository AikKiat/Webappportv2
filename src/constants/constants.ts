


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
                    **I** **am** **Thng** **Aik** **Kiat**, **a** **Fullstack** **Developer**. I enjoy **architecting **modular**, **scalable**, and **purposeful** solutions with the **right_technologies**, constituting **loosely_coupled, **interconnected services each with **clear **operational_functions.
                    Having done **Digital Art**, I revel learning to create **original**, **expandable UI**, with **CSS & frontend frameworks like **React**.
                    On top of that, exploring **Generative** **AI** **applications** to **supercharge** my projects is also a core interest of mine.
                    Aside from work, I spend my time **building **model kits**, **Warhammer 40000**, and exercising.
                    `,
    specialisations : ["Fullstack Developer", "Computer Science@SUTD", "Minor in AI"],
    github : "https://github.com/AikKiat",
    resume : "https://drive.google.com/file/d/1kcRX-xT-qelUz_M5fJlimTzZIjQmIgnl/view?usp=drive_link",
    linkedin : "https://www.linkedin.com/in/thng-aik-kiat-535a2732a/",
    githubIcon : "/icons/github.png",
    linkedinIcon : "/icons/linkedin.png"
}

export interface project{
    name : string,
    description : string,
    imageSource : string,
    videoSource : string | null,
    imageCollage : string[] | null,
    videoCollage : string[] | null,
    longerDescription : string,
    uniqueIdName : string,
    techstack : string[] | null,
    githubLink : string | null,
    titleDesc : string,
    titleThumbnail : string | null
}

export const projects : project[] = [
    {
        name : "AI-Driven Resource Monitor Project (Internship @NCS NEXT)",
        description: 
        `An AI-driven full-stack web application built on a modular monolithic **FastAPI (Python) backend with a **React + **TypeScript frontend client.
        The system interfaces with a **simulation environment that models **robotic entities, **movement routes, **operational constraints, and **baggage transfer conditions. 
        Agentic capabilities are implemented through an AI-driven decision layer actively monitoring the simulation state changes, and either **generates optimization recommendations and documents via the frotnend chatbot or **autonomously **updates the simulation environment with the entire **improved **scenario.
        Both the **real-time simulated environment data and the AI-recommended version are stored in **separate **Redis **hash **keyspaces for **low-latency access. Thus, I created update logic for the hash objects whenever new data arrived on the simulation, prompting the AI come up with a new optimal resource allocation scenario.
        For clear and intuitive presentation, I took inspiration from card games like Hearthstone, Solitaire to visualise the reallocation of resources, representing the two state scenarios mentioned.To achieve this, I used **ReactFlow, creating **interactive **cards symbolising each **simulation **entity. This allowed the UI to scale, and support ever **larger **amounts of simulation actors that could be **positioned **freely by the user - without constant calculations to resize DOM elements to fit screen width.
        Secondly, regarding **backend **performance: 
        I further created application-level singleton classes to **collate **metrics, track system-wide KPIs such as **cache **hit **rates, **LLM_token usage**, and **API_response** times**. These metrics were exposed via **Prometheus_scraping and visualized through **Grafana_dashboards, enabling real-time observability and performance analysis.
        Using these insights, I identified bottlenecks, **optimizing the **chatbot_message **storage_layer by introducing **Redis as a **cache-first **data_store ahead of the primary database via **write-through** caching, enabling rapid retrieval of the **most_recent **N_messages per conversation.
        This reduced overhead from having to repeatedly fetch chat data from the database (only doing so on cache-miss) and improved worst-case API latency from **422 ms to **22 ms.
        Rounding things off, I **containerised both the **simulation_system and my own **resource_monitor into their separate **Docker_Compose projects. This allowed me to start **no **less **than **6 **containers together with **2 **compose_up **-d commands. Regarding the **initial_setup of the simulation environment on the **local_machine, I liased substantially with the team's overseas Chinese Software Developers for the different configuration settings that needed to be applied, and eventually **presented** my entire solution to them.
        Overall, it was a truly meaningful, fruitful and enlightening experience, and I learnt the importance of **designing_systems that are **modular, have **clear_boundaries between components, and can be **expanded in future to **champion **larger_scale **workloads. `,
        imageSource : "/images/aidrm.png",
        videoSource : null,
        imageCollage : null,
        videoCollage :null,
        longerDescription : "Longer DESC HERE",
        uniqueIdName : "aidrm",
        techstack : ["/icons/redis.png", "/icons/docker.png", "/icons/python.png", "/icons/ts.png", "/icons/react.png","/icons/psql.png", "/icons/tigerdata.png", "/icons/prometheus.png", "/icons/grafana.png", "/icons/langchain.png", "/icons/langgraph.png"],
        githubLink : null,
        titleDesc : "AI-Driven Agentic Fullstack App for Smarter Robotics Baggage Handling at Airports",
        titleThumbnail : null
    },
    {
        name : "T.A.L.L",
        description : 
        `A fullstack **Cloud **Native App embodying our research into **guided_journaling and **identity_building, made to **empower lives of **teenagers and **better their **mental_wellbeing. 
        Conceptualised for **DellInnovateFest **2025 by **Dell_Technologies aimed at **utilising_technology for **social_good.
        **Representing_SUTD as a **finalist_team, my team and I wanted to do our best not just for ourselves and SUTD, but for the **cause of **addressing **teenage **mental_wellbeing in **Singapore.
        We established an **enduring_partnership with **Singapore **Association **for **Mental Health, seeking the advice from the experts about **Art_Therapy and the **"Think, **Feel, **Act" **framework to **develop **personal **coping_strategies.
        Through **professional_guidance by our mentors Chia Yi You from Dell Technologies and Chun Hong from AsiaPac, we gradually **developed a solid **solution that **catalogs_teenagers' days events through a **short **guided_journalling activity, transforming these events into a **unique_timeline.
        This timeline represents the teen's **unique_journey and **lifestory, with the **AI collating **personal_interests, **events to generate both an **entertaining_avatar **backdrop the teenager can call his/her own, as well as **reframe_challenges into **stories **of **resilience.
        This allows teenagers to **backtrack to view **past_triumphs **over **challenges so that they will be **ever_ready in confronting **similar_obstacles in **future.
        **Tall, the **Almanac of **Lit **Life, was a month long product of passion and sincere innovation.
        The backend server was containerised using **Docker, stored within **Harbour's **secure **Container **Registry service, and hosted on **RedHat_Openshift.   
        Truly a **"Hackathon **with **a **Heart", **Dell_InnovateFest **2025 will forever be cherished within me.
        `,
        imageSource : "/images/tall.png",
        videoSource : "",
        imageCollage : ["/images/tall.png", "/images/dell_inno_1.png", "/images/dell_inno_2.png"],
        videoCollage : null,
        longerDescription : " Made using Kotlin, running on a modular monolithic Node.js backend server connected to a PostgreSQL database, with an-inbuilt Python Webscraper and using an AI LLM to generate unique profile images tailored towards the details of user's personal entries, constructing and visualising the unique lifestory they can build.",
        uniqueIdName : "tall",
        techstack : ["/icons/js.png", "/icons/python.png", "/icons/kt.png", "/icons/openshift.png", "/icons/androidstudio.png"],
        githubLink : "https://github.com/AikKiat/Dell_InnovateFest-2025",
        titleDesc : "AI-Powered Mental Wellness App for Teenagers",
        titleThumbnail : "images/tall.png"
    },
    {
        name : "Come Fly with Me",
        description : 
        `Fullstack Hotel Booking app for **client_company **Ascenda as part of school project using **ExpressJS, **ReactJS and **Stripe_Payments **API, as part of my **Term **5 **Elements_of **Software_Construction **50.003 **final **course **project.
        Work was split between the team, and I worked on the **backend **ExpressJS **server with 2 others. Data of **more **than **1000 hotel destinations **pulled from **Ascenda's provided API endpoints were stored in **boundary_actor **entities which could be used for **greater_expandability in terms of the **persistence_layer.
        Exposed various different REST API route endpoints for the middleware and frontend teams to use including a fuzzy search implementation for qerying syntax specific destinations by search query. 
        Wrote more than **600** **test_cases for robustness using methods such as **Equivalence_Class **Testing, **Boundary_Value **Analysis (Hotel booking dates), and ran tests using **Jest.
        The backend and frontend codes were containerised to separate **Docker_containers.`,
        imageSource : "/images/ascenda_5.png",
        videoSource : "",
        imageCollage : ["/images/ascenda_5.png"],
        videoCollage : null,
        longerDescription : "",
        uniqueIdName : "hotelapp",
        techstack : ["/icons/docker.png", "/icons/js.png", "/icons/react.png", "/icons/mysql.png", "/icons/cypress.png"],
        githubLink : "https://github.com/AndrewLJY/ESCWebApp",
        titleDesc : "Fullstack (MERN -Mysql) Hotel Booking System for Ascenda",
        titleThumbnail : null
    },
    {
        name : "SmartHealth",
        description : `All in one **HealthTech_app for people in their **50s **- **60s and **caregivers of the elderly. **Realtime **food_nutrient and **medicinal_package **analysis, **live **medical_centre **finder & **Google_Maps **UI using **Google_Places **API. **PostgreSQL for **user_Data, hosted in **AWS_RDS with **S3 scalable storage for **image_data.
        **Smarthealth is an **Android_App created as Part of **50.001 **Informations_Systems **and **Programming **Course. 
        Created using **Java in **Android_Studio, and used **Java_Spring as the **backend **framework, user data was stored in a **PostgreSQL **AWS_RDS.
        Me and my team used **Google_Places, **Routes **API, **Open_AI **GPT4.0 for **realtime **geospatial_mapping of **nearest_medical **centres, **Optical **Character **Recognition **(OCR) to **extract and **autofill medication in the **app's_inventory; and **image_detection to calculate meal calories from a single photo. 
        We also hosted this backend on **Render, allowing the backend service of our app to be running 24/7. 
        This was a step towards increased efficacy in **deployment, and allowing our **backend_service to scale to **larger platforms in the future.
        Ultimately, the sound project structure and good programming practices were recognised by Singtel's Software Engineering Team, we our team was awarded the **Singtel **Information_Systems **and **Programming_Award.
        Currently, we are working with the **Informations_System **Technology_Design **(ISTD) **department to showcase **Smarthealth during **2026's upcoming **SUTD **Open_House.`,
        imageSource : "/images/smarthealth_2d_poster.png",
        videoSource : "",
        imageCollage : ["/images/smarthealth_2d_poster.png", "/images/smarthealth_award.png", "/images/smarthealth_physicalposter.png"],
        videoCollage : ["https://www.youtube.com/embed/L9Ba1HxGkM4?si=afmOv2GFCXTzzZPx"],
        longerDescription : "Android App created as Part of 50.001 Informations Systems and Programming Course. Created using Java in Android Studio, and used Java Spring as the backend framework. User data stored in a PostGreSQL database, hosted on AWS. REST APIs for standardised clear communication standard between the client and backend, and RESTful APIs include Google Places, Routes API, Open AI GPT4.0 Api. We also hosted this backend on a free server space platform called Render, allowing the backend service of our app to be running 24/7. A step towards increased efficacy in deployment, and allowing our backend service to scale to larger platforms in the future.",
        uniqueIdName : "smarthealth",
        techstack : ["/icons/java.png", "/icons/spring.png", "/icons/aws.png"],
        githubLink : "https://github.com/ItsMeOX/SmartHealth",
        titleDesc : "AI-Powered Healthtech App for the Elderly with Image Detection for Calorie Management",
        titleThumbnail : "images/smarthealth_0.png"
    },
    {
        name : "Portfolio V1",
        description : "My first web portfolio from Mar 2025, built using vanilla HTML, CSS and a Javascript file for logic. My first HTML, CSS and Javascript project!",
        imageSource : "",
        videoSource : "",
        imageCollage : ["/images/portfoliov1_1.png", "/images/portfoliov1_2.png","/images/portfoliov1_3.png" ],
        videoCollage : null,
        longerDescription : "My first web portfolio, and also my first project using HTML, CSS and Javascript. Made in Feb 2025.",
        uniqueIdName : "pv1",
        techstack : ["/icons/html.png", "/icons/css.png", "/icons/js.png" ],
        githubLink : "https://github.com/AikKiat/webappport",
        titleDesc : "My First Web Portfolio",
        titleThumbnail : "images/portfoliov1_1.png"
    }
]


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
        color: "#fff75bff",
    },
    {
        logo: "/icons/python_black.png",
        name: "Python",
        color: "#edff95ff",
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
        imageSource : "/images/ue.png",
        multiDescription : null,
        uniqueName : "ueig",
        longerDescription : "**President of the **Unreal **Enthusiasts Interest Group for **2_years, and conducted **~10 **learning_workshops focused on **Blender and **Unreal_Engine for the **SUTD_community. Eventually I and my Exco also created a **Souls-like **third_person **sandbox **boss-fight and **VR_immersion **environment depicting **tourist_destinations, showcasing these projects both intra-school and in external events."
    },
    {
        index : 1,
        title : "University Ambassador",
        description: "Conducted **School_tours, consultant for candidates' **enquiries during **SUTD **Admissions_Interviews, and welcomed potential students during for Offer Receptions.",
        imageSource : "/images/sutd_logo.png",
        multiDescription : null,
        uniqueName : "ua",
        longerDescription : "**SUTD **University_Ambassador from **2023 until **August_2025. During my time as an ambassador, I involved myself in **more_than **20_events for **prospective_students, **parents, and **overseas_professors. I not only learnt how to present various aspects of **SUTD's **Design and **Innovation **philosophy to various **demographics, but also **value **this **institution more in terms of the **learning_opportunities it has given me, to take on my aspiration of being a **Computer_Science student **imbued with the **dynamic, **humanistic_nature that SUTD **requires of its **builders."

    },
    {
        index : 2,
        title : "Teaching Assistant, at SUTD-SST Big D Camp 2025",
        description : "Created technical **lesson **manuals, **mentored a team of 4 secondary school students from **School **of **Science and **Technology, building an **Arduino **robot controllable via **Bluetooth.",
        imageSource : "/images/sutd_bigd.png",
        multiDescription : null,
        uniqueName : "sutdbigd",
        longerDescription : "I **mentored a team of 4 secondary school students from **School **of **Science **and **Technology, to build an **Arduino_rover **robot to compete in a **mass **object_retrieval **sandbox, **populated with various items **simulating_debris needed to be cleared after a disaster. The robot was **controllable **via **bluetooth. Helped various teams **diagnose **errors and also **produced **lesson_content for setting up the **HC05 **Bluetooth **module. Personally mentored team won **Best **Team **Spirit **Award."
    }
]

const experiences : personal[] = [
    {
        index : 0,
        title : "Product Engineering Intern, Asset Development, Next Open Innovation (NCS)",
        description : "Created a **fullstack **AI-Driven **Resource_Monitoring **System to **Streamline **Baggage **Handling at **Airports via **Robotics **Autonomous_Systems. **Designed backend system and **improved **scalability with **measured **performance **metrics.",
        imageSource : "/images/ncs.png",
        multiDescription : null,
        uniqueName : "ncs",
        longerDescription: "During my 4 months at NCS as a Product Eng Intern (Asset Dev), I built a **fullstack **AI-Driven **Resource **Monitoring **System that **integrates with an existing **simulation_evironment, to showcase how **AI could be implemented to **streamline the **coordination and **selection of **robotics_systems to handle **baggages. From first **defining the **problem and later on **creating the actual fullstack system with a **modular, **cleanly **layered **software_architecture, I indeed **learnt a great deal about the entire **product_development process alongside **developing **software **systems. More in the **Projects_Section",
    },
    {
        index : 1,
        title : "DellInnovateFest 2025",
        description: "A **memorable **1-month long **hackathon hosted by **Dell_Technologies, representing SUTD ans building an **AI-powered **software_product to **address **teenage **mental **well-being in Singapore.",
        imageSource : "/images/dell_inno_1.png",
        multiDescription : null,
        uniqueName : "dellhackathon",
        longerDescription : "A memorable 1-month long hackathon hosted by Dell Technologies, **representing_SUTD as a **finalist_team, and built a software solution after weeks of heartfelt solutioning, to **alleviate the **mental_health situation amongst **teenagers in **Singapore. Worked with **Singapore **Association **for **Mental **Health **(SAMH) for **problem_definition & **emotional_journey of teenagers. Truly fruitful in building software products for the **good **of **society, through **meticulous, **heartfelt_solutioning. More in the **Projects_Section."
    }
]

// const certs : certInfo[] = [
//     {
//         title : "Kubernetes Fundamentals by Dell Technologies",
//         credentialLink : "https://www.credential.net/20183594-eae5-4c8a-8efb-43bd9e39d1d1#acc.QXurKeZ5",
//         imageSource : "/images/kubernetes_cert.png"
//     },
//     {
//         title : "Docker Fundamentals by Dell Technologies",
//         credentialLink : "https://www.credential.net/502de10a-26ac-4bdc-94b5-9f8f09262616#acc.Gf60axNS",
//         imageSource : "/images/docker_cert.png"
//     }
// ]


const education : personal[] = [
    {
        index : 0,
        title : "Year 3 Computer Science @SUTD",
        description : "Currently pursuing **Computer_Science, **Singapore **University **of **Technology **and **Design. Taking on a **minor in **AI, and also currently taking more courses in **Security **(Network and **System Security) to further **expand **my **knowledge.",
        imageSource : "/images/sutd_logo.png",
        multiDescription : null,
        uniqueName : "cssutd",
        longerDescription: null
    },
    // {
    //     index : 1,
    //     title : "Certifications",
    //     description: "My Various Certifications",
    //     imageSource: null,
    //     multiDescription : certs,
    //     uniqueName : "certs",
    //     longerDescription : null
    // }
]


export const personalQualities = {
    leadership : leadership,
    experiences : experiences,
    education : education,
}