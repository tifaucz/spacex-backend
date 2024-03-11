import { db } from '../models';
import { cleanDb, postQuery } from '../helpers/testHelpers';
import * as fs from 'fs';
import * as path from 'path';
import { Mission } from '../models/mission';

const testConnection = async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

const populate = async () => {
  await testConnection();
  try {
    await cleanDb();
    console.log('Database cleaned.');

    const mockMissionsPath = path.join(__dirname, './mockMissions.json');
    const mockMissions = JSON.parse(fs.readFileSync(mockMissionsPath, 'utf8'));
    let missionModels: Mission[] = [];

    for (const mission of mockMissions) {
      const newMission = await db.Mission.create({
        flight: mission.flight,
        name: mission.name,
      });
      missionModels.push(newMission);
    }
    console.log('Missions table populated with mock data.');

    console.log('Fetching ship data...');
    const shipQuery = `
      query {
        ships {
          id
          name
          image
          class
          active
          abs
          home_port
          imo
          missions {
            name
            flight
          }
          mmsi
          model
          position {
            latitude
            longitude
          }
          roles
          status
          type
          year_built
        }
      }
    `;

    /*
      Null fields:
      attempted_landings:Int
      course_deg:Int
      position:ShipLocation
      speed_kn:Float
      successful_landings:Int
      url:String
      weight_kg:Int
      weight_lbs:Int
    */

    const ship_data = await postQuery(shipQuery);
    const ships = ship_data.ships;

    for (const ship of ships) {
      let assignedMissions: Mission[] = [];
      if (!ship.missions) {
        const numberOfMissions = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < numberOfMissions; i++) {
          const randomMissionIndex = Math.floor(Math.random() * mockMissions.length);
          if (!assignedMissions.includes(missionModels[randomMissionIndex])) {
            assignedMissions.push(missionModels[randomMissionIndex]);
          } else {
            i--;
          }
        }
      }

      const addedShip = await db.Ship.create({
        id: ship.id,
        active: ship.active,
        name: ship.name,
        class: ship.class ? ship.class.toString() : '',
        image: ship.image,
        abs: ship.abs,
        home_port: ship.home_port,
        imo: ship.imo,
        mmsi: ship.mmsi,
        model: ship.model,
        roles: ship.roles,
        status: ship.status,
        type: ship.type,
        year_built: ship.year_built,
      });
      await addedShip.addMissions(assignedMissions);
    }

    console.log('Database population complete.');
  } catch (error) {
    console.error('An error occurred while populating the database:', error);
  } finally {
    await db.sequelize.close();
    console.log('Database connection closed.');
  }
};

if (require.main === module) {
  populate();
}

export { populate };
