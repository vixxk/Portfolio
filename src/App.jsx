import { Layout } from './components/Layout';
import { ThemeToggle } from './components/ThemeToggle';
import { useTheme } from './context/ThemeContext';
import { Hero as DarkHero } from './components/theme/hero/Hero';
import { ChessHero as LightHero } from './components/light/hero/ChessHero';
import { Skills as DarkSkills } from './components/theme/skills/Skills';
import { ChessSkills as LightSkills } from './components/light/skills/ChessSkills';
import { Experience as DarkExperience } from './components/theme/experience/Experience';
import { ChessExperience as LightExperience } from './components/light/experience/ChessExperience';
import { Projects as DarkProjects } from './components/theme/projects/Projects';
import { ChessProjects as LightProjects } from './components/light/projects/ChessProjects';
import { Contact as DarkContact } from './components/theme/contact/Contact';
import { ChessContact as LightContact } from './components/light/contact/ChessContact';

function App() {
  const { theme } = useTheme();
  const isChess = theme === 'chess';

  return (
    <Layout>
      <ThemeToggle />
      {isChess ? <LightHero /> : <DarkHero />}
      {isChess ? <LightSkills /> : <DarkSkills />}
      {isChess ? <LightExperience /> : <DarkExperience />}
      {isChess ? <LightProjects /> : <DarkProjects />}
      {isChess ? <LightContact /> : <DarkContact />}
    </Layout>
  );
}

export default App;

