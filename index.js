const cards = document.querySelectorAll('.chassis-card');
const counter = document.getElementById('chassis-counter');
const chassisValidateBtn = document.getElementById('chassis-validateBtn');
let selectedCards = [];

let correctCards = {
    "chassis": [7, 8, 9],
    "moteur": [1, 2, 3],
    "securite": [10, 11, 13],
    "controlPanel": [12, 14, 15],
    "communication": [4, 5, 6],
}

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("assemblage.html")) {
        // Ton script ici
        document.getElementById("money-span").innerHTML = localStorage.getItem("money") + " €";

        const params = new URLSearchParams(window.location.search);
        let currentStep = params.get("currentStep");
        console.log(currentStep);document.getElementById("assemblage-h1-span").innerHTML = currentStep;

        cards.forEach(card => {
            card.addEventListener('click', () => {
        
                const id = card.dataset.cardId;
        
                if (selectedCards.includes(id)) {
                    if (!(card.classList.contains('checked'))) {
                        selectedCards = selectedCards.filter(c => c !== id);
                        card.classList.remove('selected');   
                    }
                } else if (selectedCards.length < 3) {
                    selectedCards.push(id);
                    card.classList.add('selected');
                }
        
                counter.textContent = `${selectedCards.length} / 3 sélectionnées`;
                chassisValidateBtn.disabled = selectedCards.length !== 3;
            });
        });
        
        chassisValidateBtn.addEventListener('click', () => {
            const correctAnswers = correctCards[currentStep].map(String); 
            var nbValideCards = 0

            localStorage.setItem("money", localStorage.getItem("money") - 1000);
            document.getElementById("money-span").innerHTML = localStorage.getItem("money") + " €";

            console.log(correctAnswers, selectedCards)
            selectedCards.forEach(id => {
                const card = document.querySelector(`[data-card-id="${id}"]`);
    
                if (correctAnswers.includes(id)) {
                    nbValideCards++;
                    card.classList.remove('selected');
                    card.classList.add('checked');
                } else {
                    card.classList.remove('selected');
                    selectedCards = selectedCards.filter(cardId => cardId !== id);
                    counter.textContent = `${selectedCards.length} / 3 sélectionnées`;
                    chassisValidateBtn.disabled = true;
                }
            });
        
            if (nbValideCards === 3) {
                alert("Bravo, vous avez sélectionné les bonnes cartes ! Cliquer sur Ok pour continuer l'aventure !");
                setTimeout(() => {
                    window.location.href = "../mission.html?validateStep="+currentStep;
                  }, 500); 
            }
            
        
        });

    }

    if (window.location.pathname.includes("mission.html")) {
        

        if (localStorage.getItem("money") === null) {
            localStorage.setItem("money", 30000);
        }

        if (localStorage.getItem("startTime") === null) {
            localStorage.setItem("startTime", Date.now());
        }
        
        document.getElementById("money-span").innerHTML = localStorage.getItem("money") + " €";
            // Sélectionner tous les liens
        const links = document.querySelectorAll('a');

        // Ajouter un gestionnaire d'événements à chaque lien
        links.forEach(link => {
            link.addEventListener('click', function(event) {
                // Vérifier si le lien a la classe 'disabled'
                if (link.classList.contains('disabled')) {
                    // Empêcher l'action par défaut (le clic)
                    event.preventDefault();
                    console.log('Clic empêché sur le lien désactivé.');
                }
            });
        });
    
        const params = new URLSearchParams(window.location.search);
        let validateStep = params.get("validateStep")
        
        switch(validateStep) {
            case "chassis":
                document.getElementById("chassis-card").classList.add("checked_container");
                document.getElementById("chassis-card").classList.add("disabled");
                document.getElementById("moteur-card").classList.add("current_container");
                document.getElementById("moteur-card").classList.remove("disabled");
                break            
            case "moteur":
                document.getElementById("moteur-card").classList.add("checked_container");
                document.getElementById("chassis-card").classList.add("checked_container");
                document.getElementById("chassis-card").classList.add("disabled");
                document.getElementById("moteur-card").classList.add("disabled");
                document.getElementById("moteur-card").classList.add("checked_container");
                document.getElementById("securite-card").classList.add("current_container");
                document.getElementById("securite-card").classList.remove("disabled");

                break;
            case "securite":
                document.getElementById("moteur-card").classList.add("checked_container");
                document.getElementById("chassis-card").classList.add("checked_container");
                document.getElementById("securite-card").classList.add("checked_container");
                
                document.getElementById("chassis-card").classList.add("disabled");
                document.getElementById("moteur-card").classList.add("disabled");
                document.getElementById("securite-card").classList.add("disabled");
                
                document.getElementById("controlPanel-card").classList.add("current_container");
                document.getElementById("controlPanel-card").classList.remove("disabled");
                break;
            case "controlPanel":
                document.getElementById("moteur-card").classList.add("checked_container");
                document.getElementById("chassis-card").classList.add("checked_container");
                document.getElementById("securite-card").classList.add("checked_container");
                document.getElementById("controlPanel-card").classList.add("checked_container");
                
                document.getElementById("chassis-card").classList.add("disabled");
                document.getElementById("moteur-card").classList.add("disabled");
                document.getElementById("securite-card").classList.add("disabled");
                document.getElementById("controlPanel-card").classList.add("disabled");

                document.getElementById("communication-card").classList.add("current_container");
                document.getElementById("communication-card").classList.remove("disabled");


                break;
            case "communication":
                document.getElementById("moteur-card").classList.add("checked_container");
                document.getElementById("chassis-card").classList.add("checked_container");
                document.getElementById("securite-card").classList.add("checked_container");
                document.getElementById("controlPanel-card").classList.add("checked_container");
                document.getElementById("communication-card").classList.add("checked_container");
                

                document.getElementById("chassis-card").classList.add("disabled");
                document.getElementById("moteur-card").classList.add("disabled");
                document.getElementById("securite-card").classList.add("disabled");
                document.getElementById("controlPanel-card").classList.add("disabled");
                document.getElementById("communication-card").classList.add("disabled");
                window.location.href = "../pages/fin.html"; 
                break;
        }
    }

    if (window.location.pathname.includes("pages/fin.html")){
        
        document.getElementById("money-span").innerHTML = (20000 - localStorage.getItem("money")) + " €";
        const startTime = parseInt(localStorage.getItem("startTime"));
        const endTime = Date.now();
        const totalTimeMs = endTime - startTime;
    
        const totalSeconds = Math.floor(totalTimeMs / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        document.getElementById("time-span").innerHTML = minutes + "min " + seconds + "s ";  
    }

});


function returnButton() {
    const currentUrl =  new URLSearchParams(window.location.search);
    let current = currentUrl.get("currentStep");
    switch(current) {
        case "chassis":
            window.location.href = "../mission.html";
            break;
        case "moteur":
            window.location.href = "../mission.html?validateStep=chassis";
            break;
        case "securite":    
            window.location.href = "../mission.html?validateStep=moteur";
            break;  
        case "controlPanel":
            window.location.href = "../mission.html?validateStep=securite";
            break;
        case "communication":   
            window.location.href = "../mission.html?validateStep=controlPanel";
            break;
        case "fin":
    }
    
}


// -------------- ANIMATED JS -------------- //
ScrollReveal().reveal('.fin_title', { delay: 1000, duration: 1000 });

