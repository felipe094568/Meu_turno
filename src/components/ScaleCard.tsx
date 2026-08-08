type ScaleCardProps = {
  nome: string;
  tipo: string;
  onClick: () => void;
  onDelete: () => void;
};
function ScaleCard({
  nome,
  tipo,
  onClick,
  onDelete
}: ScaleCardProps){

return (
    <div
  onClick={onClick}
  className="bg-gray-100 rounded-lg p-3 cursor-pointer hover:bg-gray-200"
>

  <div className="flex justify-between">

    <div>
      <h3 className="font-semibold">
        {nome}
      </h3>

      <p className="text-sm text-gray-600">
        {tipo}
      </p>
    </div>


    <button
      onClick={(e) => {
        e.stopPropagation();
        onDelete();
      }}
      className="text-red-600"
    >
      🗑️
    </button>


  </div>

</div>

  )};



export default ScaleCard;