import { useState } from "react";
import type { Scale } from "../components/types/Scale";

type ConfigScaleModalProps = {
  onClose: () => void;
  onSave: (scale: Scale) => void;
};

function ConfigScaleModal({
  onClose,
  onSave,
}: ConfigScaleModalProps) {

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("12x36");
  const [diasTrabalho, setDiasTrabalho] = useState(12);
  const [diasFolga, setDiasFolga] = useState(36);
  const [dataInicio, setDataInicio] = useState("");
  const [cor, setCor] = useState("#22c55e");


  function selecionarModelo(
    modelo: string,
    trabalho: number,
    folga: number
  ) {
    setTipo(modelo);
    setDiasTrabalho(trabalho);
    setDiasFolga(folga);
  }


  function handleSave() {

    if (!nome || !dataInicio) {
      alert("Preencha todos os campos");
      return;
    }


    onSave({
      id: crypto.randomUUID(),
      nome,
      tipo,
      diasTrabalho,
      diasFolga,
      dataInicio,
      cor,
    });

    onClose();
  }


  return (
    <div
      className="
        fixed
        inset-0
        z-50
        bg-black/40
        flex
        items-end
        sm:items-center
        justify-center
        p-0
        sm:p-4
      "
    >

      <div
        className="
          bg-white
          rounded-t-3xl
          sm:rounded-2xl
          p-6
          w-full
          sm:max-w-md
          max-h-[90vh]
          overflow-y-auto
        "
      >

        <h2 className="text-2xl font-semibold mb-6">
          Nova escala
        </h2>


        {/* Nome */}

        <div className="mb-5">

          <label className="block mb-2 font-medium">
            Nome do trabalho
          </label>

          <input
            type="text"
            placeholder="Ex: Hospital"
            className="
              w-full
              border
              rounded-xl
              p-3
              outline-none
              focus:ring-2
              focus:ring-blue-500
            "
            value={nome}
            onChange={(e) =>
              setNome(e.target.value)
            }
          />

        </div>


        {/* Modelos */}

        <div className="mb-5">

          <label className="block mb-2 font-medium">
            Modelo da escala
          </label>

          <div className="grid grid-cols-2 gap-2">

            <button
              type="button"
              onClick={() =>
                selecionarModelo("5x2", 5, 2)
              }
              className="border rounded-xl p-3 hover:bg-gray-100"
            >
              5x2
            </button>


            <button
              type="button"
              onClick={() =>
                selecionarModelo("6x1", 6, 1)
              }
              className="border rounded-xl p-3 hover:bg-gray-100"
            >
              6x1
            </button>


            <button
              type="button"
              onClick={() =>
                selecionarModelo("4x2", 4, 2)
              }
              className="border rounded-xl p-3 hover:bg-gray-100"
            >
              4x2
            </button>


            <button
              type="button"
              onClick={() =>
                selecionarModelo("12x36", 12, 36)
              }
              className="border rounded-xl p-3 hover:bg-gray-100"
            >
              12x36
            </button>


            <button
              type="button"
              onClick={() =>
                selecionarModelo("24x48", 24, 48)
              }
              className="border rounded-xl p-3 hover:bg-gray-100"
            >
              24x48
            </button>

          </div>

        </div>


        {/* Dias */}

        <div className="grid grid-cols-2 gap-3 mb-5">

          <div>

            <label className="block mb-2 text-sm">
              Dias de trabalho
            </label>

            <input
              type="number"
              min="1"
              value={diasTrabalho}
              onChange={(e) =>
                setDiasTrabalho(
                  Number(e.target.value)
                )
              }
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />

          </div>


          <div>

            <label className="block mb-2 text-sm">
              Dias de folga
            </label>

            <input
              type="number"
              min="1"
              value={diasFolga}
              onChange={(e) =>
                setDiasFolga(
                  Number(e.target.value)
                )
              }
              className="
                w-full
                border
                rounded-xl
                p-3
              "
            />

          </div>

        </div>


        {/* Data */}

        <div className="mb-5">

          <label className="block mb-2 font-medium">
            Início da escala
          </label>

          <input
            type="date"
            value={dataInicio}
            onChange={(e) =>
              setDataInicio(e.target.value)
            }
            className="
              w-full
              border
              rounded-xl
              p-3
            "
          />

        </div>


        {/* Cor */}

        <div className="mb-6">

  <label className="block mb-2 font-medium">
    Cor da escala
  </label>

  <div className="flex gap-3">

    {[
      "#22c55e",
      "#3b82f6",
      "#a855f7",
      "#f97316",
      "#ef4444",
      "#ec4899",
    ].map((color) => (

      <button
        key={color}
        type="button"
        onClick={() => setCor(color)}
        className={`
          w-10
          h-10
          rounded-full
          border-4
          transition
          ${
            cor === color
              ? "border-gray-900 scale-110"
              : "border-transparent"
          }
        `}
        style={{
          backgroundColor: color,
        }}
      />

    ))}

  </div>

</div>


        {/* Botões */}

        <div className="flex gap-3">

          <button
            onClick={onClose}
            className="
              flex-1
              py-3
              rounded-xl
              bg-gray-200
              hover:bg-gray-300
            "
          >
            Cancelar
          </button>


          <button
            onClick={handleSave}
            className="
              flex-1
              py-3
              rounded-xl
              bg-blue-600
              text-white
              hover:bg-blue-700
            "
          >
            Salvar escala
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfigScaleModal;