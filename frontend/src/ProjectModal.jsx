import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import gsap from 'gsap';
import './ProjectModal.css';

function ProjectModal({ project, onClose }) {
    const backdropRef = useRef(null);
    const panelRef = useRef(null);
    const closingRef = useRef(false);

    const closeModal = useCallback(() => {
        if (closingRef.current) return;
        closingRef.current = true;
        const animateOut = gsap.timeline({ onComplete: onClose });
        animateOut.to(panelRef.current, {
            scale: 0.92,
            y: 20,
            opacity: 0,
            duration: 0.25,
            ease: "power2.in"
        })
        .to(backdropRef.current, { opacity: 0, duration: 0.2 }, "<");
    }, [onClose]);

    useEffect(() => {
        const animateIn = gsap.timeline();
        animateIn
            .fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
            .fromTo(
                panelRef.current,
                { scale: 0.9, y: 40, opacity: 0 },
                { scale: 1, y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
                "-=0.15"
            );
        if (panelRef.current) panelRef.current.focus();

        const scroller = document.querySelector('#main-scroller');
        if (scroller) scroller.style.overflow = 'hidden';

        const handleKey = (e) => {
            if (e.key === 'Escape') closeModal();
        };
        window.addEventListener('keydown', handleKey);

        return () => {
            window.removeEventListener('keydown', handleKey);
            animateIn.kill();
            if (scroller) scroller.style.overflow = '';
        };
    }, [closeModal]);

    return createPortal(
        <div className="modal-backdrop" ref={backdropRef} onClick={closeModal}>
            <div
                className="modal-panel"
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={`${project.title} project details`}
                tabIndex={-1}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                    <span className="modal-mode">zsh // deep_dive</span>
                    <button className="modal-close" onClick={closeModal} aria-label="Close">[x]</button>
                </div>
                <h3 className="modal-title"><span className="modal-prompt">~/$</span> {project.title}</h3>
                <div className="modal-meta">
                    <span>[{project.tech}]</span>
                    <span>© {project.year}</span>
                </div>
                <p className="modal-role">ROLE: {project.role}</p>
                <p className="modal-desc">{project.desc}</p>
                {project.stack && project.stack.length > 0 && (
                    <div className="modal-stack">
                        {project.stack.map((s) => (
                            <span key={s} className="stack-chip">{s}</span>
                        ))}
                    </div>
                )}
                <div className="modal-features">
                    <h4>features/</h4>
                    <ul>
                        {project.features.map((f) => (
                            <li key={f}>{f}</li>
                        ))}
                    </ul>
                </div>
                <a className="modal-link" href={project.link} target="_blank" rel="noreferrer">[ open_link ]</a>
            </div>
        </div>,
        document.body
    );
}

export default ProjectModal;