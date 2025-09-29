import HomePage from './HomePage'
import data from "/data/ocean-family.json"; // 你的 JSON 檔

export default function App() {
  return <HomePage data={data} />;
}
