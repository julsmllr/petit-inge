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
        document.getElementById("money-span").innerHTML = "💵 " + money + "€";
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
            money -= 1000;
            localStorage.setItem("money", money);
            document.getElementById("money-span").innerHTML = "💵 " + money + "€";
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
                console.log("money: " + money);
            }
            
        
        });

    }

    if (window.location.pathname.includes("mission.html")) {
        document.getElementById("money-span").innerHTML = "💵 " + money + "€";
        console.log("money: " + money);
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
                setTimeout(() => {
                    window.location.href = "../pages/fin.html";
                  }, 1000); 
                break;
        }
    }

});



if (window.location.pathname.includes("fin.html")){
    document.addEventListener("DOMContentLoaded", () =>{
    console.log("fin")
    const startTime = parseInt(localStorage.getItem("startTime"));
    const endTime = Date.now();
    const totalTimeMs = endTime - startTime;

    const totalSeconds = Math.floor(totalTimeMs / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    console.log(minutes, seconds)
    // Affichage dans la page
    document.getElementById("time-span").innerHTML = minutes+"min" +seconds+"s";
    
    document.getElementById("money-span").innerHTML = (20000-money)+ "€";
    // Si tu veux ensuite reset pour une nouvelle partie
    localStorage.removeItem("startTime");
    localStorage.removeItem("money");
    });
};

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


