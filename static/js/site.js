
        /* =====================================================
           PROJECT CONTENT DATA LAYER
           -----------------------------------------------------
           Visible project markup/classes stay exactly the same.

           Source of truth:
             static/data/projects.json

           Safety:
           - current two projects are embedded as a known-good fallback;
           - invalid/missing JSON never blanks the Projects page;
           - all editable text is HTML-escaped before rendering;
           - only published projects are rendered;
           - project numbering follows display order automatically.
           ===================================================== */

        const PROJECTS_FALLBACK_DATA = [
    {
        "slug": "code-evryma",
        "published": true,
        "order": 1,
        "title": "Code Evryma",
        "subtitle": "Built for the field. Designed for discovery.",
        "status": "Featured Project",
        "downloadText": "Coming Soon",
        "downloadUrl": "",
        "showDesktopDownload": true,
        "desktopDownloadText": "Coming soon",
        "heroImage": "static/images/code-evryma-preview-2.png",
        "heroAlt": "Code Evryma field intelligence project preview",
        "overview": "Code Evryma is an AI-powered field intelligence system that helps metal detectorists interpret signals, understand ground conditions, and capture real-time discovery data.",
        "helps": "Signal reading, target context, depth awareness, and ground behaviour — all delivered in real time through a connected set of smart tools.",
        "matters": "Smarter decisions in the field. Less guesswork. Organised discovery data that builds knowledge, supports analysis, and elevates every hunt.",
        "desktopIntro": "Code Evryma brings AI-powered field intelligence to metal detecting — helping users interpret detector signals, understand ground conditions, and work with real-time field data through a powerful set of connected tools.",
        "desktopExtra": "The project is designed for people who need clearer decisions in the field: signal reading, target context, depth awareness, ground behaviour, and organised discovery data brought together into one practical digital experience.",
        "previewAriaLabel": "Code Evryma project preview",
        "previewBaseImage": "static/images/code-evryma-preview-1.png",
        "previewBaseAlt": "Code Evryma field intelligence preview, marble style",
        "previewTopImage": "static/images/code-evryma-preview-2.png",
        "previewTopAlt": "Code Evryma field intelligence preview, blue sky style"
    },
    {
        "slug": "visual-pathway-analysis",
        "published": true,
        "order": 2,
        "title": "Visual Pathway Analysis",
        "subtitle": "Mapping the brain's visual system with precision and purpose.",
        "status": "In Development",
        "downloadText": "Coming Soon",
        "downloadUrl": "",
        "showDesktopDownload": false,
        "desktopDownloadText": "",
        "heroImage": "static/images/visual-pathway-preview-2.png",
        "heroAlt": "Visual Pathway Analysis biomedical project preview",
        "overview": "Visual Pathway Analysis is an AI-powered imaging platform that helps clinicians and researchers visualize and interpret the complex networks of the human visual system.",
        "helps": "Advanced tractography, anatomical modeling, and machine learning bring deeper insight into optic pathways for clinical and research work.",
        "matters": "Clearer pathway insight can support earlier diagnosis, better treatment planning, and deeper understanding of the human visual system.",
        "desktopIntro": "Visual Pathway Analysis is an AI-powered imaging platform that helps clinicians and researchers visualize and interpret the complex networks of the human visual system.",
        "desktopExtra": "By combining advanced tractography, anatomical modeling, and machine learning, the project delivers deeper insight into optic pathways — supporting earlier diagnosis, better treatment planning, and deeper understanding.",
        "previewAriaLabel": "Visual pathway biomedical project preview",
        "previewBaseImage": "static/images/visual-pathway-preview-1.png",
        "previewBaseAlt": "Biomedical visual nervous system preview, marble style",
        "previewTopImage": "static/images/visual-pathway-preview-2.png",
        "previewTopAlt": "Biomedical visual nervous system preview, full colour style"
    }
];

        function escapeProjectHtml(value) {
            return String(value ?? "")
                .replaceAll("&", "&amp;")
                .replaceAll("<", "&lt;")
                .replaceAll(">", "&gt;")
                .replaceAll('"', "&quot;")
                .replaceAll("'", "&#39;");
        }

        function normalizeProjectsData(payload) {
            const rawProjects = Array.isArray(payload)
                ? payload
                : payload && Array.isArray(payload.projects)
                    ? payload.projects
                    : [];

            return rawProjects
                .filter((project) => project && project.published !== false)
                .map((project, index) => ({
                    slug: String(project.slug || `project-${index + 1}`),
                    order: Number.isFinite(Number(project.order))
                        ? Number(project.order)
                        : index + 1,
                    title: String(project.title || ""),
                    subtitle: String(project.subtitle || ""),
                    status: String(project.status || ""),
                    downloadText: String(project.downloadText || "Coming Soon"),
                    downloadUrl: String(project.downloadUrl || ""),
                    showDesktopDownload: project.showDesktopDownload === true,
                    desktopDownloadText: String(
                        project.desktopDownloadText || project.downloadText || "Coming Soon"
                    ),
                    heroImage: String(project.heroImage || ""),
                    heroAlt: String(project.heroAlt || ""),
                    overview: String(project.overview || ""),
                    helps: String(project.helps || ""),
                    matters: String(project.matters || ""),
                    desktopIntro: String(project.desktopIntro || ""),
                    desktopExtra: String(project.desktopExtra || ""),
                    previewAriaLabel: String(project.previewAriaLabel || ""),
                    previewBaseImage: String(project.previewBaseImage || ""),
                    previewBaseAlt: String(project.previewBaseAlt || ""),
                    previewTopImage: String(project.previewTopImage || ""),
                    previewTopAlt: String(project.previewTopAlt || "")
                }))
                .filter((project) =>
                    project.title &&
                    project.subtitle &&
                    project.heroImage &&
                    project.overview &&
                    project.helps &&
                    project.matters
                )
                .sort((a, b) => a.order - b.order);
        }

        function safeProjectDownloadUrl(value) {
            const url = String(value || "").trim();

            if (!url) {
                return "";
            }

            if (!/^https:\/\/[^\s]+$/i.test(url)) {
                return "";
            }

            return url;
        }

        const PROJECT_ICON_OVERVIEW = `
            <svg viewBox="0 0 48 48" fill="none">
                <rect x="11" y="11" width="11" height="11" stroke="currentColor" stroke-width="1.7"/>
                <rect x="15" y="15" width="3" height="3" fill="currentColor"/>
                <rect x="27" y="11" width="10" height="10" stroke="currentColor" stroke-width="1.7"/>
                <rect x="30" y="14" width="4" height="4" fill="currentColor"/>
                <rect x="11" y="27" width="11" height="10" stroke="currentColor" stroke-width="1.7"/>
                <rect x="15" y="30" width="3" height="4" fill="currentColor"/>
                <path d="M27 27h4v4h-4zM34 27h4v4h-4zM27 34h4v4h-4zM34 34h4" stroke="currentColor" stroke-width="1.7"/>
            </svg>
        `;

        const PROJECT_ICON_HELPS = `
            <svg viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="12" stroke="currentColor" stroke-width="1.7"/>
                <circle cx="24" cy="24" r="4" stroke="currentColor" stroke-width="1.7"/>
                <path d="M24 5v10M24 33v10M5 24h10M33 24h10" stroke="currentColor" stroke-width="1.7"/>
            </svg>
        `;

        const PROJECT_ICON_MATTERS = `
            <svg viewBox="0 0 48 48" fill="none">
                <ellipse cx="24" cy="13" rx="12" ry="5" stroke="currentColor" stroke-width="1.7"/>
                <path d="M12 13v20c0 2.8 5.4 5 12 5s12-2.2 12-5V13" stroke="currentColor" stroke-width="1.7"/>
                <path d="M12 23c0 2.8 5.4 5 12 5s12-2.2 12-5M12 33c0 2.8 5.4 5 12 5s12-2.2 12-5" stroke="currentColor" stroke-width="1.7"/>
            </svg>
        `;

        const PROJECT_ICON_STATUS = `
            <svg viewBox="0 0 48 48" fill="none">
                <path d="m24 9 4.4 8.9 9.8 1.4-7.1 6.9 1.7 9.8L24 31.4 15.2 36l1.7-9.8-7.1-6.9 9.8-1.4L24 9Z" stroke="currentColor" stroke-width="1.7"/>
            </svg>
        `;

        const PROJECT_ICON_DOWNLOAD = `
            <svg viewBox="0 0 48 48" fill="none">
                <path d="M24 9v21M17 23l7 7 7-7M13 37h22" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        function renderMobileProjectFact(title, text, iconMarkup) {
            return `
                <div class="mobile-project-fact">
                    <div class="mobile-project-fact-icon" aria-hidden="true">
                        ${iconMarkup}
                    </div>

                    <div class="mobile-project-fact-copy">
                        <h4><span class="mobile-project-dot" aria-hidden="true"></span>${escapeProjectHtml(title)}</h4>
                        <p>${escapeProjectHtml(text)}</p>
                    </div>
                </div>
            `;
        }

        function renderProjectSlide(project, displayIndex) {
            const number = String(displayIndex + 1).padStart(2, "0");

            const title = escapeProjectHtml(project.title);
            const subtitle = escapeProjectHtml(project.subtitle);
            const status = escapeProjectHtml(project.status);
            const downloadText = escapeProjectHtml(project.downloadText);
            const desktopDownloadText = escapeProjectHtml(project.desktopDownloadText);

            const downloadUrl = safeProjectDownloadUrl(project.downloadUrl);
            const escapedDownloadUrl = escapeProjectHtml(downloadUrl);

            const desktopDownload = project.showDesktopDownload
                ? downloadUrl
                    ? `
                        <a
                            class="project-link"
                            href="${escapedDownloadUrl}"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="${title} app download link"
                        >
                            App download link: ${desktopDownloadText}
                        </a>
                    `
                    : `
                        <a class="project-link" aria-label="${title} app download link">
                            App download link: ${desktopDownloadText}
                        </a>
                    `
                : "";

            return `
                <article class="project-card project-slide" data-project-slug="${escapeProjectHtml(project.slug)}">
                    <div class="mobile-project-reference">
                        <div class="mobile-project-hero">
                            <img
                                src="${escapeProjectHtml(project.heroImage)}"
                                alt="${escapeProjectHtml(project.heroAlt)}">
                        </div>

                        <div class="mobile-project-heading">
                            <button
                                type="button"
                                class="mobile-project-inline-next"
                                data-mobile-project-next
                                aria-label="Next project"
                            >→</button>

                            <p class="mobile-project-number">Project ${number}</p>
                            <h3>${title}</h3>
                            <span class="mobile-project-title-rule" aria-hidden="true"></span>
                            <p class="mobile-project-tagline">${subtitle}</p>
                        </div>

                        <section class="mobile-project-facts" aria-label="${title} overview">
                            ${renderMobileProjectFact("Overview", project.overview, PROJECT_ICON_OVERVIEW)}
                            ${renderMobileProjectFact("What It Helps With", project.helps, PROJECT_ICON_HELPS)}
                            ${renderMobileProjectFact("Why It Matters", project.matters, PROJECT_ICON_MATTERS)}
                        </section>

                        <section class="mobile-project-meta" aria-label="Project status and download">
                            <div class="mobile-project-meta-item">
                                <div class="mobile-project-meta-icon" aria-hidden="true">
                                    ${PROJECT_ICON_STATUS}
                                </div>
                                <div>
                                    <span class="mobile-project-meta-label">Status:</span>
                                    <strong>${status}</strong>
                                </div>
                            </div>

                            <div class="mobile-project-meta-item">
                                <div class="mobile-project-meta-icon" aria-hidden="true">
                                    ${PROJECT_ICON_DOWNLOAD}
                                </div>
                                <div>
                                    <span class="mobile-project-meta-label">Download:</span>
                                    <strong>${downloadText}</strong>
                                </div>
                            </div>
                        </section>

                        <footer class="mobile-project-footer">
                            <span class="mobile-project-footer-line" aria-hidden="true"></span>
                            <p>© 2026 EVANØESIS. All rights reserved.</p>
                            <span class="mobile-project-footer-line" aria-hidden="true"></span>
                        </footer>
                    </div>

                    <div class="project-meta-column" aria-hidden="true">
                        <span>Project</span>
                        <strong>${number}</strong>
                    </div>

                    <div class="project-copy-pane">
                        <p class="project-stage">${status}</p>

                        <h3>${title}</h3>

                        <p class="project-subtitle">${subtitle}</p>

                        <div class="project-ornament" aria-hidden="true"></div>

                        <p class="body-text">
                            ${escapeProjectHtml(project.desktopIntro)}
                        </p>

                        <p class="body-text project-extra">
                            ${escapeProjectHtml(project.desktopExtra)}
                        </p>

                        <p class="project-status">
                            Status: ${status}
                        </p>

                        ${desktopDownload}
                    </div>

                    <div class="project-visual-pane">
                        <div class="project-preview-slider" aria-label="${escapeProjectHtml(project.previewAriaLabel)}">
                            <img
                                class="project-preview-image project-preview-base"
                                src="${escapeProjectHtml(project.previewBaseImage)}"
                                alt="${escapeProjectHtml(project.previewBaseAlt)}">

                            <img
                                class="project-preview-image project-preview-top"
                                src="${escapeProjectHtml(project.previewTopImage)}"
                                alt="${escapeProjectHtml(project.previewTopAlt)}">
                        </div>
                    </div>
                </article>
            `;
        }

        function renderProjects(projectsInput) {
            const projects = normalizeProjectsData(projectsInput);

            if (!projects.length) {
                return "";
            }

            return `
                <h2>Projects</h2>

                <div class="project-slider" data-project-slider>
                    <div class="project-slider-window" data-project-window>
                        <div class="project-slider-track" data-project-track>
                            ${projects.map(renderProjectSlide).join("")}
                        </div>
                    </div>

                    <div class="project-slider-controls" aria-label="Project slider controls">
                        <button type="button" class="project-arrow" data-project-prev aria-label="Previous project">←</button>
                        <span class="project-counter" data-project-counter>1 / ${projects.length}</span>
                        <button type="button" class="project-arrow" data-project-next aria-label="Next project">→</button>
                    </div>
                </div>
            `;
        }

        let projectsData = normalizeProjectsData(PROJECTS_FALLBACK_DATA);

        const content = {
            home: `
                <h1 class="brand-title">EVANØESIS<span>TM</span></h1>

                <p class="tagline">
                    From vision to working reality.
                </p>

                <p class="body-text">
                    EVANØESIS transforms meaningful ideas into practical digital projects —
                    built with purpose, care, and a belief in technology that serves people.
                </p>
            `,

            projects: renderProjects(projectsData),

            about: `
                <!-- MOBILE ONLY: What We Do reference composition.
                     Desktop continues to use the existing about slider below. -->
                <article class="mobile-about-reference mobile-about-page is-mobile-about-active" aria-label="What EVANOESIS does — page 1">

                    <div class="mobile-about-hero">
                        <img
                            src="static/images/what-we-do-mobile-hero.png"
                            alt="EVANOESIS What We Do — digital project studio workspace">
                    </div>

                    <section class="mobile-about-cards" aria-label="What EVANOESIS does">

                        <article class="mobile-about-card">
                            <div class="mobile-about-icon" aria-hidden="true">
                                <svg viewBox="0 0 64 64" fill="none">
                                    <path d="M16 23 32 14l16 9v18L32 50 16 41V23Z" stroke="currentColor" stroke-width="1.7"/>
                                    <path d="m16 23 16 10 16-10M32 33v17" stroke="currentColor" stroke-width="1.7"/>
                                    <path d="M23 19.5 39 29" stroke="currentColor" stroke-width="1.2" stroke-dasharray="3 3"/>
                                </svg>
                            </div>

                            <div class="mobile-about-card-copy">
                                <span class="mobile-about-number">01</span>
                                <h3>Independent digital<br>project studio</h3>
                                <p>
                                    We are an independent digital project studio that turns meaningful ideas
                                    into practical technology projects with real impact.
                                </p>
                            </div>

                            <span class="mobile-about-plus" aria-hidden="true">＋</span>
                        </article>

                        <article class="mobile-about-card">
                            <div class="mobile-about-icon" aria-hidden="true">
                                <svg viewBox="0 0 64 64" fill="none">
                                    <circle cx="19" cy="48" r="4" stroke="currentColor" stroke-width="1.7"/>
                                    <path d="M23 48h9c7 0 9-4 9-9s-3-8-9-8H21c-5 0-8-3-8-7s3-7 8-7h22" stroke="currentColor" stroke-width="1.7" stroke-dasharray="4 3"/>
                                    <path d="M42 12v18" stroke="currentColor" stroke-width="1.7"/>
                                    <path d="M42 12h11l-4 5 4 5H42" fill="currentColor"/>
                                </svg>
                            </div>

                            <div class="mobile-about-card-copy">
                                <span class="mobile-about-number">02</span>
                                <h3>From concept to<br>working reality</h3>
                                <p>
                                    We develop focused digital products from early concept to working reality,
                                    combining research, design, software, and applied AI where it creates real value.
                                </p>
                            </div>

                            <span class="mobile-about-plus" aria-hidden="true">＋</span>
                        </article>

                        <article class="mobile-about-card">
                            <div class="mobile-about-icon" aria-hidden="true">
                                <svg viewBox="0 0 64 64" fill="none">
                                    <path d="M32 49 16.5 33.7C9.8 27 14.2 16 23.2 16c4.2 0 7 2.2 8.8 5 1.8-2.8 4.6-5 8.8-5 9 0 13.4 11 6.7 17.7L32 49Z" stroke="currentColor" stroke-width="1.7"/>
                                </svg>
                            </div>

                            <div class="mobile-about-card-copy">
                                <span class="mobile-about-number">03</span>
                                <h3>Purpose, clarity,<br>and care</h3>
                                <p>
                                    Every project begins with a problem worth solving and moves toward a useful tool
                                    that people can understand, trust, and use.
                                </p>
                            </div>

                            <span class="mobile-about-plus" aria-hidden="true">＋</span>
                        </article>

                        <article class="mobile-about-card">
                            <div class="mobile-about-icon" aria-hidden="true">
                                <svg viewBox="0 0 64 64" fill="none">
                                    <path d="M38 13c8 0 13 0 13 0s0 5-1.5 10.5C47 33 41 39 32 42l-9-9c3-9 9-15 18.5-17.5C36 13.8 38 13 38 13Z" stroke="currentColor" stroke-width="1.7"/>
                                    <circle cx="40.5" cy="23.5" r="4" stroke="currentColor" stroke-width="1.7"/>
                                    <path d="m24 31-8 1-5 7 10 1M34 41l-1 8-7 5-1-10M26 42l-8 8" stroke="currentColor" stroke-width="1.7"/>
                                </svg>
                            </div>

                            <div class="mobile-about-card-copy">
                                <span class="mobile-about-number">04</span>
                                <h3>Founder-led<br>execution</h3>
                                <p>
                                    EVANØESIS is founder-led, with each project shaped through direct research,
                                    careful design, and hands-on execution.
                                </p>
                            </div>

                            <span class="mobile-about-plus" aria-hidden="true">＋</span>
                        </article>

                    </section>

                    <div class="mobile-about-slide-indicator" aria-label="What We Do slide 1 of 2">
                        <span class="mobile-about-slide-chevron" aria-hidden="true">‹</span>
                        <span class="mobile-about-slide-dot is-active" aria-hidden="true"></span>
                        <span class="mobile-about-slide-dot" aria-hidden="true"></span>
                        <span class="mobile-about-slide-count">1 / 2</span>
                        <span class="mobile-about-slide-chevron" aria-hidden="true">›</span>
                    </div>

                    <footer class="mobile-about-motto" aria-label="EVANOESIS motto">
                        <p>Ideas with purpose · Technology with humanity</p>
                        <div class="mobile-about-motto-rule" aria-hidden="true">
                            <span></span>
                        </div>
                    </footer>

                </article>


                <!-- MOBILE ONLY: What We Do reference composition — page 2 -->
                <article class="mobile-about-reference mobile-about-page mobile-about-reference-secondary"
                    aria-label="How Ideas Become Reality — page 2">

                    <div class="mobile-about-hero">
                        <img
                            src="static/images/what-we-do-mobile-hero-2.png"
                            alt="How Ideas Become Reality — a young plant growing from a design sketch">
                    </div>

                    <section class="mobile-about-cards" aria-label="How ideas become reality">

                        <article class="mobile-about-card">
                            <div class="mobile-about-icon" aria-hidden="true">
                                <svg viewBox="0 0 64 64" fill="none">
                                    <circle cx="28" cy="27" r="14" stroke="currentColor" stroke-width="1.8"/>
                                    <path d="m38 38 12 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                </svg>
                            </div>

                            <div class="mobile-about-card-copy">
                                <span class="mobile-about-number">01</span>
                                <h3>Start with the reason</h3>
                                <p>
                                    We begin by understanding why an idea matters, who it serves,
                                    and what real problem it should solve.
                                </p>
                            </div>
                        </article>

                        <article class="mobile-about-card">
                            <div class="mobile-about-icon" aria-hidden="true">
                                <svg viewBox="0 0 64 64" fill="none">
                                    <circle cx="32" cy="32" r="13" stroke="currentColor" stroke-width="1.8"/>
                                    <circle cx="32" cy="32" r="4" stroke="currentColor" stroke-width="1.8"/>
                                    <path d="M32 9v12M32 43v12M9 32h12M43 32h12" stroke="currentColor" stroke-width="1.8"/>
                                </svg>
                            </div>

                            <div class="mobile-about-card-copy">
                                <span class="mobile-about-number">02</span>
                                <h3>Build with precision</h3>
                                <p>
                                    Research, design, prototyping, testing, and implementation are approached carefully,
                                    with close attention to the details that make a product useful and dependable.
                                </p>
                            </div>
                        </article>

                        <article class="mobile-about-card">
                            <div class="mobile-about-icon" aria-hidden="true">
                                <svg viewBox="0 0 64 64" fill="none">
                                    <path d="M21 29c0-7 5-13 11-13s11 6 11 13c0 5-2 8-5 11-2 2-3 4-3 7h-6c0-3-1-5-3-7-3-3-5-6-5-11Z" stroke="currentColor" stroke-width="1.8"/>
                                    <path d="M28 51h8M29 55h6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                                </svg>
                            </div>

                            <div class="mobile-about-card-copy">
                                <span class="mobile-about-number">03</span>
                                <h3>Ideas with meaningful impact</h3>
                                <p>
                                    We are drawn to innovative ideas with the potential to create genuine human value
                                    and improve understanding, capability, or quality of life.
                                </p>
                            </div>
                        </article>

                        <article class="mobile-about-card">
                            <div class="mobile-about-icon" aria-hidden="true">
                                <svg viewBox="0 0 64 64" fill="none">
                                    <circle cx="16" cy="43" r="3" stroke="currentColor" stroke-width="1.8"/>
                                    <circle cx="28" cy="27" r="3" stroke="currentColor" stroke-width="1.8"/>
                                    <circle cx="40" cy="37" r="3" stroke="currentColor" stroke-width="1.8"/>
                                    <circle cx="51" cy="19" r="3" stroke="currentColor" stroke-width="1.8"/>
                                    <path d="m18 41 8-11M31 29l7 6M42 34l7-12" stroke="currentColor" stroke-width="1.8"/>
                                </svg>
                            </div>

                            <div class="mobile-about-card-copy">
                                <span class="mobile-about-number">04</span>
                                <h3>Where we are heading</h3>
                                <p>
                                    Our long-term direction includes biomedical, life-science, microbiological,
                                    medical-technology, and human-health applications — with the aim of contributing
                                    to work that can meaningfully serve humanity.
                                </p>
                            </div>
                        </article>

                    </section>

                    <div class="mobile-about-slide-indicator" aria-label="What We Do slide 2 of 2">
                        <span class="mobile-about-slide-chevron" aria-hidden="true">‹</span>
                        <span class="mobile-about-slide-dot" aria-hidden="true"></span>
                        <span class="mobile-about-slide-dot is-active" aria-hidden="true"></span>
                        <span class="mobile-about-slide-count">2 / 2</span>
                        <span class="mobile-about-slide-chevron" aria-hidden="true">›</span>
                    </div>

                    <footer class="mobile-about-motto mobile-about-motto-secondary" aria-label="EVANOESIS motto">
                        <p>
                            <span>Ideas with purpose</span>
                            <span>Technology with humanity</span>
                        </p>
                        <div class="mobile-about-motto-rule" aria-hidden="true">
                            <span></span>
                        </div>
                    </footer>

                </article>

                <div class="about-slider" data-about-slider>
                    <div class="about-slider-window">
                        <div class="about-slider-track" data-about-track>

                            <section class="about-slide">
                                <h2><strong>What We Do</strong></h2>

                                <p class="body-text">
                                    <strong>Independent digital project studio</strong><br>
                                    EVANØESIS is an independent digital project studio created to turn meaningful ideas
                                    into practical technology projects — with a focus on intelligence, usability,
                                    and human value.
                                </p>

                                <p class="body-text">
                                    <strong>From concept to working reality</strong><br>
                                    We develop focused digital products from early concept to working reality,
                                    combining research, design, software, and applied AI where it creates real value.
                                </p>

                                <p class="body-text">
                                    <strong>Purpose, clarity, and care</strong><br>
                                    Every project begins with a problem worth solving and moves toward a useful tool
                                    that people can understand, trust, and use.
                                </p>

                                <p class="body-text">
                                    <strong>Founder-led execution</strong><br>
                                    EVANØESIS is founder-led, with each project shaped through direct research,
                                    careful design, and hands-on execution.
                                </p>
                            </section>

                            <section class="about-slide">
                                <h2><strong>How Ideas Become Reality</strong></h2>

                                <p class="body-text">
                                    <strong>Start with the reason</strong><br>
                                    We begin by understanding why an idea matters, who it serves,
                                    and what real problem it should solve.
                                </p>

                                <p class="body-text">
                                    <strong>Build with precision</strong><br>
                                    Research, design, prototyping, testing, and implementation are approached carefully,
                                    with close attention to the details that make a product useful and dependable.
                                </p>

                                <p class="body-text">
                                    <strong>Ideas with meaningful impact</strong><br>
                                    We are drawn to innovative ideas with the potential to create genuine human value
                                    and improve understanding, capability, or quality of life.
                                </p>

                                <p class="body-text">
                                    <strong>Where we are heading</strong><br>
                                    Our long-term direction includes biomedical, life-science, microbiological,
                                    medical-technology, and human-health applications — with the aim of contributing
                                    to work that can meaningfully serve humanity.
                                </p>
                            </section>

                        </div>
                    </div>

                    <div class="about-slider-controls" aria-label="What We Do pages">
                        <button type="button" class="about-arrow" data-about-prev aria-label="Previous page">←</button>
                        <span class="about-counter" data-about-counter>1 / 2</span>
                        <button type="button" class="about-arrow" data-about-next aria-label="Next page">→</button>
                    </div>
                </div>
            `,

            contact: `
                <!-- MOBILE ONLY: Contact reference composition.
                     Desktop keeps the existing Contact content below. -->
                <article class="mobile-contact-reference" aria-label="Contact EVANOESIS">

                    <div class="mobile-contact-ornamental-top" aria-hidden="true">
                        <span></span>
                    </div>

                    <section class="mobile-contact-main">
                        <h2>Contact Us</h2>

                        <div class="mobile-contact-title-rule" aria-hidden="true">
                            <span class="mobile-contact-title-rule-line"></span>
                            <span class="mobile-contact-title-rule-gem"></span>
                            <span class="mobile-contact-title-rule-line"></span>
                        </div>

                        <p class="mobile-contact-intro">
                            For project enquiries, collaborations,<br>
                            and business communication,<br>
                            contact EVANØESIS directly.
                        </p>

                        <div class="mobile-contact-email-block">
                            <span class="mobile-contact-email-label">Email</span>

                            <a class="mobile-contact-email"
                                href="mailto:contact@evanoesis.com">
                                contact@evanoesis.com
                            </a>

                            <span class="mobile-contact-email-rule" aria-hidden="true"></span>
                        </div>

                    </section>

                    <img
                        class="mobile-contact-figure"
                        src="static/images/contact-mobile-figure.png"
                        alt=""
                        aria-hidden="true">
                </article>

                <div class="contact-desktop-content">
                    <h2>Contact Us</h2>

                    <p class="body-text">
                        For project enquiries, collaborations, or business communication,
                        contact EVANØESIS directly.
                    </p>

                    <a class="email-link" href="mailto:contact@evanoesis.com">
                        contact@evanoesis.com
                    </a>

                    <p class="body-text contact-note">
                        LinkedIn and additional official channels will be added soon.
                    </p>
                </div>
            `
        };

        async function loadProjectsData() {
            try {
                const response = await fetch(
                    "static/data/projects.json",
                    {
                        cache: "no-store",
                        credentials: "same-origin"
                    }
                );

                if (!response.ok) {
                    return;
                }

                const payload = await response.json();
                const loadedProjects = normalizeProjectsData(payload);

                if (!loadedProjects.length) {
                    return;
                }

                projectsData = loadedProjects;
                content.projects = renderProjects(projectsData);
            } catch {
                /*
                   If loading fails, the known-good fallback remains active.
                   Do not blank or partially render the Projects page.
                */
            }
        }

        void loadProjectsData();

        const buttons = document.querySelectorAll("[data-content]");
        const contentInner = document.getElementById("content-inner");
        const textZone = document.querySelector(".text-zone");
        const homeProjectsCta = document.querySelector("[data-home-projects-link]");

        let isChanging = false;

        function isMobileViewport() {
            return window.matchMedia("(max-width: 520px)").matches;
        }

        /*
           MOBILE TAB ZOOM RESET
           -----------------------------------------------------
           Native pinch zoom belongs to the browser, so there is no
           JavaScript API for assigning visualViewport.scale directly.

           When the user changes EVANOESIS tabs, briefly lock the viewport
           to 1x, then immediately restore normal user zoom capability.
           This returns the NEW tab to its initial 1x view.
        */
        function resetMobileZoomForTabChange() {
            if (!isMobileViewport()) {
                return;
            }

            const viewportMeta = document.querySelector('meta[name="viewport"]');

            if (!viewportMeta) {
                return;
            }

            const normalViewport =
                "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes";

            viewportMeta.setAttribute(
                "content",
                "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
            );

            window.scrollTo(0, 0);

            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    viewportMeta.setAttribute("content", normalViewport);
                });
            });
        }


        function usesDesktopLayout() {
            if (window.innerWidth < 700) {
                return false;
            }

            /*
               Desktop/laptop is capability-based, not one fragile media query.
               any-pointer:fine catches scaled and hybrid laptops with a trackpad
               even when the primary pointer/hover media feature differs.
            */
            return (
                window.matchMedia("(pointer: fine)").matches ||
                window.matchMedia("(any-pointer: fine)").matches ||
                window.matchMedia("(hover: hover)").matches
            );
        }

        function syncLayoutMode() {
            document.documentElement.classList.toggle(
                "layout-desktop",
                usesDesktopLayout()
            );
        }

        function setMobileViewportHeight() {
            document.documentElement.style.setProperty("--app-height", `${window.innerHeight}px`);
        }

        setMobileViewportHeight();
        syncLayoutMode();

        window.addEventListener("resize", () => {
            setMobileViewportHeight();
            syncLayoutMode();
            updateDesktopSafeFrame();
        });

        window.addEventListener("orientationchange", () => {
            setTimeout(() => {
                setMobileViewportHeight();
                syncLayoutMode();
                updateDesktopSafeFrame();
            }, 250);
        });


        function clearProjectBackground() {
            document.body.classList.remove("is-project-code", "is-project-visual");
        }

        function updateProjectBackground(projectIndex) {
            document.body.classList.toggle("is-project-code", projectIndex === 0);
            document.body.classList.toggle("is-project-visual", projectIndex === 1);
        }

        function updatePageState(target) {
            document.body.classList.toggle("is-home", target === "home");
            document.body.classList.toggle("is-section-open", target !== "home");
            document.body.classList.toggle("is-projects", target === "projects");
            document.body.classList.toggle("is-about", target === "about");
            document.body.classList.toggle("is-contact", target === "contact");

            if (target !== "projects") {
                clearProjectBackground();
            }
        }


        /* =====================================================
           DESKTOP SAFE FRAME
           Measure the real rendered rectangle of the current
           background image when background-size is "contain".
           ===================================================== */
        const pageBackground = document.querySelector(".page-bg");
        const desktopBackgroundSizeCache = new Map();

        function setDesktopSafeFrame(left, top, width, height) {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const right = Math.max(0, viewportWidth - left - width);
            const bottom = Math.max(0, viewportHeight - top - height);

            const rootStyle = document.documentElement.style;

            rootStyle.setProperty("--desktop-safe-left", `${left}px`);
            rootStyle.setProperty("--desktop-safe-right", `${right}px`);
            rootStyle.setProperty("--desktop-safe-top", `${top}px`);
            rootStyle.setProperty("--desktop-safe-bottom", `${bottom}px`);
            rootStyle.setProperty("--desktop-safe-width", `${width}px`);
            rootStyle.setProperty("--desktop-safe-height", `${height}px`);
        }

        function useFullViewportAsSafeFrame() {
            setDesktopSafeFrame(
                0,
                0,
                window.innerWidth,
                window.innerHeight
            );
        }

        function applyDesktopBackgroundSize(imageWidth, imageHeight) {
            if (
                !usesDesktopLayout() ||
                !imageWidth ||
                !imageHeight
            ) {
                useFullViewportAsSafeFrame();
                return;
            }

            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            const imageRatio = imageWidth / imageHeight;
            const viewportRatio = viewportWidth / viewportHeight;

            let renderedWidth;
            let renderedHeight;
            let left;
            let top;

            if (viewportRatio > imageRatio) {
                /* Side black bars. */
                renderedHeight = viewportHeight;
                renderedWidth = renderedHeight * imageRatio;
                left = (viewportWidth - renderedWidth) / 2;
                top = 0;
            } else {
                /* Top / bottom black bars. */
                renderedWidth = viewportWidth;
                renderedHeight = renderedWidth / imageRatio;
                left = 0;
                top = (viewportHeight - renderedHeight) / 2;
            }

            setDesktopSafeFrame(
                left,
                top,
                renderedWidth,
                renderedHeight
            );

            positionHomeCta();
        }

        function getCurrentDesktopBackgroundUrl() {
            if (!pageBackground) {
                return "";
            }

            const backgroundImage =
                window.getComputedStyle(pageBackground).backgroundImage;

            if (
                !backgroundImage ||
                backgroundImage === "none"
            ) {
                return "";
            }

            const match = backgroundImage.match(
                /url\((['"]?)(.*?)\1\)/
            );

            return match ? match[2] : "";
        }

        function updateDesktopSafeFrame() {
            if (!usesDesktopLayout()) {
                useFullViewportAsSafeFrame();
                return;
            }

            const source = getCurrentDesktopBackgroundUrl();

            if (!source) {
                useFullViewportAsSafeFrame();
                positionHomeCta();
                return;
            }

            const cachedSize = desktopBackgroundSizeCache.get(source);

            if (cachedSize) {
                applyDesktopBackgroundSize(
                    cachedSize.width,
                    cachedSize.height
                );
                return;
            }

            const image = new Image();

            image.onload = () => {
                const size = {
                    width: image.naturalWidth,
                    height: image.naturalHeight
                };

                desktopBackgroundSizeCache.set(source, size);

                /*
                   Only apply this image if it is still the current
                   background when loading finishes.
                */
                if (getCurrentDesktopBackgroundUrl() === source) {
                    applyDesktopBackgroundSize(
                        size.width,
                        size.height
                    );
                }
            };

            image.onerror = () => {
                useFullViewportAsSafeFrame();
                positionHomeCta();
            };

            image.src = source;
        }

        /*
           HOME CTA:
           Keep the existing clickable element and existing click handler.
           Only its desktop position is measured from the actual intro text,
           so it can never sit on top of that paragraph.
        */
        function positionHomeCta() {
            if (
                !homeProjectsCta ||
                !usesDesktopLayout() ||
                !document.body.classList.contains("is-home")
            ) {
                return;
            }

            const intro = contentInner.querySelector(".body-text");

            if (!intro) {
                return;
            }

            const introRect = intro.getBoundingClientRect();

            const rootStyle = window.getComputedStyle(
                document.documentElement
            );

            const safeTop =
                parseFloat(
                    rootStyle.getPropertyValue("--desktop-safe-top")
                ) || 0;

            const safeHeight =
                parseFloat(
                    rootStyle.getPropertyValue("--desktop-safe-height")
                ) || window.innerHeight;

            const desiredTop = introRect.bottom + 24;

            /*
               Reserve a small bottom safety margin.
               Home content is short, so this clamp should normally
               never activate; it only protects very short screens.
            */
            const maximumTop =
                safeTop + safeHeight - 72;

            homeProjectsCta.style.left =
                `${Math.round(introRect.left)}px`;

            homeProjectsCta.style.top =
                `${Math.round(Math.min(desiredTop, maximumTop))}px`;
        }

        /*
           MOBILE TOUCH POLICY
           -----------------------------------------------------
           Do not intercept touchstart/touchmove/touchend on phones.
           The browser owns pinch zoom and one-finger panning.
           Project navigation on phones uses the visible arrow controls.
           Desktop mouse dragging remains available.
        */
        function initProjectSlider() {
            const slider = document.querySelector("[data-project-slider]");

            if (!slider) {
                return;
            }

            const track = slider.querySelector("[data-project-track]");
            const previousButton = slider.querySelector("[data-project-prev]");
            const nextButton = slider.querySelector("[data-project-next]");
            const counter = slider.querySelector("[data-project-counter]");
            const slides = slider.querySelectorAll(".project-slide");

            let currentIndex = 0;

            let startX = 0;
            let startY = 0;
            let lastY = 0;
            let currentX = 0;

            let isTouching = false;
            let gestureMode = null;

            const totalSlides = slides.length;
            const swipeThreshold = 36;
            const directionThreshold = 8;

            function updateSlider() {
                track.style.transition = "transform 420ms ease";
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
                updateProjectBackground(currentIndex);
            }

            function moveToPrevious() {
                currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
                updateSlider();
            }

            function moveToNext() {
                currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
                updateSlider();
            }

            function beginTouch(clientX, clientY) {
                isTouching = true;
                gestureMode = null;

                startX = clientX;
                startY = clientY;
                lastY = clientY;
                currentX = clientX;

                track.style.transition = "none";
            }

            function moveTouch(clientX, clientY, event) {
                if (!isTouching) {
                    return;
                }

                const dragX = clientX - startX;
                const dragY = clientY - startY;

                if (!gestureMode) {
                    if (
                        Math.abs(dragX) < directionThreshold &&
                        Math.abs(dragY) < directionThreshold
                    ) {
                        return;
                    }

                    gestureMode =
                        Math.abs(dragX) > Math.abs(dragY)
                            ? "horizontal"
                            : "vertical";
                }

                event.preventDefault();

                if (gestureMode === "vertical") {
                    if (textZone) {
                        const deltaY = clientY - lastY;
                        textZone.scrollTop -= deltaY;
                    }

                    lastY = clientY;
                    return;
                }

                currentX = clientX;
                slider.classList.add("is-dragging");

                track.style.transform =
                    `translateX(calc(-${currentIndex * 100}% + ${dragX}px))`;
            }

            function endTouch(event) {
                if (!isTouching) {
                    return;
                }

                const dragDistance = currentX - startX;

                slider.classList.remove("is-dragging");
                isTouching = false;

                if (gestureMode !== "horizontal") {
                    updateSlider();
                    return;
                }

                event.preventDefault();

                if (dragDistance > swipeThreshold) {
                    moveToPrevious();
                    return;
                }

                if (dragDistance < -swipeThreshold) {
                    moveToNext();
                    return;
                }

                updateSlider();
            }

            previousButton.addEventListener("click", moveToPrevious);
            nextButton.addEventListener("click", moveToNext);

            /*
               MOBILE PROJECT SWIPE — NATIVE-TOUCH VERSION
               -------------------------------------------------
               IMPORTANT:
               - touchmove is NEVER prevented;
               - the browser owns pinch zoom and zoomed-page panning;
               - at normal 1x only, a finished horizontal swipe
                 changes projects;
               - vertical movement remains normal scrolling.
            */
            function mobileProjectZoomScale() {
                const viewport = window.visualViewport;

                if (!viewport) {
                    return 1;
                }

                const reported =
                    Number.isFinite(viewport.scale) && viewport.scale > 0
                        ? viewport.scale
                        : 1;

                const layoutWidth =
                    document.documentElement.clientWidth ||
                    window.innerWidth ||
                    1;

                const derived =
                    viewport.width > 0
                        ? layoutWidth / viewport.width
                        : 1;

                return Math.max(reported, derived);
            }

            function mobileProjectIsZoomed() {
                return mobileProjectZoomScale() > 1.01;
            }

            let mobileSwipeTracking = false;
            let mobileSwipeStartX = 0;
            let mobileSwipeStartY = 0;

            slider.addEventListener(
                "touchstart",
                (event) => {
                    if (
                        !isMobileViewport() ||
                        event.touches.length !== 1 ||
                        mobileProjectIsZoomed() ||
                        event.target.closest(
                            ".project-slider-controls, .mobile-project-inline-next"
                        )
                    ) {
                        mobileSwipeTracking = false;
                        return;
                    }

                    mobileSwipeTracking = true;
                    mobileSwipeStartX = event.touches[0].clientX;
                    mobileSwipeStartY = event.touches[0].clientY;
                },
                { passive: true }
            );

            /*
               This listener only cancels our OWN swipe tracking when
               pinch/zoom begins. It never calls preventDefault().
            */
            slider.addEventListener(
                "touchmove",
                (event) => {
                    if (
                        !mobileSwipeTracking ||
                        event.touches.length !== 1 ||
                        mobileProjectIsZoomed()
                    ) {
                        mobileSwipeTracking = false;
                    }
                },
                { passive: true }
            );

            slider.addEventListener(
                "touchend",
                (event) => {
                    if (
                        !mobileSwipeTracking ||
                        !isMobileViewport() ||
                        mobileProjectIsZoomed() ||
                        event.touches.length !== 0 ||
                        !event.changedTouches.length
                    ) {
                        mobileSwipeTracking = false;
                        return;
                    }

                    const endX = event.changedTouches[0].clientX;
                    const endY = event.changedTouches[0].clientY;

                    const dx = endX - mobileSwipeStartX;
                    const dy = endY - mobileSwipeStartY;

                    mobileSwipeTracking = false;

                    /*
                       Require a clearly horizontal gesture.
                       No live dragging/translation is done, so the
                       browser remains free to pan whenever zoomed.
                    */
                    if (
                        Math.abs(dx) < 58 ||
                        Math.abs(dx) <= Math.abs(dy) * 1.25
                    ) {
                        return;
                    }

                    if (dx < 0) {
                        moveToNext();
                    } else {
                        moveToPrevious();
                    }

                    if (textZone) {
                        textZone.scrollTop = 0;
                    }
                },
                { passive: true }
            );

            slider.addEventListener(
                "touchcancel",
                () => {
                    mobileSwipeTracking = false;
                },
                { passive: true }
            );

            /*
               Small inline arrow in each mobile project header.
               Project 02 wraps back to Project 01.
            */
            slider.querySelectorAll("[data-mobile-project-next]")
                .forEach((button) => {
                    button.addEventListener("click", () => {
                        moveToNext();

                        if (textZone) {
                            textZone.scrollTop = 0;
                        }
                    });
                });


            slider.addEventListener("mousedown", (event) => {
                if (event.target.closest(".project-slider-controls")) {
                    return;
                }

                event.preventDefault();

                isTouching = true;
                gestureMode = "horizontal";

                startX = event.clientX;
                currentX = event.clientX;

                slider.classList.add("is-dragging");
                track.style.transition = "none";
            });

            window.addEventListener("mousemove", (event) => {
                if (!isTouching || gestureMode !== "horizontal") {
                    return;
                }

                event.preventDefault();

                currentX = event.clientX;

                const dragDistance = currentX - startX;

                track.style.transform =
                    `translateX(calc(-${currentIndex * 100}% + ${dragDistance}px))`;
            });

            window.addEventListener("mouseup", (event) => {
                endTouch(event);
            });

            updateSlider();
        }


        if (homeProjectsCta) {
            homeProjectsCta.addEventListener("click", (event) => {
                event.preventDefault();

                const aboutButton = document.querySelector(
                    '.top-menu [data-content="about"]'
                );

                if (aboutButton) {
                    aboutButton.click();
                }
            });
        }


        function initAboutSlider() {
            const slider = document.querySelector("[data-about-slider]");

            if (!slider) {
                return;
            }

            /*
               MOBILE WHAT WE DO — TWO REFERENCE PAGES
               -----------------------------------------------------
               Horizontal swipe changes page only at normal 1x zoom.
               We never call preventDefault(), so browser pinch zoom,
               one-finger panning while zoomed, and vertical scrolling
               remain native.
            */
            const mobilePages = Array.from(
                document.querySelectorAll(".mobile-about-page")
            );

            function mobileZoomScale() {
                const viewport = window.visualViewport;

                if (!viewport) {
                    return 1;
                }

                const reported =
                    Number.isFinite(viewport.scale) && viewport.scale > 0
                        ? viewport.scale
                        : 1;

                const layoutWidth =
                    document.documentElement.clientWidth ||
                    window.innerWidth ||
                    1;

                const derived =
                    viewport.width > 0
                        ? layoutWidth / viewport.width
                        : 1;

                return Math.max(reported, derived);
            }

            function showMobileAboutPage(index) {
                if (!mobilePages.length) {
                    return;
                }

                const total = mobilePages.length;
                const normalized = ((index % total) + total) % total;

                mobilePages.forEach((page, pageIndex) => {
                    page.classList.toggle(
                        "is-mobile-about-active",
                        pageIndex === normalized
                    );
                });

                contentInner.dataset.mobileAboutPage = String(normalized);

                if (textZone) {
                    textZone.scrollTop = 0;
                }
            }

            if (isMobileViewport() && mobilePages.length > 1) {
                showMobileAboutPage(0);

                if (!contentInner.dataset.mobileAboutSwipeBound) {
                    contentInner.dataset.mobileAboutSwipeBound = "true";

                    let swipeStartX = 0;
                    let swipeStartY = 0;
                    let swipeTracking = false;

                    contentInner.addEventListener(
                        "touchstart",
                        (event) => {
                            if (
                                !document.body.classList.contains("is-about") ||
                                event.touches.length !== 1 ||
                                mobileZoomScale() > 1.01
                            ) {
                                swipeTracking = false;
                                return;
                            }

                            swipeTracking = true;
                            swipeStartX = event.touches[0].clientX;
                            swipeStartY = event.touches[0].clientY;
                        },
                        { passive: true }
                    );

                    contentInner.addEventListener(
                        "touchend",
                        (event) => {
                            if (
                                !swipeTracking ||
                                !document.body.classList.contains("is-about") ||
                                mobileZoomScale() > 1.01 ||
                                !event.changedTouches.length
                            ) {
                                swipeTracking = false;
                                return;
                            }

                            const endX = event.changedTouches[0].clientX;
                            const endY = event.changedTouches[0].clientY;

                            const dx = endX - swipeStartX;
                            const dy = endY - swipeStartY;

                            swipeTracking = false;

                            if (
                                Math.abs(dx) < 64 ||
                                Math.abs(dx) <= Math.abs(dy) * 1.25
                            ) {
                                return;
                            }

                            const pages = Array.from(
                                document.querySelectorAll(".mobile-about-page")
                            );

                            if (pages.length < 2) {
                                return;
                            }

                            const activeIndex = Math.max(
                                0,
                                pages.findIndex((page) =>
                                    page.classList.contains("is-mobile-about-active")
                                )
                            );

                            const nextIndex =
                                dx < 0
                                    ? activeIndex + 1
                                    : activeIndex - 1;

                            const total = pages.length;
                            const normalized =
                                ((nextIndex % total) + total) % total;

                            pages.forEach((page, pageIndex) => {
                                page.classList.toggle(
                                    "is-mobile-about-active",
                                    pageIndex === normalized
                                );
                            });

                            contentInner.dataset.mobileAboutPage =
                                String(normalized);

                            if (textZone) {
                                textZone.scrollTop = 0;
                            }
                        },
                        { passive: true }
                    );
                }
            }

            /* Existing desktop About slider — unchanged. */
            const track = slider.querySelector("[data-about-track]");
            const previousButton = slider.querySelector("[data-about-prev]");
            const nextButton = slider.querySelector("[data-about-next]");
            const counter = slider.querySelector("[data-about-counter]");
            const slides = slider.querySelectorAll(".about-slide");

            let currentIndex = 0;
            const totalSlides = slides.length;

            function updateAboutSlider() {
                track.style.transform = `translateX(-${currentIndex * 100}%)`;
                counter.textContent = `${currentIndex + 1} / ${totalSlides}`;

                if (textZone) {
                    textZone.scrollTop = 0;
                }
            }

            previousButton.addEventListener("click", () => {
                currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
                updateAboutSlider();
            });

            nextButton.addEventListener("click", () => {
                currentIndex = currentIndex === totalSlides - 1 ? 0 : currentIndex + 1;
                updateAboutSlider();
            });

            updateAboutSlider();
        }

        requestAnimationFrame(updateDesktopSafeFrame);

        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                positionHomeCta();
            });
        }

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const target = button.dataset.content;

                if (
                    isChanging ||
                    button.classList.contains("is-active")
                ) {
                    return;
                }

                resetMobileZoomForTabChange();

                isChanging = true;

                buttons.forEach((item) => {
                    item.classList.toggle(
                        "is-active",
                        item.dataset.content === target
                    );
                });

                contentInner.classList.add("is-leaving");

                setTimeout(() => {
                    contentInner.innerHTML = content[target];

                    updatePageState(target);
                    requestAnimationFrame(updateDesktopSafeFrame);

                    if (textZone) {
                        textZone.scrollTop = 0;
                    }

                    if (target === "projects") {
                        initProjectSlider();
                    }

                    if (target === "about") {
                        initAboutSlider();
                    }

                    contentInner.classList.remove("is-leaving");
                    contentInner.classList.add("is-entering");

                    setTimeout(() => {
                        contentInner.classList.remove("is-entering");
                        isChanging = false;
                    }, 520);

                }, 360);
            });
        });
