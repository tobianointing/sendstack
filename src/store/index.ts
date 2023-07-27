import { Drop, EstimatedPrices, Pickup } from "@/types";
import { create } from "zustand";

export const PickupDefault: Pickup = {
  address: "",
  locationCode: "ETWD",
  pickupName: "",
  pickupNumber: "",
  altPickupNumber: "",
  pickupDate: "",
  note: "",
};

export const DropDefault: Drop = {
  locationCode: "ETWD",
  address: "",
  recipientName: "",
  recipientNumber: "",
  altRecipientNumber: "",
};

interface RequestState {
  pickup: Pickup;
  drop: Drop;
  drops: Drop[];
  estimatedPrices: EstimatedPrices[];
  setPickup: (data: any) => void;
  setDrop: (data: any) => void;
  setDrops: (data: any) => void;
  setEstimatedPrices: (data: any) => void;
}

export const useRequestState = create<RequestState>()((set) => ({
  pickup: PickupDefault,
  drop: DropDefault,
  drops: [],
  estimatedPrices: [],
  setPickup: (data) => set({ pickup: data }),
  setDrop: (data) => set({ drop: data }),
  setDrops: (data) =>
    set((state) => ({
      drops: [...state.drops, data],
    })),
  setEstimatedPrices: (data) =>
    set((state) => ({
      estimatedPrices: [...state.estimatedPrices, data],
    })),
}));
