import React, { useState, useEffect } from 'react';

function Relogio({ horas, Entrada }) {
    const partesHora = horas.split(':');
    const horasEmMilissegundos = parseInt(partesHora[0]) * 60 * 60 * 1000;
    const minutosEmMilissegundos = parseInt(partesHora[1]) * 60 * 1000;
    const segundosEmMilissegundos = parseInt(partesHora[2]) * 1000;
    const MilisTotais = horasEmMilissegundos + minutosEmMilissegundos + segundosEmMilissegundos;

    const entrada = new Date(Entrada);
    const [diff, setDiff] = useState(new Date() - entrada + MilisTotais);

    var diffHoras = diff / (1000 * 60 * 60);
    var horasf = Math.floor(diffHoras);
    var minutos = Math.floor((diffHoras - horasf) * 60);
    var segundos = Math.floor(((diffHoras - horasf) * 60 - minutos) * 60);

    var horaFormatada = `${String(horasf - 3).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;

    const [hora, setHora] = useState(horaFormatada);

    useEffect(() => {
        const timerID = setInterval(() => tick(), 1000);
        return () => clearInterval(timerID);
    }, []);

    const tick = () => {
        setDiff(new Date() - entrada + MilisTotais);
    };

    return (
        <div>
            <h2>{horaFormatada}</h2>
        </div>
    );
}

export default Relogio;