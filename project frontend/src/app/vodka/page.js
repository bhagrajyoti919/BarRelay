export default function VodkaPage() {
  return (
    <div className="min-h-screen bg-black pt-24 text-white">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8">Vodka Selection</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Premium Vodka</h2>
            <p className="text-gray-400">Smooth and pure premium vodka.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Flavored Vodka</h2>
            <p className="text-gray-400">Deliciously flavored vodka options.</p>
          </div>
          <div className="bg-zinc-900 p-6 rounded-lg">
            <h2 className="text-2xl font-bold mb-4">Craft Vodka</h2>
            <p className="text-gray-400">Artisanal vodka from small distilleries.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
