import * as React from "react";
import Home from "./components/index";
import { Button, Heading, CalloutLink } from "backpack-ui";
import TextBodySmall from "backpack-ui/dist/components/text/textBodyArticle";
import StaticMap from "backpack-ui/dist/components/staticMap";
import IPoi from "@lonelyplanet/open-planet-node/dist/resources/poi";
import * as fetch from "isomorphic-fetch";
import * as styles from "./styles/home.css";
import { LPLogo } from "./components/logo";

export interface ILunchTimeProps {
  poi: IPoi;
}

export interface ILunchTimeState {
  poi: IPoi;
  location: number[];
}

class LunchTime extends React.Component<ILunchTimeProps, ILunchTimeState> {
  constructor(props: ILunchTimeProps) {
    super(props);

    this.state = {
      poi: props.poi,
      location: null
    };
  }

  public onClickFindNear = async () => {
    const location = await this.fetchLocation();

    this.setState(
      {
        location
      },
      () => {
        this.fetchPoi(location);
      }
    );
  };

  public fetchLocation() {
    return new Promise<number[]>((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(function(position) {
        resolve([position.coords.latitude, position.coords.longitude]);
      });
    });
  }

  public onClick = () => {
    this.fetchPoi(this.state.location);
  };

  public async fetchPoi(location?) {
    const response = await fetch(
      `/api/fetch${location ? `?lat=${location[0]}&lon=${location[1]}` : ""}`
    );
    const poi = await response.json();

    this.setState({
      poi
    });
  }

  public render() {
    const { poi } = this.state;

    return (
      <div className={styles.app}>
        <div className={styles.content}>
          <Heading
            level={1}
            override={{ fontSize: "32px", marginBottom: "16px" }}
          >
            Lonely Planet's eats finder
          </Heading>

          <Heading level={5} override={{ fontSize: "24px" }}>
            <a
              href={`https://www.lonelyplanet.com/a/poi/${poi.id}/${
                poi.containingPlaceId
              }`}
            >
              {poi.name}
            </a>
          </Heading>

          {poi.images.length > 0 && (
            <div>
              <img src={poi.images[0].path} />
            </div>
          )}

          <div>
            <div
              dangerouslySetInnerHTML={{
                __html: poi.review.essential
              }}
            />
          </div>
          {poi.website && (
            <div className={styles.info}>
              <a href={`tel:${poi.website}`}>{poi.website}</a>
            </div>
          )}

          {poi.telephone && (
            <div className={styles.info}>
              <CalloutLink href={`tel:${poi.telephone.national}`}>
                {poi.telephone.national}
              </CalloutLink>
            </div>
          )}

          {poi.location && (
            <div className={styles.info}>
              <img
                src={
                  "http://api.tiles.mapbox.com/v4/lonelyplanet.b963d424/" +
                  "url-https%3A%2F%2Fassets.staticlp.com%2Fassets%2FmapPin-primary-small.png" +
                  `(${poi.location.coordinates.join(
                    ","
                  )}})/${poi.location.coordinates.join(",")},15` +
                  "/640x480.png?access_token=pk.eyJ1IjoibG9uZWx5cGxhbmV0IiwiYSI6Imh1ODUtdUEifQ.OLLon0V6rcoTyayXzzUzsg"
                }
              />
            </div>
          )}

          <div>
            <Button onClick={this.onClick}>Shuffle</Button>
          </div>

          <div style={{ marginTop: "16px" }}>
            <Button onClick={this.onClickFindNear}>Find near me</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default LunchTime;
