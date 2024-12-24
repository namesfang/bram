import { isPositive } from "$lib";

export const match = (value: unknown) => isPositive(value)