class App extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const location = {
					lat: position.coords.latitude,
					lng: position.coords.longitude
				};

				this.initMap(location);
			});
		}
		else {
			const melbourne = { lat: -37.811263, lng: 144.963151 };
			this.initMap(melbourne);
		}
	}

	initMap(location) {
		const container = ReactDOM.findDOMNode(this);
		const options = {
			center: location,
			zoom: 15
		};

		const map = new google.maps.Map(container, options);
		const marker = new google.maps.Marker({
			position: location,
			map: map
		});
	}

	render() {
		return (
			<div className="fullHeight"></div>
		);
	}
}