export default function Layout({ children }) {
  return <div className="h-screen flex overflow-hidden bg-gray-100">
    <div className="flex-1 overflow-auto focus:outline-none" tabIndex={0}>
      <main className="flex-1 relative pb-8 z-0 overflow-y-auto">

        {children}
      </main>
    </div>
  </div>
}