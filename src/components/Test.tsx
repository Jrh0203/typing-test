import { Component } from "react";
import "stylesheets/Test.scss";

interface Props {
	typedWord: string;
	currWord: string;
	timer: number;
	typedHistory: string[];
	words: string[];
	wpm: number;
	pair: string;
	started: boolean;
}

export default class Test extends Component<Props> {
	render() {
		const {
			typedWord,
			currWord,
			timer,
			words,
			typedHistory,
			wpm,
			started,
		} = this.props;
		let extraLetters = typedWord.slice(currWord.length).split("");

		return (
			<div className="test">
				<div className="timer">
					{wpm > 0 ? wpm : started ? "-" : <span>&nbsp;&nbsp;</span>}
				</div>
				{/* <div className="slowest">{pair}</div> */}
				<div className="box">
					{words.map((word, idx) => {
						return (
							<div
								key={word + idx}
								className="word"
								id={currWord === word ? "active" : undefined}>
								{currWord === word ? (
									<span
										id="caret"
										className="blink"
										style={{
											left:
												typedWord.length *
												14.5833 *
												1.35,
										}}>
										|
									</span>
								) : null}
								{word.split("").map((char, charId) => {
									return (
										<span key={char + charId}>{char}</span>
									);
								})}
								{currWord === word
									? extraLetters.map((char, charId) => {
											return (
												<span
													key={char + charId}
													className="wrong extra">
													{char}
												</span>
											);
									  })
									: typedHistory[idx]
									? typedHistory[idx]
											.slice(words[idx].length)
											.split("")
											.map((char, charId) => {
												return (
													<span
														key={char + charId}
														className="wrong extra">
														{char}
													</span>
												);
											})
									: null}
							</div>
						);
					})}
				</div>
				<div className="timer2">
					{started ? timer : <span>&nbsp;&nbsp;</span>}
				</div>
				<span className="hint">
					{started ? (
						<span>
							<kbd>Tab</kbd> to restart test
						</span>
					) : (
						<span>&nbsp;&nbsp;</span>
					)}
				</span>
			</div>
		);
	}
}
