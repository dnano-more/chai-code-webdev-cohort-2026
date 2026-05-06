import './App.css'
import AvatarCard from './components/AvatarCard.jsx'

const avatars = [
  {
    id: 1,
    name: "Nova",
    role: "Navigator",
    power: "Routing",
    initials: "NV",
  },
  {
    id: 2,
    name: "Flux",
    role: "State Keeper",
    power: "useState",
    initials: "FX",
  },
  {
    id: 3,
    name: "Memo",
    role: "Optimizer",
    power: "Memoization",
    initials: "MM",
  },
];

function Shell({title, children}) {
  return (
    <section>
      <p>Reusable shell</p>
      <h2>{title}</h2>
      {children}
      <p>This is for test</p>
    </section>
  )
}


function App() {
  return (
    <>
    <h1>Children in react</h1>
    <Shell title="Batman">
      <h2>This is inside shell</h2>
      <p>This is inside shell</p>
    </Shell>
    <h1>hello from foundation-3</h1>
    <section>
      {avatars.map((avatar) => (
        <AvatarCard 
        key={avatar.id}
        level={avatar.id === 1 ? "Captain" : undefined}
        avatar={avatar}
        />
      ))}
    </section>
    </>
  )
}

export default App
