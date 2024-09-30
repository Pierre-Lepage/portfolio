document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Gestion du formulaire de contact
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
        // Par exemple, en utilisant l'API Fetch pour envoyer les données à un serveur
        console.log('Formulaire soumis');
        form.reset();

        // Exemple d'utilisation d'une modale Bootstrap pour confirmer l'envoi
        var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'), {});
        myModal.show();
    });
});

// Parallax

document.addEventListener('DOMContentLoaded', function() {
    const parallaxElements = document.querySelectorAll('.parallax');
    const initialOffset = window.innerHeight; // Hauteur initiale de la fenêtre

    window.addEventListener('load', function() {
        window.dispatchEvent(new Event('scroll'));
    });
    

    window.addEventListener('scroll', function() {
        let scrollPosition = window.pageYOffset;

        parallaxElements.forEach(element => {
            let speed = element.dataset.speed;
            // Ajustez la position en fonction de la hauteur initiale
            let yPos = (scrollPosition - initialOffset) * speed;
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
});

//Chronologie
document.addEventListener('DOMContentLoaded', function () {
    const frameContainer = document.querySelector('.frame-container');
    const frameImage = document.querySelector('.frame-image');
    let hasFadedIn = false;

    function handleScroll() {
        if (!hasFadedIn) {
            const containerRect = frameContainer.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (containerRect.top < viewportHeight) {
                frameImage.style.transition = 'opacity 1s ease-out';
                frameImage.style.opacity = 1;
                hasFadedIn = true;
            }
        }
    }

    frameImage.style.opacity = 0; // Cache l'image initialement
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Vérifier au chargement de la page
});

//carrousels projet

document.addEventListener('DOMContentLoaded', function() {
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slidesPerView = 3; // Par défaut, 3 projets visibles

    function updateSlide() {
        const activeGrid = document.querySelector('.projects-grid.active');
        const projects = activeGrid.querySelectorAll('.project-item');
        const screenWidth = window.innerWidth;

        // Ajuster le nombre de slides visibles en fonction de la taille de l'écran
        slidesPerView = screenWidth < 992 ? 2 : 3;

        // Cacher tous les éléments
        projects.forEach((project) => {
            project.style.display = 'none';
        });

        // Afficher les éléments selon 'currentSlide' et 'slidesPerView'
        for (let i = currentSlide; i < currentSlide + slidesPerView && i < projects.length; i++) {
            projects[i].style.display = 'block';
        }
    }

    prevBtn.addEventListener('click', () => {
        currentSlide = Math.max(currentSlide - slidesPerView, 0);
        updateSlide();
    });

    nextBtn.addEventListener('click', () => {
        const activeGrid = document.querySelector('.projects-grid.active');
        const projectsCount = activeGrid.querySelectorAll('.project-item').length;
        currentSlide = Math.min(currentSlide + slidesPerView, projectsCount - slidesPerView);
        updateSlide();
    });

    // Événement pour basculer entre les sections "UX / UI" et "Développement"
    const switchButtons = document.querySelectorAll('.switch-btn');
    switchButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            switchButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const type = e.target.getAttribute('data-type');
            document.querySelectorAll('.projects-grid').forEach(grid => {
                grid.classList.remove('active');
            });
            document.querySelector(`.${type}-projects`).classList.add('active');

            // Réinitialiser le carrousel pour la nouvelle section
            currentSlide = 0;
            updateSlide();
        });
    });

    // Initialiser l'affichage des slides
    window.addEventListener('resize', updateSlide);
    updateSlide();
});
