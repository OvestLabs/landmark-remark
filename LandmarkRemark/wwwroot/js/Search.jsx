class Search extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			text: ""
		};

		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
	}

	handleTextChange(e) {
		const newValue = e.currentTarget.value;

		this.setState({
			text: newValue
		});
	}

	handleKeyUp(e) {
		if (e.key !== "Enter") {
			return;
		}

		const text = this.state.text.trim();

		e.currentTarget.blur();

		if (typeof this.props.onSearch === "function") {
			this.props.onSearch(text);
		}
	}

	render() {
		return (
			<div className="search centered-content">
				<input
					type="text"
					value={this.state.text}
					onChange={this.handleTextChange}
					onKeyUp={this.handleKeyUp}
					placeholder="Search" />
			</div>
		);
	}
};

Search.defaultProps = {
	onSearch: function() { }
};