import type { Scale } from "../components/types/Scale";
import ScaleCard from "./ScaleCard";

type SidebarProps = {
  onNewScale: () => void;
  scales: Scale[];
  onSelectScale: (scale: Scale) => void;
  onDeleteScale: (id: string) => void;
  onClose: () => void;
};

function Sidebar({
  onNewScale,
  scales,
  onSelectScale,
  onDeleteScale,
  onClose,
}: SidebarProps) {
  const reachedLimit = scales.length >= 5;

  return (
    <div className="fixed inset-0 z-40">

      {/* Fundo escuro */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />

      {/* Menu */}
      <aside
        className="
          absolute
          left-0
          top-0
          h-full
          w-[85%]
          max-w-sm
          bg-white
          p-5
          flex
          flex-col
          shadow-xl
        "
      >

        {/* Cabeçalho */}

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-xl font-semibold">
            Minhas Escalas
          </h2>

          <button
            onClick={onClose}
            className="
              text-2xl
              w-10
              h-10
              rounded-full
              hover:bg-gray-100
            "
          >
            ×
          </button>

        </div>


        {/* Lista */}

        <div className="flex-1 overflow-y-auto flex flex-col gap-3">

          {scales.map((scale) => (
            <ScaleCard
              key={scale.id}
              nome={scale.nome}
              tipo={scale.tipo}
              onClick={() => {
                onSelectScale(scale);
                onClose();
              }}
              onDelete={() =>
                onDeleteScale(scale.id)
              }
            />
          ))}


          {scales.length === 0 && (
            <p className="text-gray-500 text-center mt-10">
              Nenhuma escala cadastrada.
            </p>
          )}

        </div>


        {/* Adicionar */}

        <button
          onClick={onNewScale}
          disabled={reachedLimit}
          className={`
            mt-4
            w-full
            py-3
            rounded-xl
            font-medium
            ${
              reachedLimit
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          {reachedLimit
            ? "Limite de 5 escalas"
            : "+ Nova escala"}
        </button>

      </aside>

    </div>
  );
}

export default Sidebar;