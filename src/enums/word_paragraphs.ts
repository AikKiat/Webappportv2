import { title } from "motion/react-client"


export enum IntroTexts{
    IntroHeading = "Hello! I am Thng Aik Kiat",
    BodyParagraph = `I am an Aspiring Fullstack Developer
                    Interested in building **modular**, **scalable**, **purposeful** systems with the **right_technologies** in mind.
                    I wish to architect the design of solutions, and involve myself within the **various_stages** that span Software Development.
                    `
}

export enum ProjectNames{
    Project1 = "SmartHealth",
    Project2 = "Come Fly with Me",
    Project3 = "Pools of Possibilities",
    Project4 = "The Mathematician's Massacre",
    Project5 = "Hello"
}

export enum ProjectDescriptions{
    Project1 = "All in one HealthTech app for people in their 50s - 60s and caregivers of the elderly. Realtime food nutrient and medicinal package details analysis using Computer Vision, AI chatbot, live medical centre finder. PostgresSQL for user Data, hosted in AWS.",
    Project2 = "Fullstack Hotel Booking app as part of school project using Express and ReactJS. Data of more than 1000 hotel destinations pulled from Ascenda's API, clean layered architecture - Entities for hotel data persistence, services for business logic. Wrote more than 600 test cases for robustness. Containerised frontend and backend codes to separate Docker containers.",
    Project3 = "Life-sized Virtual Fish simulations using Computer Vision, Mediapipe Motion Gesture detection library, transferring results to control graphics simulation inside 3D Blender Environment",
    Project4 = "Fun game for learning mathematics, made using Python standard libraries and Tkinter. Focused on creating sound effects, figure and blood spatter animations, kill streak system.",
    Project5 = "Hello"
}


export interface skill {
    logo : string
    name : string
    color : string
    description : string
}

export const skills : skill[] = [
    {
        logo: "src/assets/react_black.png",
        name: "React",
        color: "#2eb6ffff",
        description: "Have been using React as the core frontend framework for my fullstack projects, such as the latest **Hotel Booking System**, **AI-Driven Resource Monitor** and this **Portfolio Website**. Learning Typescript in conjunction with how it works."
    },
    {
        logo: "src/assets/ts_black.png",
        name: "TypeScript",
        color: "#3090fdff",
        description : "Used Typescript as the frontend language for my recent fullstack **AI-Driven Resource Monitor**, as part of my **internship project**. Currently using it as the core language coupled with React, to muster coding it effectively."
    },
    {
        logo: "src/assets/js_black.png",
        name: "JavaScript",
        color: "#fff75bff",
        description : "**First** frontend language that was picked up alongside HTML and CSS fundamentals, and used it for the first **Portfolio Website** as well as the recent **Hotel Booking System** (Come Fly with me)."
    },
    {
        logo: "src/assets/python_black.png",
        name: "Python",
        color: "#edff95ff",
        description : "First coding language that I learnt, and used extensively in many projects big and small. Recently used it as the entire base for the **AI-Driven Resource Monitor**ing System during my internship, via FastAPI framework and Uvicorn. My familiarity with the syntax allowed me create and iterate quickly, following my own Sprint Timeline to ensure that quick updates were given to the team."
    },
    {
        logo: "src/assets/java_black.png",
        name: "Java",
        color:"#ff9a48ff",
        description: "Used Java in a number of projects ranging from **SmartHealth** to my own personal SpringBoot projects. Currently learning it as part of my Microservices course and SpringBoot project to create a Netflix lookalike."
    },
    {
        logo: "src/assets/html5_black.png",
        name: "HTML5",
        color:"#ff5622ff",
        description : "Learnt HTML5 start of this year to create my first web portfolio. Since then, have been using it alongside CSS in all of my fullstack projects be it personal, internship or school."
    },
    {
        logo: "src/assets/html5_black.png",
        name: "CSS",
        color: "#3654ffff",
        description : "Have used this alongside HTML5 as the key to displaying graphics on-screen. Always fascinated by the sheer variety of splendid imagery that can be created with just a stylesheet, and I enjoy exploring interesting designs in my own free time."
    },
    {
        logo: "src/assets/spring_black.png",
        name: "Spring Boot",
        color:"#00b561ff",
        description: "Used Java Spring Ecosystem as the main core of **SmartHealth**'s backend server, and am currently learning more using Spring in my personal project to create a Netflix lookalike and Microservices course."
    },
    {
        logo: "src/assets/docker_black.png",
        name: "Docker",
        color:"#488bffff",
        description : "Used Docker in a number of my recent projects, from the **Hotel Booking System**, containering the respective system components during my internship."
    },
    {
        logo: "src/assets/psql_black.png",
        name: "PostgreSQL",
        color: "#0195ffff",
        description : "Relational Database used in many projects from **SmartHealth**, to my recent Internship as well as my own personal projects."
    },
    {
        logo: "src/assets/mysql_black.png",
        name: "MySQL",
        color:"#0080ffff",
        description : "Relational Database used for my recent **Hotel Booking System** school project, and other assignments in school."
    },
    {
        logo: "src/assets/mongodb_black.png",
        name: "MongoDB",
        color:"#26bb70ff",
        description: "Document database used both in my personal projects, and school assignments."
    },
    {
        logo: "src/assets/redis_black.png",
        name: "Redis",
        color:"#ff1616ff",
        description : "Used Redis as the caching strategy for the **AI-Driven Resource Monitor** system during my recent internship, and tabulated the improvements of API response times using Prometheus and Grafana."
    },
    {
        logo: "src/assets/langchain_black.png",
        name: "LangChain",
        color:"#009b17ff",
        description : "Used **Langchain** to create the various functional, LLM nodes for the **AI-Driven Resource Monitor**, and it was very interesting to learn how to invoke the LLM with System Prompts and Human Messages."
    },
    {
        logo: "src/assets/langgraph_black.png",
        name: "LangGraph",
        color: "#009b17ff",
        description : "Used this coupled with Langchain to create the entire **thinking workflow(s)** of the **AI-Driven Resource Monitor** for my recent internship."
    },
    {
        logo: "src/assets/tigerdata_black.png",
        name: "TigerData",
        color:"#ffb71dff",
        description : "Delved into exploring this database hosting service, to create a **Time-series database** and store time-series data for the **AI-Driven Resource Monitor**, tracking the information from the simulated entities for configurable time intervals. Data was catergorised, organised and sent to the Langchain/Langgraph-powered AI Module to generate analyses."
    }
]

