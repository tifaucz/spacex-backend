import { QueryShipsArgs } from '../../../common/types/backend';
import { GraphqlContext } from '../../../config';
import { shipController } from '../../../controllers';
import { ShipAttributes } from '../../../models/ship';

const ships = async (rootValue, { input }: QueryShipsArgs, context: GraphqlContext): Promise<ShipAttributes[]> => {
  const ships = await shipController.get(input || {}, context);
  for (const ship of ships) {
    if (typeof ship.roles === 'string') {
      ship.roles = JSON.parse(ship.roles);
    }
    ship.missions = await ship.getMissions();

    console.log("Ship Resolver:", ship.missions);
  }
  return ships
};

const shipTypeResolver = {
  missions: async (ship, args, context: GraphqlContext) => {
    return ship.missions || ship.getMissions();
  },
};

const query = { ships };
const mutation = {};
const Ship = { ...shipTypeResolver, query, mutation };
export { Ship };
