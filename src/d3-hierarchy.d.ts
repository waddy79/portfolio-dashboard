declare module "d3-hierarchy" {
  export interface HierarchyNode<Datum> {
    data: Datum;
    depth: number;
    height: number;
    parent: HierarchyNode<Datum> | null;
    children?: HierarchyNode<Datum>[];
    value?: number;
    x0?: number;
    y0?: number;
    x1?: number;
    y1?: number;
    leaves(): HierarchyNode<Datum>[];
    sum(value: (d: Datum) => number): this;
    sort(comparator: (a: HierarchyNode<Datum>, b: HierarchyNode<Datum>) => number): this;
    each(callback: (node: HierarchyNode<Datum>) => void): this;
    eachBefore(callback: (node: HierarchyNode<Datum>) => void): this;
    eachAfter(callback: (node: HierarchyNode<Datum>) => void): this;
    ancestors(): HierarchyNode<Datum>[];
    descendants(): HierarchyNode<Datum>[];
    links(): Array<{ source: HierarchyNode<Datum>; target: HierarchyNode<Datum> }>;
    copy(): HierarchyNode<Datum>;
  }

  export interface TreemapLayout<Datum> {
    (root: HierarchyNode<Datum>): HierarchyNode<Datum>;
    tile(): (node: HierarchyNode<Datum>, x0: number, y0: number, x1: number, y1: number) => void;
    tile(tile: (node: HierarchyNode<Datum>, x0: number, y0: number, x1: number, y1: number) => void): this;
    size(): [number, number];
    size(size: [number, number]): this;
    round(): boolean;
    round(round: boolean): this;
    padding(): number;
    padding(padding: number): this;
    paddingInner(): number;
    paddingInner(padding: number): this;
    paddingOuter(): number;
    paddingOuter(padding: number): this;
    paddingTop(): number;
    paddingTop(padding: number): this;
    paddingRight(): number;
    paddingRight(padding: number): this;
    paddingBottom(): number;
    paddingBottom(padding: number): this;
    paddingLeft(): number;
    paddingLeft(padding: number): this;
  }

  export function hierarchy<Datum>(
    data: Datum,
    children?: (d: Datum) => Datum[] | null | undefined
  ): HierarchyNode<Datum>;

  export function treemap<Datum>(): TreemapLayout<Datum>;

  export function treemapSquarify(
    node: HierarchyNode<unknown>,
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): void;

  export function treemapBinary(
    node: HierarchyNode<unknown>,
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): void;

  export function treemapDice(
    node: HierarchyNode<unknown>,
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): void;

  export function treemapSlice(
    node: HierarchyNode<unknown>,
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): void;

  export function treemapSliceDice(
    node: HierarchyNode<unknown>,
    x0: number,
    y0: number,
    x1: number,
    y1: number
  ): void;
}
