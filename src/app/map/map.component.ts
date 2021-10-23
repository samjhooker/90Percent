import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

map: mapboxgl.Map | undefined;
  hoveredStateId: any = null;

  ngOnInit() {
    this.initMapbox();
  }

  getFeatureCenter(feature: any) {
    let center = [];
    let latitude = 0;
    let longitude = 0;
    let height = 0;
    let coordinates: any[] = [];
    feature.geometry.coordinates.forEach((c: any) => {
        let dupe = [];
        if (feature.geometry.type === "MultiPolygon")
            dupe.push(...c[0]); 
        else 
            dupe.push(...c); 
        dupe.splice(-1, 1);
        coordinates = coordinates.concat(dupe);
    });
    if (feature.geometry.type === "Point") {
        center = coordinates[0];
    }
    else {
        coordinates.forEach((c: any) => {
            latitude += c[0];
            longitude += c[1];
        });
        center = [latitude / coordinates.length, longitude / coordinates.length];
    }

    return center;
  }

  initMapbox() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.token,
      container: 'map',
      style: environment.mapbox.style
    });

    this.map?.on('load', () => {
      this.map?.addSource('allDhb', {
        'type': 'geojson',
        'data': '/assets/dbh.geojson'
      });

      this.map?.addLayer({
        'id': 'dhb-fills',
        'type': 'fill',
        'source': 'allDhb',
        'layout': {},
        'paint': {
          'fill-color': "rgba(167, 167, 167, 0.3)",
          'fill-opacity': [
            'case',
            ['boolean', ['feature-state', 'hover'], false],
            1,
            0,
          ],
          'fill-opacity-transition': {duration: 500, delay: 0},
        }
      });
    })

    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.map?.on('mousemove', 'dhb-fills', (e: any) => {
      if (e.features.length > 0) {
        if (this.hoveredStateId !== null) {
          this.map?.setFeatureState(
            { source: 'allDhb', id: this.hoveredStateId },
            { hover: false }
          );
        }
        this.hoveredStateId = e.features[0].id;
        const description = e.features[0].properties.DHB2015_Na + ' DHB';
        if (this.map) {
          popup.setLngLat(this.getFeatureCenter(e.features[0])).setHTML(description).addTo(this.map);
        }


        this.map?.setFeatureState(
          { source: 'allDhb', id: this.hoveredStateId },
          { hover: true }
        );
      }
    });

    this.map?.on('mouseleave', 'dhb-fills', () => {
      if (this.hoveredStateId !== null) {
        popup.remove();
        this.map?.setFeatureState(
          { source: 'allDhb', id: this.hoveredStateId },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
  }
}
