import "./App.css";
import { Stepper } from "./components/stepper";

function App() {
	return (
		<div className="w-full h-full">
			<header className=" tracking-tight text-white drop-shadow-md uppercase">
				<div className="text-6xl">Shoppable Video Generator</div>
				<div>
					Jus upload picture of your product and generate virus video with a lot
					of views
				</div>
			</header>

			<main className="p-6">
				<Stepper />
			</main>
		</div>
	);
}

export default App;
