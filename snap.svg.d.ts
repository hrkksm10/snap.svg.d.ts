// Type definitions for Snap.svg Javascript SVG library 0.3.0
// Project: http://snapsvg.io/

interface SVGElement {

    snap: string;
}

interface SnapBBox {

    cx?: number;     // x of the center
    cy?: number;     // y of the center
    h?: number;      // height
    height: number; // height
    path?: any;      // path command for the box
    r0?: number;     // radius of a circle that fully encloses the box
    r1?: number;     // radius of the smallest circle that can be enclosed
    r2?: number;     // radius of the largest circle that can be enclosed
    vb?: string;     // box as a viewbox command
    w?: number;      // width
    width: number;  // width
    x2: number;     // x of the right side
    x: number;      // x of the left side
    y2: number;     // y of the bottom edge
    y: number;      // y of the top edge
}

interface SnapMatrix {

    a: number;
    b: number;
    c: number;
    d: number;
    e: number;
    f: number;

    add(matrix: SnapMatrix): SnapMatrix;
    add(a: number, b: number, c: number, d: number, e: number, f: number): SnapMatrix;

    invert(): SnapMatrix;

    clone(): SnapMatrix;

    translate(x :number, y: number): SnapMatrix;

    scale(x: number, y?: number, cx?: number, cy?: number): SnapMatrix;

    rotate(a: number, x?: number, y?: number): SnapMatrix;

    x(x: number, y: number): SnapMatrix;
    y(x: number, y: number): SnapMatrix;

    toString(): string;

    determinant(): number;

    split():
        {
            dx: number;
            dy: number;
            scalex: number;
            scaley: number;
            shear: number;
            rotate: number;
            isSimple: boolean;
        };

    toTransformString(): string;
}

interface SnapFragment {

    node: DocumentFragment;

    select(query: string): SnapElement;
    selectAll(query: string): SnapSet;
}

interface SnapPathSegments extends Array<any[]> {

    toString(): string;
}

interface SnapAnimation {

    attr: any;
    ms: number;
    easing: Function;
    callback: Function;
}

interface SnapAnim {

    id: string;         // animation id,
    start:  number;     // start _slave_ number,
    end: number;        // end _slave_ number,
    b: number;          // start _master_ number,
    s: number;          // animation status (0..1),
    dur: number;        // animation duration,
    spd: number;        // animation speed,
    get: Function;      // getter of _master_ number (see @mina.time),
    set: Function;      // setter of _slave_ number,
    easing: Function;   // easing function, default is @mina.linear,
    status: Function;   // status getter/setter,
    speed: Function;    // speed getter/setter,
    duration: Function; // duration getter/setter,
    stop: Function;     // animation stopper
    pause: Function;    // pauses the animation
    resume: Function;   // resumes the animation
    update: Function;   // calles setter with the right value of the animation
}

interface SnapGenericElement<TElement> {

    node: SVGElement;
    paper: SnapPaper;
    id: string;
    type: string;

    // core
    attr(attrName: 'viewBox'): SnapBBox;
    attr(attrName: string): any;
    attr(attrName: string, value: any): TElement;
    attr(params: {viewBox?: number[]}): TElement;

    append(element: SnapElement): TElement;
    append(set: SnapSet): TElement;
    append(fragment: SnapFragment): TElement;

    appendTo(element: HTMLElement): TElement;
    appendTo(element: SnapElement): TElement;
    appendTo(set: SnapSet): TElement;
    appendTo(fragment: SnapFragment): TElement;

    prepend(element: SnapElement): TElement;
    prepend(set: SnapSet): TElement;
    prepend(fragment: SnapFragment): TElement;

    prependTo(element: HTMLElement): TElement;
    prependTo(element: SnapElement): TElement;
    prependTo(set: SnapSet): TElement;
    prependTo(fragment: SnapFragment): TElement;

    before(element: SnapElement): TElement;
    before(set: SnapSet): TElement;
    before(fragment: SnapFragment): TElement;

    insertBefore(element: SnapElement): TElement;
    insertBefore(set: SnapSet): TElement;
    insertBefore(fragment: SnapFragment): TElement;

    after(element: SnapElement): TElement;
    after(set: SnapSet): TElement;
    after(fragment: SnapFragment): TElement;

    insertAfter(element: SnapElement): TElement;
    insertAfter(set: SnapSet): TElement;
    insertAfter(fragment: SnapFragment): TElement;

