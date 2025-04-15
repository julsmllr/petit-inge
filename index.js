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
        
        const params = new URLSearchParams(window.location.search);
        let currentStep = params.get("currentStep");
        console.log(currentStep);


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
            console.log(correctAnswers, selectedCards)
            selectedCards.forEach(id => {
                const card = document.querySelector(`[data-card-id="${id}"]`);
                if (correctAnswers.includes(id)) {
                    nbValideCards++;
                    console.log("Correct answer + id: " + card);
                    card.classList.remove('selected');
                    card.classList.add('checked');
                }
            });
        
            if (nbValideCards === 3) {
                alert("Bravo, vous avez sélectionné les bonnes cartes ! Cliquer sur Ok pour continuer l'aventure !");
                setTimeout(() => {
                    window.location.href = "../mission.html?validateStep="+currentStep;
                  }, 1000); 
            }
        
        });

    }

    if (window.location.pathname.includes("mission.html")) {

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
                
                document.getElementById("chassis-card").classList.add("disabled");
                document.getElementById("moteur-card").classList.add("disabled");
                document.getElementById("securite-card").classList.add("disabled");
                document.getElementById("controlPanel-card").classList.add("disabled");
                break;
        }
    }
});