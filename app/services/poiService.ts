import { injectable, inject } from "@lonelyplanet/travel-agent";
import IPoi from "@lonelyplanet/open-planet-node/dist/resources/poi";
import { IOpenPlanetNode } from "@lonelyplanet/open-planet-node/dist/interfaces";
import * as fs from "fs";
import * as path from "path";
import * as fetch from "isomorphic-fetch";
import * as TYPES from "../types";

const poisJson = fs.readFileSync(path.join(process.cwd(), "pois.json")).toString();
const cached: IPoi[] = JSON.parse(poisJson);

export interface IPoiResponse {
  data: IPoi[];
  links: { [key: string]: string };
}

export interface IPoiService {
  fetch(): Promise<IPoi[]>;
  fetchByLatLon(location): Promise<IPoi[]>;
}

@injectable()
export default class PoiService implements IPoiService {
  private baseUrl: string = process.env.OPEN_PLANET_HOST;
  private client: IOpenPlanetNode;

  constructor(@inject(TYPES.OpenPlanetNode) client: IOpenPlanetNode) {
    this.client = client;
  }

  public async fetch() {
    // Uncomment in case internet asplodes... ಠ_ಠ
    // if (cached) {
    //   return cached;
    // }

    const newOrleansPlaceId = 362207;

    const pois: IPoi[] = await this.client.poi.find({
      place_id: {
        has_ancestor: newOrleansPlaceId,
      },
      poi_type: "eating",
      include: ["image-associations.from"],
      limit: 50,
    });

    return pois;
  }

  public async fetchByLatLon(location) {
    const [lat, lon] = location;
    const url = `${this.baseUrl}/pois?filter[distance][near]=${lon},${lat}&page[limit]=1&filter[poi][poi_type][equals]=eating`;

    const response = await fetch(url);
    const pois: IPoi[] = await response.json();

    return pois;
  }
}
