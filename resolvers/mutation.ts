import { GraphQLError } from "graphql";
import { PetModel }  from '../pets.ts';

export const Mutation = {
  addPet: async (_parent: unknown, args: { name: string, breed: string}) => {
    const { name, breed, } = args;
    const pet = new PetModel({ name, breed });
    await pet.save();
    return pet;
  },
  deletePet: async (_parent: unknown, args: { id: string }) => {
    const { id } = args;
    const pet = await PetModel.findOneAndDelete({ id });
    if (!pet) {
      throw new GraphQLError("Pet not found");
    }
    return pet;
  },
  updatePet: async (_parent: unknown, args: {name: string, breed: string, id: string }) => {
    const { id, name, breed } = args;
    const pet = await PetModel.findOneAndUpdate({ id }, { name, breed }, { new: true });
    if (!pet) {
      throw new GraphQLError("Pet not found");
    }
    return pet;
  },
};

export default Mutation;