import type React from "react";
import { useEffect, useRef, useState } from "react";

import { featuredProjects } from "../../../../constants/constants";
import type { project } from "../../../../constants/constants";
import { useTransitionStore, registerSection } from "../../../../store/transitionStore";

// The three picks head the projects section, so they can't ride the drawer's reveal
// state - that one trips further down the page. This watches its own box instead.
export default function FeaturedProjects(){

    const openProject = useTransitionStore((state) => state.openProject);

    const featuredRootRef = useRef<HTMLDivElement>(null);
    const [revealed, setRevealed] = useState<boolean>(false);

    useEffect(() => {
        const featuredRoot = featuredRootRef.current;
        if(!featuredRoot) return;

        registerSection("featuredProjects", featuredRoot);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                setRevealed(true);
                observer.unobserve(entry.target);
            });
        //fires once the strip is properly in frame rather than the instant its top edge
        //clips the fold, so the stagger is actually watched
        }, { threshold: 0.2 });

        observer.observe(featuredRoot);

        return () => {
            observer.disconnect();
            registerSection("featuredProjects", null);
        };
    }, [])

    return (
        <div className={`featured_projects ${revealed ? "revealed" : ""}`} ref={featuredRootRef}>
            <div className="featured_header">
                <span className="featured_header_label">FEATURED</span>
                <span className="featured_header_sub">The three I would want you to read first</span>
            </div>

            <div className="featured_cards">
                {featuredProjects.map((project : project, index : number) => {

                    //staggered purely through delay, so the whole strip animates off the
                    //one `revealed` class instead of a per-card timeline
                    const cardStyle : React.CSSProperties = {
                        transitionDelay: `${0.15 + index * 0.12}s`,
                    };

                    return (
                        <div
                            className="featured_card"
                            style={cardStyle}
                            key={project.uniqueIdName}
                            onClick={() => openProject(project.uniqueIdName)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " "){
                                    event.preventDefault();
                                    openProject(project.uniqueIdName);
                                }
                            }}
                            >
                            <span className="featured_rank">{`0${index + 1}`}</span>

                            <div className="featured_card_body">
                                <span className="featured_timeframe">{project.timeFrame}</span>
                                <span className="featured_name">{project.name}</span>
                                <span className="featured_desc">{project.titleDesc}</span>
                            </div>

                            {project.theme && <span className="featured_theme">{project.theme}</span>}

                            {project.techstack && (
                                <div className="featured_techstack">
                                    {project.techstack.map((tech : string, techIndex : number) => (
                                        <img
                                            src={tech}
                                            alt={`tech-${techIndex}`}
                                            key={tech}
                                            loading="lazy"
                                            decoding="async">
                                        </img>
                                    ))}
                                </div>
                            )}

                            <button
                                className="featured_view"
                                onClick={(event) => {
                                    event.stopPropagation();
                                    openProject(project.uniqueIdName);
                                }}
                                >View More
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
