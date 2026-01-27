import { Layout } from './components/Layout';
import { ThemeToggle } from './components/ThemeToggle';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Contact } from './components/Contact';


function App() {
  return (
    <Layout>
      <ThemeToggle />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
    </Layout>
  );
}

export default App;
