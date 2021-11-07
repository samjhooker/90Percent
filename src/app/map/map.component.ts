import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as mapboxgl from 'mapbox-gl';
import { environment } from 'src/environments/environment';
import { MapService } from '../map.service';
import { LocationOfInterest } from '../models/LocationOfInterest';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  map: mapboxgl.Map | undefined;
  hoveredStateId: any = null;
  selectedStateIds = [];
  locationsOfInterestLoaded = false;

  constructor(private router: Router, private mapService: MapService) { }

  ngOnInit() {
    this.initMapbox();
  }

  navigateToDhbVaccinations(dhbName: string) {
    this.router.navigate([`/vaccinations/${dhbName}`]);
  }

  navigateToLocationOfInterest(loiId: string) {
    this.router.navigate([`/locationsOfInterest/${loiId}`]);
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

  setupMapChangeListener() {
    this.mapService.getSelectedDhb().subscribe((selectedDhb: string) => {
      let features = this.map?.querySourceFeatures('allDhb', {
        sourceLayer: 'dhb-fills'
      });

      features?.forEach((feature) => {
        if (feature.properties?.GroupedDHB == selectedDhb) {
          this.map?.setFeatureState(
            { source: 'allDhb', id: feature.id },
            { selected: true }
          );
        } else {
          this.map?.setFeatureState(
            { source: 'allDhb', id: feature.id },
            { selected: false }
          );
        }
      });
    });

    this.mapService.showLocationsOfInterest$.subscribe((showLocationsOfInterest: boolean) => {
      if (showLocationsOfInterest) {
        this.map?.setLayoutProperty('dhb-fills', 'visibility', 'none');
        if (this.locationsOfInterestLoaded){
          this.map?.setLayoutProperty('clusters', 'visibility', 'visible');
          this.map?.setLayoutProperty('unclustered-point', 'visibility', 'visible');
          this.map?.setLayoutProperty('cluster-count', 'visibility', 'visible');
        }
      } else {
        this.map?.setLayoutProperty('dhb-fills', 'visibility', 'visible');
        if (this.locationsOfInterestLoaded){
          this.map?.setLayoutProperty('clusters', 'visibility', 'none');
          this.map?.setLayoutProperty('unclustered-point', 'visibility', 'none');
          this.map?.setLayoutProperty('cluster-count', 'visibility', 'none');
        }
      }
    });

  }

  initDhbLayer() {
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false
    });

    this.map?.addSource('allDhb', {
      'type': 'geojson',
      'data': '/90Percent/assets/dbh.geojson'
    });

    this.map?.addLayer({
      'id': 'dhb-fills',
      'type': 'fill',
      'source': 'allDhb',
      'layout': {
        'visibility': 'visible'
      },
      'paint': {
        'fill-color': "rgba(167, 167, 167, 0.4)",
        'fill-opacity': [
          'case',
          ['boolean', ['feature-state', 'hover'], false], 0.5,
          ['boolean', ['feature-state', 'selected'], false], 1,
          0,
        ],
        'fill-opacity-transition': { duration: 500, delay: 0 },
      }
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

    this.map?.on('click', 'dhb-fills', (e: any) => {
      if (this.hoveredStateId !== null) {
        this.navigateToDhbVaccinations(e.features[0].properties.GroupedDHB);
      }
    });
  }

  initLocationsOfInterestLayer() {
    this.mapService.allLocationsOfInterest$.subscribe((locationsOfInterest?: LocationOfInterest) => {
      if (locationsOfInterest) {
        this.map?.addSource('locationsOfInterest', {
          type: 'geojson',
          data: JSON.parse(JSON.stringify(locationsOfInterest)), // mad hacks
          cluster: true,
          clusterMaxZoom: 14,
          clusterRadius: 50 
        });
    
        this.map?.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'locationsOfInterest',
          filter: ['has', 'point_count'],
          layout: {
            'visibility': 'visible'
          },
          paint: {
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#d65e5e',
              100,
              '#e09292',
              750,
              '#e3b6b6'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
        });
    
        this.map?.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'locationsOfInterest',
          filter: ['has', 'point_count'],
          layout: {
            'visibility': 'visible',
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        });
    
        this.map?.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          layout: {
            'visibility': 'visible'
          },
          source: 'locationsOfInterest',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#cc0000',
            'circle-radius': 10,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });
    
        this.map?.on('click', 'unclustered-point', (e) => {
          let point = e.features?.find(e => true)?.properties?.id;
          this.navigateToLocationOfInterest(point);
        });

        this.locationsOfInterestLoaded = true;
      }
    });

    

  }

  initMapbox() {
    this.map = new mapboxgl.Map({
      accessToken: environment.mapbox.token,
      container: 'map',
      style: environment.mapbox.style
    });

    this.map?.on('load', () => {
      this.initDhbLayer();
      this.initLocationsOfInterestLayer();
      this.setupMapChangeListener();
    })
  }
}
