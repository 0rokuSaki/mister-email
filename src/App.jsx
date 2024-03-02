
import { Home } from './pages/Home';
export function App() {

    return (
        <section className='main-app'>
            <header className="app-header">
                <section className="container">
                    <h1>Mister Email</h1>
                </section>
            </header>

            <main className='container'>
                <Home />
            </main>

            <footer>
                <section className="container">
                    Aaron Barkan &copy;
                </section>
            </footer>
        </section>


    )
}

