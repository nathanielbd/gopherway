import React, { Component } from 'react';
import {ActivityIndicator, View} from 'react-native';
import MapView from 'react-native-maps';
import {Polyline} from 'react-native-maps';
import styles from '../style';

const LATITUDE = 44.974208;
const LONGITUDE = -93.2325;
const LATITUDE_DELTA = 0.001;
const LONGITUDE_DELTA = 0.012;

export default class GraphEdge extends Component 
{
	constructor(props) 
	{
		super(props);
		this.state = 
		{ isLoading: true, scrollable: false,
			Region: {latitude: LATITUDE,
			longitude: LONGITUDE,
			latitudeDelta: LATITUDE_DELTA,
			longitudeDelta: LONGITUDE_DELTA,
			}
		};
	}

	componentDidMount()
	{
		var filenames= this.props.filenames;
		var urls = filenames.map(filename => 'https://sase-labs-2020.github.io/assets/directions/'+ filename);
		var responseJson = urls.map(url => fetch(url).then(response => response.json()));
		this.setState({
			isLoading: false,
			data: responseJson,
		});
	}

	render()
	{
		if (this.state.isLoading)
		{
			return(
				<View style={{flex: 1, padding: 20}}>
					<ActivityIndicator/>
				</View>
			);
		}
		
		return(
			<MapView region={this.state.Region}  style={styles.mapStyle}>
				{this.state.data.map(json => <Polyline coordinates={json.coordinates}/>)}
			</MapView>
		);
	}
}