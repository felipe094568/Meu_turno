import { useState } from "react";
import type { Scale } from "../components/types/Scale";
import { generateSchedule } from "../components/types/generateSchedule";

type CalendarProps = {
  scale: Scale | null;
  onConfigure: () => void;
};

function Calendar({ scale, onConfigure }: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Caso ainda não exista nenhuma escala
  if (!scale) {
    return (
      <main className="flex-1 min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-sm border p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">📅</div>

          <h2 className="text-2xl font-semibold mb-2">
            Nenhuma escala configurada
          </h2>

          <p className="text-gray-500 mb-6">
            Configure seu trabalho para começar
          </p>

          <button
            onClick={onConfigure}
            className="
              bg-blue-600
              text-white
              px-5
              py-3
              rounded-xl
              font-medium
              hover:bg-blue-700
              transition
            "
          >
            ⚙️ Configurar escala
          </button>
        </div>
      </main>
    );
  }

  /*
   * Geramos bastante dias para que o usuário
   * possa navegar pelos próximos meses.
   */
  const schedule = generateSchedule(scale, 730);

  /*
   * Transformamos o calendário em um mapa.
   *
   * Exemplo:
   *
   * "2026-08-07" → trabalho
   * "2026-08-08" → folga
   */
  const scheduleMap = new Map(
    schedule.map((day) => [
      `${day.date.getFullYear()}-${String(
        day.date.getMonth() + 1
      ).padStart(2, "0")}-${String(
        day.date.getDate()
      ).padStart(2, "0")}`,
      day.status,
    ])
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  /*
   * Primeiro dia do mês.
   *
   * getDay():
   * 0 = domingo
   * 1 = segunda
   * ...
   * 6 = sábado
   */
  const firstDay = new Date(year, month, 1).getDay();

  /*
   * Quantidade de dias do mês atual.
   */
  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();


  /*
   * Total de quadrados necessários para formar
   * todas as semanas.
   */
  const totalCells = Math.ceil(
    (firstDay + daysInMonth) / 7
  ) * 7;

  /*
   * Cor da escala.
   *
   * Se por algum motivo a escala antiga não tiver
   * uma cor salva, usamos rosa como padrão.
   */
  const scaleColor =
    "cor" in scale && typeof scale.cor === "string"
      ? scale.cor
      : "#f43f5e";

  /*
   * Verifica se uma data é hoje.
   */
  function isToday(date: Date) {
    const today = new Date();

    return (
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear()
    );
  }

  /*
   * Cria uma chave para encontrar o status
   * da escala.
   */
  function getDateKey(date: Date) {
    return `${date.getFullYear()}-${String(
      date.getMonth() + 1
    ).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;
  }

  /*
   * Dias de trabalho e folga no mês atual.
   */
  let workDays = 0;
  let restDays = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);

    const status = scheduleMap.get(
      getDateKey(date)
    );

    if (status === "trabalho") {
      workDays++;
    }

    if (status === "folga") {
      restDays++;
    }
  }

  /*
   * Mês anterior
   */
  function goPreviousMonth() {
    setCurrentDate(
      new Date(year, month - 1, 1)
    );
  }

  /*
   * Próximo mês
   */
  function goNextMonth() {
    setCurrentDate(
      new Date(year, month + 1, 1)
    );
  }

  /*
   * Voltar para o mês atual.
   */
  function goToday() {
    setCurrentDate(new Date());
  }

  return (
    <main className="flex-1 min-h-screen bg-gray-50 p-4 md:p-6">

      <div className="max-w-4xl mx-auto">

        {/* CABEÇALHO DO CALENDÁRIO */}

        <div className="bg-white rounded-3xl border shadow-sm p-5 md:p-7">

          <div className="flex items-center justify-between gap-4 mb-6">

            <div>
              <h2 className="text-2xl md:text-3xl font-semibold capitalize">
                {monthName}
              </h2>

              <p className="text-gray-400 text-lg mt-1">
                {scale.nome}
              </p>
            </div>


            {/* CONTROLES DO MÊS */}

            <div className="flex items-center gap-2">

              <button
                onClick={goPreviousMonth}
                className="
                  w-12
                  h-12
                  rounded-full
                  border
                  bg-white
                  text-2xl
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-50
                  transition
                "
                aria-label="Mês anterior"
              >
                ‹
              </button>


              <button
                onClick={goToday}
                className="
                  px-5
                  h-12
                  rounded-full
                  border
                  bg-white
                  font-medium
                  hover:bg-gray-50
                  transition
                "
              >
                Hoje
              </button>


              <button
                onClick={goNextMonth}
                className="
                  w-12
                  h-12
                  rounded-full
                  border
                  bg-white
                  text-2xl
                  flex
                  items-center
                  justify-center
                  hover:bg-gray-50
                  transition
                "
                aria-label="Próximo mês"
              >
                ›
              </button>

            </div>

          </div>


          {/* RESUMO */}

          <div className="grid grid-cols-2 gap-4 mb-7">

            {/* TRABALHO */}

            <div
              className="
                rounded-3xl
                p-5
                border
              "
              style={{
                backgroundColor: `${scaleColor}18`,
                borderColor: `${scaleColor}45`,
              }}
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-2xl
                  "
                  style={{
                    backgroundColor: scaleColor,
                  }}
                >
                  💼
                </div>


                <div>

                  <p
                    className="text-3xl font-semibold"
                    style={{
                      color: scaleColor,
                    }}
                  >
                    {workDays}
                  </p>

                  <p
                    className="font-medium"
                    style={{
                      color: scaleColor,
                    }}
                  >
                    dias de trabalho
                  </p>

                </div>

              </div>

            </div>


            {/* FOLGA */}

            <div
              className="
                rounded-3xl
                p-5
                bg-gray-50
                border
                border-gray-200
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-14
                    h-14
                    rounded-2xl
                    bg-gray-200
                    flex
                    items-center
                    justify-center
                    text-2xl
                  "
                >
                  ☕
                </div>


                <div>

                  <p className="text-3xl font-semibold text-gray-600">
                    {restDays}
                  </p>

                  <p className="font-medium text-gray-500">
                    dias de folga
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* DIAS DA SEMANA */}

          <div className="grid grid-cols-7 gap-1 md:gap-2 mb-3">

            {[
              "DOM",
              "SEG",
              "TER",
              "QUA",
              "QUI",
              "SEX",
              "SÁB",
            ].map((day) => (

              <div
                key={day}
                className="
                  text-center
                  text-sm
                  md:text-base
                  font-semibold
                  text-gray-400
                  py-2
                "
              >
                {day}
              </div>

            ))}

          </div>


          {/* CALENDÁRIO */}

          <div className="grid grid-cols-7 gap-1 md:gap-2">

            {Array.from({
              length: totalCells,
            }).map((_, index) => {

              /*
               * Calculamos a data real de cada
               * quadrado do calendário.
               */
              const dayOffset =
                index - firstDay + 1;

              const date = new Date(
                year,
                month,
                dayOffset
              );

              const isCurrentMonth =
                date.getMonth() === month;

              const status =
                scheduleMap.get(
                  getDateKey(date)
                );

              const today = isToday(date);

              /*
               * Dias de outros meses ficam apagados.
               */
              if (!isCurrentMonth) {

                return (
                  <div
                    key={`empty-${index}`}
                    className="
                      min-h-[58px]
                      md:min-h-[72px]
                      flex
                      items-center
                      justify-center
                      text-gray-300
                      rounded-2xl
                    "
                  >
                    {date.getDate()}
                  </div>
                );

              }


              /*
               * DIA DE TRABALHO
               */

              if (status === "trabalho") {

                return (
                  <div
                    key={getDateKey(date)}
                    className="
                      min-h-[58px]
                      md:min-h-[72px]
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      text-white
                      font-medium
                      text-lg
                      relative
                    "
                    style={{
                      backgroundColor: scaleColor,
                    }}
                  >

                    {date.getDate()}


                    {today && (
                      <div
                        className="
                          absolute
                          inset-1
                          rounded-xl
                          border-2
                          border-white
                        "
                      />
                    )}

                  </div>
                );

              }


              /*
               * DIA DE FOLGA
               */

              return (
                <div
                  key={getDateKey(date)}
                  className={`
                    min-h-[58px]
                    md:min-h-[72px]
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    text-lg
                    font-medium
                    relative
                    ${
                      status === "folga"
                        ? "bg-gray-100 text-gray-500"
                        : "bg-white text-gray-400"
                    }
                  `}
                >

                  {date.getDate()}


                  {today && (
                    <div
                      className="
                        absolute
                        inset-1
                        rounded-xl
                        border-2
                        border-gray-900
                      "
                    />
                  )}

                </div>
              );

            })}

          </div>


          {/* LEGENDA */}

          <div className="flex justify-center items-center gap-6 mt-8">

            <div className="flex items-center gap-2">

              <div
                className="w-5 h-5 rounded-md"
                style={{
                  backgroundColor: scaleColor,
                }}
              />

              <span className="text-gray-500">
                Trabalho
              </span>

            </div>


            <div className="flex items-center gap-2">

              <div className="w-5 h-5 rounded-md bg-gray-200" />

              <span className="text-gray-500">
                Folga
              </span>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}

export default Calendar;