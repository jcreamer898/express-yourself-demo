import "reflect-metadata";
import start from "@lonelyplanet/travel-agent";
import createClient from "@lonelyplanet/open-planet-node";
import { IOpenPlanetNode } from "@lonelyplanet/open-planet-node/dist/interfaces";
import PoiService, { IPoiService } from "./services/poiService";
import * as TYPES from "./types";

const app = start();

app.bind<IOpenPlanetNode>(TYPES.OpenPlanetNode).toFactory(() => {
  return createClient();
});
app.bind<IPoiService>(TYPES.PoiService).to(PoiService);

