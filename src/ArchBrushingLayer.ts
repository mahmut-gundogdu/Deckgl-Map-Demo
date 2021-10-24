import { ArcLayer } from "@deck.gl/layers";

export class ArcBrushingLayer extends ArcLayer<any> {



  getShaders() {
    return Object.assign({}, super.getShaders(), {
      inject: {
        'vs:#decl': `uniform float coef;`,
        'vs:#main-end': `
          if (coef > 0.0) {
            vec4 pct = vec4(segmentRatio);
            pct.a = step(coef, segmentRatio);
            vec4 colorA = instanceTargetColors;
            vec4 colorB = vec4(instanceTargetColors.r, instanceTargetColors.g, instanceTargetColors.b, 0.0);
            vec4 color = mix(instanceSourceColors, colorB, pct.a);
            vColor = color;
            DECKGL_FILTER_COLOR(vColor, geometry);
          }
        `,
      },
    });
  }

  draw(opts: any) {
    const { coef } = (<any>this).props

    this.state.model.setUniforms({ coef });;
    super.draw(opts);
  }


}