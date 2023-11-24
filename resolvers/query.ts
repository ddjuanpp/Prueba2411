import { GraphQLError } from "graphql";
import { PetModel }  from '../pets.ts';

export const Query = {
  pets: async (_parent: unknown, args: { breed?: string }) => {
    if (args.breed) {
      return await PetModel.find({ breed: args.breed });
    }
    return await PetModel.find();
  },
  pet: async (_parent: unknown, args: { id: string }) => {
    const { id } = args;
    const pet = await PetModel.findOne({ id });
    if (!pet) throw new GraphQLError("Pet not found");
    return pet;
  },
};

export default Query;