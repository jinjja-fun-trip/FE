export default function IntentFallback() {
    return (
      <div className="flex flex-col h-screen">
        <header className="bg-white shadow p-4 flex items-center">
          <h1 className="text-xl font-bold">Fallback Intent</h1>
        </header>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <p>Fallback intent triggered. Please try again.</p>
          </div>
        </div>
      </div>
    );
  }   