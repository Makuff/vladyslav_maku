// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'light' || (!savedTheme && !prefersDark)) {
        body.classList.replace('dark-theme', 'light-theme');
    }
    
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-theme')) {
            body.classList.replace('dark-theme', 'light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.classList.replace('light-theme', 'dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // 3D Tilt Effect
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (supportsHover) generateTiltCards();

    function generateTiltCards () {
        const MAX_TILT = 8;
        const SHADOW = 28;
    
        document.querySelectorAll('.tilt-wrap').forEach((wrap) => {
            const card = wrap.querySelector('.tilt-card');
            const glare = wrap.querySelector('.tilt-glare');
            const surface = wrap.querySelector('.tilt-surface');
            
            function onMove(e) {
                const r = wrap.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                const nx = (x / r.width) - 0.5;
                const ny = (y / r.height) - 0.5;
                
                const rx = (ny * MAX_TILT);
                const ry = (-nx * MAX_TILT);
                
                card.style.transform = `translateZ(20px) rotateX(${rx}deg) rotateY(${ry}deg)`;
                card.style.boxShadow = `${nx * 10}px ${10 + ny * 10}px ${SHADOW}px rgba(0,0,0,.35)`;
                
                if (glare) {
                    const gy = (ny * 250);
                    const gx = (nx * 20);
                    glare.style.opacity = 0.9;
                    glare.style.transform = `translate3d(${gx}%, ${gy}%, 60px)`;
                }
                
                if (surface) {
                    surface.style.transform = `translateZ(0) translate(${-nx * 4}px, ${-ny * 4}px)`;
                }
            }
            
            function onEnter() {
                wrap.classList.add('hovering');
                card.style.transition = 'transform .12s ease, box-shadow .12s ease';
                if (glare) glare.style.transition = 'opacity .15s ease, transform .12s ease';
                if (glare) glare.style.opacity = 0.9;
            }
            
            function onLeave() {
                wrap.classList.remove('hovering');
                card.style.transition = 'transform .18s ease, box-shadow .2s ease';
                card.style.transform = 'rotateX(0) rotateY(0)';
                card.style.boxShadow = '0 10px 28px rgba(0,0,0,.35)';
                if (glare) {
                    glare.style.transition = 'opacity .18s ease, transform .18s ease';
                    glare.style.opacity = 0;
                    glare.style.transform = 'translate3d(0,0,60px)';
                }
                if (surface) {
                    surface.style.transform = 'translateZ(0)';
                }
            }
            
            wrap.addEventListener('mousemove', onMove);
            wrap.addEventListener('mouseenter', onEnter);
            wrap.addEventListener('mouseleave', onLeave);
        });
    }
    
    // Generate project items (for demo purposes)
    function generateProjects() {
        const projects = [
            { title: "Fortnite", date: "2024-2026", icon: "images/fort_icon.jpg", skills: "Blockout/High-poly/Retopology/UVs/Baking/Texturing", link: "https://www.fortnite.com/" }
        ];
        
        const projectContainer = document.querySelector('.space-list');
        if (!projectContainer) return;
        
        projects.forEach(project => {
            const projectHTML = `
                <a href="${project.link}" target="_blank" class="block p-3 rounded-lg transition snap-start proj item">
                    <div class="flex items-start gap-3">
                        <img src="${project.icon}" class="w-16 h-16 rounded flex-shrink-0" alt="${project.title}">
                        <div class="flex-1">
                            <div class="flex items-center justify-between">
                                <div class="font-semibold">${project.title}</div>
                                <span class="proj-date">${project.date}</span>
                            </div>
                            <div class="text-sm" style="color:var(--muted)">${project.skills}</div>
                        </div>
                    </div>
                </a>
            `;
            projectContainer.innerHTML += projectHTML;
        });
    }
    
    // Generate studio items
    function generateStudios() {
        const studios = [
            { name: "Dragonfly", period: "2024–2026 · Fulltime", link: "https://www.dragon-fly.biz/" }
        ];
        
        const studioContainer = document.querySelector('.studios .grid');
        if (!studioContainer) return;
        
        studios.forEach(studio => {
            const studioHTML = `
                <a class="studio p-5" href="${studio.link}" target="_blank">
                    <div class="relative z-10 flex items-center justify-between">
                        <div class="font-semibold">${studio.name}</div>
                        <div class="text-sm muted">${studio.period}</div>
                    </div>
                </a>
            `;
            studioContainer.innerHTML += studioHTML;
        });
    }
    
    // Generate tilt cards
    function generateTiltCards() {
        const cards = [
            { title: "Overwatch 2 | BRIGITTE Antifragile BB", image: "card_c_1.png", link: "https://www.artstation.com/artwork/JvWXo0" },
            { title: "more to come...", image: "card_c_nda.png", link: "#" }
        ];
        
        const cardContainer = document.querySelector('#commercial .grid');
        if (!cardContainer) return;
        
        cards.forEach(card => {
            const cardHTML = `
                <a href="${card.link}" target="_blank" class="tilt-wrap">
                    <div class="tilt-card card-base">
                        <div class="tilt-surface">
                            <div class="tilt-img"><img src="images/${card.image}" alt="${card.title}"></div>
                            <div class="tilt-content"><div class="tilt-title">${card.title}</div></div>
                        </div>
                        <div class="tilt-glare"><img src="images/card-glare-specular.png" alt="glare"></div>
                    </div>
                </a>
            `;
            cardContainer.innerHTML += cardHTML;
        });
    }
    
    // Initialize generated content
    generateProjects();
    generateStudios();
    generateTiltCards();
});