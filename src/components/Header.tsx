import { Component } from "react";
import "stylesheets/Header.scss";

interface Options {
	time: number[];
	theme: string[];
}

const options: Options = {
	time: [15, 30, 45, 60, 120],
	theme: [
		"default",
		"mkbhd",
		"mocha",
		"coral",
		"ocean",
		"azure",
		"forest",
		"rose-milk",
	],
};

interface Props {
	changeTimeLimit(x: number): void;
	selectedIdx: number;
}

export default class Header extends Component<Props> {
	componentDidMount() {
		const theme = localStorage.getItem("theme") || "mocha";
		const time = parseInt(localStorage.getItem("time") || "60", 10);
		document.body.children[1].classList.add(theme);
		const selectedElements = document.querySelectorAll(
			`button[value="${theme}"], button[value="${time}"]`
		);
		selectedElements.forEach((el) => {
			el.classList.add("selected");
		});
	}

	handleOptions = ({ target }: React.MouseEvent) => {
		if (target instanceof HTMLButtonElement && target.dataset.option) {
			switch (target.dataset.option) {
				case "theme":
					document.body.children[1].classList.remove(
						...options.theme
					);
					document.body.children[1].classList.add(target.value);
					break;
				case "time":
					this.props.changeTimeLimit(+target.value);
					break;
			}
			localStorage.setItem(target.dataset.option, target.value);
			target.parentElement!.childNodes.forEach((el) => {
				if (el instanceof HTMLButtonElement)
					el.classList.remove("selected");
			});
			target.classList.add("selected");
			target.blur();
		}
	};

	render() {
		return (
			<header>
				<a href="." className="brand">
					Turtle Type
				</a>
				<a href="." className="desc">
					{
						"Personalized to be hard for how YOU type\n(oh and there's turtles)"
					}
				</a>
			</header>
		);
	}
}
