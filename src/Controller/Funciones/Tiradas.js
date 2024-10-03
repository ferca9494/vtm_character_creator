var grados_exitos = [
  "MARGINAL",
  "MODERADO",
  "COMPLETO",
  "EXCEPCIONAL",
  "FENOMENAL",
];

export function d10() {
  return Math.floor(Math.random() * 10 + 1);
}

export function Tirada(cantidad, dificultad = 6, exitos = 1) {
  let resultado_tiradas = {
    resultado: "",
    exitos: 0,
    logrado: false,
    tirada: [],
  };

  for (var i = 0; i < cantidad; i++) {
    let dado = d10();

    resultado_tiradas.tirada.push(dado);

    if (dado >= dificultad) resultado_tiradas.exitos++;

    if (dado == 1) resultado_tiradas.exitos--;
  }

  resultado_tiradas.resultado = "FALLO!";
  if (resultado_tiradas.exitos < 0) resultado_tiradas.resultado = "FRACASO!";
  if (resultado_tiradas.exitos >= 1) {
    resultado_tiradas.resultado = "EXITO";

    resultado_tiradas.resultado +=
      resultado_tiradas.exitos > 4
        ? " " + grados_exitos[4] + "!!!"
        : " " + grados_exitos[resultado_tiradas.exitos - 1] + "!";

    resultado_tiradas.logrado = resultado_tiradas.exitos >= exitos;
  }

  return resultado_tiradas;
}
