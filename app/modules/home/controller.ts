import {
  Controller,
  inject,
  get,
  post,
} from "@lonelyplanet/travel-agent";
import {
  IPoiService,
} from "../../services/poiService";

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

  constructor(@inject("PoiService") poi?: IPoiService) {
    super();

    this.poi = poi;
  }

  @get("/")
  public async show() {
    const response = await this.poi.fetch();
    const pois = response.data;

    shuffle(pois);

    const [poi] = pois;
    this.response.render("home", { poi, });
  }

  @get("/api/fetch")
  public async json() {
    const req = this.request;

    let response;
    if (req.query.lat && req.query.lon) {
      response = await this.poi.fetchByLatLon([req.query.lat, req.query.lon]);
    } else {
      response = await this.poi.fetch();
    }

    const pois = response.data;

    shuffle(pois);

    const [poi] = pois;
    this.response.json({ ...poi, });
  }
}
