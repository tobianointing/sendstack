import { DropLocation, EstimatedPrices, Pickup } from "@/types";
import { create } from "zustand";

const PickupDefault: Pickup = {
  address: "",
  locationCode: "",
  pickupName: "",
  pickupNumber: "",
  altPickupNumber: "",
  pickupDate: "",
  note: "",
};

const DropLocationDefault: DropLocation = {
  locationCode: "",
  address: "",
  recipientName: "",
  recipientNumber: "",
  altRecipientNumber: "",
};

interface RequestState {
  pickup_details: Pickup;
  dropoff_details: DropLocation;
  dropoff_detail_all: DropLocation[];
  estimatedPrices: EstimatedPrices[];
  setPickupDetails: (data: any) => void;
  setDropoffDetails: (data: any) => void;
  setDropoffDetailAll: (data: any) => void;
  setEstimatedPrices: (data: any) => void;
}

export const useRequestState = create<RequestState>()((set) => ({
  pickup_details: PickupDefault,
  dropoff_details: DropLocationDefault,
  dropoff_detail_all: [],
  estimatedPrices: [],
  setPickupDetails: (data) => set({ pickup_details: data }),
  setDropoffDetails: (data) => set({ dropoff_details: data }),
  setDropoffDetailAll: (data) =>
    set((state) => ({
      dropoff_detail_all: [...state.dropoff_detail_all, data],
    })),
  setEstimatedPrices: (data) =>
    set((state) => ({
      estimatedPrices: [...state.estimatedPrices, data],
    })),
}));
