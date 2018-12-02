import React, { Component } from 'react';
import { Image } from 'react-native';
import { View } from 'native-base';

export default class FullWidthImage extends Component {
	constructor() {
		super();

		this.state = {
			width: 0,
			height: 0
		};
	}

	_onLayout(event) {
    const containerWidth = event.nativeEvent.layout.width;

		if (this.props.ratio) {
			this.setState({
				width: containerWidth,
				height: containerWidth * this.props.ratio
			});
		} else {
			Image.getSize(this.props.source.uri, (width, height) => {
				this.setState({
					width: containerWidth,
					height: containerWidth * height / width
				});
			});
		}
	}

	render() {
		return (
			<View onLayout={e => this._onLayout(e)}>
				<Image
					source={this.props.source}
					style={{
						width: this.state.width,
						height: this.state.height
					}} />
			</View>
		);
	}
}