import React from 'react';
import { StyleSheet, Image, ScrollView, ImageSourcePropType } from 'react-native';

interface ImageViewerProps {
    placeholderImageSource: ImageSourcePropType;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ placeholderImageSource }) => {
    return (
        <ScrollView>
            <Image source={placeholderImageSource} style={styles.image} />
        </ScrollView>
    );
}

export default ImageViewer;

const styles = StyleSheet.create({
    image: {
        width: 320,
        height: 440,
    },
});
