document.addEventListener("keyup", (e)=>{
    if (e.ctrlKey && e.which === 88) {
        window.location.href = "../pages/supersecretpage.html";
    }
})

class Game {
    
    bombeC;
    campo = [];
    colonne = 8;
    righe = 8;
    flag = false;
    perso = false;
    posBombe = [];
    casellaOn = 0;


    tavola = document.getElementById("tavola");
    bombeRimaste = document.getElementById("bombe-rimaste");
    bottoneFlag = document.getElementById("bottone-flag");


    constructor(bombeC) {
        this.bombeC = Number(bombeC);

        this.bombeRimaste.innerText = this.bombeC;
        this.bottoneFlag.addEventListener("click",() => {
            this.flag = !this.flag;
            if(this.flag){
                this.bottoneFlag.style.backgroundColor = "gray"
            }
            else{
                this.bottoneFlag.style.backgroundColor = "white"
            }
        });
        this.aggiungiBombe();


        for (let i = 0; i < this.righe; i++) {

            let riga = [];

            for (let j = 0; j < this.colonne; j++) {

                //riempio le righe di caselle che hanno dentro un div
                //e come id le rispettive coordinate x-y

                let casella = document.createElement("div");
                casella.id = i.toString() + "-" + j.toString();
                casella.addEventListener("click", (e)=>{
                    this.casellaCliccata(e.target)
                });
                casella.addEventListener("contextmenu", (e)=>{
                    this.bandieraccia(e)
                });
                this.tavola.append(casella);
                riga.push(casella); //inserimento di ogni casella nella riga
            }

            this.campo.push(riga); //inserimento di ogni riga nel campo
        }

        console.log(this.campo);
    }

    destroy(){
        this.tavola.innerHTML = "";
    }

    aggiungiBombe() {
        let bombeRimaste = this.bombeC;
        while (bombeRimaste > 0) {
            let i = Math.floor(Math.random() * this.righe)
            let j = Math.floor(Math.random() * this.colonne)
            let id = i.toString() + "-" + j.toString();

            if (!this.posBombe.includes(id)) {
                this.posBombe.push(id);
                bombeRimaste -= 1;
            }
        }
    }

    bandieraccia(e) {
        e.preventDefault();
        this.flag = true;
        console.log(this.flag);
        this.casellaCliccata(e.target);
        this.flag = false;
    }
    //funzione per mettere o rimuovere le banierine
    casellaCliccata(casella) {
        if (this.perso || casella.classList.contains("click-casella")) {
            return;
        }

        if (this.flag) {
            if (casella.innerText === "") {
                casella.innerText = "🚩";
            }
            else if (casella.innerText === "🚩") {
                casella.innerText = "";
            }
            return;
        }

        if (this.posBombe.includes(casella.id)) {
            //alert("Hai Perso");
            this.perso = true;
            this.mostraBombe();
            return;
        }

        let coordinate = casella.id.split("-");
        let i = parseInt(coordinate[0]);
        let j = parseInt(coordinate[1]);
        this.controllaBombe(i, j);
    }

    mostraBombe() {
        for (let i = 0; i < this.righe; i++) {
            for (let j = 0; j < this.colonne; j++) {
                let casella = this.campo[i][j];
                if (this.posBombe.includes(casella.id)) {
                    casella.innerText = "💣"
                    casella.style.backgroundColor = "red";
                }
            }
        }
    }

    controllaBombe(i, j) {
        if (i < 0 || j < 0 || i >= this.righe || j >= this.colonne) {
            return;
        }

        if (this.campo[i][j].classList.contains("click-casella")) {
            return;
        }

        this.campo[i][j].classList.add("click-casella");
        this.casellaOn += 1;

        let bombeTrovate = 0;

        bombeTrovate += this.controllaCasella(i - 1, j - 1);
        bombeTrovate += this.controllaCasella(i - 1, j);
        bombeTrovate += this.controllaCasella(i - 1, j + 1);

        bombeTrovate += this.controllaCasella(i, j - 1);
        bombeTrovate += this.controllaCasella(i, j + 1);

        bombeTrovate += this.controllaCasella(i + 1, j - 1);
        bombeTrovate += this.controllaCasella(i + 1, j);
        bombeTrovate += this.controllaCasella(i + 1, j + 1);

        if (bombeTrovate > 0) {
            this.campo[i][j].innerText = bombeTrovate;
            this.campo[i][j].classList.add("n" + bombeTrovate.toString());
        }
        else {
            this.controllaBombe(i - 1, j - 1);
            this.controllaBombe(i - 1, j);
            this.controllaBombe(i - 1, j + 1);

            this.controllaBombe(i, j - 1);
            this.controllaBombe(i, j + 1);

            this.controllaBombe(i + 1, j - 1);
            this.controllaBombe(i + 1, j);
            this.controllaBombe(i + 1, j + 1);

        }

        console.table({ casellaOn: this.casellaOn, bombeC: this.bombeC, righe: this.righe, colonne: this.colonne })

        if (this.bombeC === this.righe * this.colonne - this.casellaOn) {
            this.bombeRimaste.innerText = "Hai finito!"
            this.perso = true;
        }
    }

    controllaCasella(i, j) {
        if (i < 0 || j < 0 || i >= this.righe || j >= this.colonne) {
            return 0;
        }
        if (this.posBombe.includes(i.toString() + "-" + j.toString())) {
            return 1;
        }
        return 0;
    }

}

const input = document.getElementById("inseriscibombe");
let game = new Game(input.value);

input.addEventListener("change", ()=>{
    game.destroy()
    game = new Game(input.value);
})

document.getElementById("restart").addEventListener("click", ()=>{
    game.destroy();
    game = new Game(input.value);
})

//redirect projects

function redirect1(){
    console.log("a");
    window.location.href = "https://schoolrevolution.space";
}

function redirect2(){
    console.log("a");
    window.location.href = "../pages/campominato.html";
}