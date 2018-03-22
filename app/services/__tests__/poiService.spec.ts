import { IOpenPlanetNode } from "@lonelyplanet/open-planet-node/dist/interfaces";
import PoiService from "../poiService";

describe("PoiService", () => {
  it("should be a thing", () => {
    expect(PoiService).toBeTruthy();
  });

  it("should fetch pois", async () => {
    const FakeClient = jest.fn<IOpenPlanetNode>(() => ({
      clientId: "1234",
      poi: {
        find: jest.fn(
          () => new Promise(resolve => resolve([{ name: "Café Du Monde" }]))
        )
      }
    }));
    const service = new PoiService(new FakeClient());
    const pois = await service.fetch();
    const [duMonde] = pois;

    expect(pois.length).toBe(1);
    expect(duMonde.name).toBe("Café Du Monde");
  });
});
