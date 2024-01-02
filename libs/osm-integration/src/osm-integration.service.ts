import { Injectable } from '@nestjs/common';

@Injectable()
export class OsmIntegrationService {
  private readonly base_url = 'https://overpass-api.de/api/interpreter';
  private readonly object_types = {
    shop: 'shop',
    cafe: 'amenity',
    restaurant: 'amenity',
    pub: 'amenity',
    bar: 'amenity',
    fast_food: 'amenity',
    nightclub: 'amenity',
    cinema: 'amenity',
  };
  constructor() {}

  // Returns nearby places of a given type
  // If no type is specified, returns all nearby places
  // Types: shop, cafe, restaurant, pub, bar, fast_food, nightclub, cinema
  // Radius is in meters
  // Returns a JSON object
  async getNearbyPlaces(
    lat: number,
    lon: number,
    radius: number,
    objectType?: string[],
    objectName?: string,
  ) {
    let query: string;
    // If no object type is specified, return all objects
    if (!objectType) {
      query = `[out:json];node(around:${radius},${lat},${lon});out;`;
    }

    query = `[out:json];(`;
    objectType.forEach((type) => {
      const osmType = this.object_types[type];
      if (!osmType) throw new Error(`Object type ${type} not supported`);
      if (osmType === 'shop') {
        query += `node["${osmType}"]`;
      } else {
        query += `node["${osmType}"="${type}"]`;
      }
      if (objectName) {
        query += `["name"="${objectName}"]`;
      }
      query += `(around:${radius},${lat},${lon});`;
    });
    query += `);out;`;

    const response = await fetch(this.base_url, {
      method: 'POST',
      body: query,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  }
}
