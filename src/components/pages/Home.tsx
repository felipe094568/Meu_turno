import { useEffect, useState } from "react";
import type { Scale } from "../types/Scale";
import { getUserId } from "../types/user";
import Header from "../Header";
import Sidebar from "../Sidebar";
import Calendar from "../Calendar";
import ConfigScaleModal from "../ConfigScaleModal";

function Home() {
  const userId = getUserId();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  const [scales, setScales] = useState<Scale[]>(() => {
    const savedScales = localStorage.getItem(
      `scales-v2-${userId}`
    );

    if (savedScales) {
      return JSON.parse(savedScales);
    }

    return [];
  });

  const [selectedScaleId, setSelectedScaleId] = useState<string | null>(
    () => {
      return localStorage.getItem(
        `selected-scale-${userId}`
      );
    }
  );

  useEffect(() => {
    localStorage.setItem(
      `scales-v2-${userId}`,
      JSON.stringify(scales)
    );
  }, [scales, userId]);

  useEffect(() => {
    if (selectedScaleId) {
      localStorage.setItem(
        `selected-scale-${userId}`,
        selectedScaleId
      );
    }
  }, [selectedScaleId, userId]);

  const selectedScale =
    scales.find(
      (scale) => scale.id === selectedScaleId
    ) ?? null;


  function handleSaveScale(scale: Scale) {
    if (scales.length >= 5) {
      alert("Você pode adicionar no máximo 5 escalas.");
      return;
    }

    setScales((prev) => [
      ...prev,
      scale,
    ]);

    setSelectedScaleId(scale.id);
    setIsConfigOpen(false);
  }


  function handleDeleteScale(id: string) {
    setScales((prev) =>
      prev.filter((scale) => scale.id !== id)
    );

    if (selectedScaleId === id) {
      setSelectedScaleId(null);
    }
  }


  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      {/* Botão do menu */}

      <button
        onClick={() => setIsSidebarOpen(true)}
        className="
          fixed
          top-4
          left-4
          z-30
          w-11
          h-11
          rounded-full
          bg-white
          shadow-md
          text-2xl
          flex
          items-center
          justify-center
        "
      >
        ☰
      </button>


      {/* Calendário */}

      <main className="min-h-screen pt-20 px-4">

        <Calendar
          scale={selectedScale}
          onConfigure={() =>
            setIsConfigOpen(true)
          }
        />

      </main>


      {/* Sidebar */}

      {isSidebarOpen && (
        <Sidebar
          scales={scales}
          onNewScale={() => {
            setIsSidebarOpen(false);
            setIsConfigOpen(true);
          }}
          onSelectScale={(scale) =>
            setSelectedScaleId(scale.id)
          }
          onDeleteScale={handleDeleteScale}
          onClose={() =>
            setIsSidebarOpen(false)
          }
        />
      )}


      {/* Modal */}

      {isConfigOpen && (
        <ConfigScaleModal
          onClose={() =>
            setIsConfigOpen(false)
          }
          onSave={handleSaveScale}
        />
      )}

    </div>
  );
}

export default Home;