class RecintosZoo {
    analisaRecintos(animal, quantidade) {
      // Tabelamento dos recintos disponíveis e animais com suas respectivas características
        const recintos = [
            { numero: 1, bioma: "savana", tamanho_total: 10, animais: [{ especie: "macaco", quantidade: 3 }] },
            { numero: 2, bioma: "floresta", tamanho_total: 5, animais: [] },
            { numero: 3, bioma: "savana e rio", tamanho_total: 7, animais: [{ especie: "gazela", quantidade: 1 }] },
            { numero: 4, bioma: "rio", tamanho_total: 8, animais: [] },
            { numero: 5, bioma: "savana", tamanho_total: 9, animais: [{ especie: "leao", quantidade: 1 }] },
        ];
  
        const animais = {
            leao: { tamanho: 3, biomas: ["savana", "savana e rio"], carnivoro: true },
            leopardo: { tamanho: 2, biomas: ["savana", "savana e rio"], carnivoro: true },
            crocodilo: { tamanho: 3, biomas: ["rio"], carnivoro: true },
            macaco: { tamanho: 1, biomas: ["savana", "floresta", "savana e rio"], carnivoro: false },
            gazela: { tamanho: 2, biomas: ["savana", "savana e rio"], carnivoro: false },
            hipopotamo: { tamanho: 4, biomas: ["savana", "rio", "savana e rio"], carnivoro: false },
        };
  
      // Normalização dos nomes dos animais para minúsculo
        animal = animal.toLowerCase();
  
        // Verificação de se o animal pertence ao objeto "animais" e de que o número fornecido é natural
        if (!animais[animal]) {
            return { erro: "Animal inválido", recintosViaveis: null };
        }
    
        if (quantidade <= 0) {
            return { erro: "Quantidade inválida", recintosViaveis: null };
        }
    
        // Rastreamento das informações, criação da lista de recintos variáveis, cálculo do tamanho dos animais
        const animalInfo = animais[animal];
        const tamanhoTotalAnimal = animalInfo.tamanho * quantidade;
        const recintosViaveis = [];
    
        // Análise de cada recinto para verificar a viabilidade para o animal
        recintos.forEach((recinto) => {
            // Verifica se o bioma do recinto é compatível com o animal
            if (!animalInfo.biomas.includes(recinto.bioma)) {
                return;
            }
    
            let tamanhoRestante = recinto.tamanho_total;
    
            // Verifica se há mais de uma espécie no recinto e ajusta o espaço restante
            const especiesPresentes = new Set(recinto.animais.map((a) => a.especie)).size;
            if (especiesPresentes > 1) {
                tamanhoRestante -= 1;
            }
    
            // Calcula o tamanho ocupado atualmente no recinto
            const tamanhoOcupado = recinto.animais.reduce(
                (acum, a) => acum + animais[a.especie].tamanho * a.quantidade,
                0
            );
    
            // Verifica se há necessidade de espaço extra
            const espacoExtra = recinto.animais.some((a) => a.especie !== animal) ? 1 : 0;
    
            // Verifica se o recinto já possui carnívoros e o animal que está entrando é carnívoro
            const recintoTemCarnivoro = recinto.animais.some(
                (a) => animais[a.especie].carnivoro
            );
            
            // Verifica se, no caso do recinto já ter um animal carnívoro, o animal sendo adicionado seja da mesma espécie
            if ( recintoTemCarnivoro && !recinto.animais.some((a) => a.especie === animal)) {
                return;
            }
    
            // Verifica se o recinto tem espaço suficiente para o novo animal
            if ( tamanhoOcupado + tamanhoTotalAnimal <= tamanhoRestante - espacoExtra && !(animalInfo.carnivoro && recintoTemCarnivoro && !recinto.animais.some((a) => a.especie === animal))) {
                // Calcula o espaço livre após adicionar o animal
                const espacoLivre =
                    tamanhoRestante - (tamanhoOcupado + tamanhoTotalAnimal + espacoExtra);
        
                recintosViaveis.push({
                    descricao: `Recinto ${recinto.numero} (espaço livre: ${espacoLivre} total: ${recinto.tamanho_total})`,
                    numero: recinto.numero,
                });
            }
        });
    
        // Retorna o resultado
        if (recintosViaveis.length === 0) {
            return { erro: "Não há recinto viável", recintosViaveis: null };
        }
    
        recintosViaveis.sort((a, b) => a.numero - b.numero);
    
        return {
            erro: null,
            recintosViaveis: recintosViaveis.map((r) => r.descricao),
        };
    }
}
    
export { RecintosZoo as RecintosZoo };
    