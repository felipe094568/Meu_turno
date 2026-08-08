
import { useState } from "react";
import type { Scale } from "../components/types/Scale";

type NewScaleModalProps = {
  onClose: () => void;
  onSave: (scale: Omit<Scale, "id">) => void;
};
function NewScaleModal({ onClose, onSave }: NewScaleModalProps) {

const [nome, setNome] = useState("");
const [tipo, setTipo] = useState("12x36");
const [dataInicio, setDataInicio] = useState("");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-[400px]">
        <h2 className="text-xl font-bold mb-4">
          Nova Escala
        </h2>

        <div className="flex flex-col gap-4">
          <div>
            <label>Nome da Escala</label>
            <input
  type="text"
  value={nome}
  onChange={(e) => setNome(e.target.value)}
  className="w-full border rounded-lg p-2"
/>
          </div>

          <div>
            <label>Tipo da Escala</label>

            <select
  value={tipo}
  onChange={(e) => setTipo(e.target.value)}
  className="w-full border rounded-lg p-2"
>
              <option>5x1</option>
              <option>5x2</option>
              <option>6x1</option>
              <option>12x36</option>
            </select>
          </div>

          <div>
            <label>Data de Início</label>

            <input
  type="date"
  value={dataInicio}
  onChange={(e) => setDataInicio(e.target.value)}
  className="w-full border rounded-lg p-2"
/>
          </div>

          <div className="flex justify-end gap-2">

         <button onClick={onClose} className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400">Cancelar</button>

        <button className="px-4 py-2 rounded-lg bg-blue-300 hover:bg-blue-400" onClick={() => {onSave({nome, tipo, dataInicio,});
    onClose();
    }}> Salvar</button>

          </div>
        </div>
      </div>
    </div>
  );
}

export default NewScaleModal;