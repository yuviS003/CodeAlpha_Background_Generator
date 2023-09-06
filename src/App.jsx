import BackgroundGen from "./components/BackgroundGen";
import GradientGen from "./components/GradientGen";
import { Analytics } from "@vercel/analytics/react";

const App = () => {
  return (
    <div>
      <BackgroundGen />
      <GradientGen />
      <Analytics />
    </div>
  );
};

export default App;
