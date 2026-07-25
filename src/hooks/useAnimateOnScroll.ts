import React, { useEffect } from "react";
import { useIntroSectionTransitionState } from "../store/transitionStore";

interface RevealSentinels {
    infoCardsSentinel: React.RefObject<HTMLDivElement | null>;
    projectsDrawerSentinel: React.RefObject<HTMLDivElement | null>;
}



export const useAnimateOnScroll = (sentinels: RevealSentinels) => {
    useEffect(() => {
        const infoCardsMarker = sentinels.infoCardsSentinel.current;
        const drawerMarker = sentinels.projectsDrawerSentinel.current;

        const observer = new IntersectionObserver((entries) => {
            const { setPhase, revealDrawer } = useIntroSectionTransitionState.getState();
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                if (entry.target === infoCardsMarker) setPhase("opened");
                if (entry.target === drawerMarker) revealDrawer(true);
                observer.unobserve(entry.target);
            });
        });

        if (infoCardsMarker) observer.observe(infoCardsMarker);
        if (drawerMarker) observer.observe(drawerMarker);

        return () => observer.disconnect();
    }, []);
};