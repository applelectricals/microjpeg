import React from 'react';

const DummyTest = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold">Dummy Test Page</h1>
          <p className="text-blue-100">Minimal static page for performance testing</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <section className="text-center py-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Performance Test Page
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              This is a minimal static page with no API calls and no assets
            </p>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Page loaded successfully! Time: {new Date().toLocaleTimeString()}
            </div>
          </section>

          {/* Content Sections */}
          <section className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Test Section 1</h3>
              <p className="text-gray-700">
                This section contains only text content and basic styling.
                No images, no API calls, no heavy components.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>• Pure HTML/CSS rendering</li>
                <li>• No external dependencies</li>
                <li>• Minimal JavaScript execution</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Test Section 2</h3>
              <p className="text-gray-700">
                Another simple content section to test rendering performance
                with multiple elements.
              </p>
              <div className="mt-4 space-y-2">
                <div className="bg-white p-3 rounded shadow-sm">Card 1</div>
                <div className="bg-white p-3 rounded shadow-sm">Card 2</div>
                <div className="bg-white p-3 rounded shadow-sm">Card 3</div>
              </div>
            </div>
          </section>

          {/* Stats Grid */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 py-8">
            <div className="text-center p-4 bg-red-100 rounded">
              <div className="text-2xl font-bold text-red-700">0</div>
              <div className="text-sm text-red-600">API Calls</div>
            </div>
            <div className="text-center p-4 bg-green-100 rounded">
              <div className="text-2xl font-bold text-green-700">0</div>
              <div className="text-sm text-green-600">Assets</div>
            </div>
            <div className="text-center p-4 bg-blue-100 rounded">
              <div className="text-2xl font-bold text-blue-700">1</div>
              <div className="text-sm text-blue-600">Static Page</div>
            </div>
            <div className="text-center p-4 bg-purple-100 rounded">
              <div className="text-2xl font-bold text-purple-700">100%</div>
              <div className="text-sm text-purple-600">Pure HTML/CSS</div>
            </div>
          </section>

          {/* Simple Form */}
          <section className="bg-white border border-gray-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Test Form (No Submission)</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Test input field"
                className="w-full p-3 border border-gray-300 rounded"
              />
              <textarea 
                placeholder="Test textarea"
                className="w-full p-3 border border-gray-300 rounded h-20"
              ></textarea>
              <button 
                type="button"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                onClick={() => alert('Button clicked! No API call made.')}
              >
                Test Button
              </button>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white p-8 mt-12">
        <div className="max-w-4xl mx-auto text-center">
          <p>Dummy Test Page • No API Calls • No Assets • Pure Performance Test</p>
          <p className="text-gray-400 text-sm mt-2">
            Load Time Test: Check browser DevTools Network tab
          </p>
        </div>
      </footer>
    </div>
  );
};

export default DummyTest;