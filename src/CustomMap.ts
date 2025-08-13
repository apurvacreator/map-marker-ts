/// <reference types="@types/google.maps" />

export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(elementId: string) {
    this.googleMap = new google.maps.Map(
      document.getElementById(elementId) as HTMLElement,
      {
        zoom: 1,
        center: {
          lat: 0,
          lng: 0,
        },
        mapId: 'DEMO_MAP_ID',
      }
    );
  }

  private createMarkerPin(
    color: string
  ): google.maps.marker.PinElement {
    return new google.maps.marker.PinElement({
      background: color,
      borderColor: color,
      glyphColor: '#fff',
    });
  }

  addMarker(mappable: Mappable): void {
    const pinElement = this.createMarkerPin(mappable.color);

    const marker =
      new google.maps.marker.AdvancedMarkerElement({
        map: this.googleMap,
        position: {
          lat: mappable.location.lat,
          lng: mappable.location.lng,
        },
        content: pinElement.element,
      });
    marker.addListener('click', () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent(),
      });

      infoWindow.open(this.googleMap, marker);
    });
  }
}
