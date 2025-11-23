

export default function OffersSummary({
  offers,
}: {
  offers: { description: string; saving: number }[];
}) {
  if (!offers || offers.length === 0) {
    return <div className="text-gray-600">No offers applied.</div>;
  }

  return (
    <div className="mt-3">
      <h4 className="font-semibold mb-2">Special offers</h4>

      <div className="bg-white p-3 rounded-lg shadow-sm">
        {offers.map((o, i) => (
          <div
            key={i}
            className={`py-2 ${
              i < offers.length - 1 ? "border-b border-gray-200" : ""
            }`}
          >
            <div className="font-semibold">{o.description}</div>
            <div className="text-red-600">Saved £{o.saving.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
