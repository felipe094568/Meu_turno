import type { Scale } from "../types/Scale";

export type ScheduleDay = {
  date: Date;
  status: "trabalho" | "folga";
};

export function generateSchedule(
  scale: Scale,
  days = 365
): ScheduleDay[] {

  const startDate = new Date(`${scale.dataInicio}T00:00:00`);

  const schedule: ScheduleDay[] = [];

  for (let i = 0; i < days; i++) {

    const currentDate = new Date(startDate);

    currentDate.setDate(
      startDate.getDate() + i
    );

    let status: "trabalho" | "folga";


    // 12x36
    // Trabalha um dia e folga um dia
    if (scale.tipo === "12x36") {

      status =
        i % 2 === 0
          ? "trabalho"
          : "folga";

    }


    // 5x2
    else if (scale.tipo === "5x2") {

      const dayOfWeek = currentDate.getDay();

      status =
        dayOfWeek === 0 || dayOfWeek === 6
          ? "folga"
          : "trabalho";

    }


    // 6x1
    else if (scale.tipo === "6x1") {

      status =
        i % 7 === 6
          ? "folga"
          : "trabalho";

    }


    // 5x1
    else if (scale.tipo === "5x1") {

      status =
        i % 6 === 5
          ? "folga"
          : "trabalho";

    }


    // 4x2
    else if (scale.tipo === "4x2") {

      status =
        i % 6 < 4
          ? "trabalho"
          : "folga";

    }


    // 24x48
    else if (scale.tipo === "24x48") {

      status =
        i % 3 === 0
          ? "trabalho"
          : "folga";

    }


    // Escala personalizada
    else {

      const ciclo =
        scale.diasTrabalho + scale.diasFolga;

      const posicao =
        i % ciclo;

      status =
        posicao < scale.diasTrabalho
          ? "trabalho"
          : "folga";

    }


    schedule.push({
      date: currentDate,
      status,
    });
  }

  return schedule;
}