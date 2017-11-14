import "reflect-metadata";
import start from "@lonelyplanet/travel-agent";
import PoiService from "./services/poiService";

const app = start();

app.bind("PoiService").to(PoiService);
