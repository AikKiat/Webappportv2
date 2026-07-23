import { lazy, Suspense, useState } from "react";
import github_icon from "/icons/github.png";

// Lazy so react-markdown and the .md content ship in their own chunk instead
// of the initial bundle - this only renders once a project modal is opened.
const ProjectMarkdownViewer = lazy(() => import("./ProjectMarkdownViewer"));

interface ProjectInformationProps {
  uniqueIdName: string;
  projectImage: string;
  projectName: string;
  projectLongerDescription: string;
  videoSource: string | null;
  imageCollage: string[] | null;
  videoCollage: string[] | null;
  techstack: string[] | null;
  githubLink: string | null;
  isPastSelectedProject: boolean;
  closeFromProjectCardCurrentVal: number;
  checkItOutLinks : string[] | null;
  checkItOutMsgs : string[] | null;
  handleClose : () => void;
}

export default function ProjectInformation(props: ProjectInformationProps) {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

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

      <button className="close-btn" onClick={props.handleClose}>✕</button>
      
      {mediaItems.length > 0 && (
        <div className="media-container">
          <button className="expand-btn" onClick={() => setIsExpanded(true)} title="Expand">⛶</button>
          {mediaItems.length > 1 && <button className="prev-btn" onClick={handlePrev}>{"<"}</button>}
          <div className="media-display">
            {currentMedia.startsWith("htt") ? (
              <iframe src={currentMedia} title="project-video" />
            ) : (
              <img src={currentMedia} alt="project-media" loading="lazy" decoding="async" />
            )}
          </div>
          {mediaItems.length > 1 && <button className="next-btn" onClick={handleNext}>{">"}</button>}
        </div>
      )}

      {isExpanded && (
        <div className="media-modal-overlay" onClick={() => setIsExpanded(false)}>
          <div className="media-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setIsExpanded(false)}>✕</button>
            {currentMedia.startsWith("htt") ? (
              <iframe src={currentMedia} title="project-video-expanded" />
            ) : (
              <img src={currentMedia} alt="project-media-expanded" />
            )}
          </div>
        </div>
      )}

      <div className="text-container">
        <h2 className="title">{props.projectName}</h2>
        <Suspense fallback={null}>
          <ProjectMarkdownViewer uniqueIdName={props.uniqueIdName} />
        </Suspense>
        {props.checkItOutLinks && props.checkItOutMsgs && (
          <div>
            {
              props.checkItOutLinks.map((link : string, index : number) =>{
                return (
                  <>
                  <a
                    href={`${link}`}
                    className="check-it-out"
                    target="_blank"
                    rel="noopener noreferrer">
                      {`${props.checkItOutMsgs![index]}`}
                  </a>
                  <br></br>
                  </>
                )
              })
            }
          </div>
        )}
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
            <img src={tech} alt={`tech-${index}`} key={index} loading="lazy" decoding="async" />
          ))}
        </div>
      )}
    </div>
  );
}
