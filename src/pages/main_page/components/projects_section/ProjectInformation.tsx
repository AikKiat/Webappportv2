import { useState } from "react";
import GlowingText from "../info_section/GlowingText";
import github_icon from "/icons/github.png";

interface ProjectInformationProps {
  uniqueIdName: string;
  projectImage: string;
  projectName: string;
  projectDescription: string;
  projectLongerDescription: string;
  videoSource: string | null;
  imageCollage: string[] | null;
  videoCollage: string[] | null;
  techstack: string[] | null;
  githubLink: string | null;
  isPastSelectedProject: boolean;
  closeFromProjectCardCurrentVal: number;
}

export default function ProjectInformation(props: ProjectInformationProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const mediaItems: string[] = [
    ...(props.imageCollage || []),
    ...(props.videoCollage || []),
  ];

  const handleNext = () => {
    if (mediaItems.length === 0) return;
    setCurrentMediaIndex((prev) => (prev + 1) % mediaItems.length);
  };

  const handlePrev = () => {
    if (mediaItems.length === 0) return;
    setCurrentMediaIndex(
      (prev) => (prev - 1 + mediaItems.length) % mediaItems.length
    );
  };

  const currentMedia = mediaItems[currentMediaIndex];

  return (
    <div className={`project-card ${props.uniqueIdName}`}>
      {mediaItems.length > 0 && (
        <div className="media-container">
          {mediaItems.length > 1 && <button className="prev-btn" onClick={handlePrev}>{"<"}</button>}
          <div className="media-display">
            {currentMedia.startsWith("htt") ? (
              <iframe src={currentMedia} title="project-video" />
            ) : (
              <img src={currentMedia} alt="project-media" />
            )}
          </div>
          {mediaItems.length > 1 && <button className="next-btn" onClick={handleNext}>{">"}</button>}
        </div>
      )}

      <div className="text-container">
        <h2 className="title">{props.projectName}</h2>
        <GlowingText text={props.projectDescription} />
        {props.uniqueIdName === "pv1" && (
          <a
            href="https://aikkiat.github.io/webappport/"
            className="check-it-out"
            target="_blank"
            rel="noopener noreferrer"
          >
            Check it out here!
          </a>
        )}
        {
          props.uniqueIdName === "aidrm" && (
            <a
              href="https://github.com/AikKiat/learning/blob/main/learning/designing_chat_system.md"
              className="check-it-out"
              target="_blank"
              rel="noopener noreferrer">
                More info on my personal documentation!
            </a>
          )
        }
      </div>

      {props.githubLink && (
        <div className="github-container">
          <a href={props.githubLink} target="_blank" rel="noopener noreferrer">
            Github Link
          </a>
          <img src={github_icon} alt="Github" />
        </div>
      )}

      {props.techstack && (
        <div className="techstack-container">
          {props.techstack.map((tech, index) => (
            <img src={tech} alt={`tech-${index}`} key={index} />
          ))}
        </div>
      )}
    </div>
  );
}
