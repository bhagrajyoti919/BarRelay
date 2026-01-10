export default function BeerPage() {
  return (
    <div className="min-h-screen bg-black pt-24 text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Beer Selection</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Premium Lager</h2>
            <p className="text-gray-400">Crisp and refreshing premium lager.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">IPA</h2>
            <p className="text-gray-400">Hoppy and bold Indian Pale Ale.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Stout</h2>
            <p className="text-gray-400">Rich and creamy stout with coffee notes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
