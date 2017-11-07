class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		const melbourne = { lat: -37.811263, lng: 144.963151 };
		const container = ReactDOM.findDOMNode(this);
		const options = {
			center: melbourne,
			zoom: 15
		};

		const map = new google.maps.Map(container, options);
	}

	render() {
		return (
			<div className="fullHeight"></div>
		);
	}
}