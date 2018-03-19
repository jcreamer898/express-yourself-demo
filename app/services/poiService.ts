import { injectable } from "@lonelyplanet/travel-agent";
import * as fetch from "isomorphic-fetch";

export interface IPoi {
  attributes: {
    location: {
      coordinates: number[],
      type: "Point",
    }
    name: string;
    website: string;
    price_range: string;
    review: {
      essential: string,
      extension: string,
    };
    telephone: {
      national: string,
    };
    subtypes: string[];
  },
  id: string;
  relationships: { [key: string]: any }
  links: { [key: string]: string }
  type: "poi";
}

export interface IPoiResponse {
  data: IPoi[];
  links: { [key: string]: string };
}

export interface IPoiService {
  fetch(): Promise<IPoiResponse>;
  fetchByLatLon(location): Promise<IPoiResponse>;
}

@injectable()
export default class PoiService implements IPoiService {
  public baseUrl: string = process.env.API_HOST;

  public async fetch() {
    const url = `${this.baseUrl}/pois?filter[poi][place_id][has_ancestor]=362207&page[limit]=1&filter[poi][poi_type][equals]=eating`;

    const response = await fetch(url);
    const pois: IPoiResponse = await response.json();

    return pois;
  }

  public async fetchByLatLon(location) {
    const [lat, lon] = location;
    const url = `${this.baseUrl}/pois?filter[distance][near]=${lon},${lat}&page[limit]=1&filter[poi][poi_type][equals]=eating`;

    const response = await fetch(url);
    const pois: IPoiResponse = await response.json();

    return pois;
  }
}
