import * as React from "react";
import Home from "./components/index";
import { Button, Heading, CalloutLink } from "backpack-ui";
import TextBodySmall from "backpack-ui/dist/components/text/textBodyArticle";
import { IPoi } from "../../services/poiService";
import * as fetch from "isomorphic-fetch";

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
      <div style={{ width: "50%", margin: "10% auto" }}>
        <Heading
          level={1}
          override={{ fontSize: "32px", marginBottom: "16px" }}
        >
          Lonely Planet's eats finder
        </Heading>

        <Heading level={4} override={{ fontSize: "24px" }}>
          {poi.attributes.name}
        </Heading>
        <TextBodySmall>
          <div
            dangerouslySetInnerHTML={{
              __html: poi.attributes.review.essential
            }}
          />
        </TextBodySmall>

        {poi.attributes.website && (
          <div style={{ marginTop: "16px", marginBottom: "16px" }}>
            <a href={`tel:${poi.attributes.website}`}>
              {poi.attributes.website}
            </a>
          </div>
        )}

        {poi.attributes.telephone && (
          <div style={{ marginTop: "16px", marginBottom: "16px" }}>
            <CalloutLink href={`tel:${poi.attributes.telephone.national}`}>
              {poi.attributes.telephone.national}
            </CalloutLink>
          </div>
        )}

        <div>
          <Button onClick={this.onClick}>Shuffle</Button>
        </div>

        <div style={{ marginTop: "16px" }}>
          <Button onClick={this.onClickFindNear}>Find near me</Button>
        </div>
      </div>
    );
  }
}

export default LunchTime;