    select(query: string): TElement;
    selectAll(query: string): SnapSet;

    toPattern(x: number, y: number, width: number, height: number): SnapPattern;

    toString(): string;

    remove(): TElement;

    getBBox(isWithoutTransform?: boolean): SnapBBox;

    parent(): SnapElement;

    use(): SnapElement;

    transform():
        {
            string: string;
            globalMatrix: SnapMatrix;
            localMatrix: SnapMatrix;
            diffMatrix: SnapMatrix;
            global: string;
            local: string;
            toString: () => string;
        };
    transform(tstr: string): TElement;
    transform(matrix: SnapMatrix): TElement;
    asPX(attr: string, value: string): number;
    addClass(value: string): TElement;
    removeClass(value: string): TElement;
    hasClass(value: string): boolean;
    toggleClass(value: string, flag?: boolean): TElement;
    clone(): TElement;
    toDefs(): SnapElement;
    marker(x: number, y: number, width: number, height: number, refX: number, refY: number): SnapElement;
    inAnim():
        {
            anim: SnapAnimation;
            mina: SnapAnim;
            curStatus: number;
            status: Function;
            stop: Function;
        }[];
    stop(): TElement;
    animate(attrs: {}, ms: number, easing: Function, callback?: Function): TElement;

    data(key: string, value: any): TElement;
    data(data: {}): TElement;
    data(key: string): any;
    data(): any;
    removeData(key?: string): TElement;

    outerSVG(): string;
    innerSVG(): string;

    getTotalLength(): number;
    getPointAtLength(length: number):
        {
            x: number;
            y: number;
            alpha: number;
        };
    getSubpath(from: number, to: number): string;

    // mouse event

