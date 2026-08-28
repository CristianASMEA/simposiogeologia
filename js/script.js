/* =========================================================
   NAVEGACIÓN DEL MENÚ
========================================================= */

const enlacesMenu =
    document.querySelectorAll(".nav-link");


const secciones =
    document.querySelectorAll(".seccion");



/* =========================================================
   CLICK EN LOS ENLACES
========================================================= */

enlacesMenu.forEach(enlace => {

    enlace.addEventListener("click", function(event) {

        event.preventDefault();


        const idSeccion =
            this.getAttribute("href");


        const seccionDestino =
            document.querySelector(idSeccion);


        if (seccionDestino) {

            seccionDestino.scrollIntoView({

                behavior: "smooth",

                block: "start"

            });

        }

    });

});



/* =========================================================
   CAMBIAR MENÚ ACTIVO
========================================================= */

const observador =
    new IntersectionObserver(

        (entradas) => {

            entradas.forEach(entrada => {

                if (entrada.isIntersecting) {

                    const idActual =
                        entrada.target.id;


                    enlacesMenu.forEach(enlace => {

                        enlace.classList.remove("active");

                    });


                    const enlaceActivo =
                        document.querySelector(
                            `.nav-link[href="#${idActual}"]`
                        );


                    if (enlaceActivo) {

                        enlaceActivo.classList.add("active");

                    }

                }

            });

        },

        {

            threshold: 0.55

        }

    );


secciones.forEach(seccion => {

    observador.observe(seccion);

});



/* =========================================================
   CARRUSEL DE SPEAKERS
========================================================= */

const speakerTrack =
    document.getElementById("speakerTrack");


const speakerPrev =
    document.getElementById("speakerPrev");


const speakerNext =
    document.getElementById("speakerNext");


const speakerDots =
    document.getElementById("speakerDots");


const carouselSpeakers =
    document.querySelector(".carousel_speakers");



if (
    speakerTrack &&
    speakerPrev &&
    speakerNext &&
    speakerDots
) {


    const speakerCards =
        document.querySelectorAll(".speaker_card");


    let speakerIndex = 0;


    let speakerAutoPlay;



    /* =====================================================
       CANTIDAD DE SPEAKERS VISIBLES
    ====================================================== */

    function obtenerCantidadVisible() {

        if (window.innerWidth <= 600) {

            return 1;

        }


        if (window.innerWidth <= 900) {

            return 2;

        }


        return 3;

    }



    /* =====================================================
       CANTIDAD DE PÁGINAS
    ====================================================== */

    function obtenerCantidadPaginas() {

        const visibles =
            obtenerCantidadVisible();


        return Math.ceil(
            speakerCards.length / visibles
        );

    }



    /* =====================================================
       CREAR DOTS
    ====================================================== */

    function crearDots() {

        speakerDots.innerHTML = "";


        const cantidad =
            obtenerCantidadPaginas();


        for (
            let i = 0;
            i < cantidad;
            i++
        ) {

            const dot =
                document.createElement("button");


            dot.type =
                "button";


            dot.className =
                "speaker_dot";


            dot.setAttribute(
                "aria-label",
                `Ir al grupo de speakers ${i + 1}`
            );


            dot.addEventListener(
                "click",
                () => {

                    speakerIndex =
                        i;


                    actualizarCarrusel();

                    reiniciarAutoplay();

                }
            );


            speakerDots.appendChild(dot);

        }

    }



    /* =====================================================
       ACTUALIZAR CARRUSEL
    ====================================================== */

    function actualizarCarrusel() {

        const cantidadPaginas =
            obtenerCantidadPaginas();


        if (
            speakerIndex >=
            cantidadPaginas
        ) {

            speakerIndex =
                cantidadPaginas - 1;

        }


        if (speakerIndex < 0) {

            speakerIndex = 0;

        }


        /*
         * Cada página ocupa el 100%
         * del viewport.
         */

        speakerTrack.style.transform =
            `translateX(-${speakerIndex * 100}%)`;


        /* =================================================
           DOTS
        ================================================= */

        const dots =
            speakerDots.querySelectorAll(
                ".speaker_dot"
            );


        dots.forEach(
            (dot, index) => {

                dot.classList.toggle(
                    "active",
                    index === speakerIndex
                );

            }
        );


        /* =================================================
           FLECHA IZQUIERDA
        ================================================= */

        speakerPrev.disabled =
            speakerIndex === 0;


        speakerPrev.style.opacity =
            speakerIndex === 0
                ? "0.35"
                : "1";


        /* =================================================
           FLECHA DERECHA
        ================================================= */

        speakerNext.disabled =
            speakerIndex >=
            cantidadPaginas - 1;


        speakerNext.style.opacity =
            speakerIndex >=
            cantidadPaginas - 1
                ? "0.35"
                : "1";

    }



    /* =====================================================
       ANTERIOR
    ====================================================== */

    speakerPrev.addEventListener(
        "click",
        () => {

            if (
                speakerIndex > 0
            ) {

                speakerIndex--;

                actualizarCarrusel();

                reiniciarAutoplay();

            }

        }
    );



    /* =====================================================
       SIGUIENTE
    ====================================================== */

    speakerNext.addEventListener(
        "click",
        () => {

            const cantidadPaginas =
                obtenerCantidadPaginas();


            if (
                speakerIndex <
                cantidadPaginas - 1
            ) {

                speakerIndex++;

            } else {

                speakerIndex = 0;

            }


            actualizarCarrusel();

            reiniciarAutoplay();

        }
    );



    /* =====================================================
       AUTOPLAY
    ====================================================== */

    function iniciarAutoplay() {

        speakerAutoPlay =
            setInterval(
                () => {

                    const cantidadPaginas =
                        obtenerCantidadPaginas();


                    if (
                        speakerIndex <
                        cantidadPaginas - 1
                    ) {

                        speakerIndex++;

                    } else {

                        speakerIndex = 0;

                    }


                    actualizarCarrusel();

                },
                5000
            );

    }



    /* =====================================================
       REINICIAR AUTOPLAY
    ====================================================== */

    function reiniciarAutoplay() {

        clearInterval(
            speakerAutoPlay
        );


        iniciarAutoplay();

    }



    /* =====================================================
       PAUSAR AL PASAR EL RATÓN
    ====================================================== */

    if (carouselSpeakers) {

        carouselSpeakers.addEventListener(
            "mouseenter",
            () => {

                clearInterval(
                    speakerAutoPlay
                );

            }
        );


        carouselSpeakers.addEventListener(
            "mouseleave",
            () => {

                clearInterval(
                    speakerAutoPlay
                );


                iniciarAutoplay();

            }
        );

    }



    /* =====================================================
       REDIMENSIONAR
    ====================================================== */

    window.addEventListener(
        "resize",
        () => {

            const cantidadPaginas =
                obtenerCantidadPaginas();


            if (
                speakerIndex >=
                cantidadPaginas
            ) {

                speakerIndex =
                    cantidadPaginas - 1;

            }


            crearDots();

            actualizarCarrusel();

        }
    );



    /* =====================================================
       INICIALIZAR
    ====================================================== */

    crearDots();

    actualizarCarrusel();

    iniciarAutoplay();

}



