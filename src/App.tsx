import "./App.css";
import { Stepper } from "./components/stepper";

function App() {
	return (
		<div className="w-full h-full">
			<header className=" tracking-tight text-white drop-shadow-md uppercase fixed top-0 left-0 right-0  p-6 text-center mt-10">
				<div className="text-6xl">Shoppable Video Generator</div>
				<div className="mt-4">
					<p>
						Just upload picture of your product and generate virus video with AI
					</p>
					<p>get a lot of views on famous social networks</p>
				</div>
			</header>

			<main className="p-6">
				<Stepper />
			</main>
		</div>
	);
}

export default App;
