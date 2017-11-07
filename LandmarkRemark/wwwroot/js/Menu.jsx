class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ""
		};

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	handleTextChange(e) {
		const newText = e.currentTarget.value;

		this.setState({
			text: newText
		});
	}

	handleKeyUp(e) {
		if (e.key !== "Enter") {
			return;
		}

		e.currentTarget.blur();

		const note = {
			remarks: this.state.text
		}

		if (typeof this.props.onCreateNote === "function") {
			this.props.onCreateNote(note);
		}
	}

	render() {
		return (
			<div className="menu">
				<input
					type="text"
					value={this.state.text}
					onChange={this.handleTextChange}
					onKeyUp={this.handleKeyUp}
					placeholder="enter note here..." />
			</div>
		);
	}
};

Menu.defaultProps = {
	onCreateNote: function() { }
};