import { easeBackOut } from "d3";
import { ScatterplotLayer } from "@deck.gl/layers";
import { Library } from "./types";

export const getScatterplotLayer = (libraries: Library[]) => {

    return new ScatterplotLayer({
        id: 'scatterplot-layer',
        data: libraries,
        getRadius: 5000,
        radiusMaxPixels: 15,
        getFillColor: [255, 99, 71],
        transitions: {
            getRadius: {
                duration: 1000,
                type: 'interpolation',
                easing: easeBackOut,
            },
        },
        pickable: true,
        onClick: info => console.log(info.object),
        autoHighlight: true,
    })
}