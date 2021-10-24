import { FC, useMemo } from 'react';
import DeckGL from '@deck.gl/react';
import { StaticMap } from 'react-map-gl';
import { useLayerData } from './useLayerData';
import { getScatterplotLayer } from './getScatterplotLayer';
import { ArcBrushingLayer } from './ArchBrushingLayer';
import { animated, useSpring } from 'react-spring'
import { pairs, shuffle } from 'd3';
import { Library } from './types';

export const usa = {
    longitude: -98.12078906038815,
    latitude: 39.07050154936433,
    zoom: 3.847,
    pitch: 41.8,
    bearing: 0.7,
  };
  

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = process.env.REACT_APP_MAP_API_KEY

type MapProps = {
    arcsEnabled: boolean
}
type Props = { libraries: Library[], coef: number, libraryLinks: any[] }
const MapComponent: FC<Props> = ({ coef, libraries, libraryLinks, }) => {

    const createArcLayer = (arcs: any, arcCoef: number) => (new ArcBrushingLayer({
        id: 'arc-layer',
        data: arcs,
        getSourcePosition: (d: any) => d[0].position,
        getTargetPosition: (d: any) => d[1].position,
        getSourceColor: [0, 255, 0],
        getTargetColor: [0, 200, 200],
        getWidth: 3,
        visible: arcCoef > 1e-6,
        coef: arcCoef,
    } as any))

    const dotsLayer = useMemo(() => getScatterplotLayer(libraries), [libraries])
    const arch = createArcLayer(libraryLinks, (coef))
    const layers = [dotsLayer, arch]

    return (
        <DeckGL
            initialViewState={usa}
            controller={true}
            layers={layers} >
            <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
        </DeckGL>
    )
}

const AnimatedMap = animated(MapComponent)

export const Map: FC<MapProps> = ({ arcsEnabled }) => {
    const libraries = useLayerData()

    const styles = useSpring({ opacity: arcsEnabled ? 1 : 1E-9 });

    const libraryLinks = useMemo(() => {
        return pairs(shuffle(libraries.slice()).slice(0, 100));
    }, [libraries]);
    return (
        <AnimatedMap libraries={libraries} libraryLinks={libraryLinks} coef={styles.opacity} />
    );

}

