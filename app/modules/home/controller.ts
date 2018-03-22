import {
  Controller,
  inject,
  get,
  post,
} from "@lonelyplanet/travel-agent";
import IPoi from "@lonelyplanet/open-planet-node/dist/resources/poi";
import {
  IPoiService,
} from "../../services/poiService";
import * as TYPES from "../../types";

function shuffle(arr) {
  var j, x, i;
  for (i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = arr[i];
      arr[i] = arr[j];
      arr[j] = x;
  }
}

export default class HomeController extends Controller {
  public poi: IPoiService;

  constructor(@inject(TYPES.PoiService) poi?: IPoiService) {
    super();

    this.poi = poi;
  }

  @get("/")
  public async show() {
    const pois = await this.poi.fetch();

    shuffle(pois);

    const [poi] = pois;

    this.response.render("home", { poi, userAgent: this.request.headers["user-agent"] });
  }

  @get("/api/fetch")
  public async json() {
    const req = this.request;

    let pois: IPoi[];
    if (req.query.lat && req.query.lon) {
      pois = await this.poi.fetchByLatLon([req.query.lat, req.query.lon]);
    } else {
      pois = await this.poi.fetch();
    }

    shuffle(pois);

    const [poi] = pois;
    this.response.json({ ...poi, });
  }
}
