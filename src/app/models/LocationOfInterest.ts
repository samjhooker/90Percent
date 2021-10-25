export interface LoiProperties {
    id: string;
    Event: string;
    Location: string;
    City: string;
    Start: string;
    End: string;
    Advice: string;
    Added: string;
    Updated: string;
}

export interface LoiGeometry {
    type: string;
    coordinates: number[];
}

export interface LoiFeature {
    type: string;
    properties: LoiProperties;
    geometry: LoiGeometry;
}

export interface LocationOfInterest {
    type: string;
    name: string;
    features: LoiFeature[];
}