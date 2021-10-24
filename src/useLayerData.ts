import { useEffect, useState } from "react";
import { csv } from 'd3';
import { Library } from './types'

export const useLayerData = () => {
    const [libraries, setLibraries] = useState<Library[]>([]);

    useEffect(() => {
        csv('/data/public_libraries.csv', (d: any, id: number) => ({
            id,
            state: d['State'] as string,
            position: [+d['Longitude'], +d['Latitude']] as [number, number],
        }))
            .then((libraries) =>
                libraries.filter(d => d.position[0] != null && d.position[1] != null)
            )
            .then(setLibraries);
    }, []);

    useEffect(() => console.log('Libs', libraries), [libraries])

    return libraries
}