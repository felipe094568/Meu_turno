import { useState } from "react";
import type { Scale } from "../components/types/Scale";

type NewScaleModalProps = {
  onClose: () => void;
  onSave: (scale: Omit<Scale, "id">) => void;
};

function NewScaleModal({
  onClose,
  onSave,
}: NewScaleModalProps) {
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("12x36");
  const [dataInicio, setDataInicio] = useState("");
  const [cor, setCor] = useState("#22c55e");

  function handleSave() {
    if (!nome || !dataInicio) {
      alert("Preencha todos os campos.");
      return;
    }

    let diasTrabalho = 1;
    let diasFolga = 1;

    if (tipo === "12x36") {
      diasTrabalho = 1;
      diasFolga = 1;
    } else if (tipo === "6x1") {
      diasTrabalho = 6;
      diasFolga = 1;
    } else if (tipo === "5x2") {
      diasTrabalho = 5;
      diasFolga = 2;
    } else if (tipo === "5x1") {
      diasTrabalho = 5;
      diasFolga = 1;
    }

    onSave({
      nome,
      tipo,
      dataInicio,
      cor,
      diasTrabalho,
      diasFolga,
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
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          bg-white
          rounded-2xl
          p-6
          w-full
          max-w-md
          shadow-xl
        "
      >
        <h2 className="text-xl font-bold mb-5">
          Nova Escala
        </h2>

        <div className="flex flex-col gap-4">

          {/* Nome */}
          <div>
            <label className="block mb-1 font-medium">
              Nome da Escala
            </label>

            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Hospital"
              className="
                w-full
                border
                rounded-lg
                p-2
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            />
          </div>

          {/* Tipo */}
          <div>
            <label className="block mb-1 font-medium">
              Tipo da Escala
            </label>

            <select
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="
                w-full
                border
                rounded-lg
                p-2
                bg-white
              "
            >
              <option value="12x36">
                12x36
              </option>

              <option value="5x1">
                5x1
              </option>

              <option value="5x2">
                5x2
              </option>

              <option value="6x1">
                6x1
              </option>
            </select>
          </div>

          {/* Data */}
          <div>
            <label className="block mb-1 font-medium">
              Data de Início
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
                rounded-lg
                p-2
              "
            />
          </div>

          {/* Cor */}
          <div>
            <label className="block mb-1 font-medium">
              Cor da Escala
            </label>

            <div className="flex items-center gap-3">
              <input
                type="color"
                value={cor}
                onChange={(e) =>
                  setCor(e.target.value)
                }
                className="w-12 h-10"
              />

              <span className="text-sm text-gray-500">
                Escolha uma cor para identificar essa escala.
              </span>
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-2 mt-2">

            <button
              onClick={onClose}
              className="
                px-4
                py-2
                rounded-lg
                bg-gray-200
                hover:bg-gray-300
              "
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              className="
                px-4
                py-2
                rounded-lg
                bg-blue-600
                text-white
                hover:bg-blue-700
              "
            >
              Salvar
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default NewScaleModal;