/* =========================================================
   POPUP DE SPEAKERS
========================================================= */

const speakerModal =
    document.getElementById("speakerModal");


const speakerModalClose =
    document.getElementById("speakerModalClose");


const speakerModalOverlay =
    document.getElementById("speakerModalOverlay");


const modalSpeakerPhoto =
    document.getElementById("modalSpeakerPhoto");


const modalSpeakerName =
    document.getElementById("modalSpeakerName");


const modalSpeakerFlag =
    document.getElementById("modalSpeakerFlag");


const modalSpeakerCountry =
    document.getElementById("modalSpeakerCountry");


const modalSpeakerTopic =
    document.getElementById("modalSpeakerTopic");


const modalSpeakerTime =
    document.getElementById("modalSpeakerTime");


const modalSpeakerRoom =
    document.getElementById("modalSpeakerRoom");


const modalSpeakerBio =
    document.getElementById("modalSpeakerBio");



/* =========================================================
   ABRIR POPUP
========================================================= */

function abrirSpeakerModal(card) {

    if (!speakerModal) {
        return;
    }

    const imagen =
        card.querySelector(".speaker_photo img");

    const nombre =
        card.dataset.name ||
        "Speaker";

    const pais =
        card.dataset.country ||
        "Por definir";

    const bandera =
        card.dataset.flag ||
        "🌎";

    const tematica =
        card.dataset.topic ||
        "Por definir";

    const dia =
        card.dataset.day ||
        "Por definir";

    const hora =
        card.dataset.time ||
        "Por definir";

    const salon =
        card.dataset.room ||
        "Por definir";

    const bio =
        card.dataset.bio ||
        "Información biográfica pendiente de actualización.";


    /* CARGAR INFORMACIÓN */

    if (imagen) {

        modalSpeakerPhoto.src =
            imagen.src;

        modalSpeakerPhoto.alt =
            nombre;

    }

    modalSpeakerName.textContent =
        nombre;

    modalSpeakerFlag.textContent =
        bandera;

    modalSpeakerCountry.textContent =
        pais;

    modalSpeakerTopic.textContent =
        tematica;

    modalSpeakerTime.textContent =
        `${dia} | ${hora}`;

    modalSpeakerRoom.textContent =
        salon;


    /* IMPORTANTE:
       innerHTML permite interpretar <ul> y <li>
    */

    modalSpeakerBio.innerHTML =
        bio;


    /* MOSTRAR MODAL */

    speakerModal.classList.add(
        "active"
    );

    speakerModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.classList.add(
        "modal-abierto"
    );

    document.body.style.overflow =
        "hidden";

    setTimeout(
        () => {

            speakerModalClose.focus();

        },
        100
    );

}



/* =========================================================
   CERRAR POPUP
========================================================= */

function cerrarSpeakerModal() {

    if (!speakerModal) {

        return;

    }


    speakerModal.classList.remove(
        "active"
    );


    speakerModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-abierto"
    );


    document.body.style.overflow =
        "";

}




/* =========================================================
   CLICK EN CADA SPEAKER
========================================================= */

const speakerCardsModal =
    document.querySelectorAll(
        ".speaker_card"
    );


speakerCardsModal.forEach(
    card => {


        const photoButton =
            card.querySelector(
                ".speaker_photo"
            );


        if (photoButton) {

            photoButton.addEventListener(
                "click",
                () => {

                    abrirSpeakerModal(
                        card
                    );

                }
            );

        }


        /* =================================================
           ENTER / SPACE SOBRE LA TARJETA
        ================================================== */

        card.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();


                    abrirSpeakerModal(
                        card
                    );

                }

            }
        );

    }
);



/* =========================================================
   BOTÓN CERRAR
========================================================= */

if (speakerModalClose) {

    speakerModalClose.addEventListener(
        "click",
        cerrarSpeakerModal
    );

}



/* =========================================================
   CLICK EN EL FONDO
========================================================= */

if (speakerModalOverlay) {

    speakerModalOverlay.addEventListener(
        "click",
        cerrarSpeakerModal
    );

}



/* =========================================================
   TECLA ESC
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            speakerModal &&
            speakerModal.classList.contains(
                "active"
            )
        ) {

            cerrarSpeakerModal();

        }

    }
);

document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".auspiciantes_track");
    if (track) {
        // Clona el contenido interno para asegurar que el scroll sea infinito y sin cortes
        track.innerHTML += track.innerHTML;
    }
});


document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("videoPromocional");
    const dotsContainer = document.getElementById("videoDots");

    if (video && dotsContainer) {
        const videoList = JSON.parse(video.getAttribute("data-videos") || "[]");

        if (videoList.length > 1) {
            videoList.forEach((src, index) => {
                const dot = document.createElement("button");
                dot.type = "button";
                dot.className = "video_dot" + (index === 0 ? " active" : "");
                dot.setAttribute("aria-label", `Ver video ${index + 1}`);

                dot.addEventListener("click", () => {
                    // Cambiar fuente del video
                    video.src = src;
                    video.play();

                    // Actualizar estado de los puntos
                    const allDots = dotsContainer.querySelectorAll(".video_dot");
                    allDots.forEach((d, i) => {
                        d.classList.toggle("active", i === index);
                    });
                });

                dotsContainer.appendChild(dot);
            });
        }
    }
});




document.addEventListener("DOMContentLoaded", () => {
    const navToggle = document.getElementById("navToggle");
    const navbar = document.getElementById("navbar");
    const navLinks = document.querySelectorAll(".nav-link, .nav-link-btn");

    // Abrir o cerrar el menú al hacer clic en el botón hamburguesa
    if (navToggle && navbar) {
        navToggle.addEventListener("click", (e) => {
            e.stopPropagation(); // Evita que el clic se propague al document
            navToggle.classList.toggle("active");
            navbar.classList.toggle("active");
        });
    }

    // Cerrar automáticamente el menú al hacer clic en cualquier opción
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (navbar.classList.contains("active")) {
                navToggle.classList.remove("active");
                navbar.classList.remove("active");
            }
        });
    });

    // Cerrar el menú al hacer clic/tap en cualquier lugar fuera de la barra de navegación
    document.addEventListener("click", (e) => {
        if (navbar && navbar.classList.contains("active")) {
            // Si el clic no fue dentro de la barra (.navbar) ni en el botón (.nav-toggle)
            if (!navbar.contains(e.target) && !navToggle.contains(e.target)) {
                navToggle.classList.remove("active");
                navbar.classList.remove("active");
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Seleccionar el video promocional
    const videoPromocional = document.getElementById("videoPromocional");

    if (videoPromocional) {
        // Crear el observador de intersección
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // Si el video deja de ser visible en la pantalla (menos del 25% visible)
                if (!entry.isIntersecting) {
                    videoPromocional.pause();
                }
            });
        }, {
            threshold: 0.25 // Detiene el video cuando solo el 25% o menos es visible
        });

        // Iniciar la observación del video
        observer.observe(videoPromocional);
    }

    // Detener el video al hacer clic en los enlaces del menú de navegación
    const navLinks = document.querySelectorAll('.nav-link, .nav-link-btn');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (videoPromocional) {
                videoPromocional.pause();
            }
        });
    });
});