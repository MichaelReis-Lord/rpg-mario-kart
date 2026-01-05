const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigui",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

// Função para simular "rolagem de dados"
function rollDice(){
    return Math.floor(Math.random() * 6)+1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result 

    switch (true) {
        case random < 0.33:
            result = "RETA"
            break;
        case random < 0.66:
        result = "CURVA"
            break;
        default:
        result = "CONFRONTO"
            break;
    }

    return result
}

// Função para simular escolha entre bomba e casco de tartaruga
async function getCombat(){
    let randomCombat = Math.random()
    let resultCombat 

    if (randomCombat>0.5) {
        resultCombat = 2
    } else {
        resultCombat = 1
    }

    return resultCombat
}

async function upgradeWinner() {
    let randomWinner = Math.random()
    let resultWinner

    if (randomWinner>0.5) {
        resultWinner = 2
    } else {
        resultWinner = 1
    }

    return resultWinner;
}

async function logRowResult(characterName, block, diceResul, atttribute) {
    console.log(`${characterName} 🎲 rolou um dado de ${block} ${diceResul} + ${atttribute} = ${diceResul + atttribute}`)

}

// Cria os caracteres para os 2 players
async function playRaceEngine(character1,character2) {
    for(let round = 1; round<= 5; round++) {
        console.log(`🏁 Rodada ${round}`)

        // Sortear bloco
        let block = await getRandomBlock()
        console.log(`Bloco: ${block}`);

            // Rolar os dados
            let diceResul1 = await rollDice()
            let diceResul2 = await rollDice()
            
            // Teste de Habilidade
            let totalTestSkill1 = 0
            let totalTestSkill2 = 0

            if (block === "RETA") {
                totalTestSkill1 = diceResul1+character1.VELOCIDADE
                totalTestSkill2 = diceResul2+character2.VELOCIDADE
            
                await logRowResult(
                    character1.NOME,
                    "velocidade",
                    diceResul1,
                    character1.VELOCIDADE)
            
                await logRowResult(
                    character2.NOME,
                    "velocidade",
                    diceResul2,
                    character2.VELOCIDADE)
            }

            if (block === "CURVA") {
                totalTestSkill1 = diceResul1+character1.MANOBRABILIDADE
                totalTestSkill2 = diceResul2+character2.MANOBRABILIDADE

                    await logRowResult(
                    character1.NOME,
                    "manobrabilidade",
                    diceResul1,
                    character1.MANOBRABILIDADE)
                    
                    await logRowResult(
                    character2.NOME,
                    "manobrabilidade",
                    diceResul2,
                    character2.MANOBRABILIDADE)
            }

            if (block === "CONFRONTO") {
                
                let combat = await getCombat();

                let combatTyp

                if (combat === 1) {
                    combatTyp = "Casco 🐢"
                } else {
                    combatTyp = "Bomba 💣"
                }

                let powerResult1 = diceResul1+character1.PODER;
                let powerResult2 = diceResul2+character2.PODER;

                console.log(`${character1.NOME} confrontou com ${character2.NOME}!🥊`);

                await logRowResult(
                character1.NOME,
                "poder",
                diceResul1,
                character1.PODER)
                
                await logRowResult(
                character2.NOME,
                "poder",
                diceResul2,
                character2.PODER)
                
                if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                    console.log(`${character1.NOME} venceu o confronto!\n`);
                    if (combat === 2 && combat >= character2.PONTOS) {
                        console.log(`${character2.NOME} foi atacado por um(a) ${combatTyp} e não perdeu Ponto(s)!`);
                    } else {
                        console.log(`${character2.NOME} foi atacado por um(a) ${combatTyp} e perdeu ${combat} ponto(s)!`);
                        character2.PONTOS-=combat;                    
                    }
                } 

                if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                    console.log(`${character2.NOME} venceu o confronto!\n`);
                     if (combat === 2 && combat >= character2.PONTOS) {
                        console.log(`${character1.NOME} foi atacado por um(a) ${combatTyp} e não perdeu Ponto(s)!`); 
                    } else {
                        console.log(`${character1.NOME} foi atacado por um(a) ${combatTyp} e perdeu ${combat} ponto(s)!`);
                        character1.PONTOS-=combat;
                    }                    
                }

                console.log(powerResult2 === powerResult1?"Confronto empatado! Nenhum ponto foi perdido!" : "")

            }     
            
            // Verificando o Vencedor
            if (totalTestSkill1 > totalTestSkill2) {
                console.log(`${character1.NOME} Marcou um ponto!`);
                character1.PONTOS++;
            } else if (totalTestSkill2 > totalTestSkill1) {
                console.log(`${character2.NOME} Marcou um ponto!`);
                character2.PONTOS++;
            }

            console.log("--------------------------------");
        }
    }

async function declareWinner(character1, character2) {
    let winnerResult = await upgradeWinner();
    let finalResult

    console.log("Resultado final!")

    if (winnerResult === 2) {
        finalResult = "Ganhou um foguete! Mais um ponto!";        

        if (character1.PONTOS > character2.PONTOS) {
            console.log(`${character1.NOME} ${finalResult}`)
            character1.PONTOS++;

        } else if (character2.PONTOS > character1.PONTOS) {
            console.log(`${character2.NOME} ${finalResult}`)
            character2.PONTOS++;

        }
    }  

    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s)`);
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s)`);

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} venceu a corrida! 🏆`)
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! 🏆`)
    } else {
        console.log("A corrida terminou em empate!")
    }
}

(async function main(params) {
    console.log(`"🏁🚨 Corrida entre ${player1.NOME} e ${player2.NOME} começando... \n"`);

    await playRaceEngine(player1, player2)
    await declareWinner(player1, player2);
})()