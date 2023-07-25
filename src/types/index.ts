export type FormStepType = {
  formStep?: number;
  onNext?: () => void;
  onPrev?: () => void;
  onStepChange?: (step: number) => void;
};

export type ItemType = {
  name: string;
  value: string;
};

export interface DropLocation {
  locationCode: string;
  address: string;
  recipientName: string;
  recipientNumber: string;
  altRecipientNumber?: string;
}

export interface Pickup {
  address: string;
  locationCode: string;
  pickupName: string;
  pickupNumber: string;
  altPickupNumber?: string;
  pickupDate: string;
  note: string;
}

export interface EstimatedPrices {
  price: number;
  dropoffId: string;
}
