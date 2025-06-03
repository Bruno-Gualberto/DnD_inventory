import { Link } from "react-router";

export default function Tabs() {
  return (
    <div>
      <h2>Abas</h2>
      <Link to='/'>Inventário</Link>
      <Link to='/store'>Loja</Link>
      <Link to='/loot'>Loot</Link>
    </div>
  );
}
