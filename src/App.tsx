
import './App.css'
import PresentationCard from './components/presentation-card'
import RootLayout from './layout'

function App() {
  return (
    <RootLayout>
      <main className='h-screen flex items-center justify-center bg-gray-200'>
        <PresentationCard />
        
      </main>
    </RootLayout>
  )
}

export default App
