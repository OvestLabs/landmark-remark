class Menu extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: "",
			remarks: "",
			searchFilter: ""
		};

		this.handleUsernameChange = this.handleUsernameChange.bind(this);
		this.handleRemarkChange = this.handleRemarkChange.bind(this);
		this.handleSearchFilterChange = this.handleSearchFilterChange.bind(this);
		this.handleKeyUp = this.handleKeyUp.bind(this);
		this.handleSearchKeyUp = this.handleSearchKeyUp.bind(this);
	}

	handleUsernameChange(e) {
		const newValue = e.currentTarget.value;

		this.setState({
			username: newValue
		});
	}

	handleRemarkChange(e) {
		const newValue = e.currentTarget.value;

		this.setState({
			remarks: newValue
		});
	}

	handleSearchFilterChange(e) {
		const newValue = e.currentTarget.value;

		this.setState({
			searchFilter: newValue
		});
	}

	handleKeyUp(e) {
		if (e.key !== "Enter") {
			return;
		}

		const username = this.state.username.trim();
		const remarks = this.state.remarks.trim();

		if (username === "" || remarks === "") {
			return;
		}

		e.currentTarget.blur();

		const data = {
			username: this.state.username,
			remarks: this.state.remarks
		}

		this.setState({
			remarks: ""
		});

		if (typeof this.props.onCreateNote === "function") {
			this.props.onCreateNote(data);
		}
	}

	handleSearchKeyUp(e) {
		if (e.key !== "Enter") {
			return;
		}

		const searchFilter = this.state.searchFilter.trim();

		if (searchFilter === "") {
			return;
		}

		e.currentTarget.blur();

		if (typeof this.props.onSearch === "function") {
			this.props.onSearch(searchFilter);
		}
	}

	render() {
		return (
			<div className="menu">
				<input
					type="text"
					value={this.state.username}
					onChange={this.handleUsernameChange}
					onKeyUp={this.handleKeyUp}
					placeholder="username..." />
				<input
					type="text"
					value={this.state.remarks}
					onChange={this.handleRemarkChange}
					onKeyUp={this.handleKeyUp}
					placeholder="remarks..." />
				<input
					type="text"
					value={this.state.searchFilter}
					onChange={this.handleSearchFilterChange}
					onKeyUp={this.handleSearchKeyUp}
					placeholder="search..." />
			</div>
		);
	}
};

Menu.defaultProps = {
	onCreateNote: function () { },
	onSearch: function() { }
};