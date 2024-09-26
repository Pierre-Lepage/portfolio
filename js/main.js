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

// Ajoutez ce code à votre fichier main.js ou créez un nouveau fichier JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const frameContainer = document.querySelector('.frame-container');
    const frameImage = document.querySelector('.frame-image');

    function updateImagePosition() {
        if (window.innerWidth <= 991) {  // Vérifier si on est en mode mobile
            const containerRect = frameContainer.getBoundingClientRect();
            const containerHeight = containerRect.height;
            const viewportHeight = window.innerHeight;
            const scrollProgress = (containerRect.top * -1) / (containerHeight - viewportHeight);

            if (scrollProgress >= 0 && scrollProgress <= 1) {
                const translateY = scrollProgress * frameImage.offsetHeight;
                frameImage.style.transform = `translateY(-${translateY}px)`;
            }
        } else {
            // Réinitialiser la position de l'image en mode desktop
            frameImage.style.transform = 'translateY(0)';
        }
    }

    window.addEventListener('scroll', updateImagePosition);
    window.addEventListener('resize', updateImagePosition);

    // Appel initial pour positionner l'image correctement au chargement de la page
    updateImagePosition();
});