export interface personal{
    index : number,
    title : string,
    description : string
}

const leadership : personal[] = [
    {
        index : 0,
        title : "President, Unreal Enthusiasts Interest Group",
        description : "-Led workshops on 3D Digital Art, VR and Animation.\n-Hosted Projects during key events such as Open House."
    },
    {
        index : 1,
        title : "University Ambassador",
        description: "- Conducted School tours for visitors during Open House.\n- Consultant for candidates' enquiries during SUTD Admissions Interview.\n- Welcomed potential students during for Offer Receptions."
    }
]

const experiences : personal[] = [
    {
        index : 0,
        title : "Product Engineering Intern, Asset Development, Next Open Innovation (NCS)",
        description: "- Created a fullstack AI-Driven Resource Monitoring System to Streamline Baggage Handling at Airports via Robotics Autonomous Systems."
        
        // \n- Picked key concepts of both Product and Software Engineering, such as identifying from the broad perspective how a software solution could be applied, defining the key attributes and then delving into System Design by creating a modular, cleanly layered Solution, scalable and expandable.\n- For more info, look into the Projects Section."
    },
    {
        index : 1,
        title : "DellInnovateFest 2025 Hackathon",
        description: "- A memorable, and truly meaningful 1-month long hackathon focusing on developing a software solution to alleviate the mental health situation amongst teenagers in Singapore."
        
        
        // \n- Worked with key organisations such as Singapore Association of Mental Health (SAMH) to hone in on the key problem areas and fine-tune our target audience as well as their needs.\n - Emerged as one of the finalist teams, fruitful experience in highighting how a meticulous and sincere dendeavour to aid a demographic is truly possible with our technical expertise in Software Engineering."
    }
]

const education : personal[] = [
    {
        index : 0,
        title : "Year 3 Computer Science @SUTD",
        description : "Currently pursuing a BEngg in Computer Science, Singapore University of Technology and Design. Taking on a minor in AI, and also currently taking more courses in Security (Network and System Security) to further expand my knowledge."
    },
    {
        index : 1,
        title : "Certifications",
        description: "View my Certifications here."
    }
]

export const personalQualities = {
    leadership : leadership,
    experiences : experiences,
    education : education,
}