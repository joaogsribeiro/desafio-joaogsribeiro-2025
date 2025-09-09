const animaisValidos = {
    Rex: { tipo: "cão", brinquedos: ["RATO", "BOLA"] },
    Mimi: { tipo: "gato", brinquedos: ["BOLA", "LASER"] },
    Fofo: { tipo: "gato", brinquedos: ["BOLA", "RATO", "LASER"] },
    Zero: { tipo: "gato", brinquedos: ["RATO", "BOLA"] },
    Bola: { tipo: "cão", brinquedos: ["CAIXA", "NOVELO"] },
    Bebe: { tipo: "cão", brinquedos: ["LASER", "RATO", "BOLA"] },
    Loco: { tipo: "jabuti", brinquedos: ["SKATE", "RATO"] },
};

class AbrigoAnimais {
    _pessoaPodeAdotar(brinquedosDaPessoa, nomeAnimal) {
        const animal = animaisValidos[nomeAnimal];
        const brinquedosFavoritos = animal.brinquedos;

        if (animal.tipo === "jabuti") {
            for (const brinquedoFavorito of brinquedosFavoritos) {
                if (!brinquedosDaPessoa.includes(brinquedoFavorito)) {
                    return false;
                }
            }
            return true;
        }

        let indexBrinquedoFavorito = 0;
        for (const brinquedo of brinquedosDaPessoa) {
            if (brinquedo === brinquedosFavoritos[indexBrinquedoFavorito]) {
                indexBrinquedoFavorito++;
            }
            if (indexBrinquedoFavorito === brinquedosFavoritos.length) {
                return true;
            }
        }

        return false;
    }

    encontraPessoas(brinquedosPessoa1, brinquedosPessoa2, ordemAnimais) {
        const listaAnimais = ordemAnimais.split(",");

        const animaisJaVistos = [];
        for (const nomeAnimal of listaAnimais) {
            if (animaisJaVistos.includes(nomeAnimal)) {
                return { erro: "Animal inválido" };
            }
            animaisJaVistos.push(nomeAnimal);
        }

        for (const nomeAnimal of listaAnimais) {
            if (!animaisValidos[nomeAnimal]) {
                return { erro: "Animal inválido" };
            }
        }

        const listaBrinquedosPessoa1 = brinquedosPessoa1.split(",");
        const listaBrinquedosPessoa2 = brinquedosPessoa2.split(",");
        const resultadoFinal = [];

        let adocoesPessoa1 = 0;
        let adocoesPessoa2 = 0;

        for (const animal of listaAnimais) {
            const aptidaoPessoa1 = adocoesPessoa1 < 3 && this._pessoaPodeAdotar(listaBrinquedosPessoa1, animal);
            const aptidaoPessoa2 = adocoesPessoa2 < 3 && this._pessoaPodeAdotar(listaBrinquedosPessoa2, animal);

            let destino = "abrigo";
            if (aptidaoPessoa1 && !aptidaoPessoa2) {
                destino = "pessoa 1";
                adocoesPessoa1++;
            } else if (!aptidaoPessoa1 && aptidaoPessoa2) {
                destino = "pessoa 2";
                adocoesPessoa2++;
            }

            resultadoFinal.push(`${animal} - ${destino}`);
        }

        resultadoFinal.sort();
        return { lista: resultadoFinal };
    }
}

export { AbrigoAnimais as AbrigoAnimais };