    click(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    unclick(handler?: Function): SnapElement;

    dblclick(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    undblclick(handler?: Function): SnapElement;

    mousedown(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    unmousedown(handler?: Function): SnapElement;

    mousemove(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    unmousemove(handler?: Function): SnapElement;

    mouseout(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    unmouseout(handler?: Function): SnapElement;

    mouseover(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    unmouseover(handler?: Function): SnapElement;

    mouseup(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    unmouseup(handler?: Function): SnapElement;

    touchstart(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    untouchstart(handler?: Function): SnapElement;

    touchmove(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    untouchmove(handler?: Function): SnapElement;

    touchend(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    untouchend(handler?: Function): SnapElement;

    touchcancel(handler: (event: MouseEvent, x: number, y: number) => any, scope?: any): SnapElement;
    untouchcancel(handler?: Function): SnapElement;

    hover(f_in: (event: MouseEvent, x: number, y: number) => any,
          f_out: (event: MouseEvent, x: number, y: number) => any,
          scope_in0?: any, scope_out?: any): SnapElement;
    unhover(f_in?: Function, f_out?: Function): SnapElement;

    drag(onmove: (dx: number, dy: number, x: number, y: number, event: DragEvent) => void,
         onstart: (x: number, y: number, event: DragEvent) => void,
         onend: (event: DragEvent) => void,
         move_scope?: any, start_scope?: any, end_scope?: any): SnapElement;
    undrag(): SnapElement;
}

interface SnapGenericPaper<TPaper> extends SnapGenericElement<TPaper> {
    // core
    el(tagName: string, attr?: {}): SnapElement;

    // plugin
    g(attr?: {}): SnapG;
    g(...elements: SnapElement[]): SnapG;

    svg(attr?: {}): SnapPaper;
    svg(x: number, y: number, width: number, height: number, vbx?: number, vby?: number, vbw?: number, vbh?: number): SnapPaper;

    use(id?: string): SnapElement;
    use(element?: SnapElement): SnapElement;

    circle(attr?: {cx: number; cy: number; r: number}): SnapElement;
    circle(cx: number, cy: number, r: number): SnapElement;

    rect(attr?: {x: number; y: number; width: number; height: number; rx?: number; ry?: number}): SnapElement;
    rect(x: number, y: number, width: number, height: number, rx?: number, ry?: number): SnapElement;

    image(attr?: {src: string; x: number; y: number; width?: number; height?: number}): SnapElement;
    image(src: string, x: number, y: number, width?: number, height?: number): SnapElement;

    ellipse(attr?: {cx: number; cy: number; rx: number; ry: number}): SnapElement;
    ellipse(cx: number, cy: number, rx: number, ry: number): SnapElement;

    path(attr?: {d: any}): SnapElement;
    path(pathString: string): SnapElement;
    path(pathSegments: SnapPathSegments): SnapElement;
    // path(pathArray: any[][]): SnapElement;

    text(attr?: {x?: number; y?: number; text?: any}): SnapElement; // text => string or string[]
    text(x: number, y: number, text?: string): SnapElement;
    text(x: number, y: number, textArray?: string[]): SnapElement;

    line(attr?: {x1: number; y1: number; x2: number; y2: number}): SnapElement;
    line(x1: number, y1: number, x2: number, y2: number): SnapElement;

    polyline(attr?: {points: number[]}): SnapElement;
    polyline(points: number[]): SnapElement;
    polyline(...points: number[]): SnapElement;

    polygon(attr?: {points: number[]}): SnapElement;
    polygon(points: number[]): SnapElement;
    polygon(...points: number[]): SnapElement;

    gradient(gradient: string): SnapElement;

    filter(filter: string): SnapElement;

    clear(): void;

    toString(): string;
}

interface SnapElement extends SnapGenericElement<SnapElement> {}
interface SnapPaper extends SnapGenericPaper<SnapPaper> {}

interface SnapG extends SnapGenericPaper<SnapG> {

    mask(attr?: {}): SnapMask;
    mask(...elements: SnapElement[]): SnapMask;

    ptrn(attr?: {}): SnapPattern;
    ptrn(x: number, y: number, width: number, height: number, vbx?: number, vby?: number, vbw?: number, vbh?: number): SnapPattern;

    add(element: SnapElement): SnapG;
    add(...elements: SnapElement[]): SnapG;
}
interface SnapMask extends SnapGenericPaper<SnapMask> {

    ptrn(attr?: {}): SnapPattern;
    ptrn(x: number, y: number, width: number, height: number, vbx?: number, vby?: number, vbw?: number, vbh?: number): SnapPattern;

}
interface SnapPattern extends SnapGenericPaper<SnapPattern> {

    mask(attr?: {}): SnapMask;
    mask(...elements: SnapElement[]): SnapMask;
}

interface SnapSet {

    length: number;

    push(...elements: SnapElement[]): SnapSet;
    pop(): SnapElement;
    forEach(callback: (element: SnapElement, idx: number) => void, thisArg?: any): SnapSet;
    animate(attrs: {}, ms: number, easing: Function, callback?: Function): SnapSet;
    animate(array: any[]): SnapSet;
    animate(animation: SnapAnimation): SnapSet;
    remove(): SnapSet;
    bind(attrName: string, element: SnapElement, e_attr: string): SnapSet;
    bind(attrName: string, callback: Function): SnapSet;
    attr(params: {}): SnapSet;
    clear(): void;
    splice(index: number, count: number, insertion: any): SnapSet;
    exclude(element: SnapElement): boolean;
    insertAfter(element: SnapElement): SnapSet;
    getBBox(): SnapBBox;
    clone(): SnapSet;
}

interface SnapStatic {

    (selector: string): SnapPaper;
    (svgSvgElement: SVGSVGElement): SnapPaper;
    (width: number, height: number): SnapPaper;
    (width: string, height: string): SnapPaper;
    (svgElement: SVGElement): SnapElement;

    ajax(url: string, postData: string, callback: (request: XMLHttpRequest) => void, scope?: any): XMLHttpRequest;
    ajax(url: string, postData: {}, callback: (request: XMLHttpRequest) => void, scope?: any): XMLHttpRequest;
    ajax(url: string, callback: (request: XMLHttpRequest) => void, scope?: any): XMLHttpRequest;
    load(url: string, callback: (fragment: SnapFragment) => void, scope?: any): void;

    parse(svgSource: string): SnapFragment;
    fragment(...svgSources: string[]): SnapFragment;
    fragment(...sources: any[]): SnapFragment; // source: svgSource or SnapElement

    set(): SnapSet;
    set(...elements: SnapElement[]): SnapSet;

    Matrix: {
        new(svgMatrix?: SVGMatrix): SnapMatrix;
        new(a: number, b: number, c: number, d: number, e: number, f: number): SnapMatrix;
    };
    format(token: string, array: any[]): string;
    format(token: string, json: {}): string;
    rad(deg: number): number;
    deg(rad: number): number;
    angle(x1: number, y1: number, x2: number ,y2: number, x3?: number, y3?: number): number;
    is(value: any, type: string): boolean;
    snapTo(values: number[], value: number, tolerance?: number): number;
    snapTo(values: number, value: number, tolerance?: number): number;
    getRGB(color: string):
        {
            r: number;
            g: number;
            b: number;
            hex: string;
            error: boolean;
        };
    hsb(h: number, s: number, b: number): string;
    hsl(h: number, s: number, l: number): string;
    rgb(r: number, g: number, b: number): string;
    color(clr: string):
        {
            r: number;
            g: number;
            b: number;
            hex: string;
            error: boolean;
            h: number;
            s: number;
            v: number;
            l: number;
        };
    hsb2rbg(h: number, s: number, b: number, opacity: number):
        {
            r: number;
            g: number;
            b: number;
            hex: string;
        };
    hsl2rgb(h: number, s: number, l: number, opacity: number):
        {
            r: number;
            g: number;
            b: number;
            hex: string;
        };
    rgb2hsb(r: number, g: number, b: number):
        {
            h: number;
            s: number;
            b: number;
        };
    rgb2hsl(r: number, g: number, b: number):
        {
            h: number;
            s: number;
            l: number;
        };
    getElementByPoint(mouseX: number, mouseY: number): SnapElement;
    plugin;

    matrix(svgMatrix?: SVGMatrix): SnapMatrix;
    matrix(a: number, b: number, c: number, d: number, e: number, f: number): SnapMatrix;

    filter : {
        blur(x?: number, y?: number): string;

        shadow(dx: number, dy: number, blur: number, color: string, opacity? :number): string;
        shadow(dx: number, dy: number, color: string, opacity?: number): string;
        shadow(dx: number, dy: number, opacity?: number): string;

        grayscale(amount: number): string;

        sepia(amount: number): string;

        saturate(amount: number): string;

        hueRotate(angle: number): string;

        invert(amount: number): string;

        brightness(amount: number): string;

        contrast(amount: number): string;
    };

    parsePathString(pathString: string): SnapPathSegments;
    parsePathString(pathArray: any[]): SnapPathSegments;
    parseTransformString(tstr: string): any[];

    path: {
        getTotalLength(path: string): number;
        getPointAtLength(path: string, length: number):
            {
                x: number;
                y: number;
                alpha: number;
            };
        getSubpath(path: string, from: number, to: number): string;
        findDotsAtSegment(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number, t: number):
            {
                x: number;
                y: number;
                m: {
                    x: number;
                    y: number;
                }
                n: {
                    x: number;
                    y: number;
                }
                start: {
                    x: number;
                    y: number;
                }
                end: {
                    x: number;
                    y: number;
                }
                alpha: number;
            };
        bezierBBox(p1x: number, p1y: number, c1x: number, c1y: number, c2x: number, c2y: number, p2x: number, p2y: number): SnapBBox;
        isPointInsideBBox(bbox: SnapBBox, x: number, y: number): boolean;
        isBBoxIntersect(bbox1: SnapBBox, bbox2: SnapBBox): boolean;
        intersection(path1: string, path2: string):
            {
                x: number;
                y: number;
                t1: number;
                t2: number;
                segment1: number;
                segment2: number;
                bez1: any[];
                bez2: any[];
            }[];
        intersectionNumber(path1: string, path2: string): number;
        isPointInside(path: string, x: number, y: number): boolean;
        getBBox(path: string): SnapBBox;
        toRelative(path: string): SnapPathSegments;
        toAbsolute(path: string): SnapPathSegments;
        toCubic(path: string): SnapPathSegments;
        map(path: string, matrix: SnapMatrix): SnapPathSegments;
        toString(): string;
        clone(): SnapPathSegments;
    };

    animation(attr: {}, ms: number, easing?: Function, callback?: Function): SnapAnimation;
    animate(from: number, to: number, setter: Function, duration: number, easing?: Function, callback?: Function): SnapAnim;
}

interface MinaStatic {

    (a: number, A: number, b: number, B: number, get: Function, set: Function, easing?: Function): SnapAnim;

    time(): number;

    linear: Function;
    easein: Function;
    easeout: Function;
    backin: Function;
    backout: Function;
    bounce: Function;
    elastic: Function;
}

declare module "snap.svg" {

    export = Snap;
}
declare var Snap: SnapStatic;
declare var mina: MinaStatic;