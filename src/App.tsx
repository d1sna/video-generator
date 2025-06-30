import "./App.css";
import { Stepper } from "./components/stepper";

function App() {
	return (
		<div className="w-full h-full text-bl">
			{/* <header className="w-full shadow-md px-6 py-4 flex items-center justify-between">
				<div className="flex items-center space-x-3">
					<Sparkles />
					<h1 className="text-xl sm:text-2xl font-bold ">
						Shoppable Video Generator
					</h1>
				</div>
				<span className="text-sm text-gray-500 hidden sm:inline">v1.0</span>
			</header> */}

			<main className="p-6">
				<Stepper />
			</main>
		</div>
	);
}

export default App;
