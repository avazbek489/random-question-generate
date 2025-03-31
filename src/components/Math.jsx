import { useState, useEffect } from "react";
import problems from "./problems.json";

function Math() {
    const [index, setIndex] = useState(() => {
        return parseInt(localStorage.getItem("mathIndex")) || 0;
    });
    const [answer, setAnswer] = useState("");
    const [result, setResult] = useState("");
    const [showSolution, setShowSolution] = useState(false);
    const [isDisabled, setIsDisabled] = useState(() => {
        return JSON.parse(localStorage.getItem("isDisabled")) || false;
    });
    const [isSolutionDisabled, setIsSolutionDisabled] = useState(() => {
        return JSON.parse(localStorage.getItem("isSolutionDisabled")) ?? true;
    });

    useEffect(() => {
        localStorage.setItem("mathIndex", index);
        localStorage.setItem("isDisabled", JSON.stringify(isDisabled));
        localStorage.setItem("isSolutionDisabled", JSON.stringify(isSolutionDisabled));
    }, [index, isDisabled, isSolutionDisabled]);

    function nextProblem() {
        const nextIndex = (index + 1) % problems.length;
        setIndex(nextIndex);
        setAnswer("");
        setResult("");
        setShowSolution(false);
        setIsDisabled(false);
        setIsSolutionDisabled(true);
    }

    function checkAnswer() {
        if (answer.trim() == problems[index].answer) {
            setResult("✅ True!");
        } else {
            setResult(`❌ False! Correct answer: ${problems[index].answer}`);
        }
        setIsDisabled(true);
        setIsSolutionDisabled(false);
    }

    function toggleSolution() {
        setShowSolution((prev) => !prev);
    }

    return (
        <div className="flex font-serif flex-col items-center gap-6 p-6 md:p-10 min-h-screen bg-gradient-to-r animate-gradient bg-[length:400%_400%] from-pink-400 via-purple-500 to-indigo-600">
            <h1 className="text-2xl md:text-4xl font-extrabold text-white drop-shadow-md animate-pulse">
                📘 Math Question
            </h1>
            <div className="pb-6 pl-6 pr-6 pt-2 bg-white shadow-2xl rounded-3xl border border-gray-300 text-center w-full max-w-lg">
                <h2 className="text-black text-3xl font-bold mb-5 font-mono underline">{problems[index].id}-question</h2>
                <p className="text-lg md:text-2xl font-mono font-semibold text-gray-800 animate-fade-in-slow">
                    {problems[index].question}
                </p>
                <input
                    type="text"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    className="input mt-3 w-full bg-white rounded-md text-black border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 py-2 text-base md:text-lg"
                    placeholder="Enter your answer..."
                    disabled={isDisabled}
                />
                <button
                    onClick={checkAnswer}
                    className={`mt-4 btn btn-primary w-full text-base md:text-lg py-3 font-medium ${isDisabled ? "disabled" : ""}`}
                    disabled={isDisabled}
                >
                    ✅ Check
                </button>
                {result && (
                    <p className={`mt-4 text-base md:text-lg font-bold ${result.includes("✅") ? "text-green-600" : "text-red-600"}`}>
                        {result}
                    </p>
                )}
                <button
                    onClick={toggleSolution}
                    className="mt-4 btn btn-warning w-full text-base md:text-lg py-3 font-medium"
                    disabled={isSolutionDisabled}
                >
                    {showSolution ? "🙈 Hide Solution" : "🔍 Show Solution"}
                </button>
                {showSolution && (
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg text-left">
                        <p className="text-sm md:text-base text-gray-700 font-semibold">{problems[index].processing}</p>
                        <p className="text-lg md:text-xl font-bold text-blue-600">Answer: {problems[index].answer}</p>
                    </div>
                )}
                <button
                    onClick={nextProblem}
                    className="mt-6 btn btn-success w-full text-base md:text-lg py-3 font-bold"
                >
                    ⏭ Next Question
                </button>
            </div>
        </div>
    );
}

export default Math;