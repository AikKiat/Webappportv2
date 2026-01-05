


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
                    **I** **am** **Thng** **Aik** **Kiat**, **a** **Fullstack** **Developer**.
                    I enjoy **architecting **modular**, **scalable**, and **purposeful** solutions with the **right_technologies**.
                    Having done **Digital Art**, I revel learning to create **neat**, **original** and **expandable UI**, with **CSS & frontend frameworks.
                    On top of that, exploring **Generative** **AI** **applications** to **supercharge** my projects is also a core interest of mine.
                    Aside from work, I spend my time **building **model kits**, **Warhammer 40000**, and exercising.
                    `,
    specialisations : ["Fullstack Developer", "Computer Science@SUTD", "Minor in AI"],
    github : "https://github.com/AikKiat",
    resume : "https://drive.google.com/file/d/164xuWTaenDnp6rjFlRiM8_Vhad2plAUH/view?usp=drive_link",
    linkedin : "https://www.linkedin.com/in/thng-aik-kiat-535a2732a/",
    githubIcon : "src/assets/icons/github.png",
    linkedinIcon : "src/assets/icons/linkedin.png"
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
    githubLink : string | null
}

export const projects : project[] = [
    {
        name : "AI-Driven Resource Monitor Project (Internship @NCS NEXT)",
        description: "An AI-Driven Fullstack Web Application built from a modular monolithic Python Fast API backend, with a React TS Frontend client. Created to interface with a greater legacy simulation system, that mimics how fleets of robots could be delegated to handle baggage handling at airports. Agentic capabilities stem from the AI-Driven system being able to actively detect changes purported from the simulation, provide recommendations, and automatically populate the simulation environment with the more optimised environment scenario.",
        imageSource : "src/assets/images/aidrm.png",
        videoSource : null,
        imageCollage : null,
        videoCollage :null,
        longerDescription : "Longer DESC HERE",
        uniqueIdName : "aidrm",
        techstack : ["src/assets/icons/redis.png", "src/assets/icons/docker.png", "src/assets/icons/python.png", "src/assets/icons/ts.png", "src/assets/icons/react.png","src/assets/icons/psql.png", "src/assets/icons/tigerdata.png", "src/assets/icons/prometheus.png", "src/assets/icons/grafana.png", "src/assets/icons/langchain.png", "src/assets/icons/langgraph.png"],
        githubLink : null
    },
    {
        name : "T.A.L.L",
        description : "A fullstack android app embodying our research into guided journaling and indentity building, made to empower the lives of teenagers and better their mental wellbeing. Conceptualised for DellInnovateFest 2025, the Hackathon with a Heart by Dell Technologies aimed at utilising technology for social good.",
        imageSource : "src/assets/images/tall.png",
        videoSource : "",
        imageCollage : ["src/assets/images/tall.png", "src/assets/images/dell_inno_1.png", "src/assets/images/dell_inno_2.png"],
        videoCollage : null,
        longerDescription : " Made using Kotlin, running on a modular monolithic Node.js backend server connected to a PostgreSQL database, with an-inbuilt Python Webscraper and using an AI LLM to generate unique profile images tailored towards the details of user's personal entries, constructing and visualising the unique lifestory they can build.",
        uniqueIdName : "tall",
        techstack : ["src/assets/icons/js.png", "src/assets/icons/python.png", "src/assets/icons/kt.png", "src/assets/icons/openshift.png", "src/assets/icons/androidstudio.png"],
        githubLink : null
    },
    {
        name : "Come Fly with Me",
        description : "Fullstack Hotel Booking app as part of school project using Express and ReactJS. Data of more than 1000 hotel destinations pulled from Ascenda's API, clean layered architecture - Entities for hotel data persistence, services for business logic. Wrote more than 600 test cases for robustness. Containerised frontend and backend codes to separate Docker containers.",
        imageSource : "src/assets/images/ascenda_5.png",
        videoSource : "",
        imageCollage : ["src/assets/images/ascenda_1.png", "src/assets/images/ascenda_2.png", "src/assets/images/ascenda_3.png", "src/assets/images/ascenda_4.png", "src/assets/images/ascenda_5.png"],
        videoCollage : null,
        longerDescription : "",
        uniqueIdName : "hotelapp",
        techstack : ["src/assets/icons/docker.png", "src/assets/icons/js.png", "src/assets/icons/react.png", "src/assets/icons/mysql.png", "src/assets/icons/cypress.png"],
        githubLink : "https://github.com/AndrewLJY/ESCWebApp"
    },
    {
        name : "SmartHealth",
        description : "All in one HealthTech app for people in their 50s - 60s and caregivers of the elderly. Realtime food nutrient and medicinal package details analysis using Computer Vision, AI chatbot, live medical centre finder. PostgresSQL for user Data, hosted in AWS.",
        imageSource : "src/assets/images/smarthealth_2d_poster.png",
        videoSource : "",
        imageCollage : ["src/assets/images/smarthealth_2d_poster.png", "src/assets/images/smarthealth_award.png", "src/assets/images/smarthealth_physicalposter.png"],
        videoCollage : null,
        longerDescription : "Android App created as Part of 50.001 Informations Systems and Programming Course. Created using Java in Android Studio, and used Java Spring as the backend framework. User data stored in a PostGreSQL database, hosted on AWS. REST APIs for standardised clear communication standard between the client and backend, and RESTful APIs include Google Places, Routes API, Open AI GPT4.0 Api. We also hosted this backend on a free server space platform called Render, allowing the backend service of our app to be running 24/7. A step towards increased efficacy in deployment, and allowing our backend service to scale to larger platforms in the future.",
        uniqueIdName : "smarthealth",
        techstack : ["src/assets/icons/java.png", "src/assets/icons/spring.png", "src/assets/icons/aws.png","src/assets/icons/androidstudio.png"],
        githubLink : "https://github.com/ItsMeOX/SmartHealth"
    },
    {
        name : "Portfolio V1",
        description : "My first web portfolio from Mar 2025, built using vanilla HTML, CSS and a Javascript file for logic",
        imageSource : "",
        videoSource : "",
        imageCollage : ["src/assets/images/portfoliov1_1.png", "src/assets/images/portfoliov1_2.png","src/assets/images/portfoliov1_3.png" ],
        videoCollage : null,
        longerDescription : "My first web portfolio, and also my first project using HTML, CSS and Javascript. Made in Feb 2025.",
        uniqueIdName : "pv1",
        techstack : ["src/assets/icons/HTML.png", "src/assets/icons/CSS.png", "src/assets/icons/js.png" ],
        githubLink : "https://github.com/AikKiat/webappport"
    }
]


export interface skill {
    logo : string
    name : string
    color : string
}

export const skills : skill[] = [
    {
        logo: "src/assets/icons/react_black.png",
        name: "React",
        color: "#2eb6ffff",
    },
    {
        logo: "src/assets/icons/ts_black.png",
        name: "TypeScript",
        color: "#3090fdff",
    },
    {
        logo: "src/assets/icons/js_black.png",
        name: "JavaScript",
        color: "#fff75bff",
    },
    {
        logo: "src/assets/icons/python_black.png",
        name: "Python",
        color: "#edff95ff",
    },
    {
        logo: "src/assets/icons/java_black.png",
        name: "Java",
        color:"#ff9a48ff",
    },
    {
        logo: "src/assets/icons/kt_black.png",
        name: "Kotlin",
        color:"#c130ffff",
    },
    {
        logo: "src/assets/icons/html5_black.png",
        name: "HTML5",
        color:"#ff5622ff",
    },
    {
        logo: "src/assets/icons/html5_black.png",
        name: "CSS",
        color: "#3654ffff",
    },
    {
        logo: "src/assets/icons/spring_black.png",
        name: "Spring Boot",
        color:"#00b561ff",
    },
    {
        logo: "src/assets/icons/docker_black.png",
        name: "Docker",
        color:"#488bffff",
    },
    {
        logo: "src/assets/icons/k8s_black.png",
        name: "Kubernetes",
        color:"#488bffff",
    },
    {
        logo: "src/assets/icons/psql_black.png",
        name: "PostgreSQL",
        color: "#0195ffff",
    },
    {
        logo: "src/assets/icons/mysql_black.png",
        name: "MySQL",
        color:"#0080ffff",
    },
    {
        logo: "src/assets/icons/mongodb_black.png",
        name: "MongoDB",
        color:"#26bb70ff",
    },
    {
        logo: "src/assets/icons/redis_black.png",
        name: "Redis",
        color:"#ff1616ff",
    },
    {
        logo: "src/assets/icons/tigerdata_black.png",
        name: "TigerData",
        color:"#ffb71dff",
    },
    {
        logo: "src/assets/icons/openshift_black.png",
        name: "Openshift",
        color:"#ff1d34ff",
    },
    {
        logo: "src/assets/icons/aws_black.png",
        name: "AWS (S3)",
        color:"#ffae0dff",
    },
    {
        logo: "src/assets/icons/prometheus_black.png",
        name: "Prometheus",
        color:"#ff450dff",
    },
    {
        logo: "src/assets/icons/grafana_black.png",
        name: "Grafana",
        color:"#ff9900ff",
    },
    {
        logo: "src/assets/icons/langchain_black.png",
        name: "LangChain",
        color:"#009b17ff",
    },
    {
        logo: "src/assets/icons/langgraph_black.png",
        name: "LangGraph",
        color: "#009b17ff",
    },
    {
        logo: "src/assets/icons/pandas_black.png",
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
        description : "Led workshops on 3D Digital Art, VR and Animation.\n-Hosted Projects during key events such as Open House.",
        imageSource : "src/assets/images/ue.png",
        multiDescription : null,
        uniqueName : "ueig",
        longerDescription : "President of the Unreal Enthusiasts Interest Group for 2 years, and conducted no less than numerous learning workshops focused on Blender and Unreal Engine for the SUTD community. Eventually I and my Exco also created a Souls-like third person sandbox boss-fight and VR immersion environment depicting various tourist destinations, showcasing these projects both intra-school and in external events."
    },
    {
        index : 1,
        title : "University Ambassador",
        description: "Conducted School tours, consultant for candidates' enquiries during SUTD Admissions Interviews, and welcomed potential students during for Offer Receptions.",
        imageSource : "src/assets/images/sutd_logo.png",
        multiDescription : null,
        uniqueName : "ua",
        longerDescription : "SUTD University Ambassadors Program in 2023 until August 2025. During my time as an ambassador, I involved myself in more than 20 events for prospective students, parents, and even some overseas professors. I not only learnt how to present various aspects of SUTD's Design and Innovation Philosophy across various demographics, but also value this institution more in terms of the learning opportunities it has given me, to take on my aspiration of being a Computer Science Student imbued with the dynamic, humanistic nature that SUTD requires of its builders."

    },
    {
        index : 2,
        title : "Teaching Assistant, at SUTD-SST Big D Camp 2025",
        description : "Created technical lesson manuals, mentored a team of 4 secondary school students from School of Science and Technology, building an Arduino robot controllable via Bluetooth.",
        imageSource : "src/assets/images/sutd_bigd.png",
        multiDescription : null,
        uniqueName : "sutdbigd",
        longerDescription : "I mentored a team of 4 secondary school students from School of Science and Technology, to build an Arduino rover robot to compete in a mass object retrieval sandbox, populated with various items simulating debris needed to be cleared after a disaster. The robot was controllable via Bluetooth. Helped various teams diagnose errors and also produced lesson content  for setting up the HC05 Bluetooth module. Personally mentored team won Best Team Spirit Award."
    }
]

const experiences : personal[] = [
    {
        index : 0,
        title : "Product Engineering Intern, Asset Development, Next Open Innovation (NCS)",
        description : "Created a fullstack AI-Driven Resource Monitoring System to Streamline Baggage Handling at Airports via Robotics Autonomous Systems. Designed backend system and improved scalability with measured performance metrics.",
        imageSource : "src/assets/images/ncs.png",
        multiDescription : null,
        uniqueName : "ncs",
        longerDescription: "During my 4 months at NCS as a Product Eng Intern (Asset Dev), I built a fullstack AI-Driven Resource Monitoring System that integrates with an existing legacy simulation evironment, to showcase how AI could be implemented to streamline the coordination and selection of robotics systems to handle baggage handling. From first defining the problem and later on creating the actual fullstack system with a modular, cleanly layered software architecture, I indeed learnt a great deal about the entire product development process alongside software development.",
    },
    {
        index : 1,
        title : "DellInnovateFest 2025",
        description: "A memorable 1-month long hackathon hosted by Dell Technologies, representing SUTD as a finalist team, and built a software solution after weeks of heartfelt solutioning, to alleviate the mental health situation amongst teenagers in Singapore.",
        imageSource : "src/assets/images/dell_inno_1.png",
        multiDescription : null,
        uniqueName : "dellhackathon",
        longerDescription : "A memorable 1-month long hackathon hosted by Dell Technologies, representing SUTD as a finalist team, and built a software solution after weeks of heartfelt solutioning, to alleviate the mental health situation amongst teenagers in Singapore. Worked with Singapore Association of Mental Health (SAMH) for problem definition & emotional journey of teenagers. Truly fruitful in building software products for the good of society, through meticulous, heartfelt solutioning."
    }
]

// const certs : certInfo[] = [
//     {
//         title : "Kubernetes Fundamentals by Dell Technologies",
//         credentialLink : "https://www.credential.net/20183594-eae5-4c8a-8efb-43bd9e39d1d1#acc.QXurKeZ5",
//         imageSource : "src/assets/images/kubernetes_cert.png"
//     },
//     {
//         title : "Docker Fundamentals by Dell Technologies",
//         credentialLink : "https://www.credential.net/502de10a-26ac-4bdc-94b5-9f8f09262616#acc.Gf60axNS",
//         imageSource : "src/assets/images/docker_cert.png"
//     }
// ]


const education : personal[] = [
    {
        index : 0,
        title : "Year 3 Computer Science @SUTD",
        description : "Currently pursuing a BEngg in Computer Science, Singapore University of Technology and Design. Taking on a minor in AI, and also currently taking more courses in Security (Network and System Security) to further expand my knowledge.",
        imageSource : "src/assets/images/sutd_logo.png",
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