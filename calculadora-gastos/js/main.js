let datos = [];

const calcularGanancias = (datos) => {
  return datos.reduce((acu, obj) => {
    acu += obj.ingreso;
    return acu;
  }, 0);
};

const calcularEgresos = (datos) => {
  return datos.reduce((acu, obj) => {
    acu += obj.egreso;
    return acu;
  }, 0);
};
const peticion = async () => {
  try {
    let res = await fetch("./data/datos.json");
    let resJson = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    const ganancia = await calcularGanancias(resJson);
    const perdida = await calcularEgresos(resJson);
    const total = ganancia - perdida;

    console.log(ganancia, perdida);
    console.log(total);
  } catch (error) {
    console.log(`Error : ${error}`);
  }
};

peticion();
